"use client"

import * as React from "react"

import { Button } from "./ui/button"
import { X } from "lucide-react"

export function CartRemoveButton() {
    return (
        <Button variant="ghost" className="hover:bg-white hover:text-destructive gap-[3px]"><X /> Remove</Button>
    )
}
