import { create } from '../../utils/elementCreator';
import './_loader.scss';

export const loader = (parentContainer, { type = 'circle' } = {}) => {
  const loader = create('div', {
    className: `loader ${type}`,
    appendTo: parentContainer
  });

  return loader;
};
