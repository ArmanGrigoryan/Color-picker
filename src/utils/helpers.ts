export const rgbToHex = (r: number, g: number, b: number): string => {
  return ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
};

export const calculateAllPositions = (x: number, y: number, pixelsCount: number) => {
  const startPosition = {
    x: x - Math.floor(pixelsCount / 2),
    y: y - Math.floor(pixelsCount / 2),
  };

  return {
    startPosition,
  };
};