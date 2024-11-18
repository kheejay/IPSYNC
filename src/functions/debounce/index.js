export function debounce(func, wait) {
  let timeout;

  return function(...args) {
    const context = this;
    clearTimeout(timeout); // Clear any existing timer
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}
