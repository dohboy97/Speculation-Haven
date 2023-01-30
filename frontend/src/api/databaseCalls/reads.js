export default async function getTickerFromServer({input,selectedMarket}){
console.log(selectedMarket)
      if(input){
          const res = await fetch(`/search/${input}`,{
              method:'POST',
              headers: {'Content-type': 'application/json'},
              body: JSON.stringify({
                type:selectedMarket,
                
              })
          })
          const data = await res.json()

         return data
      }
  }