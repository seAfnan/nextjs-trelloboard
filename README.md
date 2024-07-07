# Trelloboard

This is a Trelloboard application built with Next.js, MySQL, Prisma, and Radix UI. Users can add, update, and delete tasks with statuses OPEN, IN_PROGRESS, and CLOSED. Users can change the status and add more details to tasks but cannot change the task name. The application also supports light and dark modes.

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [MySQL](https://www.mysql.com/) (version 5.7 or later)
- [Prisma](https://www.prisma.io/)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/trelloboard.git
cd trelloboard
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Set up the MySQL database:**

Make sure you have a MySQL server running. Create a new database for the project. Update the `DATABASE_URL` in your `.env` file with your database connection details. 

```env
DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/DATABASE
```

4. **Run Prisma migrations to set up the database schema:**

```bash
npx prisma migrate dev
# or
yarn prisma migrate dev
# or
pnpm prisma migrate dev
```

### Running the Development Server

1. **Start the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

2. **Open your browser and navigate to:**

[http://localhost:3000](http://localhost:3000)

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Light/Dark Mode

The application supports light and dark modes. You can switch between them using the toggle provided in the UI.

## Learn More

To learn more about Next.js, Prisma, and other technologies used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Prisma Documentation](https://www.prisma.io/docs) - learn about Prisma features and API.
- [Radix UI Documentation](https://radix-ui.com/docs/primitives/overview/introduction) - learn about Radix UI components.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

### Additional Instructions for Windows Users

If you are on Windows, ensure you have the correct setup for MySQL and environment variables:

1. **Install MySQL:**

You can download and install MySQL from [MySQL's official website](https://dev.mysql.com/downloads/installer/). Follow the instructions to set up MySQL on your system.

2. **Set environment variables:**

Ensure your `.env` file contains the correct paths for your MySQL setup. You might need to adjust the `DATABASE_URL` depending on your installation path and credentials.

### Additional Instructions for macOS Users

If you are on macOS, follow these additional steps to ensure proper setup:

1. **Install MySQL using Homebrew:**

If you use Homebrew, you can install MySQL with the following command:

```bash
brew install mysql
```

2. **Start MySQL server:**

After installation, start the MySQL server:

```bash
brew services start mysql
```

3. **Set environment variables:**

Ensure your `.env` file contains the correct paths for your MySQL setup. Update the `DATABASE_URL` with the appropriate credentials.

---
