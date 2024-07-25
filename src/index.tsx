import React from 'react';
import ReactDOM from 'react-dom/client';
import "normalize.css"

// import './styles/base.css'
// border: 1px; 一像素边框在不同的移动端中展示效果不一样，因此需要引入 border.css，
// 使用 border 的时候，直接使用 border.css 中定义好的即可
import './styles/border.css'
import App from './App';

// 在 Chrome 浏览器的开发者模式下选用移动端展示，以 iPhone SE 机型展示的效果为标准
// iPhone SE 的宽度默认为 375，然后它的 html font-size 设置为 100px
// 在 iPhone XR 或者 iPhone 11 等机型下，由于宽度不一样，为了跟 iPhone SE 一样的展示效果，需要设置下方的配置
document.documentElement.style.fontSize = document.documentElement.clientWidth / 375 * 100 + 'px';

window.addEventListener('resize', () => {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 375 * 100 + 'px';
})


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);