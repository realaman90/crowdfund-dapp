
import { useRouter } from "next/router";
import Link from "next/link";
import Campaign from "ethereum/campaign";




import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Typography } from '@mui/material'
import web3 from "ethereum/web3";
import Participate from "@/components/participate";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

 function CampaignDetail({minContribution, balance, requestsCount, approversCount, manager,address}){
    const router = useRouter();

    const arr = [
        {
            header: manager,
            meta: 'Campaign manager address',
            description:'This manager minted the campagin and can reauest for realease of Funds'
        },
        {
            header: web3.utils.fromWei(balance,'ether'),
            meta: 'Campaign balance',
            description:'Amount in the campaign'
        },
        {
            header: web3.utils.fromWei(minContribution, 'ether') + ' ETH' ,
            meta: 'Campaign minimum contribution',
            description:'Minimum contribution for entring this campaign'
        },
        {
            header: requestsCount,
            meta: 'Campaign request count',
            description:'Total requests for suppliers'
        },
        {
            header: approversCount,
            meta: 'approvers count',
            description:'approved count'
        }
    ]
    const renderCards = arr.map((item,index) =>{
        return(<Grid key={index} item xs={3}>
            <Item >
            <Typography variant="subtitle">
                    {item.header}
                </Typography>
                <Typography >
                    {item.meta}
                </Typography>
                <Typography >
                    {item.description}
                </Typography>
            </Item>
        </Grid>
        )
    });
    console.log(arr)
        
 

    return<>
        <Box sx={{display:'flex', padding:'20px'}} >
     
            <Grid container spacing={1} columnGap={1} columns={{xs: 10}} >
            {renderCards}
            
            </Grid>
            <Grid columns={{xs:2}}>
            <Grid xs={4}>
                <Participate address={address} />
            </Grid>
            </Grid>
      
        </Box>
      
    </>
}

CampaignDetail.getInitialProps = async (router) => {
    
    const address = router.query.contract
    const campaign = Campaign(address);
    const campaignDetail =  await campaign.methods.getSummary().call();
    return { minContribution: campaignDetail[0],
        balance: campaignDetail[1],
        requestsCount: campaignDetail[2],
        approversCount: campaignDetail[3],
        manager: campaignDetail[4],
        address
    
    };
  };

  export default CampaignDetail