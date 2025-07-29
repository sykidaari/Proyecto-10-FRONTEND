import { eventArticle } from '../../components/eventArticle/eventArticle';
import { eventsSection } from '../../components/eventsSection/eventsSection';
import { filterSection } from '../../components/filterSection/filterSection';
import { fetchApi } from '../../utils/apiFetcher';

export const home = async (main) => {
  main.innerHTML = '';

  const { categorySelect, orderSelect } = filterSection(main);

  const eventsSectionUl = eventsSection({ parentContainer: main });

  const events = await fetchApi('events');

  events.forEach((event) => {
    const { titleH, creatorDiv } = eventArticle(event, {
      parentContainer: eventsSectionUl
    });

    titleH.addEventListener('click', () => {});
  });
};
