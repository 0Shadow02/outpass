import nodemailer from "nodemailer";

const Email = process.env.Email_Id;
const Pass = process.env.Email_Pass;
console.log(Email)
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        type: "login",
        user: Email,
        pass: Pass
    }
});


 export const mailOptions={
    from: 'email', 
  }