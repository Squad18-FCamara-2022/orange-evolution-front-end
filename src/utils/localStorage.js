function setLocalItem(key, value) {
  localStorage.setItem(key, value);
}

function getLocalItem(key) {
  return localStorage.getItem(key);
}

function removeLocalItem(key) {
  localStorage.removeItem(key);
}

function clearLocalStorage() {
  localStorage.clear();
}

export { setLocalItem, getLocalItem, removeLocalItem, clearLocalStorage };
