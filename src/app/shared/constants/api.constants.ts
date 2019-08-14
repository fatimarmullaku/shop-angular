import {environment} from '../../../environments/environment';

const AUTH = {
  login: environment.apiHost + '/auth/login',
  register: environment.apiHost + '/auth/register',
};

const PRODUCTS = {
  getAll: environment.apiHost + '/products',
  getProduct: environment.apiHost + '/products/{id}'
};

const CUSTOMERS = {
  getAll: environment.apiHost + '/customers',
  getCustomer: environment.apiHost + '/customers/{id}',
  createCustomer: environment.apiHost + 'customers'
};

export const ENDPOINTS = {
  auth: AUTH,
  products: PRODUCTS,
  customers: CUSTOMERS
};

