import {environment} from '../../../environments/environment';

const AUTH = {
  login: environment.apiHost + '/auth/login',
  register: environment.apiHost + '/auth/register',
  forgotPassword: environment.apiHost + 'auth/forgot-password',
  newPassword: environment.apiHost + 'auth/new-password',
  contactUs: environment.apiHost + '/auth/contact-us'
};

const PRODUCTS = {
  getAll: environment.apiHost + '/products',
  getProduct: environment.apiHost + '/products/{id}',
  getProductImage: environment.apiHost + '/products/image/',
  getTopSoldProducts: environment.apiHost + '/products/topsoldproducts'
};

const CUSTOMERS = {
  getAll: environment.apiHost + '/customers',
  getById: environment.apiHost + '/customers',
  update: environment.apiHost + '/customers',
  updatePhonesAndAddresses: environment.apiHost + '/customers'
};

const BRANDS = {
  getAll: environment.apiHost + '/brands'
};

const PURCHASES = {
  addToCart: environment.apiHost + '/purchases/lineitems',
  buy: environment.apiHost + '/purchases'
};

const STRIPE = {
  createStripeCustomer: environment.apiHost + '/payment',
  charge: environment.apiHost + '/payment/charge'
};


export const ENDPOINTS = {
  auth: AUTH,
  products: PRODUCTS,
  customers: CUSTOMERS,
  purchases: PURCHASES,
  brands: BRANDS,
  stripe: STRIPE
};


