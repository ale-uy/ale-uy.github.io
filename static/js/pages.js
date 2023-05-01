const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const imageList = document.querySelector(".image-list");
const images = document.querySelectorAll(".image-list img");

let currentIndex = 0;
let maxIndex = images.length - 1;

images[currentIndex].classList.add("current");

prevButton.addEventListener("click", () => {
	images[currentIndex].classList.remove("current");
	if (currentIndex === 0) {
		currentIndex = maxIndex;
	} else {
		currentIndex--;
	}
	images[currentIndex].classList.add("current");
	updateListPosition();
});

nextButton.addEventListener("click", () => {
	images[currentIndex].classList.remove("current");
	if (currentIndex === maxIndex) {
		currentIndex = 0;
	} else {
		currentIndex++;
	}
	images[currentIndex].classList.add("current");
	updateListPosition();
});

function updateListPosition() {
	const currentImage = images[currentIndex];
	const currentOffset = currentImage.offsetLeft - (imageList.offsetWidth - currentImage.offsetWidth) / 2;
	imageList.style.transform = `translateX(-${currentOffset}px)`;
}

updateListPosition();
