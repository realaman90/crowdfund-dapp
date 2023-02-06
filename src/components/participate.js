
import { LoadingButton } from "@mui/lab";
import { Card, CardActionArea, CardContent, Box, Button, TextField,Alert,Snackbar } from "@mui/material"
import { useState } from "react"

function Participate(){
    const [contributionValue, setContributionValue] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const handleChange =  (event)=>{
        setContributionValue(event.target.value)
    }
    return(
        <Box sx={{display:'flex', flexDirection:'column', gap: '10px' , border:'1px rgba(154,154,154,0.5) solid',padding:'20px', borderRadius:'10px', boxShadow:'5px 5px 2px rgba(154,154,154,0.5)' }}>
          
                <TextField
                    id="contribute"
                    label="Amount to contribute"
                    value={contributionValue}
                    onChange={handleChange}
                
                />
                <LoadingButton loading={isLoading} variant="contained" color={isLoading?'secondary':'primary'}> <span>Contribute</span></LoadingButton>
            
        </Box>
    )
}

export default Participate