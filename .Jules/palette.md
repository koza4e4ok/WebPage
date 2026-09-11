## 2025-03-09 - Forms and Accessibility
**Learning:** Forms constructed using standard `<form>` elements but a `type="button"` submit button with an `onClick` handler bypass HTML5 built-in field validation (`required`, `type="email"`, etc) and prevent submitting the form intuitively via the `Enter` key.
**Action:** Always ensure that standard form elements use native `<form onSubmit={...}>` alongside a `<button type="submit">`. Additionally, if fields are visually grouped but conceptually required, include a visual indicator (like a red asterisk) for sighted users so they know a field must be completed.
## 2025-03-09 - Accessible Links in Forms
**Learning:** Adding explicit `aria-label` attributes to social and contact links provides essential context for screen readers when visible text is insufficient or decorative.
**Action:** Always include an `aria-label` on `<a>` tags describing the destination or action if the link has an icon or minimal text (e.g., "Send email" instead of just the email address).
## 2024-05-24 - Skip link focus styles in single-page apps
**Learning:** Adding a skip-to-content link in a full-height container (`h-screen overflow-hidden`) requires careful z-index placement (`z-[100]`) and focus management (`tabIndex={-1}`) on the target container to prevent unsightly default focus rings while preserving screen reader navigation.
**Action:** When adding skip links to custom scrollbar areas, explicitly style the target container with `focus:outline-none focus-visible:outline-none` and provide `tabIndex={-1}`.
## 2025-03-09 - Accessible Progress Bars
**Learning:** Visual progress bars represented by plain `<div>` elements are not announced to screen readers, making quantitative progress invisible to non-sighted users. The visible percentage text alone isn't robust without a contextual semantic role.
**Action:** Always add `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` to custom visual progress elements. Use `aria-labelledby` pointing to the item name, and consider adding `aria-hidden="true"` to the redundant visible percentage text to avoid double-reading.
## 2025-03-09 - Interactive Global Hotkey Listeners
**Learning:** Adding global keyboard shortcut listeners (e.g. Konami code or backtick `~` triggers) in single-page apps can accidentally interfere with user text entry in forms or inputs if target elements are not checked.
**Action:** Always check `event.target.tagName` or active element focus state before handling global keyboard shortcuts to bypass when the user is actively typing in an `<input>` or `<textarea>`.
## 2025-03-09 - Documenting Keyboard Shortcuts for Assistive Tech
**Learning:** Even when global keyboard shortcuts are supported by an app, screen readers have no automatic way of discovering them unless they are explicitly declared on the relevant trigger elements.
**Action:** Always add the `aria-keyshortcuts` attribute to buttons or actions that can also be triggered via a keyboard shortcut (e.g. `aria-keyshortcuts="~"`).
