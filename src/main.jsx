import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// 💡 สำคัญ: บรรทัดนี้เปิดใช้งาน Flowbite JS สำหรับ Dropdown และ Mobile Menu
import 'flowbite'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);