
import { useRouter } from "next/router";
import Link from "next/link";
import Campaign from "ethereum/campaign";




import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Typography } from '@mui/material'


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

 function CampaignDetail({minContribution, balance, requestsCount, approversCount, manager}){
    const router = useRouter();
    console.log(manager)
    const arr = [
        {
            header: manager,
            meta: 'Campaign manager address',
            description:'This manager minted the campagin and can reauest for realease of Funds'
        },
        {
            header: balance,
            meta: 'Campaign balance',
            description:'Amount in the campaign'
        },
        {
            header: minContribution,
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
        return(<Grid key={index} item xs={6}>
            <Item sx={{display:'flex', flexDirection:'column', gap:'10px'}}>
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
        </Grid>)
    });
    console.log(arr)
        
 

    return<>
        <Box sx={{padding:4}}>
     
            <Grid container spacing={2}>
            {renderCards}
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
        manager: campaignDetail[4]
    
    };
  };

  export default CampaignDetail