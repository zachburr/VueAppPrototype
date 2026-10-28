<script>
import StarRating from "@/components/StarRating.vue";
import ConcertTabButton from "@/components/ConcertTabButton.vue";
import EditConcertModal from "@/components/EditConcertModal.vue";
import ConcertInfo from "@/components/ConcertInfo.vue";
import ConcertVideoCollection from "@/components/ConcertVideoCollection.vue";
import ConcertPhotoCollection from "@/components/ConcertPhotoCollection.vue";
import ConcertSetlist from "@/components/ConcertSetlist.vue";
import ConcertTab from "@/components/ConcertTab.vue";

export default {
  name: "SingleConcertCard",
  components: {
    ConcertTab,
    ConcertSetlist,
    ConcertPhotoCollection,
    ConcertVideoCollection,
    ConcertInfo,
    EditConcertModal,
    ConcertTabButton,
    StarRating
  },
  props: {
    concert: { type: Object, required: true },
    concerts: { type: Array, required: true }
  },
  methods: {
    formattedDate(date){
      //Adding T00:00:00 uses local midnight so timezone conversion doesn't display the previous day
      return new Date(date + 'T00:00:00').toLocaleDateString('en-US')
    }
  }
}
</script>

<template>
  <div class="card concert-card my-3">
    <div class="row gx-0">
      <div class="col-12 col-md-3 d-none d-md-block">
        <img :src="concert.photos[0] || '/img/PlaceholderBandPic.png'"
             class="concert-card-photo rounded-start"
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
</template>

<style lang="scss" scoped>
.concert-card{
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  .concert-card-photo {
    width: 100%;
    height: 0;
    min-height: 100%;
    object-fit: cover;
  }
}
.concert-card:hover{
  box-shadow: 0 0 15px rgba(137, 0, 255, 0.4);
}
</style>