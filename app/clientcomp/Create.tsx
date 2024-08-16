"useClient"

import axios from "axios"
import { useRouter } from "next/navigation"


export const OnlclickHandler=(event: MouseEvent<HTMLButtonElement, MouseEvent>, val:string)=>{
     const navigate = useRouter()
     const rollNumber = val
    axios.post("",{
        rollNumber
    }).then(()=>{
        navigate.push("/today")
    })
}