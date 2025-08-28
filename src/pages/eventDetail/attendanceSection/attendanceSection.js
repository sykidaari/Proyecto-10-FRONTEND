import { authError } from '../../../components/errorHandlers/authError/authError';
import { errorMessage } from '../../../components/errorHandlers/errorMessage/errorMessage';
import { loader } from '../../../components/loader/loader';
import { defaultProfilePicture } from '../../../data/imgPaths';
import { fetchApi } from '../../../utils/apiFetcher';
import { create } from '../../../utils/elementCreator';
import { profile } from '../../profile/profile';
import './_attendanceSection.scss';

export const attendanceSection = (main, parentContainer, article, event) => {
  const { attendants, creator } = event;

  const attendanceSection = create('section', {
    className: 'attendance',
    appendTo: parentContainer
  });

  const attendantsH = create('h4', {
    innerText: 'Attendants',
    appendTo: attendanceSection
  });

  const token = localStorage.getItem('token');
  const currentUserId = localStorage.getItem('user-id');
  let currentUserIsAlreadyAttending;

  if (!token) {
    attendanceSection.classList.add('blur');

    authError({ parentContainer: attendanceSection });
  }

  const ul = create('ul', { appendTo: attendanceSection });
  let emptyMessage;

  if (attendants.length === 0) {
    ul.classList.add('invisible');

    emptyMessage = create('p', {
      innerText: 'No attendants yet!',
      className: 'empty-message',
      appendTo: attendanceSection
    });
  } else {
    attendants.forEach((attendant) => {
      const isCurrentUser = currentUserId === attendant._id ? true : false;

      if (isCurrentUser) currentUserIsAlreadyAttending = true;

      const li = create('li', {
        className: !isCurrentUser ? undefined : 'current-user',
        appendTo: ul
      });

      const img = create('img', {
        src: attendant.img || defaultProfilePicture,
        className: 'profile-picture',
        alt: !isCurrentUser
          ? `${attendant.userName}'s profile-picture`
          : 'Your profile-picture',
        appendTo: li
      });
      const userName = create('a', {
        innerText: !isCurrentUser ? attendant.userName : 'You',
        className: 'username',
        appendTo: li
      });

      li.addEventListener('click', async () => {
        await profile(main, {
          userName: attendant.userName,
          profilePicture: attendant.img,
          id: attendant._id,
          errorParentContainer: article
        });
      });
    });
  }

  if (currentUserId === creator._id) return;

  const attendButton = create('button', {
    innerText: currentUserIsAlreadyAttending ? 'Attending ✔' : 'Attend Event',
    className: currentUserIsAlreadyAttending
      ? 'attend-button attending'
      : 'attend-button',
    appendTo: attendanceSection
  });

  attendButton.addEventListener('click', async () => {
    const loaderElement = loader(attendanceSection);

    try {
      const res = await fetchApi(`events/${event._id}`, {
        method: 'PUT',
        token,
        data: { attendants: currentUserId },
        json: true
      });
      console.log(req.body);
      console.log(res);

      ul.classList.remove('invisible');
      if (emptyMessage) {
        emptyMessage.remove();
      }

      const currentUserAttendingLi = create('li', {
        className: 'current-user',
        appendTo: ul
      });

      const img = create('img', {
        src: localStorage.getItem('profile-picture') || defaultProfilePicture,
        className: 'profile-picture',
        alt: 'Your profile-picture',
        appendTo: currentUserAttendingLi
      });
      const userName = create('a', {
        innerText: 'You',
        className: 'username',
        appendTo: currentUserAttendingLi
      });

      loaderElement.remove();

      attendButton.classList.add('attending');
      attendButton.innerText = 'Attending ✔';
    } catch (error) {
      console.log(error);

      loaderElement.remove();
      errorMessage({
        parentContainer: attendanceSection,
        additionalClasses: 'failed',
        removeOld: true,
        temporary: true
      });
    }
  });
};
