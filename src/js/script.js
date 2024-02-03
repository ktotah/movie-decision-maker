// script.js
// This script will set up the event listener for the buttons on the index.html page

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    // Get the "Search" button by its ID
    const searchBtn = document.getElementById('search-btn');
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

        await surpriseMe(genre, runtime, rating, excludeWatched); // Adapted to include handling for "Exclude Watched"
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
