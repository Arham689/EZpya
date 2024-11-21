"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "@repo/db/client";

export async function p2ptrans ( to : string , amount : number ) {
    
    const session = await getServerSession(authOptions);
    const from = session?.user?.id
    if (!from) {
        return {
            message: "Error while sending"
        }
    }
    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });
    if (!toUser) {
        return {message : 'NO user found '}
    }
    await prisma.$transaction(async (tx)=>{
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
        // find the from balance 
        const fromBalance =await tx.balance.findFirst({
            where : {
                userId : Number(from)
            }
        })
        // Insufficient funds
        if (!fromBalance || fromBalance.amount < amount) {
            throw new Error('Insufficient funds');
        }
        //decrease 
        await tx.balance.update({
            where : {
                userId : Number(from)
            },
            data : {
                amount : {
                    decrement : Number(amount) 
                }
            }
        })
        //increase
        await tx.balance.upsert({
            where : {
                userId : toUser.id
            },
            update : {
                amount: {
                    increment: Number(amount),
                },
            },
            create: {
                userId: toUser.id,
                amount: Number(amount),       // Initialize balance for new user
                locked: 0,                    // Default value for locked funds
            },
        })
    })

    await prisma.p2pTransfer.create({
        data : {
            amount : Number(amount) , 
            fromUserId : Number(from ), 
            toUserId : toUser.id ,
            timestamp : new Date(),
        }
    })
}