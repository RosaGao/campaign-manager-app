'use client'

import { Campaign } from '../lib/types'
import Image from 'next/image'
import dateFormat from 'dateformat'
import { useRouter } from 'next/navigation'




export default function CampaignPage(myCampaigns: Campaign[]) {
  const router = useRouter();

  const campaigns: Campaign[] = Array.isArray(myCampaigns) ? myCampaigns : Object.values(myCampaigns);

  if (!campaigns || campaigns.length === 0)
    return <div className='font-merriweather text-5xl'>Error fetching data!</div>
  else
    return (<div className='flex justify-center'>
      <div className='w-content'>
        <div className='font-merriweather text-6xl pt-10 text-center'>Available Campaigns</div>
        <br></br><br></br>
        {
          campaigns.map((campaign) => {
            return (
              <div key={campaign.slug} className='font-nunito pt-5'>
                <div className='bg-zinc-800 cursor-pointer grid grid-cols-11 p-8'>
                  <Image src={"https://res.cloudinary.com/dquz89py1/" + campaign.logo}
                    alt='campaign banner' width={500} height={500} className='col-span-5 rounded-lg m-auto' />
                  <div className='col-span-1'></div>
                  <div className='col-span-5'>
                    <div className='text-5xl'
                      onClick={() => router.push(`${campaign.slug}`)}>
                      {campaign.title}
                    </div>
                    <div className='text-2xl'>{campaign.description}</div>
                    <div className='text-md text-stone-400'>{dateFormat(new Date(campaign.created_at), 'dddd, mmmm dS, yyyy, h:MM:ss TT')}</div>
                  </div>
                </div>
                <br /><br />
              </div>
            )
          })

        }
      </div>
    </div >)

}

