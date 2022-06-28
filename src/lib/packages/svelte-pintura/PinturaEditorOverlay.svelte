<svelte:options accessors />

<script>
    import { onMount, onDestroy, beforeUpdate, createEventDispatcher } from 'svelte';
    import { overlayEditor, dispatchEditorEvents } from '@pqina/pintura';

    const dispatch = createEventDispatcher();

    export let editor = undefined;
    let element;
    let unsubs = [];

    onMount(() => {
        editor = overlayEditor(element);
        unsubs = dispatchEditorEvents(editor, dispatch);
    });

    beforeUpdate(() => {
        if (!editor) return;
        Object.assign(editor, $$props);
    });

    onDestroy(() => {
        if (!editor) return;
        editor.destroy();
        unsubs.forEach((unsub) => unsub());
        unsubs = [];
        editor = undefined;
    });
</script>

<div class="PinturaRootWrapper" bind:this={element} />
