var productoCarrito = {};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_2).then(function (objetoCarrito) {
        if (objetoCarrito.status === "ok") {
            productoCarrito = objetoCarrito.data;
            mostrarProductosCarrito();
        }    
    });  

});

function mostrarProductosCarrito() {
    let prodCarrito = [];
    
        for (let i = 0; i < productoCarrito.articles.length; i++) {
            totalProducto = productoCarrito.articles[i].unitCost * productoCarrito.articles[i].count;
            prodCarrito+= 
            `<tr>
             <th scope="row">${i+1}</th>
             <td><img src="${productoCarrito.articles[i].src}" class="img-carrito"></td>
             <td><h5>${productoCarrito.articles[i].name}</h5></td>
             <td><input type="number" class="canti" id="cant-prod${i}" onchange="sumar();" min="1" step="1" value="${productoCarrito.articles[i].count}"></td>
             <td><h5>${productoCarrito.articles[i].currency} <span class="preciosProd">${productoCarrito.articles[i].unitCost}</span></h5></td>
             <td><span id="sumaProductos${i}">${totalProducto}</span></td>
             <td><span class="tacho fas fa-trash-alt" onclick="eliminarProducto();"+ i +");></span></td>
             </tr>
            `
        }

        sumar();

        document.getElementById("productos").innerHTML = prodCarrito  
}

function sumar(){
    let prodCarrito = document.getElementsByClassName("preciosProd");
    let sumaProd = 0;
    let cantidadProd = document.getElementsByTagName("input");
    let subtotal = 0;

    for (let i = 0; i < prodCarrito.length; i++) {
        document.getElementById("sumaProductos"+i).innerHTML = parseFloat(prodCarrito[i].innerHTML) * (cantidadProd[i].value);
        subtotal += parseFloat(prodCarrito[i].innerHTML) * parseFloat(cantidadProd[i].value);
    }    

    document.getElementById("subtotal").innerHTML = (subtotal);
}