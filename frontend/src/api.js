import axios from 'axios';
import { apiUrl } from './config';

export const getProduct = async (id) => {
  console.log('id is ', id);
  try {
    const response = await axios({
      url: `${apiUrl}/api/products/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.messge);
    }
    return response.data;
  } catch (err) {
    console.log('error is ', err);
    return { error: err.response.data.message || err.message };
  }
};
