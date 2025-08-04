// //main.jsx
// import { StrictMode } from 'react'
// import './i18n';
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import "bootstrap/dist/css/bootstrap.min.css";  // Bootstrap CSS
// import "bootstrap/dist/js/bootstrap.bundle.min";  // Bootstrap JS (required for carousel)
// // tailwind base;
// // @tailwind components;
// // @tailwind utilities;

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LocalizationProvider } from './localization/LocalizationContext'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocalizationProvider>
      <App />
    </LocalizationProvider>
  </StrictMode>,
)