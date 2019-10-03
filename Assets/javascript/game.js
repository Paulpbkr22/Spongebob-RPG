

$( document ).ready(function(){
 
    var userChar = false;
    var userHealth = 0;

    //
    // Setting up random numbers for each character
        function getLarryHealth(min, max) {
            return Math.floor(Math.random() * (205 - 120)) + 120;
        }
        function getPatrickHealth(min, max) {
            return Math.floor(Math.random() * (200 - 150)) + 150;
        }
        function getSpongebobHealth(min, max) {
            return Math.floor(Math.random() * (190 - 110)) + 110;
        }
        function getMyLegHealth(min, max) {
            return Math.floor(Math.random() * (500 - 80)) + 50;
        }
        function getKrabsHealth(min, max) {
            return Math.floor(Math.random() * (350 - 150)) + 150;
        }

        function getLarryDmg() {
            
        }
      function yourChar() {
          userChar = true;
             

      }

    // Random number has to be between 1 - 12
    // 
    //  Decaring variables for tallies
    var userTotal= 0; 
    var wins= 0;
    var losses = 0;


    //resets the game
  $('#numberWins').text(wins);
  $('#numberLosses').text(losses);
  function reset(){
        Random=Math.floor(Math.random()*119+21);
        console.log(Random)
        $('#randomNumber').text(Random);
        num1= Math.floor(Math.random()*11+1);
        num2= Math.floor(Math.random()*11+1);
        num3= Math.floor(Math.random()*11+1);
        num4= Math.floor(Math.random()*11+1);
        userTotal= 0;
        $('#finalTotal').text(userTotal);
        } 
  //adds the wins to the userTotal
  function won(){
  alert("You won!");
    wins++; 
    $('#numberWins').text(wins);
    reset();
  }
  //addes the losses to the userTotal
  function loser(){
  alert ("You lose!");
    losses++;
    $('#numberLosses').text(losses);
    reset()
  }
  //sets up click
  $('#attack').on('click', function() {

  })
    $('#larry').on('click', function(){
      var userHealth = getLarryHealth();
      console.log("Larry Health = " + userHealth);
      $(document).text(userHealth); 
            //sets win/lose conditions
        
    });  

    $('#krabs').on('click', function(){
        var userHealth = getKrabsHealth();
        console.log("Mr. Krabs Health = " + userHealth);
        $(document).text(userHealth); 
    });  

    $('#spongebob').on('click', function(){
        var userHealth = getSpongebobHealth();
      console.log("Spongebob Health = " + userHealth);
      $(document).text(userHealth); 
    });

    $('#myleg').on('click', function(){
       var userHealth = getMyLegHealth();
      console.log("My Leg Health = " + userHealth);
      $(document).text(userHealth); 
    });  

    $('#patrick').on('click', function(){
         var userHealth = getPatrickHealth();
      console.log("Patrick Health = " + userHealth);
      $(document).text(userHealth); 
      });
  }); 