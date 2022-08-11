
<script>
    import { rgb, tooDark } from "./colors.js";

    export let selected = false;
    export let color = [255, 255, 255];

    $: color_str = "#" + rgb(...color);

    let copy_text;

    const copyColor = ()=>{
        navigator.clipboard.writeText(color_str);
        copy_text.style.transitionDuration = "0s";
        copy_text.style.opacity = "1";
        setTimeout(()=>{
            copy_text.style.transitionDuration = "1s";
            copy_text.style.opacity = "0";
        }, 1000);
    } 

</script>

<main class:selected class:too-dark={tooDark(...color)} style="background-color: {color_str};">
    <div id="info">
        <span id="copy-poppup" bind:this={copy_text}>Copied color!</span>
        <span id="copy" on:click={copyColor}><i class="bi bi-clipboard-check"></i></span>
        {color_str}
    </div>
</main>

<style>
    main {
        position: relative;
        transition: background-color 0.5s;
    }
    main.selected {
        border: 2px dashed black;
        margin: -0px;
        z-index: 100;
    }
    .too-dark {
        color: white;
    }
    #info {
        position: absolute;
        right: 1rem;
        bottom: 0.7rem;
        font-size: 2rem;
        font-weight: bold;
        padding-right: 1rem;
    }
    #copy {
        cursor: pointer;
    }
    #copy-poppup {
        opacity: 0;
        user-select: none;
        font-weight: normal;
    }
</style>