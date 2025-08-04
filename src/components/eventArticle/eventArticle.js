import './_eventArticle.scss';
import { create } from '../../utils/elementCreator';
import { categoryIcons, defaultProfilePicture } from '../../data/imgPaths';
import { eventDetail } from '../../pages/eventDetail/eventDetail';
import { articleBase } from './articleBase';

export const eventArticle = (
  event,
  main,
  { parentContainer = main, detail = false }
) => {
  const { article, titleH } = articleBase(event, parentContainer);

  if (detail) {
    article.classList.add('detail');

    const attendanceSection = create('section');
  } else {
    titleH.addEventListener('click', () => {
      eventDetail(main, event);
    });
  }
};
