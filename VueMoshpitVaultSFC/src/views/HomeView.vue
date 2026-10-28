<script>
import ConcertListWidget from "@/components/ConcertListWidget.vue";
import BasicConcertCard from "@/components/BasicConcertCard.vue";

export default {
  name: "HomeView",
  components: {BasicConcertCard, ConcertListWidget},
  props: {
    concerts: { type: Array, required: true }
  },
  emits: ['save-rating']
}
</script>

<template>
  <div>
    <!--Concert stats-->
  <section>
    <div class="container-fluid"><h2>Concert Dashboard</h2></div>
  </section>
  <!--Upcoming and Past concerts-->
  <section>
    <div class="row g-4 mx-2">
      <!--Upcoming concerts-->
      <!-- v-slot allows access to the computed "upcomingConcerts" to use in the slotted basic-concert-card-->
      <Concert-List-Widget title="Upcoming Concerts"
                           :concerts="concerts"
                           v-slot="{upcomingConcerts}">
        <basic-concert-card v-for="concert in upcomingConcerts"
                            :concert="concert"
                            :key="concert.id">
        </basic-concert-card>
      </Concert-List-Widget>


      <!--Past Concerts-->
      <concert-list-widget title="Past Concerts"
                           :concerts="concerts"
                           v-slot="{pastConcerts}">
        <basic-concert-card v-for="concert in pastConcerts" :concert="concert"
                            :key="concert.id"
                            @save-rating="(concert, rating) => $emit('save-rating', concert, rating)"></basic-concert-card>
      </concert-list-widget>
    </div>
  </section>
  <!--Venue Map-->
  <section>
    <div class="row mx-2">
      <h3>Find a Venue</h3>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2915.826579663546!2d-87.91996648780514!3d43.045080171017084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880519748afe3d71%3A0x20af60eabab279bb!2sFiserv%20Forum!5e0!3m2!1sen!2sus!4v1789540151283!5m2!1sen!2sus"
              width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"></iframe>
    </div>
  </section>
  </div>
</template>

<style scoped>

</style>