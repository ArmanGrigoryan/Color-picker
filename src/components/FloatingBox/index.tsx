import { FC } from 'react';
import Table from '@/components/Table/index';
import { IFloatingBoxProps } from './types';

const FloatingBox: FC<IFloatingBoxProps> = ({
  data,
  count,
  color,
  position,
}: IFloatingBoxProps) => {
  return (
    <span
      style={{
        ...position,
        outline: `4px solid ${color}`,
      }}
      className="absolute pointer-events-none top-5 left-5 w-[100px] h-[100px] outline outline-[4px] rounded-full overflow-hidden"
    >
      <span className="w-[60px] h-5 bottom-[60px] left-[50%] translate-x-[-50%] absolute text-[10px] bg-black text-white font-bold rounded-lg text-center pt-0.5">{color}</span>
    
      <Table row={count} col={count} data={data} />
    </span>
  );
};

export default FloatingBox;