import "../../index.css";
import { CardEvents } from "../UI/CardEvents.jsx";
import { EventsFilters } from "./EventsFilters.jsx";

export function MyEvents({items}){
    return (
        <>  
            <h1 className="dark:text-white dark:duration-300">My Events</h1>
            <EventsFilters/>
            <div className="grid gap-4 grid-cols-auto-300 tablet:grid-cols-auto-250 w-full max-h-[54rem] overflow-y-scroll no-scrollbar"> 
                {items.map(item => (
                    <CardEvents
                        key={item.title}
                        title={item.title}
                        percent={item.percent}
                        description={item.description}
                        date={item.date}
                        hour={item.hour}
                        image={item.image}
                        category={item.category}
                        label={item.label}
                        status={item.status}
                    />
                ))}
            </div>
        </>
    );
}
