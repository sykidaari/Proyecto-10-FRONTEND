import { create } from '../../utils/elementCreator';
import './_footer.scss';

export const footer = () => {
  const footer = create('footer', { appendTo: '#app' });

  const p = create('p', {
    innerText: 'Designed and built by ',
    appendTo: footer
  });

  const span = create('span', {
    innerText: 'Kira',
    appendTo: p
  });
};
