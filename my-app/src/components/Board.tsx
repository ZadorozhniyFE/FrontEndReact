// src/components/Board.tsx
import { AnimatePresence } from 'motion/react';
import type { Tile as TileType } from '../types';
import { Tile } from './Tile';

interface BoardProps {
  tiles: TileType[];
}

export const Board = ({ tiles }: BoardProps) => {
  return (
    <div className="board">
      {/* Фоновые клетки (всегда 16 штук) */}
      {Array(16).fill(null).map((_, i) => (
        <div key={`bg-${i}`} className="cell-bg" />
      ))}

      {/* Плитки */}
      <AnimatePresence>
        {tiles.map((tile) => (
          <Tile key={tile.id} tile={tile} />
        ))}
      </AnimatePresence>
    </div>
  );
};