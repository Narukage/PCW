var rutas=[];
var contador = 0;
function getRecetas(){
  url = './rest/receta/?u=6';

  fetch(url,  {'method':'GET'}).then(function( response ){
      if(response.status !== 200){

      }
      response.json().then(function(data){
        

    var cont = document.getElementsByTagName("section")[0].children[0];

    var i;
    for(i=0;i<data.FILAS.length;i++)
    {
      if(sessionStorage.getItem('usuario') != null){
        cont.innerHTML +=
        `
      <section>
      <a href="receta.html?id=` + data.FILAS[i].id + `"><h3>` + data.FILAS[i].nombre + `</h3></a>
      <img src="fotos/` + data.FILAS[i].fichero + `" alt="` + data.FILAS[i].nombre + `">
		  <p>`+ data.FILAS[i].descripcion_foto + `</p>
      <div>
      <span class="icon-user" aria-hidden="true"></span><a href=buscar.html?a=` + data.FILAS[i].autor + `>` + data.FILAS[i].autor + `</a></h4>
      </div>
      <br>
      <footer>
		    <div>
            <div>
              <p>` + data.FILAS[i].positivos + ` likes</p>
              <p><span class="icon-comment"></span> ` + data.FILAS[i].comentarios + ` comentarios</p>
            </div>
            <div>
              <p>` + data.FILAS[i].negativos + ` dislikes</p>
          <p><time datetime="` + data.FILAS[i].fecha + `">` + data.FILAS[i].fecha + `</time></p>
            </div>
          </div>
        </footer>
	</section>
  `;
      } else {
        cont.innerHTML +=
        `
        <section>
      <a href="receta.html?id=` + data.FILAS[i].id + `"><h3>` + data.FILAS[i].nombre + `</h3></a>
      <img src="fotos/` + data.FILAS[i].fichero + `" alt="` + data.FILAS[i].nombre + `">
		  <p>`+ data.FILAS[i].descripcion_foto + `</p>
      <div>
      <span class="icon-user" aria-hidden="true"></span><a href=buscar.html?a=` + data.FILAS[i].autor + `>` + data.FILAS[i].autor + `</a></h4>
      </div>
      <br>
      <footer>
		    <div>
            <div>
              <p>` + data.FILAS[i].positivos + ` likes</p>
              <p><span class="icon-comment"></span> ` + data.FILAS[i].comentarios + ` comentarios</p>
            </div>
            <div>
              <p>` + data.FILAS[i].negativos + ` dislikes</p>
          <p><time datetime="` + data.FILAS[i].fecha + `">` + data.FILAS[i].fecha + `</time></p>
            </div>
          </div>
        </footer>
	</section>
        `;
      }
  }
console.log('HOLA');
    paginacion(i,6,'');

    });
})
.catch(function() {
    // This is where you run code if the server returns any errors

    console.log('ERROR');
});
}

function paginacion(num, resultados, parametros) {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var pag = url.searchParams.get("pag");
  pagina = pag;
  var total = num;
  let paginas = total / resultados;
  paginas = Math.ceil(paginas);
  var docu = document.getElementsByClassName("pag");
  if(pagina == null){
    pagina = 0;
  }
  console.log("Estamos en esta pagina: " + pagina);
  console.log("Hay: " + paginas);

  if(paginas == 1){
    docu[0].innerHTML =
    `
    <p>
    Página ` + eval(pagina+1) + ` de ` + paginas + `
    </p>
    `;
  }
  else {
    if(pagina == 0){
      docu[0].innerHTML =
      `
      <p>Página ` + eval(pagina+1) + ` de ` + paginas + `
      <a href="buscar.html?` + `pag=` + (eval(pagina+1)) +`&lpag=4">&gt</a>
      </p>
      `;
    }
    else if(pagina == eval(paginas-1)){
      docu[0].innerHTML =
      `
      <p>
      <a href="buscar.html?` + `pag=` + (eval(pagina-1)) +`&lpag=4">&lt</a>
      Página ` + ( parseInt(pagina)+1 ) + ` de ` + paginas + `
      </p>
      `;
    }
    else {
      docu[0].innerHTML =
      `
      <p>
      <a href="buscar.html?` + `pag=` + (eval(pagina-1)) +`&lpag=4">&gt</a>
      Página ` + ( parseInt(pagina)+1 ) + ` de ` + paginas + `
      <a href="buscar.html?` + `pag=` + (eval(pagina+1)) +`&lpag=4">&gt</a>
      </p>
      `;
    }
  }



console.log(docu[0].innerHTML);

}

