# Restaurant API
This project is a table booking software for a single restaurant website. It will support table reservations, parking reservations (if applicable), pre-ordering food, processing payments, and handling refunds. This restaurant in particular allows customers to place their food orders online before they arrive at the restaurant.

# Core Features
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
- Customers can pre-order food when making a reservation using a menu of available options.
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

# User Stories
User Stories are a way to describe the features and functionality of the software. They start with a type of [user] who wants to accomplish an [action] which they will [benefit] from. Here are some potential user stories:
1. As a customer, I want to view available reservation slots so that I can choose a convenient date and time for my visit.
2. (Optional) As a customer, I want to fill in my name, email, phone number, and any special requests when booking, so that my reservation is processed without requiring an account.
3. (Optional) As a customer, I want to create a user account so that I can make reservations more easily in the future.
4. As a customer, I want to optionally request a parking spot during the booking process, so that I can ensure parking is available when I arrive.
6. As a customer, I want to be able to view the menu of the restaurant, so that I can choose what I want to eat.
5. As a customer, I want to be able to pre-order food before I arrive at the restaurant, so that I can save time and avoid waiting.
6. As a customer, I want to securely pay for my reservation (and pre-order) online, so that my booking is confirmed without delay.
7. As a customer, I want to receive confirmation via email or SMS after my reservation and payment, so that I have a record of my booking details.
8. As a customer, I want to cancel my reservation if my plans change, and receive a refund if eligible under the cancellation policy.
9. As an admin, I want to view and manage reservations, pre-orders, and payments, so that I can understand the status of the business and take necessary actions such as overbookings or refunds.
10. As an admin, I want to update restaurant information, such as hours, phone number, maximum capacity, and any other relevant details.

# Technical Requirements
## Backend Technology Stack
- **Language**: TypeScript
- **Framework**: Express.js (For API endpoints)
- **Database**: MongoDB (noSQL)
- **Authentication**: JSON web token (JWT )
- **Payment Processing**: Stripe or PayPal API
- **Email Service**: NodeMailer or SendGrid

## Security
- Use hashed codes and passwords
- Store sensitive information in environment variables
- Validate all requests


# API Endpoints
## Customer Endpoints
### Create a reservation: 

* ```POST /reservations```
* Validates request
* Creates and stores the reservation
* Processes payment if applicable
* Sends confirmation email
* Returns a JSON response with the reservation details

### (Optional) Retrieve Menu

* ```GET /menu```
* Retrieves and returns the menu which includes food items and prices

### Retrieve Reservation

* ```GET /reservations/:reservationId?email=<customerEmail>```
* Validates that reservation exists
* Retrieves and returns the reservation details (but no sensitive payment information)

### Cancel Reservation

* ```DELETE /reservations/:reservationId?email=<customer_email>&code=<reservation_code>```
* Validates email and reservation code and that reservation exists
* Checks refund policy
* Updates database to reflect cancellation
* Triggers refund request if applicable
* Sends cancellation email

## Admin Endpoints
### Admin Login

* ```POST /admin/login```
* Authenticates admin with email/password
* Returns JWT token

### Get ALL Reservations

* ```GET /admin/reservations```
* Retrieves and returns all reservations

### Modify Reservation (if needed):

* ```PATCH /admin/reservations/:reservationId```
* Updates and returns the updated reservation details

### Manually Process Refund

* ```POST /admin/refunds/:reservationId```
* Verfies that reservation exists and refund is allowed
* Calls payment service for refund processing
* Updates database to reflect refund
* Sends email to customer (if applicable / optional)

### Update Restaurant Information:

* ```PATCH /admin/config```
* Allows changes to restaurant settings (e.g., max tables, parking spots)

### Update Menu:

* ```PATCH /admin/menu```
* Adds, updates, or removes menu items and features
# Database Schema
### Reservations
```json
{
  "reservationId": "UUID or ObjectId",
  "name": "string",
  "phoneNumber": "string",
  "email": "string",
  "guestCount": "integer",
  "specialRequest": "string | null",
  "reservationTime": "timestamp",
  "tableNumber": "integer | null",
  "parking": "boolean",
  "preOrderId": "UUID | null",
  "totalAmount": "decimal",
  "paymentStatus": "enum('pending', 'completed', 'failed', 'refunded')",
  "reservationCode": "string",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```
### Items in Menu
```json
{
  "menuItemId": "UUID or ObjectId",
  "name": "string",
  "description": "string",
  "price": "decimal",
  "category": "string",
  "available": "boolean",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Pre-Orders
```json
{
  "preOrderId": "UUID or ObjectId",
  "reservationId": "UUID or ObjectId",
  "items": [
    {
      "menuItemId": "UUID or ObjectId",
      "quantity": "integer",
    }
  ],
  "totalAmount": "decimal",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Payments
```json
{
  "paymentId": "UUID or ObjectId",
  "reservationId": "UUID or ObjectId",
  "amount": "decimal",  
  "paymentMethod": "string",
  "paymentStatus": "enum('pending', 'completed', 'failed', 'refunded')",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Refunds (May be optional/not needed)
```json
{
  "refundId": "UUID or ObjectId",
  "reservationId": "UUID or ObjectId",
  "amount": "decimal",
  "refundStatus": "enum('pending', 'completed', 'failed')",
  "refundReason": "string | null",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Admins
```json
{
  "adminId": "UUID or ObjectId",
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "enum('owner', 'manager')",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### Static Restaurant Information (Stored in Config Collection)
Contains restaurant settings that do not change frequently
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "hours": "string",
  "maxTables": "integer",
  "maxParkingSpots": "integer",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

# Current Considerations
- User system or reservation system
- Database schema finalization
- Additional API endpoints
- Setup test environment
- API rate limits
- Analytics on admin dashboard (revenue, cancellation rate, refund statistics, etc.)
- Deployment and hosting (Vercel, other platforms)

# Updates
- Logging in and testing functionalities
- 