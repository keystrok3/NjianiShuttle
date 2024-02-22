
# NJIANI SHUTTLE SERVICE Ticketing Application

## What it is
- It's an online web service for selling tickets for a van shuttle company.
- It's made up of 2 primary components:
    * A Frontend for the client.
    * A Backend API for the server.

## Tech Stack
* JavaScript
* React library
* Expressjs backend framework
* PostgreSQL database
* Sequelize ORM


## Service it provides to User.
1. A selection of Booking Offices. 
2. List of available cars in each station with (departure time and destination).
3. List of routes.
4. Ticket prices.
5. Booking service (Selecting a car, destination, and departure datetime, and buying a ticket).
6. Possibility of discount for early booking.
7. Sending Ticket to email address.
8. Cancelling bookings (atleast 2 days before departure date, with a fine (20% of fare))


## Requirements

## Back-end API services

### 1. User Auth Service
- Requirements:
    * User registration
    * User authentication
    * Password recovery

### 2. Booking Service
- Requirements:
    * Maintaining Record of Shuttle Offices/Stations.
    * Maintaining and updating record of available cars in each station.
    * Maintaining and updating record of available seats in each car.
    * Providing list of available cars and their departure times in each station.

### 3. Transaction Processing Service
- Requirements:
    * Recording of completed transactions.
    * Generation of printable PDF tickets.
    * Emailing of PDF tickets to users.

## Database Models

### 1. User Model
- Table name: user
- Attributes: national_id, first_name, last_name, email, password, reset_password_token

### 2. Cars
- Table name: car
- Attributes: car_registration, current_station (from destinations), departure_time

### 3. Car Seats
- Table name: car_seats
- Attributes: seat_id, car_id

### 4. Destinations
- Table name: destination 
- Self-referencing
- Attributes: location_name, office_hours

### 5. Routes
- Table name: route
- Attributes: route_id, destination_1_id, destination_2_id
- (The two destinations cannnot be the same)

### 6. Bookings
- Table name: bookings
- Attributes: booking_id, user_id (national_id), transaction_id, car_id, origin, destination, departure_datetime, cancelled(true/false)

### 7. Payment Transactions
- Table name: payments_transactions
- Attributes: transaction_id, user_id, amount, discount, timestamp

### 8. Fare Refunds 
- Table name: fare_refunds
- Attributes: refund_id, user_id, transaction_id, amount, timestamp
