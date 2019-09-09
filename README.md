# Todo Task app

[![Netlify Status](https://api.netlify.com/api/v1/badges/a2f32578-efdf-4524-ad46-7b218d04bb0e/deploy-status)](https://app.netlify.com/sites/happy-edison-a2dd8a/deploys)

## App Link

You can see in action [here](https://happy-edison-a2dd8a.netlify.com/).

## Features

- Sign In
- Sign Up
- Sign Out
- Password Forget
- Verification Email
- Protected Routes with Authorization
- Social Logins with Google
- Auth Persistence with Local Storage
- Database with Users and Task list
- Create New Task
- Task based on category
- Add title, task category, task details,task status,and task due date
- Update task status
- Edit selected task
- Delete task

## Stack

- ReactJS
- Hooks,
- Suspance,
- Styled-component,
- Fromik,
- Yup,
- Redux,
- Redux-saga,
- Firebase,

## This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Firebase Configuration

- copy/paste your configuration from your Firebase project's dashboard into

  - replace new.env with .env in root and add the firebase configuration

### Activate Sign-In Methods

Enable Authentication > Sign-in method > then enable for the email and google Sign-in method

- Email/Password
- Google

### Security Rules

```
{
  "rules": {
    ".read": false,
    ".write": false,
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid || root.child('users/'+auth.uid).child('roles').hasChildren(['ADMIN'])",
        ".write": "$uid === auth.uid || root.child('users/'+auth.uid).child('roles').hasChildren(['ADMIN'])"
      },
      ".read": "root.child('users/'+auth.uid).child('roles').hasChildren(['ADMIN'])",
      ".write": "root.child('users/'+auth.uid).child('roles').hasChildren(['ADMIN'])"
    },
    "task": {
      ".read": true,
      ".write": true,
    },
  }
}
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

### Deployment

### `npm run build`
