<script>
    import Slider from "./lib/Slider.svelte";

    let r, g, b;
    r = g = b = 255;

    $: rgb = (r < 16 ? `0${r.toString(16)}` : r.toString(16)) + (g < 16 ? `0${g.toString(16)}` : g.toString(16)) + (b < 16 ? `0${b.toString(16)}` : b.toString(16));
</script>

<main style="background-color: #{rgb};">
    <div class="container">
        <div id="sliders">
            <Slider bind:value={r} title="Red" />
            <Slider bind:value={g} title="Green" />
            <Slider bind:value={b} title="Blue" />
        </div>
        <h2 id="color-txt">#{rgb}</h2>
    </div>
</main>

<style>
    main {
        height: 100vh;
        transition-duration: 0.3s;
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
        transform: translate(-50%, -80%);
    }
    .container, .container > * {
        width: max-content;
    }
    #sliders {
        background-color: #333;
        border-radius: 0.5rem;
        display: flex;
        padding: 1rem;
    }
    #color-txt {
        background-color: #333;
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        padding: 1rem 1.5rem;
        margin-top: -1rem;
    }

    @media only screen and (max-width: 700px) {
        #sliders {
            flex-direction: column;
        }
    }
</style>
