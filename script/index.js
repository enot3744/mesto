const popup = document.querySelector('.popup');
const profile = document.querySelector('.profile');
const content = document.querySelector('.content');
const closeButton = popup.querySelector('.popup__close-icon');
const openButton = profile.querySelector('.profile__edit-button');
let profilePersonality = content.querySelector('.profile__personality');
let profileProfession = content.querySelector('.profile__profession');
let popupUserName = popup.querySelector('.popup__user_name');
let popupUserProfession = popup.querySelector('.popup__user_profession');

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
  popupFormOpen();
  popupFormClose();
}

popup.addEventListener('submit', formSubmitHandler);