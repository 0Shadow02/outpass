"use client"

import { useRouter } from "next/navigation";

export const Alertpass = () => {
    const navigate = useRouter()
    return (
        <div>
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-900 to-gray-700">
                <div className="bg-gray-800 border border-gray-600 rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
                    <div className="flex justify-center">
                        <div className="rounded-full bg-red-200 p-6">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500 p-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-8 w-8 text-white"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l-6 6m6-6l6 6m-6-6l-6-6m6 6l6-6" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <h3 className="my-4 text-center text-3xl font-semibold text-green-300">OutPass Already Exists!</h3>
                    <p className="w-full text-center font-normal text-gray-300 mt-2 mb-4 leading-relaxed">
                        You can only opt for one OutPass in a day. Please try again tomorrow.
                    </p>
                    <button onClick={()=>navigate.push('/dashboard')} className=" mx-auto mt-10 block rounded-xl border-4 border-transparent bg-blue-600 px-6 py-3 text-center text-base font-bold text-orange-100 outline-4 hover:outline hover:duration-100">
                        return
                    </button>
                </div>
            </div>
        </div>
    );
};
