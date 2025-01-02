import axios from 'axios';

const API_URL =
  'https://v6.exchangerate-api.com/v6/9a65d5cc7b96051c984f4a40/latest/';

export const fetchConversionRate = async (baseCurrency: string) => {
  try {
    const response = await axios.get(`${API_URL}${baseCurrency}`);
    return response.data.conversion_rates;
  } catch (error) {
    throw new Error('SomeThing Went Wrong');
  }
};
