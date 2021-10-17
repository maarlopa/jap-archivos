var productoCarrito = {};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_2).then(function (objetoCarrito) {
        if (objetoCarrito.status === "ok") {
            productoCarrito = objetoCarrito.data;
            mostrarProductosCarrito();
            sumarYActualizarSubtotales(); //muestra en pantalla la suma total al pie de la tabla
        }    
    });  

});

function mostrarProductosCarrito() {
    let prodCarrito = [];
    let dolaresAPesos = 0;

        for (let i = 0; i < productoCarrito.articles.length; i++) {
            let mostrarSubtotalProducto = productoCarrito.articles[i].unitCost * productoCarrito.articles[i].count;

            if(productoCarrito.articles[i].currency == "USD"){
                productoCarrito.articles[i].unitCost = productoCarrito.articles[i].unitCost * 40;
                mostrarSubtotalProducto = productoCarrito.articles[i].unitCost;
                dolaresAPesos += mostrarSubtotalProducto;
                productoCarrito.articles[i].currency = "UYU";
            }
            prodCarrito+= 
            `<tr>
             <th scope="row">${i+1}</th>
             <td><img src="${productoCarrito.articles[i].src}" class="img-carrito"></td>
             <td><h5>${productoCarrito.articles[i].name}</h5></td>
             <td><input type="number" class="canti" onchange="sumarYActualizarSubtotales();" min="1" step="1" value="${productoCarrito.articles[i].count}"></td>
             <td><h5>${productoCarrito.articles[i].currency} <span class="preciosProd">${productoCarrito.articles[i].unitCost}</span></h5></td>
             <td><h5>UYU <span id="subtotalProducto${i}">${mostrarSubtotalProducto}</span></h5></td>
             <td><span class="tacho fas fa-trash-alt" onclick="eliminarProducto();"+ i +");></span></td>
             </tr>
            `
        }

        document.getElementById("productos").innerHTML = prodCarrito  
}

function sumarYActualizarSubtotales(){
    let precioProdCarrito = document.getElementsByClassName("preciosProd");
    let cantidadProd = document.getElementsByTagName("input");
    let sumaProds = 0;

    for (let i = 0; i < precioProdCarrito.length; i++) {
        document.getElementById("subtotalProducto"+i).innerHTML = parseFloat(precioProdCarrito[i].innerHTML) * (cantidadProd[i].value);
        sumaProds += parseFloat(precioProdCarrito[i].innerHTML) * parseFloat(cantidadProd[i].value);
    }    

    document.getElementById("sumaProds").innerHTML = (sumaProds);
}