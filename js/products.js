//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    
    async function desplegarProductos(PRODUCTS_URL){
        let promise = await fetch(PRODUCTS_URL);
        let array = await promise.json();

        let productos = "";
        for (let index=0; index < array.length; index++){
                      </div>
            productos +=  `<a href="#" class="list-group-item list-group-item-action">
                           <div class="row">
                           <div class="col-3">
                           <img src="` + array[index].imgSrc + `" alt="` + array[index].description + `" class="img-thumbnail">
                           </div>
                           <div class="col">
                           <div class="d-flex w-100 justify-content-between">
                           <h4 class="mb-1">`+ array[index].name +`</h4>
                           <small class="text-muted">` + array[index].currency + ` ` + array[index].cost + `<br>` + array[index].soldCount + ` vendidos</small>
                           </div>
                           <p class="mb-1">` + array[index].description + `</p>
                           </div>
                           </div>
                           </a>`
        }
        document.getElementById('listado-productos').innerHTML = productos;
    } 
    desplegarProductos(PRODUCTS_URL);
});