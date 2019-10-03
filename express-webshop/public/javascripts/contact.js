function toggleDisabled(event) {
  const disabledElement = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.firstElementChild;
  const hiddenElement = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.childNodes[1];
  console.log(hiddenElement);
  if (disabledElement.disabled == false) {
    disabledElement.disabled = true;
  } else {
    disabledElement.disabled = false;
  }
  hiddenElement.classList.toggle("hidden")
}
