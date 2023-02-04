
import { useRouter } from "next/router";
import { Button, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import InputAdornment from '@mui/material/InputAdornment';
import { Box } from "@mui/system";
import { useState } from "react";

import factory from 'ethereum/factory';
import web3 from "ethereum/web3";

export default function CampaignNew(){
    const router = useRouter();
    const[contribution, setContribution] = useState(0);
    const[contractErr, setContractErr] = useState(null)
    const[loading, setLoading] = useState(false)
    const handleCreateCampaign=async()=>{
        
        const accounts = await web3.eth.getAccounts();

        const wei = web3.utils.toWei(`${contribution}`, 'ether');
        
        if(contribution>0){
            setLoading(!loading)
            setContractErr(null)
            try {
                await factory.methods.createCampaign(wei).send({from:accounts[0]})
                router.push('/')
            } catch (error) {
                setContractErr(error.message);
                
            }
            setLoading(!loading)
        }
        

    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setContractErr(null);
      };
    
    return<>
    <Box sx={{display:'flex',padding:4,}}>
        <Snackbar open={!!contractErr} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal:'right' }} >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Oops! 
          {contractErr}
        </Alert>
        </Snackbar>
        <Box sx={{display:'flex',flexDirection:'column',padding:3, rowGap:2,  border: '2px solid #6750a4', width:'50%', margin:'0 auto', borderRadius:'20px'}}>
        <Typography variant="h3">Start your project</Typography>
        <TextField
            id="contribution"
            label="Minimum Contribution"
            type="number"
            value={contribution}
            InputProps={{
                startAdornment: <InputAdornment position="start">ETH</InputAdornment>,
            }}
            onChange={e=>setContribution(e.target.value)}
            
            />
        <LoadingButton 
            variant="contained" 

            color={loading?'secondary':'primary'}            
            loading={loading}
            sx={{ borderRadius:'50px'}}
            onClick={handleCreateCampaign}
          ><span>Create Campaign</span></LoadingButton>
        </Box>
    </Box>
    </>
}