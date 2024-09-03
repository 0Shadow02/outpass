
"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface Outpass {
    Name: string;
    rollNo: string;
    userId: string;
    valid: string;
    StartTime: string;
}

export const Card = ({ rollNumber }: { rollNumber: string } ,{type}:{type:"outpass"|"homepass"}) => {
    const [user,setUser] = useState({})
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/user`, {  
                    headers: {  
                        rollNumber: rollNumber  
                    }  
                    
                })
                setUser(response)
            } catch (error) {
                console.error("Error fetching UserDetails:", error);
            }
        };

        fetchUserDetails();
  

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>

            </div>
            <button>
                Create
            </button>
        </div>
    );
};
