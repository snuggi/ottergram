const DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
const DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
const DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
const THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
const HIDDEN_DETAIL_CLASS = 'hidden-detail';
const TINY_EFFECT_CLASS = 'is-tiny';
const ESC_KEY = 27;
let imageIndex = 0;

function setDetails(imageURL, titleText) {
    const detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageURL);

    const detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.innerHTML = titleText;
}

function imageFromThumb(thumbnail) {
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function setIndex(newIndex) {
    imageIndex = newIndex;
}

function showDetails() {
    const frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(() => {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addThumbClickHandler(thumb, index) {
    thumb.addEventListener('click', (event) => {
        event.preventDefault();
        setIndex(index);
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    const thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    const thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function addKeyPressHandler() {
    document.body.addEventListener('keyup', (event) => {
        event.preventDefault();
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function addCycleImagesLeftHandler() {
    document.getElementById('left').addEventListener('click', () => {
        const thumbnailArray = getThumbnailsArray();
        let previousIndex;
        if (imageIndex === 0) {
            previousIndex = thumbnailArray.length - 1;
        } else {
            previousIndex = (imageIndex - 1) % thumbnailArray.length;
        }
        setIndex(previousIndex);
        setDetailsFromThumb(thumbnailArray[previousIndex]);
        showDetails();
    });
}

function addCycleImagesRightHandler() {
    document.getElementById('right').addEventListener('click', () => {
        const thumbnailArray = getThumbnailsArray();
        const nextImageIndex = (imageIndex + 1) % thumbnailArray.length;
        setIndex(nextImageIndex);
        setDetailsFromThumb(thumbnailArray[nextImageIndex]);
        showDetails();
    });
}

function initializeEvents() {
    const thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addCycleImagesLeftHandler();
    addCycleImagesRightHandler();
    addKeyPressHandler();
}

initializeEvents();