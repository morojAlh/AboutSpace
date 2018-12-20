# AboutSpace

<!-- ![ezgif com-crop](https://user-images.githubusercontent.com/37349702/49332006-edf66100-f5b6-11e8-8456-5a9ab0ec1fce.gif) -->

## Table of Contents

* [Instructions](#instructions)
* [Introduction to application](#introduction-to-the-app)
* [Usage](#usage)
* [Next Step](#next-step)


## Instructions

About Space is my second project in WDI with GA, It's about how develop the client and server side.
In the project I create two HTML pages `index.html` it's the landeing page and `game.html`, also one file for styling `style.css` and one file for javascript `main.js`.

Files Structure:
```bash
├── index.js
├── README.md
├── package.json
├── public
│   └──  styles 
│     └── styles.css  
├── models
│   ├── app.js
│   ├── movie.js
│   ├── news.js
│   ├── session.js
│   └── user.js
├── controllers
│   ├── app_controller.js
│   ├── movie_controller.js
│   ├── news_controller.js
│   ├── profile_controller.js
│   ├── session_controller.js
│   ├── signin_controller.js
│   └── signup_controller.js
├── middleware
│    └── auth.js
├── db
│   ├── dbconfig.js
│   └── db.sql
└── views
    ├── index.html # Styles for your app. Feel free to customize this as you desire.
    ├── app # Helpful images for your app. Use at your discretion.
    │   ├── index.html
    │   ├── new.html
    │   └── show.html
    ├── movie # Helpful images for your app. Use at your discretion.
    │   ├── index.html
    │   ├── new.html
    │   └── show.html
    ├── news # Helpful images for your app. Use at your discretion.
    │   └── index.html
    ├── profile # Helpful images for your app. Use at your discretion.
    │   ├── index.html
    │   └── show.html
    ├── sginup # Helpful images for your app. Use at your discretion.
    │   └── index.html
    └── signin # Helpful images for your app. Use at your discretion.
        └── index.html
```

## Introduction to the app
"About Space" is a web application targeted those people that interested in Space, it collects movies, apps and news(soon) in one place.

- Home Page
<img width="350" alt="screen shot 2018-12-20 at 9 35 19 am" src="https://user-images.githubusercontent.com/37349702/50268175-d5050100-043a-11e9-85f6-cbea2609d860.png">


- Movies Page (index.html)
<img width="350" alt="screen shot 2018-12-20 at 9 34 04 am" src="https://user-images.githubusercontent.com/37349702/50268476-07632e00-043c-11e9-9986-7f559af7b099.png">

- Apps Page (index.html)
<img width="350" alt="screen shot 2018-12-20 at 9 34 17 am" src="https://user-images.githubusercontent.com/37349702/50268622-86f0fd00-043c-11e9-9d71-951285d7313c.png">

- Signup Page
<img width="350" alt="screen shot 2018-12-20 at 9 34 27 am" src="https://user-images.githubusercontent.com/37349702/50268658-aa1bac80-043c-11e9-97ad-fc2d1a2a70d1.png">

- Signin Page
<img width="350" alt="screen shot 2018-12-20 at 9 34 39 am" src="https://user-images.githubusercontent.com/37349702/50268691-c7e91180-043c-11e9-8356-019f5a5cd3b5.png">

- Proile Page
<img width="350" alt="screen shot 2018-12-20 at 9 35 42 am" src="https://user-images.githubusercontent.com/37349702/50268721-dd5e3b80-043c-11e9-854a-936072038573.png">

You can view the web from [Here](https://morojalh.github.io/AboutSpace/).

## Usage

- **apod-nasa**:
  Astronomy Picture Of The Day. It's an npm package install by `npm install --save apod-nasa`
  For current date:
  ```
  const apod = require('apod-nasa');
 
    apod().then(data => {
     console.log(data);
    /*
      {
        title: 'The Summer Triangle over the Great Wall',
        image: 'https://apod.nasa.gov/apod/image/1707/GreatWallMilkyWay_Yu_1686.jpg'
      }
    */
    });
  ```
  [Learn More](https://www.npmjs.com/package/apod-nasa)

- **Google Fonts API**:
  Setup your code with Google Fonts API by putting this code in the `<head>` of HTML page.
  ```
  <link href="https://fonts.googleapis.com/css?family=Font+Name" rel="stylesheet">
  ```
  replace `Font+Name` with the font you want form haer [Google Fonts](https://fonts.google.com).

  I used [Chakra Petch](https://fonts.google.com/specimen/Faster+One) for all text in pages and [Faster One](https://fonts.google.com/specimen/Chakra+Petch) only for the header in `inedx.html`.

  [Learn More](https://fonts.google.com)

- **Bootstrap**:
    Bootstrap is an open source toolkit for developing with HTML, CSS, and JS. Copy-paste the stylesheet `<link>` into your `<head>` before all other stylesheets to load our CSS.
    ```
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
    integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
    crossorigin="anonymous">
    ```
    [Learn More](https://getbootstrap.com)


## Next Step

There are some features I want to add in the web appliction:
- Add the news page.
- Add more movies and apps.
- Edit the style!