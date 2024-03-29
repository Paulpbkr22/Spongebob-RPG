// Global variables

var baseAttack = 0; // original Attack Strength
var player; // holds the player Object
var defender; // holds the defender Object
var charArray = []; // holds the game characters
var playerSelected = false; // flag to mark if user picked a player
var defenderSelected = false; // flag to mark if user picked defender



// Constructor

function Character(name, hp, ap, counter, pic) {
    this.name = name;
    this.healthPoints = hp;
    this.attackPower = ap;
    this.counterAttackPower = counter;
    this.pic = pic;
}


// Increase attack Strength (this attack strength + baseAttack)
Character.prototype.increaseAttack = function () {
    this.attackPower += baseAttack;
};


// Performs an Attack
Character.prototype.attack = function (Obj) {
    Obj.healthPoints -= this.attackPower;
    $("#msg").html("You attacked " + Obj.name + " for " + this.attackPower + " damage points.");
    this.increaseAttack();
};


// Performs a counter Attack

Character.prototype.counterAttack = function (Obj) {
    Obj.healthPoints -= this.counterAttackPower;
    $("#msg").append("<br>" + this.name + " counter attacked you for " + this.counterAttackPower + " damage points.");
};


// Initialize all characters
function initCharacters() {
    var spongebob = new Character("Spongebob Squarepants", 176, 22, 5, "./Assets/images/spongebob.jpg");
    var patrick = new Character("Patrick Star", 220, 12, 11, "./Assets/images/patrick.jpg");
    var krabs = new Character("Krabs", 250, 10, 20, "./Assets/images/krabs.jpg");
    var myleg = new Character("My Leg", 150, 10, 5, "./Assets/images/myleg.jpg");
    var larry = new Character("Larry The Lobster", 60, 80, 47, "./Assets/images/larry.jpg");
    charArray.push(spongebob, patrick, krabs, myleg, larry);
}


// "Save" the original attack value
function setBaseAttack(Obj) {
    baseAttack = Obj.attackPower;
}


// Checks if character is alive
function isAlive(Obj) {
    if (Obj.healthPoints > 0) {
        return true;
    }
    return false;
}


// Checks if player won
function won() {
    if (charArray.length == 0 && player.healthPoints > 0) 
    return true;
    else return false;
}


// Create character cards on screen
function characterCards(divID) {
    $(divID).children().remove();
    for (var i = 0; i < charArray.length; i++) {
        $(divID).append("<div />");
        $(divID + " div:last-child").addClass("card");
        $(divID + " div:last-child").append("<img />");
        $(divID + " img:last-child").attr("id", charArray[i].name);
        $(divID + " img:last-child").attr("class", "card-img-top");
        $(divID + " img:last-child").attr("src", charArray[i].pic);
        $(divID + " img:last-child").attr("width", 150);
        $(divID + " img:last-child").addClass("img-thumbnail");
        $(divID + " div:last-child").append(charArray[i].name + "<br>");
        $(divID + " div:last-child").append("HP: " + charArray[i].healthPoints);
        $(divID + " idv:last-child").append();
    }
}

// Update the characters pictures location on the screen (move them between divs)
function updatePics(fromDivID, toDivID) {
    $(fromDivID).children().remove();
    for (var i = 0; i < charArray.length; i++) {
        $(toDivID).append("<img />");
        $(toDivID + " img:last-child").attr("id", charArray[i].name);
        $(toDivID + " img:last-child").attr("src", charArray[i].pic);
        $(toDivID + " img:last-child").attr("width", 150);
        $(toDivID + " img:last-child").addClass("img-thumbnail");
    }
}


// plays audio file (.mp3)
function playAudio() {
    var audio = new Audio("./Assets/media/theme.mp3");
    audio.play();
}


// Switch from first to second screen
function changeView() {
    $("#firstScreen").empty();
    $("#secondScreen").show();
}


$(document).on("click", "img", function() {
    // Stores the defender the user clicked
    if (playerSelected && !defenderSelected && (this.id != player.name)) {
        for (var j = 0; j < charArray.length; j++) {
            if(charArray[j].name == (this).id) {
                defender = charArray[j]; // sets defender
                charArray.splice(j, 1);
                defenderSelected = true;
                $("#msg").html("Click the button to attack!");
            }
        }
        $("#defenderDiv").append(this); // appends the selected defender to the div
        $("#defenderDiv").addClass("animated zoomInRight");
        $("#defenderDiv").append("<br>" + defender.name);
        $("#defenderHealthDiv").append("HP: " + defender.healthPoints);
        $("#defenderHealthDiv").addClass("animated zoomInRight");
    }

    // Stores player user clicked

    if (!playerSelected) {
        for (var i = 0; i < charArray.length; i++) {
            if (charArray[i].name == (this).id) {
                player = charArray[i]; // sets current player
                playAudio(); // starts theme song
                $("body").css({
                    "background-image": "url('./Assets/images/" + this.id[0] + ".jpg')"
                }); // changes the background picture according to the user selection
                setBaseAttack(player);
                charArray.splice(i, 1);
                playerSelected = true;
                changeView();
                $("#msg").html("Pick an enemy to fight!");
            }
        }

        updatePics("#game", "#defendersLeftDiv");
        $("#playerDiv").append(this); // appends the selected player to the div
        $("#playerDiv").addClass("animated zoomIn");
        $("#playerDiv").append(player.name);
        $("#playerHealthDiv").append("HP: " + player.healthPoints);
        $("#playerHealthDiv").addClass("animated zoomIn");
    }
});

// The attack button functionality
$(document).on("click", "#attackBtn", function () {
    if (playerSelected && defenderSelected) {
        if (isAlive(player) && isAlive(defender)) {
            player.attack(defender);
            defender.counterAttack(player);
            $("#playerHealthDiv").html("HP: " + player.healthPoints);
            $("#defenderHealthDiv").html("HP: " + defender.healthPoints);
            if (!isAlive(defender)) {
                $("#defenderHealthDiv").html("DEFEATED!");
                $("#playerHealthDiv").html("Enemy defeated!");
                $("#msg").html("Pick another enemy to battle...");
            }
            if (!isAlive(player)) {
                $("#playerHealthDiv").html("YOU LOST!");
                $("#msg").html("Try again...");
                $("#attackBtn").html("Restart Game");
                $(document).on("click", "#attackBtn", function () { // restarts game
                    location.reload();
                });
            }
        }
        if (!isAlive(defender)) {
            $("#defenderDiv").removeClass("animated zoomInRight");
            $("#defenderHealthDiv").removeClass("animated zoomInRight");
            $("#defenderDiv").children().remove();
            $("#defenderDiv").html("");
            $("#defenderHealthDiv").html("");
            defenderSelected = false;
            if (won()) {
                $("#secondScreen").hide();
                $("#globalMsg").show();
            }
        }
    }
});

// EXECUTE
$(document).ready(function () {
    $("#secondScreen").hide();
    $("#globalMsg").hide();
    initCharacters();
    characterCards("#game");
});



