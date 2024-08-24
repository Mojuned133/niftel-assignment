# niftel-assignment

## Overview

This Image Editor is a simple web application that allows users to upload images, apply various effects like blur, rotate, zoom, and download the edited image. The project is built using Node.js with Express.js for the backend, EJS for templating, and basic front-end technologies like HTML, CSS, and JavaScript.

## Features

- **Image Upload**: Users can upload images for editing.
- **Custom Background Upload**: Users can upload custome background for editing Image.
- **Image Effects**: Apply blur effects to Background.
- **Image Manipulation**: Rotate and zoom images within the editor.
- **Image Download**: Download the edited image as a PNG file.

## Installation

### Prerequisites

- Node.js (v14 or above)
- npm (Node Package Manager)
- Express.js
- ejs (for reading index.ejs file)

### Steps

1. **Clone the repository:**

   ```bash
   https://github.com/Mojuned133/niftel-assignment.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd niftel-assignment
   ```
3. **Install dependencies:**
    ```bash
    npm install
    ```
4. **Run the application:**
    ```bash
    node index.js
    ```
5. **Access the application**
    - Open your web browser and navigate to `http://localhost:3000` to access the UI.

## Project Structure
1. index.js: Main server file that handles routes and serves the application.
2. views/: Contains the EJS templates for rendering the UI.
3. public/: Static files like CSS, JavaScript, and images.
    - images/: Directory where the image files are stored.
    - stylesheets/: Contains the CSS files.
    - javascripts/: Contains the JavaScript files.

    ### Usage
    1. Upload Image: On the homepage, click on the upload button to select an image from your file system.
    2. Apply Effects: Use the provided controls to rotate, zoom, or apply blur effects to the uploaded image.
    3. Download Image: Once satisfied with the edits, click the download button to save the image to your computer.

### Contact
For any questions or feedback, please contact "mojunedgazi@gmail.com" .
