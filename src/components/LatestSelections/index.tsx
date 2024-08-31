import { FC } from 'react';
import { ILatestSelectionsProps } from './types';

const LatestSelections: FC<ILatestSelectionsProps> = ({ data, resetHandler }) => {

  return (
    <section className="mt-3">
      <div className='flex items-center justify-between gap-5 mb-3'>
        <h2 className='text-2xl font-medium mb-3'>Latest Selections</h2>

        <button className='px-6 py-2 rounded-lg border' onClick={resetHandler}>Clear</button>
      </div>

      <div>
        {data.map(({ id, hex }) => (
          <div
            key={id}
            className="flex items-center justify-between mb-1"
          >
            <span>{ hex }</span>
            <span style={{ backgroundColor: hex,  }} className='w-5 h-5 rounded-lg' />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestSelections;
