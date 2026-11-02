// src/hooks/useGame.ts
import { useState, useEffect, useCallback } from 'react';
import type { GameState, Direction, Tile } from '../types';
import { move, spawnTile, createEmptyBoard } from '../utils/gameLogic';

const tilesToBoard = (tiles: Tile[]): (Tile | null)[][] => {
  const board = createEmptyBoard();
  tiles.forEach(tile => {
    board[tile.row][tile.col] = tile;
  });
  return board;
};

const canMove = (tiles: Tile[]): boolean => {
  if (tiles.length < 16) return true;
  const board = tilesToBoard(tiles);
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (c < 3 && board[r][c]?.value === board[r][c + 1]?.value) return true;
      if (r < 3 && board[r][c]?.value === board[r + 1][c]?.value) return true;
    }
  }
  return false;
};

export const useGame = () => {
  const [state, setState] = useState<GameState>(() => {
    let board = createEmptyBoard();
    
    // Спавним две плитки
    const tile1 = spawnTile(board);
    if (tile1) board[tile1.row][tile1.col] = tile1;
    
    const tile2 = spawnTile(board);
    if (tile2) board[tile2.row][tile2.col] = tile2;

    return {
      tiles: board.flat().filter((t): t is Tile => t !== null),
      score: 0,
      bestScore: Number(localStorage.getItem('2048-bestScore')) || 0,
      status: 'playing',
    };
  });

  useEffect(() => {
    if (state.score > state.bestScore) {
      localStorage.setItem('2048-bestScore', String(state.score));
    }
  }, [state.score, state.bestScore]);

  const handleMove = useCallback((direction: Direction) => {
    setState(prev => {
      if (prev.status !== 'playing') return prev;

      const currentBoard = tilesToBoard(prev.tiles);
      const { newBoard, scoreGained, moved } = move(currentBoard, direction);

      if (!moved) return prev;

      const newTile = spawnTile(newBoard);
      if (newTile) newBoard[newTile.row][newTile.col] = newTile;

      const newTiles = newBoard.flat().filter((t): t is Tile => t !== null);
      
      let newStatus: 'playing' | 'won' | 'lost' = prev.status;
      if (newTiles.some(t => t.value === 2048) && prev.status === 'playing') {
        newStatus = 'won';
      } else if (!canMove(newTiles)) {
        newStatus = 'lost';
      }

      const newScore = prev.score + scoreGained;
      const newBestScore = Math.max(prev.bestScore, newScore);

      return {
        tiles: newTiles,
        score: newScore,
        bestScore: newBestScore,
        status: newStatus,
      };
    });
  }, []);

  const newGame = useCallback(() => {
    let board = createEmptyBoard();
    const tile1 = spawnTile(board);
    if (tile1) board[tile1.row][tile1.col] = tile1;
    
    const tile2 = spawnTile(board);
    if (tile2) board[tile2.row][tile2.col] = tile2;
    
    const initialTiles = board.flat().filter((t): t is Tile => t !== null);

    setState(prev => ({
      tiles: initialTiles,
      score: 0,
      bestScore: prev.bestScore,
      status: 'playing',
    }));
  }, []);

  return { state, handleMove, newGame };
};