import {createApp} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = createApp({
    // data for the app
    data: function (){

        return{
            newConcert: {
                artist: '',
                venue: '',
                date: '',
                rating: 0,
                setlist: [],
                photos: [],
                videos: [],
                ticketPrice: '',
                seat: '',
                attendedWith: '',
                notes: ''
            },
            editConcertRef: {},
            editConcert:{
                artist: '',
                venue: '',
                date: '',
                rating: 0,
                setlist: [],
                photos: [],
                videos: [],
                ticketPrice: '',
                seat: '',
                attendedWith: '',
                notes: ''
            },
            editSetlist: [],
            editSetlistRef: null,
            editPhotos: [],
            editPhotosRef: null,
            editVideos: [],
            editVideosRef: null,
            editInfo: {
                ticketPrice: '',
                seat: '',
                attendedWith: '',
                notes: ''
            },
            editInfoRef: {},
            concerts: [
                {
                    id: 1,
                    artist: "Avenged Sevenfold",
                    venue: "Credit Union 1 Amphitheatre",
                    date: "2026-07-30",
                    rating: 5,
                    setlist: [
                        "Nightmare",
                        "Afterlife",
                        "Bat Country",
                        "Nobody",
                        "Save Me",
                        "Unholy Confessions"
                    ],
                    photos: [
                        "img/A7XLTL.webp",
                        "img/A7xDual.jpg",
                        "img/MShadows.jpg",
                        "img/thestage.jpg"
                    ],
                    videos: [
                        "https://www.youtube.com/embed/G2MGA4McN1Q?si=rnloJccrIjJreSGz"
                    ],
                    ticketPrice: "$175.00",
                    seat: "General Admission",
                    attendedWith: "Caleb, Kate, and Sam",
                    notes: "One of the best shows I've been to. The Stage and Save Me were the highlights of the night."
                }
            ]

        }
    },
    // methods: usually "events" triggered by v-on:
    methods: {
        // concert methods
        removeConcert: function (concert){
            this.concerts.splice(this.concerts.indexOf(concert), 1)
        },
        addConcert() {
            if (this.newConcert.artist) {
                this.concerts.push({
                    id: this.concerts.length + 1,
                    artist: this.newConcert.artist,
                    venue: this.newConcert.venue,
                    date: this.newConcert.date,
                    rating: 0,
                    setlist: [],
                    photos: [],
                    videos: [],
                    ticketPrice: '',
                    seat: '',
                    attendedWith: '',
                    notes: '',
                });
                this.clearForm();
            }
        },
        saveConcertEdit: function() {
            Object.assign(this.editConcertRef, this.editConcert)
        },
        // setlist methods
        saveSetlistEdit() {
            this.editSetlistRef.setlist = [...this.editSetlist];
        },
        addSong(){
            this.editSetlist.push('');
        },
        removeSong(song){
            this.editSetlist.splice(this.editSetlist.indexOf(song), 1)
        },
        // photo methods
        savePhotosEdit(){
            this.editPhotosRef.photos = [...this.editPhotos];
        },
        addPhoto(){
            this.editPhotos.push('');
        },
        removePhoto(photo){
            this.editPhotos.splice(this.editPhotos.indexOf(photo), 1)
        },
        // video methods
        saveVideosEdit(){
            this.editVideosRef.videos = [...this.editVideos];
        },
        addVideo(){
            this.editVideos.push('');
        },
        removeVideo(video){
            this.editVideos.splice(this.editVideos.indexOf(video), 1)
        },
        // info methods
        saveInfoEdit: function(){
            Object.assign(this.editInfoRef, this.editInfo)
        },
        clearForm() {
            this.newConcert = {
                artist: '',
                venue: '',
                date: '',
                rating: 0,
                setlist: [],
                photos: [],
                videos: [],
                ticketPrice: '',
                seat: '',
                attendedWith: '',
                notes: ''
            };
        }
    },


    // computed: values that are updated and cached if dependencies change
    computed: {
        // Set - javaScript object that stores a collection of values where each value can only appear once
        // Map - An array method that goes through each item in an array and creates a new array from the results
        // => - An arrow function, which is a shorter syntax for writing a function same as: function(concert) {return concert.____;}
        // size - returns the number of values in a Set
        uniqueArtists() {
            return new Set(this.concerts.map(concert => concert.artist)).size;
        },
        uniqueVenues() {

            return new Set(this.concerts.map(concert => concert.venue)).size;
        },
        artistOptions() {
            return [...new Set(this.concerts.map(concert => concert.artist))];
        },
        venueOptions() {
            return [...new Set(this.concerts.map(concert => concert.venue))];
        }

    },

    //mounted:  called after the instance has been mounted,
    mounted: function () {
        if (localStorage.getItem('concerts')){
            this.concerts = JSON.parse(localStorage.getItem('concerts'))
        }
    },

    // watch:   calls the function if the value changes
    // https://travishorn.com/add-localstorage-to-your-vue-app-in-2-lines-of-code-56eb2c9f371b
    watch: {
        concerts : {
            handler: function () {
                localStorage.setItem('concerts', JSON.stringify(this.concerts))
            },
            deep: true, //also watch objects inside array
        },


    },

});

export default app;