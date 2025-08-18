import { categoryIcons, defaultProfilePicture } from '../../../data/imgPaths';
import { create } from '../../../utils/elementCreator';

export const articleBase = (event, parentContainer) => {
  const li = create('li', { appendTo: parentContainer });

  const article = create('article', {
    className: 'event-article',
    appendTo: li
  });

  const imgWrapper = create('div', {
    className: 'img-wrapper',
    appendTo: article
  });

  const img = create('img', {
    src: event.img || categoryIcons[event.category],
    className: 'img',
    alt: `${event.title}`,
    appendTo: imgWrapper
  });

  const contentWrapper = create('div', {
    className: 'content-wrapper',
    appendTo: article
  });

  const titleA = create('a', { appendTo: contentWrapper });
  const titleH = create('h3', {
    innerText: event.title,

    appendTo: titleA
  });

  const category = create('p', {
    innerText: event.category,
    className: 'category',
    appendTo: contentWrapper
  });

  const date = create('p', {
    innerText: event.date.split('T')[0],
    className: 'date',
    appendTo: contentWrapper
  });

  const address = create('p', {
    innerText: `${event.location.address}, ${event.location.city}, ${event.location.postalCode}, ${event.location.country}`,
    className: 'address',
    appendTo: contentWrapper
  });

  const description = create('p', {
    innerText: event.description,
    className: 'description',
    appendTo: contentWrapper
  });

  const creatorSection = create('section', {
    className: 'creator-section',
    appendTo: contentWrapper
  });

  const creatorImg = create('img', {
    src: event.creator.img || defaultProfilePicture,
    className: 'profile-picture',
    alt: `${event.creator.userName}'s profile-picture`,
    appendTo: creatorSection
  });
  const creatorUserName = create('a', {
    innerText: event.creator.userName,
    className: 'username',

    appendTo: creatorSection
  });

  return { article, titleH, creatorSection };
};
