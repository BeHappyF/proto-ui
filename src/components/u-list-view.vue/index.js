import { MComplex } from '../m-complex.vue';
import { MGroupParent } from '../m-group.vue';
import MField from '../m-field.vue';
import DataSource from '../../utils/DataSource';
import debounce from 'lodash/debounce';

const UListView = {
    name: 'u-list-view',
    groupName: 'u-list-view-group',
    childName: 'u-list-view-item',
    mixins: [MComplex, MGroupParent, MField],
    props: {
        // @inherit: value: null,
        field: { type: String, default: 'text' },
        data: Array,
        dataSource: [DataSource, Function, Object],
        // @inherit: cancelable: { type: Boolean, default: false },
        // @inherit: multiple: { type: Boolean, default: false },
        // @inherit: collapsible: { type: Boolean, default: false },
        // @inherit: accordion: { type: Boolean, default: false },
        // @inherit: expandTrigger: { type: String, default: 'click' },
        // @inherit: readonly: { type: Boolean, default: false },
        // @inherit: disabled: { type: Boolean, default: false },
        loadingText: { type: String, default: '加载中...' },
    },
    data() {
        return {
            ChildComponent: this.$options.childName,
            // @inherit: groupVMs: [],
            // @inherit: itemVMs: [],
            // @inherit: selectedVM: undefined,
            // @inherit: selectedVMs: undefined,
            // @inherit: currentMultiple: this.multiple,
            currentData: this.data,
            currentDataSource: this.normalizeDataSource(this.dataSource),
            loading: false,
        };
    },
    watch: {
        data(data) {
            this.currentData = data;
        },
        dataSource(dataSource) {
            this.currentDataSource = this.normalizeDataSource(dataSource);
        },
    },
    created() {
        this.debouncedFetchData = debounce(this.fetchData, 100);
        this.currentDataSource && this.debouncedFetchData();
    },
    methods: {
        normalizeDataSource(dataSource) {
            if (dataSource instanceof DataSource)
                return dataSource;
            else if (dataSource instanceof Function) {
                return new DataSource({
                    load(params) {
                        const result = dataSource(params);

                        if (result instanceof Promise)
                            return result.catch(() => this.loading = false);
                        else if (result instanceof Array)
                            return Promise.resolve(result);
                        else
                            throw new TypeError('Wrong type of `dataSource.fetch` result!');
                    },
                });
            } else if (dataSource instanceof Object) {
                return new DataSource(dataSource);
            } else
                return undefined;
        },
        shift(count) {
            let selectedIndex = this.itemVMs.indexOf(this.selectedVM);
            if (count > 0) {
                for (let i = selectedIndex + count; i < this.itemVMs.length; i++) {
                    const itemVM = this.itemVMs[i];
                    if (!itemVM.disabled) {
                        this.selectedVM = itemVM;
                        this.$emit('shift', {
                            selectedIndex,
                            selectedVM: itemVM,
                            value: itemVM.value,
                        }, this);
                        this.ensureSelectedInView();
                        break;
                    }
                }
            } else if (count < 0) {
                if (selectedIndex === -1)
                    selectedIndex = this.itemVMs.length;
                for (let i = selectedIndex + count; i >= 0; i--) {
                    const itemVM = this.itemVMs[i];
                    if (!itemVM.disabled) {
                        this.selectedVM = itemVM;
                        this.$emit('shift', {
                            selectedIndex,
                            selectedVM: itemVM,
                            value: itemVM.value,
                        }, this);
                        this.ensureSelectedInView();
                        break;
                    }
                }
            }
        },
        ensureSelectedInView(natural) {
            if (!this.selectedVM)
                return;

            const selectedIndex = this.itemVMs.indexOf(this.selectedVM);
            const selectedEl = this.selectedVM.$el;
            const parentEl = selectedEl.parentElement;
            if (parentEl.scrollTop < selectedEl.offsetTop + selectedEl.offsetHeight - parentEl.clientHeight) {
                if (natural)
                    parentEl.scrollTop = selectedEl.offsetTop - selectedEl.offsetHeight;
                else
                    parentEl.scrollTop = selectedEl.offsetTop + selectedEl.offsetHeight - parentEl.clientHeight;
                if (selectedIndex === this.itemVMs.length - 1) {
                    this.currentDataSource && this.debouncedFetchData();
                    setTimeout(() => parentEl.scrollTop = parentEl.scrollHeight - parentEl.clientHeight, 200);
                }
            }
            if (parentEl.scrollTop > selectedEl.offsetTop)
                parentEl.scrollTop = selectedEl.offsetTop;
        },
        fetchData() {
            if (!this.currentDataSource)
                return;

            this.loading = true;
            const result = this.currentDataSource.fetch({
                // @TODO: 要不要设置 limit 属性
                offset: this.currentData ? this.currentData.length : 0,
            });
            const then = (data) => {
                this.loading = false;
                this.currentData = data;
            };

            if (result instanceof Promise)
                return result.then(then).catch(() => this.loading = false);
            else if (result instanceof Array)
                then(result);
            else
                throw new TypeError('Wrong type of `dataSource.fetch` result!');
        },
        onScroll(e) {
            if (!this.currentDataSource)
                return;

            const el = e.target;
            const offset = this.currentData ? this.currentData.length : 0;
            if (el.scrollHeight === el.scrollTop + el.clientHeight
                && this.currentDataSource.hasMore(offset))
                this.debouncedFetchData();
        },
    },
};

export * from './item.vue';
export * from './group.vue';
export * from './divider.vue';
export { UListView };
export default UListView;
