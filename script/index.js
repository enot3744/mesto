const profilePopup = document.querySelector('.popup_edit-profile');
const profile = document.querySelector('.profile');
const content = document.querySelector('.content');
const popup = document.querySelector('.popup');

const profileCloseBtn = profilePopup.querySelector('.popup__close-icon');
const profileOpenBtn = profile.querySelector('.profile__edit-button');

const profilePersonality = content.querySelector('.profile__personality');
const profileProfession = content.querySelector('.profile__profession');

const popupUserName = profilePopup.querySelector('.popup__user_form_name');
const popupUserProfession = profilePopup.querySelector('.popup__user_form_profession');

const popupAddPlace = document.querySelector('.popup_add-place');
const openButtonAdd = profile.querySelector('.profile__add-button');
const popupUserTitle = popupAddPlace.querySelector('.popup__user_form_title');
const popupUserLink = popupAddPlace.querySelector('.popup__user_form_link');
const closeButtonPlace = popupAddPlace.querySelector('.popup__close-icon');

const elements = document.querySelector('.elements');
const template = document.querySelector('.template');

const popupImg = document.querySelector('.popup-img');

const popupClosePicture = popupImg.querySelector('.popup__close-icon');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openProfilePopup () {
  openPopup(profilePopup);

  popupUserName.value = profilePersonality.textContent;
  popupUserProfession.value = profileProfession.textContent;
}

profileOpenBtn.addEventListener('click', openProfilePopup);
profileCloseBtn.addEventListener('click', () => closePopup(profilePopup));

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profilePersonality.textContent = popupUserName.value;
  profileProfession.textContent = popupUserProfession.value;
  closePopup(profilePopup);
}

profilePopup.addEventListener('submit', handleProfileFormSubmit);

openButtonAdd.addEventListener('click',() => openPopup(popupAddPlace));
closeButtonPlace.addEventListener('click', () => closePopup(popupAddPlace));

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

function render() {
  const cards = initialCards.map(getElement);
  elements.append(...cards);
}

function deleteElementCardPlace (evt) {
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
  elementImage.alt = item.name;

  deleteElementPlace.addEventListener('click', deleteElementCardPlace);

  elementImage.addEventListener('click', () => openPopupPicture(item));
  
  likeButton.addEventListener('click', toggleLike);
  
  return getCard;
}

render();

function saveElementCardPlace (evt) {
  evt.preventDefault();
  const titleValue = popupUserTitle.value;
  const imageValue = popupUserLink.value;
  const newPlace = {name:titleValue, link:imageValue};

  elements.prepend(getElement(newPlace));

  evt.target.reset();

  closePopup(popupAddPlace);
}

popupAddPlace.addEventListener('submit', saveElementCardPlace);

function openPopupPicture(item) {
  openPopup(popupImg);

  const popupPicture = popupImg.querySelector('.popup-img__picture');
  const popupTitle = popupImg.querySelector('.popup-img__title');

  popupPicture.src = item.link;
  popupPicture.alt = item.name;
  popupTitle.textContent = item.name;
}

popupClosePicture.addEventListener('click', () => closePopup(popupImg));

function toggleLike (evt) {
  evt.preventDefault();
  evt.target.classList.toggle('element__like_active');
}