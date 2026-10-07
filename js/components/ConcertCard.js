// Component names should be TitleCase/PascalCase
// and should be multi-word, but singular in plurality.
// When used in HTML/templates, they become kabob-case.
import ConcertTab from "./ConcertTab.js";
import ConcertSetlist from "./ConcertSetlist.js";
import ConcertPhotoCollection from "./ConcertPhotoCollection.js";
import ConcertVideoCollection from "./ConcertVideoCollection.js";
import EditConcertModal from "./EditConcertModal.js";
import ConcertInfo from "./ConcertInfo.js";
import concertSetlist from "./ConcertSetlist.js";

const ConcertCard = {
    components: {
        ConcertTab,
        ConcertSetlist,
        ConcertPhotoCollection,
        ConcertVideoCollection,
        ConcertInfo,
        EditConcertModal,
    },
    data: function(){
        return {
            keyword: '',
            sortBy: ''
        }
    },
    props: {
        concerts: {type: Array, required: true },
    },
    emits: ["save-setlist", "save-photos", "save-videos", "save-info", "edit-concert", "delete-concert"],
    methods: {

    },
    computed: {
        filteredConcerts() {
            //filtering for search
            const filtered = this.concerts.filter(concert =>
                concert.artist.toLowerCase().includes(this.keyword) ||
                concert.venue.toLowerCase().includes(this.keyword));
            //sorting for dropdown
            if (!this.sortBy) return filtered;

            return filtered.sort((a,b) => a[this.sortBy].localeCompare(b[this.sortBy]));
        },



    },
    template: `
      <div class="mx-4">
        <div class="row align-items-center my-4">
          <div class="col-12 col-md-6">
            <label for="concertSearch" class="visually-hidden">Search Concerts</label>
            <input
                type="search"
                id="concertSearch"
                class="form-control"
                placeholder="Search Concerts"
                v-model="keyword">
          </div>
          <div class="col-12 col-md-3 ms-md-auto mt-3 mt-md-0">
            <label for="concertSort" class="visually-hidden">Sort By</label>
            <select id="concertSort" class="form-select" v-model="sortBy">
              <option value="">Sort By</option>
              <option value="artist">Artist</option>
              <option value="date">Date</option>
              <option value="venue">Venue</option>
            </select>
          </div>
        </div>
        <div v-for="concert in filteredConcerts" :key="concert.id" class="card concert-card my-3">
          <div class="row gx-0">
            <div class="col-12 col-md-3 d-none d-md-block">
              <img :src="concert.photos[0]" class="concert-card-photo rounded-start"
                   alt="Artist Photo">
            </div>
            <div class="col-12 col-md-9">
              <div class="card-body concert-card">
                <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                  <!--Card header-->
                  <div>
                    <h4 class="concert-title mb-0">
                      {{ concert.artist }} - {{ concert.date }}
                    </h4>
                    <p class="concert-venue mt-2">
                      {{ concert.venue }}
                    </p>
                  </div>
                  <!--Stars and edit button-->
                  <div class="d-flex flex-column align-items-md-end gap-3">
                    <div class="rating">
                      <input type="radio"
                             :id="'star-' + concert.id + '-5'"
                             :name="'rating' + concert.id"
                             value="5"
                             v-model="concert.rating">
                      <label :for="'star-' + concert.id + '-5'">
                        <i class="bi bi-star-fill"></i>
                      </label>
                      <input type="radio"
                             :id="'star-' + concert.id + '-4'"
                             :name="'rating' + concert.id"
                             value="4"
                             v-model="concert.rating">
                      <label :for="'star-' + concert.id + '-4'">
                        <i class="bi bi-star-fill"></i>
                      </label>
                      <input type="radio"
                             :id="'star-' + concert.id + '-3'"
                             :name="'rating' + concert.id"
                             value="3"
                             v-model="concert.rating">
                      <label :for="'star-' + concert.id + '-3'">
                        <i class="bi bi-star-fill"></i>
                      </label>
                      <input type="radio"
                             :id="'star-' + concert.id + '-2'"
                             :name="'rating' + concert.id"
                             value="2"
                             v-model="concert.rating">
                      <label :for="'star-' + concert.id + '-2'">
                        <i class="bi bi-star-fill"></i>
                      </label>
                      <input type="radio"
                             :id="'star-' + concert.id + '-1'"
                             :name="'rating' + concert.id"
                             value="1"
                             v-model="concert.rating">
                      <label :for="'star-' + concert.id + '-1'">
                        <i class="bi bi-star-fill"></i>
                      </label>
                    </div>
                    <edit-concert-modal :concert="concert"
                                        :concerts="concerts"
                                        @delete-concert="$emit('delete-concert', concert)"
                                        @edit-concert="editedConcert => $emit('edit-concert', concert, editedConcert)">

                    </edit-concert-modal>
                  </div>
                </div>
                <!--Card button tabs-->
                <div class="row g-2 mt-3">
                  <!--Songs Button tab-->
                  <div class="col-6 col-sm-auto">
                    <button
                        type="button"
                        class="btn btn-primary w-100 w-sm-auto"
                        data-bs-toggle="collapse"
                        :data-bs-target="'#songsCollapse' + concert.id"
                        aria-expanded="false"
                        :aria-controls="'songsCollapse' + concert.id">

                      Songs
                      <span class="badge text-bg-secondary">{{ concert.setlist.length }}</span>
                    </button>
                  </div>
                  <!--Photos Button tab-->
                  <div class="col-6 col-sm-auto">
                    <button
                        type="button"
                        class="btn btn-primary w-100 w-sm-auto"
                        data-bs-toggle="collapse"
                        :data-bs-target="'#photosCollapse' + concert.id"
                        aria-expanded="false"
                        :aria-controls="'photosCollapse' + concert.id">

                      Photos
                      <span class="badge text-bg-secondary">{{ concert.photos.length }}</span>
                    </button>
                  </div>
                  <!--Videos Button tab-->
                  <div class="col-6 col-sm-auto">
                    <button
                        type="button"
                        class="btn btn-primary w-100 w-sm-auto"
                        data-bs-toggle="collapse"
                        :data-bs-target="'#videosCollapse' + concert.id"
                        aria-expanded="false"
                        :aria-controls="'videosCollapse' + concert.id">

                      Videos
                      <span class="badge text-bg-secondary">{{ concert.videos.length }}</span>
                    </button>
                  </div>
                  <!--Info Button tab-->
                  <div class="col-6 col-sm-auto">
                    <button
                        type="button"
                        class="btn btn-primary w-100 w-sm-auto"
                        data-bs-toggle="collapse"
                        :data-bs-target="'#infoCollapse' + concert.id"
                        aria-expanded="false"
                        :aria-controls="'infoCollapse' + concert.id">

                      Info
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!--Tab Details-->
            <div class="px-3" :id="'concertDetails' + concert.id">
              <!--Setlist Tab-->
              <concert-tab title="Setlist" :concert-id="concert.id" tab="songs">
                <concert-setlist :songs="concert.setlist"
                                 @save="setlist => $emit('save-setlist', concert, setlist)"></concert-setlist>
              </concert-tab>
              <!--Images Tab-->
              <concert-tab title="Photos" :concert-id="concert.id" tab="photos">
                <concert-photo-collection :photos="concert.photos"
                                          @save="photos => $emit('save-photos', concert, photos)"></concert-photo-collection>
              </concert-tab>
              <!--Video Tab-->
              <concert-tab title="Videos" :concert-id="concert.id" tab="videos">
                <concert-video-collection :videos="concert.videos"
                                          @save="videos => $emit('save-videos', concert, videos)"></concert-video-collection>
              </concert-tab>
              <!--Info Tab-->
              <concert-tab title="Info" :concert-id="concert.id" tab="info">
                <concert-info :ticket-price="concert.ticketPrice"
                              :seat="concert.seat"
                              :attended-with="concert.attendedWith"
                              :notes="concert.notes"
                              @save="info => $emit('save-info', concert, info)"></concert-info>
              </concert-tab>
            </div>
          </div>
        </div>
      </div>
    `,
};

export default ConcertCard;
