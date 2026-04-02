<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into the DevEvent Next.js application. Here is a summary of all changes made:

- **`instrumentation-client.ts`** (new file): Initializes PostHog client-side using the `instrumentation-client` pattern (recommended for Next.js 15.3+). Captures unhandled exceptions via `capture_exceptions: true` and uses a reverse proxy via `/ingest`.
- **`next.config.ts`**: Added reverse proxy rewrites for `/ingest/*` → PostHog ingestion endpoint, and set `skipTrailingSlashRedirect: true` as required by PostHog.
- **`.env.local`**: Populated with `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` (gitignore-covered).
- **`components/EventCard.tsx`**: Added `posthog.capture('event_card_clicked')` with `event_title`, `event_slug`, `event_location`, and `event_date` properties.
- **`components/ExploreBtn.tsx`**: Added `posthog.capture('explore_events_clicked')` in the existing click handler.
- **`components/NavBar.tsx`**: Added `posthog.capture('nav_link_clicked')` with `label` and `href` properties on each nav link.

## Events

| Event Name | Description | File |
|---|---|---|
| `event_card_clicked` | Fired when a user clicks on an event card to view its details page | `components/EventCard.tsx` |
| `explore_events_clicked` | Fired when a user clicks the 'Explore Events' CTA button on the homepage | `components/ExploreBtn.tsx` |
| `nav_link_clicked` | Fired when a user clicks a navigation link in the top nav bar | `components/NavBar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics](https://us.posthog.com/project/366251/dashboard/1423914)
- **Insight**: [Event Card & Explore Button Clicks](https://us.posthog.com/project/366251/insights/fVVAFLQU) — Daily trend of event card and CTA button clicks
- **Insight**: [Unique Users Browsing Events (DAU)](https://us.posthog.com/project/366251/insights/ndwnJC7J) — Unique users clicking event cards per day
- **Insight**: [Explore CTA → Event Card Funnel](https://us.posthog.com/project/366251/insights/bYXt8BdP) — Conversion funnel from Explore button to event card click
- **Insight**: [Nav Link Clicks by Destination](https://us.posthog.com/project/366251/insights/OtyGFiCg) — Which nav links users click most, broken down by label
- **Insight**: [Top Clicked Events](https://us.posthog.com/project/366251/insights/RdCjVkcq) — Which event cards get the most clicks, by event title

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
