"use client"
import { useRouter } from "next/navigation";
import { ChangeEvent, use, useState } from "react";
import ReactLoading from "react-loading";
import axios from "axios"
import { NextResponse } from "next/server";

export const SigninComponent =()=>{
    const [  postInputs,setPostInputs] = useState({
        username:"",
        password:""

    })
    const [LoggedInstate, setLoggedInState] = useState(false);
    const router = useRouter() 
    
     async function sendRequest(){
        try {
          axios.post("http://localhost:3000/api/admin",{
            postInputs
         }).then(()=>{ 
            
            router.push("/dashboard")
         })
         
        } catch (error) {
            return error
        }
        
    }

    return (
        <div className=" h-screen flex justify-center flex-col">
          {LoggedInstate && (
            <div className="flex justify-center absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 z-10">
              {" "}
              <ReactLoading
                type={"spinningBubbles"}
                color={"#707070"}
                height={100}
                width={100}
              ></ReactLoading>
            </div>
          )}
          <div className="flex justify-center ">
            <div className="w-full max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
              <div className="text-3xl font-bold mt-4 px-8 mb-4">
                Admin Signin 
              </div>
             
              <div className="mt-1">
                  <LabeledInput
                    label="Username"
                    placeholder="User@nith..."
                    onChange={(e) => {
                      setPostInputs((c) => ({ ...c, username: e.target.value }));
                    }}
                  />
           
                <LabeledInput
                  label="Password"
                  type={"password"}
                  placeholder="Pass@123"
                  onChange={(e) => {
                    setPostInputs((c) => ({ ...c, password: e.target.value }));
                  }}
                />
              </div>
    
              <button
                onClick={sendRequest}
                type="button"
                className=" w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 mt-6"
              >
                Signin
              </button>
            </div>
          </div>
        </div>
      );
    };
    
    interface LabeledInpuType {
      label: string;
      placeholder: string;
      onChange: (e: ChangeEvent<HTMLInputElement>) => void;
      type?: string;
      onclick?: (e: React.MouseEvent<HTMLElement>) => void;
    }
    function LabeledInput({
      label,
      placeholder,
      onChange,
      type,
      onclick,
    }: LabeledInpuType) {
      return (
        <div>
          <label className="block mb-2 text-sm font-semibold text-black pt-4 ">
            {label}
          </label>
          <input
            onChange={onChange}
            onClick={onclick}
            type={type || "text"}
            id="first_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder={placeholder}
            required
          />
        </div>
      );
    }
    