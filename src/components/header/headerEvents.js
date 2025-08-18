import { routes } from '../../data/routes';

export const headerEvents = (links, mainTag) => {
  for (const routeName in links) {
    const a = links[routeName];
    const route = routes[routeName];

    a.addEventListener('click', async (e) => {
      e.preventDefault();
      await route.function(mainTag);
    });
  }
};
