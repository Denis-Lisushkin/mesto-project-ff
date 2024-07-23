import './pages/index.css';
import initialCards from './scripts/cards.js';
import { createCard, likeCard, deleteCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';

const cardsList = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup_type_edit");
const profileEditForm = document.querySelector("form[name='edit-profile']");
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");
const nameInput = profileEditForm.querySelector(".popup__input_type_name");
const jobInput = profileEditForm.querySelector(".popup__input_type_description");

const addCardBotton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardForm = document.querySelector("form[name='new-place']");
const placeInput = addCardForm.querySelector(".popup__input_type_card-name");
const linkInput = addCardForm.querySelector(".popup__input_type_url");

const cardImagePupup = document.querySelector(".popup_type_image");
const popupImage = cardImagePupup.querySelector(".popup__image");
const popupCaption = cardImagePupup.querySelector(".popup__caption");
const popupList = document.querySelectorAll(".popup");

const viewCard = (cardData) => {
  popupImage.src = cardData.link
  popupImage.alt = cardData.name
  popupCaption.textContent = cardData.name;
  openPopup(cardImagePupup);
}

function handleProfileEditFormSubmit(event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(profileEditPopup);
}
function handleAddCardFormSubmit(event) {
  event.preventDefault();
  const cardData = {
    name: placeInput.value,
    link: linkInput.value,
  }
  cardsList.prepend(createCard(cardData, viewCard, likeCard, deleteCard));
  addCardForm.reset();
  closePopup(addCardPopup);
}

initialCards.forEach((card) => {
  const cardData = card;
  cardsList.append(createCard(cardData, viewCard, likeCard, deleteCard));

});

profileEditButton.addEventListener("click", (event) => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(profileEditPopup);
});

addCardBotton.addEventListener("click", (event) => {
  openPopup(addCardPopup);
});

popupList.forEach((item) => {
  item.classList.add("popup_is-animated");
  item.querySelector(".popup__close").addEventListener("click", () => {
    closePopup(item);
    
  });
  item.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains('popup')) {
      closePopup(item);
    }
  });
});

profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
