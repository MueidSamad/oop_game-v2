class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase(); // Store the phrase in lowercase
    }

    // Method to add phrase to display
    addPhraseToDisplay() {
        const phraseUl = document.querySelector('#phrase ul');
        this.phrase.split('').forEach(char => {
            const li = document.createElement('li');
            if (char === ' ') {
                li.className = 'space'; // Class for spaces
                li.textContent = ' '; // Display space
            } else {
                li.className = `hide letter ${char}`; // Class for letters
                li.textContent = char; // Display letter
            }
            phraseUl.appendChild(li); // Add to the phrase display
        });
    }

    // Method to check if letter is in the phrase
    checkLetter(letter) {
        return this.phrase.includes(letter);
    }

    // Method to show matched letters
    showMatchedLetter(letter) {
        console.log(`Matching letters for: ${letter}`);
        const matchedLetters = document.querySelectorAll(`.letter.${letter}`);
        console.log(`Matched letters found: ${matchedLetters.length}`);
        matchedLetters.forEach(letterElement => {
            letterElement.classList.remove('hide'); // Reveal the letter
            letterElement.classList.add('show'); // Show class for styling
        });
    }
}
