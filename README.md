# Guess The Password

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### How to run
1. `npm install`
2. `npm start`
3. Optional `npm test`, then press `a`

Remember to run the [backend server](https://github.com/DuoPan/iag-backend).

### Project Structure
* 'src'->'GuessPassword': code of the page.
* 'src'->'GuessPassword'->'component': small component which may be reusable. They are focus on display and no business logic.
* 'src'->'GuessPassword'->'service': some API and constant which used in this project.
* 'src'->'index.js': The parent component and could be the entrance of this page, including some business logic.

### Supported Features
* when the server is not running: display loading icon and then error info.
* When the hints are lost from the server (ie. server restart), will display 404 error info.
* Input value validation: only allow digital numbers, no duplicate number and max length is 8.
* Input component contains a 'clear all' button.
* Input component support 'Enter' key. 
* Responsive and support mobile view.
* Allow running multiple games simultaneously.
* Styles and icons are based on Material UI.