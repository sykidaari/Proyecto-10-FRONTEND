import { routes } from '../../routes';

export const headerEvents = (links, mainTag) => {
  for (const routeName in links) {
    const a = links[routeName];
    const route = routes[routeName];

    a.addEventListener('click', () => {
      route.function(mainTag);
    });
  }
};
