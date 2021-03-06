const profilePopup = document.querySelector('.popup_edit-profile');
const profile = document.querySelector('.profile');
const content = document.querySelector('.content');

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
const popupPicture = popupImg.querySelector('.popup-img__picture');
const popupTitle = popupImg.querySelector('.popup-img__title');

const popupClosePicture = popupImg.querySelector('.popup__close-icon');
const popups = document.querySelectorAll('.popup');

const formEditProfile = profilePopup.querySelector('.popup__form_profile');
const formAddPlace = popupAddPlace.querySelector('.popup__form_place');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function openAddPlacePopup() {
  openPopup(popupAddPlace);
  toggleButton(formAddPlace, config);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === "Escape" && popupOpened !== null) {
    closePopup(popupOpened);
  }
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
});

function openProfilePopup () {
  openPopup(profilePopup);

  popupUserName.value = profilePersonality.textContent;
  popupUserProfession.value = profileProfession.textContent;

  toggleButton(formEditProfile, config);
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

openButtonAdd.addEventListener('click', openAddPlacePopup);
closeButtonPlace.addEventListener('click', () => closePopup(popupAddPlace));


const initialCards = [
  {
    name: '??????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: '?????????????????????? ??????????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: '??????????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: '????????????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: '???????????????????????? ??????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: '????????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function renderInitialCards() {
  const cards = initialCards.map(getElement);
  elements.append(...cards);
}

function deleteElementCardPlace (evt) {
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

renderInitialCards();

function saveElementCardPlace (evt) {
  evt.preventDefault();
  const newPlace = {name:popupUserTitle.value, link:popupUserLink.value};

  elements.prepend(getElement(newPlace));

  evt.target.reset();

  closePopup(popupAddPlace);
}

popupAddPlace.addEventListener('submit', saveElementCardPlace);

function openPopupPicture(item) {
  openPopup(popupImg);

  popupPicture.src = item.link;
  popupPicture.alt = item.name;
  popupTitle.textContent = item.name;
}

popupClosePicture.addEventListener('click', () => closePopup(popupImg));

function toggleLike (evt) {
  evt.target.classList.toggle('element__like_active');
}