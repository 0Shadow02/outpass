// "use client";

// import axios from "axios";
// import { useEffect, useState } from "react";

// interface Outpass {
//     Name: string;
//     rollNo: string;
//     userId: string;
//     valid: string;
//     StartTime: string;
// }

// export const Card = ({ rollNumber }: { rollNumber: string }) => {
//     const [outpass, setOutpass] = useState<Outpass | null>(null);

//         const fetchOutpass = async () => {
//             try {
//                 const response = await axios.post("http://localhost:3000/api/user", { rollNumber });
//                 setOutpass(response.data);
//             } catch (error) {
//                 console.error("Error fetching outpass:", error);
//             }
//         };

//         fetchOutpass();
  

//     if (!outpass) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             Name: {outpass.Name},
//             Rollno:{outpass.rollNo}
//             userId:{outpass.userId},
//             valid:{outpass.valid},
//             Created at:{outpass.StartTime}
//         </div>
//     );
// };
