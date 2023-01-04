const contenedor = document.getElementById("cards-container");

function createCard(element, array) {
    for (let event of array.events) {
      element.innerHTML += `
        <article class="card bg-dark text-white">
        <img src="${event.image}" class="card-img-top" alt="${event.name}">
        <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title">${event.name}</h5>
          <p class="card-text">${event.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <p>price: $${event.price}</p>
            <a href="./pages/details.html" class="btn btn-primary">More details</a>
          </div>
        </div>
        </article>
        `;
  }
}

createCard(contenedor, amazingEvents);
