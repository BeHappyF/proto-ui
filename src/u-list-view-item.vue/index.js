import Emitter from 'u-emitter.vue';

export default {
    name: 'u-list-view-item',
    parentName: 'u-list-view',
    mixins: [Emitter],
    props: {
        value: null,
        disabled: { type: Boolean, default: false },
        item: Object,
    },
    data() {
        return {
            currentSelected: false,
            parentVM: undefined,
        };
    },
    computed: {
        selected() {
            return this.parentVM.selectedVM === this;
        },
    },
    created() {
        this.dispatch(this.$options.parentName, 'add-item-vm', this);
    },
    destroyed() {
        this.dispatch(this.$options.parentName, 'remove-item-vm', this);
    },
    methods: {
        select() {
            if (this.disabled || this.parentVM.readonly || this.parentVM.disabled)
                return;

            let cancel = false;
            this.$emit('before-select', {
                value: this.value,
                item: this.item,
                itemVM: this,
                preventDefault: () => cancel = true,
            });
            if (cancel)
                return;

            this.parentVM.select(this);
        },
    },
};