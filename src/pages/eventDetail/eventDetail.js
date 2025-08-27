import { eventArticle } from '../../components/events/eventArticle/eventArticle';

import './_eventDetail.scss';
import './_mediaQueries.scss';
import { attendanceSection } from './attendanceSection/attendanceSection';

export const eventDetail = (main, event) => {
  main.innerHTML = '';

  const { articleParent: eventWrapper, article } = eventArticle(event, main, {
    detail: true
  });

  attendanceSection(main, eventWrapper, article, event);
};
