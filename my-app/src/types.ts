// src/types.ts

// Направления движения
export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

// Одна плитка на поле
export interface Tile {
  id: number;      // Уникальный ID нужен для анимаций, чтобы React не "путал" плитки при движении
  value: number;   // Номинал (2, 4, 8, 16...)
  row: number;     // Позиция по вертикали (от 0 до 3)
  col: number;     // Позиция по горизонтали (от 0 до 3)
  isNew?: boolean; // Флаг: плитка только что появилась (для анимации)
  isMerged?: boolean; // Флаг: плитка получилась в результате слияния (для анимации)
}

// Общее состояние игры
export interface GameState {
  tiles: Tile[];
  score: number;
  bestScore: number;
  status: 'playing' | 'won' | 'lost';
}