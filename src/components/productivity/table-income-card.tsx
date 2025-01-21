import { Tooltip, IconButton } from '@mui/material';
import React from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface TableProps {
    data: { column1: string; column2: string, information: string }[];
}

const TableIncomeData: React.FC<TableProps> = ({ data }) => {
    return (
        <div className="max-w-screen-md mx-auto mt-4">
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded">
                {/* <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Label</th>
                        <th className="py-2 px-4 border-b">Data</th>
                    </tr>
                </thead> */}
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b">{row.column1}
                                <Tooltip title={row.information}>
                                    <IconButton>
                                        <HelpOutlineIcon />
                                    </IconButton>
                                </Tooltip>
                            </td>
                            <td className="py-2 px-4 border-b">{row.column2}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableIncomeData;
