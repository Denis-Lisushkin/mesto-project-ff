const createCard = (cardLink, cardTitle, viewCard, likeCard, deleteCard) => {
  const card = document.querySelector("#card-template").content.cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const cardLikeButton = card.querySelector(".card__like-button");
  const cardImage = card.querySelector(".card__image");
  
  card.querySelector(".card__title").textContent = cardTitle;
  cardImage.src = cardLink;
  cardImage.alt = `на изображении ${cardTitle}`;
  
  deleteButton.addEventListener("click", deleteCard);
  cardImage.addEventListener("click", viewCard);
  cardLikeButton.addEventListener("click", likeCard);
  
  return card;
};

const deleteCard = (event) => {
  event.target.closest(".card").remove();
};

const likeCard = (event) => {
  
    event.target.classList.toggle("card__like-button_is-active");
  
};

export { createCard, likeCard, deleteCard }