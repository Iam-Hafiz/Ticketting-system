import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../_components/ui/select"

export function SelectPriority() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Ticket priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">High</SelectItem>
          <SelectItem value="banana">Medium</SelectItem>
          <SelectItem value="blueberry">Low</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
