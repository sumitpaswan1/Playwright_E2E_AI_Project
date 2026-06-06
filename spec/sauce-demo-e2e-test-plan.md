# Sauce Demo End-to-End Test Plan

## Application Overview

Sauce Demo is an e-commerce test application designed to practice automated testing. It features a product inventory system, shopping cart, and checkout process with multiple test user accounts that simulate different user scenarios (standard user, locked out user, performance issues, visual differences, etc.). This test plan covers functional testing, edge cases, error handling, and complete user flows from login through checkout.

## Test Scenarios

### 1. Authentication & Login

**Seed:** `tests/seed.spec.ts`

#### 1.1. Valid Login with Standard User

**File:** `tests/authentication/valid-login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
    - expect: Username and Password fields are visible
    - expect: Login button is present
  2. Enter 'standard_user' in the Username field
    - expect: Username is entered in the field
  3. Enter 'secret_sauce' in the Password field
    - expect: Password is entered in the field
  4. Click the Login button
    - expect: User is redirected to /inventory.html
    - expect: Products page is displayed with product list
    - expect: Shopping cart icon appears in the header

#### 1.2. Locked Out User Cannot Login

**File:** `tests/authentication/locked-out-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'locked_out_user' in the Username field
    - expect: Username is entered in the field
  3. Enter 'secret_sauce' in the Password field
    - expect: Password is entered in the field
  4. Click the Login button
    - expect: User remains on login page
    - expect: Error message 'Epic sadface: Sorry, this user has been locked out.' is displayed

#### 1.3. Invalid Credentials Show Error

**File:** `tests/authentication/invalid-credentials.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'standard_user' in the Username field
    - expect: Username is entered in the field
  3. Enter 'wrong_password' in the Password field
    - expect: Password is entered in the field
  4. Click the Login button
    - expect: User remains on login page
    - expect: Error message is displayed indicating invalid credentials

#### 1.4. Empty Username Shows Validation Error

**File:** `tests/authentication/empty-username.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Leave Username field empty and click Login button
    - expect: Error message is displayed for empty username

#### 1.5. Empty Password Shows Validation Error

