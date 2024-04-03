setInterval(setClock, 1000)

var ra9_hourHand = document.querySelector('[data-hour-hand]')
var ra9_minuteHand = document.querySelector('[data-minute-hand]')
var ra9_secondHand = document.querySelector('[data-second-hand]')

function setClock() {
  var currentDate = new Date()
  var secondsRatio = currentDate.getSeconds() / 60
  var minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
  var hoursRatio = (minutesRatio + currentDate.getHours()) / 12
  setRotation(ra9_secondHand, secondsRatio)
  setRotation(ra9_minuteHand, minutesRatio)
  setRotation(ra9_hourHand, hoursRatio)
}

function setRotation(element, rotationRatio) {
  element.style.setProperty('--rotation', rotationRatio * 360)
}

setClock()