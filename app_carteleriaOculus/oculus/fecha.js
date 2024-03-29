function fecha() {
  var d = new Date();
  var n = d.getDate();
  var m = d.getMonth();
  var y = d.getFullYear();
  var w = d.getDay();
  const mes=['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiempre', 'Octubre', 'Noviembre', 'Diciembre'];
  const semana=['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  x = semana[w]+ ", "+ n + " de "+ mes[m] + " de " + y;
  //return x; 
  document.getElementById('fecha').innerHTML = x;
}

function fechaHora(){
  fecha();
  display_ct();
}