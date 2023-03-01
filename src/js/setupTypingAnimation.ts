export default function setupTypingAnimation(el: HTMLElement, delay: number) {
  const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

  if (isReduced) return;
  if (!el) return;

  function blinkCursor() {
    return new Promise<void>(resolve => {
      setTimeout(() => (cursor.style.opacity = '0'), 500);
      setTimeout(() => (cursor.style.opacity = '1'), 1000);
      setTimeout(() => (cursor.style.opacity = '0'), 1500);
      setTimeout(() => {
        cursor.style.opacity = '1';
        resolve();
      }, 2000);
    });
  }

  function typing() {
    return new Promise<void>(resolve => {
      for (let i = 0; i < contentsArray.length; i++) {
        setTimeout(() => {
          cursor.before(contentsArray[i]);
          if (i === contentsArray.length - 1) {
            resolve();
          }
        }, i * delay);
      }
    });
  }

  const contentsArray = el.innerText.split('').map(letter => {
    const newSpan = document.createElement('span');
    newSpan.innerText = letter;
    return newSpan;
  });
  const cursor = document.createElement('span');
  cursor.innerHTML = '█';
  // cursor.style.fontSize = "0.9em";
  el.innerText = '';
  el.appendChild(cursor);
  blinkCursor()
    .then(typing)
    .then(blinkCursor)
    .then(blinkCursor)
    .then(() => cursor.remove());
}
