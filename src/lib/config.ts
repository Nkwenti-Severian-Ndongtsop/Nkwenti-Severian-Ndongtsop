/**
 * Centralized runtime configuration.
 *
 * `VITE_AI_SERVER_URL` can be set at build time (Vercel, local `.env`).
 * It defaults to the deployed Render backend.
 */
const DEFAULT_AI_SERVER_URL = "https://backend-ai-x0er.onrender.com";

const configuredUrl = import.meta.env.VITE_AI_SERVER_URL?.trim();

export const AI_SERVER_URL = (configuredUrl || DEFAULT_AI_SERVER_URL).replace(/\/+$/, "");

export const AI_CHAT_ENDPOINT = `${AI_SERVER_URL}/api/chat`;
export const AI_HEALTH_ENDPOINT = `${AI_SERVER_URL}/health`;
