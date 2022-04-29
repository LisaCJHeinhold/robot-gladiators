var fightOrSkip = function() {
    //ask player if they want to fight or skip
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
    // Conditional Recursive Function Call
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }
    promptFight = promptFight.toLowerCase();
    //if player picks skip confirm and then stop the loop
    if (promptFight === "skip") {
        //confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to skip this fight?");
        //if true leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " have decided to skip this fight. Goodbye!");
            //subtract money for skipping
            playerInfo.money = Math.max(0, playerInfo.money -10);
            return true;
        } else {
            return false;
        }
    }
}
var fight = function(enemy) {
    // keep track of who goes first
    var isPlayerTurn = true;
  
    // randomly change turn order
    if (Math.random() > 0.5) {
      isPlayerTurn = false;
    }
  
    while (playerInfo.health > 0 && enemy.health > 0) {
      if (isPlayerTurn) {
        // ask player if they'd like to fight or skip using fightOrSkip function
        if (fightOrSkip()) {
          // if true, leave fight by breaking loop
          break;
        }
  
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
  
        // remove enemy's health by subtracting the amount we set in the damage variable
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
          playerInfo.name +
            " attacked " +
            enemy.name +
            ". " +
            enemy.name +
            " now has " +
            enemy.health +
            " health remaining."
        );
  
        // check enemy's health
        if (enemy.health <= 0) {
          window.alert(enemy.name + " has died!");
  
          // award player money for winning
          playerInfo.money = playerInfo.money + 20;
  
          // leave while() loop since enemy is dead
          break;
        } else {
          window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }
        // player gets attacked first
      } else {
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
  
        // remove player's health by subtracting the amount we set in the damage variable
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
          enemy.name +
            " attacked " +
            playerInfo.name +
            ". " +
            playerInfo.name +
            " now has " +
            playerInfo.health +
            " health remaining."
        );
  
        // check player's health
        if (playerInfo.health <= 0) {
          window.alert(playerInfo.name + " has died!");
          // leave while() loop if player is dead
          break;
        } else {
          window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
      }
      // switch turn order for next round
      isPlayerTurn = !isPlayerTurn;
    }
  };
    
var startGame = function(){
    //reset player stats
    playerInfo.reset();
    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
        var pickedEnemyObj = enemyInfo[i];
        pickedEnemyObj.health = randomNumber(40,60);
        //use debugger to pause script from running and check what is going on
        //debugger;
        fight(pickedEnemyObj);
        //if we are not at the last enemy in the array
        if ( playerInfo.health > 0 && i < enemyInfo.length - 1) {
            //ask if player wants to enter shop
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
            //if yes take to store
            if (storeConfirm) {
                shop();
            }
        }
    } 
    }
    // play again
    endGame();
};
var endGame = function() {
    // if player is still alive, player wins
    if (playerInfo.health > 0) {
        window.alert("Great job! You've survived the game! You now have a score of " + playerInfo.money + ".")
    } else {
        window.alert(" You have lost your robot in battle.")
    }
    // ask player if they want to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        //restart game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};
var shop = function() {
    //ask player what they want to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 1 fot REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );
    //use switch to carry out action
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            // do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
        // call shop() again to force player to pick a valid option
        shop();
        break;
}
    };
        //function to generate a random number value
        var randomNumber = function(min,max) {
            var value = Math.floor(Math.random()*(max - min + 1) + min);
            return value;
        };
    //function to set name
    var getPlayerName = function() {
        var name = "";
        while (name === "" || name === null) {
            name = prompt("What is your robot's name?");
        }
        console.log("Your robot's name is " + name);
        return name;
    };
    var playerInfo = {
        name: getPlayerName(),
        health: 100,
        attack: 10,
        money: 10,
        reset: function() {
            this.health = 100;
            this.money = 10;
            this.attack = 10;
        },
        refillHealth: function() {
            this.health += 20;
            this.money -= 7;
        },
        upgradeAttack: function() {
            this.attack += 6;
            this.money -= 7;
        }
    };
    console.log(playerInfo.name, playerInfo.attack, playerInfo.health);
    var enemyInfo = [
        {
          name: "Roborto",
          attack: randomNumber(10, 14)
        },
        {
          name: "Amy Android",
          attack: randomNumber(10, 14)
        },
        {
          name: "Robo Trumble",
          attack: randomNumber(10, 14)
        }
      ];
startGame();