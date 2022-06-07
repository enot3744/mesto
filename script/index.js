const popup = document.querySelector('.popup__edit_profile');
const profile = document.querySelector('.profile');
const content = document.querySelector('.content');

const closeButton = popup.querySelector('.popup__close-icon');
const openButton = profile.querySelector('.profile__edit-button');

let profilePersonality = content.querySelector('.profile__personality');
let profileProfession = content.querySelector('.profile__profession');

let popupUserName = popup.querySelector('.popup__user_form_name');
let popupUserProfession = popup.querySelector('.popup__user_form_profession');

function popupFormOpen () {
  popup.classList.add('popup_opened');

  popupUserName.value = profilePersonality.textContent;
  popupUserProfession.value = profileProfession.textContent;
}

function popupFormClose () {
  popup.classList.remove('popup_opened');
}

openButton.addEventListener('click', popupFormOpen);
closeButton.addEventListener('click', popupFormClose);

function formSubmitHandler (evt) {
  evt.preventDefault();
  profilePersonality.textContent = popupUserName.value;
  profileProfession.textContent = popupUserProfession.value;
  popupFormClose();
}

popup.addEventListener('submit', formSubmitHandler);

const popupAddPlace = document.querySelector('.popup__add_place');
const openButtonAdd = profile.querySelector('.profile__add-button');
const popupUserTitle = popupAddPlace.querySelector('.popup__user_form_title');
const popupUserLink = popupAddPlace.querySelector('.popup__user_form_link');
const closeButtonPlace = popupAddPlace.querySelector('.popup__close-icon');

function popupFormOpenAdd () {
  popupAddPlace.classList.add('popup_opened');
}

function popupFormCloseCard () {
  popupAddPlace.classList.remove('popup_opened');
  popupUserTitle.value = '';
  popupUserLink.value = '';
}

openButtonAdd.addEventListener('click', popupFormOpenAdd);
closeButtonPlace.addEventListener('click', popupFormCloseCard);

let initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elements = document.querySelector('.elements');
const template = document.querySelector('.template');

function render() {
  const cards = initialCards.map(getElement);
  elements.append(...cards);
}

function deletePlace (evt) {
  evt.preventDefault();
  const elementDelete = evt.target.closest(".element");
    elementDelete.remove();
}

function getElement(item) {
  const getCard = template.content.cloneNode(true);
  const elementTitle = getCard.querySelector('.element__title');
  const elementImage = getCard.querySelector('.element__image');
  const deleteElementPlace = getCard.querySelector('.element__delete-icon');
  const likeButton = getCard.querySelector('.element__like');

  elementTitle.textContent = item.name;
  elementImage.src = item.link;

  deleteElementPlace.addEventListener('click', deletePlace);

  elementImage.addEventListener('click', openPicture);
  
  likeButton.addEventListener('click', like);
  
  return getCard;
}

render();

function savePlace (evt) {
  evt.preventDefault();
  const titleValue = popupUserTitle.value;
  const imageValue = popupUserLink.value;
  const newPlace = {name:titleValue, link:imageValue};

  elements.prepend(getElement(newPlace));

  popupFormCloseCard();
}

popupAddPlace.addEventListener('submit', savePlace);

const popupImg = document.querySelector('.popup-img');

function openPicture(evt) {
  evt.preventDefault();
  popupImg.classList.add('popup_opened');

  const elementImage = evt.target.closest('.element__image');
  const popupPicture = popupImg.querySelector('.popup-img__picture');

  popupPicture.src = elementImage.src;

  const element = evt.target.closest('.element');
  const elementTitle = element.querySelector('.element__title');
  const popupTitle = popupImg.querySelector('.popup-img__title');

  popupTitle.textContent = elementTitle.textContent;
}

const popupClosePicture = popupImg.querySelector('.popup__close-icon');

function closePicture() {
  popupImg.classList.remove('popup_opened');
}

popupClosePicture.addEventListener('click', closePicture);

function like (evt) {
  evt.preventDefault();
  evt.target.classList.toggle('element__like_active');
}