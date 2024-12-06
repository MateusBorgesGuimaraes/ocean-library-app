export type LoginInfos = {
  email: string;
  password: string;
};

export type RegisterInfos = {
  name: string;
  email: string;
  password: string;
};

export type ReturnedUser = {
  id: number;
  name: string;
  email: string;
  permitions: RoutePolicies[];
  accessToken: string;
};

export enum RoutePolicies {
  admin = 'admin',
  librarian = 'librarian',
  socialMedia = 'socialMedia',
  stockController = 'stockController',
  user = 'user',
}
