const lightDarkBtn = document.querySelector("#light-dark-button")
const body = document.querySelector("body")

lightDarkBtn.addEventListener("click", toggleLightDark)


function checkDarkPref() {
  if (
    window.matchMedia("(prefers-color-scheme:dark)").matches &&
    body.className !== ""
  ) {
    toggleLightDark()
  }
}

checkDarkPref()

function toggleLightDark() {
  body.className = body.className === "light" ? "" : "light"
}