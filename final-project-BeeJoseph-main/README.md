# Web Development Final Project - *NailHub*

Submitted by: **Besenja Joseph**

Z Number: **Z23746689**

This web app: **NailHub is a community forum for nail enthusiasts to share tips, designs, and techniques. Users can create posts about gel-x, hard gel, acrylic, lacquer, nail shapes, nail regeneration, and more. Posts support images, upvotes, and comments. The app includes full user authentication and AI-generated post summaries.**

Deployed at: **[your-netlify-url-here]**

Time spent: **5** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **A create form that allows the user to create posts**
  - Posts require a title
  - Posts optionally include additional textual content
  - Posts optionally include an image added as an external image URL
- [x] **A home feed displaying previously created posts**
  - Home feed shows creation time, title, and upvotes count for each post
  - Clicking on a post directs the user to a new page for that post
- [x] **Users can view posts in different ways**
  - Users can sort posts by creation time (Newest)
  - Users can sort posts by upvotes count (Most Popular)
  - Users can search for posts by title
- [x] **Users can interact with each post in different ways**
  - Each post has its own page showing content, image, and comments
  - Users can leave comments underneath a post
  - Each post has an upvote button — each click increases upvotes by one
  - Users can upvote any number of times
- [x] **A previously created post can be edited or deleted from its post page**
  - Edit button navigates to a pre-filled update form
  - Delete button removes the post and its comments

## Class Required Features

- [x] **Web App Deployment** — deployed on Netlify
- [x] **User Login & Signup with Supabase Auth**
  - Email/password login and signup
  - Google OAuth login
  - Password reset via email
  - Logout functionality
- [x] **LLM Integration** — AI generates a summary of each post including title, content, upvotes, and comments using the FAU LLM API

## Optional Features

- [x] Loading spinner displayed whenever data is being fetched

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='./demo/finalDemoBJ.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with ScreenToGif

## Notes

- Setting up Supabase Auth with Google OAuth required configuring the redirect URL in both Supabase and the Google Cloud Console.
- Parsing the LLM response required cleaning markdown code fences before displaying.
- The netlify.toml redirect rule was needed to handle React Router client-side routing on deployment.

## License

    Copyright 2026 Besenja Joseph

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.