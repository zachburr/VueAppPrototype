import {Artist} from "@/models/Artist.js";
import {Concert} from "@/models/Concert.js";

export class ArtistCollection {
    artists = [];
    constructor(artists = []) {
        this.artists = artists;
    }
    /**
     * Adds an artist to the collection
     * @param artist {Artist}
     *
     */
    addArtist(artist) {
        this.artists.push(artist);
    }
    /**
     * finds an artist in the collection by name
     * @param {string} name name of the artist
     * @returns {Artist} matching artist
     */
    findArtist(name) {
        return this.artists.find(artist => artist.name === name);
    }
    // COMBINES AND SORTS ALL FILTERED CONCERTS
    /**
     * loops through all artists and returns the concerts that happen on or after today
     * @returns {Concert[]}
     */
    allUpcomingConcerts(){
        const upcoming = [];

        this.artists.forEach(artist => {
            const matches = artist.upcomingConcerts();
            upcoming.push(...matches);
        });
        return upcoming.sort((a, b) => a.date.localeCompare(b.date));
    }

    /**
     * loops through all artists and returns the concerts that happened before today
     * @returns {Concert[]}
     */
    allPastConcerts(){
        const past = [];

        this.artists.forEach(artist => {
            const matches = artist.pastConcerts();
            past.push(...matches);
        });
        return past.sort((a, b) => a.date.localeCompare(b.date));
    }
    /**
     * checks an artists name if it already exists uses it otherwise adds a new artist
     * @param {string} name the name of the artist
     * @returns {Artist} existing or created artist
     */
    artistCheck(name){
        let artist = this.findArtist(name)
        if (artist === undefined) {
            artist = new Artist(name);
            this.addArtist(artist);
        }
        return artist;
    }
    /**
     * finds or creates the artist, creates a new concert, and adds it to the artists ConcertCollection
     * @param {Object} concert the concert added from the form
     */
    addConcertToArtist(concert) {
        const artist = this.artistCheck(concert.artist);
        const newConcert = new Concert(concert.date, concert.venue);
        artist.concertCollection.addConcert(newConcert);
    }

    /**
     * gets the names of all artists in the collection
     * @returns {string[]} array of artist names
     */
    getArtistNames() {
        return this.artists.map(artist => artist.name);
    }

    /**
     * gets a list of unique venue names from all the artists concerts
     * @returns {string[]} array of unique venue names
     */
    getVenueNames() {
        const venues = []
        this.artists.forEach(artist =>{
            const matches = artist.concerts.map(concert => concert.venue);
            venues.push(...matches);
        })
        return [...new Set(venues)];
    }

    /**
     * moves a concert to a different artist and removes the old artist
     * if they no longer have any concerts
     * @param {Concert} concert - The concert being reassigned
     * @param {string} artistName - The name of the new artist
     */
    changeConcertArtist(concert, artistName) {
        //stops if the concert already belongs to the selected artist
        if (concert.artist.name === artistName) {
            return;
        }
        //saves the original artist and finds or creates the new artist
        const oldArtist = concert.artist;
        const newArtist = this.artistCheck(artistName);
        //moves the concert between the artists' collections
        oldArtist.concertCollection.deleteConcert(concert);
        newArtist.concertCollection.addConcert(concert);
        //removes the original artist if they have no remaining concerts
        if (oldArtist.concerts.length === 0) {
            const index = this.artists.indexOf(oldArtist);
            this.artists.splice(index, 1);
        }
    }
}