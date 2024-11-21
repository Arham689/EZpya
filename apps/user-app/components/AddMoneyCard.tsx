"use client"
import React from 'react'
import { useState } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
// import { Center } from "@repo/ui/Center.tsx";
import { Select } from "../../../packages/ui/src/select";
import { TextInput } from "../../../packages/ui/src/textinput";

import { createOnrampTransaction } from '../app/lib/createOnrampTransaction';
import { Providers } from '../provider';

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];


export const AddMoneyCard = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [value, setValue] = useState(0)
    return <Card title="Add Money">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val) => {
            setValue(Number(val))
        }} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value : any) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
            setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={async () => {
                await createOnrampTransaction(provider  , value )
            }}>
            Add Money
            </Button>
        </div>
    </div>
</Card>
}
