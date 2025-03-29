document.addEventListener("DOMContentLoaded", () => {
    fetchDestinations();
});

document.getElementById("search-btn").addEventListener("click", () => {
    let query = document.getElementById("search-input").value.trim();
    fetchDestinations(query);

    // Scroll to the destinations section after searching
    document.getElementById("destinations").scrollIntoView({ behavior: "smooth" });
});

function fetchDestinations(query = "") {
    const apiUrl = `https://api.sampleapis.com/futurama/characters`; 

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayDestinations(data, query);
        })
        .catch(error => console.error("Error fetching destinations:", error));
}

function displayDestinations(destinations, query) {
    const destinationList = document.getElementById("destination-list");
    destinationList.innerHTML = "";

    let filteredDestinations = destinations.filter(dest =>
        dest.Name.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredDestinations.length === 0) {
        destinationList.innerHTML = "<p>No destinations found.</p>";
        return;
    }

    filteredDestinations.forEach(dest => {
        const destElement = document.createElement("div");
        destElement.classList.add("destination");
        destElement.innerHTML = `
            <img src="${dest.Images.Main}" alt="${dest.Name}">
            <h3>${dest.Name}</h3>
            <p>${dest.Description}</p>
        `;
        destinationList.appendChild(destElement);
    });
}

