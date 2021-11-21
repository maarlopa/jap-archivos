//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("usuario").innerHTML = "Bienvenid@" +" "+localStorage.getItem("nombreUsuario") +"!";

});

function guardarNombreUsuario(){
    let userName = document.getElementById("campoemail").value;
    localStorage.setItem("nombreUsuario", userName);
}

function deslogearse(){
    localStorage.clear("nombreUsuario");
    location.href = "index.html";
}
  
