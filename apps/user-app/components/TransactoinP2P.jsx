import React from 'react';
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../user-app/app/lib/auth";

const getP2PTransactions = async () => {
    const session = await getServerSession(authOptions);
    const trans = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session.user.id)
        }
    });
    return trans.map(t => {
        return {
            amount: t.amount,
            timestamp: t.timestamp,
            fromUserId: t.fromUserId,
            toUserId: t.toUserId
        };
    });
};

const TransactoinP2P = async () => {
    const data = await getP2PTransactions();

    return (
        <div className="flex flex-col items-center justify-start  h-full p-4 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">P2P Transactions</h2>
            <div className="w-full max-w-3xl bg-white shadow rounded-md">
                {data.map((t, index) => (
                    <div
                        key={index}
                        className={`flex justify-between items-center px-4 py-3 
                            ${index !== data.length - 1 ? "border-b border-gray-200" : ""} 
                            ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                    >
                        <span className="text-gray-700">Amount: ₹{(t.amount / 100).toFixed(2)}</span>
                        <span className="text-gray-500 text-sm">To: User {t.toUserId}</span>
                        <span className="text-gray-400 text-sm">
                            {new Date(t.timestamp).toLocaleDateString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactoinP2P;
