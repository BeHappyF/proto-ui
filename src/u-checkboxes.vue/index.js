import Field from '../u-field.vue';

export default {
    name: 'u-checkboxes',
    childName: 'u-checkbox',
    mixins: [Field],
    props: {
        value: { type: Array, default() { return []; } },
        min: { type: Number, default: 0 },
        max: { type: Number, default: Infinity },
        readonly: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
    },
    data() {
        return {
            currentValue: this.value,
            itemVMs: [],
        };
    },
    created() {
        this.$on('add-item-vm', (itemVM) => {
            itemVM.parentVM = this;
            this.itemVMs.push(itemVM);
        });
        this.$on('remove-item-vm', (itemVM) => {
            itemVM.parentVM = undefined;
            this.itemVMs.splice(this.itemVMs.indexOf(itemVM), 1);
        });
    },
    mounted() {
        this.watchValue(this.value);
    },
    watch: {
        value(value) {
            this.watchValue(value);
        },
        currentValue(value, oldValue) {
            this.$emit('change', {
                value,
                oldValue,
            });
        },
        itemVMs() {
            this.watchValue(this.value);
        },
    },
    methods: {
        watchValue(value) {
            this.currentValue = value;
            this.itemVMs.forEach((itemVM) => itemVM.currentValue = value.includes(itemVM.label));
        },
        canCheck($event) {
            if (this.readonly || this.disabled)
                return false;

            const value = $event.value;
            const label = $event.itemVM.label;
            if (value && !this.currentValue.includes(label)) {
                const length = this.currentValue.length + 1;
                return this.min <= length && length <= this.max;
            } else if (!value && this.currentValue.includes(label)) {
                const length = this.currentValue.length - 1;
                return this.min <= length && length <= this.max;
            }
        },
        onCheck($event) {
            const value = $event.value;
            const label = $event.itemVM.label;

            if (value && !this.currentValue.includes(label))
                this.currentValue.push(label);
            else if (!value && this.currentValue.includes(label))
                this.currentValue.splice(this.currentValue.indexOf(label), 1);

            this.$emit('input', this.currentValue);
            this.$emit('update:value', this.currentValue);
            this.$emit('check', {
                value: this.currentValue,
                itemVM: $event.itemVM,
            });
        },
    },
};
