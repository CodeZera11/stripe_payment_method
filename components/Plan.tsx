"use client";

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios';
import { useRouter } from 'next/navigation';

const PlanCard = ({ plan }: { plan: PlanType }) => {

    const router = useRouter();

    const checkout = async () => {
        try {
            const response = await axios.post("/api/checkout", { planId: plan.id })

            const url = await response.data;
            router.push(url)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='text-white p-2'>
            <div className='w-[400px] text-center'>
                <Card>
                    <CardHeader>
                        <CardTitle>{plan.nickname}</CardTitle>
                        <CardDescription>Price: ₹{plan.unit_amount / 100}/-</CardDescription>
                    </CardHeader>
                    <Button onClick={checkout}>Buy Now</Button>
                </Card>
            </div>
        </div>
    )
}

const Plan = () => {

    const [plans, setPlans] = useState<PlanType[]>([]);

    const getPlans = async () => {
        try {
            const response = await axios.get("/api/getPlans")
            setPlans(response.data)
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPlans()
    }, [])


    return (
        <div className="grid lg:grid-cols-3 gap-6">
            {plans?.map((plan: PlanType) => (
                <PlanCard key={plan.id} plan={plan} />
            ))}
        </div>
    )
}

export default Plan