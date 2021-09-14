const ORDENAR_MAYOR_PRECIO = "Mayor Precio";
const ORDENAR_MENOR_PRECIO = "Menor Precio";
const ORDENAR_POR_RELEVANCIA = "Relevancia";
var arregloProductos = [];
var minCount = undefined;
var maxCount = undefined;
var buscador = '';

function ordenarPrecio(criterio, arregloAordenar){
    let ordenado = [];
    if (criterio === ORDENAR_MENOR_PRECIO)
    {
        ordenado = arregloAordenar.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; } 
            return 0;
        });
    }else if (criterio === ORDENAR_MAYOR_PRECIO){
        ordenado = arregloAordenar.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criterio === ORDENAR_POR_RELEVANCIA){
        ordenado = arregloAordenar.sort(function(a, b) {
            //let aCount = parseInt(a.soldCount);
            //let bCount = parseInt(b.soldCount);
    
            //if ( aCount > bCount ){ return -1; }
            //if ( aCount < bCount ){ return 1; }

            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        });
    }
    
    return ordenado;
}

async function inicializarArreglo(PRODUCTS_URL){
    let promise = await fetch(PRODUCTS_URL);
    arregloProductos = await promise.json();
    ordenarYMostrarProductos(ORDENAR_MENOR_PRECIO);
}

function desplegarProductos(){

    let productos = "";

    for (let index=0; index < arregloProductos.length; index++){

        if (((minCount == undefined) || (/*minCount != undefined && parseInt*/(arregloProductos[index].cost) >= minCount)) &&
           ((maxCount == undefined) || (/*maxCount != undefined && parseInt*/(arregloProductos[index].cost) <= maxCount))){
            if ((buscador == '' ) || (arregloProductos[index].name.toUpperCase().includes(buscador)) || (arregloProductos[index].description.toUpperCase().includes(buscador))) {

             productos += `<a href="product-info.html" class="list-group-item list-group-item-action">
                       <div class="row">
                       <div class="col-3">
                       <img src="` + arregloProductos[index].imgSrc + `" alt="` + arregloProductos[index].description + `" class="img-thumbnail">
                       </div>
                       <div class="col">
                       <div class="d-flex w-100 justify-content-between">
                       <h4 class="mb-1">`+ arregloProductos[index].name +`</h4>
                       <small class="text-muted">` + arregloProductos[index].currency + `  ` + arregloProductos[index].cost + `<br>` + arregloProductos[index].soldCount + ` vendidos</small>
                       </div>
                       <p class="mb-1">` + arregloProductos[index].description + `</p>
                       </div>
                       </div>
                       </a>`
            }
        }
    }                
    document.getElementById('listado-productos').innerHTML = productos;
}
 
function ordenarYMostrarProductos(criterio){
                
    arregloProductos = ordenarPrecio(criterio, arregloProductos);
    
    //Muestro las categorías ordenadas
    desplegarProductos();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    inicializarArreglo(PRODUCTS_URL);


    document.getElementById("sortAsc").addEventListener("click", function(){
        ordenarYMostrarProductos(ORDENAR_MENOR_PRECIO);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        ordenarYMostrarProductos(ORDENAR_MAYOR_PRECIO);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        ordenarYMostrarProductos(ORDENAR_POR_RELEVANCIA);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        desplegarProductos();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para ordenar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;
/*
        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }
*/
        desplegarProductos();
    });

    document.getElementById("busqueda").addEventListener("keydown", function(){
        buscador = document.getElementById("busqueda").value.toUpperCase();
        desplegarProductos();
    });

});
