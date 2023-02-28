const containerStyle = `
  height: 300vh;
`;

const wrapperStyle = `
  height: 100svh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
`;

const pageStyle = `
  transition: flex-grow 1s;
`;

export default function setRollupStyle(container: HTMLElement, pages: NodeListOf<HTMLElement>) {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('style', wrapperStyle);
  pages.forEach(page => {
    page.setAttribute('style', pageStyle);
    wrapper.appendChild(page);
  });
  container.appendChild(wrapper);
  container.setAttribute('style', containerStyle);
  pages[0].classList.add('rollup-active');

  function handleScroll() {
    const fractionScrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    const thresholds = Array.from(pages).map((_, i) => i / pages.length);
    const interval = 1 / pages.length;

    thresholds.forEach((minValue, i) => {
      if (
        fractionScrolled >= minValue &&
        fractionScrolled < minValue + interval &&
        !pages[i].classList.contains('rollup-active')
      ) {
        pages[i].classList.add('rollup-active');
        pages[i - 1]?.classList.remove('rollup-active');
        pages[i + 1]?.classList.remove('rollup-active');
      }
    });
  }
  window.addEventListener('scroll', handleScroll);

  function cleanup() {
    window.removeEventListener('scroll', handleScroll);
    container.setAttribute('style', '');
    pages.forEach(page => {
      container.appendChild(page);
      page.setAttribute('style', '');
    });
    wrapper.remove();
  }

  return cleanup;
}
