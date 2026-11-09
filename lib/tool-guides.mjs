export const toolGuides = {
  'workshop-break-even-calculator': {
    name: 'Workshop Break-Even Calculator',
    title: 'Workshop Break-Even Calculator: Tickets & Capacity | Cowlendar',
    description: 'Find how many workshop tickets you must sell to cover venue, instructor and material costs. Compare your break-even attendance with the seats you can sell.',
    short: 'See how many seats you need to sell, how much each ticket contributes and what a sold-out workshop would earn after the costs you enter.',
    guideHeading: 'How many tickets cover the cost of one workshop?',
    guide: 'Add the costs you pay even if nobody books, such as room hire and the instructor’s fee. Subtract the materials used by one guest from one ticket’s price. Divide your fixed costs by that amount and round up to a whole seat. Compare that number with the room’s capacity before you publish tickets. Keep the figures on a per-session basis. If six workshops share one studio rental, allocate just one session’s share of the rent here.',
    example: 'A ceramics studio pays $240 for the room and instructor. Each $45 ticket uses $5 of clay, leaving $40 toward the fixed costs. Six seats cover the session. With ten paid guests, the studio has $160 left after the costs it entered.',
    faq: [
      ['Where should I put the instructor’s pay?', 'A flat fee for running the class goes into fixed costs. If the instructor earns a fee for every student who attends, include that amount in the cost per participant.'],
      ['What if the break-even attendance exceeds my capacity?', 'At your current ticket price, even a sold-out session would leave a shortfall. Try a different ticket price, a less expensive room or a lower materials cost to see which change makes the class viable.'],
      ['How do complimentary tickets affect my break-even point?', 'Subtract complimentary seats from the capacity available for sale. If those guests use supplies, add their materials to fixed costs for that session.'],
      ['What if I offer early-bird and standard tickets?', 'Use a weighted average price. Selling four $30 early-bird tickets and six $50 standard tickets gives an average of $42. Try a second run with a higher share of discounted seats.'],
      ['Why does the calculator round the ticket target up?', 'A target of 6.2 tickets requires seven paying guests. At six, the contribution still falls short of the fixed costs.'],
      ['How do I budget for a specific profit?', 'Add the desired surplus to your fixed-cost target for a separate scenario. If fixed costs are $240 and you want $120 left over, use $360 as the amount to cover.']
    ],
    solution: '/shopify-class-booking-app',
    solutionLabel: 'Sell workshop seats on Shopify',
    related: ['recurring-class-schedule-generator', 'booking-deposit-calculator']
  },
  'booking-qr-code-generator': {
    name: 'Booking QR Code Generator',
    title: 'Free Scan-to-Book QR Code Generator & Printable Sign | Cowlendar',
    description: 'Turn an appointment or reservation link into a scan-to-book QR code. Add your logo, download the PNG or print a booking sign for your shop window.',
    short: 'Create a scannable appointment sign for your window, front desk or rental counter. Download the QR code as PNG or print the full sign with your logo.',
    guideHeading: 'Give walk-in customers a direct route to your calendar',
    guide: 'Choose the exact page you want a customer to reach. A salon window might link to all services, while a sign on a kayak rack could open the kayak rental page. Add your shop name and logo, then try the finished sign with your phone from the distance a customer would stand. Use different destination links for a window sign and for a sign beside a specific activity when those visitors need different booking options.',
    example: 'A barber puts a sign inside the window so someone passing after closing can book a haircut for tomorrow. The code opens the haircut booking page directly, saving the customer a search through the store.',
    faq: [
      ['Can I add my logo without covering the QR code?', 'Yes. Upload your logo for the sign. It sits outside the QR pattern so the design keeps a clear margin. Leave that margin intact if you place the PNG in another layout.'],
      ['Will a printed code still work if my booking page moves?', 'The code keeps the URL you entered. Keep that address active or redirect it to your new booking page. If you cannot keep the old address, generate a fresh code before printing new signs.'],
      ['Which file should I give my printer?', 'Download the PNG to place the code in a layout you already have. Use Print / save PDF to keep the headline, business name and optional logo together as a complete sign.'],
      ['Can I link straight to a particular Shopify service?', 'Open the service as a customer and copy that public URL. Scan the result from a phone where you are signed out to make sure guests land on the intended service.'],
      ['Does the QR code itself expire?', 'A static code continues to represent the same URL. Its usefulness depends on whether that destination remains available to customers.'],
      ['How can I tell whether a window sign brings bookings?', 'Use a booking URL with your own campaign parameters before generating the code. Your existing analytics can then attribute visits if it records those parameters.']
    ],
    solution: '/shopify-appointment-booking-app',
    solutionLabel: 'Take appointments on Shopify',
    related: ['booking-intake-form-builder', 'appointment-reminder-generator']
  },
  'rental-inventory-planner': {
    name: 'Rental Inventory Planner',
    title: 'Free Equipment Rental Inventory & Overlap Planner | Cowlendar',
    description: 'Paste equipment reservations to calculate peak demand, spot overlapping rentals and see exactly when booked units exceed your available inventory.',
    short: 'Compare bookings against your available rental stock. See when demand peaks, which pickup overlaps a return and how many extra units you need.',
    guideHeading: 'Count the units out at the same time',
    guide: 'Plan one type of interchangeable equipment at a time. Enter the stock available for hire, then paste each reservation’s pickup time, return time and quantity in the same local time zone. Peak demand is the largest number of units out together. Subtract your stock from that peak to find the shortfall. When a shortfall appears, read the start and end of that interval. A one-hour overlap can often be resolved by moving one pickup even when both customers rent for a full day.',
    example: 'You have eight kayaks. Six go out from 10:00 to 13:00 and four more are booked from 12:00 to 15:00. You are two kayaks short from 12:00 until 13:00. Moving the second pickup to 13:00 clears the overlap if the first six are ready for immediate reuse.',
    faq: [
      ['How does the planner handle a pickup at the previous return time?', 'A unit becomes available at the end time you enter. If a kayak needs 30 minutes for inspection after a noon return, enter 12:30 as the end of that reservation.'],
      ['Can I plan bikes and helmets together?', 'Run a separate check for each stock pool. A reservation for three bikes and three helmets uses three units in each pool. Deduct damaged or unavailable items from the stock figure for that run.'],
      ['What three values do I need for each reservation?', 'Enter pickup, return and quantity in that order. Include a date and time for both endpoints so a rental extending overnight occupies stock on the correct days.'],
      ['Should I include every item I own in available stock?', 'Use the quantity you can actually rent for the period. Remove units awaiting repairs, held at another branch or reserved for staff.'],
      ['Can a busy day still have enough inventory?', 'Yes. Ten morning rentals and ten afternoon rentals can use the same ten units when returns, checks and new pickups leave enough turnaround time. The peak depends on concurrent rentals.'],
      ['What does the forecast CSV contain?', 'It lists occupied intervals with the units out and the number short during each interval. Share it with the person allocating equipment at pickup.']
    ],
    solution: '/shopify-rental-booking-app',
    solutionLabel: 'Manage equipment rentals on Shopify',
    related: ['equipment-rental-quote-generator', 'booking-deposit-calculator']
  },
  'appointment-reminder-generator': {
    name: 'Appointment Reminder Generator',
    title: 'Free Appointment Reminder Generator for SMS & Email | Cowlendar',
    description: 'Generate appointment reminder texts and emails in English, French or Spanish. Customize the timing and service details, then copy the message for your customers.',
    short: 'Write a day-before or two-hour appointment reminder in English, French or Spanish. Copy the SMS and email with the service, local time and management link.',
    guideHeading: 'What belongs in an appointment reminder?',
    guide: 'Start with the business name so the recipient recognizes the message. Include the service, date and local time. Give the customer one clear way to reach you or move the appointment. SMS works well for the essentials. The email can also give arrival instructions or explain what to bring. For in-person appointments, include the studio address in your final email if customers can easily confuse branches. For remote sessions, check that the time zone and meeting link belong to the same booking.',
    example: 'For a photo shoot tomorrow, a useful text might read “Hi Mia, your portrait session at Pine Studio is tomorrow at 10:00. Need another time? Use the link in your confirmation.” In the email, you could also include the studio entrance and parking instructions.',
    faq: [
      ['Does the generator send the text or email?', 'It creates copy you can review and paste into your booking or messaging service. Your sending platform controls recipients and delivery time.'],
      ['Can I reuse one template for several customers?', 'Yes. Keep a master copy with placeholders for the customer, appointment and time. Match those placeholders to your sending platform’s merge fields, then send yourself a test with a real booking’s details.'],
      ['How should a two-hour reminder differ from a day-before reminder?', 'A day-before email gives the customer time to reschedule or prepare. A two-hour text can be shorter, with the service, time and a link for last-minute changes.'],
      ['Which language should I select for the message?', 'Choose English, French or Spanish to match the customer’s preferred language. The business name and any date or time you enter are copied as written.'],
      ['Does the character count predict SMS charges?', 'It counts characters in the draft before names and links are substituted. Your messaging platform determines encoding, segment count and cost for the actual message.'],
      ['What should the booking management link open?', 'Use the customer’s booking details or rescheduling page. Open a test link as a customer and check it shows the intended appointment.']
    ],
    solution: '/shopify-appointment-booking-app',
    solutionLabel: 'Set up appointment reminders on Shopify',
    related: ['add-to-calendar-link-generator', 'booking-intake-form-builder']
  },
  'add-to-calendar-link-generator': {
    name: 'Add to Calendar Link Generator',
    title: 'Add to Calendar Link Generator for Google, Apple & Outlook | Cowlendar',
    description: 'Create an Add to Google Calendar link and an ICS file for Apple Calendar or Outlook. Set your event time zone and share the details in a booking confirmation.',
    short: 'Create a Google Calendar event link and an ICS file for Apple Calendar or Outlook. Include the venue time zone, address and instructions in the same invitation.',
    guideHeading: 'Put the right event time in a booking confirmation',
    guide: 'Enter the start and end times as they appear at the venue, then choose the venue’s time zone. Use a recognizable service name and include the full address or online meeting location. Copy the Google Calendar link into your confirmation or attach the downloaded ICS event for guests who use another calendar. For a video appointment, put the joining link in the location or notes. Before sending the confirmation, open an exported event and check both its start time and its displayed location.',
    example: 'A Paris photo walk starts at 14:00 on January 15. Set the event to 14:00 in Europe/Paris. A guest whose calendar displays New York time sees 08:00 for that same start. The venue address tells them where to meet once they arrive in Paris.',
    faq: [
      ['How do I add the event to Apple Calendar or Outlook?', 'Download the ICS file and open or import it in your preferred calendar. A customer can do the same with an ICS attachment in a confirmation email.'],
      ['Will an imported event update when a booking is rescheduled?', 'An imported file is a snapshot. If the time or venue changes, send the customer the updated details and ask them to replace the old entry.'],
      ['Which time zone should an online host enter?', 'Choose the zone in which you entered the start and end times. A host scheduling 11:00 in London should enter 11:00 and Europe/London, even if their guest is in New York.'],
      ['What happens if my time falls in a daylight-saving clock change?', 'A local time may occur twice or disappear entirely. The generator asks you to choose an unambiguous time, so the invitation points to one definite instant.'],
      ['Can I put the Google Calendar link behind a button?', 'Yes. Copy the generated Google Calendar URL and use it as the destination for an “Add to Google Calendar” button in your confirmation email or booking page.'],
      ['Does downloading an event notify the guest?', 'The file contains the event details. Send the link or attachment through your usual confirmation channel so the guest can add it.']
    ],
    solution: '/shopify-event-booking-app',
    solutionLabel: 'Take event bookings on Shopify',
    related: ['appointment-reminder-generator', 'recurring-class-schedule-generator']
  },
  'booking-deposit-calculator': {
    name: 'Booking Deposit Calculator',
    title: 'Free Booking Deposit Calculator: Upfront Payment & Balance | Cowlendar',
    description: 'Calculate an upfront booking deposit as a fixed amount or percentage. See the outstanding balance and each guest’s share for group reservations.',
    short: 'Compare a fixed booking deposit with a percentage of the reservation. See the group total, each guest’s share and the amount still due on arrival.',
    guideHeading: 'Work out what guests pay now and on arrival',
    guide: 'Use the price of the whole reservation, including everyone in the group. Choose the deposit type you advertise. A fixed group deposit collects the same amount up front across different booking totals. A percentage scales with the value of each reservation. Divide by the guest count to estimate an equal share. For a private tour with a minimum group charge, start with the actual quoted total. Dividing the advertised per-person price across the guests can understate what is due when the minimum applies.',
    example: 'Four guests book a private tour for $480 in total. A 25% deposit collects $120 up front and leaves $360 due later. With an even split, each guest contributes $30 now and $90 on the day.',
    faq: [
      ['How do I model a fixed deposit per guest?', 'Multiply the per-guest amount by the number attending, then enter that sum as the fixed group deposit. For six guests paying $15 up front each, enter a $90 deposit.'],
      ['Is an advance booking deposit the same as a refundable security deposit?', 'An advance payment reduces the price still due for a service. A refundable security deposit on rental equipment is held separately. Use the rental quote generator if your customer needs both figures on one document.'],
      ['How do I calculate a 30% booking deposit?', 'Multiply the booking total by 0.30. For a $250 appointment that gives $75 due now and $175 remaining. Enter 30 in the percentage field to compare it with a fixed deposit.'],
      ['What happens when the deposit cannot split evenly between guests?', 'The split distributes the remaining cents across the group. A $10 deposit shared by three people is two payments of $3.33 and one of $3.34.'],
      ['How can I compare deposits for small and large groups?', 'Run the same percentage and fixed amount against two different booking totals. A $50 fixed deposit covers half of a $100 booking and one tenth of a $500 booking.'],
      ['Does the calculator collect payment or update my checkout?', 'It gives you figures you can copy into a quote or booking confirmation. Configure the chosen payment amount and collection schedule in your booking or checkout setup.']
    ],
    solution: '/shopify-tour-booking-app',
    solutionLabel: 'Take deposits for Shopify tour bookings',
    related: ['workshop-break-even-calculator', 'equipment-rental-quote-generator']
  },
  'salon-capacity-calculator': {
    name: 'Salon Capacity Calculator',
    title: 'Free Salon Capacity Calculator for Stylists, Chairs & Basins | Cowlendar',
    description: 'Estimate how many appointments fit in a salon day. Model stylists, chairs, wash basins and processing time to see which resource limits your schedule.',
    short: 'Plan a colour-service day around application, processing and rinse times. See a feasible timetable and compare the effect of an extra stylist, chair or basin.',
    guideHeading: 'Find what holds up your next salon appointment',
    guide: 'Choose one service and model its stages across a working day. Separate the minutes that need a stylist’s hands from the time a client spends processing in a chair. Add wash-basin time where the service uses it. Run the same day twice, changing just one resource, to see whether it makes room for more completed clients. If the salon closes for lunch, run the morning and afternoon as separate working periods. That prevents a colour application before lunch from reserving a stylist for a rinse during the closure.',
    example: 'Consider a colour service with 30 minutes of application and 30 minutes of processing. During processing, a second chair can give the stylist somewhere to start another client. Compare one chair with two while leaving the shift, stylist count and wash time unchanged.',
    faq: [
      ['Why can adding a stylist leave capacity unchanged?', 'Another stylist can start a client only when the service also has the physical resources it needs. If every chair is occupied during processing, an extra chair may change the schedule more than an extra pair of hands.'],
      ['Can I use the result to plan a mixed-service salon day?', 'Each run models clients receiving the same service. Run colour appointments and cuts separately to compare their demands. An actual mixed day also depends on your individual staff shifts, turnaround times and existing bookings.'],
      ['Can a stylist serve someone else during colour processing?', 'Yes. The model frees the stylist during processing while the first client keeps a chair. The next service can start when its own chair and later rinse can fit.'],
      ['How are wash basins counted?', 'A basin and a stylist are both needed during the assisted rinse. If a service uses no basin, set the rinse time to zero.'],
      ['How do I allow for cleaning and breaks?', 'Include hands-on cleaning time in the minutes you assign to a stylist, or run shorter working periods around breaks. Compare the forecast with a recent shift to check your assumptions.'],
      ['Can I share the list of appointment starts with my team?', 'Download the full day as a CSV. It includes the start, processing, rinse and finish times with the number of clients following that schedule.']
    ],
    solution: '/shopify-salon-booking-app',
    solutionLabel: 'Manage salon appointments on Shopify',
    related: ['booking-intake-form-builder', 'appointment-reminder-generator']
  },
  'equipment-rental-quote-generator': {
    name: 'Equipment Rental Quote Generator',
    title: 'Free Equipment Rental Quote Generator & Printable PDF | Cowlendar',
    description: 'Build a rental quote with equipment quantities, daily rates, delivery and a separate refundable security deposit. Add your logo and print or save a PDF.',
    short: 'Make a rental quotation with daily rates, quantities, delivery and a separate refundable security deposit. Print the itemized estimate with your company logo.',
    guideHeading: 'Show a renter exactly what their quote covers',
    guide: 'Set the pickup and return dates, then add a line for each piece of equipment with its quantity and daily rate. Both dates count as billable days. Add delivery once for the order and show any refundable security amount separately. Check the figures and use your browser’s print dialog to save a PDF for the customer. Give each quote a reference before sending it so a customer can identify the right version when dates, quantities or delivery arrangements change.',
    example: 'Two projectors at $35 per day, rented Friday through Sunday, cost $210 for three calendar days. With $20 delivery, the rental charges are $230 before tax. A $100 refundable security deposit brings the amount including security to $330.',
    faq: [
      ['How many days does a same-day rental count as?', 'A pickup and return on the same calendar date count as one billable day. Friday to Saturday counts as two. This template uses daily rates rather than hourly or rolling 24-hour billing.'],
      ['What should I do if the rental is taxable?', 'The quote shows amounts before tax. Add any applicable tax through your invoicing system before issuing a final invoice or collecting payment.'],
      ['How do I quote several units of the same item?', 'Use one line for the item and enter its quantity and daily rate. The line total multiplies the quantity by the rate and the number of billable days.'],
      ['Where should I include delivery and collection?', 'Enter the total delivery charge once for the order. If your business charges for both trips, combine them in that amount and explain the arrangement to the customer.'],
      ['Can I use the same file as a damage inspection report?', 'The quote records the proposed price and deposit. Use an equipment condition report at collection and return to record which unit was handed over and its physical condition.'],
      ['How do I send the customer a branded PDF?', 'Enter the business and customer details, add your logo and choose Print / save PDF. Review the dates and totals in the print preview before saving.']
    ],
    solution: '/shopify-rental-booking-app',
    solutionLabel: 'Offer equipment hire on Shopify',
    related: ['rental-inventory-planner', 'booking-deposit-calculator']
  },
  'booking-intake-form-builder': {
    name: 'Booking Intake Form Builder',
    title: 'Free Client Intake Form Builder for Booking & Appointments | Cowlendar',
    description: 'Create a client intake form from service-specific questions. Edit the wording, add custom questions and copy or print the form for your appointments.',
    short: 'Create a printable booking intake form for photography, salons, coaching or tours. Choose a preset, edit the questions and copy them into your booking app.',
    guideHeading: 'Ask for the details that change how you prepare',
    guide: 'Start with a service preset and keep the questions that affect staffing, equipment, timing or the welcome you give the client. Use the customer’s own vocabulary and ask one thing at a time. Copy the final questions into your booking form or print a sheet to complete together at check-in. For a group booking, decide which answers the lead booker can give for everyone and which belong to each participant. A tour guide can ask for the total party size once and collect individual equipment sizes separately.',
    example: 'A portrait photographer might ask “How many people will be photographed?”, “Who needs an individual portrait?” and “Where will you use the finished photos?” Those three answers help the studio plan the backdrop, shot list and appointment length.',
    faq: [
      ['Can I use the questions in a Shopify booking form?', 'Yes. Copy the final wording into the question fields in your booking app, then set any required answers there. Preview the booking as a customer to check the order.'],
      ['Where do clients submit their answers?', 'The builder creates a reusable set of questions and a printable form. Collect digital responses through the booking form you publish, or let clients complete a paper copy at the appointment.'],
      ['Which business types have starter questions?', 'The builder includes starting questions for photography, salons, coaching, and tours and activities. Edit the wording to match the service your customer actually booked.'],
      ['Can I add my own question or change the order?', 'Put each question on its own line, then move the lines into your preferred order. The printed form and copied question list follow that sequence.'],
      ['How many intake questions should I require?', 'Require the answers that change whether or how you can deliver the service. For a portrait session, group size may change the setup while a preference for black-and-white photos can wait.'],
      ['Can I give someone a paper form at check-in?', 'Choose Print / save PDF to produce a sheet with a space for each answer, the customer’s name and the appointment date.']
    ],
    solution: '/shopify-appointment-booking-app',
    solutionLabel: 'Add intake questions to Shopify bookings',
    related: ['appointment-reminder-generator', 'booking-qr-code-generator']
  },
  'recurring-class-schedule-generator': {
    name: 'Recurring Class Schedule Generator',
    title: 'Free Weekly Class Schedule Generator with CSV & ICS | Cowlendar',
    description: 'Generate weekly class dates between two dates, skip closures and export to CSV or calendar. Plan a studio timetable using the venue’s local time zone.',
    short: 'Build a recurring class schedule between two dates. Choose teaching days, skip holidays and export every session with its venue time zone to CSV or calendar.',
    guideHeading: 'Turn a weekly timetable into a list of class dates',
    guide: 'Set the first and final dates of the term, select the weekdays you teach and enter the local class time. List any closure dates before exporting. Use the CSV to review the term with instructors and the ICS calendar file to place the sessions on a calendar. Use the session count to estimate teaching hours for the term. Eight 75-minute classes require ten contact hours before setup, cleanup and travel.',
    example: 'A studio runs Tuesday and Thursday classes from December 1 through December 17, 2026. That gives six dates. Skipping Thursday, December 10 leaves five classes on December 1, 3, 8, 15 and 17.',
    faq: [
      ['Which time zone should I choose for the class?', 'Choose the venue’s time zone. For example, a London studio teaching at 18:00 should use Europe/London so each date is tied to the local class time.'],
      ['How do I handle classes with different weekday start times?', 'Generate one schedule for each start time. For Tuesday mornings and Thursday evenings, select Tuesday in the first run and Thursday in the second, then export both schedules.'],
      ['Are the first and last days of the term included?', 'Yes, when they match one of the teaching weekdays and do not appear on the skip list. A Monday end date adds no extra session to a Tuesday-only class.'],
      ['How do I skip a holiday or studio closure?', 'Enter the affected date in year-month-day format in the skip field. The class is removed from the term and from both exports; the other weeks keep their original dates.'],
      ['Can I import the timetable into a calendar app?', 'Download the ICS file and import it into a calendar you control. It creates dated sessions. The CSV is useful for sorting dates or sharing the schedule with instructors.'],
      ['Do students in another time zone see the right local time?', 'The calendar export gives each class a specific instant based on the venue’s time zone and date. A guest’s calendar can then display that instant in their own zone.']
    ],
    solution: '/shopify-fitness-booking-app',
    solutionLabel: 'Publish fitness class bookings on Shopify',
    related: ['workshop-break-even-calculator', 'add-to-calendar-link-generator']
  },
  'shopify-booking-page-checker': {
    name: 'Shopify Booking Page Checker',
    title: 'Free Shopify Booking Page Checker for Service Pages | Cowlendar',
    description: 'Check a public Shopify booking page for service price, duration, location, cancellation terms and a booking action. Review the findings against your mobile page.',
    short: 'Check what a customer can learn before they choose a time. Start with the public URL of one bookable service.',
    guideHeading: 'Can a first-time customer work out how to book?',
    guide: 'Choose a service page someone might reach from search, such as a haircut, kayak rental or pottery class. Review each signal the checker finds in the page HTML. Then open that same URL on your phone, signed out, and try the booking yourself. Pay particular attention to the details that change a customer’s decision before they open the calendar.',
    example: 'A pottery class lists $65 and “Book now” near the title. The class length appears only after a time is selected. Adding “90-minute wheel class” beside the price answers a customer’s first question one step earlier.',
    faq: [
      ['Which Shopify URL should I check?', 'Use the public page where a customer chooses a service or starts a reservation. A specific product or service page gives a more useful result than the shop homepage or an admin preview.'],
      ['What does the mobile preview represent?', 'The preview summarizes information found in the page HTML. You can also try the live page in a phone-sized window when the storefront allows embedding. Open the original on a phone to test the full customer journey.'],
      ['Why is my booking button marked for review when I can see it?', 'Some themes and apps add controls after JavaScript runs. Check the page as a customer and confirm whether the button appears, when it appears and where it leads.'],
      ['Can this checker make a reservation or change my store?', 'It inspects publicly available page information. You can apply any changes yourself in your theme, product content or booking app, then run another check.'],
      ['What if my page is password protected?', 'The checker can only examine the response a visitor can access at that URL. A password screen, storefront challenge or blocked request can hide the actual service details.'],
      ['Which issue should I address first?', 'Follow the customer’s path from arrival to selecting a time. If the service has a clear price and duration but the booking action is hard to find, make that action visible and test the path again.']
    ],
    solution: '/shopify-appointment-booking-app',
    solutionLabel: 'Explore appointment booking on Shopify',
    related: ['booking-intake-form-builder', 'appointment-cancellation-policy-generator']
  },
  'mobile-service-travel-fee-calculator': {
    name: 'Mobile Service Travel Fee Calculator',
    title: 'Free Travel Fee Calculator for Mobile Services | Cowlendar',
    description: 'Estimate a travel charge for on-site appointments using mileage, travel time and an included distance. Plan quotes for mobile beauty, photography and home services.',
    short: 'Put a price on the journey to a client. See what the drive costs before you quote an on-site appointment.',
    guideHeading: 'How much should you add for travelling to a customer?',
    guide: 'Start with the trip you will actually make, including the return journey if you travel back to base. Separate the cost of running the vehicle from the value of the working time spent on the road. Decide how much travel the service price already covers. Use the resulting estimate to write a clear travel line on the customer’s quote.',
    example: 'A mobile stylist drives 20 miles in total and spends 40 minutes travelling. At $0.60 per mile and $30 per hour, the journey costs $12 in mileage and $20 in time. With no distance included in the appointment price, the estimated charge is $32.',
    faq: [
      ['Should I count the drive home?', 'Enter the one-way distance from your base and the round-trip travel time in minutes. For a ten-mile visit with no free radius, the calculator prices twenty miles. Include both the outward and return driving time.'],
      ['Why enter both a mileage rate and an hourly rate?', 'Mileage covers items such as fuel and vehicle use. The hourly amount puts a value on time that you could otherwise spend working with clients. Use only the elements you intend to recover.'],
      ['What is an included travel radius?', 'The free one-way radius reduces the distance charged on each leg. A 12-mile client trip with a five-mile allowance leaves 14 billable miles round trip. Travel time, parking and tolls are separate inputs.'],
      ['Can I use this for a photographer, cleaner or mobile therapist?', 'Yes. Replace the example rates with the cost and travel time for your own business. A photographer carrying lighting equipment may have a different trip cost from a nearby home visit.'],
      ['Does the calculator look up driving directions?', 'Use the distance and travel time from your preferred route planner for the appointment time. That lets you account for the route, traffic pattern and location you expect to visit.'],
      ['How should I quote visits to two clients in the same area?', 'Allocate the shared travel between the visits according to your pricing policy. Charging both customers the full return trip can double-count the same miles.']
    ],
    solution: '/shopify-appointment-booking-app',
    solutionLabel: 'Offer on-site appointments through Shopify',
    related: ['service-price-calculator', 'booking-deposit-calculator']
  },
  'rental-equipment-condition-report': {
    name: 'Rental Equipment Condition Report',
    title: 'Free Rental Equipment Condition Report & Photo Template | Cowlendar',
    description: 'Create a printable equipment inspection report with pickup and return notes and before-and-after photos. Record the condition of bikes, cameras, kayaks and other rentals.',
    short: 'Document the same rental item at pickup and return. Put the notes and photos side by side in one printable report.',
    guideHeading: 'What should an equipment handover record include?',
    guide: 'Identify the exact unit using its stock number, serial number or another identifier the team recognizes. Before handover, photograph the overall condition and any existing marks, then record where each one is. At return, photograph the same surfaces from a similar angle. Save a copy at pickup and a completed copy after inspection with the same booking reference.',
    example: 'A camera body already has a scuff beside the battery door. The handover photo and note record it before the renter leaves. At return, staff photograph the same corner and separately document a new crack on a lens cap.',
    faq: [
      ['Should two identical rental items share one condition report?', 'Give each unit its own identifier. A note about a scratch on bike B07 should still be traceable to B07 after both bikes return to the rack.'],
      ['Which photos are most useful at pickup?', 'Choose a pickup photo that clearly shows the area you want to compare later. Photograph the same area at return, from a similar angle and distance. Identify other marks or supporting images in the written notes.'],
      ['Can I prepare a report before the return date?', 'Record pickup, then use Save on this device and keep a PDF copy. Return to the page in the same browser to reopen the saved inspection. Add the return date, condition and photo before printing the completed report.'],
      ['How should I describe damage?', 'Use observations such as “2 cm scratch on the outer left side of the frame.” Record the location and visible condition before drawing a conclusion about its cause.'],
      ['Does the report set a charge for damage?', 'It records observations and photos. Your rental agreement, inspection process and any repair estimate determine how your team handles a charge.'],
      ['What is the easiest way to share the inspection with the renter?', 'Use the print option to save a PDF or print a paper copy. Review the photos in the preview and share the version that corresponds to pickup or return.']
    ],
    solution: '/shopify-rental-booking-app',
    solutionLabel: 'Manage equipment rentals on Shopify',
    related: ['rental-inventory-planner', 'equipment-rental-quote-generator']
  },
  'appointment-cancellation-policy-generator': {
    name: 'Appointment Cancellation Policy Generator',
    title: 'Free Appointment Cancellation Policy Generator & Template | Cowlendar',
    description: 'Draft cancellation, rescheduling and refund wording for appointments. Get a short booking-page notice and a longer version for confirmations or your policy page.',
    short: 'Give customers clear cancellation terms before they book, then repeat the same rules in their confirmation.',
    guideHeading: 'Write a cancellation policy a customer can act on',
    guide: 'Use the notice period your team can apply consistently. Specify how the customer contacts you, when notice must arrive and what happens to a deposit or prepayment. Compare the short booking notice and the longer version against the settings in your booking and payment apps. Review the draft against the requirements that apply to your business before publishing it.',
    example: 'For a Friday appointment at 15:00 with a 24-hour notice period, the deadline is Thursday at 15:00 in the appointment’s time zone. Including that example makes a rolling 24-hour rule clearer than the phrase “cancel the day before.”',
    faq: [
      ['Where should I display the short and long versions?', 'Place the short notice near the booking action, where customers decide whether to reserve. Put the full wording on a policy page or in the confirmation, with a clear way to request a change.'],
      ['What is the difference between a 24-hour cutoff and the previous calendar day?', 'A 24-hour cutoff is measured back from the appointment time. A previous-day rule may use a fixed time such as 17:00. Choose the wording that matches the rule you actually apply.'],
      ['Should cancellation and rescheduling have different rules?', 'They can. State whether a deposit carries over to a new appointment, how much notice is required to move a booking and what happens if the new date costs more.'],
      ['What if several services have different notice periods?', 'Create a separate version for each materially different rule. A short haircut and a full-day private event may need different lead times to refill the space.'],
      ['Will the generated policy apply charges or issue refunds?', 'The output is a text draft. Configure the actual booking deadline, payment collection and refund workflow separately, then test a cancellation as a customer.'],
      ['Does this produce jurisdiction-specific legal advice?', 'The draft reflects the choices you enter. Local requirements, consumer rights and the terms of your particular offer can affect what you may publish and apply.']
    ],
    solution: '/shopify-appointment-booking-app',
    solutionLabel: 'Manage Shopify appointment changes',
    related: ['booking-deposit-calculator', 'appointment-reminder-generator']
  },
  'booking-waitlist-matcher': {
    name: 'Booking Waitlist Matcher',
    title: 'Free Booking Waitlist Matcher for Classes, Tours & Events | Cowlendar',
    description: 'Match an open booking slot to waitlisted groups by availability and party size. Keep queue order visible and see how many spaces each match would use.',
    short: 'A cancellation frees three seats. Find which waiting parties can come at that time and fit in the space.',
    guideHeading: 'Who gets the first call when a booking opens up?',
    guide: 'Enter the opening and the number of places you can offer. Keep each waiting party together and use the order in which your team wants to contact them. Check the time window as well as group size. Give the first suitable party a clear reply deadline before offering those same places to someone else.',
    example: 'A tour has three open seats. The first party on the list needs four and the next needs two. If the second party can attend the full tour, offer them two seats. One seat remains for the next eligible single guest.',
    faq: [
      ['How is waitlist priority determined?', 'Enter parties in the order your team uses for priority. The matcher checks availability and group size against the opening in that order.'],
      ['What if a party is larger than the seats available?', 'The group must fit together to qualify. If the customer has explicitly agreed to split, enter the smaller party size you can actually offer.'],
      ['Why might someone be available at the start but still miss the match?', 'Their availability must cover the required session window. A customer free until 15:15 cannot take a class that runs from 15:00 to 16:00.'],
      ['Should I contact every match at once?', 'Make offers according to your queue policy. Record who has an offer and when it expires to avoid promising the final place to two people.'],
      ['Can I check a private appointment as well as a group session?', 'Use one available place and a party size of one for a private appointment. For a workshop or tour, enter the number of participant places released.'],
      ['Does a match confirm the reservation?', 'It identifies groups whose details fit the opening. Contact the selected customer and confirm the reservation in your booking system after they accept.']
    ],
    solution: '/shopify-class-booking-app',
    solutionLabel: 'Sell and manage group classes on Shopify',
    related: ['class-check-in-sheet-generator', 'appointment-reminder-generator']
  },
  'class-pass-expiry-calculator': {
    name: 'Class Pass Expiry Calculator',
    title: 'Free Class Pass Expiry Date Calculator with Pauses | Cowlendar',
    description: 'Find the last valid day of a class pack or studio pass. Count from activation, enter freeze periods and copy the expiry dates for your customer.',
    short: 'Work out the last date a member can attend, including any pauses you granted.',
    guideHeading: 'When does a class pass actually expire?',
    guide: 'Check what activates the pass in your studio, such as the purchase date or the first visit, and enter that date as day one. Enter the number of active calendar days allowed. Add the start and end of each freeze. Give the member the last valid attendance date as well as the first expired date so there is no doubt about the final day.',
    example: 'A 30-day pass activated on June 1 is valid through June 30. A freeze from June 10 to June 14 inclusive pauses five days. The new last day to attend is July 5 and the pass is expired from July 6.',
    faq: [
      ['Does the day the pass starts count as day one?', 'Yes. A one-day pass is valid on its activation date. A seven-day pass activated on a Monday remains valid through Sunday if there are no freezes.'],
      ['Should I enter the purchase date or the first class?', 'Use the event that starts the validity period under your studio’s terms. A gift purchased on April 1 and activated on April 20 starts on April 20 if validity begins at first use.'],
      ['How do overlapping freezes affect the expiry date?', 'Each suspended calendar day counts once. A pause from June 10–14 and another from June 13–16 cover seven distinct dates in total.'],
      ['Do weekends count when the studio is closed?', 'An active calendar-day pass includes weekends. Add a closure as a pause only when your studio has agreed to extend the member’s pass for that period.'],
      ['Does this track how many sessions a member has left?', 'This tool calculates the time window for attendance. Your attendance or booking records track the visits used from a five-, ten- or twenty-class pack.'],
      ['Can I use the calculator for a calendar-month membership?', 'Use it when validity is expressed in a number of days. A membership that renews on the same date each month follows a different rule because months have different lengths.']
    ],
    solution: '/shopify-fitness-booking-app',
    solutionLabel: 'Manage fitness and studio bookings on Shopify',
    related: ['recurring-class-schedule-generator', 'class-check-in-sheet-generator']
  },
  'experience-gift-voucher-maker': {
    name: 'Experience Gift Voucher Maker',
    title: 'Free Experience Gift Voucher Maker & Printable Template | Cowlendar',
    description: 'Design a printable gift voucher for a class, spa visit or tour. Add a cover photo, recipient, gift message, existing redemption code and booking link.',
    short: 'Turn a booking credit or gift code into something the recipient can open, print and give.',
    guideHeading: 'What should an experience gift voucher tell the recipient?',
    guide: 'Name the experience in terms the recipient will understand. Include the provider, who the gift is for, how many guests it covers and where to choose a date. Enter a redemption code already issued by your store or booking provider. Use a photo that shows the actual experience, then review the printed voucher and redemption link together before sending it.',
    example: 'A family buys a sunset kayak tour for two. The voucher names both the activity and the guest count, carries a note from the family and links directly to the provider’s kayak-tour booking page. The provider’s existing code handles redemption.',
    faq: [
      ['Does the maker create a Shopify gift card balance?', 'It designs the voucher customers receive. Create or obtain the redeemable code in your store or booking system first, then enter that code in the design.'],
      ['Can I use a photo of my own class or activity?', 'Yes. Upload a cover photo or choose a supplied design. A landscape image with the main subject near the middle gives you room for cropping.'],
      ['Can the recipient choose a date later?', 'Use a booking link that lets the recipient select an available date. The gift design itself does not reserve a particular session or hold a seat.'],
      ['What if the gift is for two people or for a specific package?', 'Write the entitlement in the experience name, such as “Afternoon ceramics for two.” Check the issued code or booking credit covers the same offer.'],
      ['How do I send a digital copy?', 'Choose Print / save PDF and save the voucher from the print preview. Send that file privately to the purchaser or recipient because it contains the redemption code.'],
      ['Can I print a sample to display at the counter?', 'Yes. Use a sample code and a fictional recipient for display. Enter the actual code and personal message only in the copy intended for the gift recipient.']
    ],
    solution: '/shopify-event-booking-app',
    solutionLabel: 'Sell bookable experiences on Shopify',
    related: ['booking-qr-code-generator', 'add-to-calendar-link-generator']
  },
  'ical-feed-validator': {
    name: 'iCal Feed Validator',
    title: 'Free iCal Feed Validator & ICS Event Preview | Cowlendar',
    description: 'Check an ICS file, pasted calendar data or a feed URL. Inspect appointment dates, time zones, recurring events and busy or free status before connecting a calendar.',
    short: 'Inspect the events inside a calendar feed and find clues to shifted times or missing availability blocks.',
    guideHeading: 'Why would a calendar event show up at the wrong time?',
    guide: 'Start with a known appointment so you have an expected date, time and time zone to compare. Inspect the start representation, recurrence information and busy or free status. A timestamp ending in Z identifies a UTC instant. A local time paired with a TZID identifies its source zone, while a local time without either is floating. Check which of these your source calendar exported before changing your booking settings.',
    example: 'A Paris appointment at 10:00 on a January morning can be exported as 09:00 UTC. Those values describe the same instant. A 10:00 value with no zone information can instead be interpreted as 10:00 in the receiving calendar’s local zone.',
    faq: [
      ['Should I enter a calendar URL or upload an .ics file?', 'URL mode sends the address to Cowlendar to read the feed once. File and paste modes read the exported copy in your browser. For a private calendar with a secret in its link, use the local file or paste option.'],
      ['What does a floating time mean in an ICS event?', 'A date-time without a UTC suffix or a time-zone reference is floating. Different viewers can interpret the same clock reading in their own local time zone.'],
      ['Why can a visible event fail to block availability?', 'An event marked TRANSPARENT represents free time in iCalendar. An OPAQUE event occupies the interval. The receiving booking app also controls which calendars and events it uses to calculate availability.'],
      ['What should I check if one recurring session moved?', 'Look for the recurrence rule on the main event, any excluded dates and an exception identifying the changed occurrence. Compare the affected date in the source and receiving calendars.'],
      ['Is an all-day event ending the next day a two-day booking?', 'In iCalendar the end is exclusive. An all-day start on May 8 with an end on May 9 covers May 8 only.'],
      ['Can this tool change the events in my calendar?', 'The validator reads calendar data and displays its findings. Make any correction in the source calendar, export or refresh the feed and check the revised version.']
    ],
    solution: '/shopify-appointment-booking-app',
    solutionLabel: 'Set up calendar-based Shopify appointments',
    related: ['add-to-calendar-link-generator', 'timezone-converter']
  },
  'salon-commission-calculator': {
    name: 'Salon Commission Calculator',
    title: 'Free Salon Commission Calculator for Stylists & Retail | Cowlendar',
    description: 'Calculate stylist commissions on salon services and retail products. Group sales by team member, show tips separately and export commission statements.',
    short: 'Turn a team sales sheet into individual statements showing service commission, retail commission and tips.',
    guideHeading: 'How much commission did each stylist earn?',
    guide: 'Choose the period and the commission rates used for services and retail. Gather each stylist’s eligible sales net of discounts, refunds and taxes and enter any tips separately. Use the same spelling of each team member’s name on all their rows. Compare the totals with your point-of-sale report before sending out statements.',
    example: 'A stylist records $800 in service sales, $150 in product sales and $60 in tips. A 40% service rate gives $320 and a 10% retail rate gives $15. Adding the $60 tips gives $395 for the period.',
    faq: [
      ['Are service and product sales paid at the same rate?', 'You can enter separate percentages. For example, set a service rate of 40% and a retail rate of 10%, or use zero for a category that earns no commission.'],
      ['Can I paste more than one sale for the same stylist?', 'Yes. Rows with the same team member name are grouped together. Check for spelling or spacing differences when preparing sales from more than one source.'],
      ['How are tips handled?', 'Enter the tip amount allocated to that stylist. It appears separately and is added in full to the calculated commissions. If your salon pools tips, allocate the individual amounts before entering them.'],
      ['What if individual stylists have different commission rates?', 'The entered rates apply to everyone in one run. Group people with the same rates together, or calculate separate statements for each rate arrangement.'],
      ['Do I enter gross receipts or net sales?', 'Use eligible service and retail sales after discounts, refunds and taxes. Keep the tips in their own column so they do not also earn a sales commission.'],
      ['Is this a payroll statement?', 'It is a breakdown of the sales commissions and tips you enter. Base pay, hours, deductions and payroll taxes belong in your payroll system.']
    ],
    solution: '/shopify-salon-booking-app',
    solutionLabel: 'Manage salon bookings on Shopify',
    related: ['salon-capacity-calculator', 'service-price-calculator']
  },
  'class-check-in-sheet-generator': {
    name: 'Class Check-In Sheet Generator',
    title: 'Free Class Check-In Sheet Generator & Attendance Template | Cowlendar',
    description: 'Turn group reservations into a printable class attendance sheet with one checkbox per guest. Mark arrivals and export check-in status for a class, workshop or tour.',
    short: 'Give the instructor a roster with one place to mark each person, including guests booked under a single name.',
    guideHeading: 'How do you check in groups that booked under one name?',
    guide: 'Start with the booking holder and the number of people on each reservation. Add the class date, start time and instructor so two sessions with similar names stay distinguishable. As people arrive, mark the individual guest places under their booking name. Export or print the attendance record when check-in is complete.',
    example: 'Morgan has booked four workshop places. Two guests arrive first, so the instructor marks two of Morgan’s four checkboxes. The booking remains visible with two guests still to arrive, while the session attendance total increases by two.',
    faq: [
      ['Can I check in one person from a group without marking the whole booking?', 'Yes. Each participant has a separate checkbox under the reservation name. Mark guests one at a time as they arrive.'],
      ['Do I need every attendee’s name to make a roster?', 'You can use a booking holder’s name and group size. If you need named attendance, enter each participant on their own line with a group size of one.'],
      ['How do I make a blank attendance sheet for an instructor?', 'Enter the class and group reservations, leave the guest checkboxes clear and use Print / save PDF. The instructor can mark arrivals by hand.'],
      ['Can I keep a copy of completed attendance?', 'Export the attendance CSV after marking arrivals. It records the session, booking, guest position, group size and check-in status. You can also print the marked sheet.'],
      ['What happens if I edit the roster after check-in starts?', 'Changing the roster or session details can reset the check-in marks. Export the current record before replacing the list or setting up another class.'],
      ['Does checking a box update my Shopify orders?', 'Checkmarks belong to this working sheet. Use the exported attendance record to reconcile reservations in the system that holds your orders.']
    ],
    solution: '/shopify-class-booking-app',
    solutionLabel: 'Take class and workshop reservations on Shopify',
    related: ['booking-waitlist-matcher', 'recurring-class-schedule-generator']
  }
};
