'use client';

// components
import { Input } from '../_components/ui/input';
import { Search } from "lucide-react";

export default function SearchTickets() {
  function handleSearch(term) {
    console.log(term);
  }
 
  return (
    <div className=' flex items-center mx-auto relative w-11/12'>
      <label htmlFor="searchBtn" className="absolute top-1/5 right-1">
        <Search strokeWidth={1}/>
      </label>
      <Input
        id="searchBtn"
        className=" h-8"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
  </div>
  );
}