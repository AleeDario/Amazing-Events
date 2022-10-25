const tBodyGeneral = document.getElementById("tbody-general");
const tBodyUpcoming = document.getElementById("tbody-upcoming");
const tBodyPast = document.getElementById("tbody-past");

async function statsId() {
    try {
        var eventsJson = await fetch(`https://mh-amazing.herokuapp.com/amazing`)
        eventsJson = await eventsJson.json()
    } catch (error) {
        console.log(error)
    }

    let eventsData = eventsJson.events
    let date = eventsJson.date

    eventsData.map(event => {
        if(event.assistance !== undefined){
            event.earnings = event.price * event.assistance
            event.percentage = 100 * event.assistance / event.capacity
        }else{
            event.earnings = event.price * event.estimate
            event.percentage = 100 * event.estimate / event.capacity
        }
    })

    let eventsUpcoming = eventsData.filter(event => event.date > date)
    let eventsPast = eventsData.filter(event => event.date < date)
    let categoryUpcoming = [...new Set(eventsUpcoming.map(event => event.category))]
    let categoryPast = [...new Set(eventsPast.map(event => event.category))]

    let eventsFilteringUpcoming = categoryUpcoming.map(category => {
        let eventsUp = eventsUpcoming.filter(event => event.category === category)
        return filterUp(eventsUp)
    }).forEach(createStatsUpcoming)
    
    let eventsFilteringPast = categoryPast.map(category => {
        let eventsPasted = eventsPast.filter(event => event.category === category)
        return filterPast(eventsPasted)
        }).forEach(createStatsPast)

    function filterPast(eventsPast){

        let categorysData = {
            category: "",
            earnings: 0,
            capacity: 0,
            assistance: 0
        }
        let stats = eventsPast.reduce((event1,event2) => {
            return {
                category: event2.category,
                earnings: event1.earnings + event2.earnings,
                capacity: event1.capacity + event2.capacity,
                assistance: event1.assistance + event2.assistance
            }
        }, categorysData)
        stats.percentage = (100 * stats.assistance / stats.capacity).toFixed(1)
        return stats

    }

    function filterUp(eventsUp){

        let categorysData = {
            category: "",
            earnings: 0,
            capacity: 0,
            estimate: 0,
        }
        
        let stats = eventsUp.reduce((event1,event2) => {
            return {
                category: event2.category,
                earnings: event1.earnings + event2.earnings,
                capacity: event1.capacity + event2.capacity,
                estimate: event1.estimate + event2.estimate
            }
        }, categorysData)
        stats.percentage = (100 * stats.estimate / stats.capacity).toFixed(1)

        return stats

    }

    let eventsAssistance = eventsData.filter(event => event.assistance !== undefined).sort((a, b) => a.percentage - b.percentage)

    let eventosCapacity = eventsData.filter(event => event.capacity > 0).sort((a, b) => b.capacity - a.capacity)

    let eventosAssAndCap = [eventsAssistance, eventosCapacity]
    

    createStatsGeneral(eventosAssAndCap)
}

statsId()

function createStatsGeneral(eventsGeneral) {
    tBodyGeneral.innerHTML +=
    `
    <tr>
        <td class="text-light fw-semibold">${eventsGeneral[0][eventsGeneral[0].length - 1].name}</td></td>
        <td class="text-light fw-semibold">${eventsGeneral[0][0].name}</td>
        <td class="text-light fw-semibold">${eventsGeneral[1][0].name}</td>
    </tr>
    `
}

function createStatsUpcoming(category) {
    tBodyUpcoming.innerHTML +=
    `
    <tr>
        <td class="text-light fw-semibold">${category.category}</td></td>
        <td class="text-light fw-semibold">$${category.earnings}</td>
        <td class="text-light fw-semibold">${category.percentage}%</td>
    </tr>
    `
}

function createStatsPast(category) {
    tBodyPast.innerHTML +=
    `
    <tr>
        <td class="text-light fw-semibold">${category.category}</td></td>
        <td class="text-light fw-semibold">$${category.earnings}</td>
        <td class="text-light fw-semibold">${category.percentage}%</td>
    </tr>
    `
}