**File:** `tests/authentication/empty-password.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'standard_user' in the Username field
    - expect: Username is entered
  3. Leave Password field empty and click Login button
    - expect: Error message is displayed for empty password

### 2. Product Inventory & Browsing

**Seed:** `tests/seed.spec.ts`

#### 2.1. View All Products

**File:** `tests/inventory/view-all-products.spec.ts`

**Steps:**
  1. Login with standard_user and navigate to products page
    - expect: Products page displays all 6 items: Sauce Labs Backpack, Bike Light, Bolt T-Shirt, Fleece Jacket, Onesie, Test.allTheThings() T-Shirt
  2. Verify each product displays name, description, price, and image
    - expect: All product information is visible for each item
  3. Verify each product has an 'Add to cart' button
    - expect: All products show 'Add to cart' buttons

#### 2.2. Sort Products by Name (A to Z)

**File:** `tests/inventory/sort-name-asc.spec.ts`

**Steps:**
  1. Login and navigate to products page
    - expect: Products page is displayed
  2. Click on the sort dropdown and select 'Name (A to Z)'
    - expect: Products are reordered alphabetically: Sauce Labs Backpack, Bike Light, Bolt T-Shirt, Fleece Jacket, Onesie, Test.allTheThings() T-Shirt

#### 2.3. Sort Products by Name (Z to A)

**File:** `tests/inventory/sort-name-desc.spec.ts`

**Steps:**
  1. Login and navigate to products page
    - expect: Products page is displayed
  2. Click on the sort dropdown and select 'Name (Z to A)'
    - expect: Products are reordered in reverse alphabetical order

#### 2.4. Sort Products by Price (Low to High)

**File:** `tests/inventory/sort-price-low-high.spec.ts`

**Steps:**
  1. Login and navigate to products page
    - expect: Products page is displayed
  2. Click on the sort dropdown and select 'Price (low to high)'
    - expect: Products are reordered by price: Onesie ($7.99), Bike Light ($9.99), Bolt T-Shirt ($15.99), Test.allTheThings() T-Shirt ($15.99), Backpack ($29.99), Fleece Jacket ($49.99)

#### 2.5. Sort Products by Price (High to Low)

**File:** `tests/inventory/sort-price-high-low.spec.ts`

**Steps:**
  1. Login and navigate to products page
    - expect: Products page is displayed
  2. Click on the sort dropdown and select 'Price (high to low)'
    - expect: Products are reordered by price in descending order: Fleece Jacket ($49.99), Backpack ($29.99), then lower priced items

#### 2.6. View Product Details

**File:** `tests/inventory/product-details.spec.ts`

**Steps:**
  1. Login and navigate to products page
    - expect: Products page is displayed
  2. Click on a product name (e.g., 'Sauce Labs Backpack')
    - expect: Product details page is displayed
    - expect: Product image is shown
    - expect: Full product description is visible
    - expect: Price is displayed
    - expect: Product title is shown in heading
  3. Verify 'Back to products' button is visible
    - expect: Back to products button is clickable

#### 2.7. Back to Products from Details Page

**File:** `tests/inventory/back-to-products.spec.ts`

**Steps:**
  1. Login, navigate to products page, and click on a product name
    - expect: Product details page is displayed
  2. Click on 'Back to products' button
    - expect: User is redirected back to /inventory.html
    - expect: Products page is displayed with full product list

### 3. Shopping Cart Management

**Seed:** `tests/seed.spec.ts`

#### 3.1. Add Single Item to Cart

**File:** `tests/cart/add-single-item.spec.ts`

**Steps:**
  1. Login and navigate to products page
    - expect: Products page is displayed
    - expect: Cart badge shows 0 items
  2. Click 'Add to cart' button for Sauce Labs Backpack
    - expect: Item is added to cart
    - expect: Cart badge now shows '1'
    - expect: Button changes to 'Remove'

#### 3.2. Add Multiple Items to Cart

**File:** `tests/cart/add-multiple-items.spec.ts`

**Steps:**
  1. Login and navigate to products page
    - expect: Products page is displayed
  2. Click 'Add to cart' for Sauce Labs Backpack
    - expect: Item is added, cart badge shows '1'
  3. Click 'Add to cart' for Sauce Labs Bike Light
    - expect: Item is added, cart badge shows '2'
  4. Click 'Add to cart' for Sauce Labs Bolt T-Shirt
    - expect: Item is added, cart badge shows '3'

#### 3.3. Remove Item from Products Page

**File:** `tests/cart/remove-item-from-products.spec.ts`

**Steps:**
  1. Login, add an item to cart, and remain on products page
    - expect: Item is in cart, cart badge shows '1'
    - expect: Button shows 'Remove'
  2. Click the 'Remove' button for the added item
    - expect: Item is removed from cart
    - expect: Cart badge shows '0'
    - expect: Button changes back to 'Add to cart'

#### 3.4. View Empty Cart

**File:** `tests/cart/empty-cart.spec.ts`

**Steps:**
  1. Login and navigate to products page without adding items
    - expect: Products page is displayed
  2. Click on the cart icon
    - expect: Cart page is displayed
    - expect: Message or empty state indicates cart is empty
    - expect: Only 'Continue Shopping' and 'Checkout' buttons are visible

#### 3.5. View Cart with Items

**File:** `tests/cart/view-cart-with-items.spec.ts`

**Steps:**
  1. Login and add multiple items to cart (Backpack, Bike Light, T-Shirt)
    - expect: Items are added successfully
  2. Click on the cart icon
    - expect: Cart page displays all 3 items
    - expect: Each item shows quantity (1), name, description, price
    - expect: Cart shows item count in badge

#### 3.6. Remove Item from Cart Page

**File:** `tests/cart/remove-item-from-cart.spec.ts`

**Steps:**
  1. Login, add items to cart, and navigate to cart page
    - expect: Cart page displays items
  2. Click 'Remove' button for one of the items
    - expect: Item is removed from cart
    - expect: Item is no longer displayed in cart
    - expect: Cart item count is updated

#### 3.7. Continue Shopping from Cart

**File:** `tests/cart/continue-shopping.spec.ts`

**Steps:**
  1. Login, add items to cart, and navigate to cart page
    - expect: Cart page is displayed
  2. Click 'Continue Shopping' button
    - expect: User is redirected back to /inventory.html
    - expect: Cart items remain in cart (badge still shows count)
    - expect: Products page is displayed

### 4. Checkout Process

**Seed:** `tests/seed.spec.ts`

#### 4.1. Proceed to Checkout with Items

**File:** `tests/checkout/proceed-to-checkout.spec.ts`

**Steps:**
  1. Login, add items to cart, and navigate to cart page
    - expect: Cart page displays items
  2. Click 'Checkout' button
    - expect: User is redirected to checkout-step-one.html
    - expect: Checkout form with First Name, Last Name, and Zip/Postal Code fields is displayed

#### 4.2. Checkout with Empty Fields Shows Error

**File:** `tests/checkout/empty-fields-error.spec.ts`

**Steps:**
  1. Login, add items to cart, navigate to cart page, and click Checkout
    - expect: Checkout form is displayed
  2. Leave all fields empty and click Continue button
    - expect: Error message is displayed for required fields

#### 4.3. Fill Checkout Information Correctly

**File:** `tests/checkout/fill-checkout-info.spec.ts`

**Steps:**
  1. Login, add items to cart, navigate to cart page, and click Checkout
    - expect: Checkout form is displayed
  2. Enter 'John' in First Name field
    - expect: First Name is entered
  3. Enter 'Doe' in Last Name field
    - expect: Last Name is entered
  4. Enter '12345' in Zip/Postal Code field
    - expect: Zip Code is entered
  5. Click Continue button
    - expect: User proceeds to checkout step two
    - expect: Checkout form is submitted successfully

#### 4.4. Cancel Checkout

**File:** `tests/checkout/cancel-checkout.spec.ts`

**Steps:**
  1. Login, add items to cart, navigate to cart page, and click Checkout
    - expect: Checkout form is displayed
  2. Click 'Cancel' button
    - expect: User is redirected back to /inventory.html
    - expect: Cart items are still in cart (not checked out)

### 5. Menu & Navigation

**Seed:** `tests/seed.spec.ts`

#### 5.1. Open and Close Menu

**File:** `tests/navigation/open-close-menu.spec.ts`

**Steps:**
  1. Login and navigate to products page
    - expect: Products page is displayed
  2. Click on the hamburger menu button
    - expect: Menu opens showing options: All Items, About, Logout, Reset App State
  3. Click on the close menu button
    - expect: Menu closes

#### 5.2. Navigate to All Items

**File:** `tests/navigation/all-items.spec.ts`

**Steps:**
  1. Login, add items to cart, and open the menu
    - expect: Menu is displayed
  2. Click on 'All Items' link
    - expect: User remains on or is redirected to /inventory.html
    - expect: All products are displayed

#### 5.3. About Link Opens External Page

**File:** `tests/navigation/about-link.spec.ts`

**Steps:**
  1. Login and open the menu
    - expect: Menu is displayed
  2. Click on 'About' link
    - expect: External link to https://saucelabs.com/ opens in new tab or redirects

#### 5.4. Logout from Menu

**File:** `tests/navigation/logout.spec.ts`

**Steps:**
  1. Login with standard_user and open the menu
    - expect: Menu is displayed
  2. Click on 'Logout' link
    - expect: User is logged out
    - expect: User is redirected to login page
    - expect: Cart is cleared

#### 5.5. Reset App State

**File:** `tests/navigation/reset-app-state.spec.ts`

**Steps:**
  1. Login and add items to cart
    - expect: Cart badge shows number of items
  2. Open the menu and click 'Reset App State'
    - expect: Cart is cleared
    - expect: Cart badge shows 0
    - expect: User remains on products page

### 6. Different User Accounts

**Seed:** `tests/seed.spec.ts`

#### 6.1. Problem User Account

**File:** `tests/users/problem-user.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page is displayed
  2. Enter 'problem_user' as username and 'secret_sauce' as password
    - expect: Username and password are entered
  3. Click Login button
    - expect: User successfully logs in
    - expect: Products page is displayed
    - expect: Note: This user may have display or image loading issues for testing purposes

