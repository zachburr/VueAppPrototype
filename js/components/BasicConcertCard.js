import StarRating from "./StarRating.js";
const BasicConcertCard = {
    components: {
        StarRating,
    },
    props: {
        concert: {type: Object, required: true},
    },
    emits: ['save-rating'],
    methods: {
        formattedDate(date){
            //Adding T00:00:00 uses local midnight so timezone conversion doesn't display the previous day
            return new Date(date + 'T00:00:00').toLocaleDateString('en-US')
        },
        upcomingConcert(date){
            //use local midnight so comparisons ignore the current time
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            //set the cutoff to seven days from today
            const nextWeek = new Date(today);
            nextWeek.setDate(today.getDate() + 7);
            //parse the concert date at local midnight
            const concertDate = new Date(date + 'T00:00:00');
            //include today and the next six days, but exclude the cutoff day
            return concertDate >= today && concertDate < nextWeek;
        },
        pastConcert(date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return new Date(date + "T00:00:00") < today;
        },
    },
    template:`
      <div class="card concert-preview mb-3">
        <div class="card-body">
          <div class="row">
            <div class="col-8"><h5>{{ concert.artist }}</h5></div>
            <div class=" col-4 d-flex flex-column align-items-md-end gap-3">
              <span v-if="upcomingConcert(concert.date)" class="badge rounded-pill text-bg-warning fw-normal"> <i class="bi bi-alarm"></i> Concert Soon</span>
              <star-rating v-else-if="pastConcert(concert.date)"
                           :concert="concert"
                           @save="rating => $emit('save-rating', concert, rating)"
              ></star-rating>
            </div>
          </div>
          <p class="mb-1">{{ formattedDate(concert.date) }}</p>
          <p class="mb-0">{{ concert.venue }}</p>

        </div>
      </div>
    `
}

export default BasicConcertCard