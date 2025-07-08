require('dotenv').config({ path: '.env.local' }); // Load environment variables from .env file
console.log(process.env.NEXT_PUBLIC_DB_CONNECTION_STRING)
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.jsx",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DB_CONNECTION_STRING,
  }
});
