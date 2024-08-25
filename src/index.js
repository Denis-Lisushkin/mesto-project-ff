import "./pages/index.css";
import { createCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserInfo,
  patchUserInfo,
  getCards,
  addCard,
  patchAvatar,
  deleteCard,
  likeCard,
  unlikeCard,
} from "./components/api.js";

const cardsList = document.querySelector(".places__list");

const avatarEditButton = document.querySelector(".profile__image");
const avatarEditPopup = document.querySelector(".popup_type_avatar");
const avatarEditForm = document.querySelector("form[name='edit-avatar']");
const avatarInput = avatarEditForm.querySelector(".popup__input_type_url");
const avatarSubmitButton = avatarEditForm.querySelector(".popup__button");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup_type_edit");
const profileEditForm = document.querySelector("form[name='edit-profile']");
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const nameInput = profileEditForm.querySelector(".popup__input_type_name");
const jobInput = profileEditForm.querySelector(".popup__input_type_description");
const profileSubmitButton = profileEditForm.querySelector(".popup__button");

const addCardBotton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardForm = document.querySelector("form[name='new-place']");
const placeInput = addCardForm.querySelector(".popup__input_type_card-name");
const linkInput = addCardForm.querySelector(".popup__input_type_url");
const addCardSubmitButton = addCardForm.querySelector(".popup__button");

const cardImagePupup = document.querySelector(".popup_type_image");
const popupImage = cardImagePupup.querySelector(".popup__image");
const popupCaption = cardImagePupup.querySelector(".popup__caption");
const popupList = document.querySelectorAll(".popup");

let userId;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const loadUserInfo = (name, about, avatar) => {
  nameProfile.textContent = name;
  jobProfile.textContent = about;
  profileImage.style = `background-image: url(${avatar})`;
};

const viewCard = (cardData) => {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openPopup(cardImagePupup);
};

const handleProfileEditFormSubmit = (event) => {
  event.preventDefault();
  profileSubmitButton.textContent = "Сохранение...";
  patchUserInfo(nameInput.value, jobInput.value)
    .then((res) => {
      loadUserInfo(res.name, res.about, res.avatar);
      closePopup(profileEditPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileSubmitButton.textContent = "Сохранить";
    });  
}

const handleFormSubmitAvatar = (event) => {
  event.preventDefault();
  avatarSubmitButton.textContent = "Сохранение...";
  patchAvatar(avatarInput.value)
    .then((res) => {
      console.log(res);
      loadUserInfo(res.name, res.about, res.avatar);
      avatarEditForm.reset();
      closePopup(avatarEditPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarSubmitButton.textContent = "Сохранить";
    }); 
}

const handleAddCardFormSubmit = (event) => {
  event.preventDefault();
  addCardSubmitButton.textContent = "Сохранение...";
  const cardData = {
    name: placeInput.value,
    link: linkInput.value,
  };
  addCard(cardData.name, cardData.link)
    .then((res) => {
      cardsList.prepend(createCard(res, deleteCard, handleLikes, viewCard, userId));
      addCardForm.reset();
      closePopup(addCardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardSubmitButton.textContent = "Сохранить";
    });  
}

const handleLikes = (cardId, cardLikeButton, likeCounter) => {
  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    unlikeCard(cardId)
      .then((res) => {
        likeCounter.textContent = res.likes.length;
        cardLikeButton.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    likeCard(cardId)
      .then((res) => {
        likeCounter.textContent = res.likes.length;
        cardLikeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

profileEditButton.addEventListener("click", (event) => {
  clearValidation(validationConfig, profileEditPopup);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(profileEditPopup);
});

addCardBotton.addEventListener("click", (event) => {
  clearValidation(validationConfig, addCardPopup);
  placeInput.value = "";
  linkInput.value = "";
  openPopup(addCardPopup);
});

avatarEditButton.addEventListener("click", (event) => {
  clearValidation(validationConfig, avatarEditPopup);
  avatarInput.value = "";
  openPopup(avatarEditPopup);
});

popupList.forEach((item) => {
  item.classList.add("popup_is-animated");
  item.querySelector(".popup__close").addEventListener("click", () => {
    closePopup(item);
  });
  item.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup")) {
      closePopup(item);
    }
  });
});

profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
avatarEditForm.addEventListener("submit", handleFormSubmitAvatar);

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    loadUserInfo(userData.name, userData.about, userData.avatar);
    cards.forEach(function (element) {
      cardsList.append(createCard(element, deleteCard, handleLikes, viewCard, userId)
      );
    });
  })
  .catch((err) => console.log(err));

enableValidation(validationConfig);
