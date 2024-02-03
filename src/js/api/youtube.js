// api key  and url for youtube
const apiKey = 'AIzaSyDcOM0ne4VtAftRHqaOBMEWPGQ45UBT498';
const apiUrl = 'https://www.googleapis.com/youtube/v3/search';


window.addEventListener('scroll', handleScroll, { passive: true });

function handleTitleClick(movie) {
  // Fetch YouTube video details based on the movie title
  fetchYouTubeVideo(movie.Title)
      .then(videoDetails => {
          // Display YouTube videos using the YouTube API script
          searchMovie(movie.Title);
      })
      .catch(error => {
          console.error('Error fetching YouTube video details:', error);
      });
}

// Function to display YouTube videos
function displayVideos(movieTitle) {
  console.log('Inside displayVideos');
  const youtubeParams = {
    part: 'snippet',
    q: movieTitle + ' trailer',
    type: 'video',
    maxResults: 2,
    key: apiKey
  };

  const youtubeUrl = new URL(apiUrl);
  youtubeUrl.search = new URLSearchParams(youtubeParams);

  fetch(youtubeUrl)
    .then(response => response.json())
    .then(data => {
      const videosContainer = document.getElementById('videos-container');
      videosContainer.innerHTML = ''; // Clear previous results


      if (data.items) {
        data.items.forEach(item => {
          const videoTitle = item.snippet.title;
          const videoId = item.id.videoId;

        const videoElement = document.createElement('div');
        videoElement.innerHTML = `
          <h3>${videoTitle}</h3>
          <iframe width="360" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
        `;

        videosContainer.appendChild(videoElement);
      });
    } else {
      console.error('No items found in the YouTube response.');
    }
  })
}

// Function to search for a movie when the button is clicked
function searchMovie() {
  const movieTitle = document.getElementById('movieTitle').value;

  if (movieTitle.trim() !== '') {
    displayVideos(movieTitle);
  }
}

// Initial display of default videos on window load
window.onload = function () {
  displayVideos('DEFAULT_MOVIE_TITLE');
};
