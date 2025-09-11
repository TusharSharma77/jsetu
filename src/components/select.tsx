import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IconLanguage } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

import React from 'react'

function SelectComponent({className ,placeholder="",options=["English"]}:Readonly<{className:string,placeholder:React.ReactNode,options:string[]}>) {
  return (
    <div className={cn("w-full",className)}>
        <Select>
  <SelectTrigger size="sm" className={` w-full cursor-pointer`}>
    <SelectValue placeholder={placeholder} />
  </SelectTrigger>
  <SelectContent>
    {
        options?.map((val:string):React.ReactNode=>{
            return (<SelectItem key={val} value={val}>{val}</SelectItem>)
        })
    }
  </SelectContent>
</Select>
    </div>
  )
}

export default SelectComponent