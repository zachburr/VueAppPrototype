export class ConcertCollection {
    concerts = [];
    constructor(artist, concerts = []) {
        this.artist = artist;
        this.concerts = concerts;
    }

    /**
     * links concert to its artist and adds it to the collection
     * @param concert the concert being pushed
     */
    addConcert(concert) {
        concert.artist = this.artist;
        this.concerts.push(concert);
        console.log(this.concerts);
    }

    /**
     * finds the concert to be removed by index
     * @param concert {Concert} the concert to remove
     */
    deleteConcert( concert ) {
        const index = this.concerts.indexOf(concert);
        this.concerts.splice(index, 1);
    }
    // TAKE DATE CHECKS AND FILTERS/SORTS THE DATES
    /**
     * filters all concerts by if the date is today or upcoming
     * @returns {Concert[]} array of concerts returned
     */
    filterUpcomingConcerts() {
        //finds concerts later than or on today and stores it in matches
        const matches = this.concerts.filter(concert => concert.dateUpcoming())
        //return upcoming array sorted
        return matches.sort((a, b) => a.date.localeCompare(b.date))
    }
    /**
     * filters all concerts by if the date is past
     * @returns {Concert[]} array of concerts returned
     */
    filterPastConcerts() {
        //finds concerts before today and stores it in matches
        const matches = this.concerts.filter(concert => concert.datePast());
        //returns past array sorted
        return matches.sort((a, b) => b.date.localeCompare(a.date));
    }
}