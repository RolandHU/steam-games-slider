export function load() {
  const appids = ['1326470', '1643320', '534380', '412020', '1174180', '242760', '110800']
  const games = []

  async function getData(appid) {
    const res = await fetch(`https://store.steampowered.com/api/appdetails?l=en&appids=${appid}`)
    const data = await res.json()
    return { data: data[appid].data, appid: appid }
  }

  async function returnResult() {
    for (let i = 0; i < appids.length; i++) {
      games.push(await getData(appids[i]))
      if (i + 1 === appids.length) return { games: games }
    }
  }

  return returnResult()
}