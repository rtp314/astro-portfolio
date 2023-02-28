export function addWrappingElements(parent: HTMLElement, children: NodeListOf<HTMLElement>) {
  const wrappers = document.querySelectorAll('.scroll-animation-wrapper');
  if (wrappers.length !== 0) return;
  children.forEach(child => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('scroll-animation-wrapper');
    newDiv.style.height = '300vh';
    newDiv.style.position = 'relative';
    newDiv.appendChild(child);
    parent.appendChild(newDiv);
  });
}

export function removeWrappingElements(parent: HTMLElement, children: NodeListOf<HTMLElement>) {
  const wrappers = document.querySelectorAll('.scroll-animation-wrapper');
  if (wrappers.length === 0) return;
  children.forEach(child => {
    parent.appendChild(child);
  });
  wrappers.forEach(wrapper => wrapper.remove());
}
