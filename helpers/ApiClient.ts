import { APIRequestContext, APIResponse, request } from '@playwright/test';

/**
 * Shape of GET /v1/custom/caseSummary/{caseId} (verified live on seacms-qa).
 * NB: the top-level case block is `caseInstance` (the test plan's pseudo-schema
 * calls it `case`); `citation` is an empty object `{}` for citation-less cases.
 */
export interface CaseSummaryResponse {
  caseInstance?: { caseID?: string; [k: string]: unknown };
  caseParticipants?: unknown[];
  citation?: Record<string, unknown> | null;
  compliances?: unknown;
  hearings?: unknown[];
  assessments?: unknown[];
  chargeSummary?: unknown[];
  [key: string]: unknown;
}

/**
 * Shape of GET /v1/custom/ivrgeneralinformation/ (verified live on seacms-qa).
 * Queried by caseNumber or citationNumber; returns the case plus related arrays.
 */
export interface IvrGeneralInfoResponse {
  caseInstance?: { caseID?: string; [k: string]: unknown };
  caseHearings?: Array<{ hearingID?: string; [k: string]: unknown }>;
  citations?: unknown[];
  charges?: unknown[];
  warrants?: unknown[];
  [key: string]: unknown;
}

export interface ActorAlias {
  aliasID?: string;
  type?: string;
  lastName?: string;
  [key: string]: unknown;
}

export interface ApiClientOverrides {
  /** API root including the `/api` suffix, e.g. https://host/api */
  baseUrl?: string;
  /** Authentication Token value (minted via the User Profile screen). */
  token?: string;
}

/**
 * Thin REST client for the C-Track CMS API.
 *
 * Auth (verified live on seacms-qa): an Authentication Token passed as the
 * `auth_token` QUERY PARAMETER. Bearer / Basic / X-Auth-Token headers are all
 * rejected with 401. Endpoints live under `{baseUrl}/v1/...`.
 *
 * Gotcha A: we build absolute URLs ourselves instead of setting Playwright's
 * `baseURL` — a leading-slash request path would otherwise drop the `/api`
 * suffix and hit the web app (HTML, not JSON).
 */
export class ApiClient {
  private constructor(
    private readonly ctx: APIRequestContext,
    private readonly token: string,
    private readonly baseUrl: string,
  ) {}

  static async create(overrides: ApiClientOverrides = {}): Promise<ApiClient> {
    const baseUrl = overrides.baseUrl ?? process.env.API_BASE_URL ?? '';
    const token = overrides.token ?? process.env.API_TOKEN ?? '';
    if (!baseUrl) throw new Error('ApiClient: baseUrl is required (set API_BASE_URL or pass baseUrl)');
    if (!token) throw new Error('ApiClient: token is required (set API_TOKEN or pass token)');
    const ctx = await request.newContext({ extraHTTPHeaders: { Accept: 'application/json' } });
    return new ApiClient(ctx, token, baseUrl.replace(/\/+$/, ''));
  }

  private url(path: string): string {
    const sep = path.includes('?') ? '&' : '?';
    return `${this.baseUrl}${path}${sep}auth_token=${encodeURIComponent(this.token)}`;
  }

  /** Raw GET — use when the caller needs the status (e.g. asserting 401). */
  async getRaw(path: string, params?: Record<string, string>): Promise<APIResponse> {
    return this.ctx.get(this.url(path), { params });
  }

  /** GET returning parsed JSON; throws with the server body on non-2xx. */
  async getJson<T = unknown>(path: string, params?: Record<string, string>): Promise<T> {
    const res = await this.getRaw(path, params);
    const body = await res.text();
    if (!res.ok()) {
      throw new Error(`API ${res.status()} ${res.statusText()} for GET ${path} — ${body || '(empty)'}`);
    }
    return body ? (JSON.parse(body) as T) : (undefined as T);
  }

  /** GET /v1/cases/classifications — a simple authenticated read used as a probe. */
  async listCaseClassifications(): Promise<unknown[]> {
    return this.getJson<unknown[]>('/v1/cases/classifications');
  }

  /** GET /v1/custom/caseSummary/{caseId} — the custom Case Summary aggregate. */
  async getCaseSummary(caseId: string | number): Promise<CaseSummaryResponse> {
    return this.getJson<CaseSummaryResponse>(`/v1/custom/caseSummary/${caseId}`);
  }

  /** GET /v1/cases — a page of case ids (newest-first ordering is not guaranteed). */
  async listCaseIds(page = 0, size = 50): Promise<string[]> {
    const cases = await this.getJson<Array<{ caseID?: string }>>('/v1/cases', {
      page: String(page),
      size: String(size),
      fields: 'caseID',
    });
    return (cases ?? []).map((c) => c.caseID).filter((id): id is string => Boolean(id));
  }

