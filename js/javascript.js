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
