"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import ReactLoading from "react-loading";
import axios from "axios";

export const SigninComponent = () => {
    const [postInputs, setPostInputs] = useState({
        username: "",
        password: ""
    });
    const [LoggedInstate, setLoggedInState] = useState(false);
    const router = useRouter();

    async function sendRequest() {
        try {
            await axios.post("http://localhost:3000/api/admin", {
                postInputs
            });
            router.push("/dashboard");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="h-screen flex justify-center items-center bg-gray-900"> {/* Set background color */}
            {LoggedInstate && (
                <div className="flex justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <ReactLoading
                        type={"spinningBubbles"}
                        color={"#707070"}
                        height={100}
                        width={100}
                    />
                </div>
            )}
            <div className="w-full max-w-sm p-6 bg-gray-800 border border-gray-700 rounded-lg shadow"> {/* Adjusted colors */}
                <div className="text-3xl font-bold text-white text-center mb-4">
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
                    className="w-full text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-500 font-medium rounded-lg text-md px-5 py-2.5 mt-6"
                >
                    Signin
                </button>
            </div>
        </div>
    );
};

interface LabeledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabeledInput({
    label,
    placeholder,
    onChange,
    type,
}: LabeledInputType) {
    return (
        <div>
            <label className="block mb-2 text-sm font-semibold text-white">
                {label}
            </label>
            <input
                onChange={onChange}
                type={type || "text"}
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}
