import { create } from '../../utils/elementCreator';
import './_main.scss';

export const main = () => {
  const main = create('main', { appendTo: '#app' });

  return main;
};
