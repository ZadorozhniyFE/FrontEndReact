// src/components/Header.tsx
interface HeaderProps {
  score: number;
  bestScore: number;
  onNewGame: () => void;
}

export const Header = ({ score, bestScore, onNewGame }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header-title">
        <h1>2048</h1>
      </div>
      
      <div className="header-scores">
        <div className="score-box">
          <span className="score-label">СЧЕТ</span>
          <span className="score-value">{score}</span>
        </div>
        <div className="score-box">
          <span className="score-label">РЕКОРД</span>
          <span className="score-value">{bestScore}</span>
        </div>
      </div>
      
      <div className="header-controls">
        <button className="new-game-btn" onClick={onNewGame}>
          Новая игра
        </button>
      </div>
    </header>
  );
};