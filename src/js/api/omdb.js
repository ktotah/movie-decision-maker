const OMDB_API_KEY = 'b2cf05e'; 

// Fetch details for a single movie
async function fetchMovieDetails(title) {
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`;
    try {
        const response = await fetch(url);
        const movieDetails = await response.json();
        return movieDetails;
    } catch (error) {
        console.error(`Error fetching movie details for ${title}:`, error);
        return null; // Return null to handle errors gracefully
    }
}

// Fetch details for all Top 250 movies
async function fetchAllMovieDetails() {
    // Use fetchMovieDetails correctly with async/await inside map
    const movieDetailsPromises = top250MovieTitles.map (async (title) => await fetchMovieDetails(title));
    return Promise.all(movieDetailsPromises);
}

// Analyze movie details and extract genres and append them to the genre dropdown
async function populateGenresDropdown() {
    try {
        const movies = await fetchAllMovieDetails();
        let genres = new Set();

        movies.forEach(movie => {
            if (movie && movie.Genre && movie.Genre !== 'N/A') {
                movie.Genre.split(', ').forEach(genre => genres.add(genre));
            }
        });

        // Append genres to dropdown menu in HTML
        const genreDropdown = document.getElementById('genreFilter');

        // Clear existing options in the dropdown
        genreDropdown.innerHTML = '';

        genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre;
            option.textContent = genre;
            genreDropdown.appendChild(option);

        });
    } catch (error) {
        console.error(`Error populating genres dropdown:`, error);
    }
}


// Call populatedGenresDropdown once all necessary DOM content has loaded
document.addEventListener('DOMContentLoaded', () => {
    populateGenresDropdown();
});


// Function to process runtime data
function processRuntime(runtimeString) {
    // Use a regular expression to match only the numbers in the runtime string
    const runtimeNumbers = runtimeString.match(/\d+/);

    // Check if the match was successful
    if (runtimeNumbers) {
        // Convert the matched string (first element of the array) to a number
        const runtime = parseInt(runtimeNumbers[0]);
        return runtime;
    } else {
        // If no numbers were found, return a default value or handle as needed
        return null; // or another value if that makes more sense....
    }
}

// Analyze movie details to extract runtime, genres, and ratings
async function analyzeMovies() {
    try {
        const movies = await fetchAllMovieDetails();
        let runtimes = [];
        let ratings = new Set();

        movies.forEach(movie => {
            if (movie && movie.Runtime && movie.Runtime != 'N/A') {
                // Process the runtime to be a number and push it to the runtimes array
                const runtime = processRuntime(movie.Runtime);
                if (runtime) { // Make sure it's not null
                    runtimes.push(runtime);
                }
            }
            if (movie && movie.Rated && movie.Rated !== 'N/A') {
                // Add the rating to the ratings set
                ratings.add(movie.Rated)
            }
        });

        // Calculate runtime range and log it -- to detemine what the static dropdrown menu critera for runtime should reasonably be
        const minRuntime = Math.min(...runtimes);
        const maxRuntime = Math.max(...runtimes);
        console.log(`Runtime ranges: ${minRuntime} - ${maxRuntime} minutes`);


        // Convert the ratings set to an array and log it -- to determine what the static dropdown menu critera for genre should reasonably be
        const ratingsArray = Array.from(ratings);
        console.log('Ratings:', ratingsArray);

    } catch (error) {
        console.error(`Error fetching or analyzing movie data: ${error}`);
    }
}

// Call analyzeMovies once all necessary DOM content has loaded
document.addEventListener('DOMContentLoaded', () => {
    populateGenresDropdown();
    analyzeMovies(); // Calling analyzeMovies here as well
});


// Placeholder for filtering logic based on genres, runtime, rating, and watched status
async function filterMoviesBasedOnCriteria(genre, maxRuntime, rating, excludeWatched) {
    const allMovies = await fetchAllMovieDetails();
    return allMovies.filter(movie =>{
        const movieRuntime = processRuntime(movie.Runtime);
        const meetsRuntimeCriteria = maxRuntime === 'all' || (movieRuntime && movieRuntime <= parseInt(maxRuntime));
        const meetsGenreCriteria = genre === 'all' || (movie.Genre && movie.Genre.includes(genre));
        const meetsRatingCriteria = genre === 'all' ||(movie.Rated && movie.Rated === rating);
        // need const isNotWatched for the local storage watched filter criteria.....

        return meetsRuntimeCriteria && meetsGenreCriteria && meetsRatingCriteria //&& isNotWatched
        ;
    });
}
 
// Function to select a random movie from the filtered list and naviage to its details page
async function surpriseMe(genre, runtime, rating, excludeWatched) {
    const filteredMovies = await filterMoviesBasedOnCriteria(genre, runtime, rating, excludeWatched);
    if (filteredMovies.length === 0) {
        console.log("No movies match your criteria.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredMovies.length);
    const selectedMovie = filteredMovies[randomIndex];

    // Assuming selectedMovie contains the title to fetch details
    const movieDetials = await fetchMovieDetails(selectedMovie.title);
    console.log(`Surprise movie details: ${movieDetials}`);
}

