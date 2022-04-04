const popup = document.querySelector('.popup');
const profile = document.querySelector('.profile');
const content = document.querySelector('.content');
const closeButton = popup.querySelector('.popup__close-icon');
const openButton = profile.querySelector('.profile__edit-button');
let profilePersonality = content.querySelector('.profile__personality');
let profileProfession = content.querySelector('.profile__profession');
let popupName = popup.querySelector('.popup__name');
let popupProfession = popup.querySelector('.popup__profession');


function popupForm () {
  popup.classList.toggle('popup_opened');
  popupName.value = profilePersonality.textContent;
  popupProfession.value = profileProfession.textContent;
}


openButton.addEventListener('click', popupForm);
closeButton.addEventListener('click', popupForm);

function formSubmitHandler (evt) {
  evt.preventDefault();
  profilePersonality.textContent = popupName.value;
  profileProfession.textContent = popupProfession.value;
  popupForm();
}

popup.addEventListener('submit', formSubmitHandler);
