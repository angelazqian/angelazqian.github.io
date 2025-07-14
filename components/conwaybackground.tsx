import { useEffect, useRef } from 'react';

export default function ConwayBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = 8;
    const rows = Math.floor(window.innerHeight / cellSize);
    const cols = Math.floor(window.innerWidth / cellSize);
    let grid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => Math.round(Math.random())));

    canvas.width = cols * cellSize;
    canvas.height = rows * cellSize;

    const draw = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#444444';
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (grid[y][x]) {
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
          }
        }
      }
    };

    const update = () => {
      const newGrid = grid.map((row, y) =>
        row.map((cell, x) => {
          const neighbors = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],         [0, 1],
            [1, -1], [1, 0], [1, 1],
          ];
          let liveCount = 0;
          for (const [dy, dx] of neighbors) {
            const ny = y + dy;
            const nx = x + dx;
            if (ny >= 0 && ny < rows && nx >= 0 && nx < cols) {
              liveCount += grid[ny][nx];
            }
          }
          if (cell === 1 && (liveCount === 2 || liveCount === 3)) return 1;
          if (cell === 0 && liveCount === 3) return 1;
          return 0;
        })
      );
      grid = newGrid;
    };

    const interval = setInterval(() => {
      update();
      draw();
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen -z-10"
    />
  );
}