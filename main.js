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
            {"data":"acciones", "render": function(){
                return `
                    <button class="btn btn-info" id="btnInfo" data-bs-toggle="modal" data-bs-target="#agregarReceta"><i class="bi bi-arrow-up-right-square-fill"></i></button>
                    <button class="btn btn-warning" id="btnEditar" data-bs-toggle="modal" data-bs-target="#agregarReceta"><i class="bi bi-pencil-fill"></i></button>
                    <button type="button" class="btn btn-danger" id="btnBorrar"><i class="bi bi-trash-fill"></i></button>`
            }}
        ]
    });

    $("#dataTableRecetas tbody").on("click", "#btnInfo", function () {
        var row = $(this).parents('tr')[0];
        var nombre = tablaRecetas.row(row).data().nombre;
        var ingredientes = tablaRecetas.row(row).data().ingredientes;
        var instrucciones = tablaRecetas.row(row).data().instrucciones;
        
        $("#nombreReceta").val(nombre);
        $("#ingredientes").val(ingredientes);
        $("#instrucciones").val(instrucciones);

        $("#nombreReceta").prop("readonly", true);
        $("#ingredientes").prop("readonly", true);
        $("#instrucciones").prop("readonly", true);
    });

    $("#dataTableRecetas tbody").on("click", "#btnEditar", function () {
        var row = $(this).parents('tr')[0];
        console.log("Boton editar:", tablaRecetas.row(row).data().id);
        var row = $(this).parents('tr')[0];
        var nombre = tablaRecetas.row(row).data().nombre;
        var ingredientes = tablaRecetas.row(row).data().ingredientes;
        var instrucciones = tablaRecetas.row(row).data().instrucciones;
        $("#nombreReceta").prop("readonly", false);
        $("#ingredientes").prop("readonly", false);
        $("#instrucciones").prop("readonly", false);

        $("#nombreReceta").val(nombre);
        $("#ingredientes").val(ingredientes);
        $("#instrucciones").val(instrucciones);
    });

    $('#dataTableRecetas tbody').on('click', "#btnBorrar", function () {
        var row = $(this).parents('tr')[0];
        var id = parseInt(tablaRecetas.row(row).data().id)-1;
        var nombre = tablaRecetas.row(row).data().nombre;

        if (confirm("¿Est\u00e1 seguro(a) de eliminar la receta " + nombre +" ?") == true) {
            arrayRecetas.splice(id, 1);
            guardarLocalStorage();
            alert("La receta ha sido borrada")
        }
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