import {environment} from '../../../environments/environment';

const AUTH = {
  login: environment.apiHost + '/auth/login',
  register: environment.apiHost + '/auth/register',
  forgotPassword: environment.apiHost + 'auth/forgot-password',
  newPassword: environment.apiHost + 'auth/new-password'
};
const PRODUCTS = {
  getAll: environment.apiHost + 'products',
  getProduct: environment.apiHost + '/products/{id}'
};

const CUSTOMERS = {
    getAll: environment.apiHost + '/customers',
    updatePhonesAndAddresses: environment.apiHost + '/customers'
};

const PURCHASES = {
    addToCart: environment.apiHost + '/purchases/lineitems',
    buy: environment.apiHost + '/purchases'
}
export const ENDPOINTS = {
  auth: AUTH,
  products: PRODUCTS,
  customers: CUSTOMERS,
  purchases: PURCHASES
};

