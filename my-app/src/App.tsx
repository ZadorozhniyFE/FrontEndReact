// src/App.tsx
import { useEffect } from 'react';
import { useGame } from './hooks/useGame';
import { Header } from './components/Header';
import { Board } from './components/Board';
import { GameOverlay } from './components/GameOverlay';
import type { Direction } from './types';
import './App.css';

function App() {
  const { state, handleMove, newGame } = useGame();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyMap: Record<string, Direction> = {
        ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT',
        w: 'UP', W: 'UP', ц: 'UP', Ц: 'UP',
        s: 'DOWN', S: 'DOWN', ы: 'DOWN', Ы: 'DOWN',
        a: 'LEFT', A: 'LEFT', ф: 'LEFT', Ф: 'LEFT',
        d: 'RIGHT', D: 'RIGHT', в: 'RIGHT', В: 'RIGHT',
      };

      const direction = keyMap[e.key];
      if (direction) {
        e.preventDefault();
        handleMove(direction);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove]);

  return (
    <div className="app-wrapper">
      <div className="game-container">
        <Header score={state.score} bestScore={state.bestScore} onNewGame={newGame} />
        
        <div className="board-area">
          <Board tiles={state.tiles} />
          
          {(state.status === 'won' || state.status === 'lost') && (
            <GameOverlay status={state.status} onRestart={newGame} />
          )}
        </div>
        
        <div className="instructions">
          <p>Используйте <strong>стрелки</strong> или <strong>W A S D</strong> для управления.</p>
        </div>
      </div>
    </div>
  );
}

export default App;