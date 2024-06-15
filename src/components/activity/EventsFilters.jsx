// EventsFilters.jsx

import React, { useState } from "react";
import "../../index.css";
import { FilterSelect } from "../UI/FilterSelect.jsx";
import { InputSearch } from "../UI/InputSearch.jsx";
import { courses } from "../../pages/HomePage.jsx";

export function EventsFilters({ onSearch }) {
  const categories = [
    { id: 1, title: "University" },
    { id: 2, title: "Course" },
    { id: 3, title: "Students" },
    { id: 4, title: "Major" },
  ];

  return (
    <div className="flex md:flex-col justify-between gap-4 my-4 w-full">
      <InputSearch placeholder="Search an event" onSearch={onSearch} /> 
    </div>
  );
}