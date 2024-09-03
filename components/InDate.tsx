import React, { useState } from 'react';

const CustomDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);

    const toggleCalendar = () => {
        setIsOpen(!isOpen);
    };

    const handleDateChange = (event: { target: { value: string | number | Date; }; }) => {
        setSelectedDate(new Date(event.target.value));
        setIsOpen(false); // 
    };

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0]; 
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={formatDate(selectedDate)}
                readOnly
                onClick={toggleCalendar}
                className="border rounded-lg p-3 w-full bg-gray-800 text-white cursor-pointer transition duration-200 ease-in-out hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Select a date"
            />
            {isOpen && (
                <div
                    className="absolute z-10 bg-gray-700 border border-gray-600 rounded-lg shadow-lg mt-1 p-2 transition-transform duration-300 ease-in-out transform origin-top scale-y-0"
                    style={{ transform: isOpen ? 'scaleY(1)' : 'scaleY(0)' }}
                >
                    <input
                        type="date"
                        value={formatDate(selectedDate)}
                        onChange={handleDateChange}
                        className="p-2 bg-gray-800 text-white rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            )}
        </div>
    );
};

export default CustomDatePicker;
