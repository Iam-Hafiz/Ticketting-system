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
    <Select name="priority">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Ticket priority"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
