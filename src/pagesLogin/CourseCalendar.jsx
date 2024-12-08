import React from "react";
import useFetch from "../hooks/useFetch";
import Sidebar from "./Sidebar.jsx";
import { motion } from "framer-motion";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
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
      className="h-screen w-screen bg-gradient-to-br from-black to-gray-900 text-gray-100 flex flex-col lg:flex-row"
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
          <h1 className="text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-2xl">
            Kalendář kurzů
          </h1>
          <p className="text-md lg:text-xl text-gray-300 mt-4 max-w-3xl mx-auto">
            Prohlédněte si plánované kurzy s moderním a elegantním vzhledem.
          </p>
        </motion.div>

        {/* Calendar */}
        <div className="backdrop-blur-lg bg-opacity-30 bg-white/10 p-8 rounded-2xl shadow-2xl border border-gray-700">
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
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center text-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-2 py-1 shadow-md max-w-full overflow-hidden text-ellipsis whitespace-nowrap"
              >
                <span className="text-xs font-semibold">
                  {eventInfo.timeText}
                </span>
                <span className="ml-1 text-sm font-bold truncate">
                  {eventInfo.event.title}
                </span>
              </motion.div>
            )}
            dayHeaderClassNames="bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm"
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
            slotLabelClassNames="text-cyan-400 font-semibold"
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
          />
        </div>
      </section>
    </motion.div>
  );
}
