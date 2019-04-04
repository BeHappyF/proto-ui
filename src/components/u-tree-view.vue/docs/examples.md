### 基本形式

有两种书写方式，这里推荐使用Data方式，因为树型结构的数据有时非常多。

#### Tag 方式

``` html
<u-tree-view>
    <u-tree-view-node text="节点1">
        <u-tree-view-node text="节点1.1"></u-tree-view-node>
        <u-tree-view-node text="节点1.2">
            <u-tree-view-node text="节点1.2.1"></u-tree-view-node>
            <u-tree-view-node text="节点1.2.2"></u-tree-view-node>
        </u-tree-view-node>
        <u-tree-view-node text="节点1.3"></u-tree-view-node>
        <u-tree-view-node text="节点1.4"></u-tree-view-node>
    </u-tree-view-node>
    <u-tree-view-node text="节点2"></u-tree-view-node>
    <u-tree-view-node text="节点3">
        <u-tree-view-node text="节点3.1"></u-tree-view-node>
        <u-tree-view-node text="节点3.2"></u-tree-view-node>
    </u-tree-view-node>
</u-tree-view>
```

#### Data 方式

``` html
<u-tree-view :data="[
    { text: '节点1', children: [
        { text: '节点1.1' },
        { text: '节点1.2', children: [
            { text: '节点1.2.1' },
            { text: '节点1.2.2' },
        ] },
        { text: '节点1.3' },
        { text: '节点1.4' },
    ] },
    { text: '节点2' },
    { text: '节点3', children: [
        { text: '节点3.1' },
        { text: '节点3.2' },
    ] },
]"></u-tree-view>
```

#### 自定义模板

但我们知道，Tag方式很容易自定义模板，而Data方式却不好扩展。我们提供了一个名为`text`的作用域插槽，可以很轻松地处理这个问题。

``` html
<u-tree-view :data="[
    { text: '文件夹1', type: 'directory', children: [
        { text: '文件夹1.1', type: 'directory' },
        { text: '文件夹1.2', type: 'directory', children: [
            { text: '文件1.2.1', type: 'file' },
            { text: '文件1.2.2', type: 'file' },
        ] },
        { text: '文件1.3', type: 'file' },
        { text: '文件1.4', type: 'file' },
    ] },
    { text: '文件夹2', type: 'directory' },
    { text: '文件夹3', type: 'directory', children: [
        { text: '文件3.1', type: 'file' },
        { text: '文件3.2', type: 'file' },
    ] },
]">
    <span slot="text" slot-scope="{ node, expanded, text }">
        {{ node.type === 'directory' ? (expanded ? '📂' : '📁') : '📄' }}
        {{ text }}
    </span>
</u-tree-view>
```

但`text`作用域插槽只支持扩展text文本内容，如果你的需求更加复杂，建议直接通过继承TreeView相关组件来实现。

### 选项值

#### Tag方式

``` html
<u-tree-view value="1.2">
    <u-tree-view-node text="节点1" value="1">
        <u-tree-view-node text="节点1.1" value="1.1"></u-tree-view-node>
        <u-tree-view-node text="节点1.2" value="1.2">
            <u-tree-view-node text="节点1.2.1" value="1.2.1"></u-tree-view-node>
            <u-tree-view-node text="节点1.2.2" value="1.2.2"></u-tree-view-node>
        </u-tree-view-node>
        <u-tree-view-node text="节点1.3" value="1.3"></u-tree-view-node>
        <u-tree-view-node text="节点1.4" value="1.4"></u-tree-view-node>
    </u-tree-view-node>
    <u-tree-view-node text="节点2" value="2"></u-tree-view-node>
    <u-tree-view-node text="节点3" value="3">
        <u-tree-view-node text="节点3.1" value="3.1"></u-tree-view-node>
        <u-tree-view-node text="节点3.2" value="3.2"></u-tree-view-node>
    </u-tree-view-node>
</u-tree-view>
```

#### Data方式

``` html
<u-tree-view value="1.2" :data="[
    { text: '节点1', value: '1', children: [
        { text: '节点1.1', value: '1.1' },
        { text: '节点1.2', value: '1.2', children: [
            { text: '节点1.2.1', value: '1.2.1' },
            { text: '节点1.2.2', value: '1.2.2' },
        ] },
        { text: '节点1.3', value: '1.3' },
        { text: '节点1.4', value: '1.4' },
    ] },
    { text: '节点2', value: '2' },
    { text: '节点3', value: '3', children: [
        { text: '节点3.1', value: '3.1' },
        { text: '节点3.2', value: '3.2' },
    ] },
]"></u-tree-view>
```

### 只读、禁用、禁用某一项

#### Tag方式

