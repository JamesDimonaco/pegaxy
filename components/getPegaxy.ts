import axios from 'axios'

export const Pegaxy = async () => {
    let imageUrl:string
    const response = await axios.get('https://api-apollo.pegaxy.io/v1/pegas/owner/user/0x5CB790783984fF41D214e03dF10e7244603E361b')

    let pegaxys = response.data

    pegaxys.forEach(async (pegaxy: { id: number; }, i: any) => {
        const pega = await axios.post('https://test-django.aronclarkclark.repl.co/api/lookup/', {
            pega_id: pegaxy.id
        })
         imageUrl = pega.data.pega.design.avatar

        pegaxys[i].imageUrl = imageUrl
        
    });

    return pegaxys
}

export const Total = async () => {
    const response = await axios.get('https://api-apollo.pegaxy.io/v1/stats/game/total/user/0x5CB790783984fF41D214e03dF10e7244603E361b?since=1641081600')
    const keys = Object.keys(response.data)
    const values = Object.values(response.data)
    let totalArray:[{}] = [{}]
   
    totalArray.pop()
    keys.forEach((e, i) => {        
        totalArray.push({
            name: e,
            total: values[i]
        })
    });
    
    
    return totalArray
}

export const totalVis = async () => {
    const response = await axios.get('https://api-apollo.pegaxy.io/v1/assets/count/user/0x5CB790783984fF41D214e03dF10e7244603E361b')
    let resData = response.data
    const currencies = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=vigorus&vs_currencies=usd%2Cgbp',{
        headers: {
            "Content-Type":  "application/json"
    }})
    currencies.data.vigorus.usd 
    resData.usd = resData.lockedVis * currencies.data.vigorus.usd
    resData.gbp = resData.lockedVis * currencies.data.vigorus.gbp
    

    return resData
}
