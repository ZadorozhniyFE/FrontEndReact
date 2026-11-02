// src/utils/gameLogic.ts
import type { Tile, Direction } from '../types';

// Создать пустое поле 4x4 (массив 4 строк по 4 элемента)
export const createEmptyBoard = (): (Tile | null)[][] => {
  return Array(4).fill(null).map(() => Array(4).fill(null));
};

// Найти все пустые клетки на поле
export const getEmptyCells = (board: (Tile | null)[][]): { row: number; col: number }[] => {
  const cells: { row: number; col: number }[] = [];
  board.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (!cell) cells.push({ row: r, col: c });
    });
  });
  return cells;
};

// Создать новую плитку (2 или 4) в случайном пустом месте
export const spawnTile = (board: (Tile | null)[][]): Tile | null => {
  const emptyCells = getEmptyCells(board);
  if (emptyCells.length === 0) return null;

  const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const value = Math.random() < 0.9 ? 2 : 4; // 90% шанс на 2, 10% на 4

  return {
    id: Math.random(),// Уникальный ID
    value,
    row,
    col,
    isNew: true,
  };
};

// Вспомогательная функция: берет массив плиток (или null) длиной 4 и сдвигает их влево
const slideAndMergeLine = (line: (Tile | null)[]): { newLine: (Tile | null)[]; scoreGained: number } => {
  // 1. Убираем пустоты
  let tiles = line.filter((tile): tile is Tile => tile !== null);
  let scoreGained = 0;

  // 2. Проходимся и сливаем одинаковые
  for (let i = 0; i < tiles.length - 1; i++) {
    if (tiles[i].value === tiles[i + 1].value) {
      // Сливаем: увеличиваем значение текущей, удаляем следующую
      tiles[i] = { ...tiles[i], value: tiles[i].value * 2, isMerged: true };
      scoreGained += tiles[i].value;
      tiles.splice(i + 1, 1); // Удаляем поглощенную плитку
    }
  }

  // 3. Добиваем пустоты (null) до длины 4
  const newLine: (Tile | null)[] = [...tiles];
  while (newLine.length < 4) {
    newLine.push(null);
  }

  return { newLine, scoreGained };
};

// Главная функция хода. Принимает текущее поле и направление.
export const move = (
  board: (Tile | null)[][],
  direction: Direction
): { newBoard: (Tile | null)[][]; scoreGained: number; moved: boolean } => {
  let newBoard = createEmptyBoard();
  let scoreGained = 0;
  let moved = false;

  // Для каждого направления мы по-разному читаем и записываем линии.
  // Чтобы не писать 4 разных алгоритма, мы "поворачиваем" логику.
  
  for (let i = 0; i < 4; i++) {
    // Извлекаем линию в зависимости от направления
    let line: (Tile | null)[] = [];
    if (direction === 'LEFT') line = [board[i][0], board[i][1], board[i][2], board[i][3]];
    if (direction === 'RIGHT') line = [board[i][3], board[i][2], board[i][1], board[i][0]];
    if (direction === 'UP') line = [board[0][i], board[1][i], board[2][i], board[3][i]];
    if (direction === 'DOWN') line = [board[3][i], board[2][i], board[1][i], board[0][i]];

    // Сдвигаем и сливаем
    const { newLine, scoreGained: lineScore } = slideAndMergeLine(line);
    scoreGained += lineScore;

    // Проверяем, изменилось ли что-то (для понимания, был ли ход)
    if (JSON.stringify(line) !== JSON.stringify(newLine)) {
      moved = true;
    }

    // Записываем результат обратно в поле с учетом направления
    for (let j = 0; j < 4; j++) {
      if (newLine[j]) {
        // Обновляем координаты плитки, так как она могла сдвинуться
        const tile = newLine[j]!;
        if (direction === 'LEFT') newBoard[i][j] = { ...tile, row: i, col: j };
        if (direction === 'RIGHT') newBoard[i][3 - j] = { ...tile, row: i, col: 3 - j };
        if (direction === 'UP') newBoard[j][i] = { ...tile, row: j, col: i };
        if (direction === 'DOWN') newBoard[3 - j][i] = { ...tile, row: 3 - j, col: i };
      }
    }
  }

  return { newBoard, scoreGained, moved };
};