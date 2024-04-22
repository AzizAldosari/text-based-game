const game = {
    playerImage: 'assets/player.png',
    playerHealth: 100,
    playerAttack: 20,
    playerDefense: 2,
    playerStrength: 2,
    playerSt: 2,
    playerClass: '',
    playerLv: 0,
    playermagica: 20,
    skillPoints: 0,
    spells: {
      fireball: { name: 'Fireball', damage: 40, magicaCost: 10, level: 0, type: 'fire'},
      iceBolt: { name: 'Ice Bolt', damage: 60, magicaCost: 15, level: 1 ,type: 'ice'},
      lightning: { name: 'Lightning', damage: 80, magicaCost: 20, level: 2, type: 'lighting' },
    },
    classes: {
      warrior: { attack: 25, defense: 5, strength: 3, st: 3, magica: 10 },
      mage: { attack: 15, defense: 2, strength: 1, st: 1, magica: 30 },
      rogue: { attack: 20, defense: 3, strength: 2, st: 2, magica: 20 },
    },
    weapons: [{
      name: 'shoe', damage: 15, image: 'assets/shoe.png' },
         {
          name: 'stick', damage: 10, image: 'assets/stick.png' },
         {
        name: 'ball', damage: 20, image: 'assets/ball.png' },
        {name: 'goldenshoe', damage: 300, image: 'assets/shoe.png' },
    ],
      
      enemies: [
        {
          name: "minion1",
          health: 15,
          attack: 30,
          defense: 10,
          strength: 10,
          st: 10,
          image: 'assets/minion1.png'
        },
        {
          name: "minion2",
          health: 30,
          attack: 30,
          defense: 10,
          strength: 10,
          st: 10,
          image: 'assets/minion2.png'
        },
        {
          name: "minion3",
          health: 50,
          attack: 30,
          defense: 10,
          strength: 10,
          st: 10,
          image: 'assets/minion3.png'
        },
        {
          name: "Dragon",
          health: 100,
          attack: 20,
          defense: 5,
          strength: 5,
          st: 5,
          weakness: "ice",
          resistance: ["fire"],
          skill: "fireBreath",
          image: 'assets/dragon.png'
        },
        {
          name: "Boss",
          health: 150,
          attack: 30,
          defense: 10,
          strength: 10,
          st: 10,
          resistance: ["fire", "ice" , "thunder"],
          skill: "heal",
          image: 'assets/boss.png'
        },
      ],
    c: 0,
    gameOver: false,
    t: 50,
    time: 20,
    level: 1,
    currentEnemy: null,
    currentweapon: null,
    inventory: {
        potions: 1,
        antidotes: 0,
      },
      equipment: {
        weapon: null,
        //armor: null,
      },
      displayEnemyImage: function () {
        const enemyImageElement = document.getElementById('enemy-image');
        enemyImageElement.src = this.currentEnemy.image;
      },
      displayweaponsImage: function () {
        const weaponsImageElement = document.getElementById('weapons-image');
        weaponsImageElement.src = this.currentweapons.image;
      },
      isBackgroundMusicPlaying: false,

      playSound: function(soundFile) {
        const audio = new Audio(soundFile);
        audio.playbackRate = 2.0;
        audio.volume = 0.5;
        audio.play();
        
        const self = this;
        audio.onended = () => {
          setTimeout(() => {
            if (self.isBackgroundMusicPlaying) {
              self.playBackgroundMusic('assets/game.mp3');
            }
          }, 2000);
        };
        
        if (this.isBackgroundMusicPlaying) {
          this.pauseBackgroundMusic();
        }
      },
      
      
      playBackgroundMusic: function(soundFile) {
        if (!this.isBackgroundMusicPlaying) {
            this.backgroundMusic = new Audio(soundFile);
            this.backgroundMusic.loop = true; 
            this.backgroundMusic.volume = 0.3;
            this.backgroundMusic.play();
            this.isBackgroundMusicPlaying = true;
        }
    },
      
      pauseBackgroundMusic: function() {
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
        this.isBackgroundMusicPlaying = false;
      },
      
      stopBackgroundMusic: function() {
        this.pauseBackgroundMusic();
      },      
      
    output: document.getElementById('game-output'),
    inputField: document.getElementById('input-field'),
    submitButton: document.getElementById('submit-button'),

    
    init: function() {
        const playerImageElement = document.getElementById('player-image');
playerImageElement.src = game.playerImage;
      this.chooseClass();
      this.submitButton.addEventListener('click', () => {

        this.handleInput();
      });
      
  
      this.currentEnemy = this.enemies[0];
      this.outputMessage(`You are fighting a ${this.currentEnemy.name} with ${this.currentEnemy.health} health.`);
      this.displayEnemyImage();
      this.currentweapons = this.weapons[0];
      this.outputMessage(`You have ${this.currentweapons.name} your weapon attack is ${this.currentweapons.damage} .`);
      this.displayweaponsImage();
      this.gameLoop();
    },
    chooseClass: function() {
      const classInput = prompt(
        'Choose your class: (w)arrior, (m)age, or (r)ogue'
      ).toLowerCase();
  
      switch (classInput) {
        case 'w':
          this.playerClass = 'warrior';
          this.setPlayerStats(this.classes.warrior);
          break;
        case 'm':
          this.playerClass = 'mage';
          this.setPlayerStats(this.classes.mage);
          break;
        case 'r':
          this.playerClass = 'rogue';
          this.setPlayerStats(this.classes.rogue);
          break;
        default:
          this.chooseClass();
          break;
      }
  
      this.outputMessage(`You have chosen the ${this.playerClass} class.`);
    },
    setPlayerStats: function(classStats) {
      this.playerAttack = classStats.attack;
      this.playerDefense = classStats.defense;
      this.playerStrength = classStats.strength;
      this.playerSt = classStats.st;
      this.playermagica = classStats.magica;
    },
    outputMessage: function(message) {
        this.output.innerHTML += message + '<br>';
        this.output.scrollTop = this.output.scrollHeight;
      },
      
      gameLoop: function()
     {
      if (this.gameOver) {
      return;
      }
      this.playBackgroundMusic('assets/game.mp3');  

      if (this.currentEnemy.health <= 0) {
        this.playSound('assets/death.mp3')
          this.outputMessage(`The ${this.currentEnemy.name} has died!`);
        
          if (this.level >= this.enemies.length) {
            this.playSound('assets/lv.mp3')
            this.outputMessage('Congratulations! You have defeated all the enemies.');
            this.gameOver = true;
            return;
          }
        
          this.level++;
          this.playerLv++;
          this.currentEnemy = this.enemies[this.level - 1];
          this.outputMessage(`You are now fighting a ${this.currentEnemy.name} with ${this.currentEnemy.health} health.`);
          this.displayEnemyImage();
        }
        this.outputMessage('you are a being made of mana if mana is equel to zero you die, spells use magica (Type t for help)');
        this.outputMessage('Commands are: h for heal, a for attack, d for defend, r for run, i for inventory, m for mana, s for spell, p for skill points, dr for drinking potions');
      },
  
      handleInput: function() {
      const input = this.inputField.value.trim().toLowerCase();
      this.inputField.value = '';
      this.time = 20;

      const intervalId = setInterval(() => {
        this.time--;
        this.outputMessage(`Time remaining: ${this.time}`);
    
        if (this.time === 0) {
          clearInterval(intervalId);
          this.gameOver = true;
          this.playSound('assets/death.mp3');
          document.getElementById('gameover-animation').classList.add('visible');
          setTimeout(() => {
            document.getElementById('gameover-animation').classList.remove('visible');
          }, 10000);
          this.outputMessage('Time is up. You died!');
        }
        else if(this.time < 0){
          clearInterval(intervalId);
          this.gameOver = true;

        }
      }, 1000);
        if (this.gameOver) {
          
      document.getElementById('gameover-animation').classList.add('visible');
      setTimeout(() => {
        document.getElementById('gameover-animation').classList.remove('visible');
      }, 10000);
          this.outputMessage('The game is over');
          return;
        }
        
        switch (input) {
          case 'a':
            this.attack();
            this.t -= 5;
            this.outputMessage(`You have lost 5 mana. Current mana remaining: ${this.t}`);
            break;
          case 'd':
            this.defend();
            this.t -= 2;
            this.outputMessage(`You have lost 2 mana. Current mana remaining: ${this.t}`);
            break;
          case 'r':
            this.t += 2;
            this.c++;
            this.outputMessage(`You have gained 2 mana. Current mana remaining: ${this.t}`);
            this.run();
            break;
          case 'h':
            this.heal();
            this.t -= 10;
            this.outputMessage(`You have lost 10 mana. Current mana remaining: ${this.t}`);
            break;
          case 'm':
            this.med();
            this.t += 10;
            this.outputMessage(`You have gained 10 mana. Current mana remaining: ${this.t}`);

            break;
          case 's':
            this.useSpell();
            this.t -= 10;
            this.outputMessage(`You have lost 10 mana. Current mana remaining: ${this.t}`);
            break;
            case 'p':
            this.outputMessage(`You have ${this.skillPoints} skill points.`);
        break;
        case 'i':
            this.inventoryCheck();
            break;
            case 'dr':
                this.drinkPotion();
                break;
          default:
            this.outputMessage('Commands are: h for heal, a for attack, d for defend, r for run, i for inventory, m for mana, s for spell, p for skill points, dr for drinking potions');
            this.t -= 2;
            this.outputMessage(`You have lost 2 mana. Current mana remaining: ${this.t}`);
            break;
        }
        
        if (this.t <= 0) {
          this.gameOver = true;
          this.playSound('assets/death.mp3');
          this.outputMessage('No mana. You died!');
          document.getElementById('gameover-animation').classList.add('visible');
      setTimeout(() => {
        document.getElementById('gameover-animation').classList.remove('visible');
      }, 10000);
          return;
        }
        
        if (this.c == 3) {
          this.gameOver = true;
          this.playSound('assets/death.mp3');
          this.outputMessage('You coward. You died!');
          document.getElementById('gameover-animation').classList.add('visible');
      setTimeout(() => {
        document.getElementById('gameover-animation').classList.remove('visible');
      }, 10000);
          return;
        }
        
        this.gameLoop();
      },
      generateLoot: function() {
        const lootTable = [
        { item: 'potion', chance: 50 },
        { item: 'antidote', chance: 30 },
        { item: 'stick', chance: 10 },
        { item: 'shoe', chance: 7 },
        { item: 'ball', chance: 3 },
        {item: 'goldenshoe' ,chance: 1},
        ];
        let totalChance = 0;
for (const loot of lootTable) {
  totalChance += loot.chance;
}

const randomValue = Math.floor(Math.random() * totalChance);

let accumulatedChance = 0;
for (const loot of lootTable) {
  accumulatedChance += loot.chance;
  if (randomValue < accumulatedChance) {
    return loot.item;
  }
}
},

dropLoot: function() {
const droppedItem = this.generateLoot();
switch (droppedItem) {
case 'potion':
this.inventory.potions++;
this.outputMessage(`The enemy dropped a potion. You now have ${this.inventory.potions} potions.`);
break;
case 'antidote':
this.inventory.antidotes++;
this.outputMessage(`The enemy dropped an antidote. You now have ${this.inventory.antidotes} antidotes.`);
break;
case 'stick':
case 'shoe':
case 'ball':
this.equipWeapon(droppedItem);
break;
}
},
equipWeapon: function(weaponName) {
const newWeapon = this.weapons[weaponName];
if (this.equipment.weapon) {
const oldWeapon = this.weapons[this.equipment.weapon.name];
this.playerAttack -= oldWeapon.damage;
this.outputMessage(`You unequipped the ${oldWeapon.name}.`);
}
this.equipment.weapon = newWeapon;
this.playerAttack += newWeapon.damage;
this.outputMessage(`You equipped the ${newWeapon.name}. Your attack is now ${this.playerAttack}.`);
},
      attack: function() {
        this.playSound('assets/attack.mp3');
        document.getElementById('attack-animation').classList.add('visible');
        const playerDamage = this.playerAttack * (this.playerStrength / 100) - this.currentEnemy.defense;
        const enemyDamage = this.currentEnemy.attack * (this.currentEnemy.strength / 100) - this.playerDefense;
    if (this.currentWeapon) {
        if (this.currentEnemy.weakness === this.currentWeapon.type) {
          playerDamage *= 2;
        }
        if (this.currentEnemy.resistance.includes(this.currentWeapon.type)) {
          playerDamage *= 0.7;
        }
      }
      setTimeout(() => {
        document.getElementById('attack-animation').classList.remove('visible');
      }, 1000);
      this.currentEnemy.health -= playerDamage;
      this.playerHealth -= enemyDamage;
    if (this.currentEnemy.health <= 0) {
      this.outputMessage(`Player attacked and dealt ${playerDamage} damage to the ${this.currentEnemy.name}. The ${this.currentEnemy.name} has died!`);
      this.playSound('assets/lv.mp3');
      this.gainSkillPoints();
  this.dropLoot();
      return;
    }
    
    if (this.playerHealth <= 0) {
      this.outputMessage(`Player attacked and dealt ${playerDamage} damage to the ${this.currentEnemy.name}. ${this.currentEnemy.name} health is now ${this.currentEnemy.health}.`);
      this.playSound('assets/death.mp3');
      document.getElementById('death-animation').classList.add('visible');
      setTimeout(() => {
        document.getElementById('death-animation').classList.remove('visible');
      }, 100000);
      this.outputMessage(`${this.currentEnemy.name} counterattacked and dealt ${enemyDamage} damage to the player. The player has died. You lost!`);
      
      this.gameOver = true;
      return;
    }
    this.outputMessage(`Player attacked and dealt ${playerDamage} damage to the ${this.currentEnemy.name}. ${this.currentEnemy.name} health is now ${this.currentEnemy.health}.`);
    this.outputMessage(`${this.currentEnemy.name} counterattacked and dealt ${enemyDamage} damage to the player. Player health is now ${this.playerHealth}.`);
  },

defend: function() {
    this.playSound('assets/defend.mp3');
    document.getElementById('defend-animation').classList.add('visible');
      setTimeout(() => {
        document.getElementById('defend-animation').classList.remove('visible');
      }, 1000);
const playerDef = this.playerDefense * (this.playerSt / 100) + this.playerHealth;
const enemyDamage = this.currentEnemy.attack * (this.currentEnemy.strength / 100) - playerDef;
this.playerHealth -= enemyDamage;

if (enemyDamage <= 0) {
  this.outputMessage(`Player defended and blocked ${this.currentEnemy.name}'s attack. Player health is now ${this.playerHealth}.`);
} else {
  this.outputMessage(`Player defended and blocked ${this.currentEnemy.name}'s attack, but still received ${enemyDamage} damage. Player health is now ${this.playerHealth}.`);
}
},


heal: function() {
    this.playSound('assets/healing.mp3');
    document.getElementById('heal-animation').classList.add('visible');
      setTimeout(() => {
        document.getElementById('heal-animation').classList.remove('visible');
      }, 1000);
const healAmount = Math.floor(Math.random() * 10) + 10;
this.playerHealth += healAmount;
if (this.playerHealth > 100) {
    this.playerHealth = 100;
  }
  
  this.outputMessage(`Player healed for ${healAmount} health. Player health is now ${this.playerHealth}.`);
},

run: function() {
const runChance = Math.floor(Math.random() * 10) + 1;
if (runChance > 5) {
    this.playSound('assets/running.mp3');
    this.outputMessage(`You have successfully run away.`);
    document.getElementById('running-animation').classList.add('visible');
    setTimeout(() => {
      document.getElementById('running-animation').classList.remove('visible');
    }, 1000);
    this.level++;
    this.currentEnemy = this.enemies[this.level - 1];
    this.outputMessage(`You are now fighting a ${this.currentEnemy.name} with ${this.currentEnemy.health} health.`);
    this.displayEnemyImage();
  } else {
    this.outputMessage(`You have failed to run away.`);
    this.playSound('assets/monattack.mp3');
    document.getElementById('attacked-animation').classList.add('visible');
    setTimeout(() => {
      document.getElementById('attacked-animation').classList.remove('visible');
  },1000);
    const enemyDamage = this.currentEnemy.attack * (this.currentEnemy.strength / 100) - this.playerDefense;
    this.playerHealth -= enemyDamage;
    this.outputMessage(`${this.currentEnemy.name} counterattacked and dealt ${enemyDamage} damage to the player. Player health is now ${this.playerHealth}.`);
  }},
  med: function() {
    this.outputMessage(`medatation`);
    document.getElementById('med-animation').classList.add('visible');
    setTimeout(() => {
      document.getElementById('med-animation').classList.remove('visible');
    }, 1000);
  },
  
  useSpell: function() {
    const spellInput = prompt(
      'Choose a spell: (f)ireball, (i)ce bolt, (l)ightning or (s)pecial fusion spell'
    ).toLowerCase();
    let chosenSpell;
    switch (spellInput) {
      case 'f':
        chosenSpell = this.spells.fireball;
        break;
      case 'i':
        chosenSpell = this.spells.iceBolt;
        break;
      case 'l':
        chosenSpell = this.spells.lightning;
        break;
      case 's':
        if (this.skillPoints < 3) {
          this.outputMessage(`You don't have enough skill points to use the special fusion spell.`);
          return;
        }
        chosenSpell = { name: 'Special Fusion Spell', damage: 150, magicaCost: 30 };
        break;
      default:
        this.outputMessage('Invalid spell choice.');
        return;
    }
    if (this.playerLv < chosenSpell.level) {
      this.outputMessage(`You need to be level ${chosenSpell.level} to use ${chosenSpell.name}.`);
      return;
    }
  
    if (this.playermagica < chosenSpell.magicaCost) {
      this.outputMessage(`You don't have enough magica to cast ${chosenSpell.name}.`);
      return;
    }
  
    this.castSpell(chosenSpell);
  },
  
  castSpell: function(spell) {
    this.playSound('assets/spells.mp3');
    document.getElementById('spell-animation').classList.add('visible');
    setTimeout(() => {
      document.getElementById('spell-animation').classList.remove('visible');
    }, 1000);
    const spellDamage = spell.damage;
    const spellMagicaCost = spell.magicaCost;
    this.currentEnemy.health -= spellDamage;
    this.playermagica -= spellMagicaCost;

    this.outputMessage(`You cast ${spell.name} and dealt ${spellDamage} damage to the ${this.currentEnemy.name}.`);
    this.outputMessage(`You have lost ${spellMagicaCost} magica. Current magica remaining: ${this.playermagica}.`);

    if (this.currentEnemy.health <= 0) {
      this.outputMessage(`The ${this.currentEnemy.name} has died! Congratulations! You won!`);
      this.playSound('assets/death.mp3');
      this.level++;
      this.playerLv++;
      this.gainSkillPoints();
  this.dropLoot();
      return;
    }

    const enemyDamage = this.currentEnemy.attack * (this.currentEnemy.strength / 100) - this.playerDefense;

    this.playerHealth -= enemyDamage;

    if (this.playerHealth <= 0) {
      this.outputMessage(`${this.currentEnemy.name} counterattacked and dealt ${enemyDamage} damage to the player. The player has died. You lost!`);
   this.playSound('assets/death.mp3');
   document.getElementById('death-animation').classList.add('visible');
   setTimeout(() => {
     document.getElementById('death-animation').classList.remove('visible');
   }, 10000);
      this.gameOver = true;
      return;
    }

    this.outputMessage(`${this.currentEnemy.name} counterattacked and dealt ${enemyDamage} damage to the player. Player health is now ${this.playerHealth}.`);
    this.playSound('assets/monattack.mp3');
    document.getElementById('attacked-animation').classList.add('visible');
    setTimeout(() => {
      document.getElementById('attacked-animation').classList.remove('visible');
  },1000);
  },
  gainSkillPoints: function() {

    const skillPointsGained = Math.floor(Math.random() * 3) + 1;
    this.skillPoints += skillPointsGained;
    this.outputMessage(`You gained ${skillPointsGained} skill points. Total skill points: ${this.skillPoints}`);
  },


  inventoryCheck: function() {
    this.playSound('assets/iven.mp3');
    document.getElementById('iven-animation').classList.add('visible');
    setTimeout(() => {
      document.getElementById('iven-animation').classList.remove('visible');
    }, 1000);
    this.outputMessage(`You have ${this.inventory.potions} potions and ${this.inventory.antidotes} antidotes.`);
    },
    drinkPotion: function() {
        if (this.inventory.potions > 0) {
        this.inventory.potions--;
        this.time += 10;
        document.getElementById('drinking-animation').classList.add('visible');
        setTimeout(() => {
          document.getElementById('drinking-animation').classList.remove('visible');
        }, 1000);
        this.playSound('assets/drinking.mp3');
        this.outputMessage(`You drank a potion. You now have ${this.inventory.potions} potions left. Time remaining: ${this.time}`);
        } else {
        this.outputMessage("You don't have any potions left.");
        }
        }
};

game.init();
   