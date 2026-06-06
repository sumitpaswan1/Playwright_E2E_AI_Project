export const TEST_USERS = {
  STANDARD_USER: 'standard_user',
  LOCKED_OUT_USER: 'locked_out_user',
  PROBLEM_USER: 'problem_user',
  PERFORMANCE_GLITCH_USER: 'performance_glitch_user',
  ERROR_USER: 'error_user',
  VISUAL_USER: 'visual_user',
};

export const TEST_PASSWORD = 'secret_sauce';

export const PRODUCTS = {
  SAUCE_LABS_BACKPACK: {
    name: 'Sauce Labs Backpack',
    dataTest: 'sauce-labs-backpack',
    price: 29.99,
    id: '4',
  },
  SAUCE_LABS_BIKE_LIGHT: {
    name: 'Sauce Labs Bike Light',
    dataTest: 'sauce-labs-bike-light',
    price: 9.99,
    id: '0',
  },
  SAUCE_LABS_BOLT_T_SHIRT: {
    name: 'Sauce Labs Bolt T-Shirt',
    dataTest: 'sauce-labs-bolt-t-shirt',
    price: 15.99,
    id: '1',
  },
  SAUCE_LABS_FLEECE_JACKET: {
    name: 'Sauce Labs Fleece Jacket',
    dataTest: 'sauce-labs-fleece-jacket',
    price: 49.99,
    id: '5',
  },
  SAUCE_LABS_ONESIE: {
    name: 'Sauce Labs Onesie',
    dataTest: 'sauce-labs-onesie',
    price: 7.99,
    id: '6',
  },
  TEST_ALLTHETHINGS_TSHIRT: {
    name: 'Test.allTheThings() T-Shirt (Red)',
    dataTest: 'test-allthethings-t-shirt-red',
    price: 15.99,
    id: '2',
  },
};

export const SORT_OPTIONS = {
  NAME_A_TO_Z: 'az',
  NAME_Z_TO_A: 'za',
  PRICE_LOW_TO_HIGH: 'lohi',
  PRICE_HIGH_TO_LOW: 'hilo',
};

export const EXPECTED_PRODUCT_ORDER = {
  NAME_A_TO_Z: [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Onesie',
    'Test.allTheThings() T-Shirt (Red)',
  ],
  PRICE_LOW_TO_HIGH: [
    'Sauce Labs Onesie',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Test.allTheThings() T-Shirt (Red)',
    'Sauce Labs Backpack',
    'Sauce Labs Fleece Jacket',
  ],
};

export const TAX_RATE = 0.08;

export const ERRORS = {
  LOCKED_OUT: 'Epic sadface: Sorry, this user has been locked out.',
  INVALID_CREDENTIALS: 'Epic sadface: Username and password do not match any user in this service',
  EMPTY_USERNAME: 'Epic sadface: Username is required',
  EMPTY_PASSWORD: 'Epic sadface: Password is required',
};
