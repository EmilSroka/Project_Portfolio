export default (selector, id) => {
  document.querySelector(selector).addEventListener('click', () => {
    location.href = `#${id}`;
  });
}