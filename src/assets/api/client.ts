import createClient from 'openapi-fetch';
import type { paths } from './schema';

const TOKEN_KEY = 'accessToken';

export const api = createClient<paths>({
  baseUrl: 'http://90.157.97.10:8081',
});

api.use({
  onRequest({ request }) {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) request.headers.set('Authorization', `Bearer ${token}`);
    return request;
  },
});

export { TOKEN_KEY };