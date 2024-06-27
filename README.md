# Vite Booking Application

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)

## Overview
The Vite Booking Application is a modern web application built with the Vite build tool. It provides users with a form to book tickets for various events. Once a booking is made, a confirmation page is displayed, and the booking information is sent to a backend service for processing.

## Architecture
The application follows a microservice architecture and is part of an event-driven system. The key components include:
- **Frontend**: Built with React and Vite for a fast and responsive user interface.
- **Backend**: A JavaScript-based service running on Google Cloud Platform (GCP) that handles booking requests.
- **Event-Driven Communication**: Utilizes GCP's Pub/Sub for asynchronous communication between services.
Microservice Architecture

This approach leverages modern web development tools and practices, offering several advantages:

    Scalability and Flexibility: The microservice architecture allows for scalable and flexible development, where services can be updated or replaced independently.
    Event-Driven Design: Asynchronous communication via Pub/Sub ensures that services can handle tasks efficiently and independently, improving the overall responsiveness and resilience of the system.
    Cloud Integration: Utilizing GCP for backend services and Pub/Sub ensures reliable and scalable infrastructure, reducing the burden of managing server infrastructure.

Event-Driven Communication

The use of Google Cloud Pub/Sub allows the application to handle asynchronous communication effectively. When a booking is made, the frontend sends the data to the backend service, which publishes an event to Pub/Sub. Other services can subscribe to this event to perform actions such as sending confirmation emails, updating databases, or triggering additional workflows.
Improvements

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/vite-booking-app.git
   cd vite-booking-app
```
2. Install dependencies
```sh
npm install
# or
yarn install
```

### Running the App
```sh
npm run dev
# or
yarn dev
```
The application will be available at http://localhost:5173.
