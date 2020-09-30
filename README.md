# Driwwwle
![Driwwwle Banner](https://i.imgur.com/ZNiCfjJ.jpg)

## The Idea 💡
We've all visited Dribbble atleast once, right ? You know, the cool place where designers go to showcase their projects and their work. Pretty cool, right ? So why not make such a website for the developers ? And hence, Driwwwle was born. Although there are websites like [Codepen](https://codepen.io/), I didn't really feel that it resembled what Dribbble is to designers. This is my first MERN stack project and I hope you like it.

## Getting Started 
Firstly, clone this repository.

```
git clone https://github.com/itsnitinr/driwwwle/
```

Okay so now that you've cloned the repo, let's take a look at the contents. 
The frontend or React part of the website lies in the `client` folder while the other files and folder in the root belong to the backend.
Now, let's install the dependencies. Go to the repo directory.
```
# Installing backend dependencies
yarn install

# Installing frontend dependencies
cd client
yarn install
```
**Feel free to use `npm install` instead of `yarn install` if that's what you prefer**

We're done with installing the dependencies, woohoo ! Now, let's set up some environment variables.
```
# Assuming you're in the root folder and not client folder
cd config
touch default.json
```

Okay, so what is this `default.json` file you ask ? We'll be using this to store our sensitive information like MongoDB URI, API key and more.
**This is how your `default.json` file should look like :**
```
{
  "MONGO_URI": "",
  "JWT_SECRET": "",
  "GITHUB_API_CLIENT_ID": "",
  "GITHUB_API_CLIENT_SECRET": "",
  "CLOUDINARY_CLOUD_NAME": "",
  "CLOUDINARY_API_KEY": "",
  "CLOUDINARY_API_SECRET": ""
}
```
Make sure you enter your own stuff with the quotes, like this:
`"JWT_SECRET": "doyouseriouslythinklol",`

And we're done setting up Driwwwle, yay !

## Running on Your Machine
```
npm run dev
```
**Make sure you run this command in the root directory and not the client directory**
This will run both the Express backend server and the React server. It's that easy.

## What Am I Using and Why ?
```
BACKEND:
  - axios                       Fetch user GitHub repos
  - bcryptjs                    Password encryption 
  - cloudinary                  Image cloud storage
  - config                      Storing sensitive information
  - express                     Backend server
  - express-validator           Server side form validation
  - gravatar                    Getting user's avatar
  - jsonwebtoken                Securing API endpoints and authorization
  - mongoose                    MongoDB ODM
  - multer                      Image upload
  - multer-storage-cloudinary   Upload image to cloudinary
  
FRONTEND:
  - axios                       Making API calls
  - moment & react-moment       Formatting dates and time
  - redux                       State management
  - react-redux                 State management
  - react-router-dom            Routing
  - react-slick                 Post image carousel
  - redux-devtools-extension    Redux DevTools
  - redux-thunk                 Middleware for async actions
  - slick-carousel              Slick carousel styles
  - uuid                        Generate unique alert ID
```

## Something From My Side
Hi, I'm Nitin. I made this project as a practice MERN project but I would love for the open source community to take it further than I alone can. At this moment, this website is in it's early stages. I'm still learning React and more about the MERN stack. If you would like to contribute to this repo, that would be a big help for me. This is and will remain an open-source website. Thanks for taking your time to read this.

## Some Screenshots
![Landing Page](https://i.imgur.com/wyXO2hR.png)
![Dashboard](https://i.imgur.com/dxrs6w8.png)
![All Posts Page](https://imgur.com/lWACj9S.png)
![Single Post Page](https://imgur.com/OEqfyK3.png)
![Developers Page](https://imgur.com/BEhQwya.png)
