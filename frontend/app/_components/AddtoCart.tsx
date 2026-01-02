'use client';
import { useEffect, useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const clientCart = [];
type itemType = {
    name: string;
    price: number;
}

function AddtoCart(props: itemType) {

    useEffect(() => {}, [])
    return (
      
        <Card>
            <p>{props.name}</p>
            <p>{props.price}</p>
            <Button>Add to Cart</Button>
        </Card>
   
    )
}