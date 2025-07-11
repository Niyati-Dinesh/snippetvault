import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,            // Expose to local network (0.0.0.0)
    port: 5173,            // Or whatever port you want
    strictPort: true,      // Crash if port 5173 isn't available
    hmr: {
      protocol: "ws",      // WebSocket protocol
      host: "localhost",   // Or your IP if using on LAN
      port: 5173,
    },
  },
});
