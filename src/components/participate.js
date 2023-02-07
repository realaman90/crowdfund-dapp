
import { LoadingButton } from "@mui/lab";
import { Card, CardActionArea, CardContent, Box, Button, TextField,Alert,Snackbar } from "@mui/material"
import { useState } from "react"
import Campaign from "ethereum/campaign";
import { useRouter } from "next/router";

import web3 from "ethereum/web3";

function Participate(address){
    
    const router = useRouter();
    const [contributionValue, setContributionValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState('')
    const handleChange =  (event)=>{
        setContributionValue(event.target.value)
    }
    const handleClick=async()=>{
       if(contributionValue > 0){ 
        const campaign = Campaign.at(address);
        console.log(address)
        
        try {
            const accounts = await web3.eth.getAccounts();
            // console.log(accounts[0]);
            // await Campaign(address).methods.contribute().send({
            //     from:accounts[0],
            //     value: web3.utils.toWei(contributionValue,'ether')
            // })
            const res = await campaign.methods.getSummary().call();
            console.log(res)
            router.replace(`campaign/view/${address}`)

        } catch (error) {
            console.log(error)
            setMsg('Oops something went wrong')
        }}else{
            setMsg('Please enter a minimum balance')
        }

    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setMsg('');
      };
    return(
        <Box sx={{display:'flex', flexDirection:'column', gap: '10px' , border:'1px rgba(154,154,154,0.5) solid',padding:'20px', borderRadius:'10px', boxShadow:'5px 5px 2px rgba(154,154,154,0.5)' }}>
          
                <TextField
                    id="contribute"
                    label="Amount to contribute"
                    value={contributionValue}
                    onChange={handleChange}
                    type='number'
                
                />
                <LoadingButton onClick={handleClick} loading={isLoading} variant="contained" color={isLoading?'secondary':'primary'}> <span>Contribute</span></LoadingButton>
                <Snackbar open={!!msg} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{            vertical:'top', horizontal:'right' }} >
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {msg}
                    
                    </Alert>
                </Snackbar>
        </Box>
        
    )
}

export default Participate