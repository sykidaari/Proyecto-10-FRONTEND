import { categoryIcons } from '../../data/imgPaths';
import { fetchApi } from '../../utils/apiFetcher';
import { create } from '../../utils/elementCreator';
import { eventsList } from '../events/eventsList/eventsList';
import './_filterSection.scss';
import './_mediaQueries.scss';

export const filterSection = (main) => {
  const filterSection = create('section', {
    className: 'filter-section',
    appendTo: main
  });

  const ul = create('ul', { appendTo: filterSection });

  const categoryLi = create('li', { appendTo: ul });

  const categoryLabel = create('label', {
    innerText: 'Category',
    htmlFor: 'category-select',
    appendTo: categoryLi
  });
  const categorySelect = create('select', {
    id: 'category-select',
    appendTo: categoryLi
  });

  const defaultOption = create('option', {
    value: '',
    innerText: 'All Categories',
    appendTo: categorySelect
  });

  for (const key in categoryIcons) {
    const option = create('option', {
      value: key,
      innerText: key,
      appendTo: categorySelect
    });
  }

  const orderLi = create('li', { appendTo: ul });

  const orderLabel = create('label', {
    innerText: 'Order',
    htmlFor: 'order-select',
    appendTo: orderLi
  });

  const orderSelect = create('select', {
    id: 'order-select',
    appendTo: orderLi
  });

  const ascOption = create('option', {
    value: 'asc',
    innerText: 'Ascending',
    appendTo: orderSelect
  });

  const descOption = create('option', {
    value: 'desc',
    innerText: 'Descending',
    appendTo: orderSelect
  });

  const selects = [categorySelect, orderSelect];
  let reqQuery = {};

  selects.forEach((select) => {
    select.addEventListener('change', async (e) => {
      const selectName = select.id.split('-')[0];

      reqQuery[selectName] = e.target.value;

      const reqQueryString = `?${new URLSearchParams(reqQuery).toString()}`;

      await eventsList(main, { fetchPath: `events${reqQueryString}` });
    });
  });

  return filterSection;
};
