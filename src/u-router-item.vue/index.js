export default {
    name: 'u-router-item',
    props: {
        href: String,
        target: { type: String, default: '_self' },
        to: [String, Object],
        replace: { type: Boolean, default: false },
        exact: { type: Boolean, default: false },
    },
    computed: {
        active() {
            if (this.to === undefined)
                return;

            if (!this.$router)
                return console.warn('[proto-ui] Use `<u-router-item>` but cannot find vue router.');

            const current = this.$route;
            const resolved = this.$router.resolve(this.to).resolved;

            return this.exact ? resolved.path === current.path : current.path.startsWith(resolved.path);
        },
    },
    methods: {
        navigate() {
            if (this.href) {
                if (this.target === '_blank')
                    return window.open(this.href, this.target);
                else
                    return location.href = this.href;
            }

            if (this.to === undefined)
                return;

            if (!this.$router)
                return console.warn('[proto-ui] Use `<u-router-item>` but cannot find vue router.');

            if (this.target === '_blank') {
                const href = this.$router.resolve(this.to, this.$route, this.append).href;
                return window.open(href, this.target);
            }

            let cancel = false;
            this.$emit('before-navigate', {
                to: this.to,
                replace: this.replace,
                exact: this.exact,
                preventDefault: () => cancel = true,
            });
            if (cancel)
                return;

            const $router = this.$router;
            this.replace ? $router.replace(this.to) : $router.push(this.to);

            this.$emit('navigate', {
                to: this.to,
                replace: this.replace,
                exact: this.exact,
            });
        },
    },
};
