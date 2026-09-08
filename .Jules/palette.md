## 2025-03-09 - Forms and Accessibility
**Learning:** Forms constructed using standard `<form>` elements but a `type="button"` submit button with an `onClick` handler bypass HTML5 built-in field validation (`required`, `type="email"`, etc) and prevent submitting the form intuitively via the `Enter` key.
**Action:** Always ensure that standard form elements use native `<form onSubmit={...}>` alongside a `<button type="submit">`. Additionally, if fields are visually grouped but conceptually required, include a visual indicator (like a red asterisk) for sighted users so they know a field must be completed.
## 2025-03-09 - Accessible Links in Forms
**Learning:** Adding explicit `aria-label` attributes to social and contact links provides essential context for screen readers when visible text is insufficient or decorative.
**Action:** Always include an `aria-label` on `<a>` tags describing the destination or action if the link has an icon or minimal text (e.g., "Send email" instead of just the email address).
