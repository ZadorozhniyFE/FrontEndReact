// src/components/GameOverlay.tsx
import { motion } from 'motion/react';

interface GameOverlayProps {
  status: 'won' | 'lost';
  onRestart: () => void;
}

export const GameOverlay = ({ status, onRestart }: GameOverlayProps) => {
  const isWin = status === 'won';

  return (
    <motion.div 
      className="game-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div 
        className="overlay-content"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <h2>{isWin ? 'Победа!' : 'Game Over'}</h2>
        <p>{isWin ? 'Вы собрали 2048!' : 'Больше нет доступных ходов.'}</p>
        <button className="new-game-btn" onClick={onRestart}>
          Начать заново
        </button>
      </motion.div>
    </motion.div>
  );
};