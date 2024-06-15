// EventsFilters.jsx

import React, { useState } from "react";
import "../../index.css";
import { InputSearch } from "../UI/InputSearch.jsx";

export function EventsFilters({ onSearch }) {
  
  return (
    <div className="flex md:flex-col justify-between gap-4 my-4 w-full">
      <InputSearch placeholder="Search an event" onSearch={onSearch} /> 
    </div>
  );
}