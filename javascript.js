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
  if(sessionStorage.getItem('status')){
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

function compruebaLogin(frm){
  let url = './rest/login/';
  var login_value = frm.parentNode.querySelector('input[id=login]').value,
  mensaje = document.getElementById("disp"),
  mensaje2 = document.getElementById("nodisp");

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
          mensaje2.style.display = "none";
          mensaje.style.display = "block";
          login_disponible = true;
        }else{
          console.log("usuario no disponible");
          mensaje.style.display = "none";
          mensaje2.style.display = "block";
          error_login = true;
        }
      })
    }
  });
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

var cont = 1;

function añadirIngrediente(){
  let ingrediente = document.getElementById("ingrediente").value;
  if(ingrediente != ''){
    lista = document.getElementById("listaingredientes").innerHTML += "<li>"+ingrediente+"</li>";
    ingredients++;
  }
  return false;
}

function loadfile(event, formulario) {
  let id = formulario.children;
  var output = document.getElementById(id[0].id);
  output.src = URL.createObjectURL(event.target.files[0]);
}

function añadirFoto(){
  let html = '';

  html += '<br />';
  html += '<div id = "foto'+cont+'">';
  html += '<img name="foturra" id="foturra'+cont+'" src="fotos/nofoto.jpg" onclick="cambiarFoto(this)">';
  html += '<br />';
  html += '<input id="'+cont+'" type="file" name="archivo" data-max-size="300" onchange="cambiarFoto(this)"/><br />';
  html += '<br />';
  html += '<label for="ela">Descripción de la foto:</label>';
  html += '<br />';
  html += '<textarea id="desc'+cont+'" rows="4" cols="40"> </textarea>';
  html += '<button type="button" onclick="eliminarFoto(parentElement.id);">Eliminar foto</button>';
  html += '</div>';

  console.log("contador "+cont);

  document.getElementById("foto").innerHTML += html;
  cont++;

  return false;
}

function cambiarFoto(source){
  //document.getElementById("fotico").click();
  if(source.type == 'file'){
    console.log("entro");
    if(source.files[0]!=null){
      var nombre = "",
      size = source.files[0].size,
      file = document.getElementById("foturra" + source.id);
      console.log(source.id);

      if(size>300000){
        console.log("tamaño excede los 3KB");
        //Ventana modal excede tamaño
        var modal = document.getElementById('myModal3'),
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
      }else{
        var reader  = new FileReader();
	    	reader.onloadend = function (e){
          nombre = e.target.result;
          file.src = nombre;
          //sources.push(nombre);
          console.log("añado foto al array fotos");
          fotos.push(source.files[0]);
        }

        reader.readAsDataURL(source.files[0]);
      }
    }
  }
}

function eliminarFoto(id){
  document.getElementById(id).innerHTML = '';
  return false;
}

var fotos = [];
var ingredients = 0;

function añadirReceta(frm){

  if(fotos.length > 0){
    let xhr = new XMLHttpRequest(),
    url = './rest/receta/',
    fd = new FormData(),
    usuario = JSON.parse(sessionStorage['usuario']);

    var nombre = frm.parentNode.querySelector('input[id=n]').value;
    var comensales = frm.parentNode.querySelector('input[id=c]').value;
    var tiempo = frm.parentNode.querySelector('input[id=t]').value;
    var dificultad = frm.parentNode.querySelector('select[id=d]').value;

    if(dificultad == 'Baja'){
      dificultad = 0;
    }else if(dificultad == 'Media'){
      dificultad = 1;
    }else if(dificultad == 'Alta'){
      dificultad = 2;
    }

    console.log(nombre);
    console.log(comensales);
    console.log(tiempo);
    console.log(dificultad);
    console.log(usuario.login);
    console.log(frm.parentNode.querySelector('textarea').value);
    console.log(usuario.clave);

        fd.append('l',usuario.login);
        fd.append('n',nombre);
        fd.append('e',frm.parentNode.querySelector('textarea').value);
        fd.append('t',tiempo);
        fd.append('d',dificultad);
        fd.append('c',comensales);

    xhr.open('POST', url, true);
    xhr.onload = function(){
      var v = JSON.parse(xhr.responseText);
      console.log(v);

      if(v.RESULTADO == 'OK'){
        //Subimos los ingredientes de la receta
        subirIngredientes(v.ID, usuario);

        for(var i=1; i<cont ; i++){
          if(document.getElementById("foto"+i)!=null){
            //Subimos las fotos de la receta
            subirFotos(v.ID, i, usuario, frm);
          }
        }
        //Ventana de receta subida
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

    xhr.setRequestHeader('Authorization',usuario.clave);
    xhr.send(fd);

    return false;
  }
  console.log("suba al menos una foto");
  //Ventana suba al menos una foto
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
  return false;
}

function subirIngredientes(receta, usuario){
  let xhr = new XMLHttpRequest(),
  url = './rest/receta/' + receta + '/ingredientes',
  fd = new FormData();

  lista = document.getElementById("listaingredientes");
  listaenviada = [];

  for(var i=0; i<lista.children.length; i++){
    listaenviada.push(lista.childNodes[i].innerText);
  }

  fd.append('l',usuario.login);
  fd.append('i',JSON.stringify(listaenviada));

  xhr.open('POST', url, true);

  xhr.onload = function(){
    let v = JSON.parse(xhr.responseText);
    console.log(v);

    if(v.RESULTADO == 'OK'){
      console.log("HE SUBIDO LOS INGREDIENTES");
    }else{
      console.log("NO SUBO LOS INGREDIENTES");
    }

  };

  xhr.setRequestHeader('Authorization', usuario.clave);
  xhr.send(fd);
}

function subirFotos(id, indice, usuario, frm){
  let xhr = new XMLHttpRequest(),
	 fd  = new FormData(),
   url = './rest/receta/' + id + '/foto';

  let descripcion = document.getElementById("desc"+indice).value;
  let foto = frm.parentNode.querySelector('[type="file"]').files[0];

  console.log(descripcion);
  console.log(usuario.login);
  console.log(foto);

  fd.append('l',usuario.login);
  fd.append('t',descripcion);
  fd.append('f',foto);

  xhr.open('POST', url, true);
  xhr.onload = function(){

  console.log(xhr.responseText);
  let v = JSON.parse(xhr.responseText);

    if(v.RESULTADO == 'OK'){
      console.log("HE SUBIDO LAS FOTOS");
    }else{
      console.log("NO SUBO LAS FOTOS");
    }
  };

  xhr.setRequestHeader('Authorization', usuario.clave);
  xhr.send(fd);
}
