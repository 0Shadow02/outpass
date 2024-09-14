"use client";
import React, { useState, useEffect } from 'react';

export default function Created() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-600">
            <div className="bg-white shadow-2xl rounded-lg p-10 flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
                {loading ? (
                    <div className="loader animate-spin rounded-full border-8 border-blue-500 border-t-transparent w-20 h-20 mb-6"></div>
                ) : (
                    <div className="text-7xl text-green-500 mb-4 animate-bounce">✔</div>
                )}
                <div className="text-2xl font-bold text-gray-800">Created</div>
                <p className="text-gray-600 text-center mt-2">Homepass has been successfully created!</p>
            </div>
        </div>
    );
}
