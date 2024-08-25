const createCard = (cardData, deleteCard, handleLikes, viewCard, userId) => {
  const card = document.querySelector("#card-template").content.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const cardLikeButton = card.querySelector(".card__like-button");
  const cardImage = card.querySelector(".card__image");
  const likeCounter = card.querySelector(".card__like-counter");

  card.querySelector(".card__title").textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;
  cardImage.src = cardData.link;
  cardImage.alt = `на изображении ${cardData.name}`;

  cardImage.addEventListener("click", () => viewCard(cardData));
  cardLikeButton.addEventListener("click", () =>
    handleLikes(cardData._id, cardLikeButton, likeCounter)
  );

  if (cardData.likes.some((element) => element._id === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  if (!(cardData.owner._id === userId)) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => {
      deleteCard(cardData._id);
      card.remove();
    });
  }
  return card;
};

export { createCard };
