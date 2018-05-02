function hacerLogin(frm){
 let url ='./rest/login/',
  fd = new FormData(frm),
xhr =new XMLHttpRequest();

  fetch(url,  {'method':'POST', 'body':fd}).then(function(response) {
    if(!response.ok){
      console.log("datos incorrectos");
      response.json().then(function(datos){
        console.log(datos);

        var modal = document.getElementById('myModal2'),
        btn = document.getElementById("myBtn"),
        span = document.getElementsByClassName("close")[0];

        modal.style.display = "block";

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
      })
    }
    else{
      console.log("no doy error");
      response.json().then(function(datos){
        console.log(datos);
        sessionStorage.setItem('usuario', JSON.stringify(datos));
  			sessionStorage.setItem('status', 'true');

        var modal = document.getElementById('myModal'),
        btn = document.getElementById("myBtn"),
        span = document.getElementsByClassName("close")[0];

        modal.style.display = "block";

        span.onclick = function() {
            modal.style.display = "none";
            window.location = 'index.html';
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
      })
    }});
  	return false;
}

function comprobarLogin(){
  if(sessionStorage.getItem('status')) /*&& sessionStorage.getItem('usuario')!="null")*/{
    console.log("sesion activa");
    let inic = document.getElementById("iniciarsesion"),
    regis = document.getElementById("regis");
    inic.style.visibility = "hidden";
    regis.style.visibility = "hidden";
    return true;
  }else{
    console.log("no hay sesion");
    let cerr = document.getElementById("cerrarses"),
    rec = document.getElementById("nuevareceta");
    cerr.style.display = "none";
    rec.style.display = "none";
    return false;
  }
}

function cerrarSesion(){
  sessionStorage.clear();
  window.location = 'index.html';
  return false;
}

function hacerRegistro(frm){
  let url ='./rest/login/';
  url2 ='./rest/usuario/',
  xhr = new XMLHttpRequest();
  fd = new FormData();

  var login_value = frm.parentNode.querySelector('input[id=login]').value;
  var nombre_value = frm.parentNode.querySelector('input[id=nombre]').value;
  var pass_value = frm.parentNode.querySelector('input[id=pwd]').value;
	var pass2_value = frm.parentNode.querySelector('input[id=pwd2]').value;
	var email_value = frm.parentNode.querySelector('input[id=email]').value;
  var fnac_value = frm.parentNode.querySelector('input[id=fnac]').value;

  let login_disponible = false,
  error_login = false,
  error_pass = false;

  url += login_value;


  fetch(url,  {'method':'GET'}).then(function(response) {
    if(!response.ok){
      console.log("error de GET");
      response.json().then(function(datos){
        console.log(datos);
      })
    }
    else{
      console.log("devuelvo datos");
      response.json().then(function(datos){
        console.log(datos);

        //Comprueba si el usuario esta disponible
        if(datos.DISPONIBLE && login_value!=''){
          console.log("usuario disponible");
          login_disponible = true;
        }else{
          console.log("usuario no disponible");
          error_login = true;
          //Vetana1
          var modal = document.getElementById('myModal2'),
          btn = document.getElementById("myBtn"),
          span = document.getElementsByClassName("close")[0];

          modal.style.display = "block";

          span.onclick = function() {
              modal.style.display = "none";
              window.location = 'index.html';
          }

          window.onclick = function(event) {
              if (event.target == modal) {
                  modal.style.display = "none";
              }
          }
        }

        //Comprueba si las contraseñas coinciden
        if(pass_value != pass2_value){
          console.log("contraseñas no coinciden");
          error_pass = true;
          //Ventana2
          var modal = document.getElementById('myModal3'),
          btn = document.getElementById("myBtn"),
          span = document.getElementsByClassName("close")[0];

          modal.style.display = "block";

          span.onclick = function() {
            console.log("hola si");
              modal.style.display = "none";
              window.location = 'index.html';
          }

          window.onclick = function(event) {
              if (event.target == modal) {
                  modal.style.display = "none";
              }
          }
        }else{
          console.log("las contraseñas coinciden");
        }

        //Si todos los datos de registro son correctos
        if(login_disponible && !error_login && !error_pass){
          console.log("datos de registro correctos");
          xhr.open('POST', url2, true);

          xhr.onload = function(){
            console.log(xhr.responseText);
            let v = JSON.parse(xhr.responseText);
            console.log(v);

            if(v.RESULTADO == 'OK'){
              console.log("todo correcto");
              document.getElementById("registro").reset();
              //Ventana3
              var modal = document.getElementById('myModal'),
              btn = document.getElementById("myBtn"),
              span = document.getElementsByClassName("close")[0];

              modal.style.display = "block";

              span.onclick = function() {
                  modal.style.display = "none";
                  window.location = 'index.html';
              }

              window.onclick = function(event) {
                  if (event.target == modal) {
                      modal.style.display = "none";
                  }
              }
            }
          };

          fd.append('login', login_value);
        	fd.append('nombre', nombre_value);
        	fd.append('pwd', pass_value);
        	fd.append('pwd2', pass2_value);
        	fd.append('email', email_value);
          fd.append('fnac', fnac_value);

          xhr.send(fd);

        }
      })
    }
  });
  return false;
}
