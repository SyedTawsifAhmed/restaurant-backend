import { 
  restaurantName, 
  restaurantPhone, 
  restaurantHours 
} from "@/config/restaurant";

export const reservationEmail = (data: {
  name: string;
  guestCount: number;
  reservationTime: Date;
  parking: boolean;
  reservationCode: string;
  }) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Activate Your Account</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f3f4f6;
        color: #333;
      }
      .email-container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .email-header {
        background: linear-gradient(90deg, #4caf50, #81c784);
        color: #ffffff;
        padding: 25px;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
      }
      .email-body {
        padding: 20px;
      }
      .email-body h2 {
        color: #2e7d32;
        font-size: 20px;
        margin-bottom: 15px;
      }
      .email-body p {
        color: #555;
        line-height: 1.6;
        margin-bottom: 15px;
      }
      .activation-link {
        margin: 20px 0;
        padding: 15px;
        background: #f1f1f1;
        border: 1px dashed #ccc;
        border-radius: 5px;
        font-size: 14px;
        word-break: break-all;
        text-align: center;
        color: #2e7d32;
        font-family: monospace;
      }
      .btn {
        display: inline-block;
        margin: 20px auto;
        padding: 10px 20px;
        color: #ffffff;
        background: #4caf50;
        border-radius: 5px;
        text-decoration: none;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
      }
      .btn:hover {
        background: #388e3c;
      }
      .email-footer {
        text-align: center;
        padding: 15px;
        font-size: 14px;
        color: #888;
        background: #f9f9f9;
      }
      .email-footer a {
        color: #2e7d32;
        text-decoration: none;
      }
      .email-footer a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        Your reservation at ${restaurantName} 
      </div>
      <div class="email-body">
        <h2>Hello ${data.name},</h2>
        <p>You have a reservation at ${restaurantName}.</p>
        <p>Here are the details of your reservation:</p>
        <p>Date and Time: ${data.reservationTime}</p>
        <p>Guest Count: ${data.guestCount}</p>
        <p>Parking: ${data.parking ? "Yes" : "No"}</p>
        <p>Reservation Code: ${data.reservationCode}</p>
        <p>Please use this code to check-in at the restaurant.
         You can also use it to cancel your reservation on the website.</p>
      </div>
      <div class="email-footer">
        <p>Need help? Contact us at 
        ${restaurantPhone}. Hours: ${restaurantHours}</p>
      </div>
    </div>
  </body>
  </html>
`;
