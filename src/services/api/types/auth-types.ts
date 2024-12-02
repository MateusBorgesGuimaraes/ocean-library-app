export type Login = {
  email: string;
  password: string;
};

export enum RoutePolicies {
  admin = 'admin',
  librarian = 'librarian',
  socialMedia = 'socialMedia',
  stockController = 'stockController',
  user = 'user',
}
