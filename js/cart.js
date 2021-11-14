var productoCarrito = [];
var porcentajeEnvioSeleccionado = 0;
var formok = false;

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_2).then(function (objetoCarrito) {
        if (objetoCarrito.status === "ok") {
            productoCarrito = objetoCarrito.data;
            mostrarProductosCarrito();
            sumarYActualizarSubtotales(); //muestra en pantalla la suma total al pie de la tabla
        }    
    }); 

    document.getElementById('domicilio').addEventListener('keyup',()=>{
        validarCamposTexto("domicilio");
    }); 

    document.getElementById('esquina').addEventListener('keyup',()=>{
        validarCamposTexto("esquina");
    });

    document.getElementById('numTarj').addEventListener('keyup',()=>{
        validarCamposTexto("numTarj");
    });

    document.getElementById('vencimientoTarj').addEventListener('keyup',()=>{
        validarCamposTexto("vencimientoTarj");
    });

    document.getElementById('codSeg').addEventListener('keyup',()=>{
        validarCamposTexto("codSeg");
    });

    document.getElementById('numCuenta').addEventListener('keyup',()=>{
        validarCamposTexto("numCuenta");
    });

    costos();
    deshabilitarMedioDePago();
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

function validarCamposTexto(id){
     let texto = document.getElementById(id).value;
     if (texto.trim()===""){
         document.getElementById(id).classList.add('is-invalid', 'animate__animated', 'animate__wobble');
     }else{        
         document.getElementById(id).classList.remove('is-invalid', 'animate__animated', 'animate__wobble');
     }
}


function deshabilitarMedioDePago() {
    document.getElementById("metodo1").disabled = false;
    document.getElementById("numTarj").disabled = true;
    document.getElementById("vencimientoTarj").disabled = true;
    document.getElementById("codSeg").disabled = true;
    document.getElementById("metodo2").disabled = false;
    document.getElementById("numCuenta").disabled = true;
 
    document.getElementById("metodo1").addEventListener("click",()=>{
        document.getElementById("numTarj").disabled = false;
        document.getElementById("vencimientoTarj").disabled = false;
        document.getElementById("codSeg").disabled = false;
        document.getElementById("numCuenta").disabled = true;
        document.getElementById("esconder4").classList.add("esconderFeedback");
        document.getElementById("esconder").classList.remove("esconderFeedback");
        document.getElementById("esconder2").classList.remove("esconderFeedback");
        document.getElementById("esconder3").classList.remove("esconderFeedback");
    });
    document.getElementById("metodo2").addEventListener("click",()=>{
        document.getElementById("numTarj").disabled = true;
        document.getElementById("vencimientoTarj").disabled = true;
        document.getElementById("codSeg").disabled = true;
        document.getElementById("numCuenta").disabled = false;
        document.getElementById("esconder").classList.add("esconderFeedback");
        document.getElementById("esconder2").classList.add("esconderFeedback");
        document.getElementById("esconder3").classList.add("esconderFeedback");
        document.getElementById("esconder4").classList.remove("esconderFeedback");
    });
}

function datosGuardados() {
    Swal.fire({ 
               position: 'center',
               icon: 'info',
               title: 'Genial! estás a un paso de completar tu compra..',
               showConfirmButton: false,
               timer: 2000
              })
}

function compraExitosa() {
    let cantidades = 0;
    let cantidadProds = document.getElementsByClassName("canti");
    let domicilio = document.getElementById("domicilio").value;
    let esquina = document.getElementById("esquina").value;
    let numeroTarj = document.getElementById("numTarj").value;
    let vencimientoTarj = document.getElementById("vencimientoTarj").value;
    let codSeg =  document.getElementById("codSeg").value;
    let numCuenta = document.getElementById("numCuenta").value;

    for (let i = 0; i < cantidadProds.length; i++) {
        cantidades+=parseFloat(cantidadProds[i].value);
    }    
    console.log(esquina);
    console.log(domicilio);
    console.log(numCuenta);
    

    if((porcentajeEnvioSeleccionado !=0 && cantidades !=0 && domicilio.trim() !="" && esquina.trim() !="" && numeroTarj !="" && vencimientoTarj !="" && codSeg !="") || (
        porcentajeEnvioSeleccionado !=0 && cantidades !=0 && domicilio.trim() !="" && esquina.trim() !="" && numCuenta !="" )){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compra realizada!',
            showConfirmButton: false,
            timer: 2500
          })
        formok = true;
    }else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ups! al parecer hubo un error',
            showConfirmButton: false,
            timer: 2500
          })
        formok = false;
    }
}
function demorar(form) {
   if (formok) {
    setTimeout(function() {
        form.submit();
    }, 3000); 
   }
   return false;
}