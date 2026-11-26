<script>
import StarRating from "@/components/StarRating.vue";

export default {
  name: "BasicConcertCard",
  components: {
    StarRating,
  },
  props: {
    concert: {type: Object, required: true},
  },
  emits: ['save-rating'],
}
</script>

<template>
  <div class="card concert-preview mb-3">
    <div class="card-body">
      <div class="row">
        <div class="col-8"><h5>{{ concert.artist.name }}</h5></div>
        <div class=" col-4 d-flex flex-column align-items-md-end gap-3">
          <span v-if="concert.dateSoon()" class="badge rounded-pill text-bg-warning fw-normal"> <i class="bi bi-alarm"></i> Concert Soon</span>
          <star-rating v-else-if="concert.datePast()"
                       :concert="concert"
                       @save="rating => $emit('save-rating', concert, rating)"
          ></star-rating>
        </div>
      </div>
      <p class="mb-1">{{ concert.formattedDate() }}</p>
      <p class="mb-0">{{ concert.venue.name }}</p>

    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/scss/variables";
.concert-preview{
  border-left: 4px solid $primary;
}
</style>