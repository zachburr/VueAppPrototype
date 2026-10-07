import BsModal from "./BsModal.js";
const EditConcertModal = {
    components: {
        BsModal,
    },
    data() {
        return{
            deleting: false,
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
        }
    },
    props: {
        concert: {type: Object, required: true},
        concerts: { type: Array, required: true },
    },
    emits: ["edit-concert", "delete-concert"],
    methods: {
        // calling bootstrap methods
        open(){
            this.$refs.modal.open();
        },
        close(){
            this.$refs.modal.close();
        },
        openConcertEdit(concert) {
            this.deleting = false;
            this.editConcert = {...concert};
            this.editConcertRef = concert;
            this.open();
        },
        saveConcertEdit() {
            this.$emit('edit-concert', this.editConcert);
            this.close();
        },
        deleteConcert(){
            this.$emit('delete-concert', this.concert)
        },
    },
    computed: {
        artistOptions() {
            return [...new Set(this.concerts.map(concert => concert.artist))];
        },
        venueOptions() {
            return [...new Set(this.concerts.map(concert => concert.venue))];
        }
    },

    template: `
      <div>
        <button type="button" class="btn btn-outline-primary mt-3" @click="openConcertEdit(concert)">
          <i class="bi bi-pencil-square"></i>
          Edit Concert
        </button>
        <bs-modal :title="!deleting ? 'Edit Concert' : 'Delete Concert'" @submit="saveConcertEdit" ref="modal">
          <div v-if="!deleting">
            <div class="accordion" id="concertAccordion">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#bandInfo"
                      aria-expanded="true"
                      aria-controls="bandInfo">
                    Band / Artist
                  </button>
                </h2>
                <div
                    id="bandInfo"
                    class="accordion-collapse collapse show"
                    data-bs-parent="#concertAccordion">
                  <div class="accordion-body">
                    <div class="mb-3">
                      <label for="bandSelect" class="form-label">
                        Select Band / Artist
                      </label>
                      <select class="form-select" id="bandSelect" v-model="editConcert.artist">
                        <option selected disabled value="">Select an Artist</option>
                        <option v-for="artist in artistOptions" :key="artist">{{ artist }}</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="newBand" class="form-label">
                        Add New Band / Artist
                      </label>
                      <input
                          type="text"
                          class="form-control"
                          id="newBand"
                          placeholder="Enter new band or artist"
                          v-model="editConcert.artist">
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#venueInfo"
                      aria-expanded="false"
                      aria-controls="venueInfo">
                    Venue
                  </button>
                </h2>
                <div
                    id="venueInfo"
                    class="accordion-collapse collapse"
                    data-bs-parent="#concertAccordion">
                  <div class="accordion-body">

                    <div class="mb-3">
                      <label for="venueSelect" class="form-label">
                        Select Venue
                      </label>

                      <select class="form-select" id="venueSelect" v-model="editConcert.venue">
                        <option selected disabled value="">Select a Venue</option>
                        <option v-for="venue in venueOptions" :key="venue">{{ venue }}</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="newVenue" class="form-label">
                        Add New Venue
                      </label>
                      <input
                          type="text"
                          class="form-control"
                          id="newVenue"
                          placeholder="Enter new venue"
                          v-model="editConcert.venue"
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#dateInfo"
                      aria-expanded="false"
                      aria-controls="dateInfo">
                    Concert Date
                  </button>
                </h2>
                <div
                    id="dateInfo"
                    class="accordion-collapse collapse"
                    data-bs-parent="#concertAccordion">
                  <div class="accordion-body">
                    <label for="concertDate" class="form-label">
                      Date
                    </label>
                    <input
                        type="date"
                        class="form-control"
                        id="concertDate"
                        v-model="editConcert.date">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div>
              Are you sure you want to delete your {{concert.artist}} concert from {{concert.date}}?
            </div>
          </div>
          <template #footer>
            <template v-if="!deleting">
              <button
                  type="button" class="btn btn-outline-danger me-auto" @click="deleting=true">
                <i class="bi bi-trash" aria-hidden="true"></i>
                Delete
              </button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-primary" @click="$refs.modal.close();">
                Save Concert
              </button>
            </template>
            <template v-else>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-danger" @click="deleteConcert(); $refs.modal.close();">
                Delete Concert
              </button>
            </template>
          </template>
        </bs-modal>
      </div>
    `
}
export default EditConcertModal