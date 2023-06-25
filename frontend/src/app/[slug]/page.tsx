import SlugPage from '../../components/SlugPage'
import { getCampaigns } from '../page'
import { Campaign } from '@/lib/types';


export async function generateStaticParams() {
  const campaigns = await getCampaigns();
  return campaigns.map((campaign) => {
    slug: campaign.slug
  });;
}

async function getCampaignDetail(slug: string) {
  const res =
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}campaigns/${slug}`,
      {
        next: { revalidate: 5 }
      });

  return res.json();;
}

export default async function Slug({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const campaignDetail: Campaign = await getCampaignDetail(slug);
  console.log("campaign detail >> ", campaignDetail)

  return (
    <>
      <div className="h-container fixed w-[100%]"
      >
        <SlugPage campaignDetail={campaignDetail} />
      </div>
    </ >
  )
}