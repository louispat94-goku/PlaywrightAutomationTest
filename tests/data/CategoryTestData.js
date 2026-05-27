/**
 * CategoryTestData - Test data for category browsing tests
 */
const categoryTestData = {
  categories: {
    electronics: {
      name: 'Electronics',
      url: 'https://www.amazon.in/s?i=electronics',
      subCategories: ['Mobiles & Accessories', 'Computers', 'Television'],
      expectedFilters: ['Brand', 'Price', 'Ratings'],
    },
    mobileCategory: {
      name: 'Mobiles & Accessories',
      url: 'https://www.amazon.in/s?i=electronics',
      subCategories: ['Smartphones', 'Feature Phones', 'Accessories'],
      expectedFilters: ['Brand', 'Price', 'Ratings'],
    },
    books: {
      name: 'Books',
      url: 'https://www.amazon.in/s?i=books',
      subCategories: ['Fiction', 'Non-Fiction', 'Textbooks'],
      expectedFilters: ['Author', 'Price', 'Language'],
    },
    fashion: {
      name: 'Fashion',
      url: 'https://www.amazon.in/s?i=fashion',
      subCategories: ['Men', 'Women', 'Kids'],
      expectedFilters: ['Brand', 'Price', 'Size'],
    },
  },
};

module.exports = categoryTestData;
