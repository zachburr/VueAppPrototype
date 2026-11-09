# Change Log
## [v2.5] - 10-20-26
### Added
* **Component:** Created ```ConcertTabButton.js```, a reusable tab button component for concert cards
* **Component:** Created ```ConcertListWidget.js```, a reusable component for different card lists on the home page depending on if the concerts are upcoming or past
* **Component:** Created ```BasicConcertCard.js```, a reusable basic card to display Artist,  a formatted Date, and Venue as well as depending on the date will show different information
* **Component:** Created ```StarRating.js```, a reusable star rating component that will reflect ratings that belong to an object in all the places it is used by giving it a ratingId
* **All Concerts:** Added date formatting for ```ConcertCard.js```
* **Home:** Added functionality to populate concert lists based on added concerts
* **Home:** Added star rating option for past concerts list
* **Home:** Added functionality to show a warning label for upcoming concerts that are less than a week away
* 
### Changed
* **All:** Changed headers to look the same across the whole site
* **Component:** Refactored ```ConcertCard.js``` to use the reusable ```ConcertTabButton.js``` component
* **Component:** Refactored ```ConcertCard.js``` to use the reusable ```StarRating.js``` component
* **Component:** Changed ```ConcertCard.js``` to sort the date by most recent date first
* **Component:** Changed ```ConcertCard.js``` to sort by date by default
### Removed
* **Home:** Removed card containers surrounding upcoming and past concert lists
* **Home:** Removed static content from upcoming and past concert lists

## [v4.0] - 11-8-26
### Added
* **Models:** Created ```Artist.js``` and ```Concert.js```
* **Collections:** Created```ArtistColelction.js```, and ```ConcertCollection.js```
* **Documentation:** Added Doc-Blocks to Methods moved into Models and Collections
### Changed
* **Data Structure:** Changed data to have Artist own their own collection of Concerts using composition
* **Add Functionality:** Refactored functionality that has to do with adding a concert into models and collections
* **Delete Functionality:** Refactored functionality that has to do with deleting a concert into models and collections
* **Filtering and Sorting:** Split up Methods into different date checker, filter, and Looping to display into separate methods
* **Dropdown Methods:** Moved dropdown methods into collections for reuse
### Removed
* **Filtering and Sorting:** Removed repeated date checks and comparisons from list components
* **Dropdown Computed:** Removed dropdown computed methods