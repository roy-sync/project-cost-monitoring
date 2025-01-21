// EditHolidayModal.jsx
import React, { useState } from "react";
import { Holiday } from "@/models/holiday"; // Import the Holiday type

interface EditHolidayModalProps {
  holiday: Holiday;
  onUpdate: (id: string, name: string, date: String) => void;
  onClose: () => void;
}

const EditHolidayModal: React.FC<EditHolidayModalProps> = ({ holiday, onUpdate, onClose }) => {
  const [name, setName] = useState(holiday.name);
  const [date, setDate] = useState(holiday.date);

  const handleUpdate = () => {
    onUpdate(holiday.id.toString(), name, date);
    onClose();
  };

  return (
    <div className="modal">
      {/* Modal content goes here */}
      <div className="modal-content">
        <h2>Edit Holiday</h2>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button onClick={handleUpdate}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditHolidayModal;
