var detalleProducto = {};
var comentarios = [];
var productosListadoGlobal = [];
var texto = undefined;
var puntuacion = undefined;

/*async function extraerInfo(PRODUCT_INFO_URL){
    let promise = await fetch(PRODUCT_INFO_URL);
    detalleProducto = await promise.json();
}*/

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            detalleProducto = resultObj.data;


            let categoryNameHTML = document.getElementById("categoryName");
            let productPrice = document.getElementById("precioProducto");
            let categoryDescriptionHTML = document.getElementById("categoryDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");

            categoryNameHTML.innerHTML = detalleProducto.name;
            productPrice.innerHTML = detalleProducto.currency + " " + detalleProducto.cost;
            categoryDescriptionHTML.innerHTML = detalleProducto.description;
            productCountHTML.innerHTML = detalleProducto.category;
            productCriteriaHTML.innerHTML = detalleProducto.soldCount;

            //Muestro las imagenes en forma de galería
            showImagesGallery(detalleProducto.images);
        }
    });

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productosListadoGlobal = resultObj.data;
            productosRelacionados();
        }    
    });        

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentarios = resultObj.data;
            mostrarComentarios();
        }    
    });        
  
    /*
    document.getElementById("mostrarComents").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para ordenar por cantidad
        //de productos por categoría.
        
        
    });
    */
    document.getElementById("botonComentarios").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para ordenar por cantidad
        //de productos por categoría.
        texto = document.getElementById("textoPublicacion").value;
        puntuacion = document.getElementById("puntuar").value;
        publicarComentario();
        
    });
});

function productosRelacionados(){
    let relacionados = [];
    
        for (let i = 0; i <  detalleProducto.relatedProducts.length; i++) {

            relacionados+= `<a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
            <div class="col-3">
            <img src="` +  productosListadoGlobal[detalleProducto.relatedProducts[i]].imgSrc + `" alt="` +  productosListadoGlobal[detalleProducto.relatedProducts[i]].description + `" class="img-thumbnail">
            </div>
            <div class="col">
            <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1">`+  productosListadoGlobal[detalleProducto.relatedProducts[i]].name +`</h4>
            <small class="text-muted">` +  productosListadoGlobal[detalleProducto.relatedProducts[i]].currency + `  ` +  productosListadoGlobal[detalleProducto.relatedProducts[i]].cost + `<br>` +  productosListadoGlobal[detalleProducto.relatedProducts[i]].soldCount + ` vendidos</small>
            </div>
            <p class="mb-1">
            </div>
            </div>
            </a><br>`
        }
    
        document.getElementById("relacionados").innerHTML = relacionados;   
}

function mostrarComentarios() {
    let comentariosAImprimir = [];

    for (let index = 0; index < comentarios.length; index++) {

        comentariosAImprimir += `<div> 
                                <hr class="row text-center text-lg-left pt-2">
                                <strong>${comentarios[index].user}</strong> ${comentarios[index].dateTime}
                                ${puntuacionPorEstrellas(comentarios[index].score)} <br> ${comentarios[index].description} <br>
                                </div>`
    }
    document.getElementById('mostrarComents').innerHTML = comentariosAImprimir;
}

function publicarComentario(){

    let nombreComentarios = localStorage.getItem("nombreUsuario"); 
    let hoy = new Date();
    let fecha = hoy.getFullYear() + '-' +(hoy.getMonth() + 1) + '-' + hoy.getDate();
    let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    let fechaYHora = fecha + ' ' + hora;

    document.getElementById("comentarioPublicado").innerHTML = `<div> 
                                                               <hr class="row text-center text-lg-left pt-2">
                                                               <strong>${nombreComentarios}</strong> ${fechaYHora} ${puntuacionPorEstrellas(puntuacion)}<br>${texto}
                                                               </div>`;
}

function puntuacionPorEstrellas(numeroEstrellas){
    let estrellas = '';
    for (let i = 1; i <= numeroEstrellas; i++) {
        estrellas +=`<span class="fa fa-star checked"></span>`
    }
    for (let i = 5; i > numeroEstrellas; i--) {
        estrellas +=`<span class="fa fa-star"></span>`
    }
    return estrellas;
}