# Holy: Web UI

## Introduction

Holy is an open-source web application, crafted by a team of volunteer engineers. While it's versatile enough to be used for any blog site, its primary design is aimed at serving Churches and Temples. While the website will be fully functional on desktop, its design and user experience are primarily optimized for mobile users, reflecting the prevailing trend of mobile dominance in internet usage today.

Holy UI is a React app built using (Vite)[https://vitejs.dev/] and (Material-UI)[https://mui.com/material-ui/getting-started/] for fast development. It uses Bun, an alternative to Node.js, to run your app. Here you'll find all the necessary files and instructions to get up and running with this project.

Note: This version of Holy UI utilizes (Material-UI)[https://mui.com/material-ui/getting-started/], a popular React UI library for building fast, scalable, and accessible applications.

## Prerequisites

1. Install Bun on your machine. (Node is also fine)
2. Basic understanding of React, Vite, and Material-UI.

> Note : If using npm use `--legacy-peer-deps` flag.

## Getting Started

1. Clone or download this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install the dependencies
   > `bun install`. (Node : npm install & then npm i @mui/styles --force)
4. Run the app
   > `bun dev`. (Node : npm run dev) Your app should now be running at http://localhost:3000

## Kanban board : clickup

signup for for fee and request admin for invite  
`https://app.clickup.com/9014227579/v/b/li/901402296735`

## API Testing platform : insomnia

signup for for fee and request admin for invite  
`https://insomnia.rest/`

## Code Structure

- **main.jsx**: The entry point of the application. It renders the root component of your app, which is <App />.
- **index.html**: The HTML file that contains the root element where your app will be mounted.
- **src/App.css**: Contains CSS styles for the App component.
- **src/App.jsx**: The main component of your application. It imports and uses the necessary libraries and utilities from Vite, Material-UI, and React.
- **package.json**: Contains metadata about your project, including its name, version, dependencies, and scripts.'

## Scope : Release 1 (Core Functionality)

1. Admin - The ability to create/edit pages,add content and upload media dynamically
2. Public - view, navigate and filter (date & global search)
3. Supported contents - Text,Pdf, Image, Audio, Video
4. Language - multi language support including autotranslate
5. Theme - light/Dark mode and Stye colors selectors

## Scope : Release 2

1. Donation manager - (with monthly subscription Feature)
2. Notification Manager (SMS)
3. User profile manager
4. My donations and Org statements viewer
5. Sentiment and Comment Integration

## Scope : Release 3

1. Chat engine
2. Pastoral care and Members manager

## License

MIT

**Free Software, Yeah always free !**
