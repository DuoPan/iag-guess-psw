const BASE_URL = 'http://localhost:8000';

const toQueryString = (query) => {
  // Query = { key: value}
  const encode = encodeURIComponent;
  return (
      "?" +
      Object.keys(query)
          .map(k => encode(k) + "=" + encode(query[k]))
          .join("&")
  );
};

const get = async (uri, queries = {}) => {
  const queryString = toQueryString(queries);
  return await fetch(BASE_URL + uri + queryString, {
    method: 'GET',
    headers: {'Content-Type':'application/json'},
  })
    .then(res => res.json());
};

const post = async (uri, postData = {}) => {
  return await fetch(BASE_URL + uri, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(postData),
  })
    .then(res => {
      if (res.status === 404) {
        return {status: 404};
      }
      return res.json();
    });
};

export const getNewPassword = async () => {
  return await get('/new-password');
};

export const verifyPassword = async (postData) => {
  return await post('/verify-password', postData);
};
