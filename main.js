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
                <td>Placeholder</td>
                <td>
                    <button type="button" class="btn btn-info"><i class="bi bi-arrow-up-right-square-fill"></i></button>
                    <button type="button" class="btn btn-warning" id="btnEditar"><i class="bi bi-pencil-fill"></i></button>
                    <button type="button" class="btn btn-danger" id="btnBorrar"><i class="bi bi-trash-fill"></i></button>
                </td>
                
            </tr>`;
        });
        tableBodyRecetas.innerHTML = contenido;
    } catch (ex) {
        alert(ex);
    }
};

function agregarReceta(){
    var nombreReceta = document.getElementById("nombreReceta").value;
    var ingredientes = document.getElementById("ingredientes").value;
    var instrucciones = document.getElementById("instrucciones").value;
    var concat = `${nombreReceta} ${ingredientes} ${instrucciones}`;
    alert(concat);
    location.reload();
}

window.addEventListener("load", async () =>{
    await listUsers();
});

window.onload = function(){
    document.getElementById("btnAgregar").addEventListener("click", agregarReceta);
}