``` html
<u-grid-layout>
    <u-grid-layout-column :span="4">
        <u-tree-view readonly>
            <u-tree-view-node text="节点1">
                <u-tree-view-node text="节点1.1"></u-tree-view-node>
                <u-tree-view-node text="节点1.2">
                    <u-tree-view-node text="节点1.2.1"></u-tree-view-node>
                    <u-tree-view-node text="节点1.2.2"></u-tree-view-node>
                </u-tree-view-node>
                <u-tree-view-node text="节点1.3"></u-tree-view-node>
                <u-tree-view-node text="节点1.4"></u-tree-view-node>
            </u-tree-view-node>
            <u-tree-view-node text="节点2"></u-tree-view-node>
            <u-tree-view-node text="节点3">
                <u-tree-view-node text="节点3.1"></u-tree-view-node>
                <u-tree-view-node text="节点3.2"></u-tree-view-node>
            </u-tree-view-node>
        </u-tree-view>
    </u-grid-layout-column>
    <u-grid-layout-column :span="4">
        <u-tree-view disabled>
            <u-tree-view-node text="节点1">
                <u-tree-view-node text="节点1.1"></u-tree-view-node>
                <u-tree-view-node text="节点1.2">
                    <u-tree-view-node text="节点1.2.1"></u-tree-view-node>
                    <u-tree-view-node text="节点1.2.2"></u-tree-view-node>
                </u-tree-view-node>
                <u-tree-view-node text="节点1.3"></u-tree-view-node>
                <u-tree-view-node text="节点1.4"></u-tree-view-node>
            </u-tree-view-node>
            <u-tree-view-node text="节点2"></u-tree-view-node>
            <u-tree-view-node text="节点3">
                <u-tree-view-node text="节点3.1"></u-tree-view-node>
                <u-tree-view-node text="节点3.2"></u-tree-view-node>
            </u-tree-view-node>
        </u-tree-view>
    </u-grid-layout-column>
    <u-grid-layout-column :span="4">
        <u-tree-view>
            <u-tree-view-node text="节点1">
                <u-tree-view-node text="节点1.1"></u-tree-view-node>
                <u-tree-view-node text="节点1.2" disabled>
                    <u-tree-view-node text="节点1.2.1"></u-tree-view-node>
                    <u-tree-view-node text="节点1.2.2"></u-tree-view-node>
                </u-tree-view-node>
                <u-tree-view-node text="节点1.3" disabled></u-tree-view-node>
                <u-tree-view-node text="节点1.4"></u-tree-view-node>
            </u-tree-view-node>
            <u-tree-view-node text="节点2" disabled></u-tree-view-node>
            <u-tree-view-node text="节点3">
                <u-tree-view-node text="节点3.1"></u-tree-view-node>
                <u-tree-view-node text="节点3.2"></u-tree-view-node>
            </u-tree-view-node>
        </u-tree-view>
    </u-grid-layout-column>
</u-grid-layout>
```

#### Data方式

``` html
<u-tree-view :data="[
    { text: '节点1', children: [
        { text: '节点1.1' },
        { text: '节点1.2', disabled: true, children: [
            { text: '节点1.2.1' },
            { text: '节点1.2.2'}
        ] },
        { text: '节点1.3', disabled: true  },
        { text: '节点1.4' },
    ] },
    { text: '节点2', disabled: true  },
    { text: '节点3', children: [
        { text: '节点3.1' },
        { text: '节点3.2'}
    ]}
]"></u-tree-view>
```


### 手风琴

``` html
<u-tree-view accordion>
    <u-tree-view-node text="节点1">
        <u-tree-view-node text="节点1.1">
            <u-tree-view-node text="节点1.1.1"></u-tree-view-node>
            <u-tree-view-node text="节点1.1.2"></u-tree-view-node>
        </u-tree-view-node>
        <u-tree-view-node text="节点1.2">
            <u-tree-view-node text="节点1.2.1"></u-tree-view-node>
            <u-tree-view-node text="节点1.2.2"></u-tree-view-node>
        </u-tree-view-node>
        <u-tree-view-node text="节点1.3">
            <u-tree-view-node text="节点1.3.1"></u-tree-view-node>
            <u-tree-view-node text="节点1.3.2"></u-tree-view-node>
        </u-tree-view-node>
        <u-tree-view-node text="节点1.4"></u-tree-view-node>
    </u-tree-view-node>
    <u-tree-view-node text="节点2" expanded>
        <u-tree-view-node text="节点2.1"></u-tree-view-node>
        <u-tree-view-node text="节点2.2"></u-tree-view-node>
    </u-tree-view-node>
    <u-tree-view-node text="节点3">
        <u-tree-view-node text="节点3.1"></u-tree-view-node>
        <u-tree-view-node text="节点3.2"></u-tree-view-node>
    </u-tree-view-node>
</u-tree-view>
```

### 展开/折叠触发方式