#### 6.2. Performance Glitch User Account

**File:** `tests/users/performance-glitch-user.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page is displayed
  2. Enter 'performance_glitch_user' as username and 'secret_sauce' as password
    - expect: Username and password are entered
  3. Click Login button
    - expect: User successfully logs in after possible delay
    - expect: Products page displays with potential performance delays

#### 6.3. Error User Account

**File:** `tests/users/error-user.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page is displayed
  2. Enter 'error_user' as username and 'secret_sauce' as password
    - expect: Username and password are entered
  3. Click Login button
    - expect: User successfully logs in
    - expect: Products page may display with error states or issues for testing

#### 6.4. Visual User Account

**File:** `tests/users/visual-user.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page is displayed
  2. Enter 'visual_user' as username and 'secret_sauce' as password
    - expect: Username and password are entered
  3. Click Login button
    - expect: User successfully logs in
    - expect: Products page displays with visual differences or rendering variations for visual regression testing

### 7. End-to-End Complete Purchase Flow

**Seed:** `tests/seed.spec.ts`

#### 7.1. Complete Purchase Flow

**File:** `tests/e2e/complete-purchase.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'standard_user' and 'secret_sauce' credentials
    - expect: Credentials are entered
  3. Click Login button
    - expect: User is logged in and products page is displayed
  4. Add 'Sauce Labs Backpack' to cart
    - expect: Item is added to cart, cart badge shows '1'
  5. Add 'Sauce Labs Bike Light' to cart
    - expect: Item is added to cart, cart badge shows '2'
  6. Click on cart icon
    - expect: Cart page displays both items with quantities and prices
  7. Click Checkout button
    - expect: Checkout form (step one) is displayed
  8. Fill in checkout information: First Name='John', Last Name='Doe', Zip='12345'
    - expect: All fields are populated correctly
  9. Click Continue button
    - expect: User proceeds to checkout step two
    - expect: Order review page is displayed with items and total

