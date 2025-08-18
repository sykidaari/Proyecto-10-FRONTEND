import { create } from '../../../utils/elementCreator';
import './_eventsSection.scss';

export const eventsSection = ({ parentContainer, user }) => {
  const section = create('section', {
    className: 'events-section',
    appendTo: parentContainer
  });

  if (user) {
    const { userName, profilePicture } = user;

    const titleWrapper = create('div', {
      className: 'title-wrapper',
      appendTo: section
    });

    const titleDiv = create('div', {
      className: 'title-div',
      appendTo: titleWrapper
    });

    if (profilePicture) {
      const titleImg = create('img', {
        src: profilePicture,
        alt: `${userName} profile-picture`,
        className: 'profile-picture',
        appendTo: titleDiv
      });
    }
    const titleH = create('h2', {
      appendTo: titleDiv
    });

    const hSpan = create('span', { innerText: userName, appendTo: titleH });

    titleH.append(' events:');
  }

  const ul = create('ul', { appendTo: section });

  return { section, ul };
};
