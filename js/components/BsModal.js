const BsModal = {
    data() {
        return {
            bsModal: null,
        }
    },
    props: {
        title: {type: String, default: ''},
    },
    methods: {
        //bootstrap methods for showing and hiding a modal
        open(){
            this.bsModal.show();
        },
        close(){
            this.bsModal.hide();
        },
    },
    mounted(){
        this.bsModal = new bootstrap.Modal(this.$refs.modal);
    },
    computed: {

    },

    template: `
                <div ref="modal" class="modal fade" tabindex="-1"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <form @submit.prevent="$emit('submit')">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">{{title}}</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <!--Add Concert Modal-->
                            <div class="modal-body">
                                <slot></slot>
                            </div>
                            <div class="modal-footer">
                              <slot name="footer"></slot>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    `
}
export default BsModal