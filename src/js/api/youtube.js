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

  
