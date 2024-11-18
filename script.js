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

  function startInitialStory() {
    storyTitle.textContent = 'Despertar en la Cabaña';
    const initialStory = `
          Despiertas aturdido en una cabaña oscura y húmeda del Bosque Eterno. Tu cabeza palpita mientras 
          tus ojos se adaptan a la penumbra. Los últimos recuerdos son confusos: estabas siguiendo una 
          pista sobre antiguos tesoros cuando todo se volvió negro.

          Ahora te encuentras atado a una silla, pero las cuerdas están lo suficientemente flojas como 
          para liberarte con algo de esfuerzo. A través de la débil luz que se filtra por las ventanas 
          cubiertas de polvo, puedes distinguir siluetas de muebles viejos y herramientas oxidadas.

          Escuchas pasos ocasionales en el exterior de la cabaña, lo que indica que hay alguien vigilando. 
          El tiempo es esencial, y debes tomar una decisión rápida sobre cómo escapar.
      `;
    storyText.textContent = initialStory.trim();

    // Actualizar los botones de decisión
    updateDecisionButtons([
      'Buscar sigilosamente una salida',
      'Romper la ventana y escapar'
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
        case 'Buscar sigilosamente una salida':
          storyTitle.textContent = 'Aproximación Sigilosa';
          storyText.textContent = `
                      Te mueves con cautela por la cabaña, procurando que las tablas del suelo no crujan 
                      bajo tus pies. Tras una inspección minuciosa, descubres una pequeña trampilla 
                      parcialmente oculta bajo una alfombra vieja. Podría ser tu ruta de escape, pero 
                      también podría ser una trampa.
                  `;
          updateDecisionButtons([
            'Investigar la trampilla',
            'Buscar otra salida'
          ]);
          break;

        case 'Romper la ventana y escapar':
          storyTitle.textContent = 'Escape Arriesgado';
          storyText.textContent = `
                Con un movimiento rápido, tomas una silla vieja y la arrojas contra la ventana más 
                cercana. El cristal se hace añicos con un estruendo que rompe el silencio del bosque. 
                Inmediatamente escuchas gritos y pasos apresurados acercándose a la cabaña.
            `;
          // Reducir HP por el riesgo tomado
          const currentHP = parseInt(hpBar.style.width);
          hpBar.style.width = `${currentHP - 20}%`;

          updateDecisionButtons([
            'Correr hacia el bosque',
            'Prepararte para el combate'
          ]);
          break;

        case 'Correr hacia el bosque':
          storyTitle.textContent = 'Correr hacia el bosque';
          storyText.textContent = `
                Decides huir hacia el bosque, corriendo a toda velocidad entre los árboles. El suelo es irregular 
                y las ramas crujen bajo tus pies, pero debes mantener el ritmo. A lo lejos, escuchas que te siguen, 
                pero el sonido se pierde entre el viento y las hojas. ¿Sigues corriendo o intentas esconderte?
            `;
          updateDecisionButtons([
            'Seguir corriendo',
            'Esconderse en el bosque'
          ]);
          break;

        case 'Prepararte para el combate':
          storyTitle.textContent = 'Prepararte para el combate';
          storyText.textContent = `
                No hay tiempo para huir. Te preparas para enfrentarte a lo que sea que venga. Rápidamente 
                encuentras un objeto contundente cerca de la ventana rota. Los pasos se acercan cada vez más, 
                y puedes sentir la tensión en el aire. Estás listo para luchar, pero algo te dice que quizás 
                deberías buscar un mejor lugar para emboscar a tus perseguidores.
            `;
          updateDecisionButtons([
            'Esperar el enfrentamiento',
            'Moverse para emboscar'
          ]);
          break;

        case 'Seguir corriendo':
          storyTitle.textContent = 'Seguir corriendo';
          storyText.textContent = `
                Con el corazón acelerado, sigues corriendo sin mirar atrás. El bosque se vuelve más denso, 
                y cada paso se siente más pesado. A pesar de todo, comienzas a notar que los sonidos de tus 
                perseguidores se desvanecen, tal vez estás logrando dejarlos atrás. ¿Sigues corriendo o te 
                detienes para recuperar el aliento?
            `;
          updateDecisionButtons([
            'Seguir corriendo sin parar',
            'Detenerse y recuperar el aliento'
          ]);
          break;

        case 'Esconderse en el bosque':
          storyTitle.textContent = 'Esconderse en el bosque';
          storyText.textContent = `
                Decides que no podrás correr por siempre, así que buscas un lugar para esconderte. Tras un árbol 
                frondoso y un montículo de hojas, te agachas intentando controlar tu respiración. Los sonidos de 
                tus perseguidores se acercan, pero te quedas inmóvil. ¿Sigues escondido o aprovechas para 
                intentar contraatacar?
            `;
          updateDecisionButtons([
            'Permanecer escondido',
            'Contraatacar por sorpresa'
          ]);
          break;

        case 'Esperar el enfrentamiento':
          storyTitle.textContent = 'Esperar el enfrentamiento';
          storyText.textContent = `
                Te mantienes firme, escuchando los pasos acercarse. En cualquier momento, entrarían por la 
                ventana rota o la puerta destrozada. Preparas tu arma improvisada y decides que estás listo 
                para enfrentar lo que venga. Los primeros enemigos aparecen a la vista... ¡Es tu momento!
            `;
          updateDecisionButtons([
            'Atacar inmediatamente',
            'Esperar a que se acerquen más'
          ]);
          break;

        case 'Moverse para emboscar':
          storyTitle.textContent = 'Moverse para emboscar';
          storyText.textContent = `
                Buscas una mejor posición, algo que te dé ventaja en el enfrentamiento. Te escondes en una esquina 
                oscura detrás de una estantería rota, observando la entrada. Cuando los pasos se acercan, 
                te preparas para sorprenderlos desde las sombras.
            `;
          updateDecisionButtons([
            'Atacar desde las sombras',
            'Esperar el momento perfecto'
          ]);
          break;

        case 'Buscar sigilosamente una salida':
          storyTitle.textContent = 'Aproximación Sigilosa';
          storyText.textContent = `
                        Te mueves con cautela por la cabaña, procurando que las tablas del suelo no crujan 
                        bajo tus pies. Tras una inspección minuciosa, descubres una pequeña trampilla 
                        parcialmente oculta bajo una alfombra vieja. Podría ser tu ruta de escape, pero 
                        también podría ser una trampa.
                    `;
          updateDecisionButtons([
            'Investigar la trampilla',
            'Buscar otra salida'
          ]);
          break;

        case 'Investigar la trampilla':
          storyTitle.textContent = 'Investigar la trampilla';
          storyText.textContent = `
                        Al acercarte a la trampilla, sientes un aire frío que emana desde sus grietas. 
                        Abres la tapa lentamente y encuentras una escalera que desciende hacia la oscuridad. 
                        De repente, una luz azul comienza a brillar al fondo. ¿Bajas o te alejas?
                    `;
          updateDecisionButtons([
            'Bajar por la escalera',
            'Cerrar la trampilla y explorar la casa'
          ]);
          break;

        case 'Buscar otra salida':
          storyTitle.textContent = 'Buscar otra salida';
          storyText.textContent = `
                        Decides alejarte de la trampilla y buscar una salida diferente. Caminas sigilosamente 
                        por los pasillos oscuros de la casa, notando que las puertas están cerradas y las ventanas 
                        bloqueadas. Sin embargo, encuentras una puerta lateral entreabierta. 
                        ¿Te arriesgas a abrirla o sigues explorando?
                    `;
          updateDecisionButtons([
            'Abrir la puerta lateral',
            'Seguir explorando la casa'
          ]);
          break;

        case 'Bajar por la escalera':
          storyTitle.textContent = 'Bajar por la escalera';
          storyText.textContent = `
                Desciendes la escalera con cuidado. La luz azul aumenta en intensidad, revelando un 
                túnel subterráneo. Escuchas pasos metálicos que parecen acercarse lentamente... 
                ¿Sigues bajando o vuelves arriba?
            `;
          updateDecisionButtons([
            'Seguir bajando',
            'Volver arriba'
          ]);
          break;

        case 'Seguir bajando':
          storyTitle.textContent = 'Seguir bajando';
          storyText.textContent = `
                Decides seguir bajando con cautela, asegurándote de que cada paso sea firme. 
                El aire se va volviendo más frío a medida que desciendes más profundo en el túnel, 
                pero no encuentras más obstáculos. El descenso continúa sin incidentes, y el ambiente 
                se vuelve más silencioso y sombrío con cada paso que das.
            `;

          updateDecisionButtons([
            'Seguir descendiendo hacia lo desconocido',
            'Desmayarte de la nada'
          ]);
          break;

        case 'Seguir descendiendo hacia lo desconocido':
          storyTitle.textContent = 'Seguir descendiendo hacia lo desconocido';
          storyText.textContent = `
                  Sigues descendiendo con cuidado, cada paso calculado para no hacer ruido. 
                  A medida que avanzas, la oscuridad se va desvaneciendo lentamente, y a lo lejos, 
                  logras ver una habitación iluminada. La luz es extraña y moderna, contrastando 
                  con la antigua apariencia del túnel. Te preguntas qué podría estar allí, 
                  pero no sabes si acercarte es lo más seguro.
              `;

          updateDecisionButtons([
            'Ir hacia la habitación iluminada',
            'Seguir explorando para buscar un lugar seguro'
          ]);
          break;

        case 'Ir hacia la habitación iluminada':
          storyTitle.textContent = 'Ir hacia la habitación iluminada';
          storyText.textContent = `
              Mientras avanzas hacia la habitación iluminada, un escalofrío recorre tu cuerpo. Al mirar hacia atrás, notas una sombra oscura y extraña que parece moverse a lo lejos. Al principio, parece estar quieta, pero de repente, comienza a moverse rápidamente hacia ti, corriendo a una velocidad aterradora.
          
              No sabes qué es, pero la sensación de peligro es inconfundible. La sombra está acercándose rápidamente y parece que no hay escapatoria.
          
              ¿Qué vas a hacer?
            `;

          updateDecisionButtons([
            'Prepararse para pelear',
            'Tratar de huir'
          ]);
          break;

        case 'Tratar de huir':
          storyTitle.textContent = 'Tratar de huir';
          storyText.textContent = `
              En un intento desesperado, giras sobre tus talones y comienzas a correr. Tus pasos resuenan en el pasillo mientras buscas frenéticamente un lugar donde esconderte o escapar. Sin embargo, a pesar de tu esfuerzo, no encuentras ninguna salida ni refugio. Las paredes parecen cerrarse a tu alrededor, y la sombra avanza rápidamente, cada vez más cerca. 
          
              En tu carrera, te das cuenta de que no hay ningún lugar donde puedas huir. El sonido de tus respiraciones aceleradas se mezcla con el ruido de la sombra que se acerca. Sin más opciones, te encuentras acorralado en un rincón oscuro, con la figura aterradora ya a solo unos metros de ti.
          
              La figura oscura se detiene, y tú te ves obligado a tomar una decisión. El miedo te paraliza, pero sabes que debes actuar rápido.
          
              ¿Qué harás?
            `;

          updateDecisionButtons([
            'Prepararse para la pelea',
            'Atacarlo de sorpresa'
          ]);
          break;

        case 'Desmayarte de la nada':
          storyTitle.textContent = 'Desmayarte de la nada';
          storyText.textContent = `
                A medida que sigues descendiendo, comienzas a sentirte extraño, como si una fuerte 
                debilidad te invadiera. El aire se vuelve más denso y tu visión se nubló. Antes de poder 
                reaccionar, pierdes el equilibrio y te desmayas, cayendo de forma incontrolada hacia abajo, 
                perdiendo la conciencia.
            `;

          const currentHP1 = parseInt(hpBar.style.width);
          hpBar.style.width = `${currentHP1 - 10}%`;

          updateDecisionButtons([
            'Intentar despertarse y seguir adelante',
            'Aprovechar el momento y descansar un poco'
          ]);
          break;

        case 'Volver arriba':
          storyTitle.textContent = 'Volver arriba';
          storyText.textContent = `
                Decides que es mejor regresar, así que empiezas a subir la escalera. Sin embargo, justo 
                cuando estás a punto de salir por la trampilla, algo inesperado sucede: alguien cierra 
                la trampilla violentamente. Tus brazos quedan atrapados, y el dolor es insoportable. 
                Sin poder liberarte, caes hacia tu muerte, mientras la vida se escapa de tu cuerpo.
            `;
          hpBar.style.width = '0%';

          updateDecisionButtons([
            'Reiniciar la historia'
          ]);
          break;

        case 'Reiniciar la historia':
          location.reload();
          break;


        case 'Cerrar la trampilla y explorar la casa':
          storyTitle.textContent = 'Cerrar la trampilla y explorar la casa';
          storyText.textContent = `
                        Algo te inquieta sobre la trampilla, decides cerrarla y seguir buscando. A medida que te 
                        adentras más en la casa, la sensación de ser observado no desaparece. Tal vez haya algo más 
                        que no has visto aún...
                    `;
          updateDecisionButtons([
            'Buscar en el piso superior',
            'Buscar en el sótano'
          ]);
          break;

        case 'Abrir la puerta lateral':
          storyTitle.textContent = 'Abrir la puerta lateral';
          storyText.textContent = `
                        Abres la puerta lateral lentamente. La oscuridad detrás de ella es densa, pero una brisa fría 
                        te golpea el rostro. Podría ser una salida al exterior, pero el crujido de ramas cercanas 
                        te hace pensar que no estás solo. ¿Sales o te repliegas?
                    `;
          updateDecisionButtons([
            'Salir por la puerta',
            'Replegarse y buscar más'
          ]);
          break;

        case 'Seguir explorando la casa':
          storyTitle.textContent = 'Seguir explorando la casa';
          storyText.textContent = `
                        Decides no abrir la puerta lateral y continúas explorando. A medida que te adentras más en 
                        la casa, el silencio se vuelve cada vez más pesado, como si algo estuviera esperando el 
                        momento adecuado para actuar...
                    `;
          updateDecisionButtons([
            'Buscar en el comedor',
            'Buscar en el dormitorio'
          ]);
          break;

      }
    });
  });
});