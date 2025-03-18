# Restaurant API
This project is a table booking software for a single restaurant website. It will support table reservations, parking reservations (if applicable), pre-ordering food, processing payments, and handling refunds. This restaurant in particular allows customers to place their food orders online before they arrive at the restaurant.

## Core Features
### CRUD Operations (Create, Read, Update, Delete)
- Reservations.
- (Optional) Parking.
- Pre-Orders.
- Payments: Create, Read, Update.
- Refunds: Create, Read, Update.
### Reservation System And/Or User Booking System
Currently the options are to:
1. Create a user login system which will hold their information and reservations.
2. Integrate user information through the reservation and handle payment and refund information via phone/email.
Since its a single restaurant, its simpler to integrate the user information into the reservation system.
### Pre-Orders
- Customers can pre-order food when making a reservation.
- Pre-orders will be linked to their reservation.
### Payments
- Securely accept payments for pre-orders.
- Includes additional fees, if applicable.
### Refund and cancellation
- Implement refund policies for reservations and pre-orders, as well as accidental restaurant overbookings or any restaurant-end issues.
### Admin Dashboard
- View and manage reservations, pre-orders, and payments.
- Update restaurant information, such as hours, phone number, maximum capacity, and any other relevant details.

There are two options for cancellation:
1. If a user system is implemented, the user can cancel their reservation directly by logging in.
2. If a user system is not implemented, the user can cancel their reservation by using the Manage Reservations feature, where they can include their unique reservation ID, as well as their email and phone number to confirm their cancellation.
3

## User Stories
1. As a customer, I want to view available reservation slots so that I can choose a convenient date and time for my visit.
2. (Optional) As a customer, I want to fill in my name, email, phone number, and any special requests when booking, so that my reservation is processed without requiring an account.
3. (Optional) As a customer, I want to create a user account so that I can make reservations more easily in the future.
4. As a customer, I want to optionally request a parking spot during the booking process, so that I can ensure parking is available when I arrive.
5. As a customer, I want to be able to pre-order food before I arrive at the restaurant, so that I can save time and avoid waiting.
6. As a customer, I want to securely pay for my reservation (and pre-order) online, so that my booking is confirmed without delay.
7. As a customer, I want to receive confirmation via email or SMS after my reservation and payment, so that I have a record of my booking details.
8. As a customer, I want to cancel my reservation if my plans change, and receive a refund if eligible under the cancellation policy.
9. As an admin, I want to view and manage reservations, pre-orders, and payments, so that I can understand the status of the business and take necessary actions such as overbookings or refunds.
10. As an admin, I want to update restaurant information, such as hours, phone number, maximum capacity, and any other relevant details.

## Technical Requirements
### Backend Technology Stack
- **Language**: TypeScript
- **Framework**: Express.js (For API endpoints)
- **Database**: MongoDB (noSQL)
- **Authentication**: JSON web token (JWT )





