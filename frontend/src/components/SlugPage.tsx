'use client'
import Image from 'next/image'
import dateFormat from 'dateformat'
import Link from 'next/link'
import { Alert, Button, Snackbar } from '@mui/material';
import { useState } from 'react';


export default function SlugPage({ ...props }) {
  const { campaignDetail } = props;

  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <div>
      <div className='bg-[url("https://rare-gallery.com/uploads/posts/580465-black-black.jpg")] w-screen h-screen opacity-95 bg-no-repeat bg-cover z-0 flex justify-center'>

        <div className='z-2 bg-zinc-900 bg-opacity-80 w-[100%] h-[40%] min-h-fit m-auto flex justify-center'>
          <div className='w-[90%] grid grid-cols-10'>
            <div key={campaignDetail.slug} className='font-nunito text-white    col-span-6 flex flex-col justify-center mx-5 min-w-fit gap-y-5'>

              <Image src={"https://res.cloudinary.com/dquz89py1/" + campaignDetail.logo}
                alt='campaignDetail banner' width={200} height={200}
                className='rounded-lg ml-0' />
              <div className='space-y-2'>
                <div className='text-xl'>
                  {campaignDetail.title}
                </div>
                <div className='text-md'>{campaignDetail.description}</div>
                <div className='text-xs text-stone-400'>{dateFormat(new Date(campaignDetail.created_at), 'dddd, mmmm dS, yyyy, h:MM:ss TT')}</div>
              </div>
            </div >


            <div className='col-span-4 text-black flex flex-col justify-center mx-5 min-w-fit'>
              <input placeholder='Please enter your email...'
                type='email'
                value={email}
                name='email-input'
                className='p-2 rounded-md'
                onChange={(event) => setEmail(event.target.value)}>
              </input>
              <Button variant='contained' className='bg-green-800 mt-2 rounded-md'
                onClick={async (event) => {
                  event.preventDefault();
                  const postData = {
                    email: email,
                    campaign: campaignDetail.id
                  };

                  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}subscribe/`, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(postData),
                  }).then((res) => {
                    console.log(res);
                    if (!res.ok) {
                      setSuccess(false);
                      setAlert(true);
                    } else {
                      setSuccess(true);
                      setAlert(false);
                      setEmail('')
                    }
                    return res.json();
                  })
                    .then((response) => { console.log(response); });
                }}>
                SUBSCRIBE
              </Button>
              {/* {alert && */}
              <Snackbar open={alert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={2500}
                onClose={() => setAlert(false)}>
                <Alert
                  onClose={() => setAlert(false)}
                  severity="error"
                  sx={{ width: '100%' }}>
                  Failed to subscribe! Please retry.
                </Alert>
              </Snackbar>
              {/* } */}
              {/* {success && */}
              <Snackbar open={success}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={2500}
                onClose={() => setSuccess(false)}>
                <Alert
                  onClose={() => setSuccess(false)}
                  severity="success"
                  sx={{ width: '100%' }}>
                  Subscribed successfully!
                </Alert>
              </Snackbar>
              {/* } */}
            </div>
          </div >
        </div>
      </div >


      <div>
        <footer className='flex justify-center text-white fixed bottom-5 cursor-pointer text-md border-t-2 w-[100%] font-merriweather'>
          <Link href="/" className='mt-1'>
            Go back to all campaigns
          </Link>
        </footer>
      </div>
    </div >
  )
}
