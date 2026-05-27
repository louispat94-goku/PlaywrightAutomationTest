/**
 * CartTestData - Test data for cart related tests
 */
const cartTestData = {
  cartOperations: {
    singleProductAddition: {
      searchTerm: 'TV',
      quantity: 1,
      expectedCartCount: 1,
    },
    multipleProductsAddition: [
      {
        searchTerm: 'books',
        quantity: 1,
        expectedCartCountAfter: 1,
      },
      {
        searchTerm: 'books',
        quantity: 1,
        expectedCartCountAfter: 2,
      },
    ],
  },
  product: {
    laptop: {
      name: 'laptop',
      priceRange: { min: 20000, max: 200000 },
    },
    headphones: {
      name: 'headphones',
      priceRange: { min: 500, max: 50000 },
    },
    books: {
      name: 'books',
      priceRange: { min: 100, max: 5000 },
    },
  },
};

module.exports = cartTestData;