#### 7.2. Complete Purchase with Multiple Items

**File:** `tests/e2e/purchase-multiple-items.spec.ts`

**Steps:**
  1. Login with standard_user
    - expect: Products page is displayed
  2. Add all 6 products to cart one by one
    - expect: Each item is added successfully, cart badge increments
  3. Navigate to cart
    - expect: All 6 items are displayed in cart
  4. Remove one item from cart
    - expect: Item is removed, 5 items remain in cart
  5. Proceed to checkout and fill all required information
    - expect: Checkout form is filled successfully
  6. Click Continue to proceed
    - expect: Order summary displays with remaining 5 items

### 8. Error Handling & Validation

**Seed:** `tests/seed.spec.ts`

#### 8.1. Close Error Messages

**File:** `tests/error-handling/close-errors.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page is displayed
  2. Leave fields empty and click Login
    - expect: Error message is displayed
  3. Click the X button to close the error message
    - expect: Error message is closed/dismissed

#### 8.2. Cart Badge Accuracy

**File:** `tests/error-handling/cart-badge-accuracy.spec.ts`

**Steps:**
  1. Login and add 3 items to cart
    - expect: Cart badge shows '3'
  2. Remove 1 item from products page
    - expect: Cart badge updates to '2'
  3. Navigate to cart page
    - expect: Cart page shows 2 items, matching the badge count

#### 8.3. Prevent Adding Duplicate Items

**File:** `tests/error-handling/prevent-duplicates.spec.ts`

**Steps:**
  1. Login and navigate to products page
    - expect: Products page is displayed
  2. Click 'Add to cart' for Sauce Labs Backpack
    - expect: Item is added, cart badge shows '1'
  3. Click 'Add to cart' again for the same product
    - expect: Cart badge shows '2', indicating quantity is increased (or duplicate is added based on app behavior)
