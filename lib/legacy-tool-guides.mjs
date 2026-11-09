export const legacyToolGuides = {
  'timezone-converter': {
    name: 'Time Zone Converter',
    title: 'Free Time Zone Converter & International Meeting Planner | Cowlendar',
    description: 'Compare local times across cities on a specific date. Check daylight-saving changes, share a meeting time and download an ICS calendar event.',
    short: 'See the same meeting in each customer’s local time, including the day and date when it crosses midnight.',
    guideHeading: 'Schedule one appointment across several local calendars',
    guide: 'Choose the city whose calendar defines the appointment, then enter its date and start time. Add the cities where your guests will join. Read the date beside each clock as well as the hour. For a recurring appointment, check a date on either side of the next clock change because two countries can change their clocks in different weeks.',
    example: 'On March 15, 2026, 09:00 in New York is 14:00 in Paris. Two weeks later, on March 29, the same 09:00 New York appointment is 15:00 in Paris. The dates matter because the two regions move to daylight saving on different Sundays.',
    faq: [
      ['Why should I choose a city instead of subtracting a fixed number of hours?', 'A city’s offset depends on the date and its local clock rules. Choosing the city lets the converter apply those rules for the actual appointment.'],
      ['Can the same meeting fall on two different dates?', 'Yes. On January 15, 2027, a 17:00 appointment in Los Angeles begins at 10:00 on January 16 in Tokyo. Include the date as well as the time when sending the confirmation.'],
      ['What happens when clocks move back and the local time occurs twice?', 'The converter lets you choose which occurrence you mean when the reference city repeats a time. Check the resulting UTC offset and the other cities before copying the meeting.'],
      ['Why does a local time sometimes produce no result?', 'When clocks jump forward, some local times never occur on that date. Move the appointment to a valid time and compare the cities again.'],
      ['Can I share the exact cities and time I chose?', 'Use the share-link option. The URL carries the cities and selected meeting details so another person can open the same comparison.'],
      ['How do I add the meeting to my own calendar?', 'Set the meeting duration and download the calendar file. Open the ICS file in your calendar app and check the displayed date and start time before saving.']
    ],
    solution: '/shopify-appointment-booking-app',
    solutionLabel: 'Book appointments across time zones on Shopify',
    related: ['team-working-hours-planner', 'add-to-calendar-link-generator', 'recurring-class-schedule-generator']
  },
  'service-price-calculator': {
    name: 'Service Price Calculator',
    title: 'Free Service Pricing Calculator for Labor, Costs & Margin | Cowlendar',
    description: 'Calculate a service price from billable hours, hourly labor cost, materials and your target gross margin. Compare pricing examples for bookable appointments.',
    short: 'Find a selling price that covers the time and supplies for one service and leaves your chosen margin.',
    guideHeading: 'How do you price a service using a target gross margin?',
    guide: 'Add the cost of the labor used for one appointment to its other direct costs. Express the target margin as a decimal and divide total cost by one minus that margin. Use the actual time the job consumes, including preparation you have chosen to recover through this price. Compare the result with what it costs to deliver the same service on a busier or longer appointment.',
    example: 'A 90-minute service uses 1.5 hours of labor at $30 per hour and $15 in supplies. The total direct cost is $60. To retain a 40% gross margin, divide $60 by 0.60 for a $100 selling price. The $40 left over is 40% of the sale.',
    faq: [
      ['How is a margin different from a markup?', 'A 40% markup on a $60 cost gives a price of $84. A 40% gross margin means the cost uses 60% of the sale, giving a price of $100. Choose the percentage according to the business target you mean.'],
      ['Do I enter what I charge customers as my hourly labor cost?', 'Enter what an hour of the service costs you to provide. For an owner-operated business, choose the hourly amount you need to allow for your own work. The result is a suggested selling price for the full service.'],
      ['Where do I put preparation and cleanup time?', 'Add it to the job’s duration if that labor is part of delivering the service. A 60-minute session plus 15 minutes of setup and 15 minutes of cleanup uses 1.5 hours.'],
      ['What counts as another direct cost?', 'Include costs attributable to the job, such as consumable materials or a room hired for that one appointment. Allocate a shared cost consistently if you decide to include a portion.'],
      ['Does the estimate include sales tax, card fees or monthly rent?', 'The formula uses the costs and margin you enter. Review applicable taxes, payment fees and any overhead you still need to recover before publishing the final price.'],
      ['How do I use the result for a mobile appointment?', 'Price the underlying service first. Work out the journey in the travel fee calculator and show that amount separately if your business charges for visits outside its usual area.']
    ],
    solution: '/shopify-appointment-booking-app',
    solutionLabel: 'Sell priced services as Shopify appointments',
    related: ['mobile-service-travel-fee-calculator', 'workshop-break-even-calculator']
  },
  'no-show-calculator': {
    name: 'No-Show Cost Calculator',
    title: 'Free Appointment No-Show Cost & Revenue Loss Calculator | Cowlendar',
    description: 'Estimate the revenue and appointment hours exposed to no-shows. Factor in refilled slots and compare your current missed-appointment rate with a target.',
    short: 'Translate missed appointments into unfilled hours and revenue at risk, after accounting for the slots you refill.',
    guideHeading: 'What does an unfilled appointment cost your business?',
    guide: 'Start with booked appointments for a representative month and calculate what share customers missed. Remove the share of those spaces you managed to refill. Multiply the unfilled spaces by average appointment value for an estimate of exposed revenue, and by average duration for unfilled hours. A lower target no-show rate gives you a second scenario under the same refill assumptions.',
    example: 'A studio schedules 120 monthly appointments at $75 each and records a 10% no-show rate. Twelve visits are missed. If three of those spaces are refilled, nine go unfilled, leaving $675 in appointment revenue at risk. With 45-minute visits, that is 6 hours and 45 minutes of unused appointment time.',
    faq: [
      ['How do I calculate the no-show rate from my booking records?', 'Divide missed appointments by scheduled appointments for the same period, then multiply by 100. Eight missed visits out of 160 booked gives a 5% rate. Use the same definition in later comparisons.'],
      ['Should I count a cancellation that another customer took?', 'Keep a consistent definition of what counts as missed. If you include a released appointment and another customer fills the space, reflect it in the refill share so the model does not treat it as empty.'],
      ['Why can the expected number of empty appointments include a fraction?', 'Rates are applied to a typical month. A result of 4.5 unfilled appointments represents an average across months, even though each individual appointment is a whole booking.'],
      ['Is revenue at risk the same as lost profit?', 'Revenue at risk values the unfilled appointment at its average selling price. A retained deposit, an avoided material cost or paid work completed in the time changes the financial effect on your business.'],
      ['Can I compare reminders with a waitlist strategy?', 'Use a lower target missed-appointment rate to explore a reminder scenario. Change the refill percentage in a separate run to see what filling more openings could recover. Keep a note of the assumptions for each run.'],
      ['How should a seasonal business read the annual figure?', 'The annual figure extends the modelled month across 12 months. A ski school or summer tour operator can estimate peak and quiet months separately, then combine the periods that match its actual season.']
    ],
    solution: '/shopify-salon-booking-app',
    solutionLabel: 'Manage salon appointments and reminders on Shopify',
    related: ['appointment-reminder-generator', 'booking-waitlist-matcher']
  },
  'time-slot-generator': {
    name: 'Appointment Time Slot Generator',
    title: 'Free Appointment Time Slot Generator with Breaks & CSV | Cowlendar',
    description: 'Generate bookable appointment slots from opening hours, service duration, buffers and a break. Set capacity per slot and download the local schedule as CSV.',
    short: 'Turn opening hours into appointment starts, with room between services and a real break in the middle.',
    guideHeading: 'Which appointment start times fit before closing?',
    guide: 'Enter the first possible start and the latest time a service may finish. Set the minutes customers spend in an appointment and the buffer needed between bookable starts. If the business closes for a break, the generator builds the morning and afternoon independently. Give each start a capacity of one for a private appointment or the number of seats available for a group session.',
    example: 'A studio runs 45-minute appointments with 15 minutes between starts from 09:00 to 12:00. Customers can book 09:00, 10:00 or 11:00. At a capacity of three people per start, that morning offers nine bookable places.',
    faq: [
      ['Does buffer time change the length shown to the customer?', 'The service duration determines the appointment’s start and finish. The buffer adds space before another appointment may begin, so a 30-minute service with a ten-minute buffer starts again 40 minutes after the previous start.'],
      ['Can a slot extend into the lunch break?', 'A service must finish within its working period. If it would run into the break, that start is skipped. The first afternoon slot begins when the break ends.'],
      ['Why is there time left over at the end of the day?', 'A remaining interval shorter than the full service cannot fit another customer. Moving the opening time, reducing the buffer or offering a separately scheduled shorter service can change the result.'],
      ['What does capacity per slot mean for a group class?', 'Capacity is the number of bookable places sharing the same start and finish. Four starts with six seats each offer 24 places. Use one place for a private appointment.'],
      ['Does the CSV contain calendar dates and time zones?', 'It contains local starts, ends and capacity for a working day. Use the recurring class schedule generator when you need dated sessions and a time zone for calendar import.'],
      ['How do I account for several different staff schedules?', 'Generate each distinct working period separately. If staff also share limited rooms, chairs or equipment, check those constraints before offering the combined appointments.']
    ],
    solution: '/shopify-appointment-booking-app',
    solutionLabel: 'Publish appointment availability on Shopify',
    related: ['salon-capacity-calculator', 'recurring-class-schedule-generator']
  }
};