``` html
<u-grid-layout>
    <u-grid-layout-column :span="4" expand-trigger="click">
        <p>整行点击均可触发（默认）</p>
        <u-tree-view>
            <u-tree-view-node text="节点1" expanded>
                <u-tree-view-node text="节点1.1" expanded></u-tree-view-node>
                <u-tree-view-node text="节点1.2" expanded>
                    <u-tree-view-node text="节点1.2.1"></u-tree-view-node>
                    <u-tree-view-node text="节点1.2.2"></u-tree-view-node>
                </u-tree-view-node>
                <u-tree-view-node text="节点1.3"></u-tree-view-node>
                <u-tree-view-node text="节点1.4"></u-tree-view-node>
            </u-tree-view-node>
            <u-tree-view-node text="节点2"></u-tree-view-node>
            <u-tree-view-node text="节点3">
                <u-tree-view-node text="节点3.1"></u-tree-view-node>
                <u-tree-view-node text="节点3.2"></u-tree-view-node>
            </u-tree-view-node>
        </u-tree-view>
    </u-grid-layout-column>
    <u-grid-layout-column :span="4">
        <p>仅点击小箭头时触发</p>
        <u-tree-view expand-trigger="click-expander">
            <u-tree-view-node text="节点1" expanded>
                <u-tree-view-node text="节点1.1" expanded></u-tree-view-node>
                <u-tree-view-node text="节点1.2" expanded>
                    <u-tree-view-node text="节点1.2.1"></u-tree-view-node>
                    <u-tree-view-node text="节点1.2.2"></u-tree-view-node>
                </u-tree-view-node>
                <u-tree-view-node text="节点1.3"></u-tree-view-node>
                <u-tree-view-node text="节点1.4"></u-tree-view-node>
            </u-tree-view-node>
            <u-tree-view-node text="节点2"></u-tree-view-node>
            <u-tree-view-node text="节点3">
                <u-tree-view-node text="节点3.1"></u-tree-view-node>
                <u-tree-view-node text="节点3.2"></u-tree-view-node>
            </u-tree-view-node>
        </u-tree-view>
    </u-grid-layout-column>
</u-grid-layout>
```

### 可取消

``` html
<u-tree-view cancelable>
    <u-tree-view-node text="节点1">
        <u-tree-view-node text="节点1.1"></u-tree-view-node>
        <u-tree-view-node text="节点1.2">
            <u-tree-view-node text="节点1.2.1"></u-tree-view-node>
            <u-tree-view-node text="节点1.2.2"></u-tree-view-node>
        </u-tree-view-node>
        <u-tree-view-node text="节点1.3"></u-tree-view-node>
        <u-tree-view-node text="节点1.4"></u-tree-view-node>
    </u-tree-view-node>
    <u-tree-view-node text="节点2"></u-tree-view-node>
    <u-tree-view-node text="节点3">
        <u-tree-view-node text="节点3.1"></u-tree-view-node>
        <u-tree-view-node text="节点3.2"></u-tree-view-node>
    </u-tree-view-node>
</u-tree-view>
```

### 多选

``` vue
<template>
<div>
    <u-tree-view ref="treeView" checkable :data="data"></u-tree-view>
    <p>{{ data }}</p>
</div>
</template>

<script>
export default {
    data() {
        return {
            data: [
                { text: '节点1', expanded: true, checked: false, children: [
                    { text: '节点1.1', expanded: false, checked: false },
                    { text: '节点1.2', expanded: true, checked: false, children: [
                        { text: '节点1.2.1', expanded: false, checked: false },
                        { text: '节点1.2.2', expanded: false, checked: false },
                    ] },
                    { text: '节点1.3', expanded: false, checked: false },
                    { text: '节点1.4', expanded: false, checked: false },
                ] },
                { text: '节点2', expanded: false, checked: false },
                { text: '节点3', expanded: false, checked: false },
            ],
        };
    },
};
</script>
```

## 案例

### 多选

``` vue
<template>
<div>
    <u-tree-view ref="treeView" checkable :data="data"></u-tree-view>
    <u-button @click="checkAll(true)">全部选中</u-button>
    <u-button @click="checkAll(false)">全部取消</u-button>
    <u-button @click="toggleAll(true)">全部展开</u-button>
    <u-button @click="toggleAll(false)">全部收起</u-button>
    <p>{{ data }}</p>
</div>
</template>

<script>
export default {
    data() {
        return {
            data: [
                { text: '节点1', expanded: true, checked: false, children: [
                    { text: '节点1.1', expanded: false, checked: false },
                    { text: '节点1.2', expanded: true, checked: false, disabled: true, children: [
                        { text: '节点1.2.1', expanded: false, checked: false },
                        { text: '节点1.2.2', expanded: false, checked: false },
                    ] },
                    { text: '节点1.3', expanded: false, checked: false },
                    { text: '节点1.4', expanded: false, checked: false },
                ] },
                { text: '节点2', expanded: false, checked: false },
                { text: '节点3', expanded: false, checked: false },
            ],
        };
    },
    methods: {
        checkAll(checked) {
            this.$refs.treeView.checkAll(checked);
        },
        toggleAll(expanded) {
            this.$refs.treeView.toggleAll(expanded);
        },
    },
};
</script>
```
