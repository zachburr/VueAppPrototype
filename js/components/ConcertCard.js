// Component names should be TitleCase/PascalCase
// and should be multi-word, but singular in plurality.
// When used in HTML/templates, they become kabob-case.
import ConcertTab from "./ConcertTab.js";
import ConcertSetlist from "./ConcertSetlist.js";
import ConcertPhotoCollection from "./ConcertPhotoCollection.js";
import ConcertVideoCollection from "./ConcertVideoCollection.js";
import ConcertInfo from "./ConcertInfo.js";
import concertSetlist from "./ConcertSetlist.js";
const ConcertCard = {
    components: {
        ConcertTab,
        ConcertSetlist,
        ConcertPhotoCollection,
        ConcertVideoCollection,
        ConcertInfo,
    },
    // data:    Data created and maintained by this component.
    //          This function is like a constructor. It gets called
    //          separately for each instance of this component
    data: function(){
        return {}
    },

    // props:   Data passed into the component via attributes.
    //          Props can be optional or required. Objects and arrays
    //          are pass-by-reference. Primitives (number, string, boolean)
    //          are pass-by-value.
    props: {
        concert: {type: Object, required: true},
    },
    emits: ["edit-concert", "save-setlist", "save-photos", "save-videos", "save-info"],

    // methods: Usually "events" triggered by v-on:
    methods: {

    },

    // computed:    Values that are updated and cached if dependencies change.
    //              Computed value functions need to return a value.
    //              Treat these like regular values that you would use
    //              in data or props.
    computed: {
        concertSetlist() {
            return concertSetlist
        }

    },

    // template:    A string "template" of HTML. It should consist of only
    //              ONE root HTML element. You can reference any
    //              data, props, methods, computed, etc using: {{ name }}
    template: `
      <div class="card concert-card m-2 mx-4">
        <div class="card-body">
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <!--Card header-->
            <div>
              <h4 class="concert-title mb-0">
                {{concert.artist}} - {{concert.date}}
              </h4>
              <p class="concert-venue mt-2">
                {{concert.venue}}
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
              <button
                  type="button"
                  class="btn btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#editConcertModal"
              @click="$emit('edit-concert', concert)">
<!--                  @click="editConcert = {...concert}; editConcertRef = concert">-->
                <i class="bi bi-pencil-square"></i>
                Edit Concert
              </button>
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
                <span class="badge text-bg-secondary">{{concert.setlist.length}}</span>
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
                <span class="badge text-bg-secondary">{{concert.photos.length}}</span>
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
                <span class="badge text-bg-secondary">{{concert.videos.length}}</span>
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
                <span class="badge text-bg-secondary">0</span>
              </button>
            </div>
          </div>
          <!--Tab Details-->
          <div :id="'concertDetails' + concert.id">
            <!--Setlist Tab-->
            <concert-tab title="Setlist" :concert-id="concert.id" tab="songs">
                <concert-setlist :songs="concert.setlist" @save="setlist => $emit('save-setlist', concert, setlist)"></concert-setlist>
            </concert-tab>
            <!--Images Tab-->
            <concert-tab title="Photos" :concert-id="concert.id" tab="photos">
                <concert-photo-collection :photos="concert.photos" @save="photos => $emit('save-photos', concert, photos)"></concert-photo-collection>
            </concert-tab>
            <!--Video Tab-->
            <concert-tab title="Videos" :concert-id="concert.id" tab="videos">
              <concert-video-collection :videos="concert.videos" @save="videos => $emit('save-videos', concert, videos)"></concert-video-collection>
            </concert-tab>
            <!--Info Tab-->
            <concert-tab title="Info" :concert-id="concert.id" tab="info">
                <concert-info   :ticket-price="concert.ticketPrice"
                                :seat="concert.seat"
                                :attended-with="concert.attendedWith"
                                :notes="concert.notes" 
                                @save="info => $emit('save-info', concert, info)"></concert-info>
            </concert-tab>
          </div>
        </div>
      </div>
    `,
};

export default ConcertCard;
