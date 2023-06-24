import CampaignPage from '../components/CampaignPage';
import { Campaign } from '../lib/types';
import Head from 'next/head'

// fetch data at build time
async function getCampaigns(): Promise<Campaign[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}campaigns`, { next: { revalidate: 10 } })
    if (!response.ok) {
      return []
    }
    return response.json()
  } catch (err) {
    return []

  }
}

export default async function Home() {
  let campaigns: Campaign[] = await getCampaigns();

  return (
    <div className='overflow-scroll text-slate-100 bg-zinc-900 h-container'>
      <Head>
        <title>Campaign Manager: | Home</title>
        <meta name="description" content='Campaign management made simple!'></meta>
      </Head>
      <CampaignPage {...campaigns} />
    </div >
  )
}


