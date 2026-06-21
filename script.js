let allUsers = [];

async function loadUsers() {
    const status = document.getElementById("status");
    status.innerHTML = "Loading users... ⏳";

    try {
       // Railway-deployed backend API URL used by the frontend after GitHub deployment
      // For local testing with Spring Boot API, update this URL to your local server (e.g., http://localhost:8080/users)
        let response = await fetch("https://springbootusermanagementapi-production.up.railway.app/users");

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        allUsers = await response.json();

        renderTable(allUsers);

        status.innerHTML = "Users loaded successfully ✅";

    } catch (error) {
        status.innerHTML = "Error loading users ❌";
        console.error(error);
    }
}

function renderTable(users) {
    let tbody = document.querySelector("#userTable tbody");
    tbody.innerHTML = "";

    users.forEach(user => {
        tbody.innerHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
            </tr>
        `;
    });
}

function filterUsers() {
    let query = document.getElementById("searchInput").value.toLowerCase();

    let filtered = allUsers.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );

    renderTable(filtered);
}