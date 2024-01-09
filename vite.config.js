import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
const manifestForPlugin = {
  registerType:'prompt',
  includeAssests:['favicon.ico', "logo192.png"],
  manifest:{
    name:"React-vite-app",
    short_name:"react-vite-app",
    description:"I am a simple vite app",
    icons:[{
      src: '/favicon.ico',
      sizes:'192x192',
      type:'image/png',
      purpose:'favicon'
    },
    {
      src:'/logo192.png',
      sizes:'192x192',
      type:'image/png',
      purpose:'any maskable'
    },
  ],
  theme_color:'#181818',
  background_color:'#e0cc3b',
  display:"standalone",
  scope:'/',
  start_url:"/",
  orientation:'portrait'
  },
};
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});