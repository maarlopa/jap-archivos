//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});

var listadoProductos = [];
function mostrarProductos(){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            
            showCategoriesListIndividual(listadoProductos);
        }
        
    });
}
function showCategoriesListIndividual(array){
   
    let htmlContentToAppend = `<a href="">Vovler atras</a>`;
    for(let i = 0; i < array.length; i++){
        let category = array[i];
        htmlContentToAppend += 
        `<div class="list-group-item list-group-item-action"><div class="row"><div class="col-3"><img src="` + 
        category.imgSrc + `" alt="` + category.desc +
         `" class="img-thumbnail"> </img></div><div class="col"><div class="d-flex w-100 justify-content-between"><h4 class="mb-1">`+
          category.name +`</h4><small class="text-muted">` + category.currency + ` ` + category.cost + 
          `</small></div><p>` + category.description + `</p></div></div></div>`
        }
    document.getElementById("container").innerHTML = htmlContentToAppend;
    
}