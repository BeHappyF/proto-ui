import Field from '../m-field.vue';

export default {
    name: 'u-checkbox',
    parentName: 'u-checkboxes',
    mixins: [Field],
    props: {
        value: { type: Boolean, default: false },
        label: null,
        readonly: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
    },
    data() {
        return {
            parentVM: undefined,
            currentValue: this.value,
        };
    },
    computed: {
        listeners() {
            const listeners = Object.assign({}, this.$listeners);
            ['focus', 'blur', 'update:value'].forEach((prop) => {
                delete listeners[prop];
            });
            return listeners;
        },
    },
    watch: {
        value(value) {
            this.currentValue = value;
        },
        currentValue(value, oldValue) {
            this.$emit('change', { value, oldValue }, this);
        },
    },
    created() {
        this.dispatch(this.$options.parentName, 'add-item-vm', this);
    },
    destroyed() {
        this.dispatch(this.$options.parentName, 'remove-item-vm', this);
    },
    methods: {
        onFocus(e) {
            this.$emit('focus', e, this);
        },
        onBlur(e) {
            this.$emit('blur', e, this);
        },
        check() {
            if (this.readonly || this.disabled)
                return;

            const oldValue = this.currentValue;
            const value = !this.currentValue;

            if (this.parentVM && !this.parentVM.canCheck({
                value,
                oldValue,
                label: this.label,
                itemVM: this,
            }))
                return;

            let cancel = false;
            this.$emit('before-check', {
                value,
                oldValue,
                label: this.label,
                preventDefault: () => cancel = true,
            }, this);
            if (cancel)
                return;

            this.currentValue = value;

            this.$emit('input', value, this);
            this.$emit('update:value', value, this);
            this.$emit('check', { value, oldValue }, this);

            this.parentVM && this.parentVM.onCheck({
                value,
                oldValue,
                label: this.label,
                itemVM: this,
            });
        },
    },
};
