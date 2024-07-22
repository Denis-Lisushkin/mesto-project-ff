function openPopup(popupType) {
  popupType.classList.add("popup_is-opened");
  popupType.classList.add("popup_is-animated");
  document.addEventListener("keyup", escBottonHandler);
}

function closePopup(popupType) {
  popupType.classList.remove("popup_is-opened");
  document.removeEventListener("keyup", escBottonHandler);
}

function escBottonHandler (event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector(".popup_is-opened")
    closePopup(openedPopup);
  }
}

export { openPopup, closePopup }