import './_eventArticle.scss';
import { eventDetail } from '../../../pages/eventDetail/eventDetail';
import { articleBase } from './articleBase';
import { profile } from '../../../pages/profile/profile';

export const eventArticle = (
  event,
  main,
  { parentContainer = main, detail = false, user }
) => {
  const { articleParent, article, titleH, creatorSection } = articleBase(
    event,
    parentContainer
  );

  if (detail) {
    article.classList.add('detail');
  } else {
    titleH.addEventListener('click', () => {
      eventDetail(main, event);
    });
  }

  if (
    event.creator._id === localStorage.getItem('user-id') ||
    (user && event.creator._id === user.id)
  ) {
    creatorSection.classList.add('user');
  } else if (!user) {
    creatorSection.addEventListener('click', async () => {
      await profile(main, {
        userName: event.creator.userName,
        profilePicture: event.creator.img,
        id: event.creator._id,
        errorParentContainer: article
      });
    });
  }

  return { articleParent, article };
};
