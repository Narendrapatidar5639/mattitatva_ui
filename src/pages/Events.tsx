import { ChevronRight, ChevronLeft } from "lucide-react";
import { CONTAINER } from "../constants/theme";
import { EVENTS } from "../data/appData";

const CALENDAR_DAYS = [
  "", "", "", 1, 2, 3, 4,
  5, 6, 7, 8, 9, 10, 11,
  12, 13, 14, 15, 16, 17, 18,
  19, 20, 21, 22, 23, 24, 25,
  26, 27, 28, 29, 30, 31,
];

export function EventsCalendarSection({ embedded = false }: { embedded?: boolean }) {
  // Taking max 4 events to expand completely sideways across the whole screen monitor
  const displayEvents = EVENTS.slice(0, 4).map(ev => ({
    id: ev.id,
    tag: ev.date.split(" ").slice(0, 2).join(" "),
    title: ev.title,
    desc: ev.desc,
    image: ev.image,
  }));

  return (
    <div
      className={`${embedded ? CONTAINER : "w-full px-3 sm:px-5 lg:px-8 xl:px-12"} py-10 relative overflow-hidden select-none bg-transparent`}
      aria-labelledby="home-events-calendar-heading"
    >
      {/* Heading */}
      <div className="text-center mb-10 relative z-10">
        <h2
          id="home-events-calendar-heading"
          className="text-3xl font-bold tracking-normal text-gray-900"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Upcoming Events
        </h2>
      </div>

      {/* Unbound Grid Structure - 100% full screen stretch */}
      <div className="w-full relative z-10">
        <div className="flex flex-col xl:flex-row gap-4 items-stretch w-full">
          
          {/* Left Block: Fixed Compact Calendar */}
          <div className="w-full xl:w-[280px] flex-shrink-0 bg-white rounded-2xl p-4 border border-gray-100 shadow-xs mx-auto xl:mx-0 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 px-1">
                <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Previous month">
                  <ChevronLeft size={14} />
                </button>
                <span className="font-bold text-xs text-gray-800 tracking-wide">Oct 15th, 2025</span>
                <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Next month">
                  <ChevronRight size={14} />
                </button>
              </div>

              <div className="grid grid-cols-7 text-center text-[10px] font-semibold text-gray-400 mb-2 tracking-wider">
                <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
              </div>

              <div className="grid grid-cols-7 gap-y-2 text-center text-[11px] font-medium text-gray-700">
                {CALENDAR_DAYS.map((day, idx) => {
                  const isSelected = day === 16;
                  return (
                    <div key={idx} className="h-6 flex items-center justify-center">
                      {day !== "" && (
                        <span
                          className={`w-6 h-6 flex items-center justify-center rounded-full transition-all cursor-pointer
                            ${isSelected ? "bg-amber-800 text-white font-bold shadow-sm" : "hover:bg-gray-50"}`}
                        >
                          {day}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Block: Fully Stretched Edge-to-Edge Grid containing Large Card Images */}
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {displayEvents.map(ev => (
              <div
                key={ev.id}
                className="bg-white rounded-xl border border-gray-100 shadow-2xs flex flex-col overflow-hidden group hover:shadow-xs transition-all duration-200 w-full"
              >
                {/* Fixed Large Image Top View Covering 100% space inside the layout */}
                <div className="w-full h-32 md:h-36 overflow-hidden bg-gray-50 flex-shrink-0">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Typography and interactive information area */}
                <div className="p-3 flex flex-col justify-between flex-1 gap-3">
                  <div>
                    <span className="block text-[10px] font-bold text-amber-800 uppercase tracking-wider mb-0.5">
                      {ev.tag}
                    </span>
                    <h3 className="font-bold text-xs sm:text-sm text-gray-800 mb-1 line-clamp-1 group-hover:text-amber-900 transition-colors">
                      {ev.title}
                    </h3>
                    <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                      {ev.desc}
                    </p>
                  </div>

                  <div className="w-full">
                    <button
                      type="button"
                      className="w-full py-2 px-3 text-[10px] font-bold text-white bg-amber-800 hover:bg-amber-900 rounded-md transition-colors text-center"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}