import React from 'react';

interface TableProps {
    data: { column1: string; column2: string; column3: string }[];
}

const TableEstimateData: React.FC<TableProps> = ({ data }) => {

    // Calculate total estimate and total actual
    const totalEstimate = data.reduce((total, current) => total + parseFloat(current.column2), 0);
    const totalActual = data.reduce((total, current) => total + parseFloat(current.column3), 0);

    return (
        <div className="max-w-screen-md mx-auto my-4 w-full">
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Task Type</th>
                        <th className="py-2 px-4 border-b text-left">Estimate</th>
                        <th className="py-2 px-4 border-b text-left">Actual</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b">{row.column1}
                            </td>
                            <td className="py-2 px-4 border-b">{row.column2}</td>
                            <td className="py-2 px-4 border-b">{row.column3}</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="py-2 px-4 border-b">Total</td>
                        <td className="py-2 px-4 border-b">{totalEstimate.toFixed(2)}</td>
                        <td className="py-2 px-4 border-b">{totalActual.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TableEstimateData;
