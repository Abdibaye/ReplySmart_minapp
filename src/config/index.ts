export const config = {
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
  },
  api: {
    baseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
  },
} as const;

// Validate required environment variables
const requiredEnvVars = [
  'GEMINI_API_KEY',
] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.warn(`Warning: ${envVar} is not set in environment variables`);
  }
} 