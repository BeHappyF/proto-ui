import Field from 'u-field.vue';

export default {
    name: 'u-switch',
    mixins: [Field],
    props: {
        value: { type: Boolean, default: false },
        readonly: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
    },
    data() {
        return {
            currentValue: this.value,
        };
    },
    watch: {
        value(value) {
            this.currentValue = value;
        },
    },
    methods: {
        change() {
            if (this.readonly || this.disabled)
                return;

            const oldValue = this.currentValue;
            this.currentValue = !this.currentValue;

            this.$emit('input', this.currentValue);
            this.$emit('change', this.currentValue, oldValue);
            this.$emit('update:value', this.currentValue);
        },
        onBlur(e) {
            this.$emit('blur', e);
        },
    },
};
