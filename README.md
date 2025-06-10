# Angular Notepad App

This is a simple notepad application built with Angular and Node.js, featuring note creation, categorization, drag-and-drop functionality, and a streamlined UI. The app utilizes Angular Material for UI components, Angular CDK for its drag-and-drop capabilities, and MongoDB for persistent data storage. Notes are organized into predefined categories (e.g., Play, Work, Family, Home, Other) and can be edited, deleted, or moved between categories via drag-and-drop.

## Table of Contents

* [Features](#features)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Project Structure](#project-structure)
* [API Endpoints](#api-endpoints)

## Features

* **Create, Edit, and Delete Notes:** Easily add new notes, modify existing ones, or remove them through an intuitive user interface.
* **Categorize Notes:** Organize your thoughts and ideas into predefined categories: Play, Work, Family, Home, and Other.
* **Drag-and-Drop:** Seamlessly move notes between different categories or rearrange them within the same category using the power of Angular CDK drag-and-drop.
* **Streamlined UI:** Enjoy a clean and focused design for note cards, featuring a vertical drag handle on the right, a delete icon at the bottom-right, and interactive hover effects.
* **Theme Support:** Switch between light, dark, and purple themes to suit your preference and environment.
* **MongoDB Integration:** Your notes are persistently stored in MongoDB, ensuring your data is safely stored and accessible across sessions.
* **RESTful API:** The application uses a Node.js backend with Express to provide a robust API for note management.
* **Responsive Design:** The application adapts gracefully to various screen sizes, providing a consistent experience on desktops, tablets, and mobile devices.

## Prerequisites

Before setting up the project, make sure you have the following installed on your system:

* **Node.js:** (v16 or later recommended) - [Download Node.js](https://nodejs.org/)
* **npm:** (v8 or later recommended) - Typically installed with Node.js. Verify with `npm -v`.
* **Angular CLI:** (v17 or later recommended) - Install globally using:

    ```bash
    npm install -g @angular/cli
    ```

* **MongoDB:** (v6.0 or later recommended) - [Download MongoDB](https://www.mongodb.com/try/download/community)

## Installation

Follow these steps to get the Angular Notepad App running on your local machine:

1. **Clone the Repository:**

    ```bash
    git clone [https://github.com/your-username/angular-notepad-app.git](https://github.com/your-username/angular-notepad-app.git)
    cd angular-notepad-app
    ```

2. **Set Up Environment Variables:**

    Create a `.env` file in the `backend` directory with the following content:
    ```
    MONGODB_URI=mongodb://localhost:27017/notepad
    ```

3. **Install Dependencies:**

    Install both frontend and backend dependencies:
    ```bash
    # Install frontend dependencies
    npm install

    # Install backend dependencies
    cd backend
    npm install
    cd ..
    ```

4. **Install Angular Material and CDK:**

    If you haven't already, add Angular Material for UI components and Angular CDK for drag-and-drop functionality:

    ```bash
    ng add @angular/material
    npm install @angular/cdk
    ```

5. **Start the Backend Server:**

    In the `backend` directory, start the Node.js server:
    ```bash
    cd backend
    npm start
    ```

6. **Run the Frontend Application:**

    In a new terminal, start the Angular development server:
    ```bash
    ng serve
    ```

    Open your web browser and navigate to `http://localhost:4200` to view the application.

## API Endpoints

The backend provides the following RESTful API endpoints:

* `POST /api/notes` - Create a new note
* `GET /api/notes` - Retrieve all notes
* `GET /api/notes/:id` - Retrieve a specific note by ID
* `PUT /api/notes/:id` - Update a specific note
* `DELETE /api/notes/:id` - Delete a specific note

## Project Structure

The project is organized into the following key directories and files:

```
├── src/                      # Frontend Angular application
│   ├── app/
│   │   ├── model/
│   │   │   └── note.model.ts                   # Defines the interfaces for Note and CategorizedNotes
│   │   ├── services/
│   │   │   ├── note.service.ts                 # Manages note data (CRUD operations, drag-and-drop logic)
│   │   │   ├── theme.service.ts                # Handles the application's theme switching functionality
│   │   │   └── sidepanel.service.ts            # Controls the behavior and state of the sidenav component
│   │   └── components/
│   │       ├── notes-form/
│   │       │   ├── notes-form.component.ts     # Component for displaying and interacting with a note
│   │       │   ├── notes-form.component.html   # HTML template for the note
│   │       │   └── notes-form.component.scss   # Styles for the note component
│   │       └── notes-list/
│   │           ├── notes-list.component.ts     # Component for displaying and interacting with lists of notes
│   │           ├── notes-list.component.html   # HTML template for the notes list
│   │           └── notes-list.component.scss   # Styles for the notes list component
│   └── styles.scss                             # Global style definitions
│
└── backend/                   # Backend Node.js application
    ├── server.js              # Express server setup and API endpoints
    ├── mongodb.service.js     # MongoDB connection and CRUD operations
    └── .env                   # Environment variables (create this file)
```

**Key Components:**

* **Frontend:**
  * **`NotesListComponent`:** Displays notes organized by category, handles user interactions like drag-and-drop, and provides functionality for editing and deleting notes.
  * **`NotesFormComponent`:** Displays a form for note creation, handles user inputs for each part of the note, and provides functionality for editing.
  * **`NoteService`:** Manages note data through HTTP requests to the backend API.
  * **`ThemeService`:** Manages the application's theme, allowing users to switch between light, dark, and purple modes.

* **Backend:**
  * **`server.js`:** Sets up the Express server and defines API endpoints.
  * **`mongodb.service.js`:** Handles MongoDB connection and provides CRUD operations for notes.

**Feel free to suggest improvements or report issues. Happy note-taking!**
