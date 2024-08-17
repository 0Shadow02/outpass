"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { NextRequest } from "next/server";
import { use, useEffect, useState } from "react";

interface Outpass {
    Name: string;
    rollNo: string;
    userId: string;
    valid: string;
    StartTime: string;
}

export default function Card({ payload }: { payload: any },req:NextRequest) {
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const id = params.get;
    console.log(id)
    // const [user ,setuser]= useState({})
    // useEffect(()=>{
    //      axios.get(("http://localhost:3000/api/user")).then((response)=>{
    //         setuser(response)
    //      })
    // },[])
    //  console.log(user)
    // console.log(payload)
    //  const set = async ()=>{
    //     await setOutpass(payload)
    //  } 
    // if (!outpass) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div>
            {/* Name: {outpass.Name},
            Rollno:{outpass.rollNo}
            userId:{outpass.userId},
            valid:{outpass.valid},
            Created at:{outpass.StartTime} */}
            {/* {user} */}
        </div>
    );
};
