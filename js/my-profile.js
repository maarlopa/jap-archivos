var perfilObjeto = JSON.parse(localStorage.getItem('profileUser'));

document.addEventListener("DOMContentLoaded", function (e) {
  let fotoUsuario = document.getElementById('imgPerfil');
   
   if (perfilObjeto != null){

      document.getElementById('imgPerfil').src = perfilObjeto.imagen;
      document.getElementById('nombresPerfil').value = perfilObjeto.nombrePerfil;
      document.getElementById('apellidosPerfil').value= perfilObjeto.apellidoPerfil;
      document.getElementById('edadPerfil').value= perfilObjeto.edadPerfil;
      document.getElementById('emailPerfil').value= perfilObjeto.emailPerf;
      document.getElementById('telPerfil').value= perfilObjeto.telPerf;
   }else {
       fotoUsuario.src = "img/avatar_0.png";
   }

   document.getElementById("nombreUsuarioPerfil").innerHTML = `<div class="colSaludoUsuario"><div class="col"><h3><br><strong>Hola! ${localStorage.getItem("nombreUsuario")}</strong></h3><br></div></div>`;
   document.getElementById("userImgn").innerHTML = `<br><br><div class="fotoUsuario"><img src="${fotoUsuario.src}"style="max-width: 75%; max-height: auto; overflow: hidden; border-radius: 50%;"></div>`
   document.getElementById("userProf").innerHTML = `<br><br><br><h5><span class="fas fa-user" style="float:center";></span> ${perfilObjeto.nombrePerfil} ${perfilObjeto.apellidoPerfil}<br>
                                                    <span class="fas fa-birthday-cake" style="float:center";></span> ${perfilObjeto.edadPerfil} años<br><span class="fas fa-at" style="float:center";></span> ${perfilObjeto.emailPerf}<br><span class="fas fa-mobile-alt" style="float:center";></span> ${perfilObjeto.telPerf}</h5>`;

                                                   
   let botonesavatars = document.getElementsByClassName("avatars");
   
   for (let i = 0; i <  botonesavatars.length; i++) {
     botonesavatars[i].addEventListener("click", function(){   
       fotoUsuario.src = "img/avatar_" + i + ".png"
       //botonesavatars[i].checked = true;
     });
    } 
});

function guardarPerfil(){
    let fotoUsuario = document.getElementById('imgPerfil');
    let profile = {};
    profile.imagen = fotoUsuario.src

    profile.nombrePerfil = document.getElementById("nombresPerfil").value;
    //localStorage.setItem("nombrePerfil", nombrePerfil);

    profile.apellidoPerfil = document.getElementById("apellidosPerfil").value;
    //localStorage.setItem("apellidoPerfil", apellidoPerfil);

    profile.edadPerfil = document.getElementById("edadPerfil").value;
    //localStorage.setItem("edadPerf", edadPerfil);

    profile.emailPerf = document.getElementById("emailPerfil").value;
    //localStorage.setItem("emailPerf", emailPerf);

    profile.telPerf = document.getElementById("telPerfil").value;
    //localStorage.setItem("telPerf", telPerf);

    localStorage.setItem('profileUser', JSON.stringify(profile));

    document.getElementById("userProf").innerHTML = `<h5>${localStorage.getItem(perfilObjeto)}</h5>`;

}

function fotoUsuarioBase64() {
    let fotoUsuario = document.getElementById('imgPerfil');
    let imgSubidaPorUsuario = document.querySelector('input[type=file]').files[0];
    let reader  = new FileReader();
  
    reader.onloadend = function () {
      fotoUsuario.src = reader.result; 
      
    }
  
    if (imgSubidaPorUsuario) {
      reader.readAsDataURL(imgSubidaPorUsuario);
     
    } else {
      fotoUsuario.src = "img/avatar_0.png";
    }
  }


