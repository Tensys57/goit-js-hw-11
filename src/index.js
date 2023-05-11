import Notiflix from 'notiflix';
import { request_API } from './utilities.js';

const refs = {
  searchForm: document.querySelector('.search-form'),
  searchInput: document.querySelector('[name="searchQuery"]'),
  searchBtn: document.querySelector('button[data-action="Search"]'),
  galleryDiv: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};
const { searchForm, searchInput, searchBtn, galleryDiv, loadBtn } = refs;
let currentPage = 1;
let userRequest = '';
loadBtn.style.display = 'none';
searchForm.addEventListener('submit', searchHandler);
loadBtn.addEventListener('click', loadHandler);

async function getData(params) {
  try {
    const { hits, totalHits } = await request_API(params);
    if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    const totalPages = Math.ceil(totalHits / 40);
    if (currentPage < totalPages) {
      loadBtn.style.display = 'block';
    } else {
      loadBtn.style.display = 'none';
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }

    const markup = createGalleryCards(hits);
    galleryDiv.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    console.log(error);
  }
}

async function searchHandler(el) {
  el.preventDefault();
  clearDiv();
  currentPage = 1;
  const userRequest = el.currentTarget.elements.searchQuery.value.trim();
  if (!userRequest) return;
  const params = {
    q: userRequest,
    page: currentPage,
  };
  getData(params);
}

function createGalleryCards(hits) {
  return hits
    .map(
      el =>
        `<div class="photo-card">
  <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" width = "300" height = "200"/>
  <div class="info">
    <p class="info-item">
      <b>Likes </b><span>${el.likes} </span>
    </p>
    <p class="info-item">
      <b>Views </b>${el.views}
    </p>
    <p class="info-item">
      <b>Comments </b>${el.comments}
    </p>
    <p class="info-item">
      <b>Downloads </b>${el.downloads}
    </p>
  </div>
  </div>`
    )
    .join('');
}

function clearDiv() {
  galleryDiv.innerHTML = '';
}
async function loadHandler() {
  currentPage += 1;

  const params = {
    q: userRequest,
    page: currentPage,
  };

  getData(params);
}
