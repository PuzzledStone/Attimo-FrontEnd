import "../../index.css";
import { useState, useEffect } from "react";
import { LibraryBig } from "lucide-react";
import { EmptyState } from "../UI/EmptyState.jsx";
import { CardCourses } from "../UI/CardCourses.jsx";

export function MyCourses({ items, name }) {
  const [cardCourses, setCardCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('http://attimobackend.test/attimo-backend/public/api/user/courses', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }

        const data = await response.json();
        setCardCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
       
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <h1 className="dark:text-white dark:duration-300">My Courses</h1>
      {items.length === 0 ? (
        <EmptyState 
          icon={LibraryBig} 
          title="No courses to display!" 
          message="Time to take a breather and plan your next adventure!" 
        />
      ) : (
        <>
          <p className="mt-2 mb-5 dark:text-clr-light-gray">
            Have a nice day {name}, are you ready for your next event?
          </p>
          <div className="grid grid-cols-auto-300 tablet:grid-cols-auto-250 gap-4 w-full max-h-[47rem] overflow-y-scroll no-scrollbar">
            {cardCourses.map((item) => (
              <CardCourses
                key={item.id}
                title={item.name}
                description={item.description}
                consultations={item.consultations}
                image={item.image || defaultImage }
                day={item.day}
                hour={item.hour}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
