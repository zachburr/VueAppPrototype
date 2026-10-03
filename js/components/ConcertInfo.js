const ConcertInfo = {
    data(){
        return {
            editing: false,
            editInfo: {
                ticketPrice: '',
                seat: '',
                attendedWith: '',
                notes: ''
            }
        }
    },
    emits: ["save"],
    props:{
        ticketPrice: {type: Number},
        seat: { type: String},
        attendedWith: { type: String},
        notes: { type: String},
    },
    methods: {
        startEditing(){
            this.editInfo = {
                ticketPrice: this.ticketPrice,
                seat: this.seat,
                attendedWith: this.attendedWith,
                notes: this.notes
            }
            this.editing = true;
        },
        saveInfoEdit: function(){
            this.$emit('save', {...this.editInfo});
            this.editing = false;
        },
    },
    template:`
      <div>
        <div v-if="!editing">
          <div class="concert-info">
            <p>
              <strong>Ticket Price:</strong>
              {{ ticketPrice }}
            </p>
            <p>
              <strong>Seat:</strong>
              {{ seat }}
            </p>
            <p>
              <strong>Went With:</strong>
              {{ attendedWith }}
            </p>
            <p>
              <strong>Additional Notes:</strong><br>
              {{ notes }}
            </p>
          </div>
          <button type="button" class="btn btn-outline-primary "
                  @click="startEditing">Edit
          </button>
        </div>
        <div v-else>
          <div id="infoFields">
            <div class="mb-3">
              <label class="form-label" for="ticketPrice">Ticket
                Price</label>
              <div class="input-group">
                <span class="input-group-text">$</span>
                <input
                    class="form-control"
                    type="number"
                    id="ticketPrice"
                    placeholder="0.00"
                    v-model="editInfo.ticketPrice">
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label" for="seat">Seat</label>
              <input
                  class="form-control"
                  type="text"
                  id="seat"
                  placeholder="Section, row, seat"
                  v-model="editInfo.seat">
            </div>

            <div class="mb-3">
              <label class="form-label" for="wentWith">Who You Went
                With</label>
              <textarea
                  class="form-control"
                  id="wentWith"
                  rows="2"
                  placeholder="Who did you go with?"
                  v-model="editInfo.attendedWith"></textarea>
            </div>

            <div class="mb-3">
              <label class="form-label" for="additionalNotes">Additional
                Notes</label>
              <textarea
                  class="form-control"
                  id="additionalNotes"
                  rows="4"
                  placeholder="Add any notes about the concert"
                  v-model="editInfo.notes"></textarea>
            </div>
            <div>
              <button type="button" class="btn btn-primary" @click="saveInfoEdit">Confirm Info
              </button>
            </div>
          </div>
        </div>
      </div>
    `
}
export default ConcertInfo