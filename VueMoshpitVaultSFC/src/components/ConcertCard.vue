<script>
import SingleConcertCard from "@/components/SingleConcertCard.vue";

export default {
  name: "ConcertCard",
  components: {
    SingleConcertCard,
  },
  data: function(){
    return {
      keyword: '',
      sortBy: 'date',
      showUpcoming: false
    }
  },
  props: {
    concerts: {type: Array, required: true },
  },
  emits: ["save-setlist", "save-photos", "save-videos", "save-info", "edit-concert", "delete-concert", "save-rating"],
  computed: {
    filteredConcerts() {
      //filtering for search
      const filtered = this.pastConcerts.filter(concert =>
          concert.artist.toLowerCase().includes(this.keyword) ||
          concert.venue.toLowerCase().includes(this.keyword));
      //sorting for dropdown
      if (!this.sortBy) return filtered;
      //reversed comparison for date, allows it to show concerts in correct order
      if (this.sortBy === 'date') {
        return filtered.sort((a,b) => b[this.sortBy].localeCompare(a[this.sortBy]));
      }
      return filtered.sort((a,b) => a[this.sortBy].localeCompare(b[this.sortBy]));
    },
    upcomingConcerts() {
      //sets time to midnight
      const today = new Date().setHours(0, 0, 0, 0);

      return this.concerts.filter(concert =>
          new Date(concert.date + 'T00:00:00') >= today)
          //only allows 3 concerts
          .sort((a, b) => a.date.localeCompare(b.date))
    },
    pastConcerts() {
      //sets time to midnight
      const today = new Date().setHours(0, 0, 0, 0);

      return this.concerts.filter(concert => new Date(concert.date + 'T00:00:00') < today)
          //only allows 3 concerts by comparing but in reverse to show most recent first
          .sort((a, b) => b.date.localeCompare(a.date))
    },
  },
}
</script>

<template>
  <div class="concert-list mx-4">
    <div class="row align-items-center my-4">
      <div class="col-12 col-md-6">
        <label for="concertSearch" class="visually-hidden">Search Concerts</label>
        <input
            type="search"
            id="concertSearch"
            class="form-control"
            placeholder="Search Concerts"
            v-model="keyword">
      </div>
      <div class="col-12 col-md-3 mt-3 mt-md-0">
        <div class="form-check form-switch mb-0">
          <div class="form-check form-switch">
            <input
                id="showUpcoming"
                v-model="showUpcoming"
                class="form-check-input"
                type="checkbox"
                role="switch">
            <label class="form-check-label" for="showUpcoming">
              Show upcoming concerts
            </label>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-3 ms-md-auto mt-3 mt-md-0">
        <label for="concertSort" class="visually-hidden">Sort By</label>
        <select id="concertSort" class="form-select" v-model="sortBy">
          <option value="">Sort By</option>
          <option value="artist">Artist</option>
          <option value="date">Date</option>
          <option value="venue">Venue</option>
        </select>
      </div>
    </div>
    <SingleConcertCard
        v-for="concert in filteredConcerts"
        :key="concert.id"
        :concert="concert"
        :concerts="concerts"
        @delete-concert="concert => $emit('delete-concert', concert)"
        @edit-concert="(concert, edited) => $emit('edit-concert', concert, edited)"
        @save-setlist="(concert, setlist) => $emit('save-setlist', concert, setlist)"
        @save-photos="(concert, photos) => $emit('save-photos', concert, photos)"
        @save-videos="(concert, videos) => $emit('save-videos', concert, videos)"
        @save-info="(concert, info) => $emit('save-info', concert, info)"
        @save-rating="(concert, rating) => $emit('save-rating', concert, rating)"
    />
    <div v-if="showUpcoming">
      <h3>Upcoming Concerts</h3>
      <SingleConcertCard
          v-for="concert in upcomingConcerts"
          :key="concert.id"
          :concert="concert"
          :concerts="concerts"
          @delete-concert="concert => $emit('delete-concert', concert)"
          @edit-concert="(concert, edited) => $emit('edit-concert', concert, edited)"
          @save-setlist="(concert, setlist) => $emit('save-setlist', concert, setlist)"
          @save-photos="(concert, photos) => $emit('save-photos', concert, photos)"
          @save-videos="(concert, videos) => $emit('save-videos', concert, videos)"
          @save-info="(concert, info) => $emit('save-info', concert, info)"
          @save-rating="(concert, rating) => $emit('save-rating', concert, rating)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.concert-list {
  padding-top: 10px;

}
</style>