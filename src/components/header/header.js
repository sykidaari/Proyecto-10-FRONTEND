import './_header.scss';
import { routes } from '../../routes';
import { create } from '../../utils/elementCreator';

export const header = () => {
  const header = create('header', { appendTo: '#app' });
  const navBar = create('nav', { appendTo: header });
  const ul = create('ul', { appendTo: navBar });

  for (const routeName in routes) {
    const route = routes[routeName];

    const li = create('li', { appendTo: ul });

    const a = create('a', {
      href: '#',
      className: 'navOption',
      id: routeName
    });

    if (routeName === 'home')
      create('h1', { innerText: route.text, appendTo: a });
    else a.innerText = route.text || '';

    if (route.icon) {
      create('img', { src: route.icon, alt: routeName, appendTo: a });
    }

    li.appendChild(a);
  }
};
