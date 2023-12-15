import cartScreen from './screens/cartScreen';
import error404Screen from './screens/error404Screen';
import homeScreen from './screens/homeScreen';
import productScreen from './screens/productScreen';
import { parseRequestUrl } from './utils';

const routes = {
  '/': homeScreen,
  '/product/:id': productScreen,
  '/cart/:id': cartScreen,
  '/cart': cartScreen,
};
const router = async () => {
  const request = parseRequestUrl();
  console.log('request', request);
  const parseUrl =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');
  console.log('parseUrl is ', parseUrl);
  console.log('routes[parseUrl] is ', routes[parseUrl]);
  console.log('routes', routes);
  const screen = routes[parseUrl] ? routes[parseUrl] : error404Screen;
  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();
  if (screen.after_render) {
    await screen.after_render();
  }
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
