import { authError } from '../../components/errorHandlers/authError/authError';
import { errorMessage } from '../../components/errorHandlers/errorMessage/errorMessage';
import { eventsList } from '../../components/events/eventsList/eventsList';
import { loader } from '../../components/loader/loader';
import { defaultProfilePicture } from '../../data/imgPaths';
import { fetchApi } from '../../utils/apiFetcher';
import { removeOldElement } from '../../utils/removeOldElement';
import { extendedProfile } from './extendedProfile/extendedProfile';

export const profile = async (
  main,
  {
    userName,
    profilePicture = defaultProfilePicture,
    id = localStorage.getItem('user-id'),
    errorParentContainer
  } = {}
) => {
  removeOldElement('.blur-div');

  const loaderElement = loader(main);

  const token = localStorage.getItem('token');

  try {
    const res = await fetchApi(`users/${id}`, { token });

    if (typeof res === 'string' && res.includes('unauthorized')) {
      loaderElement.remove();

      authError({
        parentContainer: errorParentContainer,
        additionalClasses: 'profile',
        popUp: true,
        removeOld: true
      });
      return;
    }

    main.innerHTML = '';

    const currentUser = id === localStorage.getItem('user-id') ? true : false;

    const eventsListUser = {
      userName: currentUser ? 'Your' : `${userName}'s`,
      profilePicture: currentUser ? null : profilePicture,
      id
    };

    if (currentUser) {
      extendedProfile(main, res, token);
    }

    await eventsList(main, {
      fetchPath: `events/creator/${id}`,
      token,
      user: eventsListUser
    });

    loaderElement.remove();
  } catch (error) {
    loaderElement.remove();

    errorMessage({
      parentContainer: main,
      removeOld: true,
      additionalClasses: 'profile',
      temporary: true
    });
  }
};
