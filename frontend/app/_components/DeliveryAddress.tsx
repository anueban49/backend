'use client';
import React, {useState, useEffect} from 'react';
import { Input } from '@/components/ui/input';
const value: string = useState("")
export function DeliveryAddress() {
    return (
        <div className='w-'>
            <Input type='text' value={value} placeholder='Delivery address'/>
        </div>
    )
}