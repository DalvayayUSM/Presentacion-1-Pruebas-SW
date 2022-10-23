var id = 0;
const tabla = document.getElementById("tableBodyRecetas");
const formulario = document.getElementById("formulario");
let arrayRecetas = [];

const crearReceta = (nombreReceta, ingredientes, instrucciones) =>{
    let receta = {
        nombreReceta: nombreReceta,
        ingredientes: ingredientes,
        instrucciones: instrucciones
    }
    
    arrayRecetas.push(receta);
}

const guardarLocalStorage = () =>{
    localStorage.setItem("Recetas", JSON.stringify(arrayRecetas));
    llenarTabla();
}

// se asume que el objeto obtenido es un JSON
function obtenerLocalStorage(key){
    if (localStorage.getItem(key)){
        let receta = JSON.parse(localStorage.getItem(key));
        console.log(receta);
    } else{
        console.log("No existe la llave entregada");
    }
}

const llenarTabla = () =>{
    tabla.innerHTML = "";
    arrayRecetas = JSON.parse(localStorage.getItem("Recetas"));
    if(arrayRecetas === null){
        arrayRecetas=[];
        console.log(arrayRecetas);
    } else{
        for (let i = 0; i < arrayRecetas.length; i++) {
            let elemento = arrayRecetas[i];
            tabla.innerHTML+=`
            <tr>
                <td>${i+1}</td>
                <td>${elemento.nombreReceta}</td>
                <td>${elemento.ingredientes}</td>
                <td>${elemento.instrucciones}</td>
                <td>
                    <button type="button" class="btn btn-info"><i class="bi bi-arrow-up-right-square-fill"></i></button>
                    <button type="button" class="btn btn-warning" id="btnEditar"><i class="bi bi-pencil-fill"></i></button>
                    <button type="button" class="btn btn-danger" id="btnBorrar"><i class="bi bi-trash-fill"></i></button>
                </td>
                
            </tr>`;
        }
        
    }
}

const agregarReceta = (nombreReceta, ingredientes, instrucciones) =>{
    
}

$("#tableBodyRecetas").on("click", "tr", function(){
    alert('Row index: ' + tabla.row(this).index());
});




// event listener
document.addEventListener("DOMContentLoaded", llenarTabla);

formulario.addEventListener("submit", (e) =>{
    e.preventDefault();
    let nombreReceta = document.getElementById("nombreReceta").value;
    let ingredientes = document.getElementById("ingredientes").value;
    let instrucciones = document.getElementById("instrucciones").value;

    crearReceta(nombreReceta, ingredientes, instrucciones);
    guardarLocalStorage();

    formulario.reset();
    location.reload();

})