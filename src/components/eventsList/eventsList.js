import { fetchApi } from '../../utils/apiFetcher';
import { errorMessage } from '../errorHandlers/errorMessage/errorMessage';
import { eventArticle } from '../eventArticle/eventArticle';
import { eventsSection } from '../eventsSection/eventsSection';
import { loader } from '../loader/loader';

export const eventsList = async (main, { parentContainer = main } = {}) => {
  const { section, ul: sectionUl } = eventsSection({ parentContainer });

  const loaderElement = loader(section);

  try {
    const events = await fetchApi('events');

    events.forEach((event) => {
      eventArticle(event, main, {
        parentContainer: sectionUl
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
