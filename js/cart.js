var productoCarrito = [];
var porcentajeEnvioSeleccionado = 0;
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

    document.getElementById("metodo1").addEventListener("click",()=>{
        document.getElementById("numTarj").disabled = false;
        document.getElementById("vencimientoTarj").disabled = false;
        document.getElementById("codSeg").disabled = false;
        document.getElementById("numCuenta").disabled = true;
    });
    document.getElementById("metodo2").addEventListener("click",()=>{
        document.getElementById("numTarj").disabled = true;
        document.getElementById("vencimientoTarj").disabled = true;
        document.getElementById("codSeg").disabled = true;
        document.getElementById("numCuenta").disabled = false;
    });

    costos();
    //validarCamposTexto();
    
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
             <td><input type="number" class="canti" onchange="sumarYActualizarSubtotales()" min="1" step="1" value="${productoCarrito.articles[i].count}"></td>
             <td><h5>${productoCarrito.articles[i].currency} <span class="preciosProd">${productoCarrito.articles[i].unitCost}</span></h5></td>
             <td><h5>UYU <span id="subtotalProducto${i}">${mostrarSubtotalProducto}</span></h5></td>
             <td><button type="button" class="tacho fas fa-trash-alt" onclick="borrarProducto(${i})"></button></td>
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

    document.getElementById("sumaProds").innerHTML = sumaProds.toFixed(); 
    document.getElementById("sumaSub").innerHTML = sumaProds.toFixed();
    document.getElementById("totalFinal").innerHTML = sumaProds.toFixed();
    actualizoCostoEnvios(porcentajeEnvioSeleccionado);

}

function costos(){
    let envios = document.getElementsByClassName("envios");
    for (let i = 0; i <  envios.length; i++) {
        envios[i].addEventListener("click", function(){  
            if(envios[i].value==="1"){
                actualizoCostoEnvios(0.15);
                porcentajeEnvioSeleccionado = 0.15
            }
            if(envios[i].value==="2"){
                actualizoCostoEnvios(0.07);
                porcentajeEnvioSeleccionado = 0.07
            }
            if(envios[i].value==="3"){
                actualizoCostoEnvios(0.05);
                porcentajeEnvioSeleccionado = 0.05
            }
            
        });
    } 
} 

function actualizoCostoEnvios(porcentajeEnvio){
    let costoEnvio = parseFloat(document.getElementById("sumaSub").innerHTML)*porcentajeEnvio;
    document.getElementById("precioEnvio").innerHTML = costoEnvio.toFixed();
    let totalCompra = parseFloat(document.getElementById("sumaSub").innerHTML)+costoEnvio;
    document.getElementById("totalFinal").innerHTML = totalCompra.toFixed();
}

function borrarProducto(index){
   productoCarrito.articles.splice(index, 1);
   mostrarProductosCarrito();
   sumarYActualizarSubtotales();
}

/*function validarCamposTexto(){
    let campo = document.getElementsByClassName('controlValidacion').value;

    for (let i = 0; i <  campo.length; i++) {
        document.getElementsByClassName('controlValidacion').addEventListener('keyup',()=>{
      })

    }
    if (campo.trim()===""){
        document.getElementsByClassName('controlValidacion').classList.add('is-invalid', 'animate__animated', 'animate__wobble');
        
    }else{
        document.getElementsByClassName('controlValidacion').classList.remove('is-invalid', 'animate__animated', 'animate__wobble');
    }
}*/

function datosGuardados() {
    Swal.fire('Genial! estás a un paso de completar tu compra..')
}

function compraExitosa() {
    let cantidades = 0;
    let cantidadProds = document.getElementsByClassName("canti");
    let domicilio = document.getElementById("domi");
    //let esquina = 

    for (let i = 0; i < cantidadProds.length; i++) {
        cantidades+=parseFloat(cantidadProds[i].value);
    }    
    if(cantidades!=0 && domicilio !=""){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compra realizada!',
            showConfirmButton: false,
            timer: 2500
          });
    }else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ups! al parecer hubo un error',
            showConfirmButton: false,
            timer: 2500
          });
    }
    
}