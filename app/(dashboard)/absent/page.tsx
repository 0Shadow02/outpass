"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';

type Outpass = {
    id: number;
    Name: string;
    rollNo: string;
    userId: number;
    Address: string;
    Phone_number: string;
    Guardians_Pno: string;
    StartTime: Date;
    Place: string;
    valid: boolean;
    expired: boolean;
};

export default function Today() {
    const [totalpass, setTotalPass] = useState<Outpass[]>([]);

    useEffect(() => {
        async function fetchTodo() {
            try {
                const response = await axios.get<Outpass[]>('http://localhost:3000/api/today');
                setTotalPass(response.data);
            } catch (error) {
                console.error("Error fetching outpasses:", error);
            }
        }
        fetchTodo();
    }, []);

    return (
        <div className="h-screen overflow-y-auto p-6 pb-20"> 
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {totalpass.map(pass => (
                    <div key={pass.id} className="bg-white border border-gray-200 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
                        <h3 className="text-lg font-semibold">{pass.Name}</h3>
                        <p className="text-gray-700">Roll No: {pass.rollNo}</p>
                        <p className="text-gray-700">Address: {pass.Address}</p>
                        <p className="text-gray-700">Phone: {pass.Phone_number}</p>
                        <p className="text-gray-700">Guardians Phone No: {pass.Guardians_Pno}</p>
                        <p className="text-gray-700">Place: {pass.Place}</p>
                        <p className="text-gray-700"> Start Time: {new Date(pass.StartTime).toLocaleDateString('en-GB')}
                        </p>

                    </div>
                ))}
            </div>
        </div>
    );
}
