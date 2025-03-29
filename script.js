document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search-btn").addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form from reloading the page
        let query = document.getElementById("searchInput").value.trim();
        fetchDestinations(query);
    });
});

function fetchDestinations(query = "") {
    const apiUrl = `https://api.sampleapis.com/countries/countries`; // Replace with actual API

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
        dest.name.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredDestinations.length === 0) {
        destinationList.innerHTML = "<p>No destinations found.</p>";
        return;
    }

    filteredDestinations.forEach(dest => {
        const destElement = document.createElement("div");
        destElement.classList.add("destination");
        destElement.innerHTML = `
            <img src="${dest.flag}" alt="${dest.name}">
            <h3>${dest.name}</h3>
            <p>${dest.capital}</p>
        `;
        destinationList.appendChild(destElement);
    });
}
