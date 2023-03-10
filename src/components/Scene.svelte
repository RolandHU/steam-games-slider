<script>
  import MdOpenInNew from 'svelte-icons/md/MdOpenInNew.svelte'
  export let game
  
  const { data, appid } = game
</script>

<div class="relative w-full md:max-w-6xl h-full flex-[0_0_100%] flex flex-col p-10 md:p-16 snap-start">
  <div class="absolute right-5 top-5 flex gap-2">
    <a class="flex rounded-md bg-slate-900 hover:bg-slate-800 focus:bg-slate-800" href="https://store.steampowered.com/app/{appid}" target="_blank" rel="noreferrer"><span class="w-5 h-5 block my-auto mx-2.5"><MdOpenInNew /></span></a>
    <span class="w-max flex gap-4 px-5 py-2.5 rounded-md text-sm bg-slate-900">{@html data.price_overview.discount_percent > 0 ? `<span class="line-through text-slate-500">${data.price_overview.initial_formatted}</span><div class="w-0.5 bg-slate-700"></div>` : ''}<span class="">{data.price_overview.final_formatted}</span></span>
  </div>
  <img class="w-max h-[50%] object-scale-down" src="https://cdn.cloudflare.steamstatic.com/steam/apps/{appid}/logo.png?t=1649114583" alt={data.name} title={data.name}>
  <p class="mt-auto mb-2.5">{data.short_description}</p>
  <div class="flex gap-2.5 flex-wrap justify-between">
    <span class="text-cyan-500 font-semibold">{(data.developers[0] !== data.publishers[0]) ? [...data.developers, ...data.publishers].join(' • ') : data.developers.join(' • ')}</span>
    <span class="font-semibold">{data.release_date.coming_soon ? 'Coming soon' : new Date(data.release_date.date).toLocaleDateString()}</span>
  </div>
  <img class="z-[-1] absolute left-0 top-0 w-full h-full object-cover" src={data.background} alt="">
</div>