export const BASE_URL = 'https://api.nomoreparties.co';

const parseError = async (res) => {
  const body = await res.json().catch(() => null);
  const message =
    body?.message ||
    body?.error?.message ||
    body?.error?.details?.errors?.[0]?.message ||
    (typeof body?.error === 'string' ? body.error : null) ||
    body?.data?.[0]?.messages?.[0]?.message ||
    (typeof body?.details?.message === 'string' ? body.details.message : null) ||
    (typeof body === 'string' ? body : null) ||
    `Error: ${res.status}`;

  throw new Error(message);
};

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : parseError(res);
  });
};
