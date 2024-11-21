import express, { Request , Response , Application } from "express";
import db  from "@repo/db/client"
const app: Application = express()

app.use(express.json())

//@ts-ignore
app.post("/HDFCwebhoock" ,async (req : Request , res : Response)=>{
    //TODO : add zod and webhoock secreate (more validaton ) 

    const paymentInformation = {
        token : req.body.token , 
        userId: req.body.user_identifier,
        amount: req.body.amount
    }

    const status = await db.onRampTransaction.findFirst({
        where : {
            token : paymentInformation.token
        }
    })
    if (!status || status.status === 'Success' || status.status === 'Failure') 
    {
        return res.status(400).json({
            message: "This transaction is not in pending; it is either Failed or Success / Completed."
        });
    }
   
    try {
        await db.$transaction([

            db.balance.update({
                where : {
                    userId : paymentInformation.userId
                },
                data : {
                    amount : {
                        increment : Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where : {
                    userId : paymentInformation.userId
                },
                data : {
                    status : "Success"
                }
            })
        ])

        res.json({
            message: "Captured"
        })
    } catch (err) {
        console.error(err);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
   
})
app.listen(3003, () => {
    console.log('Server is running on port 3003');
});