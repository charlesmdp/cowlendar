## Prepare a service product
Create or choose the Shopify product that represents the appointment, class or experience. Give it a clear name, description, price and duration. For a service that does not ship, configure the product accordingly so checkout does not ask for irrelevant shipping choices. Shopify's [service-selling guide](https://help.shopify.com/en/manual/products/digital-service-product/selling-services-or-digital-products) explains the platform basics.

If the product has variants, decide whether each variant changes the service duration, price, resource or capacity. A “30-minute” variant should not silently reserve the same interval as a “90-minute” variant.

## Configure the booking rules before styling
In your booking app, connect the product to a service and set its timezone, opening hours, duration and any buffer or notice period. Add the relevant staff member or resource, and define how many people can reserve a time slot.

The exact labels depend on the app and version. With Cowlendar, start with the official [beginner's guide](https://help.cowlendar.com/beginners-guide) and the in-app setup flow. A widget cannot display useful times until the service actually has availability.

## Add the supported widget to the right template
Open Shopify's theme editor and select the product template used by the service. Use the app's documented installation method: this may be an app block, an app embed or a supported booking button. Do not paste an arbitrary calendar iframe into checkout or edit theme code unless that is the vendor's supported approach.

If several products share the template, confirm whether the booking widget appears only on products enabled in the app. If you use a dedicated service template, assign it to the intended product before judging the result.

For themes with multiple product templates, repeat the check on each relevant template. A successful installation on the default product page does not prove the widget is enabled on a custom landing page.

## Match the design without hiding useful information
Keep the button label explicit, such as “Choose a date” or “Book an appointment”. Use your brand color with readable contrast, comfortable touch targets and a visible selected state. Keep the service duration, timezone and price close to the booking controls.

Avoid placing the calendar in a very narrow column or a container with a fixed height. Test long service names, translated labels and a month with six calendar rows. The booking area should resize without clipped buttons or horizontal scrolling.

## Run this acceptance test
| Test | Expected result |
| --- | --- |
| Open an available product | A usable date and time can be selected |
| Open an unrelated product | Its normal purchase flow still works |
| Choose an unavailable date | The customer cannot reserve it |
| Book the last slot | Another visitor cannot exceed capacity |
| Complete checkout | Date, time and service appear correctly in the booking record |
| Reschedule | The old slot reopens and the new slot is reserved |
| Use a phone | Every field and button remains accessible |

Test in a separate private browser window as a customer. The theme editor, app preview and administrator session can behave differently from the published storefront.

## If the calendar does not appear
Check the product-to-service connection, template assignment, app embed/block status and available dates first. Then look for another booking app or theme customization controlling the same purchase button. Disable conflicting components in a duplicate theme before changing the live store.

When contacting support, include the product URL, theme name, device, a precise reproduction step and whether the problem happens before or after checkout. That is more useful than a screenshot alone.

## Keep it maintainable
Document which templates use the calendar and recheck the flow after a theme upgrade. Avoid removing a working installation until the replacement is verified. See the [booking feature checklist](/blog/features-shopify-booking-app) for the operational checks beyond the widget itself.
