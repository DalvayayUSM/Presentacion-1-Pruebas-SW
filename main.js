var id = 0;
const tabla = document.getElementById("tableBodyRecetas");
const formulario = document.getElementById("formulario");
let arrayRecetas = [];

$(document).ready(function(){
    var tablaRecetas = $("#dataTableRecetas").DataTable({
        "autoWidth": true,
        "columns": [
            {"data":"id"},
            {"data":"nombre"},
            {"data":"ingredientes"},
            {"data":"instrucciones"},
            {"data":"acciones", "render": function(data, type, row, meta){
                return `
                    <button type="button" class="btn btn-info" id="btnInfo"><i class="bi bi-arrow-up-right-square-fill"></i></button>
                    <button type="button" class="btn btn-warning" id="btnEditar"><i class="bi bi-pencil-fill"></i></button>
                    <button type="button" class="btn btn-danger" id="btnBorrar"><i class="bi bi-trash-fill"></i></button>`
            }}
        ]
    });

    $("#dataTableRecetas tbody").on("click", "#btnInfo", function () {

        var row = $(this).parents('tr')[0];
        // tablaRecetas.row(row).data().id
        console.log("Boton info.id:", tablaRecetas.row(row).data().id);
        // console.log("Boton info.nombre:", tablaRecetas.row(row).data().nombre);
        // console.log("Boton info.ingredientes:", tablaRecetas.row(row).data().ingredientes);
        // console.log("Boton info.instrucciones:", tablaRecetas.row(row).data().instrucciones);
    });

    $("#dataTableRecetas tbody").on("click", "#btnEditar", function () {
        var row = $(this).parents('tr')[0];
        console.log("Boton editar:", tablaRecetas.row(row).data().id);
    });

    $('#dataTableRecetas tbody').on('click', "#btnBorrar", function () {
        var row = $(this).parents('tr')[0];
        console.log("Boton borrar:", tablaRecetas.row(row).data().id);
    });
    
});

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
                    <button type="button" class="btn btn-info" id="btnInfo"><i class="bi bi-arrow-up-right-square-fill"></i></button>
                    <button type="button" class="btn btn-warning" id="btnEditar"><i class="bi bi-pencil-fill"></i></button>
                    <button type="button" class="btn btn-danger" id="btnBorrar"><i class="bi bi-trash-fill"></i></button>
                </td>
                
            </tr>`;
        }
        
    }
}

// const eliminarLocalStorage = (receta) =>{

// }

// event listener
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

document.addEventListener("DOMContentLoaded", llenarTabla);

// tabla.addEventListener("click", (e) =>{
//     e.preventDefault();
//     console.log(e.path[3].childNodes[1].innerText);
//     console.log(e.target.innerHTML);
// });

// $("#tableBodyRecetas").on("click", $("#btnEditar"), function(){
//     var data= tabla.row($(this).parents("tr")).data();
//     console.log(data[0]);
// });