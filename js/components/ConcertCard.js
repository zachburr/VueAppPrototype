// Component names should be TitleCase/PascalCase
// and should be multi-word, but singular in plurality.
// When used in HTML/templates, they become kabob-case.
import ConcertTab from "./ConcertTab.js";
import ConcertSetlist from "./ConcertSetlist.js";
import ConcertPhotoCollection from "./ConcertPhotoCollection.js";
import ConcertVideoCollection from "./ConcertVideoCollection.js";
import EditConcertModal from "./EditConcertModal.js";
import ConcertInfo from "./ConcertInfo.js";
import ConcertTabButton from "./ConcertTabButton.js";
import StarRating from "./StarRating.js";

const ConcertCard = {
    components: {
        ConcertTab,
        ConcertSetlist,
        ConcertPhotoCollection,
        ConcertVideoCollection,
        ConcertInfo,
        EditConcertModal,
        ConcertTabButton,
        StarRating,
    },
    data: function(){
        return {
            keyword: '',
            sortBy: 'date'
        }
    },
    props: {
        concerts: {type: Array, required: true },
    },
    emits: ["save-setlist", "save-photos", "save-videos", "save-info", "edit-concert", "delete-concert", "save-rating"],
    methods: {
        formattedDate(date){
            //Adding T00:00:00 uses local midnight so timezone conversion doesn't display the previous day
            return new Date(date + 'T00:00:00').toLocaleDateString('en-US')
        }
    },
    computed: {
        filteredConcerts() {
            //filtering for search
            const filtered = this.concerts.filter(concert =>
                concert.artist.toLowerCase().includes(this.keyword) ||
                concert.venue.toLowerCase().includes(this.keyword));
            //sorting for dropdown
            if (!this.sortBy) return filtered;
            //reversed comparison for date, allows it to show concerts in correct order
            if (this.sortBy === 'date') {
                return filtered.sort((a,b) => b[this.sortBy].localeCompare(a[this.sortBy]));
            }
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
                      {{ concert.artist }} - {{ formattedDate(concert.date) }}
                    </h4>
                    <p class="concert-venue mt-2">
                      {{ concert.venue }}
                    </p>
                  </div>
                  <!--Stars and edit button-->
                  <div class="d-flex flex-column align-items-md-end gap-3">
                    <star-rating :concert="concert" @save="rating => $emit('save-rating', concert, rating)"></star-rating>
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
                  <ConcertTabButton title="Songs" :concert-id="concert.id" tab="songs">
                    <span class="badge text-bg-secondary">{{ concert.setlist.length }}</span>
                  </ConcertTabButton>
                  <!--Photos Button tab-->
                  <ConcertTabButton title="Photos" :concert-id="concert.id" tab="photos">
                    <span class="badge text-bg-secondary">{{ concert.photos.length }}</span>
                  </ConcertTabButton>
                  <!--Videos Button tab-->
                  <ConcertTabButton title="Videos" :concert-id="concert.id" tab="videos">
                    <span class="badge text-bg-secondary">{{ concert.videos.length }}</span>
                  </ConcertTabButton>
                  <!--Info Button tab-->
                  <ConcertTabButton title="Info" :concert-id="concert.id" tab="info"></ConcertTabButton>
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
