"use client"
import { Alertpass } from "@/components/Alertpass";
import { CardPass } from "@/components/CardPass";
import { Loader } from "@/components/Loader";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Outpass(){
    const searchParams = useSearchParams();
    const rollNo = searchParams.get('rollNo') 
    const [loader,setLoader]= useState(true)
    const [exist,setexit]= useState(false)
    useEffect(() => {
        const fetchUserDetails = async () => {
            const pass = await axios.get(`http://localhost:3000/api/outpass?rollNo=${rollNo}`)
            setLoader(false)
            if (pass.data.Alreadyexist) {
                setexit(true) 
            }
        }
        fetchUserDetails()
     },[])
    return <div >
        {loader?<Loader/>:exist?<Alertpass/>:<CardPass rollNumber={rollNo} type="outpass" />}
          
          
          
    </div>
}