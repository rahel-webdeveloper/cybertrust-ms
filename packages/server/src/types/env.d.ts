declare module 'bun' {
  interface Env {
    PORT: number;
    DB_URI: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: number;
    ADMIN_EMAIL: string;
    ADMIN_PW: string;
    CLIENT_URL: string;
  }
}
