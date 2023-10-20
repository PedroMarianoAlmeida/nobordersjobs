import React, { ReactNode } from "react";

interface TableProps<T extends string> {
  columnHeaders: T[];
  rows: Record<T, ReactNode>[];
}

const Table = ({ columnHeaders, rows }: TableProps<string>) => {
  return (
    <div className="overflow-x-auto w-11/12">
      <table className="table table-zebra">
        <thead>
          <tr>
            {columnHeaders.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {columnHeaders.map((header) => (
                <td key={header}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