function busquedaRapida(frm){
	let fd = new FormData(frm);
	let	url = 'buscar.html?t=';
	fd = fd.get('t');
	url += fd;
	window.location.href = url;
	return false;
}


function compruebaid(){
  var urlaux = window.location.href;
  var url = new URL(urlaux);
  var id = url.searchParams.get("id");
  if(id!=undefined)
  {
    var url_inf = 'rest/receta/'+id;
    var inf = null;
    fetch(url_inf)
      .then(
        function(response){
          if(response.status !== 200){
            console.log("No se ha podido realizar la peticion GET correctamente.");
          }
          response.json().then(function(data) {

            inf = data.FILAS[0];
            if(inf === undefined )
            {
              window.location.replace("index.html");

            }

            cargarReceta();
          });
        }
      )
      .catch(function(err){
        console.log("Error en GET id receta", err);
      });
  }

}


function cargarReceta()
{
	let e = window.location.search;
	let varsurl = e.split("&");
	if(varsurl[0].indexOf("id") >= 0)
	{
		let idreceta = varsurl[0].split("=")[1];
		let xhr = new XMLHttpRequest();
		let url = 'http://localhost/practica02/rest/receta/'+idReceta;
		xhr.open('GET', url, true);
		xhr.send();
		xhr.onload = function() {
			let v = JSON.parse(xhr.responseText);
			if(v.RESULTADO == 'ok')
			{
				let receta = v.FILAS[0];
				let html='<h2>'+receta.nombre+'</h2>';
				html+='<div>';
				html+='<p>Fecha de publicaci&oacute;n:<time datetime="'+receta.fecha+'">'+receta.fecha+'</time></p>';
				html+='<p>Autor:'+receta.login+'</p>';
				html+='</div>';
				html+='<p>'+receta.descripcion+'</p>';
				html+='<footer>';
				html+='<a href="receta.html?id='+receta.id+'#fotos">'+receta.nfotos+' Fotos</a><br>';
				html+='<a href="receta.html?id='+receta.id+'#comentarios">'+receta.ncomentarios+' Comentarios</a>';
				html+='</footer>';
				document.getElementById("receta").innerHTML=html;
				cargarFotos(receta.id);
				cargarComentarios(receta.id);
			}
		}
	}
	else
	{
		window.location.replace("http://localhost/practica02/index.html");
	}
}

function cargarFotos(eid)
{
	let xhr = new XMLHttpRequest();
	let url = 'http://localhost/practica2/rest/receta/'+eid+'/fotos';
	xhr.open('GET', url, true);
	xhr.send();
	xhr.onload = function(){
		let v = JSON.parse(xhr.responseText);
		if(v.RESULTADO == 'ok')
		{
			let html = '<h3 id="fotos">Fotograf&iacute;as:</h3><div>';
			for(let i=0; i<v.FILAS.length; i++)
			{
				let e = v.FILAS[i];
				html+='<p>'+(i+1)+'</p>';
				html+='<figure>';
				html+='<img src="fotos/'+e.fichero+'" alt="'+e.texto+'">';
				html+='<figcaption>'+e.texto+'</figcaption>';
				html+='</figure>';
			}
			html+='</div>';
			document.getElementById("receta").innerHTML+=html;
		}
	}
}

function cargarComentarios(eid)
{
	let xhr = new XMLHttpRequest();
	let url = 'http://localhost/practica2/rest/receta/'+eid+'/comentarios';
	xhr.open('GET', url, true);
	xhr.send();
	xhr.onload = function(){
		let v = JSON.parse(xhr.responseText);
		if(v.RESULTADO == 'ok')
		{
			let html = '<h3>Comentarios:</h3>';
			for(let i=0; i<v.FILAS.length; i++)
			{
				let e = v.FILAS[i];
				html+='<article>';
				html+='<header>';
				html+='<p>Autor: '+e.login+'</p>';
				html+='<p><time datetime="'+e.fecha+'">'+e.fecha+'</time></p>';
				html+='</header>';
				html+='<h4>'+e.titulo+'</h4>';
				html+='<p>'+e.texto+'</p>';
				if(window.sessionStorage)
				{
					if(sessionStorage.getItem("Login"))
					{
						html+='<footer>';
						html+='<button onclick="responderComentario(this);">Responder</button>';
						html+='</footer>';
					}
				}
				else
				{
					alert("Tu navegador no soporta sessionStorage");
				}
				html+='</article>';
			}
			document.getElementById("comentarios").innerHTML=html;
		}
	}
}