import { eventArticle } from '../../components/events/eventArticle/eventArticle';
import { fetchApi } from '../../utils/apiFetcher';
import './_eventDetail.scss';

export const eventDetail = async (main, event) => {
  main.innerHTML = '';

  eventArticle(event, main, {
    detail: true
  });

  console.log(event);
};
