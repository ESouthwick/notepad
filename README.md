# Angular Notepad App

This is a simple notepad application built with Angular, featuring note creation, categorization, drag-and-drop functionality, and a streamlined UI. The app utilizes Angular Material for UI components and Angular CDK for its drag-and-drop capabilities. Notes are organized into predefined categories (e.g., Play, Work, Family, Home, Other) and can be edited, deleted, or moved between categories via drag-and-drop.

## Table of Contents

* [Features](#features)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Usage](#usage)
* [Project Structure](#project-structure)

## Features

* **Create, Edit, and Delete Notes:** Easily add new notes, modify existing ones, or remove them through an intuitive user interface.
* **Categorize Notes:** Organize your thoughts and ideas into predefined categories: Play, Work, Family, Home, and Other.
* **Drag-and-Drop:** Seamlessly move notes between different categories or rearrange them within the same category using the power of Angular CDK drag-and-drop.
* **Streamlined UI:** Enjoy a clean and focused design for note cards, featuring a vertical drag handle on the right, a delete icon at the bottom-right, and interactive hover effects.
* **Theme Support:** Switch between a light and a dark theme to suit your preference and environment.
* **Local Storage:** Your notes are persistently stored in the browser's local storage, ensuring your data is saved across sessions.
* **Responsive Design:** The application adapts gracefully to various screen sizes, providing a consistent experience on desktops, tablets, and mobile devices.

## Prerequisites

Before setting up the project, make sure you have the following installed on your system:

* **Node.js:** (v16 or later recommended) - [Download Node.js](https://nodejs.org/)
* **npm:** (v8 or later recommended) - Typically installed with Node.js. Verify with `npm -v`.
* **Angular CLI:** (v17 or later recommended) - Install globally using:

    ```bash
    npm install -g @angular/cli
    ```

## Installation

Follow these steps to get the Angular Notepad App running on your local machine:

1.  **Clone the Repository:**

    ```bash
    git clone [https://github.com/your-username/angular-notepad-app.git](https://github.com/your-username/angular-notepad-app.git)
    cd angular-notepad-app
    ```

2.  **Install Dependencies:**

    Navigate to the project directory and run:

    ```bash
    npm install
    ```

3.  **Install Angular Material and CDK:**

    If you haven't already, add Angular Material for UI components and Angular CDK for drag-and-drop functionality:

    ```bash
    ng add @angular/material
    npm install @angular/cdk
    ```

4.  **Run the Application:**

    Start the development server by executing:

    ```bash
    ng serve
    ```

    Open your web browser and navigate to `http://localhost:4200` to view the application.

## Usage

Here's how to interact with the Angular Notepad App:

* **View Notes:**
    * Notes are displayed in a responsive grid, neatly organized under their respective categories: Play, Work, Family, Home, and Other.
    * Each note card presents the note's title and a brief preview of its content (truncated to the first 50 characters).

* **Add a Note:**
    * Open the sidenav (typically triggered by an "Add Note" button or similar UI element).
    * Provide a title and the main content for your new note.
    * Select the desired category for the note.
    * Save the note.

* **Edit a Note:**
    * Click on the bottom-right area of a note card (where the edit functionality is typically located, even if the button is visually subtle).
    * The sidenav will open, pre-filled with the selected note's details.
    * Modify the title, content, or category as needed.
    * Save your changes.

* **Delete a Note:**
    * Locate the trash can icon at the bottom-right of the note card.
    * Click the icon to permanently remove the note.

* **Move Notes:**
    * Identify the vertical drag handle (⋮⋮) situated on the right side of each note card.
    * Click and drag the handle to move the note card.
    * Drop the note card onto a different category to reassign it, or within the same category to change its order.

* **Toggle Theme:**
    * Look for a theme toggle switch or button in the application's UI (if implemented).
    * Use it to switch between the light and dark color themes.

## Project Structure

The project is organized into the following key directories and files:

```src/
├── app/
│   ├── model/
│   │   └── note.model.ts          # Defines the interfaces for Note and CategorizedNotes
│   ├── services/
│   │   ├── note.service.ts        # Manages note data (CRUD operations, drag-and-drop logic)
│   │   ├── theme.service.ts       # Handles the application's theme switching functionality
│   │   └── sidepanel.service.ts   # Controls the behavior and state of the sidenav component
│   ├── notes-list/
│   │   ├── notes-list.component.ts # Component responsible for displaying and interacting with lists of notes
│   │   ├── notes-list.component.html # HTML template for rendering the notes list
│   │   └── notes-list.component.scss # Styles specific to the notes list component
│   └── app.module.ts              # The main application module (or setup for standalone components)
└── styles.scss                    # Global style definitions for the application
```
**Key Components:**

* **`NotesListComponent`:** This component displays notes organized by category, handles user interactions like drag-and-drop, and provides functionality for editing and deleting notes.
* **`NoteService`:** This service is central to managing note data. It handles creating, reading, updating, and deleting notes, as well as organizing them into categories and persisting them in local storage.
* **`ThemeService`:** This service manages the application's theme, allowing users to switch between light and dark modes. It typically uses an observable to notify components of theme changes.
* **`SidenavService`:** This service controls the visibility and data flow for the sidenav component, which is used for adding and editing notes.

**Feel free to suggest improvements or report issues. Happy note-taking!**
