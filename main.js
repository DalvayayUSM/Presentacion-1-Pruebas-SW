const listUsers = async() =>{
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users"); //cambiar despues
        const users = await response.json();

        let contenido= ``;
        users.forEach((user, index) =>{
            contenido+=`
            <tr>
                <td>${index+1}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.address.city}</td>
            </tr>`;
        });
        tableBodyRecetas.innerHTML = contenido;
    } catch (ex) {
        alert(ex);
    }
};

window.addEventListener("load", async () =>{
    await listUsers();
});