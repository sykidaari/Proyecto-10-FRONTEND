import './_header.scss';

import { create } from '../../utils/elementCreator';
import { routes } from '../../data/routes';

export const header = (app) => {
  const header = create('header', { appendTo: app });
  const navBar = create('nav', { appendTo: header });
  const ul = create('ul', { appendTo: navBar });

  const links = {};

  for (const routeName in routes) {
    const route = routes[routeName];

    const li = create('li', { appendTo: ul });

    const a = create('a', {
      href: '',
      className: 'navOption',
      id: `${routeName}-link`
    });

    if (routeName === 'home')
      create('h1', { innerText: route.text, appendTo: a });
    else a.innerText = route.text || '';

    if (routeName === 'profile') {
      a.classList.add('invisible');

      create('img', {
        src: route.icon,
        alt: routeName,
        className: 'profile-picture',
        appendTo: a
      });
    }

    li.appendChild(a);
    links[routeName] = a;
  }

  return links;
};
