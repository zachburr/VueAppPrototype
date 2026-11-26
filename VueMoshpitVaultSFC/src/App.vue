<script>

import ConcertCard from "@/components/ConcertCard.vue";
import AddConcertModal from "@/components/AddConcertModal.vue";
import editConcertModal from "@/components/EditConcertModal.vue";
import BsModal from "@/components/BsModal.vue";
import BasicConcertCard from "@/components/BasicConcertCard.vue";
import ConcertListWidget from "@/components/ConcertListWidget.vue";
import {Artist} from "@/models/Artist.js";
import {Concert} from "@/models/Concert.js";
import {ArtistCollection} from "@/models/ArtistCollection.js";

export default {
  components: {
    ConcertCard,
    AddConcertModal,
    editConcertModal,
    BsModal,
    BasicConcertCard,
    ConcertListWidget,
  },
  // data for the app
  data: function (){
    let sampleA = new Artist('Avenged Sevenfold')
    sampleA.concertCollection.addConcert(
        new Concert(
            "2026-07-30",
            new Venue("Credit Union One Amphitheatre"),
            5,
            [
              "Nightmare",
              "Afterlife",
              "Bat Country",
              "Nobody",
              "Save Me",
              "Unholy Confessions"
            ],
            [
              "/img/A7XLTL.webp",
              "/img/A7xDual.jpg",
              "/img/MShadows.jpg",
              "/img/thestage.jpg"
            ],
            [
              "https://www.youtube.com/embed/G2MGA4McN1Q?si=rnloJccrIjJreSGz"
            ],
            175.00,
            "General Admission",
            "Caleb, Kate, and Sam",
            "One of the best shows I've been to. The Stage and Save Me were the highlights of the night."
        ));
    return{
      artistCollection: new ArtistCollection([sampleA]),
    }
  },
  // methods: usually "events" triggered by v-on:
  methods: {
    // concert methods
    removeConcert(concert){
      concert.artist.concertCollection.deleteConcert(concert);
    },
    addConcert(concert) {
      this.artistCollection.addConcertToArtist(concert);
    },
    saveConcertEdit(concert, editedConcert) {
      //updates the concert's date and venue
      concert.updateConcert(editedConcert);
      //moves the concert to the selected artist if necessary
      this.artistCollection.changeConcertArtist(concert, editedConcert.artist);
    },
    saveSetlist(concert, setlist) {
      concert.updateSetlist(setlist);
    },
    savePhotos(concert, photos) {
      concert.updatePhotos(photos);
    },
    saveVideos(concert, videos) {
      concert.updateVideos(videos);
    },
    saveInfo(concert, info) {
      concert.updateInfo(info);
    },
    saveRating(concert, rating) {
      concert.updateRating(rating);
    }

  },

  //mounted:  called after the instance has been mounted,
  mounted: function () {
    // if (localStorage.getItem('concerts')){
    //   this.concerts = JSON.parse(localStorage.getItem('concerts'))
    // }
  },

  // watch:   calls the function if the value changes
  // https://travishorn.com/add-localstorage-to-your-vue-app-in-2-lines-of-code-56eb2c9f371b
  watch: {
    // concerts : {
    //   handler: function () {
    //     localStorage.setItem('concerts', JSON.stringify(this.concerts))
    //   },
    //   deep: true, //also watch objects inside array
    // },


  },

}
</script>

<template>
  <body data-bs-theme="dark" id="app">
  <!--Page header-->
  <header class="">
    <div class="container-lg">
      <!--        Page title-->
      <div class="p-2">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center logo">
            <img class="img-fluid" src="/img/MoshpitVault.png"
                 alt="Concert Log Logo">
            <h1 class="justify-content-start text-white ps-4 text-nowrap ">Moshpit Vault</h1>
          </div>
        </div>
      </div>
      <!--        Page tabs-->
      <div class="">
        <nav class="">
          <ul class="nav nav-pills mb-2" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <RouterLink to="/" class="nav-link" exact-active-class="active">
                Home
              </RouterLink>
            </li>
            <li class="nav-item" role="presentation">
              <RouterLink to="/concerts" class="nav-link" exact-active-class="active">
                All Concerts
                <span class="badge text-bg-secondary">{{ }}</span>
              </RouterLink>
            </li>
            <li class="nav-item" role="presentation">
              <RouterLink to="/artists" class="nav-link" exact-active-class="active">
                Artists
                <span class="badge text-bg-secondary">{{  }}</span>
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>

  </header>
  <div class="picture-background">
    <main class="container-lg py-4">
      <div >
        <div>
          <!--Page tabs-->
          <div class="tab-content" id="pills-tabContent">
            <!--Home tab-->
            <!--All concerts tab-->
            <!--Artists tab-->
            <RouterView
                :artists="artistCollection.artists"
                :artist-collection="artistCollection"
                @add-concert="addConcert"
                @delete-concert="removeConcert"
                @edit-concert="saveConcertEdit"
                @save-setlist="saveSetlist"
                @save-photos="savePhotos"
                @save-videos="saveVideos"
                @save-info="saveInfo"
                @save-rating="saveRating"/>
          </div>
        </div>
      </div>
    </main>
  </div>
  <footer class="py-4">
    <div class="container">
      <h6 class="mb-1 text-white">Moshpit Vault</h6>

      <div class="row g-4">
        <div class="col-12 col-md-4">
          <h6 class="text-white">Important Links</h6>
          <div class="d-flex flex-column gap-2">
            <a href="">Home</a>
            <a href="">Concerts</a>
            <a href="">Artists</a>
          </div>
        </div>

        <div class="col-12 col-md-4">
          <h6 class="text-white">Helpful Links</h6>
          <div class="d-flex flex-column gap-2">
            <a href="">Spotify</a>
            <a href="">Google Maps</a>
            <a href="">Music News</a>
          </div>
        </div>

        <div class="col-12 col-md-4">
          <h6 class="text-white">More</h6>
          <div class="d-flex flex-column gap-2">
            <a href="">About Concert Log</a>
            <a href="">Contact</a>
            <a href="">Privacy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
  </body>
</template>

<style lang="scss" scoped>
@import "@/scss/variables";
header {
  border-bottom: 1px solid $primary;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 1);
  .logo{
    width: 75px;
    height: auto;

  }
  ul {
    justify-content: center;

  }
  nav{
    padding-bottom: 5px;
  }
  .nav-pills {
    gap: 0.5rem;

    .nav-link {
      border-radius: 999px;
      padding: 0.5rem 1rem;
      min-width: 110px;
      text-align: center;

      &:hover {
        background-color: #ffffff;
        color:$primary;
      }

      &.active {
      }
    }
  }
}
main {
  background-color: var(--bs-body-bg);
  margin: 4rem auto;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 1);
}
.picture-background {
  background-image: url("./img/concertCrowd.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding-block: 1rem;
}


footer{
  border-top: 1px solid $primary;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 1);
}
</style>
