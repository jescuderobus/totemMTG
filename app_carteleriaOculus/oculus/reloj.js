function display_c(){
var refresh=1000; // Refresh rate in milli seconds
mytime=setTimeout('display_ct()',refresh)}

function hours_with_leading_zeros(dt){
  return (dt.getHours() < 10 ? '0' : '') + dt.getHours();}

function minutes_with_leading_zeros(dt){
  return (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();}

function display_ct() {
var x = new Date()
x1 = hours_with_leading_zeros(x)+ ":" +  minutes_with_leading_zeros(x);
document.getElementById('ct').innerHTML = x1;
display_c();
}
