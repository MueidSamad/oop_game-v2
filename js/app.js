document.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.getElementById('btn__reset');
    let game;

    resetButton.addEventListener('click', () => {
        if (game) {
            game.resetGame(); // Reset the gameboard
        }
        game = new Game(); // Create a new Game instance
        game.startGame(); // Start the new game
    });

    const qwerty = document.getElementById('qwerty');
    qwerty.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const letter = event.target.textContent; // Get the letter from button
            game.handleInteraction(letter); // Handle the interaction
        }
    });
});
