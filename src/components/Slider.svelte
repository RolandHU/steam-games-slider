<script>
  import { sceneIndex } from '../store'
  import Scene from './Scene.svelte'
  import MdNavigateBefore from 'svelte-icons/md/MdNavigateBefore.svelte'
  import MdNavigateNext from 'svelte-icons/md/MdNavigateNext.svelte'
  export let games

  let section
  let scrollTimer = null
  let isFocused = false

  sceneIndex.subscribe(value => {
    goToScene(value)
  })

  function goToScene(index) {
    if (!section) return
    section.scrollTo({
      left: index * section.offsetWidth,
      behavior: 'smooth'
    })
    sceneIndex.set(index)
  }

  function handleScroll() {
    if (scrollTimer) clearTimeout(scrollTimer)
    scrollTimer = setTimeout(handleScrollEnd, 500)
  }

  function handleScrollEnd() {
    const currIndex = Math.round(section.scrollLeft / section.offsetWidth)
    if (currIndex === $sceneIndex) return
    sceneIndex.set(currIndex)
  }
</script>

<main>
  <section class="relative w-full min-h-[500px] aspect-[2/1] flex items-center mb-5 border border-slate-700 rounded-lg overflow-hidden" on:mouseenter={() => isFocused = true} on:mouseleave={() => isFocused = false}>
    <button class="z-20 absolute left-0 w-10 h-10 {!isFocused || $sceneIndex === 0 ? "hidden" : null} md:mx-5 text-slate-300/50 hover:text-slate-300 focus:text-slate-300" on:click={() => ($sceneIndex > 0) ? sceneIndex.update(n => n - 1) : null}><MdNavigateBefore /></button>
    <div class="slider w-full h-full flex items-center overflow-auto snap-mandatory snap-x" on:scroll={handleScroll} bind:this={section}>
      {#each games as game}
        <Scene game={game} />
      {/each}      
    </div>
    <button class="z-20 absolute right-0 w-10 h-10 {!isFocused || $sceneIndex === games.length - 1 ? "hidden" : null} md:mx-5 text-slate-300/50 hover:text-slate-300 focus:text-slate-300" on:click={() => ($sceneIndex + 1 < games.length) ? sceneIndex.update(n => n + 1) : null}><MdNavigateNext /></button> 
  </section>
  <form class="w-max flex gap-4 m-auto">
    {#each games as _, i}
      <label class="w-4 h-4 block border border-cyan-600 rounded-full {i === $sceneIndex ? "bg-cyan-600" : null} cursor-pointer" for="r{i}"></label>
      <input class="hidden" type="radio" name="rb" checked={i === $sceneIndex} id="r{i}" on:change={() => goToScene(i)}>
    {/each}
  </form>
</main>