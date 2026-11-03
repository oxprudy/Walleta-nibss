const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors({origin:true}));
app.use(express.json());
const PAYSTACK_SECRET_NIGERIA = process.env.PAYSTACK_SECRET;
const BANKS = {"Access Bank":"044","GTBank":"058","First Bank":"011","Zenith":"057","UBA":"033","OPay":"999992","PalmPay":"999991","Moniepoint":"50515","Kuda":"50211","Wema":"035","Stanbic":"221"};
app.post('/resolve', async (req,res)=>{
  const {account_number, bank_name} = req.body;
  let code = "999992";
  for(let k in BANKS) if(bank_name && bank_name.toLowerCase().includes(k.toLowerCase())) code = BANKS[k];
  try {
    const r = await axios.get(`https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${code}`, {headers:{Authorization:`Bearer ${PAYSTACK_SECRET_NIGERIA}`}});
    res.json({status:true, data:{account_name:r.data.data.account_name, account_number}});
  } catch(e) {
    res.status(400).json({status:false, message:e.response?.data?.message || "Could not verify"});
  }
});
app.get('/', (req,res)=>res.send('Walleta NIBSS Backend Running'));
app.listen(process.env.PORT||3000, ()=>console.log('Running'));
