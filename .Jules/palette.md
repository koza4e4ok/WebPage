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
## 2024-05-15 - [Accessible Terminal]
**Learning:** Custom terminal UI components need `role="log"` and `aria-live="polite"` on the output container to ensure screen readers automatically announce new appended terminal lines.
**Action:** Always add ARIA live regions to custom terminal output or log views.
## 2025-03-09 - Active Navigation State Accessibility
**Learning:** Visual indicators for the currently active navigation link (like highlights or underlines) are invisible to screen readers, leaving non-sighted users without context on their current position.
**Action:** Always add `aria-current="page"` (or `"true"` for sections) to the active `<a>` tag in navigation menus alongside the visual active state classes.
## 2025-03-09 - Documenting Keyboard Shortcuts for Assistive Tech
**Learning:** Even when global keyboard shortcuts are supported by an app, screen readers have no automatic way of discovering them unless they are explicitly declared on the relevant trigger elements.
**Action:** Always add the `aria-keyshortcuts` attribute to buttons or actions that can also be triggered via a keyboard shortcut (e.g. `aria-keyshortcuts="~"`).
## 2025-03-09 - Form Field Integrity During Submission
**Learning:** If form inputs remain active during an asynchronous submission, users might alter their input data before the request completes, causing confusion if the initial state is what actually sent or resulting in unexpected resubmissions.
**Action:** Always disable text fields, textareas, and other input controls when a form enters a "submitting" state to lock user interaction, and provide visual indicators (like `opacity-50` and `cursor-not-allowed`) to clarify the form is processing.
## 2025-03-09 - Async Form Submission Interactions
**Learning:** During asynchronous form submissions, keeping form inputs enabled can lead to users modifying data mid-submission or becoming confused if the request takes a long time.
**Action:** Always disable text inputs and textareas (along with the submit button) when a form is actively submitting to lock user input, and provide clear disabled visual styles (`opacity-50 cursor-not-allowed`) to indicate the non-interactive state.
## 2025-03-09 - Form Field Character Limits and Counters
**Learning:** Without explicit character limits and visual counters on free-text inputs (like textareas), users may unknowingly exceed system limits and encounter frustrating submission errors, especially in rigid terminal-style UIs.
**Action:** Always provide explicit limits (`maxLength`) on textareas along with a visible dynamic character counter (e.g., `current/max`) that visually alerts the user when they approach or hit the limit.
## 2025-03-09 - Consistent Modal Dismissal Feedback
**Learning:** Users dismiss modals in three primary ways: clicking an explicit "close" button, pressing the `Escape` key, or clicking the backdrop area. When closing a modal via a keyboard shortcut or background click doesn't produce the same sensory feedback (audio/haptics) as clicking the explicit close button, the interaction feels broken or incomplete, especially in an immersive experience. Additionally, relying solely on `aria-label`s for icon-only buttons hides their purpose from sighted users relying on a mouse.
**Action:** Always provide identical audio and haptic feedback across all modal dismissal methods (button, `Escape` key, backdrop click). Implement backdrop click dismissal using `e.target === e.currentTarget` on the modal overlay container to improve accessibility. Ensure icon-only buttons include `title` tooltips for sighted mouse users in addition to their `aria-label`s.
## 2026-09-16 - Static aria-label with aria-pressed
**Learning:** When using `aria-pressed` to communicate a toggle button's state to screen readers, the `aria-label` should remain static. Changing both the name and the pressed state simultaneously causes screen readers to announce redundant and confusing states (e.g., "Mute sound effects, pressed").
**Action:** Always verify that `aria-pressed` is paired with a static accessible name representing the feature being toggled, rather than the action to perform next.
## 2025-03-09 - Input Character Counters Accessibility
**Learning:** Visual character limit counters beneath textareas are useful for sighted users, but without a semantic link, screen reader users might not know the limit or its current status while focused on the input.
**Action:** Always link visual character limit counters to their associated input fields using `aria-describedby` to ensure screen readers announce the limit on focus.
## 2026-09-23 - Character Limit Counter Accessibility
**Learning:** Visual character limits (like 0/500) next to text inputs are helpful for sighted users but are not announced to screen reader users when they interact with the field, which can lead to unexpected submission errors.
**Action:** Always link visual character limit counters to their associated input fields using `aria-describedby` to ensure screen readers announce the limit on focus.
## 2026-09-21 - Connecting Visual Limits to Screen Readers
**Learning:** Visual character limits and counters positioned next to textareas are typically not announced by screen readers when the user focuses the textarea, depriving them of important constraint information.
**Action:** Always link visual counters (like a `<span>` showing `0/500`) to the input using `aria-describedby` so the screen reader announces the limit and current count when the input is focused.
