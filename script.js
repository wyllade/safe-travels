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
    const apiUrl = "http://localhost:3000/destinations"; // Correct API URL

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
            <img src="${dest.image}" alt="${dest.name}">
            <h3>${dest.name}</h3>
            <p>${dest.description}</p>
            <p><strong>Fare:</strong> $${dest.fare}</p>
            <button class="book-btn" data-id="${dest.id}">Book Now</button>
        `;
        destinationList.appendChild(destElement);
    });

    // Add event listeners for booking buttons
    document.querySelectorAll(".book-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const destinationId = e.target.dataset.id;
            alert(`Booking trip for Destination ID: ${destinationId}`);
        });
    });
}