  /** GET /v1/cases/{id} projected to the human-readable case number. */
  async getCaseNumber(caseId: string | number): Promise<string> {
    const c = await this.getJson<{ caseNumber?: string }>(`/v1/cases/${caseId}`, {
      fields: 'caseNumber',
    });
    return c.caseNumber ?? '';
  }

  /** GET /v1/custom/ivrgeneralinformation/?caseNumber=... (the IVR aggregate). */
  async getIvrGeneralInfo(caseNumber: string, fields?: string): Promise<IvrGeneralInfoResponse> {
    const params: Record<string, string> = { caseNumber };
    if (fields) params.fields = fields;
    return this.getJson<IvrGeneralInfoResponse>('/v1/custom/ivrgeneralinformation/', params);
  }

  /** Raw POST with a JSON body — use when the caller needs the status (e.g. 201). */
  async post(path: string, data: unknown): Promise<APIResponse> {
    return this.ctx.post(this.url(path), { data, headers: { 'Content-Type': 'application/json' } });
  }

  /** Raw PUT with a JSON body (mutating endpoints often return 204, empty body). */
  async put(path: string, data: unknown): Promise<APIResponse> {
    return this.ctx.put(this.url(path), { data, headers: { 'Content-Type': 'application/json' } });
  }

  /** Raw DELETE. */
  async delete(path: string): Promise<APIResponse> {
    return this.ctx.delete(this.url(path));
  }

  /** GET /v1/actors/{actorID}/addresses (list). */
  async listActorAddresses(
    actorId: string | number,
    fields = 'addressID,line1,city,zipCode',
  ): Promise<Array<Record<string, unknown>>> {
    return this.getJson<Array<Record<string, unknown>>>(`/v1/actors/${actorId}/addresses`, { fields });
  }

  /** POST /v1/actors/{actorID}/addresses (201, empty body). */
  async createActorAddress(actorId: string | number, dto: Record<string, unknown>): Promise<APIResponse> {
    return this.post(`/v1/actors/${actorId}/addresses`, dto);
  }

  /** PUT /v1/actors/{actorID}/addresses/{addressID} (204, empty body). */
  async updateActorAddress(
    actorId: string | number,
    addressId: string | number,
    dto: Record<string, unknown>,
  ): Promise<APIResponse> {
    return this.put(`/v1/actors/${actorId}/addresses/${addressId}`, dto);
  }

  /** DELETE /v1/actors/{actorID}/addresses/{addressID}. */
  async deleteActorAddress(actorId: string | number, addressId: string | number): Promise<APIResponse> {
    return this.delete(`/v1/actors/${actorId}/addresses/${addressId}`);
  }

  /** GET /v1/actors/{actorID}/contacts (list). */
  async listActorContacts(
    actorId: string | number,
    fields = 'contactID,contactValue',
  ): Promise<Array<Record<string, unknown>>> {
    return this.getJson<Array<Record<string, unknown>>>(`/v1/actors/${actorId}/contacts`, { fields });
  }

  /** POST /v1/actors/{actorID}/contacts (201, empty body). */
  async createActorContact(actorId: string | number, dto: Record<string, unknown>): Promise<APIResponse> {
    return this.post(`/v1/actors/${actorId}/contacts`, dto);
  }

  /** DELETE /v1/actors/{actorID}/contacts/{contactID}. */
  async deleteActorContact(actorId: string | number, contactId: string | number): Promise<APIResponse> {
    return this.delete(`/v1/actors/${actorId}/contacts/${contactId}`);
  }

  // --- ACCESS integration -------------------------------------------------

  /** GET /v1/accessrequeststatustypes — request status ids. */
  async listAccessRequestStatusIds(): Promise<string[]> {
    const rows = await this.getJson<Array<{ accessRequestStatusID?: string }>>(
      '/v1/accessrequeststatustypes',
      { fields: 'accessRequestStatusID' },
    );
    return (rows ?? []).map((r) => r.accessRequestStatusID).filter((id): id is string => Boolean(id));
  }

  /** GET /v1/accessrequesttypes — request type ids. */
  async listAccessRequestTypeIds(): Promise<string[]> {
    const rows = await this.getJson<Array<{ accessRequestTypeID?: string }>>('/v1/accessrequesttypes', {
      fields: 'accessRequestTypeID',
    });
    return (rows ?? []).map((r) => r.accessRequestTypeID).filter((id): id is string => Boolean(id));
  }

