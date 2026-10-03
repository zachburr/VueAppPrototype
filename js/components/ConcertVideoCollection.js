const ConcertVideoCollection = {
    name: "ConcertVideoCollection",
    data(){
        return {
            editing: false,
            editVideos: [],
        }
    },
    props:{
        videos: {type: Array, required: true},
    },
    emits:["save"],
    methods:{
        startEditing(){
            this.editVideos = [...this.videos]
            this.editing = true;
        },
        addVideo(){
            this.editVideos.push('');
        },
        removeVideo(index){
            this.editVideos.splice(index, 1)
        },
        saveVideosEdit(){
            this.$emit('save', [...this.editVideos]);
            this.editing = false;
        },
    },
    template: `
      <div>
        <div v-if="!editing">
          <div class="row">
            <div class="col-6 col-md-4 py-1 video-embed"
                 v-for="video in videos"
                 :key="video">
              <iframe
                  :src="video"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen>

              </iframe>
            </div>
            <div class="pt-4">
              <button type="button" class="btn btn-outline-primary "
                      @click="startEditing">
                Edit
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <div
              class="mb-3"
              v-for="(video, index) in editVideos"
              :key="index">

            <label class="form-label">
              Video {{ index + 1 }}
            </label>

            <div class="input-group">
              <input
                  type="url"
                  class="form-control"
                  v-model="editVideos[index]">
              <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="removeVideo(index)">
                Remove
              </button>
            </div>
          </div>
          <div>
            <button type="button" class="btn btn-outline-primary mb-3"
                    @click="addVideo">
              <i class="bi bi-plus-lg"></i>
              Add a Video
            </button>
          </div>
          <div>
            <button type="button" class="btn btn-primary" @click="saveVideosEdit">
              Confirm Videos
            </button>
          </div>
        </div>
      </div>
    `

}
export default ConcertVideoCollection