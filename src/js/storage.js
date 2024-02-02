// Marking Movies as Watched and Using Local Storage

/**
 * Retrieve watched movies from local storage.
 * @returns {Array} An array of watched movie IDs.
 */
function getWatchedMoviesFromLocalStorage() { 
    // Attempt to get the 'watchedMovies' data from local storage
    const watchedMovies = localStorage.getItem('watchedMovies');
    // Parse the JSON string back to an array if it exists, or default to an empty array
    return watchedMovies ? JSON.parse(watchedMovies) : [];
} 

/**
 * Save watched movies to local storage. 
 * @param {Array} watchedMovies - An array of watched movie IDs.
 */
function saveWatchedMoviesToLocalStorage(watchedMovies) {
    // Convert the array to a JSON string and save it in local storage under the key 'watchedMovies'
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
}

/**
 * Check if a specific movie has been watched
 * @param {string} movieId - The ID of the movie to check.
 * @returns {boolean} True if the movie is watched, false otherwise. 
 */
function isMovieWatched(movieId) {
    // Retrieve the list of watched movies from local storage
    const watchedMovies = getWatchedMoviesFromLocalStorage();
    // Check if the given movie ID is in the array of watched movies
    return watchedMovies.includes(movieId);
}

/**
 * Toggle the watched status of a movie.
 * @param {string} movieId - The ID of the movie to toggle.
 */
function toggleWatchedStatus(movieId) {
    // Retrivve the current list of watched movies
    const watchedMovies = getWatchedMoviesFromLocalStorage();
    // Find the index of the movieID in the array if it exists
    const movieIndex = watchedMovies.indexOf(movieId);

    if (movieId > -1) {
        // If the movie is already in the array, remove it (unmark as watched)
        watchedMovies.splice(movieIndex, 1);
    } else {
        // If the movie is not in the array, add it (mark as watched)
        watchedMovies.push(movieId);
    }

    // Save the updated array back to local storage
    saveWatchedMoviesToLocalStorage(watchedMovies);
    // Update the UI to reflect the new watched status
    updateUIForWatchedMovies();
}


/**
 * Update the UI based on the watched status of movies
 */
function updateUIForWatchedMovies() {
    // Query all movie items in the UI by a special class or id
    const movieItems = document.querySelectorAll('.movie-item');  // REPLACE W/ OUR GROUP'S ACTUAL MOVIE ITEM CLASS OR ID 

    movieItems.forEach(item => {
        // For each movie item, get the movie ID stored in a data attribute
        const movieID = item.getAttribute('data-movie-id');

        if (isMovieWatched(movieID)) {
            // If the movie is watched, add a 'watched' class for styling
            item.classList.add('watched');
            // Make the 'unwatch' button visible for the user to be able to unmark the movie
            const unwatchButton = item.querySelector('.unwatch-button'); // REPLACE WITH OUR GROUP'S ACTUAL UNWATCH BUTTON CLASS OR ID
            unwatchButton.computedStyleMap.display = 'block';
        } else {
            // If the movie is not watched, remove the 'watched' class
            item.classList.remove('watched');
            // Make the 'watch' button visible so the user can mark the movie as watched
            const watchButton = item.querySelector('.watch-button'); // REPLACE WITH OUR GROUP'S ACTUAL WATCH BUTTON CLASS OR ID
            watchButton.computedStyleMap.display = 'block';
        }
    });
}

/**
 * Filters out watched movies from a given movie list.
 * @param {Array} movieList - The list of all movies.
 * @returns {Array} A filtreed list of movies that have not been watched.
 */
function filterOutWatchedMovies(movieList) {
    // Initialize an empty array for the filtered list
    let filteredList = [];

    // Iterate throguh the movie list
    movieList.forEach(movie => {
        // Check if the movie has not been watched
        if (!isMovieWatched(movie.id)) {
            // If not watched, add it to the filtered list
            filteredList.push(movie);
        }
    });

    // Return the filtered list of unwatched movies
    return filteredList;
}

/**
 * Updates the movie list UI based on the user's choice to hide or show watched movies.
 * This function should be triggered by a UI event, such as toggling a switch or checkbox.
 */
function toggleHideWatchedMovies() {
    // Get the current list of movies (from OMDB API or current data structure)
    let currentMovieList = getAllMovies(); // This eneds to be implemented

    // Check if the "Hide Watched Movies" option is turned on
    const hideWatchedToggle = document.getElementById('hide-watched-toggle'); // REPLACE WITH OUR GROUP'S ACTUAL ID
    if (hideWatchedToggle.checked) {
        // If the toggle is on, filter out watched movies
        currentMovieList = filterOutWatchedMovies(currentMovieList);
    } // If the toggle is off, currentMovieList remains unchanged, showing all movies that meet the user's criteria
}


////////////////////


// Pseudocode for User Preferences in Local Storage

// Function to save user preferences
// function saveUserPreferences(preferences):
//      save preferences to local storage with key 'userPreferences'

// Function to get user preferences
// function getUserPreferences():
//      if local storage has 'userPreferences':
//          return preferences from local storage
//      else:
//          return default preferences

// On application load or user action 
// When application loads or user updates preferences:
//      preferences = getUserPreferences()
//      applyPreferencesToUI(preferences)


/////////////////////////
// TO INCLUDE IN SCRIPT.JS:

// Function to initialize the applicatoin 
// function initializeApp():
    // Code to initailize the app, render movies, and se tup initial watched status
        // displayMovies() // Render movies to the page
        // updateUIForWatchedMovies() // Set the inital watched status for each movie

// Assuming Jhon's searchMovie() and Julain's search button onclick are connected:
// Make sure the search button in index.html has an ID
// <button id="search-button">Search</button>

//In script.js, add an event listener to this button to call the search function
// document.getElementById('search-button').addEventListener('click, searchMovie');

// Add event listeners for watched/unwatched buttons, ensureing their IDs match those in the HTML
// document.addEventListener('DOMContentLoaded', () => { 
    // Code to set up event listeners for 'watched' and 'unwatched' buttons
    // initializeApp();}