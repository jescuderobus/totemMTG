(function() {
    var getDigits;
  
    getDigits = function(number) {
      var d0, d1;
      d0 = 0;
      d1 = 0;
      if (number > 9) {
        d0 = Math.floor(number / 10);
        d1 = number - d0 * 10;
      } else {
        d1 = number;
      }
      d0 = d0.toString(2).split("").reverse();
      d1 = d1.toString(2).split("").reverse();
      return [d0, d1];
    };
  
    setInterval(function() {
      var hours, minutes, now, seconds;
      now = new Date();
      hours = now.getHours();
      minutes = now.getMinutes();
      seconds = now.getSeconds();
      $('.ra7_seconds .ra7_digit-1 div').each(function(index) {
        return $(this).toggleClass('on', getDigits(seconds)[0][index] == 1);
      });
      $('.ra7_seconds .ra7_digit-2 div').each(function(index) {
        return $(this).toggleClass('on', getDigits(seconds)[1][index] == 1);
      });
      $('.ra7_minutes .ra7_digit-1 div').each(function(index) {
        return $(this).toggleClass('on', getDigits(minutes)[0][index] == 1);
      });
      $('.ra7_minutes .ra7_digit-2 div').each(function(index) {
        return $(this).toggleClass('on', getDigits(minutes)[1][index] == 1);
      });
      $('.ra7_hours .ra7_digit-1 div').each(function(index) {
        return $(this).toggleClass('on', getDigits(hours)[0][index] == 1);
      });
      return $('.ra7_hours .ra7_digit-2 div').each(function(index) {
        return $(this).toggleClass('on', getDigits(hours)[1][index] == 1);
      });
    }, 200);
  
  }).call(this);
  
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBOztFQUFBLFNBQUEsR0FBWSxRQUFBLENBQUMsTUFBRCxDQUFBO0FBQ1osUUFBQSxFQUFBLEVBQUE7SUFBRSxFQUFBLEdBQUs7SUFDTCxFQUFBLEdBQUs7SUFDTCxJQUFHLE1BQUEsR0FBUyxDQUFaO01BQ0UsRUFBQSxHQUFLLElBQUksQ0FBQyxLQUFMLENBQVcsTUFBQSxHQUFTLEVBQXBCO01BQ0wsRUFBQSxHQUFLLE1BQUEsR0FBUyxFQUFBLEdBQUcsR0FGbkI7S0FBQSxNQUFBO01BSUUsRUFBQSxHQUFLLE9BSlA7O0lBTUEsRUFBQSxHQUFLLEVBQUUsQ0FBQyxRQUFILENBQVksQ0FBWixDQUFjLENBQUMsS0FBZixDQUFxQixFQUFyQixDQUF3QixDQUFDLE9BQXpCLENBQUE7SUFDTCxFQUFBLEdBQUssRUFBRSxDQUFDLFFBQUgsQ0FBWSxDQUFaLENBQWMsQ0FBQyxLQUFmLENBQXFCLEVBQXJCLENBQXdCLENBQUMsT0FBekIsQ0FBQTtBQUVMLFdBQU8sQ0FBQyxFQUFELEVBQUssRUFBTDtFQVpHOztFQWNaLFdBQUEsQ0FBWSxRQUFBLENBQUEsQ0FBQTtBQUNaLFFBQUEsS0FBQSxFQUFBLE9BQUEsRUFBQSxHQUFBLEVBQUE7SUFBRSxHQUFBLEdBQVUsSUFBSSxJQUFKLENBQUE7SUFDVixLQUFBLEdBQVUsR0FBRyxDQUFDLFFBQUosQ0FBQTtJQUNWLE9BQUEsR0FBVSxHQUFHLENBQUMsVUFBSixDQUFBO0lBQ1YsT0FBQSxHQUFVLEdBQUcsQ0FBQyxVQUFKLENBQUE7SUFFVixDQUFBLENBQUUsdUJBQUYsQ0FBMEIsQ0FBQyxJQUEzQixDQUFnQyxRQUFBLENBQUMsS0FBRCxDQUFBO2FBQzlCLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxXQUFSLENBQW9CLElBQXBCLEVBQTBCLGlDQUExQjtJQUQ4QixDQUFoQztJQUVBLENBQUEsQ0FBRSx1QkFBRixDQUEwQixDQUFDLElBQTNCLENBQWdDLFFBQUEsQ0FBQyxLQUFELENBQUE7YUFDOUIsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLFdBQVIsQ0FBb0IsSUFBcEIsRUFBMEIsaUNBQTFCO0lBRDhCLENBQWhDO0lBR0EsQ0FBQSxDQUFFLHVCQUFGLENBQTBCLENBQUMsSUFBM0IsQ0FBZ0MsUUFBQSxDQUFDLEtBQUQsQ0FBQTthQUM5QixDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsV0FBUixDQUFvQixJQUFwQixFQUEwQixpQ0FBMUI7SUFEOEIsQ0FBaEM7SUFFQSxDQUFBLENBQUUsdUJBQUYsQ0FBMEIsQ0FBQyxJQUEzQixDQUFnQyxRQUFBLENBQUMsS0FBRCxDQUFBO2FBQzlCLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxXQUFSLENBQW9CLElBQXBCLEVBQTBCLGlDQUExQjtJQUQ4QixDQUFoQztJQUdBLENBQUEsQ0FBRSxxQkFBRixDQUF3QixDQUFDLElBQXpCLENBQThCLFFBQUEsQ0FBQyxLQUFELENBQUE7YUFDNUIsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLFdBQVIsQ0FBb0IsSUFBcEIsRUFBMEIsK0JBQTFCO0lBRDRCLENBQTlCO1dBRUEsQ0FBQSxDQUFFLHFCQUFGLENBQXdCLENBQUMsSUFBekIsQ0FBOEIsUUFBQSxDQUFDLEtBQUQsQ0FBQTthQUM1QixDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsV0FBUixDQUFvQixJQUFwQixFQUEwQiwrQkFBMUI7SUFENEIsQ0FBOUI7RUFsQlUsQ0FBWixFQW9CRSxHQXBCRjtBQWRBIiwic291cmNlc0NvbnRlbnQiOlsiZ2V0RGlnaXRzID0gKG51bWJlcikgLT5cbiAgZDAgPSAwXG4gIGQxID0gMFxuICBpZiBudW1iZXIgPiA5XG4gICAgZDAgPSBNYXRoLmZsb29yIG51bWJlciAvIDEwXG4gICAgZDEgPSBudW1iZXIgLSBkMCoxMFxuICBlbHNlXG4gICAgZDEgPSBudW1iZXJcbiAgICBcbiAgZDAgPSBkMC50b1N0cmluZygyKS5zcGxpdChcIlwiKS5yZXZlcnNlKClcbiAgZDEgPSBkMS50b1N0cmluZygyKS5zcGxpdChcIlwiKS5yZXZlcnNlKClcblxuICByZXR1cm4gW2QwLCBkMV1cblxuc2V0SW50ZXJ2YWwgLT5cbiAgbm93ICAgICA9IG5ldyBEYXRlXG4gIGhvdXJzICAgPSBub3cuZ2V0SG91cnMoKVxuICBtaW51dGVzID0gbm93LmdldE1pbnV0ZXMoKVxuICBzZWNvbmRzID0gbm93LmdldFNlY29uZHMoKVxuICBcbiAgJCgnLnNlY29uZHMgLmRpZ2l0LTEgZGl2JykuZWFjaCAoaW5kZXgpIC0+XG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcyAnb24nLCBgZ2V0RGlnaXRzKHNlY29uZHMpWzBdW2luZGV4XSA9PSAxYFxuICAkKCcuc2Vjb25kcyAuZGlnaXQtMiBkaXYnKS5lYWNoIChpbmRleCkgLT5cbiAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzICdvbicsIGBnZXREaWdpdHMoc2Vjb25kcylbMV1baW5kZXhdID09IDFgXG4gICAgXG4gICQoJy5taW51dGVzIC5kaWdpdC0xIGRpdicpLmVhY2ggKGluZGV4KSAtPlxuICAgICQodGhpcykudG9nZ2xlQ2xhc3MgJ29uJywgYGdldERpZ2l0cyhtaW51dGVzKVswXVtpbmRleF0gPT0gMWBcbiAgJCgnLm1pbnV0ZXMgLmRpZ2l0LTIgZGl2JykuZWFjaCAoaW5kZXgpIC0+XG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcyAnb24nLCBgZ2V0RGlnaXRzKG1pbnV0ZXMpWzFdW2luZGV4XSA9PSAxYFxuICAgIFxuICAkKCcuaG91cnMgLmRpZ2l0LTEgZGl2JykuZWFjaCAoaW5kZXgpIC0+XG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcyAnb24nLCBgZ2V0RGlnaXRzKGhvdXJzKVswXVtpbmRleF0gPT0gMWBcbiAgJCgnLmhvdXJzIC5kaWdpdC0yIGRpdicpLmVhY2ggKGluZGV4KSAtPlxuICAgICQodGhpcykudG9nZ2xlQ2xhc3MgJ29uJywgYGdldERpZ2l0cyhob3VycylbMV1baW5kZXhdID09IDFgXG4sIDIwMCJdfQ==
  //# sourceURL=coffeescript