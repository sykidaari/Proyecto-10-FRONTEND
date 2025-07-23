import { BASE_URL } from '../config';

export const fetchApi = async (path, { method = 'GET', token, data } = {}) => {
  const url = `${BASE_URL}${path}`;
  const headers = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers
  };

  if (method !== 'GET' && data) {
    options.body = data;
  }

  const res = await fetch(url, options);

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result?.error?.message || 'Request failed');
  }

  return result;
};
