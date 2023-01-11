const containerDetails = document.getElementById("details-container");

async function detailsId(){

  let id = location.search.slice(4)

  try{
    var eventsData = await fetch(`https://63bec0a6f5cfc0949b601cc9.mockapi.io/mindhub/amazing-events`)
    eventsData = await eventsData.json()
  }catch(error){
    console.log(error)
  }

  let eventDetails = eventsData.filter(event => id == event._id)
  eventDetails = eventDetails[0]
  createCardDetail(eventDetails)

}

detailsId()

function createCardDetail(event){
  let assOrEst

  if(event.assistance !== undefined){
    assOrEst = ['Assistance', event.assistance]
  }else{
    assOrEst = ['Estimate', event.estimate]
  }

  containerDetails.innerHTML =  
  `
  <article class="card card-details bg-dark text-white d-flex">
    <img src="${event.image}" class="card-img-top img-details img-fluid" alt="...">
    <div class="card-body d-flex flex-column justify-content-between">
      <h5 class="card-title text-center">${event.name}</h5>
      <p class="card-text"><span class="fs-6 fw-bold">Date :</span> ${(new Date(event.date)).getFullYear()}-${(new Date(event.date)).getMonth()+1}-${(new Date(event.date)).getDate()+1}</p>
      <p class="card-text"><span class="fs-6 fw-bold">Description :</span> ${event.description}</p>
      <p class="card-text"><span class="fs-6 fw-bold">Place :</span> ${event.place}</p>
      <p class="card-text"><span class="fs-6 fw-bold">Capacity :</span> ${event.capacity}</p>
      <p class="card-text"><span class="fs-6 fw-bold">${assOrEst[0]} :</span> ${assOrEst[1]}</p>
      <p class="card-text"><span class="fs-6 fw-bold">Price :</span> $${event.price}</p>
    </div>
  </article>
  `
}