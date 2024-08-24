import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { id } from "date-fns/locale"; // Import locale Indonesia

// Setup localizer dengan locale Indonesia
const locales = {
    id: id,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
});

type Event = {
    id: number;
    title: string;
    start: Date;
    end: Date;
};

const events: Event[] = [
    {
        id: 0,
        title: "Acara Seharian",
        start: new Date(2024, 7, 21, 12, 45, 0),
        end: new Date(2024, 7, 21, 15, 0, 0),
    },
    {
        id: 1,
        title: "Acara Panjang",
        start: new Date(2024, 7, 22),
        end: new Date(2024, 7, 23),
    },
];

const Schedule: React.FC = () => {
    return (
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            culture="id" // Setel culture ke Indonesia
        />
    );
};

export default Schedule;
