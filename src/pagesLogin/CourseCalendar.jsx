import React from "react";
import useFetch from "../hooks/useFetch";
import Sidebar from "./Sidebar.jsx";
import { motion } from "framer-motion";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Link } from "react-router-dom";
import csLocale from "@fullcalendar/core/locales/cs";

export default function CourseCalendar() {
  const {
    loading,
    error,
    data = { data: [] },
  } = useFetch("http://localhost:1337/api/courses?populate=*");

  if (loading)
    return <p className="text-white text-center mt-20 text-xl">Načítání...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center mt-20 text-xl">
        Chyba: {error.message}
      </p>
    );

  const events = data?.data.map((course) => ({
    id: course.id,
    title:
      course.title.length > 20
        ? `${course.title.substring(0, 17)}...`
        : course.title,
    start: course.date,
    end: course.endDate || null,
    description: course.description,
    documentId: course.documentId,
  }));

  return (
    <motion.div
      className="h-screen w-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-gray-100 flex flex-col lg:flex-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <section className="flex-1 overflow-y-auto lg:ml-64 py-12 px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1 className="text-4xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 drop-shadow-lg">
            Kalendář kurzů
          </h1>
          <p className="text-md lg:text-xl text-gray-400 mt-4 max-w-3xl mx-auto">
            Prohlédněte si plánované kurzy v elegantním kalendáři s možností
            zobrazit detaily všech lekcí.
          </p>
        </motion.div>

        {/* Calendar */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg shadow-2xl">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale={csLocale}
            events={events}
            headerToolbar={{
              start: "prev,next today",
              center: "title",
              end: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            eventClick={(info) => {
              info.jsEvent.preventDefault();
              const url = `/kurz/${info.event.extendedProps.documentId}`;
              window.open(url, "_self");
            }}
            eventContent={(eventInfo) => (
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center justify-center text-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2"
              >
                <span className="font-semibold text-sm">
                  {eventInfo.timeText}
                </span>
                <span className="ml-2 text-base font-bold">
                  {eventInfo.event.title}
                </span>
              </motion.div>
            )}
            dayHeaderClassNames="bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
            dayHeaderContent={(dateInfo) => (
              <span className="text-white font-semibold px-2 py-1 block h-full w-full text-center rounded-lg">
                {dateInfo.text}
              </span>
            )}
            eventBackgroundColor="transparent"
            eventBorderColor="transparent"
            eventTextColor="#ffffff"
            height="auto"
            dayMaxEventRows={true}
            slotLabelClassNames="text-purple-400 font-semibold"
            slotMinTime="06:00:00"
            slotMaxTime="22:00:00"
            contentHeight="auto"
            buttonText={{
              today: "Dnes",
              month: "Měsíc",
              week: "Týden",
              day: "Den",
            }}
            themeSystem="standard"
            timeZone="local"
            slotLabelFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
            viewDidMount={(viewInfo) => {
              const calendarGrid = document.querySelector(".fc-scrollgrid");
              if (calendarGrid) {
                calendarGrid.style.borderColor = "transparent";
                calendarGrid.style.borderImage =
                  "linear-gradient(to right, #8b5cf6, #7c3aed) 1";
              }
            }}
          />
        </div>
      </section>
    </motion.div>
  );
}
