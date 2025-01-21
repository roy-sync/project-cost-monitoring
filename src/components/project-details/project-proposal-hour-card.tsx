"use client"
import React, { useEffect, useState } from 'react';

interface InputCostProps {
    proposal_hours: number;
    onProposalHoursChange: (newProposedHours: number) => void;
}

const ProjectProposedHours: React.FC<InputCostProps> = ({ proposal_hours, onProposalHoursChange }) => {

    useEffect(() => {
        setEditedProposalHours(proposal_hours);
    }, []);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProposalHours, setEditedProposalHours] = useState(proposal_hours);

    const handleCheckboxChange = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedProposalHours(parseInt(event.target.value) || 0);
    };

    const handleSubmit = () => {
        setIsEditing(false);
        onProposalHoursChange(editedProposalHours);
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
                Edit Proposed Hours
            </label>

            {isEditing ? (
                <>
                    <input
                        type="number"
                        value={editedProposalHours}
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
                    <p className="text-lg font-bold text-neutral-900">{editedProposalHours}</p>
                </>
            )}
        </div>
    );
};

export default ProjectProposedHours;
