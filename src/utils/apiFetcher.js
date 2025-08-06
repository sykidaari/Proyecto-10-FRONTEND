import { BASE_URL } from '../config';

export const fetchApi = async (
  path,
  { method = 'GET', token, data, json = false } = {}
) => {
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
    if (json) {
      headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(data);
    } else {
      options.body = data;
    }
  }

  const res = await fetch(url, options);

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result?.error?.message || 'Request failed');
  }

  return result;
};
