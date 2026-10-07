import {createApp} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import ConcertCard from "./components/ConcertCard.js";
import AddConcertModal from "./components/AddConcertModal.js";
import editConcertModal from "./components/EditConcertModal.js";
import BsModal from "./components/BsModal.js";
const app = createApp({
    components: {
        ConcertCard,
        AddConcertModal,
        editConcertModal,
        BsModal,
    },
    // data for the app
    data: function (){

        return{
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
        addConcert(concert) {
                this.concerts.push(concert);
        },
        saveConcertEdit(concert, editedConcert) {
            Object.assign(concert,  editedConcert);
        },
        saveSetlist(concert, setlist) {
            concert.setlist = setlist;
        },
        savePhotos(concert, photos) {
            concert.photos = photos;
        },
        saveVideos(concert, videos) {
            concert.videos = videos;
        },
        saveInfo(concert, info) {
            Object.assign(concert, info)
        },

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
        // uniqueVenues() {
        //
        //     return new Set(this.concerts.map(concert => concert.venue)).size;
        // },

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