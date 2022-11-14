# Plan maker

Mobile application (currently fitted for IOS) that helps execute planned goals.

The app was built using TypeScript and React Native.

## Features
The main goal of the app is to visualize and summarize progress in each project created by the user, which can be then tracked by other people (selected by the project creator) 

User can:
- create projects
- describe tasks in each project
- specify the weekly amount of work hours per project
- add collaborators to each project who can track the progress
- send messages to added collaborators


## Base dependencies

- [expo](https://docs.expo.dev/index.html) for easier development.
- [react-navigation](https://reactnavigation.org/) navigation library.
- [firebase](https://reactnavigation.org/) backend as a service platform.
- [redux](https://redux.js.org/) for state management.
- [redux-thunk](https://github.com/gaearon/redux-thunk) to dispatch asynchronous actions.
- [jest](https://facebook.github.io/jest/) for testing.

## Installation

- Firstly, you need to add your firebase config data to the ```config/keys.ts``` file
- Then install all the required packages with ```npm install```
- Finally, you can run the application with ```npm start```

## Preview

<p align="center">
   <img src="https://github.com/Michal3333/MasterApp/blob/master/screenshots/log.gif" width="250"/>
   <img src="https://github.com/Michal3333/MasterApp/blob/master/screenshots/gif1_720.gif" width="250"/>
   <img src="https://github.com/Michal3333/MasterApp/blob/master/screenshots/gif2_720.gif" width="250"/>
</p>

<p align="center">
   <img src="https://github.com/Michal3333/MasterApp/blob/master/screenshots/login_neutral.jpg" width="250"/>
   <img src="https://github.com/Michal3333/MasterApp/blob/master/screenshots/summary_1.PNG" width="250"/>
   <img src="https://github.com/Michal3333/MasterApp/blob/master/screenshots/invitations.PNG" width="250"/>
</p>

<p align="center">
   <img src="https://github.com/Michal3333/MasterApp/blob/master/screenshots/edit_project.PNG" width="250"/>
   <img src="https://github.com/Michal3333/MasterApp/blob/master/screenshots/project_details.PNG" width="250"/>
   <img src="https://github.com/Michal3333/MasterApp/blob/master/screenshots/contributors.PNG" width="250"/>
</p>
