"use client"

import { getCart } from "@/services/Cart/cart.service";
import { useEffect, useState } from "react";

export function useCart() {
    const [cart,setCart]=useState([]);

    useEffect(()=>{
        loadCart();
    },[]);

    const loadCart = async ()=>{
        const data = await getCart();
        setCart(data);
    }

    return {
        cart,
        setCart,
        loadCart,
    };
}