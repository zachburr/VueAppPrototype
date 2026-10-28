<script>
export default {
  name: "ConcertListWidget",
  props: {
    title: {type: String, required: true},
    concerts: {type: Array, required: true},
  },
  computed: {
    upcomingConcerts() {
      //sets time to midnight
      const today = new Date().setHours(0, 0, 0, 0);

      return this.concerts.filter(concert =>
          new Date(concert.date + 'T00:00:00') >= today)
          //only allows 3 concerts
          .sort((a, b) => a.date.localeCompare(b.date))
          .slice(0, 3);
    },
    pastConcerts() {
      //sets time to midnight
      const today = new Date().setHours(0, 0, 0, 0);

      return this.concerts.filter(concert => new Date(concert.date + 'T00:00:00') < today)
          //only allows 3 concerts by comparing but in reverse to show most recent first
          .sort((a, b) => b.date.localeCompare(a.date))
          .slice(0, 3);
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