<script>
import AddConcertModal from "@/components/AddConcertModal.vue";
import ConcertCard from "@/components/ConcertCard.vue";

export default {
  name: "ConcertView",
  components: {ConcertCard, AddConcertModal},
  props: {
    concerts: { type: Array, required: true }
  },
  emits: [
    'add-concert',
    'delete-concert',
    'edit-concert',
    'save-setlist',
    'save-photos',
    'save-videos',
    'save-info',
    'save-rating'
  ]
}
</script>

<template>
  <div>
    <!--My Concerts Section-->
    <section>
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-12 col-md-7">
            <h2>My Concerts</h2>
            <add-concert-modal :concerts="concerts"
                               @add-concert="concert => $emit('add-concert', concert)">
            </add-concert-modal>
          </div>
        </div>
      </div>
    </section>
    <!--Concert Cards-->
    <concert-card
        :concerts="concerts"
        @delete-concert="concert => $emit('delete-concert', concert)"
        @edit-concert="(concert, edited) => $emit('edit-concert', concert, edited)"
        @save-setlist="(concert, setlist) => $emit('save-setlist', concert, setlist)"
        @save-photos="(concert, photos) => $emit('save-photos', concert, photos)"
        @save-videos="(concert, videos) => $emit('save-videos', concert, videos)"
        @save-info="(concert, info) => $emit('save-info', concert, info)"
        @save-rating="(concert, rating) => $emit('save-rating', concert, rating)"
    >
    </concert-card>
  </div>
</template>

<style scoped>

</style>