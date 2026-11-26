class Concert {
    constructor(
        date,
        venue,
        rating = 0,
        setlist = [],
        photos = [],
        videos = [],
        ticketPrice = 0,
        seat = '',
        attendedWith = '',
        notes = '',
        id = crypto.randomUUID(),  ) {
        this.date = date;
        this.venue = venue;
        this.rating = rating;
        this.setlist = setlist;
        this.photos = photos;
        this.videos = videos;
        this.ticketPrice = ticketPrice;
        this.seat = seat;
        this.attendedWith = attendedWith;
        this.notes = notes;
        this.id = id
    }
    toJSON(){
        const { _artist, ...publicFields} = this;
        return publicFields;
    }
    _artist;

    /**
     *
     * @param artist {Artist}
     */
    set artist(artist) {
        this._artist = artist;
    }

    /**
     *
     * @returns Artist
     */
    get artist() {
        return this._artist;
    }

    artistName(){
        return this._artist.name;
    }
    // DATE CHECKS
    /**
     * checks whether the concert date is today or in the future
     * @returns {boolean} true if the concert is upcoming otherwise false
     */
    dateUpcoming() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(this.date + "T00:00:00") >= today;
    }
    /**
     * checks whether the concert date is before today
     * @returns {boolean} true if the concert is before today otherwise false
     */
    datePast() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(this.date + "T00:00:00") < today;
    }
    /**
     * Checks whether the concert is today or within the next six days.
     * @returns {boolean}
     */
    dateSoon() {
        const nextWeek = new Date();
        nextWeek.setHours(0, 0, 0, 0);
        nextWeek.setDate(nextWeek.getDate() + 7);

        return this.dateUpcoming() &&
            new Date(this.date + 'T00:00:00') < nextWeek;
    }
    /**
     * Formats the concert date for display.
     * @returns {string} The formatted concert date.
     */
    formattedDate(){
        //Adding T00:00:00 uses local midnight so timezone conversion doesn't display the previous day
        return new Date(this.date + 'T00:00:00').toLocaleDateString('en-US')
    }

    /**
     * Updates the concert's date and venue using the edited values.
     * @param {Object} changes - The edited concert information.
     */
    updateConcert(changes) {
        this.date = changes.date;
        this.venue = changes.venue;
    }

    /**
     * updates the concert's setlist
     * @param {string[]} setlist - the updated list of songs
     */
    updateSetlist(setlist) {
        this.setlist = setlist;
    }

    updatePhotos(photos) {
        this.photos = photos;
    }

    updateVideos(videos) {
        this.videos = videos;
    }

    updateInfo(info) {
        this.ticketPrice = info.ticketPrice;
        this.seat = info.seat;
        this.attendedWith = info.attendedWith;
        this.notes = info.notes;
    }

    updateRating(rating) {
        this.rating = rating;
    }
}
export {Concert};