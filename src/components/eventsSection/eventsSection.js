import { create } from '../../utils/elementCreator';
import './_eventsSection.scss';

export const eventsSection = ({ parentContainer }) => {
  const eventsSection = create('section', {
    className: 'events-section',
    appendTo: parentContainer
  });

  const ul = create('ul', { appendTo: eventsSection });

  return ul;
};
