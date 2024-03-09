// vite.config.js
import ReactRefresh from '@vitejs/plugin-react-refresh';

export default {
  plugins: [ReactRefresh()],
  css: {
    preprocessorOptions: {
      // Add this line to include your styles
      includePaths: [require('tailwindcss')],
    },
  },
};
