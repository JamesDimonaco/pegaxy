import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { Pegaxy, Total, totalVis } from '../components/getPegaxy'
import PegaModal from '../components/PegaModal'

export async function getServerSideProps() {

  const a = await Pegaxy()
  const b = await Total()
  const c = await totalVis()

  return {
    props: {
      Pegaxys: a,
      Total: b,
      Vis: c
    }, // will be passed to the page component as props
  }
}

interface IProps {
  Pegaxys: [{
    id: number,
    name: string,
    imageUrl: string,
    gender: string,
    pegaTotalRaces: number,
    gold: number,
    silver: number,
    bronze: number,
    lose: number,
    win: number,
    energy: number,

  }],
  Total: [{
    name: string,
    total: number
  }],
  Vis: {
    lockedVis: number,
    usd: number,
    gbp: number,
    pega: number,
  }
}


export default function Home({ Pegaxys, Total, Vis }: IProps) {
  console.log(Total, Vis);





  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Pegaxy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">

        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Races so far</h3>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {Total.map((item) => (
              <div key={item.name} className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.total}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className='pt-6'>
          <h3 className=" text-lg leading-6 font-medium text-gray-900">Earnings so far</h3>

          <div className='flex py-4'>
            <dt className='bg-yellow-500 rounded-md px-2.5 py-0.5'>Vigorus (VIS)</dt>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">=</span>
            <dd className='bg-yellow-500 rounded-md px-2.5 py-0.5'>{Vis.lockedVis}</dd>
          </div>

          <div className='flex py-4'>
            <dt className='bg-red-500 rounded-md px-2.5 py-0.5'>Great British Pounds (GBP)</dt>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">=</span>
            <dd className='bg-red-500 rounded-md px-2.5 py-0.5'>£{Vis.gbp.toFixed(2)}</dd>
          </div>

          <div className='flex pt-4'>
            <dt className='bg-green-500 rounded-md px-2.5 py-0.5'>United states dollar (USD)</dt>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">=</span>
            <dd className='bg-green-500 rounded-md px-2.5 py-0.5'>{'$' + Vis.usd.toFixed(2)}</dd>
          </div>
        </div>



        <div className="mx-auto py-12 px-2 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Our Pegaxy's</h2>
              <p className="text-xl text-gray-500">
                A list of our Pegaxys
              </p>
            </div>
            <ul
              role="list"
              className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
            >
              {Pegaxys.map((pegaxy) => {
                const [openModal, setOpenModal] = useState(false);
              
              return(
                <li onClick={() => setOpenModal(true)} key={pegaxy.name}>
                  <div className="space-y-4">
                    <div className="aspect-w-3 aspect-h-2 object-cover shadow-lg rounded-lg">
                      <Image width={400} height={400} src={pegaxy.imageUrl} alt="" />
                    </div>

                    <div className="space-y-2">
                      <div className="text-lg leading-6 font-medium space-y-1">
                        <h3>{pegaxy.name}</h3>
                        <p className="text-indigo-600">{pegaxy.gender}</p>
                      </div>
                    </div>
                    <PegaModal pega={pegaxy} open={openModal} setClose={() => setOpenModal(false)}/>
                  </div>
                </li>
              )})}
            </ul>
          </div>
        </div>
      </main>


    </div>
  )
}
