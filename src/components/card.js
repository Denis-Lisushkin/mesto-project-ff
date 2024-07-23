const createCard = (cardData, viewCard, likeCard, deleteCard) => {
  const card = document.querySelector("#card-template").content.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const cardLikeButton = card.querySelector(".card__like-button");
  const cardImage = card.querySelector(".card__image");
  
  card.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = `на изображении ${cardData.name}`;
  
  deleteButton.addEventListener("click", () => deleteCard(card));
  cardImage.addEventListener("click", () => viewCard(cardData));
  cardLikeButton.addEventListener("click", () => likeCard(card));
  
  return card;

};

const deleteCard = (card) => {
  card.remove();
};

const likeCard = (card) => {
  card.querySelector(".card__like-button").classList.toggle("card__like-button_is-active");
 // event.target.classList.toggle("card__like-button_is-active");
  
};

export { createCard, likeCard, deleteCard }