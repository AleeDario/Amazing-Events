const containerDetails = document.getElementById("details-container");

let eventsData = amazingEvents.events
let id = location.search.slice(4)
let eventDetails = eventsData.filter(event => id == event._id)
eventDetails = eventDetails[0]

createCardDetail(eventDetails)

function createCardDetail(event){
    containerDetails.innerHTML = `
    <article class="card card-details bg-dark text-white d-flex">
          <img src="${event.image}" class="card-img-top img-details" alt="...">
          <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title text-center">${event.name}</h5>
            <p class="card-text"><span class="fs-6 fw-bold">Fecha :</span> ${event.date}</p>
            <p class="card-text"><span class="fs-6 fw-bold">Description :</span> ${event.description}</p>
            <p class="card-text"><span class="fs-6 fw-bold">Place :</span> ${event.place}</p>
            <p class="card-text"><span class="fs-6 fw-bold">Capacity :</span> ${event.capacity}</p>
            <p class="card-text"><span class="fs-6 fw-bold">Assistance :</span> ${event.assistance}</p>
            <p class="card-text"><span class="fs-6 fw-bold">Price :</span> $${event.price}</p>
          </div>
        </article>
    `

}