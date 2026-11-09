export const toolGuides = {
  'workshop-break-even-calculator': {
    name: 'Workshop Break-Even Calculator',
    title: 'Free Workshop Break-Even Calculator for Classes | Cowlendar',
    description: 'Find how many workshop tickets you must sell to cover venue, instructor and material costs. Compare your break-even attendance with the seats you can sell.',
    short: 'Find how many tickets you need to sell to cover your workshop costs.',
    guideHeading: 'How many tickets cover the cost of one workshop?',
    guide: 'Add the costs you pay even if nobody books, such as room hire and the instructor’s fee. Subtract the materials used by one guest from one ticket’s price. Divide your fixed costs by that amount and round up to a whole seat. Compare that number with the room’s capacity before you publish tickets.',
    example: 'A ceramics studio pays $240 for the room and instructor. Each $45 ticket uses $5 of clay, leaving $40 toward the fixed costs. Six seats cover the session. With ten paid guests, the studio has $160 left after the costs it entered.',
    faq: [
      ['Where should I put the instructor’s pay?', 'A flat fee for running the class goes into fixed costs. If the instructor earns a fee for every student who attends, include that amount in the cost per participant.'],
      ['What if the break-even attendance exceeds my capacity?', 'At your current ticket price, even a sold-out session would leave a shortfall. Try a different ticket price, a less expensive room or a lower materials cost to see which change makes the class viable.']
    ],
    solution: '/shopify-class-booking-app',
    solutionLabel: 'Sell workshop seats on Shopify',
    related: ['recurring-class-schedule-generator', 'booking-deposit-calculator']
  },
  'booking-qr-code-generator': {
    name: 'Booking QR Code Generator',
    title: 'Free Booking QR Code Generator & Printable Sign | Cowlendar',
    description: 'Turn an appointment or reservation link into a scan-to-book QR code. Add your logo, download the PNG or print a booking sign for your shop window.',
    short: 'Turn your booking link into a sign customers can scan.',
    guideHeading: 'Give walk-in customers a direct route to your calendar',
    guide: 'Choose the exact page you want a customer to reach. A salon window might link to all services, while a sign on a kayak rack could open the kayak rental page. Add your shop name and logo, then try the finished sign with your phone from the distance a customer would stand.',
    example: 'A barber puts a sign inside the window so someone passing after closing can book a haircut for tomorrow. The code opens the haircut booking page directly, saving the customer a search through the store.',
    faq: [
      ['Can I add my logo without covering the QR code?', 'Yes. Upload your logo for the sign. It sits outside the QR pattern so the design keeps a clear margin. Leave that margin intact if you place the PNG in another layout.'],
      ['Will a printed code still work if my booking page moves?', 'The code keeps the URL you entered. Keep that address active or redirect it to your new booking page. If you cannot keep the old address, generate a fresh code before printing new signs.']
    ],
    solution: '/shopify-appointment-booking-app',
    solutionLabel: 'Take appointments on Shopify',
    related: ['booking-intake-form-builder', 'appointment-reminder-generator']
  },
  'rental-inventory-planner': {
    name: 'Rental Inventory Planner',
    title: 'Free Rental Inventory Planner & Overlap Checker | Cowlendar',
    description: 'Paste equipment reservations to calculate peak demand, spot overlapping rentals and see exactly when booked units exceed your available inventory.',
    short: 'See when simultaneous rentals exceed your stock.',
    guideHeading: 'Count the units out at the same time',
    guide: 'Plan one type of interchangeable equipment at a time. Enter the stock available for hire, then paste each reservation’s pickup time, return time and quantity in the same local time zone. Peak demand is the largest number of units out together. Subtract your stock from that peak to find the shortfall.',
    example: 'You have eight kayaks. Six go out from 10:00 to 13:00 and four more are booked from 12:00 to 15:00. You are two kayaks short from 12:00 until 13:00. Moving the second pickup to 13:00 clears the overlap if the first six are ready for immediate reuse.',
    faq: [
      ['How does the planner handle a pickup at the previous return time?', 'A unit becomes available at the end time you enter. If a kayak needs 30 minutes for inspection after a noon return, enter 12:30 as the end of that reservation.'],
      ['Can I plan bikes and helmets together?', 'Run a separate check for each stock pool. A reservation for three bikes and three helmets uses three units in each pool. Deduct damaged or unavailable items from the stock figure for that run.']
    ],
    solution: '/shopify-rental-booking-app',
    solutionLabel: 'Manage equipment rentals on Shopify',
    related: ['equipment-rental-quote-generator', 'booking-deposit-calculator']
  },
  'appointment-reminder-generator': {
    name: 'Appointment Reminder Generator',
    title: 'Free Appointment Reminder Templates for SMS & Email | Cowlendar',
    description: 'Generate appointment reminder texts and emails in English, French or Spanish. Customize the timing and service details, then copy the message for your customers.',
    short: 'Write a reminder your customer can act on in one tap.',
    guideHeading: 'What belongs in an appointment reminder?',
    guide: 'Start with the business name so the recipient recognizes the message. Include the service, date and local time. Give the customer one clear way to reach you or move the appointment. SMS works well for the essentials. The email can also give arrival instructions or explain what to bring.',
    example: 'For a photo shoot tomorrow, a useful text might read “Hi Mia, your portrait session at Pine Studio is tomorrow at 10:00. Need another time? Use the link in your confirmation.” In the email, you could also include the studio entrance and parking instructions.',
    faq: [
      ['Does the generator send the text or email?', 'It creates copy you can review and paste into your booking or messaging service. Your sending platform controls recipients and delivery time.'],
      ['Can I reuse one template for several customers?', 'Yes. Keep a master copy with placeholders for the customer, appointment and time. Match those placeholders to your sending platform’s merge fields, then send yourself a test with a real booking’s details.']
    ],
    solution: '/shopify-appointment-booking-app',
    solutionLabel: 'Set up appointment reminders on Shopify',
    related: ['add-to-calendar-link-generator', 'booking-intake-form-builder']
  },
  'add-to-calendar-link-generator': {
    name: 'Add to Calendar Link Generator',
    title: 'Free Add to Calendar Link Generator for Events | Cowlendar',
    description: 'Create an Add to Google Calendar link and an ICS file for Apple Calendar or Outlook. Set your event time zone and share the details in a booking confirmation.',
    short: 'Give customers a Google Calendar link or calendar file.',
    guideHeading: 'Put the right event time in a booking confirmation',
    guide: 'Enter the start and end times as they appear at the venue, then choose the venue’s time zone. Use a recognizable service name and include the full address or online meeting location. Copy the Google Calendar link into your confirmation or attach the downloaded ICS event for guests who use another calendar.',
    example: 'A Paris photo walk starts at 14:00 on January 15. Set the event to 14:00 in Europe/Paris. A guest whose calendar displays New York time sees 08:00 for that same start. The venue address tells them where to meet once they arrive in Paris.',
    faq: [
      ['How do I add the event to Apple Calendar or Outlook?', 'Download the ICS file and open or import it in your preferred calendar. A customer can do the same with an ICS attachment in a confirmation email.'],
      ['Will an imported event update when a booking is rescheduled?', 'An imported file is a snapshot. If the time or venue changes, send the customer the updated details and ask them to replace the old entry.']
    ],
    solution: '/shopify-event-booking-app',
    solutionLabel: 'Take event bookings on Shopify',
    related: ['appointment-reminder-generator', 'recurring-class-schedule-generator']
  },
  'booking-deposit-calculator': {
    name: 'Booking Deposit Calculator',
    title: 'Free Booking Deposit Calculator for Groups & Services | Cowlendar',
    description: 'Calculate an upfront booking deposit as a fixed amount or percentage. See the outstanding balance and each guest’s share for group reservations.',
    short: 'Split a booking into the deposit, balance and guest shares.',
    guideHeading: 'Work out what guests pay now and on arrival',
    guide: 'Use the price of the whole reservation, including everyone in the group. Choose the deposit type you advertise. A fixed group deposit collects the same amount up front across different booking totals. A percentage scales with the value of each reservation. Divide by the guest count to estimate an equal share.',
    example: 'Four guests book a private tour for $480 in total. A 25% deposit collects $120 up front and leaves $360 due later. With an even split, each guest contributes $30 now and $90 on the day.',
    faq: [
      ['How do I model a fixed deposit per guest?', 'Multiply the per-guest amount by the number attending, then enter that sum as the fixed group deposit. For six guests paying $15 up front each, enter a $90 deposit.'],
      ['Is an advance booking deposit the same as a refundable security deposit?', 'An advance payment reduces the price still due for a service. A refundable security deposit on rental equipment is held separately. Use the rental quote generator if your customer needs both figures on one document.']
    ],
    solution: '/shopify-tour-booking-app',
    solutionLabel: 'Take deposits for Shopify tour bookings',
    related: ['workshop-break-even-calculator', 'equipment-rental-quote-generator']
  },
  'salon-capacity-calculator': {
    name: 'Salon Capacity Calculator',
    title: 'Free Salon Capacity Calculator for Chairs & Stylists | Cowlendar',
    description: 'Estimate how many appointments fit in a salon day. Model stylists, chairs, wash basins and processing time to see which resource limits your schedule.',
    short: 'Plan a salon day around stylists, chairs and wash basins.',
    guideHeading: 'Find what holds up your next salon appointment',
    guide: 'Choose one service and model its stages across a working day. Separate the minutes that need a stylist’s hands from the time a client spends processing in a chair. Add wash-basin time where the service uses it. Run the same day twice, changing just one resource, to see whether it makes room for more completed clients.',
    example: 'Consider a colour service with 30 minutes of application and 30 minutes of processing. During processing, a second chair can give the stylist somewhere to start another client. Compare one chair with two while leaving the shift, stylist count and wash time unchanged.',
    faq: [
      ['Why can adding a stylist leave capacity unchanged?', 'Another stylist can start a client only when the service also has the physical resources it needs. If every chair is occupied during processing, an extra chair may change the schedule more than an extra pair of hands.'],
      ['Can I use the result to plan a mixed-service salon day?', 'Each run models clients receiving the same service. Run colour appointments and cuts separately to compare their demands. An actual mixed day also depends on your individual staff shifts, turnaround times and existing bookings.']
    ],
    solution: '/shopify-salon-booking-app',
    solutionLabel: 'Manage salon appointments on Shopify',
    related: ['booking-intake-form-builder', 'appointment-reminder-generator']
  },
  'equipment-rental-quote-generator': {
    name: 'Equipment Rental Quote Generator',
    title: 'Free Equipment Rental Quote Generator & PDF Template | Cowlendar',
    description: 'Build a rental quote with equipment quantities, daily rates, delivery and a separate refundable security deposit. Add your logo and print or save a PDF.',
    short: 'Create a branded quote with rental charges and security itemized.',
    guideHeading: 'Show a renter exactly what their quote covers',
    guide: 'Set the pickup and return dates, then add a line for each piece of equipment with its quantity and daily rate. Both dates count as billable days. Add delivery once for the order and show any refundable security amount separately. Check the figures and use your browser’s print dialog to save a PDF for the customer.',
    example: 'Two projectors at $35 per day, rented Friday through Sunday, cost $210 for three calendar days. With $20 delivery, the rental charges are $230 before tax. A $100 refundable security deposit brings the amount including security to $330.',
    faq: [
      ['How many days does a same-day rental count as?', 'A pickup and return on the same calendar date count as one billable day. Friday to Saturday counts as two. This template uses daily rates rather than hourly or rolling 24-hour billing.'],
      ['What should I do if the rental is taxable?', 'The quote shows amounts before tax. Add any applicable tax through your invoicing system before issuing a final invoice or collecting payment.']
    ],
    solution: '/shopify-rental-booking-app',
    solutionLabel: 'Offer equipment hire on Shopify',
    related: ['rental-inventory-planner', 'booking-deposit-calculator']
  },
  'booking-intake-form-builder': {
    name: 'Booking Intake Form Builder',
    title: 'Free Booking Intake Form Builder & Printable Template | Cowlendar',
    description: 'Create a client intake form from service-specific questions. Edit the wording, add custom questions and copy or print the form for your appointments.',
    short: 'Choose the questions you need answered before an appointment.',
    guideHeading: 'Ask for the details that change how you prepare',
    guide: 'Start with a service preset and keep the questions that affect staffing, equipment, timing or the welcome you give the client. Use the customer’s own vocabulary and ask one thing at a time. Copy the final questions into your booking form or print a sheet to complete together at check-in.',
    example: 'A portrait photographer might ask “How many people will be photographed?”, “Who needs an individual portrait?” and “Where will you use the finished photos?” Those three answers help the studio plan the backdrop, shot list and appointment length.',
    faq: [
      ['Can I use the questions in a Shopify booking form?', 'Yes. Copy the final wording into the question fields in your booking app, then set any required answers there. Preview the booking as a customer to check the order.'],
      ['Where do clients submit their answers?', 'The builder creates a reusable set of questions and a printable form. Collect digital responses through the booking form you publish, or let clients complete a paper copy at the appointment.']
    ],
    solution: '/shopify-appointment-booking-app',
    solutionLabel: 'Add intake questions to Shopify bookings',
    related: ['appointment-reminder-generator', 'booking-qr-code-generator']
  },
  'recurring-class-schedule-generator': {
    name: 'Recurring Class Schedule Generator',
    title: 'Free Recurring Class Schedule Generator with CSV & ICS | Cowlendar',
    description: 'Generate weekly class dates between two dates, skip closures and export to CSV or calendar. Plan a studio timetable using the venue’s local time zone.',
    short: 'Build a weekly class calendar and skip the dates you are closed.',
    guideHeading: 'Turn a weekly timetable into a list of class dates',
    guide: 'Set the first and final dates of the term, select the weekdays you teach and enter the local class time. List any closure dates before exporting. Use the CSV to review the term with instructors and the ICS calendar file to place the sessions on a calendar.',
    example: 'A studio runs Tuesday and Thursday classes from December 1 through December 17, 2026. That gives six dates. Skipping Thursday, December 10 leaves five classes on December 1, 3, 8, 15 and 17.',
    faq: [
      ['Which time zone should I choose for the class?', 'Choose the venue’s time zone. For example, a London studio teaching at 18:00 should use Europe/London so each date is tied to the local class time.'],
      ['How do I handle classes with different weekday start times?', 'Generate one schedule for each start time. For Tuesday mornings and Thursday evenings, select Tuesday in the first run and Thursday in the second, then export both schedules.']
    ],
    solution: '/shopify-fitness-booking-app',
    solutionLabel: 'Publish fitness class bookings on Shopify',
    related: ['workshop-break-even-calculator', 'add-to-calendar-link-generator']
  }
};
