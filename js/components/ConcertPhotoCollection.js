const ConcertPhotoCollection = {
    name: "ConcertPhotoCollection",
    data(){
        return {
            editing: false,
            editPhotos: [],
        }
    },
    props: {
        photos: {type: Array, required: true},
    },
    emits: ["save"],
    methods: {
        startEditing(){
            this.editPhotos = [...this.photos]
            this.editing = true;
        },
        addPhoto(){
            this.editPhotos.push('');
        },
        removePhoto(index){
            this.editPhotos.splice(index, 1)
        },
        savePhotosEdit(){
            this.$emit('save', [...this.editPhotos]);
            this.editing = false;
        },
    },
    template: `
      <div>
        <div v-if="!editing">
          <div class="row">
            <div class="col-6 col-md-2 py-1"
                 v-for="photo in photos"
                 :key="photo">
              <img class="concert-photo" :src="photo" alt="Concert Photo">
            </div>
          </div>
          <div class="pt-4">
            <button type="button" class="btn btn-outline-primary "
                    @click="startEditing">
              Edit
            </button>
          </div>
        </div>
        <div v-else>
          <div class="row">
            <div class="col-6 col-md-2 py-1" v-for="(photo, index) in editPhotos" :key="index">
              <img class="manage-photo" :src="photo" alt="">
              <input
                  type="url"
                  class="form-control mt-2"
                  v-model="editPhotos[index]"
                  placeholder="Paste image link">
              <button class="btn btn-outline-danger btn-sm w-100 mt-2" @click="removePhoto(photo)">
                Remove
              </button>
            </div>
            <div class="pt-2">
              <button type="button" class="btn btn-outline-primary" @click="addPhoto">
                <i class="bi bi-plus-lg"></i>
                Add a Photo
              </button>
            </div>
            <div class="pt-2">
              <button type="button" class="btn btn-primary" @click="savePhotosEdit">
                Confirm Photos
              </button>
            </div>
          </div>
        </div>

      </div>
    `
    
}
export default ConcertPhotoCollection