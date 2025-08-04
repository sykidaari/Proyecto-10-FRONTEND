import { eventsList } from '../../components/eventsList/eventsList';
import { filterSection } from '../../components/filterSection/filterSection';

export const home = async (main) => {
  main.innerHTML = '';

  const filters = filterSection(main);

  if (!(await eventsList(main))) {
    filters.classList.add('error');
  }
};
