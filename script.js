const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const resultElement = document.getElementById('result');
const playerChoiceInfo = document.getElementById('player-choice-icon');
const computerChoiceInfo = document.getElementById('computer-choice-icon');
const gameContainer = document.querySelector('.game-container');
const retryButton = document.getElementById('retry-btn');
let playerScore = 0;
let computerScore = 0;
let roundCount = 0;
const maxRounds = 10;

const choices = {
    'rock': 'Batu',
    'paper': 'Kertas',
    'scissors': 'Gunting'
};

const buttons = document.querySelectorAll('.choice');
buttons.forEach(button => {
    button.addEventListener('click', function () {
        if (roundCount < maxRounds) {
            const playerChoice = this.getAttribute('data-choice');
            const computerChoice = getComputerChoice();
            const winner = getWinner(playerChoice, computerChoice);

            playerChoiceInfo.innerHTML = `<i class="fas fa-hand-${playerChoice}"></i>`;
            computerChoiceInfo.innerHTML = `<i class="fas fa-hand-${computerChoice}"></i>`;

            updateScore(winner);
            showResult(winner, playerChoice, computerChoice);

            roundCount++;

            if (roundCount === maxRounds) {
                showFinalResult();
            }
        }
    });
});

function showFinalResult() {
    if (playerScore > computerScore) {
        resultElement.textContent = `Selamat! Kamu menang permainan ini dengan skor ${playerScore} - ${computerScore}!`;
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    } else if (playerScore < computerScore) {
        resultElement.textContent = `Kamu kalah! Komputer menang dengan skor ${computerScore} - ${playerScore}.`;
        gameContainer.classList.add('flash-red');
        setTimeout(() => {
            gameContainer.classList.remove('flash-red');
        }, 500);
    } else {
        resultElement.textContent = `Seri! Skor akhir ${playerScore} - ${computerScore}.`;
    }

    buttons.forEach(button => button.disabled = true);
    retryButton.style.display = 'block';
    playerChoiceInfo.style.display = 'none';
    computerChoiceInfo.style.display = 'none';
}

retryButton.addEventListener('click', function () {
    playerScore = 0;
    computerScore = 0;
    roundCount = 0;
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
    resultElement.textContent = '';
    playerChoiceInfo.innerHTML = '';
    computerChoiceInfo.innerHTML = '';
    playerChoiceInfo.style.display = 'block';
    computerChoiceInfo.style.display = 'block';

    buttons.forEach(button => button.disabled = false);
    retryButton.style.display = 'none';
});

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function getWinner(player, computer) {
    if (player === computer) return 'draw';
    if ((player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')) {
        return 'player';
    }
    return 'computer';
}

function updateScore(winner) {
    if (winner === 'player') {
        playerScore++;
        playerScoreElement.textContent = playerScore;
    } else if (winner === 'computer') {
        computerScore++;
        computerScoreElement.textContent = computerScore;
    }
}

function showResult(winner, playerChoice, computerChoice) {
    if (winner === 'draw') {
        resultElement.textContent = `Seri! Pilihan kamu dan komputer sama.`;
    } else if (winner === 'player') {
        resultElement.textContent = `Kamu menang! ${choices[playerChoice]} mengalahkan ${choices[computerChoice]}.`;
        
        // Tambahkan efek confetti setiap kali pemain menang
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    } else {
        resultElement.textContent = `Kamu kalah! ${choices[computerChoice]} mengalahkan ${choices[playerChoice]}.`;

        // Tambahkan efek flash-red setiap kali pemain kalah
        gameContainer.classList.add('flash-red');
        setTimeout(() => {
            gameContainer.classList.remove('flash-red');
        }, 500);
    }
}

