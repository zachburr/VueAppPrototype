<script>
let nextRatingId = 0;
export default {
  name: "StarRating",
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
}
</script>

<template>
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
</template>

<style lang="scss" scoped>
@import "@/scss/variables";
.rating {
  display: inline-flex;
  flex-direction: row-reverse;
  justify-content: flex-end;

  input {
    display: none;
  }

  label {
    cursor: pointer;
    font-size: 1.25rem;
  }

  label:hover,
  label:hover ~ label,
  input:checked ~ label {
    color: $primary;
  }
}
</style>