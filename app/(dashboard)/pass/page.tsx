"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pass() {
    const navigate = useRouter();
    const searchParams = useSearchParams();
    const rollNo = searchParams.get('rollNo')

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-700">
            <div className="bg-gray-800 border border-gray-600 rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
                <h1 className="text-2xl font-bold text-green-300 mb-4">Select Your Pass</h1>
                <div className="flex space-x-4">
                    <button
                        className="flex-1 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500 transition duration-300"
                        onClick={() => navigate.push(`/pass/outpass?rollNo=${rollNo}`)}
                    >
                        Outpass
                    </button>
                    <button
                        className="flex-1 px-4 py-2 text-white bg-green-600 rounded hover:bg-green-500 transition duration-300"
                        onClick={() => navigate.push(`/pass/homepass?rollNo=${rollNo}`)}
                    >
                        Homepass
                    </button>
                </div>
            </div>
        </div>
    );
}
