/**
 * Central place to tweak runtime constants without relying on .env files.
 * Update apiBaseUrl to match the FastAPI host/port that serves /api/v1/sentiment.
 */
export const productConfig = {
  apiBaseUrl: 'http://localhost:8080',
}

