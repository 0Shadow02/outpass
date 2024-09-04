import React, { useState } from 'react';  
import { format, addMonths, subMonths, isToday } from 'date-fns';  
interface CustomDatePickerProps {
    onDateSelect: (date: Date) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ onDateSelect }) => {  
    const [selectedDate, setSelectedDate] = useState(new Date());  
    const [isOpen, setIsOpen] = useState(false);  
    const [currentMonth, setCurrentMonth] = useState(new Date());  

    const toggleCalendar = () => {  
        setIsOpen(!isOpen);  
    };  

    const handleDateChange = (date: Date) => {  
        setSelectedDate(date);  
        onDateSelect(date);  
        setIsOpen(false);  
    };  

    const handleMonthChange = (direction: string) => {  
        setCurrentMonth(direction === 'next' ? addMonths(currentMonth, 1) : subMonths(currentMonth, 1));  
    };  

    const renderDays = () => {  
        const days = [];  
        const startOfWeek = new Date(currentMonth.setDate(1));  
        const startDay = startOfWeek.getDay();  

        for (let i = 0; i < startDay; i++) {  
            days.push(<div className="day empty" key={`empty-${i}`} />);  
        }  

        const totalDays = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();  
        for (let day = 1; day <= totalDays; day++) {  
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);  
            days.push(  
                <div  
                    key={day}  
                    className={`flex items-center justify-center w-10 h-10 rounded transition-transform duration-200 ease-in-out cursor-pointer   
                        ${format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') ? 'bg-blue-500 text-white' : ''}   
                        ${isToday(date) ? 'bg-red-500 text-white' : ''}   
                        hover:bg-gray-600 hover:scale-105`}  
                    onClick={() => handleDateChange(date)}  
                >  
                    {day}  
                </div>  
            );  
        }  
        return days;  
    };  

    return (  
        <div className="relative">  
            <input  
                type="text"  
                value={format(selectedDate, 'yyyy-MM-dd')}  
                readOnly  
                onClick={toggleCalendar}  
                className="border rounded-lg p-3 w-full bg-gray-800 text-white cursor-pointer transition duration-200 ease-in-out hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"  
                placeholder="Select a date"  
            />  
            {isOpen && (  
                <div className="absolute z-10 bg-gray-700 border border-gray-600 rounded-lg shadow-lg mt-1 p-4 transition-all duration-300 ease-in-out">  
                    <div className="flex justify-between mb-2">  
                        <button onClick={() => handleMonthChange('prev')} className="text-white hover:text-blue-500">Prev</button>  
                        <span className="text-white">{format(currentMonth, 'MMMM yyyy')}</span>  
                        <button onClick={() => handleMonthChange('next')} className="text-white hover:text-blue-500">Next</button>  
                    </div>  
                    <div className="grid grid-cols-7 gap-1">  
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (  
                            <div key={day} className="day-name text-gray-400">{day}</div>  
                        ))}  
                        {renderDays()}  
                    </div>  
                </div>  
            )}  
        </div>  
    );  
};  

export default CustomDatePicker;
