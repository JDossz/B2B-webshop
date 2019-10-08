function toggleDisabled(event) {
  const {
    id,
  } = event.target.dataset;
  const disabledElement = document.querySelector(`.edit[data-id="${id}"]`);
  const hiddenElement = document.querySelector(`.hide[data-id="${id}"]`);

  if (disabledElement.disabled === false) {
    disabledElement.disabled = true;
  } else {
    disabledElement.disabled = false;
  }
  hiddenElement.classList.toggle('hidden');
}
