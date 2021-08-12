//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    
    async function desplegarProductos(PRODUCTS_URL){
        let promise = await fetch(PRODUCTS_URL);
        let array = await promise.json();

        let productos = "";
        for (let index=0; index < array.length; index++){
        let nombre = array[index].name;
        let descripcion = array[index].description;
        let costo =  array[index].cost;
        let moneda =  array[index].currency;
        let imagen = array[index].imgSrc;
        let contador_ventas = array[index].soldCount;
        productos += `<p>${nombre}</p><p>${descripcion}</p><p>${costo}</p><p>${moneda}</p><p>${contador_ventas}</p> <div class="col-lg-3 col-md-4 col-6">
                      <div class="d-block mb-4 h-100">
                      <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
                      </div>
                      </div>`
        }
        document.getElementById('listado-productos').innerHTML = productos;
    }

    desplegarProductos(PRODUCTS_URL);
});
   

  