import { create } from '../../utils/elementCreator';
import './_eventsSection.scss';

export const eventsSection = ({ parentContainer }) => {
  const section = create('section', {
    className: 'events-section',
    appendTo: parentContainer
  });

  const ul = create('ul', { appendTo: section });

  return { section, ul };
};
