import { ConcertCollection } from "@/models/ConcertCollection.js";
class Artist {
    id = ''
    name = ''
    concertCollection = new ConcertCollection(this);

    /**
     *
     * @returns {concert[]}
     */
    get concerts() {
        return this.concertCollection.concerts;
    }
    constructor( name, id = crypto.randomUUID() ) {
        this.id = id;
        this.name = name;

    }
    /**
     *
     * @returns {string}
     */
    toString(){
        return this.name;
    }
    /**
     * returns the artists upcoming concerts sorted by date
     * @returns {Concert[]} an array of upcoming concerts
     */
    upcomingConcerts() {
        return this.concertCollection.filterUpcomingConcerts();
    }
    /**
     * returns the artist's past concerts sorted by date
     * @returns {Concert[]} an array of past concerts
     */
    pastConcerts() {
        return this.concertCollection.filterPastConcerts();
    }
}

export {Artist}