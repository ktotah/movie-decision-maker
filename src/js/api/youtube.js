// api key  and url for youtube
const apiKey = 'AIzaSyDcOM0ne4VtAftRHqaOBMEWPGQ45UBT498';
const apiUrl = 'https://www.googleapis.com/youtube/v3/search';

// Function to display YouTube videos
function displayVideos(movieTitle) {
  const youtubeParams = {
    part: 'snippet',
    q: movieTitle + ' trailer',
    type: 'video',
    maxResults: 5,
    key: apiKey
  };


  // Construct the URL with query parameters
  const youtubeUrl = new URL(apiUrl);
  youtubeUrl.search = new URLSearchParams(youtubeParams);

  fetch(youtubeUrl)
    .then(response => response.json())
    .then(data => {
      const videosContainer = document.getElementById('videos-container');
      videosContainer.innerHTML = ''; // Clear previous results

      data.items.forEach(item => {
        const videoTitle = item.snippet.title;
        const videoId = item.id.videoId;

        const videoElement = document.createElement('div');
        videoElement.innerHTML = `
          <h3>${videoTitle}</h3>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
        `;

        videosContainer.appendChild(videoElement);
      });
    })
    .catch(error => console.error('Error fetching YouTube videos:', error));
}

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
      const trailerContainer = document.getElementById('trailer');

    // Construct the URL with query parameters
    const youtubeUrl = new URL(apiUrl);
    youtubeUrl.search = new URLSearchParams(youtubeParams);
  
    fetch(youtubeUrl)
      .then(response => response.json())
      .then(data => {
        const videosContainer = document.getElementById('videos-container');
        videosContainer.innerHTML = ''; // Clear previous results
  
        data.items.forEach(item => {
          const videoTitle = item.snippet.title;
          const videoId = item.id.videoId;
  
          const videoElement = document.createElement('div');
          videoElement.innerHTML = `
            <h3>${videoTitle}</h3>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
          `;
  
          videosContainer.appendChild(videoElement);
        });
      })
      .catch(error => console.error('Error fetching YouTube videos:', error));
  }
  
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
        const trailerContainer = document.getElementById('trailer');
  
        if (data.Response === 'True') {
          const movieTitle = data.Title;
          const movieYear = data.Year;
          const movieRating = data.imdbRating;
          const trailerUrl = data.Trailer;

  // this container it will include parameters that we need when we display our video
          movieInfoContainer.innerHTML = `
            <p>Title: ${movieTitle}</p>
            <p>Year: ${movieYear}</p>
            <p>IMDb Rating: ${movieRating}</p>
          `;

            
          if (trailerUrl && trailerUrl.includes('youtube.com/watch?v=')) {

            // Extract video ID from YouTube URL
            const videoId = trailerUrl.split('v=')[1];
            trailerContainer.innerHTML = `
              <h2>Trailer</h2>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
              `;
// if can't get information from a movie tittle, it will display a message where the user will be informed about the video is no avaliable              
            } else {
              trailerContainer.innerHTML = `<p>No trailer available.</p>`;
            }

                
            // Display YouTube videos related to the movie
            displayVideos(movieTitle);
          } else {
            movieInfoContainer.innerHTML = `<p>${data.Error}</p>`;
            trailerContainer.innerHTML = ''; // Clear trailer container if there's an error
          }
        })
        .catch(error => console.error('Error fetching movie info:', error));
    }
        // Function to search for a movie when the button is clicked
        function searchMovie() {
          const movieTitle = document.getElementById('movieTitle').value;

          // Only fetch and display results if a movie title is provided
          if (movieTitle.trim() !== '') {
            getMovieInfo(movieTitle);
          }
        }