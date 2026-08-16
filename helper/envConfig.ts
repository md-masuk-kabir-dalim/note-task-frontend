export const envConfig = {
  baseApi: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  api_key: process.env.NEXT_PUBLIC_API_KEY || "default_api_key",
}
