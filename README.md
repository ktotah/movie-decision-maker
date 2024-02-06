# Movie Decision Maker

## Description

The Movie Decision Maker is an interactive web application tailored to assist movie enthusiasts in selecting a film to enjoy. By leveraging IMDb's top 250 movie list, our application offers user-friendly filters for genre, duration, and rating, powered by the OMDB API for detailed movie information. In addition, users can watch movie trailers directly within the app, thanks to the YouTube API integration. The "Surprise Me" feature adds an element of spontaneity by randomly selecting a movie for the user, while client-side storage ensures a personalized experience by keeping track of previously watched films.

During the development process, we encountered the typical challenge of integrating server-side APIs, which was an enriching learning experience. This step was crucial for accessing dynamic, up-to-date content, and for providing an immersive and responsive interface without relying on traditional alert, confirm, or prompt JavaScript methods, aligning with modern web practices.

## Table of Contents
- [Deployed Application](#deployed-application)
- [Usage](#usage)
- [Screenshot](#screenshot)
- [Testing](#testing)
- [Authors and Acknowledgments](#authors-and-acknowledgements)
- [License](#license)

## Deployed Application
The deployed application can be viewed here: [https://ktotah.github.io/movie-decision-maker/](https://ktotah.github.io/movie-decision-maker/)

## Usage
To use the application:

1. Open the Movie Decision Maker.
2. Choose your preferences using the drop-down filters for genre, runtime, and rating.
3. Click "Find A Movie" to see a list of movies that match your criteria.
4. If you want a random suggestion based on your criteria, click "Surprise Me!".
5. Click on a movie title to view its details and watch the trailer.

The application is designed to be intuitive, with a clean and polished user interface that ensures an enjoyable and straightfoward experience. 

## Screenshot
Below is a **screenshot** of the deployed Movie Decision Maker application. The interface prominently displays the application's title, "Movie Decision Maker" (stylized in a way that is reminiscent of a bankrupt movie company), and invites users to filter IMDb's top 250 movies based on their preferences. The screenshot shows a selection interface where users can filter movies by genre, duration, and rating. Additionally, there is a feature to exclude movies that have already been watched. Users can either choose a movie by clicking the 'Find A Movie' button or use the 'Surprise Me!' feature for a random selection.

The main area of the application displays a list of movies that users can interact with: 'The Shawshank Redemption', 'The Godfather', and others, each accompanied by checkboxes to mark them as watched. Clicking on a movie title reveals further details below, including the movie's poster, genre, runtime, and other information. A YouTube trailer for the selected movie is also displayed, illustrating the application's use of the YouTube API for direct trailer links.

![Screenshot of the Movie Decision Maker application. The main interface showcases a user-friendly and colorful layout with the movie search and filter options at the forefront. Below, the clickable list of movies is visible, and the detailed view of 'Pulp Fiction' is shown with movie details and an embedded YouTube trailer.](./src/assets/screenshot.png)

## Features

- **Curated Movie Selection:** Access a searchable list of IMDb's top 250 movies, ensuring users are choosing from highly-rated films.

- **Advanced Filtering:** Apply filters based on genre, duration, and rating to narrow down the movie selection to fit the user’s mood and time constraints.

- **API-Driven Information:** Utilize the OMDB API to retrieve up-to-date movie details, providing users with accurate and relevant information about their movie choices.

- **Trailer Previews:** Watch movie trailers directly within the application via YouTube API integration, offering a preview before making a selection.

- **Surprise Me:** Engage with the "Surprise Me" feature, which randomly selects a movie for the user, offering a spontaneous choice when they're feeling indecisive.

- **Client-Side Storage:** Track movies that users have watched using local storage, enhancing the user experience by avoiding repeat suggestions.

- **Responsive Design:** Enjoy a seamless experience across all devices, thanks to a responsive interface that adapts to different screen sizes for optimal viewing.

- **Interactive User Interface:** Interact with a user-friendly interface that responds to user input without relying on traditional JavaScript alerts, confirms, or prompts, creating a smooth and engaging user experience.

## Testing

The application's functionality has been tested across different browsers and devices to ensure compatibility and responsiveness. 

Every feature was repeatedly tested to confirm reliability and responsiveness, guaranteeing a seamless user experience. 

## Authors and Acknowledgements
- **Katy Totah** - *Initial work* - [Katy Totah](https://github.com/ktotah)
- **Daniel Araujo** - *Initial work* - [Daniel Araujo](https://github.com/danielhe27)
- **Julian Ortiz** - *Initial work* - [Julian Ortiz](https://github.com/julz-tm)

## License
This project is released under the [MIT License](/LICENSE).