# MEDICAL APPOINTMENT

A hospital's medical appointment booking system.
The system has different roles such as staffs, doctors and patients.

Staffs can add and edit new doctors and specialties in the system, they can also add patients and book appointments for a specific day.

Each request made must have a valid jwt obtained after logging in with a Staff account.

### Getting Started

To get started with this project, follow these steps:

- Clone the repository: git clone https://github.com/franrodriguez1993/medicalAppointments-API.git
- Install dependencies: npm install
- Copy the example .env file and fill in the appropriate values: cp .env.example .env
- Create a PostgreSQL database and update the .env file with the database URL.
- Install nodemon for development: npm i nodemon -D

### Start project:

For testing:

- npm run test:staff
- npm run test:doctor
- npm run test:patient
- npm run test:appointment

For build:

- npm run build

For start:

- npm run start:dev
- npm run start

Documentation:

https://documenter.getpostman.com/view/22341124/2s93sc3XfW
