## 2025-03-09 - Forms and Accessibility
**Learning:** Forms constructed using standard `<form>` elements but a `type="button"` submit button with an `onClick` handler bypass HTML5 built-in field validation (`required`, `type="email"`, etc) and prevent submitting the form intuitively via the `Enter` key.
**Action:** Always ensure that standard form elements use native `<form onSubmit={...}>` alongside a `<button type="submit">`. Additionally, if fields are visually grouped but conceptually required, include a visual indicator (like a red asterisk) for sighted users so they know a field must be completed.
## 2025-03-09 - Accessible Links in Forms
**Learning:** Adding explicit `aria-label` attributes to social and contact links provides essential context for screen readers when visible text is insufficient or decorative.
**Action:** Always include an `aria-label` on `<a>` tags describing the destination or action if the link has an icon or minimal text (e.g., "Send email" instead of just the email address).
## 2024-05-24 - Skip link focus styles in single-page apps
**Learning:** Adding a skip-to-content link in a full-height container (`h-screen overflow-hidden`) requires careful z-index placement (`z-[100]`) and focus management (`tabIndex={-1}`) on the target container to prevent unsightly default focus rings while preserving screen reader navigation.
**Action:** When adding skip links to custom scrollbar areas, explicitly style the target container with `focus:outline-none focus-visible:outline-none` and provide `tabIndex={-1}`.
## 2025-03-09 - Interactive Global Hotkey Listeners
**Learning:** Adding global keyboard shortcut listeners (e.g. Konami code or backtick `~` triggers) in single-page apps can accidentally interfere with user text entry in forms or inputs if target elements are not checked.
**Action:** Always check `event.target.tagName` or active element focus state before handling global keyboard shortcuts to bypass when the user is actively typing in an `<input>` or `<textarea>`.
