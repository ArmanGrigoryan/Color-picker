import { useEffect, useRef, useState } from 'react';
import { calculateAllPositions, rgbToHex } from '@/utils/helpers';
import {
  ELEMENT_WIDTH,
  ELEMENT_HEIGHT,
  POSITION_OFFSET,
  DEFAULT_POSITION,
} from '@/utils/constants';
import { SelectPositionInterface } from '@/components/ColorPicker/types';

type TSelectionItem = { id: number; hex: string; }

export const useColorPicker = (img: string, pixelsCount: number) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [data, setData] = useState<number[]>([]);
  const [color, setColor] = useState<string>('#000000');
  const [selectPosition, setSelectPosition] = useState<SelectPositionInterface>(DEFAULT_POSITION);
  const [isSelector, setIsSelector] = useState<boolean>(false);
  const [selectedTool, setSelectedTool] = useState<'cursor' | 'picker'>('cursor');
  const [activeImage, setActiveImage] = useState<HTMLImageElement | null>(null);
  const [selections, setSelections] = useState<Array<TSelectionItem>>([]);

  const positionRef = useRef<{
    x: number;
    y: number;
    SX: number;
    SY: number;
  }>({
    x: 0,
    y: 0,
    SX: 0,
    SY: 0,
  });

  const handleMousemove = (evt: React.MouseEvent<HTMLCanvasElement>) => {
      if (!activeImage || !isSelector) return;

      const rect = evt.currentTarget.getBoundingClientRect();
      const x = evt.clientX - rect.left;
      const y = evt.clientY - rect.top;

      const context = evt.currentTarget.getContext('2d');
      if (!context) return;

      const pixelData = context.getImageData(x, y, 1, 1).data;
      const hex = `#${rgbToHex(
        pixelData[0],
        pixelData[1],
        pixelData[2]
      ).padStart(6, '0')}`;
      setColor(hex);

      const { startPosition } = calculateAllPositions(x, y, pixelsCount);
      const { x: SX, y: SY } = startPosition;
      const imageData = context.getImageData(
        SX,
        SY,
        pixelsCount,
        pixelsCount
      ).data;
      setData(Array.from(imageData));
      setSelectPosition({
        top: y - POSITION_OFFSET,
        left: x - POSITION_OFFSET,
      });

      positionRef.current = { x, y, SX, SY };
    };

  const handleKeyDown = (evt: KeyboardEvent) => {
    if (evt.code === 'Space') {
      setIsSelector(true);
      setSelectedTool('picker');
    } else if (evt.code === 'Escape') {
      setIsSelector(false);
      setSelectedTool('cursor');
    } else if (evt.code === 'Enter') {
      setIsSelector(false);
      setSelectedTool('cursor');

      addNewSelection();
    }
  };

  const handleCursorClick = () => handleToolClick("cursor");

  const handleToolClick = (tool: 'cursor' | 'picker') => {
    if (isSelector && tool === 'cursor') addNewSelection();

    setIsSelector(tool === 'picker');
    setSelectedTool(tool);
  };

  const addNewSelection = () => setSelections(prevState => ([
    ...prevState,
    {
      id: prevState.length + 1,
      hex: color
    }
  ]));

  const clearSelections = () => selections.length > 0 && setSelections([]);

  useEffect(() => {
    const loadImg = new Image();
    loadImg.src = img;
    loadImg.onload = () => setActiveImage(loadImg);
  }, [img]);

  useEffect(() => {
    if (activeImage && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context?.drawImage(activeImage, 0, 0, ELEMENT_WIDTH, ELEMENT_HEIGHT);
    }
  }, [activeImage]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (canvasRef.current) canvasRef.current.addEventListener('click', handleCursorClick);

    return () => {
      if (canvasRef.current) canvasRef.current.removeEventListener('keydown', handleCursorClick);
    }
  }, []);

  return {
    data,
    color,
    canvasRef,
    isSelector,
    selectedTool,
    selections,
    selectPosition,
    handleMousemove,
    handleToolClick,
    clearSelections,
  };
};
