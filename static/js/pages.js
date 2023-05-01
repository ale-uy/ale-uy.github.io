const linksContainer = document.querySelector('.links');
const descriptionContainer = document.querySelector('.description');

linksContainer.addEventListener('scroll', () => {
  const links = Array.from(linksContainer.children);
  const linkWidth = links[0].getBoundingClientRect().width;
  const containerWidth = linksContainer.getBoundingClientRect().width;
  const currentLinkIndex = Math.floor(linksContainer.scrollLeft / linkWidth);

  descriptionContainer.innerText = links[currentLinkIndex].dataset.description;
});
