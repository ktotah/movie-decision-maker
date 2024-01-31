const apiKey = 'AIzaSyDcOM0ne4VtAftRHqaOBMEWPGQ45UBT498';
const apiUrl = 'https://www.googleapis.com/youtube/v3/search';
const apiUrl2 = 'http://www.omdbapi.com/';
const apiKey2 = '402e4178';

// Function to get movie info from OMDb
function getMovieInfo(movieTitle) {
  const omdbParams = {
    apikey: apiKey2,
    t: movieTitle
  };

   // Construct the URL with query parameters
 const omdbUrl = new URL(apiUrl2);
 omdbUrl.search = new URLSearchParams(omdbParams);

 fetch(omdbUrl)
   .then(response => response.json())
   .then(data => {
     const movieInfoContainer = document.getElementById('movieInfo');
     const posterContainer = document.getElementById('poster');

     if (data.Response === 'True') {
       const movieTitle = data.Title;
       const movieYear = data.Year;
       const movieRating = data.imdbRating;
       const genre = data.Genre;
       const runtime = data.Runtime;
       const synopsis = data.Plot;
       const posterUrl = data.Poster;
       const actors =data.Actors;     
       movieInfoContainer.innerHTML = `
         <p>Title: ${movieTitle}</p>
         <p>Year: ${movieYear}</p>
         <p>IMDb Rating: ${movieRating}</p>
         <p>Genre: ${genre}</p>
         <p>Runtime: ${runtime}</p>
         <p>Synopsis: ${synopsis}</p>
         <p>actors: ${actors}</p>
       `;

       // Display poster if available
       if (posterUrl !== 'N/A') {
        posterContainer.innerHTML = `
          <img src="${posterUrl}" alt="${movieTitle} Poster">
        `;
      } else {
        posterContainer.innerHTML = '<p>No poster available.</p>';
      }
    } else {
      movieInfoContainer.innerHTML = `<p>${data.Error}</p>`;
      posterContainer.innerHTML = ''; // Clear poster container if there's an error
    }
  })
  .catch(error => console.error('Error fetching movie info:', error));
}
