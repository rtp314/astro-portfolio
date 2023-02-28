const pageStyle = `
  position: absolute;
  height: 100svh;
  width: 100%;
  display: grid;
  place-content: center;
  transform-origin: center;
  transition: all 0.2s;
`;

const containerStyle = `
  height: 100vh;
  overflow: hidden;
`;

let windowHeight: number | null = null;
let currentIndex = 0;
let waiting = false;
let windowResizeDebounceTimer: number | null;

export default function setPagedStyle(container: HTMLElement, pages: NodeListOf<HTMLElement>) {
  let touchY: number | null;
  let translateY: number | null;
  const minimumTravelToScroll = 100;

  container.setAttribute('style', containerStyle);
  pages.forEach(page => page.setAttribute('style', pageStyle));

  windowHeight = window.innerHeight;
  fixHeights();
  scroll();

  function fixHeights() {
    pages.forEach(page => {
      page.style.height = `${windowHeight}px`;
    });
  }

  function scroll() {
    pages.forEach((page, i) => {
      if (i < currentIndex) {
        page.style.transform = `translateY(-${windowHeight}px)`;
      } else if (i > currentIndex) {
        page.style.transform = `translateY(${windowHeight}px)`;
      } else {
        page.style.transform = 'translateY(0px)';
      }
    });
  }

  // event handlers here

  function handleWheel(event: WheelEvent) {
    if (!waiting) {
      if (event.deltaY > 0) {
        if (currentIndex < pages.length - 1) currentIndex++;
      } else {
        if (currentIndex > 0) currentIndex--;
      }
      scroll();

      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, 1000);
    }
  }

  function handleResize() {
    windowHeight = window.innerHeight;
    if (windowResizeDebounceTimer) clearTimeout(windowResizeDebounceTimer);
    windowResizeDebounceTimer = setTimeout(() => {
      fixHeights();
      scroll();
    }, 300);
  }

  function handleTouchStart(event: TouchEvent) {
    touchY = event.touches[0].screenY;
  }

  function handleTouchEnd() {
    pages[currentIndex].style.transform = `translateY(0px)`;
    if (translateY && translateY > minimumTravelToScroll && currentIndex > 0) {
      currentIndex--;
      scroll();
    } else if (translateY && translateY < -minimumTravelToScroll && currentIndex < pages.length - 1) {
      currentIndex++;
      scroll();
    }
    touchY = null;
    translateY = null;
  }

  function handleTouchMove(event: TouchEvent) {
    translateY = event.touches[0].screenY - (touchY || 0);
    pages[currentIndex].style.transform = `translateY(${translateY}px)`;
  }

  // add all event listeners here, to see what to clean up
  document.addEventListener('touchstart', handleTouchStart);
  document.addEventListener('touchend', handleTouchEnd);
  document.addEventListener('touchmove', handleTouchMove);
  window.addEventListener('wheel', handleWheel);
  window.addEventListener('resize', handleResize);

  // remove all styles and event handlers here
  function cleanup() {
    document.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('touchend', handleTouchEnd);
    document.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('wheel', handleWheel);
    window.removeEventListener('resize', handleResize);
    container.setAttribute('style', '');
    pages.forEach(page => page.setAttribute('style', ''));
  }

  return cleanup;
}
