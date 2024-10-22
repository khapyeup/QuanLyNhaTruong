import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer
const myEventsList = [{

    title: 'Rua tay',
    start: new Date('2024-10-13T15:20:41.762+00:00'),
    end: new Date('2024-10-13T16:20:41.762+00:00')
}]

const MyCalendar = () => {
    return (
        <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            defaultDate={new Date()}
            defaultView={Views.WEEK}
        />
    )

}

export default MyCalendar;