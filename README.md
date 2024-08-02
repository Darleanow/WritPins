# WritPins

WritPins is a collaborative platform for writers and creatives, offering a space to share, discover, and engage with creative pins. Each pin represents a unique piece of content, such as a story, article, or creative idea. Users can create, view, and manage their pins while exploring content from others.

The project has been made using Next.js, Tailwind, and Firebase (Auth&Storage).

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Features

- **Create Pins**: Share your stories, articles, or ideas with the community.
- **View Pins**: Explore pins from other users, filter by tags, and get inspired.
- **User Management**: Sign up, log in.
- **Pin Management**: Delete your pins easily.
- **Responsive Design**: Enjoy a seamless experience on any device.

## Installation

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Setup

1. **Clone the repository**

   ```bash
   git clone git@github.com:Darleanow/WritPins.git
   cd WritPins
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the application**

   ```bash
   npm run dev
   ```

   The app should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

### Creating an Account

- Click on "Register" to create a new account. Provide your full name, email, and password.

### Creating Pins

- After logging in, click on the "+" button to create a new pin. Fill in the title, content, and tags.

### Viewing and Managing Pins

- View your pins on the "My Pins" page. Click on a pin to view details, or delete it.

### Filtering Pins

- Use the filter button to filter pins by tags. Select the tags you're interested in, and apply the filter.

## Project Structure

```
.
.
├── app/
│   ├── [..all]
│   ├── page.tsx # Static parameters
│   ├── contexts/
│   │   ├── authContext.tsx # Auth context for security
│   │   ├── firebaseConfig.tsx # Config, hardcoded, it's a school project
│   │   ├── layout.tsx # Main Layout
│   │   └── page.tsx # Entry Point
├── components/ # All the components
│   ├── pages/ # All the app pages
│   │   ├── Feed.tsx
│   │   ├── Lists.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Settings.tsx
│   │   └── Tabs.tsx
│   ├── Routing/ # Secure routing
│   │   └── PrivateRoute.tsx
│   ├── ui/ # More components, action specific
│   │   ├── Card.tsx
│   │   ├── CreatePinModal.tsx
│   │   ├── FeedCard.tsx
│   │   ├── FilterPinsModal.tsx
│   │   └── PinCard.tsx
│   └── utils/
│       └── utils.ts
├── AppShell.tsx # Securing app
├── ios/
├── mock/ # Data structure of pins
├── .gitignore
├── package.json
└── README.md
```