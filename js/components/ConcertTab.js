const ConcertTab ={
    props: {
        title: {type: String, required: true},
        tab:{type: String, required: true},
        concertId: {type: Number, required: true}
    },
    template: `
      <div class="collapse mt-3" 
           :id="tab + 'Collapse' + concertId"
           :data-bs-parent="'#concertDetails' + concertId">
        <div class="setlist">
          <h4>{{ title }}</h4>
          <slot></slot>
        </div>
      </div>
    `
}
export default ConcertTab;