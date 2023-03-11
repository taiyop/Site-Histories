import { crx, defineManifest } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Site Histories",
  version: "1.0.0",
  permissions: ["history", "tabs", "activeTab"],
  action: {
    default_popup: "index.html",
  },
  // browser_action: {           // Chromeのツールバーに配置されるアイコン
  //   default_icon: "img/trash.ico",  // 配置されるアイコン
  //   default_title: "Site Histories"  // タイトル
  // }
});

export default defineConfig({
  plugins: [react(), crx({ manifest })],
});
