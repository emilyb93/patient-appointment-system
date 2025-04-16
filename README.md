# Healthcare Patient Management Tech Test

## Project Overview

You'll be building a simplified patient management system focusing on appointment scheduling and basic patient information management. The goal is to demonstrate your ability to write clean, maintainable code with proper separation of concerns.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create environment file:
   ```bash
   cp .env.example .env
   ```
3. Start the database via Docker - this will attempt to run on port 5432 so make sure to close any PSQL instances you have running as this will conflict. Make sure to agree if it asks you about password replacement as this will create the password in your .env file from the previous step.
   ```bash
   ./start-database.sh
   ```
4. Insert your tables from the database schema with Drizzle ORM
   ```bash
   npm run db:push
   ```
5. Seed your database with some patients

   ```bash
   npm run seed:patients
   ```

6. Run the application locally to inspect your patients! Enjoy!
   ```bash
   npm run dev
   ```

## Design Choices

To read up on my design choices and how they pertain to the brief, please check out [design-choices.md](./design-choices.md)
