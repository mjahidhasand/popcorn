# Movie App

This is a responsive movie search and details application built using **Next.js** and the **TMDB API**. It offers users a dynamic interface for browsing popular movies, searching for titles, viewing detailed movie information, and managing a watchlist.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Usage](#usage)
- [Contribution](#contribution)
- [License](#license)

## Features

- **Homepage**: Displays a list of popular movies with infinite scrolling or a "Load More" button.
- **Search Functionality**: Allows users to search for movies by title.
- **Movie Details Page**: Fetches and displays detailed information about a selected movie.
- **Favorites/Watchlist**: Users can add or remove movies from their watchlist.
- **Dark Mode Support**: Users can toggle dark mode, with preferences saved across sessions.
- **Error Handling**: Graceful handling of API errors and loading states.

## Technologies Used

- **Frontend**: Next.js, React
- **Styling**: Tailwind CSS
- **State Management**: React Context or Zustand (for global state management)
- **Form Management**: React Hook Form

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.
- A TMDB API key (you can sign up for an API key at [TMDB](https://www.themoviedb.org/)).

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mjahidhasand/popcorn.git
   cd popcorn
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Create an environment file**:
   Create a `.env` file in the root directory and add your TMDB API key:
   ```env
   TMDB_API_KEY=your_api_key_here
   ```

4. **Run the application**:
   ```bash
   bun dev
   ```

   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## API Endpoints

The application interacts with the TMDB API using the following endpoints:

- **Popular Movies**: 
  `https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY`
- **Search Movies**: 
  `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=...`
- **Movie Details**: 
  `https://api.themoviedb.org/3/movie/{movie_id}?api_key=YOUR_API_KEY`
- **Movie Credits (Cast)**: 
  `https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=YOUR_API_KEY`
- **Movie Recommendations**: 
  `https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=YOUR_API_KEY`

## Deployment

The app is deployed on Vercel. You can view it live [here](https://your-live-link.vercel.app).

## Usage

- **Homepage**: Users can scroll through popular movies to fetch additional movies.
- **Search**: Use the search bar to find specific movies.
- **Movie Details**: Click on a movie to view its details, including the poster, description, genres, release date, and cast.
- **Favorites/Watchlist**: Manage your watchlist from the dedicated page, allowing you to add or remove movies.
