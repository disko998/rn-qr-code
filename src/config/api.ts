export const URL = 'https://yourfair-git-s4.madewithyou1.now.sh/graphql'

export const queries = {
  events: `{scanningAppEvents{id,name,imageTopMobile,imageBottomMobile,imageTopTablet,imageBottomTablet}}`,
}

export const getEvents = async () => {
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: queries.events }),
  })

  if (res.ok) {
    return await res.json()
  }
}
