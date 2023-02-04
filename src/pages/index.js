import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import factory from '../../ethereum/factory'
import { useRouter } from 'next/router'



import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material'
import { Add, AddCircle, WidthFull } from '@mui/icons-material'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function Home({ campaigns }) {
  const router = useRouter();

  const renderCampaigns = campaigns.map(address =>{
    return(
      <Grid key={address} item xs={10} md={10}>
          <Item>
            <Typography variant='subtitle' sx={{overflowWrap: "break-word"}}>{address}</Typography>
            <Link href={`/campaign/view/${address}`}   style={{textDecoration:'none', }}><Typography>view campaign</Typography></Link>
          </Item>
        </Grid>
    )
  })
  
  return (
    <>
      <Head>
        <title>Crowdfund | Home</title>
        <meta name="Crowdfund" content="Corwdfund dapp allow you to collect funds for your next big product in total transprency" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     <Box sx={{padding:4, display:"flex", justifyContent:'space-between'}}>
        <Typography variant='h3'>Open Campaigns</Typography>
        <Button variant="contained" color='primary' sx={{minWidth:'200px', borderRadius:'50px'}} onClick={()=>router.push('/campaign/new')} startIcon={<AddCircle/>}> Create campaign</Button>
      </Box>
      <Box sx={{padding:4}}>
     
        <Grid container spacing={2}>
          {renderCampaigns}
        </Grid>
      
      </Box>
      
     
    </>
  )
}

//for serverside render
Home.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};


export default Home;
