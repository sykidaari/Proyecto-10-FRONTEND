import { fetchApi } from '../../utils/apiFetcher';
import { errorMessage } from '../errorMessage/errorMessage';
import { eventArticle } from '../eventArticle/eventArticle';
import { eventsSection } from '../eventsSection/eventsSection';

export const eventsList = async (main, { parentContainer = main } = {}) => {
  const eventsSectionUl = eventsSection({ parentContainer });

  try {
    const events = await fetchApi('events');

    console.log(events);

    events.forEach((event) => {
      eventArticle(event, main, {
        parentContainer: eventsSectionUl
      });
    });

    return true;
  } catch (error) {
    errorMessage({
      parentContainer: eventsSectionUl,
      innerText:
        "There's was an error loading the events, please refresh the page or try again later."
    });
  }
};
