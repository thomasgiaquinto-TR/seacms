/**
 * Case Classification options as shown in the Create Case dropdown on
 * seacms-qa (format: "Group - Type - Classification"). Verified live 2026-06.
 * These are environment/config-specific; adjust if the deploy's item lists change.
 */
export const Classification = {
  Civil: 'Civil - Civil - Civil',
  Criminal: 'Criminal - Non-Traffic - Criminal',
  CriminalTraffic: 'Criminal - Traffic - Traffic',
  CriminalTrafficDui: 'Criminal - Traffic - DUI-Related',
  Infraction: 'Infraction - Non-Traffic - Infraction',
  ParkingCitation: 'Infraction - Parking & Traffic Camera - Parking',
  Scofflaw: 'Civil Impound - Civil Impound - Scofflaw',
} as const;

/** handlerSubTypeID query params for the dedicated Create Case shortcuts. */
export const CreateCaseHandler = {
  felonyMisdemeanor: 50025,
  parkingCitation: 340021,
  traffic: 50019,
} as const;