<script>
export default {
  name: "ConcertListWidget",
  props: {
    title: {type: String, required: true},
    artistCollection: { type: Object, required: true },
  },
  computed: {
    upcomingConcerts() {
      return this.artistCollection.allUpcomingConcerts().slice(0, 3);
    },
    pastConcerts() {
      return this.artistCollection.allPastConcerts().slice(0, 3);
    },
  },
}
</script>

<template>
  <div class="col-12 col-md-6 py-4">
    <h4 class="mb-3">{{title}}</h4>
    <!-- allows data from this component to be available to the content placed in its slot -->
    <slot :upcoming-concerts="upcomingConcerts"
          :past-concerts="pastConcerts"></slot>
  </div>
</template>

<style scoped>

</style>