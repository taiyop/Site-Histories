import { crx, defineManifest } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Site Histories",
  version: "1.0.0",
  permissions: ["history", "tabs", "activeTab"],
  action: {
    default_icon: "src/assets/icon16x16.png",
    default_popup: "index.html",
  },
  commands: {
    _execute_action: {
      suggested_key: {
        default: "Ctrl+Shift+P",
      },
    },
  },
  icons: {
    16: "src/assets/icon16x16.png",
    48: "src/assets/icon48x48.png",
    128: "src/assets/icon128x128.png"
  },
});

export default defineConfig({
  plugins: [react(), crx({ manifest })],
});
