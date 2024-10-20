class Game {
    constructor() {
        this.missed = 0; // Track missed guesses
        this.phrases = [
            new Phrase("how are you"),
            new Phrase("hello world"),
            new Phrase("phrase hunter"),
            new Phrase("game over"),
            new Phrase("keep guessing")
        ];
        this.activePhrase = null; // Current active phrase
    }

    // Method to start the game
    startGame() {
        this.resetGame(); // Reset any previous game state
        document.getElementById('overlay').style.display = 'none'; // Hide start screen
        this.activePhrase = this.getRandomPhrase(); // Get a random phrase
        this.activePhrase.addPhraseToDisplay(); // Display the phrase
    }

    // Method to get a random phrase
    getRandomPhrase() {
        const randomIndex = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomIndex];
    }

    // Method to handle user interactions
    handleInteraction(letter) {
        //const button = document.querySelector(`button:contains(${letter})`);
        const button = Array.from(document.querySelectorAll('button.key'))
            .find(btn => btn.textContent === letter);
        //button.disabled = true; // Disable button on click

        if (!this.activePhrase.checkLetter(letter)) {
            button.classList.add('wrong'); // Incorrect guess
            this.removeLife(); // Remove life
        } else {
            button.classList.add('chosen'); // Correct guess
            this.activePhrase.showMatchedLetter(letter); // Show matched letters
            this.checkForWin(); // Check for win
        }
    }

    // Method to remove life from scoreboard
    removeLife() {
        const hearts = document.querySelectorAll('#scoreboard .tries img');
        hearts[this.missed].src = 'images/lostHeart.png'; // Change heart image
        this.missed++; // Increment missed count

        if (this.missed === 5) {
            this.gameOver(false); // Game over
        }
    }

    // Method to check for win condition
    checkForWin() {
        const letters = document.querySelectorAll('#phrase .letter');
        const shownLetters = document.querySelectorAll('.show');
        if (letters.length === shownLetters.length) {
            this.gameOver(true); // Player wins
        }
    }

    // Method to handle game over scenario
    gameOver(didWin) {
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'flex'; // Show overlay
        const message = document.getElementById('game-over-message');
        message.textContent = didWin ? 'Congratulations! You won!' : 'Game Over! Better luck next time!';
        overlay.classList.remove('start');
        overlay.classList.add(didWin ? 'win' : 'lose');
    }

    // Method to reset the gameboard
    resetGame() {
        // Clear the previous phrase
        const phraseUl = document.querySelector('#phrase ul');
        while (phraseUl.firstChild) {
            phraseUl.removeChild(phraseUl.firstChild); // Clear the phrase display
        }

        // Reset keyboard buttons
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => {
            key.classList.remove('chosen', 'wrong'); // Reset button classes
            key.disabled = false; // Enable buttons
        });

        // Reset hearts to live
        const hearts = document.querySelectorAll('#scoreboard .tries img');
        hearts.forEach(heart => {
            heart.src = 'images/liveHeart.png'; // Reset hearts
        });

        this.missed = 0; // Reset missed guesses
    }
}
