import { fetchApi } from '../../../utils/apiFetcher';
import { removeOldElement } from '../../../utils/removeOldElement';
import { errorMessage } from '../../errorHandlers/errorMessage/errorMessage';
import { loader } from '../../loader/loader';
import { successMessage } from '../../successMessage/successMessage';
import { eventArticle } from '../eventArticle/eventArticle';
import { eventsSection } from '../eventsSection/eventsSection';

export const eventsList = async (
  main,
  { parentContainer = main, fetchPath = 'events', token, user } = {}
) => {
  removeOldElement('.events-section');

  const { section, ul: sectionUl } = eventsSection({ parentContainer, user });

  const loaderElement = loader(section);

  try {
    const events = await fetchApi(fetchPath, { token });

    let empty = false;
    if (events.length === 0) {
      successMessage({
        parentContainer: sectionUl,
        innerText: 'No events here yet!',
        temporary: false
      });

      empty = true;
    }

    if (events.length > 0 && events.length < 4) {
      section.classList.add('shrink');
    }

    events.forEach((event) => {
      eventArticle(event, main, {
        parentContainer: sectionUl,
        user
      });
    });

    loaderElement.remove();

    return true;
  } catch (error) {
    loaderElement.remove();

    errorMessage({
      parentContainer: section,
      innerText:
        'There was an error loading the events, please refresh the page or try again later.'
    });
  }
};
