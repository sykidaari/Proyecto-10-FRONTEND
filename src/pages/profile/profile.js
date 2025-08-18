import { errorMessage } from '../../components/errorHandlers/errorMessage/errorMessage';
import { eventsList } from '../../components/events/eventsList/eventsList';
import { loader } from '../../components/loader/loader';
import { defaultProfilePicture } from '../../data/imgPaths';
import { fetchApi } from '../../utils/apiFetcher';
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
  const loaderElement = loader(main);

  const token = localStorage.getItem('token');

  try {
    const res = await fetchApi(`users/${id}`, { token });

    if (typeof res === 'string' && res.includes('unauthorized')) {
      loaderElement.remove();

      errorMessage({
        parentContainer: errorParentContainer,
        innerText: 'Please login for access!',
        popUp: true,
        removeOld: true
      });
      return;
    }

    main.innerHTML = '';

    const eventsListUser = {
      userName: userName ? `${userName}'s` : 'Your',
      profilePicture: userName ? profilePicture : null
    };

    if (!userName) {
      extendedProfile(main, res);
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
