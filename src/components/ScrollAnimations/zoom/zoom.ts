const layers: HTMLElement[] = Array.from(document.querySelectorAll('.layer'));
const scaleBase = 5;

let zoomFactor = 1;

function setScale() {
  layers.forEach((layer, i) => {
    layer.style.setProperty('--scale', (zoomFactor / scaleBase ** i).toString());
  });
}

setScale();

let timeout = false;

window.addEventListener('scroll', () => {
  if (!timeout) {
    requestAnimationFrame(() => {
      const percentageScrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      zoomFactor = scaleBase ** ((layers.length - 1) * percentageScrolled);
      setScale();
      timeout = false;
    });
    timeout = true;
  }
});

export default {};
