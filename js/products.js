//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});

function mostrarProductos(){
    getJSONData(PRODUCTS_URL).then(function(resultadoFetch){
        if (resultadoFetch.status === "ok"){
            agregarProductosAListado(listadoProductos);
        }
        
    });
}
function agregarProductosAListado(array){
  let productos = "";
  for (let index=0; index < array.length; index++){
  let nombre = array[index].name;
  let descripcion = array[index].description;
  let costo =  array[index].cost;
  let moneda =  array[index].currency;
  let imagen = array[index].imgSrc;
  let contador_ventas = array[index].soldCount;

  productos += `<p>${nombre}</p><p>${descripcion}</p><p>${costo}</p><p>${moneda}</p><p>${contador_ventas}</p> <img src =${imagen}>`
 }
  document.getElementById('listado-productos').innerHTML = productos;
}

mostrarProductos();