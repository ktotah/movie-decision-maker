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
}