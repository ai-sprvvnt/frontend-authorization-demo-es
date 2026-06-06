export const BASE_URL = 'https://api.nomoreparties.co';

const parseError = async (res) => {
  const body = await res.json().catch(() => null);
  const message =
    body?.message ||
    body?.error?.message ||
    body?.error?.details?.errors?.[0]?.message ||
    body?.data?.[0]?.messages?.[0]?.message ||
    (typeof body?.error === 'string' ? body.error : null) ||
    (typeof body?.details?.message === 'string' ? body.details.message : null) ||
    (typeof body === 'string' ? body : null) ||
    `Error: ${res.status}`;

  throw new Error(message);
};

export const register = (username, password, email) => {
  return fetch(`${BASE_URL}/auth/local/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, email }),
  }).then((res) => {
    return res.ok ? res.json() : parseError(res);
  });
};

export const authorize = (identifier, password) => {
  return fetch(`${BASE_URL}/auth/local`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ identifier, password }),
  }).then((res) => {
    return res.ok ? res.json() : parseError(res);
  });
};
