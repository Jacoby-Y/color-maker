<script>
    export let title = "Red";
    export let value = 0;
    export let min = 0;
    export let max = 255;
    export let step = 1;
</script>

<main>
    <h3>{title}</h3>
    <input 
        type="range"
        name="{title}"
        bind:value
        id="{title.toLowerCase()}-range"
        min="{min}"
        max="{max}"
        step="{step}"
    >
</main>

<style>
    main {
        padding: 1rem;
        text-align: center;
    }
    h3 {
        padding-bottom: 0.5rem;
    }
</style>