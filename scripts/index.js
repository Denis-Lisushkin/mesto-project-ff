const cardsList = document.querySelector(".places__list");
const cardTamplate = document.querySelector("#card-template").content;

const createCard = (cardImage, cardTitle, deleteCard) => {
  const card = cardTamplate.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  card.querySelector(".card__image").src = cardImage;
  card.querySelector(".card__title").textContent = cardTitle;
  card.querySelector(".card__image").alt = `на изображении ${cardTitle}`;
  deleteButton.addEventListener("click", deleteCard);
  return card;
};

const deleteCard = (event) => {
  event.target.closest(".card").remove();
};

initialCards.forEach((card) => {
  cardsList.append(createCard(card.link, card.name, deleteCard));
});
