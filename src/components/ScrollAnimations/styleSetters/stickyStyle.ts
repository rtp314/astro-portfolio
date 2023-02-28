import { addWrappingElements, removeWrappingElements } from './shared';

export default function setStickyStyle(container: HTMLElement, pages: NodeListOf<HTMLElement>) {
  addWrappingElements(container, pages);

  const stickyPageStyle = `
    position: sticky;
    top: 0;
    height: 100svh;
    padding: 3rem;
    font-size: 4rem;
  `;

  pages.forEach(page => page.setAttribute('style', stickyPageStyle));

  function cleanup() {
    removeWrappingElements(container, pages);
    container.setAttribute('style', '');
    pages.forEach(page => page.setAttribute('style', ''));
  }

  return cleanup;
}