  /** POST /v1/custom/accessrequest (201; the new id is in the Location header). */
  async createAccessRequest(dto: Record<string, unknown>): Promise<APIResponse> {
    return this.post('/v1/custom/accessrequest', dto);
  }

  /** GET /v1/custom/accessrequest/{id} (optionally projecting nested details). */
  async getAccessRequest(id: string | number, fields?: string): Promise<Record<string, unknown>> {
    const params = fields ? { fields } : undefined;
    return this.getJson<Record<string, unknown>>(`/v1/custom/accessrequest/${id}`, params);
  }

  /** PUT /v1/custom/accessrequest/{reqId}/accessrequestdetails/{detailId} (204). */
  async updateAccessRequestDetail(
    reqId: string | number,
    detailId: string | number,
    dto: Record<string, unknown>,
  ): Promise<APIResponse> {
    return this.put(`/v1/custom/accessrequest/${reqId}/accessrequestdetails/${detailId}`, dto);
  }

  /** DELETE /v1/custom/accessrequest/{id} (cascades its details). */
  async deleteAccessRequest(id: string | number): Promise<APIResponse> {
    return this.delete(`/v1/custom/accessrequest/${id}`);
  }

  /** POST /v1/custom/accessresponse (201; id in Location). Link via accessRequestID. */
  async createAccessResponse(dto: Record<string, unknown>): Promise<APIResponse> {
    return this.post('/v1/custom/accessresponse', dto);
  }

  /**
   * GET /v1/custom/accessresponse/{id} (optionally projecting nested details).
   * NB: resolves only while the response is still linked to a request; an orphan
   * response (no request, or its request deleted) returns 404.
   */
  async getAccessResponse(id: string | number, fields?: string): Promise<Record<string, unknown>> {
    const params = fields ? { fields } : undefined;
    return this.getJson<Record<string, unknown>>(`/v1/custom/accessresponse/${id}`, params);
  }

  /** DELETE /v1/custom/accessresponse/{id} — delete BEFORE its request (else orphaned). */
  async deleteAccessResponse(id: string | number): Promise<APIResponse> {
    return this.delete(`/v1/custom/accessresponse/${id}`);
  }

  /**
   * POST /v1/custom/accessResponse/{responseId}/accessresponsedetails (201).
   * NOTE the capital "R" in the path segment — that is what the API expects.
   * Only resolves for a response that is linked to a request.
   */
  async createAccessResponseDetail(
    responseId: string | number,
    dto: Record<string, unknown>,
  ): Promise<APIResponse> {
    return this.post(`/v1/custom/accessResponse/${responseId}/accessresponsedetails`, dto);
  }

  /** Parse the resource id from a POST response's Location header. */
  static locationId(res: APIResponse): string {
    return (res.headers()['location'] ?? '').split('/').filter(Boolean).pop() ?? '';
  }

  /** GET /v1/actors?actorCategoryID=1 — person actor ids (category 1 = persons). */
  async listPersonActorIds(size = 5): Promise<string[]> {
    const actors = await this.getJson<Array<{ actorID?: string }>>('/v1/actors', {
      actorCategoryID: '1',
      page: '0',
      size: String(size),
      fields: 'actorID',
    });
    return (actors ?? []).map((a) => a.actorID).filter((id): id is string => Boolean(id));
  }

  /** GET /v1/aliastypes — alias type ids (the id field is `aliasID`). */
  async listAliasTypeIds(): Promise<string[]> {
    const types = await this.getJson<Array<{ aliasID?: string }>>('/v1/aliastypes', {
      fields: 'aliasID',
    });
    return (types ?? []).map((t) => t.aliasID).filter((id): id is string => Boolean(id));
  }

  /** GET /v1/actors/{actorID}/aliases?type=person|organization. */
  async getActorAliases(actorId: string | number, type = 'person'): Promise<ActorAlias[]> {
    return this.getJson<ActorAlias[]>(`/v1/actors/${actorId}/aliases`, {
      type,
      fields: 'aliasID,type,lastName',
    });
  }

  /** POST /v1/actors/{actorID}/aliases (201, empty body on success). */
  async createActorAlias(actorId: string | number, dto: Record<string, unknown>): Promise<APIResponse> {
    return this.post(`/v1/actors/${actorId}/aliases`, dto);
  }

  async dispose(): Promise<void> {
    await this.ctx.dispose();
  }
}

/** Resolve the API root from API_BASE_URL, else derive it from BASE_URL + /api. */
export function resolveApiBaseUrl(): string {
  if (process.env.API_BASE_URL) return process.env.API_BASE_URL;
  const base = (process.env.BASE_URL ?? 'https://seacms-qa.ctrack.thomsonreuters.com').replace(/\/+$/, '');
  return `${base}/api`;
}
