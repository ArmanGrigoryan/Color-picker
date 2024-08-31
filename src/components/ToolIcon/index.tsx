import { FC } from 'react';
import { IToolIconProps } from './types';
import Cursor from "@/assets/cursor.svg"; 
import FilledCursor from "@/assets/cursorSelected.svg"; 
import Picker from "@/assets/IconColorPicker.svg"; 
import FilledPicker from "@/assets/IconColorPickerSelected.svg"; 

const ToolIcon: FC<IToolIconProps> = ({
  tool,
  selectedTool,
  handleToolClick,
}) => {
  const src = (tool === 'cursor') ?
    (selectedTool === 'cursor') ?
    FilledCursor :
      Cursor :
        (selectedTool === 'picker') ?
          FilledPicker :
            Picker

  return (
    <span 
      className='p-4 cursor-pointer border-[2px] rounded-full hover:ring inline-flex w-half'
      onClick={() => handleToolClick(tool)}
    >
      <img
        alt={tool}
        src={src}
      />
    </span>
  );
};

export default ToolIcon;
