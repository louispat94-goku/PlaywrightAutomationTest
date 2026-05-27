# Amazon India - Unauthenticated User Shopping Flow

## Application Overview

This test plan covers comprehensive scenarios for unauthenticated users shopping on Amazon.in without logging in. The tests cover the complete user journey from browsing products, searching, filtering, and adding items to cart. These scenarios validate the core shopping experience for guest users including search functionality, product discovery, filtering capabilities, and cart operations.

## Test Scenarios

### 1. Search and Product Discovery

**Seed:** `tests/seed.spec.ts`

#### 1.1. Search for a product and view product details page

**File:** `tests/search/search-product-and-view-details.spec.ts`

**Steps:**
  1. Navigate to Amazon.in homepage
    - expect: Homepage loads successfully with search bar visible
    - expect: Navigation header with cart icon is displayed
  2. Click on the search bar in the header
    - expect: Search input field is focused and ready for input
  3. Type 'laptop' in the search bar
    - expect: Search term 'laptop' is entered in the search field
    - expect: Autocomplete suggestions may appear below the search bar
  4. Press Enter to search
    - expect: Search results page loads with multiple laptop products displayed
    - expect: Search query parameter is visible in URL
    - expect: Results count shows available products (e.g., '1-16 of over 70,000 results')
  5. Click on the first product in the search results
    - expect: Product details page loads successfully
    - expect: Product title, price, ratings, and images are displayed
    - expect: Product specifications and 'Add to cart' button are visible
  6. Scroll down to view more product details and reviews
    - expect: Product description, technical specifications, and customer reviews are visible
    - expect: Related/frequently bought together products are shown

#### 1.2. Filter products by price range in search results

**File:** `tests/search/filter-products-by-price.spec.ts`

**Steps:**
  1. Navigate to Amazon.in and search for 'smartphone'
    - expect: Search results page displays multiple smartphone products with prices
  2. Locate the 'Price' filter option on the left sidebar
    - expect: Price filter section is visible with input fields for min and max price range
  3. Set minimum price to 10000 by clicking and entering the value
    - expect: Minimum price input field now contains '10000'
  4. Set maximum price to 50000 by clicking and entering the value
    - expect: Maximum price input field now contains '50000'
  5. Apply the price filter by pressing Enter or clicking Apply button
    - expect: Search results are updated to show only products within ₹10,000 - ₹50,000 range
    - expect: All displayed products have prices within the specified range
    - expect: URL is updated with filter parameters
  6. Verify filter is active by checking the applied filters section
    - expect: Applied price filter is displayed with option to clear/modify it

#### 1.3. Browse products by clicking on category from homepage

**File:** `tests/browse/browse-by-category.spec.ts`

**Steps:**
  1. Navigate to Amazon.in homepage
    - expect: Homepage loads with various product categories visible (Electronics, Books, Fashion, etc.)
    - expect: Category tiles or menu items are displayed
  2. Locate and click on 'Electronics' category
    - expect: Electronics category page loads
    - expect: Subcategories or featured products from Electronics category are displayed
  3. Click on 'Mobiles & Accessories' subcategory
    - expect: Mobile phones and accessories products are displayed
    - expect: Page title or heading confirms the selected category
  4. Observe the page layout and available filters
    - expect: Left sidebar shows filters for Brand, Price, Ratings, etc.
    - expect: Product grid displays items with images, titles, prices, and ratings
  5. Click on any product to view its details
    - expect: Product details page opens with full product information and 'Add to cart' button

### 2. Add to Cart Operations

**Seed:** `tests/seed.spec.ts`

#### 2.1. Add product to cart from product details page

**File:** `tests/cart/add-product-from-details-page.spec.ts`

**Steps:**
  1. Navigate to Amazon.in and search for 'headphones'
    - expect: Search results page loads with headphones products
  2. Click on any headphones product to view its details
    - expect: Product details page loads with product information, price, and 'Add to cart' button visible
  3. Verify the 'Add to cart' button is present and clickable
    - expect: 'Add to cart' button is visible in prominent location (usually right side or center of page)
  4. Click the 'Add to cart' button
    - expect: Button shows loading state temporarily
    - expect: Product is added to cart
    - expect: Cart icon in header updates to show item count (displays '1' or similar)
  5. Click on the Cart icon in the header to view cart
    - expect: Shopping cart page loads
    - expect: Added product is displayed in the cart with title, price, quantity, and subtotal
    - expect: Cart total is calculated correctly
  6. Verify that user is not required to login to continue
    - expect: Cart page is accessible without login
    - expect: No login prompt or modal appears

#### 2.2. Add multiple products to cart and verify cart updates

**File:** `tests/cart/add-multiple-products-to-cart.spec.ts`

**Steps:**
  1. Navigate to Amazon.in and search for 'books'
    - expect: Search results page displays multiple books
  2. Click on the first book to view its details page
    - expect: Product details page for the first book loads
  3. Click 'Add to cart' button for the first book
    - expect: First book is added to cart
    - expect: Cart count in header updates to '1'
  4. Go back to search results using the back button or search for another product
    - expect: Search results page is displayed
    - expect: Cart count still shows '1' indicating previous item is retained
  5. Click on a different book product from the search results
    - expect: Second product details page loads
  6. Click 'Add to cart' for the second book
    - expect: Second book is added to cart
    - expect: Cart count updates to '2'
  7. Click on Cart icon to view shopping cart
    - expect: Shopping cart displays both products
    - expect: Cart shows 2 items with individual prices and total amount
    - expect: Each product can be individually removed if needed
