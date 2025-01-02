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
    return (
      <p className="text-gray-400 text-center mt-20 text-lg">Načítání...</p>
    );
  if (error)
    return (
      <p className="text-red-400 text-center mt-20 text-lg">
        Chyba: {error.message}
      </p>
    );

  const events = data?.data.map((course) => ({
    id: course.id,
    title:
      course.title.length > 30
        ? `${course.title.substring(0, 27)}...`
        : course.title,
    start: course.date,
    end: course.endDate || null,
    description: course.description,
    documentId: course.documentId,
  }));

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <section className="flex-1 p-8 lg:ml-64">
        {/* Header */}
        <div className="mb-8 text-center">
          <motion.h1
            className="text-4xl font-bold text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Kalendář kurzů
          </motion.h1>
          <p className="text-gray-400 mt-2">
            Prohlédněte si plánované kurzy na jednom místě.
          </p>
        </div>

        {/* Calendar */}
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
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
              <div className="bg-gray-700 text-white px-3 py-1 rounded-lg text-sm truncate shadow-md">
                {eventInfo.event.title}
              </div>
            )}
            dayHeaderClassNames="text-gray-300 font-semibold"
            eventBackgroundColor="transparent"
            eventBorderColor="transparent"
            eventTextColor="#f9fafb"
            height="auto"
            dayMaxEventRows={true}
            contentHeight="auto"
            buttonText={{
              today: "Dnes",
              month: "Měsíc",
              week: "Týden",
              day: "Den",
            }}
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
    </div>
  );
}
