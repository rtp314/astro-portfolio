import { addWrappingElements, removeWrappingElements } from './shared';

export default function setParallaxStyle(container: HTMLElement, pages: NodeListOf<HTMLElement>) {
  addWrappingElements(container, pages);
  const stickyPageStyle = `
    position: sticky;
    top: 0;
    height: 100svh;
    padding: 3rem;
    font-size: 4rem;
    --offset: -250px;
    background-position: 0 var(--offset);
  `;

  pages.forEach(page => page.setAttribute('style', stickyPageStyle));

  const observer = new IntersectionObserver(observerFn, { threshold: 0, rootMargin: '0px' });

  pages.forEach(page => observer.observe(page));

  const scrollListener = (target: HTMLElement) => {
    target.style.setProperty(
      '--offset',
      `${Math.floor((250 * target.getBoundingClientRect().top) / window.innerHeight)}px`,
    );
  };

  function observerFn(entries: IntersectionObserverEntry[]) {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', () => scrollListener(entry.target as HTMLElement));
      } else {
        window.removeEventListener('scroll', () => scrollListener(entry.target as HTMLElement));
      }
    }
  }

  function cleanup() {
    removeWrappingElements(container, pages);
    container.setAttribute('style', '');
    pages.forEach(page => page.setAttribute('style', ''));
  }

  return cleanup;
}
