<script>
export default {
  name: "ConcertTabButton",
  props: {
    title: {type: String, required: true},
    tab: {type: String, required: true},
    concertId: {type: Number, required: true},
  },
}
</script>

<template>
  <div class="col-6 col-sm-auto">
    <button
        type="button"
        class="btn btn-primary w-100 w-sm-auto"
        data-bs-toggle="collapse"
        :data-bs-target="'#' + tab + 'Collapse' + concertId"
        aria-expanded="false"
        :aria-controls="tab + 'Collapse' + concertId">
      {{title}}
      <slot></slot>
    </button>
  </div>
</template>

<style scoped>

</style>