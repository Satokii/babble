# Babble

## Description

Babble is a full-stack real-time chat application. The app has a sign up and sign in function, allows a user to add friends and send instant messages which update in real time.

This is the first app I have developed using the Next.js framework as well as TypeScript and Tailwind CSS. In addition to this, I have used the Next Auth library for the authentication which helped with the sign up and sign in function as well as to implement a Google OAuth login option for the user. To help with the security when signing up and signing in, I have used Bcrypt for the password hashing. For the database I used Redis on the Upstash platform due to the low latency which helps with the real-time aspect of an instant messenger app, and Pusher in order to implement this real-time aspect.

## Install and Run

- Fork this repository
- Clone the forked repository to your local machine
- In the root directory, run `npm ci` to install dependencies
- Create a new Redis database on the [Upstash](https://upstash.com/docs/redis/overall/getstarted) platform
- Create a new Channel on [Pusher](https://pusher.com/)
- Rename the `.env.example` file to `.env.local`
- In your `.env.local` file change add your relevant keys
- Finally use `npm run dev` to run the application in your browser
