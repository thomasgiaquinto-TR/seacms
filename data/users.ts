export interface TestUser {
  username: string;
  password: string;
}

export const adminUser: TestUser = {
  username: process.env.ADMIN_USER ?? 'clerkfull',
  password: process.env.ADMIN_PASS ?? '',
};

export const standardUser: TestUser = {
  username: process.env.STD_USER ?? '',
  password: process.env.STD_PASS ?? '',
};