"use client"
import React, { useEffect, useState } from 'react';

interface InputCostProps {
    total_leave: number;
    onTotalLeaveChange: (newTotalCost: number) => void;
}

const EmployeeLeaveCard: React.FC<InputCostProps> = ({ total_leave, onTotalLeaveChange }) => {

    useEffect(() => {
        setEditedTotalActual(total_leave);
    }, []);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTotalActual, setEditedTotalActual] = useState(total_leave);

    const handleCheckboxChange = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTotalActual(parseInt(event.target.value) || 0);
    };

    const handleSubmit = () => {
        setIsEditing(false);
        onTotalLeaveChange(editedTotalActual);
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
                Edit Leave Count
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
                    <p className="text-bold text-sm uppercase text-green-600">Total Paid Leave</p>
                    <p className="text-lg font-bold text-neutral-900">{editedTotalActual}</p>
                </>
            )}
        </div>
    );
};

export default EmployeeLeaveCard;
