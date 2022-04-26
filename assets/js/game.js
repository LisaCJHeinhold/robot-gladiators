var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;
console.log(playerName, playerAttack, playerHealth);
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;
var fight = function (enemyName) {

    while(playerHealth > 0 && enemyHealth > 0) {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        if (promptFight === "skip" || promptFight === "SKIP") {
            var confirmSkip = window.confirm ("Are you sure you'd like to skip?");
            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip the fight! Goodbye!");
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }        
        }
            // remove enemy health by subtracting the amount set in the playerattack variable
            //repeat and execute as long as the enemy-robot is alive
            enemyHealth = enemyHealth - playerAttack;
            console.log( playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");
            // check enemy health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
                playerMoney = playerMoney + 20;
                console.log("playerMoney", playerMoney);
                break;
            } else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }
            // remove player health by subtracting the amount set in the enemyattack variable
            playerHealth = playerHealth - enemyAttack;
            console.log(
                enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remining."
            );
            // check player health
            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
            } else {
                window.alert(playerName + " still has " + playerHealth + " health remining.");
            }
        }
    };
var startGame = function(){
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
        
        var pickedEnemyName = enemyNames[i];
        enemyHealth = 50
        //use debugger to pause script from running and check what is going on
        // debugger;
        fight(pickedEnemyName);
    } 
    }
    // play again
    endGame();
};
var endGame = function() {
    // if player is still alive, player wins
    if (playerHealth > 0) {
        window.alert("Great job! You've survived the game! You now have a score of " + playerMoney + ".")
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
}
startGame();