<svelte:options accessors />

<script>
    import { onMount, onDestroy, beforeUpdate, createEventDispatcher } from 'svelte';
    import { openEditor, dispatchEditorEvents } from '@pqina/pintura';

    const dispatch = createEventDispatcher();

    export let editor = undefined;
    let unsubs = [];

    onMount(() => {
        editor = openEditor($$props);
        unsubs = dispatchEditorEvents(editor, dispatch);
    });

    beforeUpdate(() => {
        if (!editor) return;
        Object.assign(editor, $$props);
    });

    onDestroy(() => {
        if (!editor) return;
        unsubs.forEach((unsub) => unsub());
        unsubs = [];
        editor = undefined;
    });
</script>
