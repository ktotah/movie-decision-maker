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
        throw error; // Rethrow the error to propagate it
    }
}

// Fetch details for all Top 250 movies
async function fetchAllMovieDetails() {
  // Use fetchMovieDetails correctly with async/await inside map
    const movieDetailsPromises = top250MovieTitles.map(async (title) => await fetchMovieDetails(title));
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

        const genreDropdown = document.getElementById('genreFilter');
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
    analyzeMovies();
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
                const runtime = processRuntime(movie.Runtime);
                if (runtime) {
                    runtimes.push(runtime);
                }
            }
            if (movie && movie.Rated && movie.Rated !== 'N/A') {
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

// Placeholder for filtering logic based on genres, runtime, rating, and watched status
async function filterMoviesBasedOnCriteria(genre, maxRuntime, rating, excludeWatched) {
  const allMovies = await fetchAllMovieDetails();
  console.log('Filter Criteria:', { genre, maxRuntime, rating, excludeWatched });
  console.log('All Movies:', allMovies);

  const filteredMovies = allMovies.filter(movie => {
      const movieRuntime = processRuntime(movie.Runtime);
      const meetsRuntimeCriteria = maxRuntime === 'all' || (movieRuntime && movieRuntime <= parseInt(maxRuntime));
      const meetsGenreCriteria = genre === 'all' || (movie.Genre && movie.Genre.includes(genre));
      const meetsRatingCriteria = rating === 'all' || (movie.Rated && movie.Rated === rating);
              const meetsYearCriteria = year === 'all' || (movie.Year && movie.Year === year);

      // Check for watched status
      const isNotWatched = excludeWatched ? !localStorage.getItem(movie.Title) : true;

      return meetsRuntimeCriteria && meetsGenreCriteria && meetsRatingCriteria && isNotWatched;
  });

  console.log('Filtered Movies:', filteredMovies);
  return filteredMovies;
}

// Function to select a group of movies based on criteria
async function searchBtn(genre, runtime, rating, excludeWatched,year) {
    const filteredMovies = await filterMoviesBasedOnCriteria(genre, runtime, rating, excludeWatched,year);
   // If no movies match the criteria, log a message and return null
   if (filteredMovies.length === 0) {
    console.log("No movies match your criteria.");
    return null;
}

// Select a random movie from the filtered list
const randomIndex = Math.floor(Math.random() * filteredMovies.length);

// Return the randomly selected movie
return filteredMovies[randomIndex];
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Populate genres dropdown and analyze movies on page load
  populateGenresDropdown();
  analyzeMovies();
  
  // Get references to the search and surprise buttons
  const searchBtn = document.getElementById('search-btn');
  const surpriseBtn = document.getElementById('surprise-btn');

  // Add click event listener for the search button
  searchBtn.addEventListener('click', async function () {
      // Get filter criteria values from user input
      const genre = document.getElementById('genreFilter').value;
      const runtime = document.getElementById('runtimeFilter').value;
      const rating = document.getElementById('ratingFilter').value;
      const excludeWatched = document.getElementById('excludeWatched').checked;

      // Fetch and filter movies based on criteria
      const filteredMovies = await filterMoviesBasedOnCriteria(genre, runtime, rating, excludeWatched);

      // Update the UI with the filtered movies
      updateUI(filteredMovies);
  });

  // event listener for the surprise button
  surpriseBtn.addEventListener('click', async function () {
    
      // Get filter criteria values from user input
      const genre = document.getElementById('genreFilter').value;
      const runtime = document.getElementById('runtimeFilter').value; // This is actually the maxRuntime
      const rating = document.getElementById('ratingFilter').value;
      const excludeWatched = document.getElementById('excludeWatched').checked;

      // Call the searchBtn function to fetch, filter, and select a movie
      const selectedMovie = await searchBtn(genre, runtime, rating, excludeWatched, 4);

      // If a movie is selected, update the UI with the selected movie
      if (selectedMovie) {
          updateUI([selectedMovie]);
      }
  });
});

// Function to update the UI with movie data
function updateUI(movies) {
  const resultsContainer = document.getElementById('results-container');

  // Check if the results container element exists
  if (!resultsContainer) {
      console.error("Results container element not found.");
      return;
  }

  // Clear the existing content in the results container
  resultsContainer.innerHTML = '';

  // If no movies match the criteria, display a message
  if (movies.length === 0) {
      resultsContainer.innerHTML = 'No movies match your criteria.';
      return;
  }

  // Display each movie title in the results container
  movies.forEach(movie => {
      const movieElement = document.createElement('div');
      // Wrap the title in an anchor element
      const titleLink = document.createElement('a');
      titleLink.href = '#'; // You can set this to '#' or a placeholder link
      titleLink.textContent = movie.Title;

      // Add click event listener to the anchor
      titleLink.addEventListener('click', function (event) {
          event.preventDefault(); // Prevent the default link behavior
          handleTitleClick(movie);
      });

      // Append the anchor to the movie element
        movieElement.appendChild(titleLink);

        // Append the movie element to the results container
        resultsContainer.appendChild(movieElement);
    });
}