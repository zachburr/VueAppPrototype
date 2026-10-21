//this generates an id for each set of stars
//because i was using them in two places with concert.id the browser would clear the other
//this treats all star ratings the same by grouping them into their own ratingId
let nextRatingId = 0;
const StarRating = {
    data() {
        return {
            ratingId: 'rating-' + nextRatingId++
        };
    },
    props: {
        concert: {type: Object, required: true},
    },
    emits: ['save'],
    methods: {
        selectRating(rating) {
            this.$emit('save', rating)
        }
    },
    template: `
      <div class="rating">
        <template v-for="star in [5, 4, 3, 2, 1]" :key="star">
          <input type="radio"
                 :id="ratingId + '-' + star"
                 :name="ratingId"
                 :checked="concert.rating === star"
                 @change="selectRating(star)">
          <label :for="ratingId + '-' + star">
            <i class="bi bi-star-fill"></i>
          </label>
        </template>
      </div>
    `
}
export default StarRating