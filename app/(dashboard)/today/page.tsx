"use client";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
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
    const navigate = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'unauthenticated') {
            navigate.push('/api/auth/signin');
        }
        async function fetchTodo() {
            try {
                const response = await axios.get<Outpass[]>('http://localhost:3000/api/today');
                setTotalPass(response.data);
            } catch (error) {
                console.error("Error fetching outpasses:", error);
            }
        }
        fetchTodo();
    }, [status, navigate]);

    return (
        <div className="h-screen overflow-y-auto bg-gray-900 p-6 pb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {totalpass.map(pass => (
                    <div key={pass.id} className="bg-gray-800 border border-gray-600 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
                        <h3 className="text-xl font-semibold text-indigo-300">{pass.Name}</h3>
                        <p className="text-gray-400">Roll No: {pass.rollNo}</p>
                        <p className="text-gray-400">Address: {pass.Address}</p>
                        <p className="text-gray-400">Phone: {pass.Phone_number}</p>
                        <p className="text-gray-400">Guardians Phone No: {pass.Guardians_Pno}</p>
                        <p className="text-gray-400">Place: {pass.Place}</p>
                        <p className="text-gray-400">
                            Start Time: {new Date(pass.StartTime).toLocaleString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            })}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
