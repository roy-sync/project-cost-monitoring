"use client"
import React, { useEffect, useState } from 'react';

interface InputCostProps {
    actual_cost: number;
    onActualCostChange: (newTotalCost: number) => void;
}

const ProjectActualCost: React.FC<InputCostProps> = ({ actual_cost, onActualCostChange }) => {

    useEffect(() => {
        setEditedTotalActual(actual_cost);
    }, []);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTotalActual, setEditedTotalActual] = useState(actual_cost);

    const handleCheckboxChange = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTotalActual(parseInt(event.target.value) || 0);
    };

    const handleSubmit = () => {
        setIsEditing(false);
        onActualCostChange(editedTotalActual);
    };

    return (
        <div className="my-5 rounded-xl border bg-green-100 p-3 shadow-md">
            <label className="flex items-center">
                <input
                    type="checkbox"
                    checked={isEditing}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                />
                Edit Actual Project Cost
            </label>

            {isEditing ? (
                <>
                    <input
                        type="number"
                        value={editedTotalActual}
                        onChange={handleInputChange}
                        className="text-lg font-bold text-neutral-900"
                    />
                    <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
                        Submit
                    </button>
                </>
            ) : (
                <>
                    <p className="text-bold text-sm uppercase text-green-600">Total Project Cost</p>
                    <p className="text-lg font-bold text-neutral-900">{editedTotalActual}</p>
                </>
            )}
        </div>
    );
};

export default ProjectActualCost;
