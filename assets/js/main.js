// Obtaining the id of the elements
const containerCheckbox = document.getElementById('checkbox-container')
const containerCards = document.getElementById("cards-container");
const title = document.getElementById("title");
const searchId = document.getElementById("searchId");

async function getFullEvents() {

  try {

    var eventsData = await fetch('https://63bec0a6f5cfc0949b601cc9.mockapi.io/mindhub/amazing-events')
    eventsData = await eventsData.json()

  } catch (error) {
    console.log(error)
  }

  // Obtaining event data

  const date = '2022-01-01'

  // Card filtering and mapping
  const eventsComplete = eventsData.map((element) => element)

  const eventsHome = eventsComplete.filter(() => title.text.includes('Home'))
  const eventsUpcoming = eventsComplete.filter(() => title.text.includes('Upcoming')).filter(element => element.date > date)
  const eventsPast = eventsComplete.filter(() => title.text.includes('Past')).filter(element => element.date < date)

  let fullEvents = [...eventsHome, ...eventsUpcoming, ...eventsPast]
    fullEvents.forEach(createCard)

  // Categorys filtering and mapping checkbox

  const categorys = eventsComplete.reduce((allCategory, event) => Array.from(new Set([...allCategory, event.category])), [])

  categorys.forEach(createCheckbox)

  // Obtaining checksbox data and search data and filtering

  let checkBoxId = Array.from(document.querySelectorAll('.checkId'))
  checkBoxId.forEach(checkbox => checkbox.addEventListener("click", filterCheckCards))

  searchId.addEventListener('input', filterCheckCards)

  function filterCheckCards() {
    let filteredChecks = checkEvents(fullEvents)
    let filteredSearch = filterCardsBySearch(filteredChecks, searchId.value)
    if (filteredSearch.length !== 0) {
      containerCards.innerHTML = ``
    }
    filteredSearch.forEach(createCard)
  }

  function checkEvents(array) {
    let checkboxChecked = checkBoxId.filter(check => check.checked).map(checkCategory => checkCategory.value)
    if (checkboxChecked.length > 0) {
      let filteredCheckBox = array.filter(event => checkboxChecked.includes(event.category))
      return filteredCheckBox
    }
    return array
  }

}

function createCheckbox(category) {
  containerCheckbox.innerHTML += `
      <div class="form-check">
        <label class="form-check-label text-white"><input type="checkbox" value="${category}" class="form-check-input checkId" id="${category}">${category}</label>
      </div>
      `
}

function filterCardsBySearch(array, texto) {
  let cardsFilterForSearch = array.filter(event => event.name.toLowerCase().includes(texto.toLowerCase()));
  if (cardsFilterForSearch.length === 0) {
    searchEmpty()
    return []
  }
  return cardsFilterForSearch
}

let url
if (title.text.includes('Home')) {
  url = {
    details: `./pages/details.html`,
    img404: `./assets/img/404.png`,
  }
} else {
  url = {
    details: `./details.html`,
    img404: `../assets/img/404.png`,
  }
}

// Create empty article

function searchEmpty() {
  containerCards.innerHTML = `
  <article class="text-white d-flex flex-column justify-content-center align-items-center gap-3 empty"">
    <h2 class="text-info">No results were found that match your search</h2>
    <div><img class="img-fluid" src="${url.img404}" alt="error" width="300px"></div>
  </article>
  `;
}

// Create Card

function createCard(array) {
  containerCards.innerHTML += `
    <article class="card bg-dark text-white">
    <img src="${array.image}" class="card-img-top" alt="${array.name}">
    <div class="card-body d-flex flex-column justify-content-between">
      <h5 class="card-title">${array.name}</h5>
      <p class="card-text">${array.description}</p>
      <div class="d-flex justify-content-between align-items-center gap-5">
        <p>Price: $${array.price}</p>
        <a href="${url.details}?id=${array._id}" " class="btn btn-primary detailsClass">More details</a>
      </div>
    </div>
    </article>
    `;
}


getFullEvents()