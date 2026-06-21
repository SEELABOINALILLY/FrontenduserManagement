async function loadUsers(){

    let response = await fetch("http://localhost:8080/users");

    let users = await response.json();

    let tbody = document.querySelector("#userTable tbody");

    tbody.innerHTML="";

    users.forEach(user=>{

        tbody.innerHTML += `
        <tr>

            <td>${user.id}</td>

            <td>${user.name}</td>

            <td>${user.email}</td>

        </tr>
        `;

    });

}