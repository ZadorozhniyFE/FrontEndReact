// src/components/Tile.tsx
import { motion } from 'motion/react';
import type { Tile as TileType } from '../types';

interface TileProps {
  tile: TileType;
}

export const Tile = ({ tile }: TileProps) => {
  const valueClass = tile.value <= 2048 ? `tile-${tile.value}` : 'tile-super';

  return (
    <motion.div
      layout // Плавно перемещает плитку при изменении gridRow/gridColumn
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`tile ${valueClass}`}
      style={{
        gridRow: tile.row + 1,
        gridColumn: tile.col + 1,
        zIndex: tile.isMerged ? 10 : 1,
      }}
    >
      {tile.value}
    </motion.div>
  );
};