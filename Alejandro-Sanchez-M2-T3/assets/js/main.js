// Obtaining the id of the elements
const containerCheckbox = document.getElementById('checkbox-container')
const containerCards = document.getElementById("cards-container");
const title = document.getElementById("title");
const searchId = document.getElementById("searchId");


// Obtaining event data
const date = amazingEvents.currentDate
const eventsData = amazingEvents.events

// Card filtering and mapping
const eventsComplete = eventsData.map((element) => element)
const eventsHome = eventsComplete.filter(() => title.text.includes('Home'))
const eventsUpcoming = eventsComplete.filter(() => title.text.includes('Upcoming')).filter(element => element.date > date)
const eventsPast = eventsComplete.filter(() => title.text.includes('Past')).filter(element => element.date < date)

let fullEvents = [...eventsHome, ...eventsUpcoming, ...eventsPast]
fullEvents.forEach(createCard)

// Categorys filtering and mapping checkbox

const categorys = eventsComplete.reduce((allCategory, event) => Array.from(new Set([...allCategory,event.category])), [])

categorys.forEach(createCheckbox)

function createCheckbox(category) {
      containerCheckbox.innerHTML += `
      <div class="form-check">
        <label class="form-check-label text-white"><input type="checkbox" value="${category}" class="form-check-input checkId" id="${category}">${category}</label>
      </div>
      `
}

// Obtaining checksbox data and search data and filtering

let checkBoxId = Array.from(document.querySelectorAll('.checkId'))
checkBoxId.forEach(checkbox => checkbox.addEventListener("click", filterCheckCards))

searchId.addEventListener('input', filterCheckCards)

function filterCheckCards(){
    let filteredChecks = checkEvents(fullEvents)
    let filteredSearch = filterCardsBySearch(filteredChecks, searchId.value)
    if (filteredSearch.length !== 0 ){
      containerCards.innerHTML = ``
    }
    filteredSearch.forEach(createCard)
}

function checkEvents(array){
  let checkboxChecked = checkBoxId.filter(check => check.checked).map(checkCategory => checkCategory.value)
  if (checkboxChecked.length > 0 ){
      let filteredCheckBox = array.filter(event => checkboxChecked.includes(event.category))
      return filteredCheckBox
  }
  return array
}

function filterCardsBySearch(array,texto){
  let cardsFilterForSearch = array.filter(event => event.name.toLowerCase().includes(texto.toLowerCase()));
  if(cardsFilterForSearch.length === 0){
      searchEmpty()
      return []
  } 
  return cardsFilterForSearch
}

// Create empty article

function searchEmpty() {
  containerCards.innerHTML = `
  <article class="text-white d-flex flex-column justify-content-center align-items-center gap-3 empty"">
    <h2 class="text-info">No results were found that match your search</h2>
    <div><img class="img-fluid" src="../assets/img/404.png" alt="error" width="300px"></div>
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
      <div class="d-flex justify-content-between align-items-center">
        <p>Price: $${array.price}</p>
        <a href="../pages/details.html?id=${array._id}" " class="btn btn-primary detailsClass">More details</a>
      </div>
    </div>
    </article>
    `;
}
