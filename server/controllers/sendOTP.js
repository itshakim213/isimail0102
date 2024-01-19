// const asyncHandler = require('express-async-handler');
// const User = require('../models/UserModel');

// const sendOTPVerification = async ({ _id, email }, res) => {
//   console.log(_id, secureMail);
//   try {
//     const otp = Math.floor(100000 + Math.random() * 900000);
//     console.log(otp);
//     console.log(process.env.AUTH_EMAIL);

//     const mailOptions = {
//       from: process.env.AUTH_EMAIL,
//       to: email,
//       subject: 'OTP for Email Verification',
//       html: `<!DOCTYPE html>
//       <html lang="en">
//       <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Email Verification</title>
//           <style>
//               body {
//                   font-family: Arial, sans-serif;
//                   background-color: #f4f4f4;
//                   padding: 20px;
//               }
//               .container {
//                   max-width: 600px;
//                   margin: 0 auto;
//                   background-color: #ffffff;
//                   padding: 20px;
//                   border-radius: 5px;
//                   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
//               }
//               h1 {
//                   color: #333;
//               }
//               p {
//                   font-size: 16px;
//                   line-height: 1.5;
//                   color: #666;
//               }
//               .otp {
//                   font-size: 24px;
//                   font-weight: bold;
//                   color: #007bff;
//               }
//           </style>
//       </head>
//       <body>
//           <div class="container">
//               <h1>Code authentification à deux facteurs</h1>
//               <p>Merci d être un membre de notre community TalkMail s App, Pour confirmer votre identé entrez ce code dans l app:</p>
//               <p>Votre code OTP de vérification est: <span class="otp">${otp}</span></p>
//               <p>Si ça ne vous appartient pas, ignorez ce mail svp !!!</p>
//           </div>
//       </body>
//       </html>
//       `,
//     };

//     const saltRounds = 10;
//     const hashOTP = await bcrypt.hash(toString(otp), saltRounds);
//     const newOTPVerfication = new PublisherOTPVerification({
//       publisherId: _id,
//       otp: hashOTP,
//       createdAt: Date.now(),
//       expiresAt: Date.now() + 5 * 60 * 1000,
//     });

//     await newOTPVerfication.save();
//     await transporter.sendMail(mailOptions);
//     res.json({
//       status: 'Pending',
//       message: 'OTP is sent successfully.',
//       data: {
//         publisherId: _id,
//         email,
//       },
//     });
//   } catch (err) {
//     res.json({
//       status: 'Failed',
//       message: 'OTP is not sent.',
//       error: err.message,
//     });
//   }
// };
