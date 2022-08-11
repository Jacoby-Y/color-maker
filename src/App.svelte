<script>
    import Slider from "./lib/Slider.svelte";
    import ColorRow from "./lib/ColorRow.svelte";
    import { rgb, tooDark } from "./lib/colors.js";
    import { writable } from "svelte/store";

    let current_row = writable(0);

    let rows = writable([
        [ 255, 255, 255 ],
        [ 255, 255, 255 ],
        [ 255, 255, 255 ],
        [ 255, 255, 255 ],
        [ 255, 255, 255 ],
    ]);

    let r, g, b;
    r = g = b = 255;

    current_row.subscribe((v)=>{
        if (v < 0) return current_row.set($rows.length-1);
        if (v >= $rows.length) return current_row.set(0);
        [r,g,b] = $rows[v];
    });

    $: {
        rows.update(v => ( v[$current_row] = [r,g,b], v ));
    }

    let closed = false;
</script>

<main>
    {#each $rows as row, i}
        <ColorRow selected={$current_row == i} color={row} />
    {/each}

    <div class="container" class:closed>
        <div id="sliders">
            <Slider bind:value={r} title="Red" />
            <Slider bind:value={g} title="Green" />
            <Slider bind:value={b} title="Blue" />
        </div>
        <h2 id="color-txt">#{rgb(r,g,b)}</h2>
        <h2 id="select-row">
            <span on:click={()=> $current_row--}>&uparrow;</span>
            <span>{$current_row+1}</span>
            <span on:click={()=> $current_row++}>&downarrow;</span>
        </h2>
        <div id="toggle-slider" on:click={()=>{ closed = !closed }} class:too-dark={$current_row == 1 && tooDark(r,g,b)}>
            <i class="bi bi-list"></i>
            <p>Toggle</p>
        </div>
    </div>
</main>

<style>
    main {
        height: 100vh;
        transition-duration: 0.3s;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(5, 1fr);
    }
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -60%);
        z-index: 200;

        clip-path: inset(-5rem -3rem 0 0);

        transition: clip-path 0.3s;
    }
    .container.closed {
        clip-path: inset(-5rem 0 100% 0);
    }
    .container, .container > * {
        width: max-content;
    }
    #sliders {
        background-color: #333;
        border-radius: 0.5rem;
        display: flex;
        padding: 1rem;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0.5rem;
    }
    #color-txt {
        background-color: #333;
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        padding: 1rem 1.5rem;
        margin-top: -1rem;
    }

    #select-row {
        background-color: #333;
        position: absolute;
        left: 100%;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
    }
    #select-row span {
        padding: 0.25rem 1rem;
    }
    #select-row span:not(:nth-of-type(2)) {
        cursor: pointer;
        user-select: none;
    }

    #toggle-slider {
        display: flex;
        position: absolute;
        left: 0;
        bottom: calc(100% + 1rem);
        border-bottom: 2px solid black;
        color: black;
        font-size: 2rem;
        cursor: pointer;
        user-select: none;
    }
    #toggle-slider.too-dark {
        color: white;
        border-color: white;
    }
    #toggle-slider i {
        padding-bottom: 0.5rem;
    }
    #toggle-slider p {
        padding: 0.2rem 0.5rem 0 0.5rem;
        font-size: 1.5rem;
    }

    @media only screen and (max-width: 1000px) {
        #sliders {
            flex-direction: column;
        }
        .container {
            left: 1rem;
            transform: translate(0%, -50%);
        }
    }
</style>
