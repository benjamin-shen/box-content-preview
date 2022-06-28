import { overlayEditor, dispatchEditorEvents } from '@pqina/pintura';

export default 
 {
    // https://vuejs.org/v2/guide/components-props.html#Disabling-Attribute-Inheritance
    inheritAttrs: false,

    mounted() {
        // create editor
        this.editor = overlayEditor(this.$refs.elementRef, this.$attrs);

        // listen for editor events and propagate to component
        this.unsubs = dispatchEditorEvents(this.editor, (type, value) => {
            this.$emit(`pintura:${type}`, value);
        });

        // observe prop changes
        this.unwatch = this.$watch('$attrs', () => Object.assign(this.editor, this.$attrs));
    },

    beforeDestroy() {
        if (!this.editor) return;
        this.editor.destroy();
        this.unsubs.forEach((unsub) => unsub());
        this.unsubs = [];
        this.unwatch();
        this.editor = undefined;
    },

    render(h) {
        return h('div', { attrs: { class: 'PinturaRootWrapper' }, ref: 'elementRef' });
    },
}
