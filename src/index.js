import './css/main.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import getImages from './script/api.js';
import cardTemplate from './templates/card-template.js';

const { searchForm, gallery, loadMoreBtn, endCollectionText } = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  endCollectionText: document.querySelector('.end-collection-text'),
};

let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

let currentPage = 1;
let currentHits = 0;
let searchQuery = '';

searchForm.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();
  searchQuery = e.currentTarget.searchQuery.value.trim();
  currentPage = 1;

  if (searchQuery === '') {
    Notiflix.Notify.failure(
      'The search field cannot be empty, please try again.'
    );
    return;
  }

  const response = await getImages(searchQuery, currentPage);
  console.log('🚀 ~ onSearch ~ response:', response);
  currentHits = response.hits.length;

  if (response.totalHits > 40) {
    loadMoreBtn.classList.remove('is-hidden');
  } else {
    loadMoreBtn.classList.add('is-hidden');
  }

  try {
    if (response.totalHits > 0) {
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
      gallery.innerHTML = '';
      renderCardImage(response.hits);
      lightbox.refresh();
      endCollectionText.classList.add('is-hidden');
    }

    if (response.totalHits === 0) {
      gallery.innerHTML = '';
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreBtn.classList.add('is-hidden');
      endCollectionText.classList.add('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

function renderCardImage(arr) {
  const markup = arr.map(item => cardTemplate(item)).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

loadMoreBtn.addEventListener('click', onClickLoadMoreBtn);

async function onClickLoadMoreBtn() {
  currentPage += 1;
  const response = await getImages(searchQuery, currentPage);
  renderCardImage(response.hits);
  lightbox.refresh();
  currentHits += response.hits.length;

  if (currentHits === response.totalHits) {
    loadMoreBtn.classList.add('is-hidden');
    endCollectionText.classList.remove('is-hidden');
  }
}
