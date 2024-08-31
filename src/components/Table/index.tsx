import { FC } from 'react';
import { rgbToHex } from '@/utils/helpers';
import { ITableProps } from './types';

const Table: FC<ITableProps> = ({ row, col, data }: ITableProps) => {
  return (
    <table className="w-full h-full p-0 m-0 border-spacing-0">
      <tbody>
        {[...Array(row)].map((_, y) => {
          return (
            <tr key={`key-${y}`} className="p-0 m-0">
              {[...Array(col)].map((_, x) => {
                const hex =
                  '#' +
                  (
                    '000000' +
                    rgbToHex(
                      data[(y * col + x) * 4],
                      data[(y * col + x) * 4 + 1],
                      data[(y * col + x) * 4 + 2]
                    )
                  ).slice(-6);
                return (
                  <td
                    key={`key-${y}-${x}`}
                    style={{
                      outline: y === Math.trunc(row / 2) && x === Math.trunc(col / 2) ?
                        "0.05px solid white" :
                        "0.01px solid rgba(0, 0, 0, .1)",
                        background: hex,
                      }}
                    className="p-0 m-0"
                  />
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
