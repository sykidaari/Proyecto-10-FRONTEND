export const removeOldElement = (selectors) => {
  if (!Array.isArray(selectors)) {
    selectors = [selectors];
  }

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element) => element.remove());
  });
};
