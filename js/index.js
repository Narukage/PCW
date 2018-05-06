var rutas=[];
var contador = 0;
function getRecetas(){
  comprobarLogin();
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
  comprobarLogin();
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
            console.log(data);
            inf = data.FILAS[0];
            if(inf === undefined )
            {
              window.location.replace("index.html");

            }

            cargarReceta(id);
          });
        }
      )
      .catch(function(err){
        console.log("Error en GET id receta", err);
      });
  }

}


function cargarReceta(id)
{
  let xhr = new XMLHttpRequest();
  let url = 'rest/receta/'+id;




    fetch(url,  {'method':'GET'}).then(function( response ){
      if(response.status !== 200){

      }
      response.json().then(function(data){


    var cont = document.getElementById("idReceta");

    var i;

      if(sessionStorage.getItem('usuario') != null){
        cont.innerHTML +=
      `

      <h2>`+data.FILAS[0].nombre+`</h2>
       <div>
       <p> Fecha de publicación: <time datetime="`+ data.FILAS[0].fecha +`"> </time></p
       <p>Autor:`+ data.FILAS[0].autor + `</p>
       </div>
       <p>`+data.FILAS[0].descripcion + ` </p>
       <p>`+data.FILAS[0].texto + ` </p>
       <a href="receta.html?id=`+data.FILAS[0].id+`#comentarios">`+data.FILAS[0].comentarios+` Comentarios</a>
       <a href="receta.html?id=`+data.FILAS[0].id+`#Fotos"></a>


       `;
       console.log(id);
       cargarComentarios(fotos_data.FILAS[0].id);
       cargarFotos(data.FILAS[0].id);






       }

    });

})

}

function cargarFotos(eid)
{
 let xhr = new XMLHttpRequest();
 let url = 'rest/receta/'+eid+'/fotos';
  fetch(url,  {'method':'GET'}).then(function( response ){
    if(response.status !== 200){

    }
    response.json().then(function(data){


  var conta = document.getElementById("recetafoto");

  var i;

    if(sessionStorage.getItem('usuario') != null){
      conta.innerHTML +=
    `

    <img src="fotos/`+ data.FILAS[0].fichero + `" >
    <p> Descripcion:`+ data.FILAS[0].descripcion_foto + ` </p>

     <p> Comentario </p>
     <p> Autor:`+ data.FILAS[0].autor + ` </p>
     <p> Descripcion:`+ data.FILAS[0].texto + ` </p>




     `;
     cargarComentarios(fotos_data.FILAS[0].id);

  }
 });
})
}

function cargarComentarios(eid)
{
 let xhr = new XMLHttpRequest();




  let url = 'rest/receta/'+eid+'/comentarios';
  fetch(url,  {'method':'GET'}).then(function( response ){
    if(response.status !== 200){

    }
    response.json().then(function(data){


  var conta = document.getElementById("recetacoment");

  var i;

    if(sessionStorage.getItem('usuario') != null){
      conta.innerHTML +=
    `

    <img src="fotos/`+ data.FILAS[0].fichero + `" >
    <p> Descripcion:`+ data.FILAS[0].descripcion_foto + ` </p>

     <p> Comentario </p>
     <p> Autor:`+ data.FILAS[0].autor + ` </p>
     <p> Descripcion:`+ data.FILAS[0].texto + ` </p>




     `;
     cargarFotos(data.FILAS[0].id);
  }
 });
})
}
