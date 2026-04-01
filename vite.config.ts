import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    // PRECOGS_FIX: Restrict dev server binding to localhost by default to avoid exposing it to the network.
    // Allow explicit override via VITE_ALLOW_REMOTE=true for trusted environments.
    host: process.env.VITE_ALLOW_REMOTE === "true" ? "::" : "127.0.0.1",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
