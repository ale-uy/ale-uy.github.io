const imageList = document.querySelector('.image-list');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

prevButton.addEventListener('click', () => {
  imageList.scrollLeft -= 100;
});

nextButton.addEventListener('click', () => {
  imageList.scrollLeft += 100;
});
