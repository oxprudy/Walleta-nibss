const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors({origin:true}));
app.use(express.json());
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET;
const BANKS = {"044":"Access Bank","011":"First Bank","058":"GTB","057":"Zenith","033":"UBA","032":"Union","035":"Wema","214":"FCMB","050":"Ecobank"};
app.post('/resolve', async (req,res)=>{
let code="044";
for(let k in BANKS){if(req.body.bank_name && req.body.bank_name.toLowerCase().includes(BANKS[k].split(' ')[0].toLowerCase())) code=k;}
try{
const r=await axios.get(`https://api.paystack.co/bank/resolve?account_number=${req.body.account_number}&bank_code=${code}`,{headers:{Authorization:`Bearer ${PAYSTACK_SECRET}`}});
res.json({status:true,account_name:r.data.data.account_name});
}catch(e){res.status(400).json({status:false,message:"Could not verify"});}
});
app.get('/',(req,res)=>res.send('Walleta NIBSS Backend Running'));
app.listen(process.env.PORT||3000);