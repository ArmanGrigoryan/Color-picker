import { FC } from 'react';

const KeyboardHintSection: FC = () => {

  return (
    <>
      <h2 className='text-2xl my-3 font-semibold'>KeyBoard actions:</h2>

      <div className='flex flex-col gap-2 my-3'>
        <article className="flex items-center justify-between gap-5 &>*:[text-base]">
          <strong>Space {"->"}</strong>
          <span>Open the preview</span>
        </article>
        <article className="flex items-center justify-between gap-5 &>*:[text-base]">
          <strong>Escape {"->"}</strong>
          <span>Close the preview</span>
        </article>
        <article className="flex items-center justify-between gap-5 &>*:[text-base]">
          <strong>Enter {"->"}</strong>
          <span>Save into list and close</span>
        </article>
      </div>
    </>
  );
};

export default KeyboardHintSection;