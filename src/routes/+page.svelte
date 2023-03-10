<script>
  import '../app.css'
  import Slider from '../components/Slider.svelte'
  export let data
</script>

<main class="w-full md:max-w-6xl m-auto">
  <h1 class="py-10 text-4xl font-bold">Game library</h1>
  <Slider games={data.games} />
</main>