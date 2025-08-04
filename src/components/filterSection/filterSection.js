import { categoryIcons } from '../../data/imgPaths';
import { create } from '../../utils/elementCreator';
import './_filterSection.scss';

export const filterSection = (parentTag) => {
  const filterSection = create('section', {
    className: 'filter-section',
    appendTo: parentTag
  });

  const ul = create('ul', { appendTo: filterSection });

  // CATEGORY
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

  // ORDER

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

  return filterSection;
};
