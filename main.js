var id = 0;
const tabla = document.getElementById("tableBodyRecetas");
const formulario = document.getElementById("formulario");
const formulario2 = document.getElementById("formulario2");
let arrayRecetas = [];

$(document).ready(function(){
    var tablaRecetas = $("#dataTableRecetas").DataTable({
        "autoWidth": true,
        "columns": [
            {"data":"id", visible: false},
            {"data":"nombre"},
            {"data":"ingredientes"},
            {"data":"instrucciones"},
            {
                "data": "acciones", "width": "12%", "render": function(){
                return `
                    <button class="btn btn-info" id="btnInfo" ><i class="bi bi-arrow-up-right-square-fill"></i></button>
                    <button class="btn btn-warning" id="btnEditar"><i class="bi bi-pencil-fill"></i></button>
                    <button type="button" class="btn btn-danger" id="btnBorrar"><i class="bi bi-trash-fill"></i></button>`
            }}
        ]
    });

    $("#dataTableRecetas tbody").on("click", "#btnInfo", function () {
        var row = $(this).parents('tr')[0];
        var nombre = tablaRecetas.row(row).data().nombre;
        var ingredientes = tablaRecetas.row(row).data().ingredientes;
        var instrucciones = tablaRecetas.row(row).data().instrucciones;
        var info = "Receta: "+nombre+"\n"+"Ingredientes: "+ ingredientes+"\n"+"Instrucciones: "+instrucciones;
        alert(info);
    });

    $("#dataTableRecetas tbody").on("click", "#btnEditar", function () {
        var row = $(this).parents('tr')[0];
        console.log("Boton editar:", tablaRecetas.row(row).data().id);
        var row = $(this).parents('tr')[0];
        var nombre = tablaRecetas.row(row).data().nombre;
        var ingredientes = tablaRecetas.row(row).data().ingredientes;
        var instrucciones = tablaRecetas.row(row).data().instrucciones;
        let nombreReceta2 = prompt("Cambiar nombre");
        let ingredientes2 = prompt("Cambiar ingredientes");
        let instrucciones2 = prompt("Cambiar instrucciones");
        if (instrucciones2==null||instrucciones2==""){
            for (let i = 0; i < arrayRecetas.length; i++){
                if (Object.values(arrayRecetas[i])[2] == instrucciones){
                    var recetita = arrayRecetas[i];
                    recetita.instrucciones = instrucciones;
                }
            }
        }
        else{
            if (instrucciones!=instrucciones2){
                for (let i = 0; i < arrayRecetas.length; i++){
                    if (Object.values(arrayRecetas[i])[2] == instrucciones){
                        var recetita = arrayRecetas[i];
                        recetita.instrucciones = instrucciones2;
                    }
                }
            }
        }
        if (ingredientes2==null||ingredientes2==""){
            for (let i = 0; i < arrayRecetas.length; i++){
                if (Object.values(arrayRecetas[i])[2] == instrucciones){
                    var recetita = arrayRecetas[i];
                    recetita.instrucciones = instrucciones;
                }
            }
        }
        else{
            if (ingredientes!=ingredientes2){
                for (let i = 0; i < arrayRecetas.length; i++){
                    if (Object.values(arrayRecetas[i])[1] == ingredientes){
                        var recetita = arrayRecetas[i];
                        recetita.ingredientes = ingredientes2;
                    }
                }
            }
        }
        if (nombreReceta2==null||nombreReceta2==""){
            for (let i = 0; i < arrayRecetas.length; i++){
                if (Object.values(arrayRecetas[i])[2] == instrucciones){
                    var recetita = arrayRecetas[i];
                    recetita.instrucciones = instrucciones;
                }
            }
        }
        else{
            if (nombre!=nombreReceta2){
                for (let i = 0; i < arrayRecetas.length; i++){
                    if (Object.values(arrayRecetas[i])[0] == nombre){
                        var recetita = arrayRecetas[i];
                        recetita.nombreReceta = nombreReceta2;
                    }
                }
            }
        }
               
        guardarLocalStorage();
        window.location.reload();
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
        window.location.reload();
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
                    <button class="btn btn-warning" id="btnEditar data-bs-toggle="modal" data-bs-target="#editarReceta""><i class="bi bi-pencil-fill"></i></button>
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

/* formulario2.addEventListener("submit", (e) =>{
    e.preventDefault();
    let nombreReceta = document.getElementById("nombreReceta").value;
    let ingredientes = document.getElementById("ingredientes").value;
    let instrucciones = document.getElementById("instrucciones").value;
    let nombreReceta2 = document.getElementById("nombreReceta2").value;
    let ingredientes2 = document.getElementById("ingredientes2").value;
    let instrucciones2 = document.getElementById("instrucciones2").value;
    crearReceta(nombreReceta, ingredientes, instrucciones);
    guardarLocalStorage();

    formulario2.reset();
    location.reload();

}) */

document.addEventListener("DOMContentLoaded", llenarTabla);