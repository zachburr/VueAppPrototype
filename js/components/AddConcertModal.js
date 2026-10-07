import BsModal from "./BsModal.js";
const AddConcertModal = {
    components: {
        BsModal,
    },
    data() {
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
        }
    },
    props: {
        concerts: { type: Array, required: true },
    },
    emits: ["add-concert"],
    methods: {
        // calling bootstrap methods
        open(){
            this.$refs.modal.open();
        },
        close(){
            this.$refs.modal.close();
        },
        addConcert() {
            if (this.newConcert.artist) {
                //{ ...this.newConcert, id: Date.now() } was my solution to IDs it just gives each new concert an id of the milliseconds since Jan 1, 1970
                this.$emit('add-concert', { ...this.newConcert, id: Date.now() });
                this.clearForm();
            }
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
        <button type="button" class="btn btn-primary mt-3" @click="$refs.modal.open()">
          <i class="bi bi-plus-lg me-2"></i>
          Add a new concert
        </button>
        <bs-modal title="Add Concert" @submit="addConcert" ref="modal">
          <!--Add Concert Modal-->
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
                    <select class="form-select" id="bandSelect" v-model="newConcert.artist">
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
                        v-model="newConcert.artist">
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

                    <select class="form-select" id="venueSelect" v-model="newConcert.venue">
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
                        v-model="newConcert.venue">

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
                      v-model="newConcert.date">

                </div>
              </div>
            </div>
          </div>
          <template #footer>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
              Add Concert
            </button>
          </template>
        </bs-modal>
      </div>
    `
}
export default AddConcertModal