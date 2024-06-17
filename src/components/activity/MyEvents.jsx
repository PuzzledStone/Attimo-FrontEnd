// MyEvents.jsx

import React, { useState, useEffect } from "react";
import "../../index.css";
import { CardEvents } from "../UI/CardEvents.jsx";
import { EventsFilters } from "./EventsFilters.jsx";
import { EmptyState } from "../UI/EmptyState.jsx";
import { CalendarOff } from "lucide-react";

export function MyEvents({ items }) {
  const [cardActivity, setCardActivity] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const getData = async () =>{
    const response = await fetch ('http://attimobackend.test/attimo-backend/public/api/activity/all');
    const data = await response.json();
    setCardActivity(data);
    setFilteredActivities(data); 
}

useEffect(() => {
    getData();
  }, []);

  const handleSearch = (query) => {
    setSearchTerm(query);
    const filtered = cardActivity.filter((event) =>
      event.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredActivities(filtered);
  };

  return (
    <>
      <h1 className="dark:text-white">My Events</h1>
      {cardActivity.length === 0 ? (
        <EmptyState
          icon={CalendarOff}
          title="No events on the horizon!"
          message="Looks like you have some free time. Relax and enjoy!"
        />
      ) : (
        <>
          <EventsFilters onSearch={handleSearch} /> 
          <div className="grid gap-4 grid-cols-auto-300 tablet:grid-cols-auto-250 w-full max-h-[52rem] xl:max-h-[55rem] overflow-y-scroll no-scrollbar">
            {filteredActivities.map((item) => (
              <CardEvents
                key={item.id}
                title={item.name}
                percent={item.percent}
                description={item.description}
                image={item.image}
                category={item.category}
                status={item.status}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
