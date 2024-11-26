document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.querySelector('.start-button');
  const introScreen = document.querySelector('.intro-screen');
  const characterSelectScreen = document.querySelector('.character-select');
  const gameArea = document.querySelector('.game-area');
  const selectButtons = document.querySelectorAll('.select-button');
  const characterName = document.querySelector('.character-name');
  const characterPortrait = document.querySelector('.character-portrait img');
  const hpBar = document.querySelector('.progress-fill.hp');
  const xpBar = document.querySelector('.progress-fill.xp');
  const storyTitle = document.querySelector('.story-title');
  const storyText = document.querySelector('.story-text');
  const decisionButtons = document.querySelectorAll('.decision-button');

  let selectedCharacter = null;

  // Configuración de imágenes con rutas absolutas
  const IMAGES = {
    warrior: '/assets/images/warrior.jpg',
    mage: '/assets/images/mage.jpg',
    archer: '/assets/images/archer.jpg',
    cabin: '/assets/images/cabin.jpg',
    forest: '/assets/images/forest.jpg'
  };

  // Precargar imágenes
  function preloadImages() {
    for (const key in IMAGES) {
      const img = new Image();
      img.src = IMAGES[key];
    }
  }

  preloadImages();

  startButton.addEventListener('click', () => {
    introScreen.classList.add('hidden');
    characterSelectScreen.classList.remove('hidden');
  });

  selectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      selectedCharacter = e.target.closest('.character-card');
      const characterClass = selectedCharacter.dataset.class;

      switch (characterClass) {
        case 'warrior':
          characterName.textContent = 'Guerrero';
          characterPortrait.src = IMAGES.warrior;
          hpBar.style.width = '100%';
          break;
        case 'mage':
          characterName.textContent = 'Mago';
          characterPortrait.src = IMAGES.mage;
          hpBar.style.width = '80%';
          break;
        case 'archer':
          characterName.textContent = 'Arquero';
          characterPortrait.src = IMAGES.archer;
          hpBar.style.width = '90%';
          break;
      }
      xpBar.style.width = '0%';

      characterSelectScreen.classList.add('hidden');
      gameArea.classList.remove('hidden');

      // Nueva historia inicial
      startInitialStory();
    });
  });

  function simulateCombat(playerType, playerChoice, enemyChoice) {
    // Character-specific stats and combat rules
    const characterStats = {
      warrior: {
        hp: 100,
        damage: 15,
        moves: {
          rock: 'embestida',
          paper: 'armadura',
          scissors: 'espada'
        }
      },
      mago: {
        hp: 80,
        damage: 10,
        moves: {
          rock: 'escombros',
          paper: 'manta',
          scissors: 'cortejo'
        }
      },
      arquero: {
        hp: 90,
        damage: 12,
        moves: {
          rock: 'afilador',
          paper: 'capucha',
          scissors: 'flechazo'
        }
      }
    };

    // Validate inputs
    if (!characterStats[playerType]) {
      throw new Error('Invalid player type');
    }

    if (!['rock', 'paper', 'scissors'].includes(playerChoice) ||
      !['rock', 'paper', 'scissors'].includes(enemyChoice)) {
      throw new Error('Invalid choice');
    }

    // Determine winner using standard rock-paper-scissors logic
    if (playerChoice === enemyChoice) {
      return {
        result: 'Empate',
        playerMove: characterStats[playerType].moves[playerChoice],
        enemyMove: characterStats[playerType].moves[enemyChoice],
        playerHP: characterStats[playerType].hp,
        playerDamage: 0
      };
    }

    const winConditions = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper'
    };

    const isPlayerWinner = winConditions[playerChoice] === enemyChoice;

    return {
      result: isPlayerWinner ? 'Victoria' : 'Derrota',
      playerMove: characterStats[playerType].moves[playerChoice],
      enemyMove: characterStats[playerType].moves[enemyChoice],
      playerHP: isPlayerWinner ? characterStats[playerType].hp : characterStats[playerType].hp - characterStats[playerType].damage,
      playerDamage: isPlayerWinner ? 0 : characterStats[playerType].damage
    };
  }

  // Example usage demonstrating different character types
  function demoFight() {
    try {
      console.log('Guerrero vs Enemigo:');
      console.log(simulateCombat('warrior', 'rock', 'scissors'));

      console.log('\nMago vs Enemigo:');
      console.log(simulateCombat('mago', 'paper', 'rock'));

      console.log('\nArquero vs Enemigo:');
      console.log(simulateCombat('arquero', 'scissors', 'paper'));
    } catch (error) {
      console.error(error.message);
    }
  }

  function startInitialStory() {
    storyTitle.textContent = 'Wake up in the cabin';
    const initialStory = `
          You wake up dazed in a dark, dank cabin in the Eternal Forest. Your head throbs while 
          your eyes adapt to the darkness. The last memories are confusing: you were following a 
          clue to ancient treasures when everything went black.

          Now you find yourself tied to a chair, but the ropes are loose enough to 
          to free yourself with some effort. Through the weak light that filters through the windows 
          covered in dust, you can make out silhouettes of old furniture and rusty tools.
          
          You hear occasional footsteps outside the cabin, indicating that someone is watching. 
          Time is of the essence, and you must make a quick decision on how to escape.
      `;
    storyText.textContent = initialStory.trim();

    // Actualizar los botones de decisión
    updateDecisionButtons([
      'Wait for the battle',
      'Break the window and escape'
    ]);
  }

  function updateDecisionButtons(decisions) {
    decisionButtons.forEach((button, index) => {
      if (index < decisions.length) {
        button.textContent = decisions[index];
        button.style.display = 'block';
      } else {
        button.style.display = 'none';
      }
    });
  }

  decisionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const decision = e.target.textContent;

      switch (decision) {
        case 'Wait for the battle':
          storyTitle.textContent = 'Wait for the battle';
          storyText.textContent = `
                      You move cautiously around the cabin, making sure the floorboards don't creak. 
                      under your feet. Upon close inspection, you discover a small trapdoor 
                      partially hidden under an old rug. It could be your escape route, but 
                      It could also be a trap.
                  `;
          updateDecisionButtons([
            'Investigate the trapdoor',
            'Search for another exit'
          ]);
          break;

        case 'Break the window and escape':
          storyTitle.textContent = 'Break the window and escape';
          storyText.textContent = `
                In one swift movement, you pick up an old chair and throw it against the closest window. 
                close. The glass shatters with a crash that breaks the silence of the forest. 
                You immediately hear shouts and hurried footsteps approaching the cabin.
            `;
          // Reducir HP por el riesgo tomado
          const currentHP = parseInt(hpBar.style.width);
          hpBar.style.width = `${currentHP - 20}%`;

          updateDecisionButtons([
            'Run into the forest',
            'Prepare for the combat'
          ]);
          break;

        case 'Run into the forest':
          storyTitle.textContent = 'Run into the forest';
          storyText.textContent = `
                You decide to flee towards the forest, running at full speed through the trees. The ground is uneven 
                and the branches creak under your feet, but you must keep up. In the distance, you hear them following you, 
                but the sound is lost between the wind and the leaves. Do you keep running or try to hide?            `;
          updateDecisionButtons([
            'Keep running',
            'Hide on the forest'
          ]);
          break;

        case 'Prepare for the combat':
          storyTitle.textContent = 'Wait for the battle';
          storyText.textContent = `
                There is no time to run away. You prepare to face whatever comes. Quickly 
                You find a blunt object near the broken window. The footsteps get closer and closer, 
                and you can feel the tension in the air. You're ready to fight, but something tells you that maybe 
                you should look for a better place to ambush your pursuers.
            `;
          updateDecisionButtons([
            'Wait for the battle',
            'Move to ambush'
          ]);
          break;

        case 'Keep running':
          storyTitle.textContent = 'Keep running';
          storyText.textContent = `
                With your heart racing, you continue running without looking back. The forest becomes denser, 
                and every step feels heavier. Despite everything, you begin to notice that the sounds of your 
                pursuers fade away, perhaps you are managing to leave them behind. Do you keep running or 
                Do you stop to catch your breath?            `;
          updateDecisionButtons([
            'Keep running without stopping',
            'Stop and recover your breath'
          ]);
          break;

        case 'Keep running without stopping':
          storyTitle.textContent = 'Keep running without stopping';
          storyText.textContent = `
                You continue running wildly, without looking back, your breathing is erratic and your legs 
                They feel heavier and heavier. In a moment of distraction, you trip over a fallen tree and fall 
                to the ground, hitting your head. Darkness envelops you and you lose consciousness. 
                After about 10 minutes, you wake up disoriented, with a throbbing pain in your head. 
                You realize that you have lost a lot of energy in the flight.
            `;

          const currentHP4 = parseInt(hpBar.style.width);
          hpBar.style.width = `${currentHP4 - 10}%`;  // Se reduce la salud debido al tropiezo

          updateDecisionButtons([
            'Recover energy',
            'Keep walking'
          ]);
          break;

        case 'Recover energy':
          storyTitle.textContent = 'Recover energy';
          storyText.textContent = `
                You take a few minutes to breathe deeply, calming your mind and body. Little by little, 
                you regain some energy. Although you are still exhausted, you feel a little better, ready to continue. 
                You decide to move forward, although you know that danger is still close.
            `;

          const currentHP5 = parseInt(hpBar.style.width);
          hpBar.style.width = `${Math.min(currentHP5 + 10, 100)}%`;  // Recupera un poco de vida

          updateDecisionButtons([
            'Move forward with more energy',
            'Rest a little more before continue'
          ]);
          break;

        case 'Keep walking':
          storyTitle.textContent = 'Keep walking';
          storyText.textContent = `
                    Despite the fall and the pain in your body, you decide not to waste any more time. You get up slowly 
                    and you continue walking, advancing cautiously. Each step is more difficult than the last, but you know that 
                    You can't stay there for long. The tension in the air tells you that danger is still close.
                `;

          updateDecisionButtons([
            'Keep moving forward despite fatigue',
            'Stop to take a rest'
          ]);
          break;

        case 'Stop and recover your breath':
          storyTitle.textContent = 'Stop and recover your breath';
          storyText.textContent = `
                    You stop for a moment to catch your breath, your thoughts focusing on how 
                    escape from those who were chasing you. However, in the distance, you hear again the noises of your 
                    pursuers, although now they are much further away. They seem to have lost the trail, but still 
                    You can't relax at all. While you recover, something strange catches your attention: an object 
                    Metal sticks out of the ground near you. It is partially embedded and appears to be 
                    covered in dirt and moss.
                `;

          updateDecisionButtons([
            'Investigate the metal',
            'Ignore the metal and keep moving forward'
          ]);
          break;

        case 'Investigate the metal':
          storyTitle.textContent = 'Investigate the metal';
          storyText.textContent = `
                  You decide to investigate the metal embedded in the ground. As you approach, you notice that it is a stranger 
                  ancient artifact, with symbols that you can't understand. When you touch it, a strange vibration runs through 
                  your body, and a faint glow emerges from its surface. Suddenly the air around you becomes 
                  dense and heavy, and you can hear distant laughter. Something is not right...
              `;

          // Puedes agregar una reducción de vida o un cambio en la historia aquí dependiendo de lo que quieras que pase
          const currentHP6 = parseInt(hpBar.style.width);
          hpBar.style.width = `${Math.max(currentHP6 - 5, 0)}%`;  // Reducir un poco de vida por el riesgo

          updateDecisionButtons([
            'Continue studying the artifact',
            'Walk away quickly and keep walking'
          ]);
          break;

        case 'Ignore the metal and keep moving forward':
          storyTitle.textContent = 'Ignore the metal and keep moving forward';
          storyText.textContent = `
                 You decide that Investigate the metal may be too risky and decide to keep moving forward. 
                  With one last glance at the artifact, you head forward, not looking back. 
                  Each step is heavier, but you know you can't stay there for long. 
                  In the distance, the sound of your pursuers begins to fade.
              `;

          updateDecisionButtons([
            'Move forward with determination',
            'Find a safe place to rest'
          ]);
          break;

        case 'Hide in the forest':
          storyTitle.textContent = 'Hide in the forest';
          storyText.textContent = `
                You decide you won't be able to run forever, so you look for a place to hide. behind a tree 
                leafy and a mound of leaves, you crouch down trying to control your breathing. The sounds of 
                Your pursuers approach, but you remain motionless. Are you still hiding or do you take the opportunity to 
                try to fight back?
            `;
          updateDecisionButtons([
            'stay hidden',
            'Strike back by surprise'
          ]);
          break;

        case 'Wait for the battle':
          storyTitle.textContent = 'Wait for the battle';
          storyText.textContent = `
                You stand your ground, listening to the footsteps approach. At any moment, they would enter through the 
                broken window or smashed door. You prepare your improvised weapon and decide that you are ready 
                to face whatever comes. The first enemies appear in sight... It's your time!
            `;
          updateDecisionButtons([
            'Attack immediately',
            'Wait for them to get closer'
          ]);
          break;

        case 'Move to ambush':
          storyTitle.textContent = 'Move to ambush';
          storyText.textContent = `
                You are looking for a better position, something that will give you an advantage in the confrontation. You hide in a corner 
                dark behind a broken bookshelf, watching the entrance. When the footsteps get closer, 
                you prepare to surprise them from the shadows.
            `;
          updateDecisionButtons([
            'Attack from the shadows',
            'Wait for the perfect moment'
          ]);
          break;

        case 'Wait for the battle':
          storyTitle.textContent = 'Stealthy approach';
          storyText.textContent = `
                        You move cautiously around the cabin, making sure the floorboards don't creak. 
                        under your feet. Upon close inspection, you discover a small trapdoor 
                        partially hidden under an old rug. It could be your escape route, but 
                        It could also be a trap.
                    `;
          updateDecisionButtons([
            'Investigate the trapdoor',
            'Search for another exit'
          ]);
          break;

        case 'Investigate the trapdoor':
          storyTitle.textContent = 'Investigate the trapdoor';
          storyText.textContent = `
                        As you approach the hatch, you feel cold air emanating from its cracks. 
                        You open the lid slowly and find a staircase descending into the darkness. 
                        Suddenly, a blue light begins to shine in the background. Do you go down or walk away?
                    `;
          updateDecisionButtons([
            'Go down the stairs',
            'Close the trapdoor and investigate the house'
          ]);
          break;

        case 'Search for another exit':
          storyTitle.textContent = 'Search for another exit';
          storyText.textContent = `
                        You decide to move away from the trapdoor and look for a different exit. You walk stealthily 
                        through the dark hallways of the house, noticing that the doors are closed and the windows 
                        blocked. However, you find a side door ajar. 
                        Do you risk opening it or continue exploring?
                    `;
          updateDecisionButtons([
            'Open the side door',
            'Continue exploring the house'
          ]);
          break;

        case 'Open the side door':
          storyTitle.textContent = 'Open the side door';
          storyText.textContent = `
                        You slowly push the side door, and it creaks open. You discover a small warehouse full of 
                        old boxes and cobwebs. In one of the boxes you find a functional flashlight. 
                        Just when you think it's safe, you hear footsteps approaching from the hallway. 
                        Do you hide in the warehouse or go out to confront whoever?
            `;
          updateDecisionButtons([
            'Hide in the warehouse',
            'Go out and face whoever'
          ]);
          break;

        case 'Continue exploring the house':
          storyTitle.textContent = 'Continue exploring the house';
          storyText.textContent = `
                  You decide to ignore the side door and continue exploring the house. You go up the stairs and find a 
                  hallway full of rooms. Some doors are open slightly, and others appear closed 
                  with key. You hear a whisper coming from one of the rooms. 
                  Do you follow the whisper or find another area of ​​the house to explore?
              `;
          updateDecisionButtons([
            'Follow the whisper',
            'Find another area'
          ]);
          break;

        case 'Hide in the warehouse':
          storyTitle.textContent = 'Hide in the warehouse';
          storyText.textContent = `
                 You hide behind the boxes, holding your breath as the footsteps get closer. 
                  The door to the warehouse slowly opens, and a figure enters, shining a flashlight. 
                  Do you stay silent and hope not to be discovered or do you try to run away?
              `;
          updateDecisionButtons([
            'Stay slient',
            'Run out'
          ]);
          break;

        case 'Go out and face whoever':
          storyTitle.textContent = 'Go out and face whoever';
          storyText.textContent = `
                  You take a deep breath and leave the warehouse. In the hallway, you meet an unknown person 
                  who seems just as surprised as you. It turns out to be another visitor trapped in the house. 
                  They decide to collaborate to find a way out, but they hear a loud bang coming from the basement. 
                  Do you investigate the basement together or look for another exit through the upper floor?
              `;
          updateDecisionButtons([
            'Investigate the basement',
            'Find another exit on the upper floor'
          ]);
          break;

        case 'Follow the whisper':
          storyTitle.textContent = 'Follow the whisper';
          storyText.textContent = `
                  You follow the whisper to a room at the end of the hallway. Inside, you find an old diary about 
                  a table, open to a page with strange inscriptions. While you try to decipher the text, 
                  a shadow moves behind you. 
                  Do you turn around to face whatever it is or take the diary and run?
              `;
          updateDecisionButtons([
            'turn around and prepare to fight',
            'Take the diary and run away'
          ]);
          break;

        case 'Find another area':
          storyTitle.textContent = 'Find another area';
          storyText.textContent = `
                  You ignore the whisper and decide to explore another part of the house. You arrive at a dusty library with 
                  shelves full of old books. One of the books seems out of place and glows faintly. 
                  Do you pick it up and open it or do you look elsewhere in the library for clues?
              `;
          updateDecisionButtons([
            'Take and open the book',
            'Search for clues in the library'
          ]);
          break;

        case 'Close the hatch and explore the house':
          storyTitle.textContent = 'Search for another exit';
          storyText.textContent = `
                          You decide to move away from the trapdoor and look for a different exit. You walk stealthily 
                          through the dark hallways of the house, noticing that the doors are closed and the windows 
                          blocked. However, you find a side door ajar. 
                          Do you risk opening it or continue exploring?
                      `;
          updateDecisionButtons([
            'Open the side door',
            'Continue exploring the house'
          ]);
          break;

        case 'Go down the stairs':
          storyTitle.textContent = 'Go down the stairs';
          storyText.textContent = `
                You descend the stairs carefully. The blue light increases in intensity, revealing a 
                underground tunnel. You hear metallic footsteps that seem to be approaching slowly... 
                Do you keep going down or go back up?
            `;
          updateDecisionButtons([
            'continue down',
            'Back to top'
          ]);
          break;

        case 'Continue down':
          storyTitle.textContent = 'Continue down';
          storyText.textContent = `
               You decide to continue down cautiously, making sure each step is firm. 
                The air becomes colder as you descend deeper into the tunnel, 
                but you don't find any more obstacles. The descent continues without incident, and the atmosphere 
                It grows quieter and gloomier with every step you take.
            `;

          updateDecisionButtons([
            'Continue descending into the unknown',
            'Faint out of nowhere'
          ]);
          break;

        case 'Continue descending into the unknown':
          storyTitle.textContent = 'Continue descending into the unknown';
          storyText.textContent = `
                 You continue descending carefully, each step calculated so as not to make a sound. 
                  As you advance, the darkness slowly fades, and in the distance, 
                  You can see a lighted room. The light is strange and modern, contrasting 
                  with the old appearance of the tunnel. You wonder what could be there, 
                  but you don't know if getting closer is the safest thing to do.
              `;

          updateDecisionButtons([
            'Go to the lighted room',
            'Continue exploring to find a safe place'
          ]);
          break;

        case 'Go to the lighted room':
          storyTitle.textContent = 'Go to the lighted room';
          storyText.textContent = `
             As you walk into the lighted room, a chill runs through your body. Looking back, you notice a strange, dark shadow that seems to move in the distance. At first, it appears to be standing still, but suddenly, it begins to move quickly towards you, running at a terrifying speed.
              You don't know what it is, but the feeling of danger is unmistakable. The shadow is approaching quickly and there seems to be no escape.
              What are you going to do?
            `;

          updateDecisionButtons([
            'Prepare for the battle',
            'try to escape'
          ]);
          break;

          case 'Prepare for the battle':
            storyTitle.textContent = 'Prepare for the battle';
            storyText.textContent = `
                You prepare to face the threatening shadow. You feel the adrenaline rushing through your body as you get into a combat stance. 
                However, just as you're about to attack, the figure raises its hands and shouts, "Wait! I'm not your enemy."
                It turns out to be another man trapped in the house, desperately searching for a way out. He explains that he has been exploring 
                and discovered a secret passage leading outside.
                
                Together, you navigate the dark and narrow passage, confronting the fear of the unknown. Finally, you reach the light of day. 
                As you step outside, both of you breathe deeply, relieved to have escaped alive. You promise never to return to the house, 
                but you feel that this experience has changed you forever.
                
                The adventure is over... for now.
            `;
            updateDecisionButtons([
              'Celebrate victory'
            ]);
          break;
          
          // Ejemplo de la función getPlayerMove:
          function getPlayerMove(playerType) {
            switch (playerType) {
              case 'warrior':
                return 'rock'; // Por ahora, un movimiento predeterminado
              case 'mage':
                return 'paper';
              case 'rogue':
                return 'scissors';
              default:
                console.error('Unknown character type:', playerType);
                return 'rock'; // Valor predeterminado en caso de error
            }
          }          

        case 'Celebrate victory':
          location.reload();
          break;

        case 'Try to escape':
          storyTitle.textContent = 'Try to escape';
          storyText.textContent = `
             In a desperate attempt, you turn on your heels and start running. Your footsteps echo down the hallway as you frantically search for a place to hide or escape. However, despite your efforts, you can't find any way out or shelter. The walls seem to close around you, and the shadow moves quickly, closer and closer. 
          
              In your career, you realize that there is nowhere you can run. The sound of your accelerated breathing mixes with the noise of the approaching shadow. With no other options, you find yourself cornered in a dark corner, with the terrifying figure already just a few feet away from you.
          
              The dark figure stops, and you are forced to make a decision. Fear paralyzes you, but you know you must act quickly.
          
              What will you do?
            `;

          updateDecisionButtons([
            'Prepare for the battle',
            'Attack him by surprise'
          ]);
          break;

        case 'Faint out of nowhere':
          storyTitle.textContent = 'Faint out of nowhere';
          storyText.textContent = `
               As you continue to descend, you begin to feel strange, as if a strong 
                weakness would invade you. The air grows thicker and your vision blurs. Before being able 
                react, you lose your balance and faint, falling uncontrollably downwards, 
                losing consciousness.
            `;

          const currentHP1 = parseInt(hpBar.style.width);
          hpBar.style.width = `${currentHP1 - 10}%`;

          updateDecisionButtons([
            'Try to wake up and move on',
            'Take advantage of the moment and rest a little'
          ]);
          break;

        case 'Try to wake up and move on':
          storyTitle.textContent = 'Try to wake up and move on';
          storyText.textContent = `
              Luchas contra la sensación de desmayo, sacudiendo la cabeza y abriendo los ojos con esfuerzo. 
                Te levantas lentamente, tambaleante, y te fijas en la dirección de la luz brillante que ves 
                en la distancia. A medida que te acercas a ella, una sombra se perfila ante ti, una figura 
                alta que parece caminar hacia ti con paso firme, sujetando un bate con ambas manos. La luz 
                a su alrededor resalta aún más la silueta, y sientes un escalofrío recorrer tu espalda mientras 
                te das cuenta de que no hay manera de escapar. 
            `;

          const currentHP2 = parseInt(hpBar.style.width);
          hpBar.style.width = `${currentHP2 - 5}%`;

          updateDecisionButtons([
            'Get up and prepare for what is coming',
            'try to escape'
          ]);
          break;

        case 'Take advantage of the moment and rest a little':
          storyTitle.textContent = 'Take advantage of the moment and rest a little';
          storyText.textContent = `
                Exhausted from the fall, you decide it's better to rest. You lie down on the ground and close your eyes, 
                thinking that you have managed to escape everything that was above. Tiredness overcomes you quickly, 
                and soon you fall into a deep and restful sleep. You let yourself be carried away by the tranquility, 
                without knowing that you are not as safe as you thought.
                
                While you sleep, a dark presence slowly approaches, an entity that dwells in the depths 
                of this place. Silently, it approaches without you noticing, and before you can wake up, it finds you 
                In your dream, the end is already inevitable. It all ends here.
            `;

          const currentHP3 = parseInt(hpBar.style.width);
          hpBar.style.width = '0%';

          updateDecisionButtons([
            'Game over. You have been defeated by the entity.'
          ]);

          break;
        case 'Game over. You have been defeated by the entity.':
          location.reload();
          break;

        case 'Back to top':
          storyTitle.textContent = 'Back to top';
          storyText.textContent = `
                You decide it's better to go back, so you start climbing the ladder. However, just 
                When you are about to go out through the trapdoor, something unexpected happens: someone closes 
                the trapdoor violently. Your arms are trapped, and the pain is unbearable. 
                Unable to free yourself, you fall to your death, as life escapes from your body.
            `;
          hpBar.style.width = '0%';

          updateDecisionButtons([
            'Restart the story'
          ]);
          break;

        case 'Restart the story':
          location.reload();
          break;

        case 'Continue exploring the house':
          storyTitle.textContent = 'Continue exploring the house';
          storyText.textContent = `
                        You decide not to open the side door and continue exploring. As you get deeper into 
                        the house, the silence becomes increasingly heavier, as if something was waiting for the 
                        right time to act...
                    `;
          updateDecisionButtons([
            'Search in the dining room',
            'Search in the bedroom'
          ]);
          break;

      }
    });
  });
});
