import './_eventArticle.scss';
import { create } from '../../utils/elementCreator';
import { categoryIcons, defaultProfilePicture } from '../../data/imgPaths';

export const eventArticle = (event, { parentContainer }) => {
  const li = create('li', { appendTo: parentContainer });

  const article = create('article', {
    className: 'event-article',
    appendTo: li
  });

  const imgWrapper = create('div', {
    className: 'event-img-wrapper',
    appendTo: article
  });

  const img = create('img', {
    src: event.img || categoryIcons[event.category],
    className: 'event-img',
    alt: `${event.title}`,
    appendTo: imgWrapper
  });

  const titleA = create('a', { appendTo: article });
  const titleH = create('h3', {
    innerText: event.title,

    appendTo: titleA
  });

  const date = create('p', {
    innerText: event.date.split('T')[0],
    className: 'date',
    appendTo: article
  });

  const address = create('p', {
    innerText: `${event.location.address}, ${event.location.city}, ${event.location.postalCode}, ${event.location.country}`,
    className: 'address',
    appendTo: article
  });

  const description = create('p', {
    innerText: event.description,
    className: 'description',
    appendTo: article
  });

  const creatorDiv = create('div', {
    className: 'creator-div',
    appendTo: article
  });

  const creatorImg = create('img', {
    src: event.creator.img || defaultProfilePicture,
    className: 'profile-picture',
    alt: `${event.creator.userName}'s profile-picture`,
    appendTo: creatorDiv
  });
  const creatorUserName = create('a', {
    innerText: event.creator.userName,
    className: 'username',

    appendTo: creatorDiv
  });

  return { titleH, creatorDiv };
};
