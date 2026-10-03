const ConcertSetlist = {
    name: "ConcertSetlist",
    data(){
        return {
            editing: false,
            editSetlist: []
        }
    },
    props:{
        songs: {type: Array, required: true},
    },
    emits: ["save"],
    methods:{
        startEditing(){
            this.editSetlist = [...this.songs]
            this.editing = true;
        },
        addSong(){
            this.editSetlist.push('');
        },
        removeSong(index){
            this.editSetlist.splice(index,1);
        },
        saveSetlist(){
            this.$emit('save', [...this.editSetlist]);
            this.editing = false;
        }
    },
    template:`
      <div>
        <div v-if="!editing">
          <ol>
            <li v-for="(song, index) in songs" :key="index">{{ song }}</li>
          </ol>
          <div class="pt-4">
            <button type="button" class="btn btn-outline-primary"
                    @click="startEditing">
              Edit
            </button>
          </div>
        </div>
        <div v-else>
          <ol>
            <li
                v-for="(song, index) in editSetlist"
                :key="index"
                class="mb-3">

              <div class="d-flex gap-2">
                <input
                    class="form-control"
                    type="text"
                    v-model="editSetlist[index]"
                >
                <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="removeSong(index)">
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
            </li>
          </ol>
          <div>
            <button type="button" class="btn btn-outline-primary"
                    @click="addSong">
              <i class="bi bi-plus-lg"></i>
              Add a Song
            </button>
          </div>
          <div>
            <button type="button" class="btn btn-primary mt-2" @click="saveSetlist" >Confirm Songs</button>
          </div>
        </div>
      </div>
    `
}
export default ConcertSetlist