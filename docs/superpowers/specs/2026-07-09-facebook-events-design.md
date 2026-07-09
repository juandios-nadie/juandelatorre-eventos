# Facebook Events Section Design

## Goal

Add an "Eventos recientes" section to the homepage that connects the website to the business Facebook account and shows recent Facebook activity with minimal maintenance.

## Recommended Approach

Use Meta's official Facebook Page Plugin to embed the business Page timeline. This lets new Facebook posts appear on the website automatically after they are published on Facebook, without requiring duplicate updates in Sanity.

This first version intentionally avoids the Facebook Graph API. API-based syncing would provide more visual control, but it adds Meta app setup, token management, permissions, and ongoing maintenance that are not needed for the current goal.

## User Experience

The homepage will include a new section titled "Eventos recientes" after the featured gallery and before the quote/contact area. The section will frame Facebook as the freshest source for current events, recent setups, and social proof.

Primary state:

- Display the Facebook Page timeline embed for the configured business Facebook URL.
- Keep the section visually consistent with the existing homepage sections.
- Include a direct link to open the Facebook page.

Fallback state:

- If the Facebook URL is missing or the embed cannot render, show a concise message and a button linking to the Facebook page when available.
- The site should remain usable even when Facebook scripts are blocked by a browser extension, privacy setting, or network issue.

## Data Source

Reuse the existing `facebookUrl` field from Sanity site settings. The current seeded default is:

`https://www.facebook.com/people/Juan-de-la-Torre-Eventos/100057200871376/`

The implementation should also continue using the existing hardcoded fallback constant if Sanity settings are unavailable.

## Technical Shape

Add a focused homepage component, likely named `FacebookEventsSection`, that receives the configured Facebook URL as a prop.

The component should:

- Render the Meta Page Plugin markup with the `timeline` tab.
- Load Meta's JavaScript SDK only where this section is used.
- Avoid crashing during server rendering.
- Keep layout stable while the embed loads.
- Render a plain fallback link if JavaScript or the embed is unavailable.

The homepage should pass `settings?.facebookUrl` into this component and place it between `FeaturedGallery` and `QuoteGuideSection`.

## Error Handling

The section must not make the homepage depend on Facebook availability. If Meta blocks or delays the embedded timeline, the page should still render normally and offer a direct Facebook link.

Known limitations:

- Styling inside the Facebook embed is controlled by Meta.
- Some users may not see the embed because of privacy tools or browser settings.
- This only works reliably for a public business Facebook Page, not private personal-profile posts.

## Testing

Implementation should verify:

- `npm run lint`
- `npm run test`
- Homepage renders with a configured Facebook URL.
- Homepage renders a fallback when the Facebook URL is absent.
- Visual browser check on desktop and mobile to confirm the section is stable and does not overlap nearby content.

## Future Upgrade Path

If the embedded timeline becomes too limited, a later version can use the Facebook Pages API to sync posts into Sanity or another site-owned cache. That should be a separate project because it requires Meta app configuration, Page access permissions, token storage, and sync failure handling.
