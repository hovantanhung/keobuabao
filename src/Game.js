import React, { useState } from 'react';

const options = ['Kéo', 'Búa', 'Bao'];

const Game = () => {
  const [userChoice, setUserChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');

  const playGame = (choice) => {
    setUserChoice(choice);
    const randomChoice = options[Math.floor(Math.random() * options.length)];
    setComputerChoice(randomChoice);
    determineWinner(choice, randomChoice);
  };

  const determineWinner = (user, computer) => {
    if (user === computer) {
      setResult('Hòa!');
    } else if (
      (user === 'Kéo' && computer === 'Búa') ||
      (user === 'Búa' && computer === 'Bao') ||
      (user === 'Bao' && computer === 'Kéo')
    ) {
      setResult('Bạn thua!');
    } else {
      setResult('Bạn thắng!');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Kéo Búa Bao</h1>
      <div>
        {options.map((option) => (
          <button key={option} onClick={() => playGame(option)}>
            {option}
          </button>
        ))}
      </div>
      {userChoice && <h2>Bạn đã chọn: {userChoice}</h2>}
      {computerChoice && <h2>Máy đã chọn: {computerChoice}</h2>}
      {result && <h2>Kết quả: {result}</h2>}
    </div>
  );
};

export default Game;
