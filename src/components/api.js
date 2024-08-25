const token = "1fcbb7db-2196-4d12-a10f-03fef2f41234";
const cohortId = "wff-cohort-20";

const handleResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

const getUserInfo = () => {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    headers: {
      authorization: token,
    },
  }).then((res) => handleResponse(res));
}

const getCards = () => {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    headers: {
      authorization: token,
    },
  }).then((res) => handleResponse(res));
}

const patchUserInfo = (name, about) => {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => handleResponse(res));
}

const addCard = (name, link) => {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => handleResponse(res));
}

const patchAvatar = (link) => {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => handleResponse(res));
}

const deleteCard = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  }).then((res) => handleResponse(res));
}

const likeCard = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  }).then((res) => handleResponse(res));
}

const unlikeCard = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  }).then((res) => handleResponse(res));
}

export {
  getUserInfo,
  getCards,
  patchUserInfo,
  addCard,
  patchAvatar,
  deleteCard,
  likeCard,
  unlikeCard,
};
