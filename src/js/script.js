// script.js
// This script will set up the event listener for the buttons on the index.html page
// Modify updateClickableUI function
function updateClickableUI(movies) {
    const resultsContainer = document.getElementById('results-container');

    // Check if the results container is found
    if (!resultsContainer) {
        console.error("Results container element not found.");
        return;
    }

    // Clear existing content in the container
    resultsContainer.innerHTML = '';

    // Check if there are no movies to display
    if (movies.length === 0) {
        resultsContainer.innerHTML = 'No movies match your criteria.';
        return;
    }

    // Loop through each movie and create clickable titles with play buttons
    movies.forEach(movie => {
        const movieElement = document.createElement('div');

        // Create a clickable title element
        const titleElement = document.createElement('span');
        titleElement.textContent = movie.Title;
        titleElement.classList.add('clickable-title');

        // Add click event listener to the clickable title
        titleElement.addEventListener('click', function () {
            handleTitleClick(movie);
        });

        // Create a play button
        const videosContainer = document.getElementById('videos-container');
videosContainer.innerHTML = ''; // Clear previous results
        playButton.textContent = 'Play';
        playButton.classList.add('play-btn');

        // Add click event listener to the play button
        playButton.addEventListener('click', function () {
            handlePlayClick(movie);
        });

        // Append title and play button to the movie element
        movieElement.appendChild(titleElement);
        movieElement.appendChild(playButton);

        // Append the movie element to the results container
        resultsContainer.appendChild(movieElement);
    });
}

// Modify handleTitleClick function
function handleTitleClick(movie) {
    // Fetch YouTube video details based on the movie title
    displayVideos(movie.Title)
        .then(videoDetails => {
            // Display YouTube videos using the YouTube API script
            displayVideos(movie.Title);
        })
        .catch(error => {
            console.error('Error fetching YouTube video details:', error);
        });
} 
document.addEventListener('DOMContentLoaded', () => {
    populateGenresDropdown();
    analyzeMovies();
    console.log('DOM fully loaded and parsed');

    // Get the "Search" button by its ID
    const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', async function() {
    // Your search button logic
});
    // Get the "Surprise Me!" button by its ID
    const surpriseBtn = document.getElementById('surprise-Btn');

    // Event listener for the "Search" button
    searchBtn.addEventListener('click', async function() {
        console.log('Search button clicked');
        const genre = document.getElementById('genreFilter').value;
        const runtime = document.getElementById('runtimeFilter').value; // This is actually the maxRuntime
        const rating = document.getElementById('ratingFilter').value;
        const excludeWatched = document.getElementById('excludeWatched').checked;

        const filteredMovies = await filterMoviesBasedOnCriteria(genre, runtime, rating, excludeWatched);
        // Now you can use filteredMovies to display the results or for other purposes
        // Update the UI with these movies
    });

    // Event listener for the "Surprise Me!" button
    surpriseBtn.addEventListener('click', async function() {
        console.log('Surprise Me button clicked');
        const genre = document.getElementById('genreFilter').value;
        const runtime = document.getElementById('runtimeFilter').value; // This is actually the maxRuntime
        const rating = document.getElementById('ratingFilter').value;
        const excludeWatched = document.getElementById('excludeWatched').checked;

        // Fetch a random movie based on criteria and update UI with clickable title      
        const selectedMovie = await surpriseMe(genre, runtime, rating, excludeWatched);
        if (selectedMovie) {
            updateClickableUI([selectedMovie]);
        }
    });
});


// Function to handle searches or surprise selections based on user input
function handleSearch() {
    const genreFilter = document.getElementById('genreFilter').value;
    const runtimeFilter = document.getElementById('runtimeFilter').value;
    const ratingFilter = document.getElementById('ratingFilter').value;
    const excludeWatched = document.getElementById('excludeWatched').checked;

    // Your existing logic to fetch and filter movies based on these criteria
    // For example, if you're implementing a search functionality:
    console.log(`Search with filters: Genre - ${genreFilter}, Runtime - ${runtimeFilter}, Rating - ${ratingFilter}, Exclude Watched - ${excludeWatched}`);
    // Here, you would call your function to fetch and filter movies based on selected criteria including the excludeWatched flag
}


//function to filter movies based on user-specified criteria
async function filterMoviesBasedOnCriteria(genre, maxRuntime, rating, excludeWatched) {
    // Fetch details for all movies
    const allMovies = await fetchAllMovieDetails();
    
    // Log the filtering criteria and all movies for debugging purposes
    console.log('Filter Criteria:', { genre, maxRuntime, rating, excludeWatched });
    console.log('All Movies:', allMovies);


    //criteria
    const filteredMovies = allMovies.filter(movie => {
        // Process movie runtime and check against runtime criteria
        const movieRuntime = processRuntime(movie.Runtime);
        const meetsRuntimeCriteria = maxRuntime === 'all' || (movieRuntime && movieRuntime <= parseInt(maxRuntime));
        
        // Check if the movie genre meets the specified genre criteria
        const meetsGenreCriteria = genre === 'all' || (movie.Genre && movie.Genre.includes(genre));
        
        // Check if the movie rating meets the criteria
        const meetsRatingCriteria = rating === 'all' || (movie.Rated && movie.Rated === rating);
        
        // Check for watched status if excludeWatched is enabled
        const isNotWatched = excludeWatched ? !localStorage.getItem(movie.Title) : true;

        // Return true if the movie meets all specified criteria
        return meetsRuntimeCriteria && meetsGenreCriteria && meetsRatingCriteria && isNotWatched;
    });
    // Return the filtered movies
    return filteredMovies;
}


//function to select a random movie based on specified criteria
async function surpriseMe(genre, runtime, rating, excludeWatched) {

    // Filter movies based on criteria
    const filteredMovies = await filterMoviesBasedOnCriteria(genre, runtime, rating, excludeWatched);
    
    // Log the surprise criteria
    console.log('Surprise Me Criteria:', { genre, runtime, rating, excludeWatched });

    // If no movies match the criteria, log a message and return null
    if (filteredMovies.length === 0) {
        console.log("No movies match your criteria.");
        return null;
    }

    // Select a random movie from the filtered list
    const randomIndex = Math.floor(Math.random() * filteredMovies.length);
    const selectedMovie = filteredMovies[randomIndex];

    // Log the selected movie
    console.log('Selected Movie:', selectedMovie);

    // Update the UI with the selected surprise movie
    updateUI([selectedMovie]);
}


// function to handle the "Surprise Me" button click event
async function handleSurpriseMe() {
    // Get the excludeWatched checkbox status
    const excludeWatched = document.getElementById('surpriseMe').checked;

    // Call the surpriseMe function to fetch, filter, and select a movie
    await surpriseMe('', '', '', excludeWatched);
}
