## 2024-05-24 - Skip link focus styles in single-page apps
**Learning:** Adding a skip-to-content link in a full-height container (`h-screen overflow-hidden`) requires careful z-index placement (`z-[100]`) and focus management (`tabIndex={-1}`) on the target container to prevent unsightly default focus rings while preserving screen reader navigation.
**Action:** When adding skip links to custom scrollbar areas, explicitly style the target container with `focus:outline-none focus-visible:outline-none` and provide `tabIndex={-1}`.
