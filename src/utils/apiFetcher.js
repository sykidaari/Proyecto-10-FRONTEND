export const fetchApi = async ({ path, reqType = 'GET', token }) => {
  const url = `http://localhost:3000/api/v1/${path}`;

  const res = await fetch(url, { method: reqType });
};
