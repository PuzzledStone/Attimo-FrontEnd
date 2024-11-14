import "../../index.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EventSummary } from "../UI/EventSummary";
import { Smile } from "lucide-react";
import { EmptyState } from "../UI/EmptyState.jsx";

export function UpcomingEvents({ items }) {
  const [cardUpcoming, setUpcoming] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://attimo-backend.vercel.app/public/api/user/activities",{
          headers: {Authorization: `Bearer ${token}`,},
        });

      if (!response.ok) {
        console.error('Failed to fetch activities');
        return;
      }
        const data = await response.json();
        const currentDate = new Date();
        const sortedActivities = data.sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at));
        const upcomingActivities = sortedActivities.filter(activity => new Date(activity.scheduled_at) >= currentDate).slice(0, 4);
        setUpcoming(upcomingActivities);
    };

    fetchData();
  }, []);

  return (
    <div className="mt-2 px-6 grid">
      <section className="flex items-center justify-between">
        <h2 className="my-4 dark:text-white">Upcoming events</h2>
        <Link to="/attimo/events">
          <p className="duration-300 cursor-pointer hover:text-clr-blue dark:text-clr-light-gray dark:hover:text-white">View all</p>
        </Link>
      </section>

      {cardUpcoming.length === 0 ? (
        <EmptyState 
          icon={Smile} 
          title="No events" 
          message="You have no events scheduled yet!" 
        />
      ) : (
        <div className="grid gap-2 w-full">
          {cardUpcoming.map((item) => (
            <EventSummary
              key={item.id}
              title={item.name}
              schedule_at={item.scheduled_at}
              image={item.image}
              percent={item.percent}
            />
          ))}
        </div>
      )}
    </div>
  );
}
