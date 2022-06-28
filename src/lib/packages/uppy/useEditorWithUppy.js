/*!
 * Pintura Image Editor 8.31.2
 * (c) 2018-2022 PQINA Inc. - All Rights Reserved
 * License: https://pqina.nl/pintura/license/
 */
/* eslint-disable */

function useEditorWithUppy (openEditor, editorOptions = {}, getUppyRef) {
    const queue = [];

    const canEditFile = (file) => {
        if (file.isRemote) return false;
        if (!(file.data instanceof Blob)) return false;
        return /^image/.test(file.type) && !/svg/.test(file.type);
    };

    const editNextFile = () => {
        const next = queue[0];
        if (next) next();
    };

    const queueFile = (file) => {
        queue.push(function () {
            const editor = openEditor({
                ...editorOptions,
                src: file.data,
            });

            editor.on('hide', () => {
                // Remove this item from the queue
                queue.shift();

                // Edit next item in queue
                editNextFile();
            });

            editor.on('processerror', console.log);

            editor.on('process', ({ dest }) => {
                // Don't add file if cancelled
                if (!dest) return;

                // add the modified file
                const uppy = getUppyRef ? getUppyRef() : window['uppy'];

                // can't
                dest.__handledByEditor = true;

                // add the file
                uppy.addFile({
                    data: dest,
                    name: dest.name,
                    type: dest.type,
                    size: dest.size,
                });
            });
        });

        // If this is first item, let's open the editor immmidiately
        if (queue.length === 1) editNextFile();
    };

    return function (file) {
        if (file.data.__handledByEditor || !canEditFile(file)) return true;

        // edit first, then add manually
        queueFile(file);

        // can't add now, we have to wait for editing to finish
        return false;
    };
}

export default useEditorWithUppy;
