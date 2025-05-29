# Job Search App (Frontend)

## Description

This is a job search application built with Next.js 14 and TypeScript.  
Users can search for jobs, view job details, create a profile, save liked jobs, and receive job recommendations based on their profile.

## Features

- Search jobs by title using a free public API
- View detailed information about each job
- Create and edit a user profile (Name, Desired Job Title, About Me)
- Save liked jobs to a favorites list stored in `localStorage`
- View and remove jobs from the liked list
- Receive job recommendations based on the created profile

## Technologies Used

- Next.js 14 with TypeScript
- Tailwind CSS for styling
- Formik and Yup for forms and validation
- SWR for data fetching
- Axios for API requests
- LocalStorage for storing user profile and liked jobs

## Project Structure

- `/app` – application pages (`/jobs`, `/create-profile`, `/liked`, `/job-details/[id]`, `/signIn`, `/signUp`)
- `/components` – reusable UI components like JobCard, Header, Loader
- `/context` – React context for managing liked jobs and user profile state
- `/lib` – utility functions like API fetchers
- `/types` – TypeScript type definitions

## How to Run Locally

1. Clone the repository:
### git clone [<frontend repo url>](https://github.com/reb0rned/job-search-Frontend.git)
2. Install dependencies:
### npm install
3. Run the development server:
### nom run dev
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Backend

The backend API with authentication and user management is implemented separately using Express and MongoDB and can be found here:  
[https://github.com/reb0rned/job-search-backend](https://github.com/reb0rned/job-search-backend)

## Demo

Check out the live demo deployed on Vercel:  
[https://job-search-frontend-ltfl.vercel.app/](https://job-search-frontend-ltfl.vercel.app/)

## Future Improvements

- Integrate backend API fully for profile and auth data
- Enhance UI/UX and responsive design
- Add pagination and advanced job filtering
- Add animations and better user feedback

---

Feel free to reach out if you have any questions or feedback!
