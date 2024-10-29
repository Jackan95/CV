# Resume Website
#### Video Demo:  [(https://youtu.be/S1e1LtdqMoE)]
## Project Description

This project is an interactive and innovative way of displaying my resume for future employers. Inspired by graphic designers' unique twists on displaying their work on their websites, I decided to create something similar. This project is inspired by Pokémon RPG games and is designed to showcase multiple skills, not only through text but also by interacting with the website. It demonstrates knowledge and skills in graphic design, Photoshop, Python, Flask, JavaScript, HTML, CSS, SQLAlchemy, asynchronous programming, REST and more. Right now the website shows my Bachelor's degree, my future CS50 certificate and an interactive to check out my linkedIn. I had an idea of also displaying my graphic design work when you interact with the closet in the bottom left but the project was starting to get a lot bigger than anticipated so I left it out in order to be on time with submitting this assignment. 

Despite having limited experience in game development, I conducted extensive research on the topic. I found Drew Conly on YouTube, who provided an excellent tutorial series on game development concepts and building 2D RPG games.

## Project Documentation

### Controls
Use the arrow keys to move around. To interact with wall decor and the computer, press 'E' while standing in front of and facing the object. When in first-person view of the computer, use your mouse to navigate.


### Python Files

#### app.py:
Description: Main application file that initializes the Flask app, sets up configurations, and creates the SQL database and tables. It handles routes such as registering and logging in as well as managing sessions. This file incorporates previous work and new concepts on session handling and login verification without relying on CS50 libraries. I also have a lot of security measures in the backend to ensure that users don't alter the submitted information by bypassing my front-end measures in the different html files. 

#### config.py:
Description: There should be a config.py file, but since this work is not being deployed for real-life use and needs to be pushed to CS50, I have decided to leave it out. I will implement this outside of the hand-in.

### HTML Files

#### templates/index.html:
Description: Main HTML template for the application, including the structure and layout of the homepage. This is where the user is sent after logging in. The page allows users to play the game and leave comments. Initially, the comment section was asynchronous, but after implementing the login animation, it reloaded every time a comment was submitted. Therefore, I implemented asynchronous programming for a smoother user experience. I also disabled some default functions, like scrolling with arrow keys, as they interfered with game movement.

#### templates/comments.html:
Description: Used for rendering the comments section after submitting a comment. It dynamically updates the comments without refreshing the page.

#### templates/login.html:
Description: Used for rendering the login page. This is where users log in to access the main page.

#### templates/registering.html:
Description: Used for rendering the registration page. Here, new users can be created.

### CSS Files

#### static/css/styles.css:
Description: CSS file containing the styles for the application. I chose a black theme to match the typical background of 2D games, providing a more immersive experience. The pixelated font complements the game's vibe.

### JavaScript Files

#### static/js/DirectionInput.js:
Description: Captures the arrow keys pressed by the user. It stores the current arrow keys being pressed and deletes them when the user releases the key.

#### static/js/GameObject.js:
Description: Defines the GameObject class for configuring game objects. In this case, the only game object is the player character.

#### static/js/init.js:
Description: Initializes the game and starts the game loop.

#### static/js/Overworld.js:
Description: Runs the game loop and handles all interactive components, such as displaying text, moving, and changing maps.

#### static/js/OverworldMap.js:
Description: Defines the OverworldMap class for configuring maps in the game. It includes maps for the computer screen and the bedroom and creates boundaries/locations for the maps.

#### static/js/Person.js:
Description: Manages the movement of the sprite. It checks if the character can move to a new position and determines the direction based on input parameters. The connection between `DirectionInput` and `Person` is handled in the game loop within `Overworld.js`, where it continuously checks and updates the player's actions.

#### static/js/Sprite.js:
Description: Draws the sprite and handles all animations. It splits up different animation frames and cycles through them based on input.

#### static/js/utils.js:
Description: Provides utility functions for handling grid-based calculations and pixel conversions.

### SQL
Description: I decided to have two tables. One for storing users and one for storing comments. To effectively view who sent a comment I decided to make the primary key of the User table a foreign key to the comments table. This will help distinct between comments since there is no risk of two people having the same ID compared to name. I also used SQLAlchemy's relationship function to easily access a users comments. 


