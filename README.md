
# Mini Social Network

The mini social network is a web application developed using the MERN (MongoDB, Express.js, React, Node.js) stack. The project includes features such as user authentication, publication creation, and a dashboard displaying user publications. The server is implemented using Express.js, connects to a MongoDB database, and provides API endpoints for user and publication-related operations. The front end is built with React, and the application includes functionalities like user registration, login, publication creation, and viewing a feed of publications. The code also demonstrates the use of React Query for managing data fetching and mutations, and it uses Material-UI for styling the user interface.
## Features
- User Authentication: Users can register with the application, providing necessary details such as username, email, and password. Authentication is implemented using tokens, likely JWT (JSON Web Tokens).

- User Dashboard: Authenticated users have access to a dashboard displaying a feed of publications. The dashboard provides a centralized view of shared content, possibly sorted by date.

- Publication Creation: Users can create publications by entering text and optionally providing an image URL. The created publications are stored in a MongoDB database.

- Publication Feed: The application displays a feed of publications, likely in a timeline format. Publications are sorted by date, showing the most recent content first.

- Form Validation: React Hook Form is used for form validation in the user registration and publication creation forms. Validation rules ensure that users provide the required information in the correct format.

- Logout Functionality: Authenticated users can log out of the application, removing their session data from local storage.
## Technologies Used

- MongoDB

- ExpressJS

- ReactJS

- NodeJS
## App Demo

https://mini-social-network.netlify.app
