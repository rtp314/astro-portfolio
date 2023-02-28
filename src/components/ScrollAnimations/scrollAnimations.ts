import setParallaxStyle from './styleSetters/parallaxStyle';
import setStickyStyle from './styleSetters/stickyStyle';
import setPagedStyle from './styleSetters/pagedStyle';
import setRollupStyle from './styleSetters/rollupStyle';

export const scrollAnimationTypes = [
  { value: 'sticky', name: 'Sticky' },
  { value: 'parallax', name: 'Sticky with Parallax' },
  { value: 'paged', name: 'Paged' },
  { value: 'rollup', name: 'Rollup' },
];

let cleanupFunction: () => void = () => {};

export default function setupScrollAnimations(value: string) {
  if (!scrollAnimationTypes.some(type => type.value === value)) {
    console.error('invalid selection');
    return;
  }
  const container = document.querySelector<HTMLElement>('.scroll-animation-container');
  const pages = document.querySelectorAll<HTMLElement>('.scroll-animation-page');
  if (!container || pages.length === 0) {
    return;
  }

  switch (value) {
    case 'sticky':
      cleanupFunction();
      cleanupFunction = setStickyStyle(container, pages);
      break;

    case 'parallax':
      cleanupFunction();
      cleanupFunction = setParallaxStyle(container, pages);
      break;

    case 'paged':
      cleanupFunction();
      cleanupFunction = setPagedStyle(container, pages);
      break;

    case 'rollup':
      cleanupFunction();
      cleanupFunction = setRollupStyle(container, pages);
      break;

    default:
      break;
  }
}
