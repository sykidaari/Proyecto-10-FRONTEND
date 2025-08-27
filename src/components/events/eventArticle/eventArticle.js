import './_eventArticle.scss';
import { eventDetail } from '../../../pages/eventDetail/eventDetail';
import { articleBase } from './articleBase';
import { profile } from '../../../pages/profile/profile';
import { create } from '../../../utils/elementCreator';
import { editEvent } from '../../../pages/editEvent/editEvent';

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

  const isCurrentUser = event.creator._id === localStorage.getItem('user-id');
  const isOtherUser = user && event.creator._id === user.id;

  if (isCurrentUser || isOtherUser) {
    creatorSection.classList.add('user');

    if (isCurrentUser) {
      const editButton = create('button', {
        innerText: 'Edit',
        classList: 'edit-button',
        appendTo: article
      });

      editButton.addEventListener('click', () => {
        editEvent(main, event._id);
      });
    }
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
