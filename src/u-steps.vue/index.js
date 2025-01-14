import Tabs from '../u-tabs.vue';

export default {
    name: 'u-steps',
    childName: 'u-step',
    extends: Tabs,
    props: {
        value: { type: Number, default: 0 },
        readonly: { type: Boolean, default: true },
        layout: { type: String, default: 'block' },
        size: String,
    },
    watch: {
        // This method just run once after pushing many itemVMs
        itemVMs: {
            overwrite: true,
            handler() {
                // 更新列表之后，原来的选择可以已不存在，这里暂存然后重新查找一遍
                const value = this.selectedVM ? this.selectedVM.index : this.value;
                this.selectedVM = undefined;
                this.watchValue(value);
            },
        },
    },
    computed: {
        itemWidth() {
            if (this.size === 'auto')
                return (1 / this.itemVMs.length) * 100 + '%';
            else
                return undefined;
        },
    },
    methods: {
        watchValue(value) {
            if (this.selectedVM && this.selectedVM.index === value)
                return;
            if (value === undefined)
                this.selectedVM = this.autoSelect ? this.itemVMs[0] : undefined;
            else {
                this.selectedVM = this.itemVMs.find((itemVM) => itemVM.index === value);
                this.selectedVM && this.selectedVM.groupVM && this.selectedVM.groupVM.toggle(true);
            }
        },
        select(itemVM) {
            if (this.readonly || this.disabled || (itemVM && itemVM.disabled))
                return;

            const oldValue = this.value;

            let cancel = false;
            this.$emit('before-select', {
                value: itemVM && itemVM.index,
                oldValue,
                item: itemVM && itemVM.item,
                itemVM,
                preventDefault: () => cancel = true,
            });
            if (cancel)
                return;

            if (this.cancelable && this.selectedVM === itemVM)
                this.selectedVM = undefined;
            else
                this.selectedVM = itemVM;

            const value = this.selectedVM && this.selectedVM.index;
            const item = this.selectedVM && this.selectedVM.item;

            this.$emit('input', value);
            this.$emit('update:value', value);
            this.$emit('select', {
                value,
                oldValue,
                item,
                itemVM: this.selectedVM,
            });
        },
    },
};
