// 👇 จุดเริ่มต้นของโค้ดที่ต้องคัดลอก
import flowbite from 'flowbite/plugin.js'; // 💡 แก้ไข: เพิ่ม .js เพื่อให้ Vite หาโมดูลเจอ

export default {
  plugins: {
    // นี่คือโครงสร้าง Zero-Config สำหรับ Tailwind v4
    '@tailwindcss/postcss': {
      config: {
        // Content sources
        content: [
          './index.html',
          './src/**/*.{js,ts,jsx,tsx}',
          './node_modules/flowbite/**/*.js', 
        ],
        // โหลด Flowbite Plugin
        plugins: [
          flowbite, 
        ],
      },
    },
  },
};
