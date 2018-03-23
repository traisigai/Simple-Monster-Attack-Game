var vm = new Vue({
  el: '#app',
  data: {
    isStartGame: false,
    playerHealth: 100,
    monsterHealth: 100,
    playerGiveUp: false,
    turns: []
  },
  methods: {
    startGame: function() {
      // when startGame is clicked, set playerHealth and monsterHealth to 0
      this.isStartGame = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      playerGiveUp = false;
      this.turns = [];
    },
    normalAttack: function() {

      // set damge and call calculateDamge function
      let damge = this.calculateDamge(10, 0);
      this.monsterHealth -= damge;

      // add a new item to the array at the beginning
      this.turns.unshift({
        isPlayer: true,
        text: 'player hits Monster for ' + damge
      });

      this.monsertAttacks();

    },
    specialAttack: function() {

      // set damge and call calculateDamge function
      let damge = this.calculateDamge(10, 10);
      this.monsterHealth -= damge;

      // add a new item to the array at the beginning
      this.turns.unshift({
        isPlayer: true,
        text: 'player hits Monster harder for ' + damge
      });

			// trigger monster to attack player
      this.monsertAttacks();

    },
    heal: function() {
			// check if playerHealth is lower than 90 then heal it
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }

      // add a new item to the array at the beginning
      this.turns.unshift({
        isPlayer: true,
        text: 'player healed by ' + 10
      });

			// trigger monster to attack player
      this.monsertAttacks();
    },
    giveUp: function() {
			// if give up, set playerHealth back to 0 and start new game
      this.playerGiveUp = true;
      this.playerHealth = 0;
      this.isStartGame = false;
    },
    monsertAttacks: function() {
      // set damge and call calculateDamge function
      let damge = this.calculateDamge(10, 0);
      this.playerHealth -= damge;

      // add a new item to the array at the beginning
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits Player for ' + damge
      });

      // after log damges, then check whether playerHealth is 0 or monsterHealth is 0
      this.checkWin();
    },
    calculateDamge: function(deal, extra) {
			// calculate the damge
      return Math.round((Math.random() * deal + extra));
    },
    checkWin: function() {
			// check if monsterHealth is lower than 0
      if (this.monsterHealth < 0) {
				// set monsterHealth back to 0
        this.monsterHealth = 0;

				// prompt the user for a new game
        if (confirm('you won! new game?')) {
          this.startGame();
        } else {
          this.isStartGame = false;
        }
      } else if (this.playerHealth < 0) {
				// set playerHealth back to 0
        this.playerHealth = 0;

					// prompt the user for a new game
        if (confirm('you lost! new game?')) {
          this.startGame();
        } else {
          this.isStartGame = false;
        }
      }
    }
  }

});
