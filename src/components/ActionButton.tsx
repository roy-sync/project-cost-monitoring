import React, { useState } from 'react';
import axiosInstance from "@/axios/axiosInstance";

interface ActionButtonProps {
    onClick: () => void;
    initialValue?: string; // New prop for initial value of the input field
    attendanceIdOutside?: number;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, initialValue, attendanceIdOutside }) => {
    const [showModal, setShowModal] = useState(false);
    const [employeeAttendance, setemployeeAttendance] = useState(initialValue || ''); 
    const [attendanceId, setAttendaceId] = useState(attendanceIdOutside || ''); 

    const handleClick = () => {
        setShowModal(true);
        onClick();
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setemployeeAttendance(e.target.value);
    };

    function isValidTime(timeString: string) {
        // Regular expression to match the time format HH:MM:SS
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
        
        return timeRegex.test(timeString);
    }

    const handleSave = () => {

        if(!isValidTime(employeeAttendance)) {
            alert("Invalid Time");
        } else {
            console.log(employeeAttendance);
            console.log(isValidTime(employeeAttendance));
            console.log(attendanceId);

            const fetchData = async () => {
                try {
                  const params = { duration: employeeAttendance };
                  // Assuming axiosInstance is defined somewhere in your code
                  const response = await axiosInstance.patch(`/attendance/${attendanceId}`, params);
              
                  console.log('Response:', response.data);
                  alert('Succefully Updated');
                  window.location.reload();
                } catch (err: any) {
                  // If an error occurs during the request
                  console.error('Error:', err.message);
                  throw err; // Rethrow the error to handle it elsewhere, if needed
                }
            };
              
            // Calling the fetchData function
            fetchData();

        }

        
    };

    return (
        <>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleClick}
            >
                Edit
            </button>
            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Employee Attendance</h3>
                                        <div className="mt-2">
                                            {/* Form fields go here */}
                                            <label htmlFor="employeeAttendance" className="block text-sm font-medium text-gray-700">Employee Attendance Hour</label>
                                            <input 
                                                type="text" 
                                                name="employeeAttendance" 
                                                id="employeeAttendance" 
                                                className="mt-1 p-2 border border-gray-300 rounded-md w-full" 
                                                value={employeeAttendance} 
                                                onChange={handleInputChange} // Handle input changes
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={handleSave} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Save
                                </button>
                                <button onClick={handleCloseModal} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ActionButton;
