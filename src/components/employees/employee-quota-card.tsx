"use client"
import React, { useEffect, useState } from 'react';

interface InputCostProps {
    quota: number;
    onTotalQuota: (newTotalCost: number) => void;
}

const EmployeeQuotaCard: React.FC<InputCostProps> = ({ quota, onTotalQuota }) => {

    useEffect(() => {
        setEditedTotalActual(quota);
    }, []);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTotalActual, setEditedTotalActual] = useState(quota);

    const handleCheckboxChange = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTotalActual(parseInt(event.target.value) || 0);
    };

    const handleSubmit = () => {
        setIsEditing(false);
        onTotalQuota(editedTotalActual);
    };
    ``
    return (
        <div className="my-5 rounded-xl border bg-green-100 p-3 shadow-md">
            <label className="flex items-center">
                <input
                    type="checkbox"
                    checked={isEditing}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                />
                Edit Efficiency Quota
            </label>

            {isEditing ? (
                <>
                    <input
                        type="number"
                        value={editedTotalActual}
                        onChange={handleInputChange}
                        className="text-lg font-bold text-neutral-900"
                    />
                    <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 m-2 rounded">
                        Submit
                    </button>
                </>
            ) : (
                <>
                    <p className="text-bold text-sm uppercase text-green-600">Efficiency Quota</p>
                    <p className="text-lg font-bold text-neutral-900">{editedTotalActual}</p>
                </>
            )}
        </div>
    );
};

export default EmployeeQuotaCard;
