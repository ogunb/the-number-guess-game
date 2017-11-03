	var randomNumber = Math.floor(Math.random() * 100) + 1;

	var guesses = document.querySelector('#guesses');
	var lastResult = document.querySelector('#lastResult');
	var lowOrHi = document.querySelector('#lowOrHi');
	var expl = document.getElementById("expl");
	var body = document.body
	var yourGuesses = document.querySelector(".yourGuesses");

	var guessSubmit = document.querySelector('.guessSubmit');
	var guessField = document.querySelector('.guessField');

	var guessCount = 1;
	var resetButton;
	guessField.focus();

	function checkGuess(){
		var userGuess = Number(guessField.value);
		expl.style.display = "none";

		if (guessCount === 1){
			yourGuesses.textContent = "Your guesses so far: "
			guesses.textContent = '';
		}
		guesses.textContent += userGuess + ' ';

		if (guessCount === 1 && userGuess === randomNumber){
	 		lastResult.innerHTML = '<img src="assets/img/wow.svg">'
			body.style.backgroundColor = "#c948ff";
			lowOrHi.innerHTML = "WHAT?! HOW?!"+"<br/>"+"HOW DID YOU DO IT?!"+"<br/>"+"WHAT KIND OF SORCERY IS THIS?!";
			setGameOver();
		}	else if (guessCount === 10) {
				lastResult.innerHTML = '<img src="assets/img/sad.svg">'
				body.style.backgroundColor = "#f86a6a";
				lowOrHi.innerHTML = "You tried 10 times and failed."+"<br/>"+"You made me sad...";
		    	setGameOver();
	 		} else if (userGuess === randomNumber){
	 				lastResult.innerHTML = '<img src="assets/img/gj.svg">'
					body.style.backgroundColor = "#6af874";
					lowOrHi.innerHTML = "YES! That is the right answer!"+"<br/>"+"Good job my friend!";
					setGameOver();
	 		}	else{
		 			lastResult.innerHTML = '<img src="assets/img/sad.svg">'
					body.style.backgroundColor = "#f86a6a";
					lowOrHi.innerHTML  = "Oh, thats not the right answer."+"<br/>";
					if(userGuess < randomNumber) {
				      lowOrHi.insertAdjacentHTML('beforeend', 'You gotta guess <span style="font-weight: 700;">higher!</span>')
				   } else if(userGuess > randomNumber) {
				   	lowOrHi.insertAdjacentHTML('beforeend', 'You gotta guess <span style="font-weight: 700;">lower!</span>')
			   	}
	 			}

		guessCount++;
		guessField.value = '';
		guessField.focus();
	}

	guessSubmit.addEventListener('click', checkGuess);
	guessField.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13 && guessCount < 10 ) { 
    	checkGuess();
    }
    else if (guessCount === 10){
    	setGameOver();
    	guessField.removeEventListener('keypress');
    }
  });

	function setGameOver() {
	  guessField.disabled = true;
	  guessSubmit.disabled = true;
	  guessSubmit.style.backgroundColor = "#c6c6c6";
	  resetButton = document.createElement('button');
	  resetButton.textContent = 'start new game';
	  document.querySelector(".wrapper").appendChild(resetButton);
	  resetButton.addEventListener('click', resetGame);
	}

	function resetGame() {
	  guessCount = 1;
	  resetButton.parentNode.removeChild(resetButton);

	  guessField.disabled = false;
	  guessSubmit.disabled = false;
	  guessSubmit.style.backgroundColor = "#000";
	  guessField.value = '';
	  guessField.focus();
	  expl.style.display = "block";
	  body.style.backgroundColor = '#f7f7f7';
	  lowOrHi.textContent = "";
	  guesses.textContent = "";
	  yourGuesses.textContent = ""

	  lastResult.innerHTML = '<img src="assets/img/normal.svg"/>'

	  randomNumber = Math.floor(Math.random() * 100) + 1;
	}
