import { FC } from 'react';
import FloatingBox from '@/components/FloatingBox';
import ToolIcon from '@/components/ToolIcon';
import LatestSelections from '@/components/LatestSelections';
import { useColorPicker } from '@/hooks/useColorPicker';
import { ColorPickerPropsInterface } from './types';
import { ELEMENT_WIDTH, ELEMENT_HEIGHT } from '@/utils/constants';
import KeyboardHintSection from '../KeyboardHintSection';

const ColorPicker: FC<ColorPickerPropsInterface> = ({ img, pixelsCount }) => {
  const {
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
  } = useColorPicker(img, pixelsCount);

  return (
    <div className="flex flex-col justify-center items-center">
      <article>
        <p className="picker-text font-bold text-4xl mt-6 mb-12">Touch the pen and get your HEX!</p>
      </article>

      <div className="w-full flex justify-center gap-12 max-h-[500px]">
        <div className="relative flex flex-col">
          { 
          isSelector && (
            <FloatingBox
              count={pixelsCount}
              color={color}
              position={selectPosition}
              data={data}
            />
          )}

          <canvas
            onMouseMove={handleMousemove}
            ref={canvasRef}
            width={ELEMENT_WIDTH}
            height={ELEMENT_HEIGHT}
            className='rounded-lg cursor-pointer'
          />
        </div>

        <section className='overflow-auto p-3 border-dashed border-2 rounded-lg no-scrollbar mb-3'>
          <div className='flex justify-between mb-5 gap-3'>
            <ToolIcon
              tool="cursor"
              selectedTool={selectedTool}
              handleToolClick={handleToolClick}
            />
            <ToolIcon
              tool="picker"
              selectedTool={selectedTool}
              handleToolClick={handleToolClick}
            />
          </div>

          <hr />
          <KeyboardHintSection />
          <hr />

          <LatestSelections data={selections} resetHandler={clearSelections} />
        </section>
      </div>
    </div>
  );
};

export default ColorPicker;
