import axios from 'axios';
import Rating from '../components/rating';

const homeScreen = {
  render: async () => {
    const response = await axios({
      url: 'http://localhost:5000/api/products',
      headers: {
        'content-type': 'application/json',
      },
    });
    if (!response || response.statusText !== 'OK') {
      return '<div>error in getting the data</div>';
    }
    const products = await response.data;
    return `
        <ul class='products'>
        ${products
          .map(
            (product) => `
          <li>
            <div class="product">
              <a href="/#/product/${product._id}">
                <img src="${product.image}" alt="${product.name}" />
              </a>
              <div class="product-name">
                <a href="/#/product/${product._id}">${product.name}</a>
              </div>
              <div class = 'product-rating'>
              ${Rating.render({
                value: product.rating,
                text: `${product.numReviews} reviews`,
              })}
              </div>
              <div class="product-brand">${product.brand}</div>
              <div class="product-price">${product.price}</div>
            </div>
          </li>
        `
          )
          .join('')}
        </ul>
        `;
  },
};

export default homeScreen;
