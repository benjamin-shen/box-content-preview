/*!
 * Pintura Image Editor 8.31.2
 * (c) 2018-2022 PQINA Inc. - All Rights Reserved
 * License: https://pqina.nl/pintura/license/
 */
/* eslint-disable */

const name = 'pintura';

var useEditorWithJQuery = ($, editorModule) => {

    // No jQuery or no Image Editor module
    if (!$ || !editorModule) return;

    // Get shortcuts to methods
    const { appendEditor, appendDefaultEditor, isSupported, dispatchEditorEvents } = editorModule;

    // Test if Image Editor is supported
    if (!isSupported()) {
        // if not supported add stub so throws no errors
        $.fn[name] = () => {};
        return;
    }

    // Helpers
    const isFactory = (args) => !args.length || typeof args[0] === 'object';

    const isGetter = (obj, key) => {
        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
        return descriptor ? typeof descriptor.get !== 'undefined' : false;
    };

    const isSetter = (obj, key) => {
        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
        return descriptor ? typeof descriptor.set !== 'undefined' : false;
    };

    const isMethod = (obj, key) => typeof obj[key] === 'function';

    // Setup plugin
    const elementEditorMap = new Map();

    // Creates editor factory method
    const createFactory = (factory) => {
        return function (...args) {
            // method results array
            const results = [];

            // Execute for every item in the list
            const items = this.each(function () {
                // test if is create call
                if (isFactory(args)) {
                    const editor = factory(this, args[0]);
                    const unsubs = dispatchEditorEvents(editor, this);

                    editor.on('destroy', () => {
                        unsubs.forEach((unsub) => unsub());
                        elementEditorMap.delete(this);
                    });

                    elementEditorMap.set(this, editor);
                    return;
                }

                // get a reference to the editor instance based on the element
                const editor = elementEditorMap.get(this);

                // if no editor instance found, exit here
                if (!editor) return;

                // get property name or method name
                const key = args[0];

                // get params to pass
                const params = args.concat().slice(1);

                // run method
                if (isMethod(editor, key)) {
                    results.push(editor[key].apply(editor, params));
                    return;
                }

                // set setter
                if (isSetter(editor, key) && params.length) {
                    editor[key] = params[0];
                    return;
                }

                // get getter
                if (isGetter(editor, key)) {
                    results.push(editor[key]);
                    return;
                }

                console.warn('$().' + name + '("' + key + '") is an unknown property or method.');
            });

            // Returns a jQuery object if no results returned
            return results.length ? (this.length === 1 ? results[0] : results) : items;
        };
    };

    $.fn[name] = createFactory(appendEditor);

    $.fn[name + 'Default'] = createFactory(appendDefaultEditor);

    // Proxy static editor API
    Object.keys(editorModule).forEach((key) => ($.fn[name][key] = editorModule[key]));
};

export default useEditorWithJQuery;
