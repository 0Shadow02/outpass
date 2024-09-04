"use client";
import { BtnLoader } from "@/components/buttonLoader";
import { CAlert } from "@/components/ralert";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Dashboard() {
    const [rollnumber, setRollnumber] = useState("");
    const [loader, setLoader]= useState(false)
    const [alert ,setalert] =useState(false)
    const navigate = useRouter();

    return (
        <div className="w-screen h-screen bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center">
            <div className="w-full max-w-md mx-4 mr-96 mb-80"> 
                <div className="text-5xl text-green-300 pt-8 mb-8 font-bold text-center">
                    Entries:
                </div>
                <div className="bg-gray-800 border border-gray-600 rounded-lg shadow-lg p-6">
                    <label className="block mb-2 font-semibold text-white text-lg">
                        Roll number:
                    </label>
                    <input
                        onChange={(e) => setRollnumber(e.target.value.toUpperCase())}
                        type="text"
                        id="roll_number"
                        className="bg-gray-700 border border-gray-500 text-green-300 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 px-4 mb-4"
                        placeholder="22b**00"
                        required
                    />
                    {alert&&<CAlert/>}
                    <button
                        onClick={async () => {
                            if (rollnumber==="") {
                                setalert(true)
                            }
                            else{
                            setLoader(true)
                            try {
                                navigate.push(`pass/?rollNo=${rollnumber}`);
                            } catch (error) {
                                console.error("Error fetching outpass:", error);
                            }
                        }
                        }}
                        type="button"
                        className="w-full text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5"
                    >
                       {loader?<BtnLoader/>:"Create"} 
                    </button>
                </div>
            </div>
        </div>
    );
}

