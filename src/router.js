import { screenLogin } from './view/login.js';
import { screenRegister } from './view/register.js';
import { screenHome } from './view/home.js';

const viewTmp = (router) => {
  const root = document.getElementById('root');
  root.innerHTML = '';
  switch (router) {
    case '#/login':
      root.innerHTML = '';
      root.appendChild(screenLogin());
      break;
    case '#/register':
      root.appendChild(screenRegister());
      break;
    case '#/home':
      root.appendChild(screenHome());
      break;
    default:
      root.innerHTML = 'Hola';
      break;
  }
};

const changeTmp = (hash) => {
  if (hash === '#/' || hash === '' || hash === '#') {
    return viewTmp('#/login');
  }
  return viewTmp(hash);
};

export const init = () => {
  changeTmp(window.location.hash);
  window.addEventListener('hashchange', () => changeTmp(window.location.hash));
};