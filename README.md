# Saathi

> Everyday essentials. One neighbour away.

Saathi is a route-based rural marketplace that connects people who need essentials from the market with neighbours already travelling home on a nearby route.

The project is designed for tier 3/4 towns, villages, and communities where people regularly return from the market in the evening. Helpers register once on the web and receive future work through WhatsApp, so they do not need to install a separate worker app.

## Problem

An elderly, unwell, or mobility-limited person may need vegetables or other daily essentials but be unable to visit the market. At the same time, someone nearby may already be returning from that market and be willing to carry a small extra order for a modest earning.

Saathi creates a trusted connection between these two people.

## Current MVP

The current version is a dependency-free frontend prototype with two connected flows:

### Requester flow

1. Select a market and enter the delivery area.
2. List the required essentials and add an address or landmark.
3. Choose a delivery window and provide a WhatsApp number.
4. View five ranked market-going helpers on the matchboard.
5. Prepare a WhatsApp request message for a helper.

### Helper flow

1. Enter a name and WhatsApp number.
2. Select a usual market.
3. Add the route normally travelled home.
4. Register once without installing an app.
5. The saved helper profile appears in future local matches for the selected market.

## Features included

- Rural-focused responsive landing page
- Market essentials request form
- Five-helper matchboard
- Demo confidence scores and delivery history
- Market and route information for each helper
- WhatsApp message preparation links
- Helper route registration
- LocalStorage persistence for the demo profile and request
- Mobile-friendly layout
- Accessible labels, form feedback, and live matchboard updates

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- Browser LocalStorage for prototype persistence
- Python static server for local preview

No package installation or build step is required for the current MVP.

## Run locally

From the project directory, start a static server:

```powershell
python -m http.server 4173
```

Open <http://localhost:4173> in a browser.

Alternatively, any static HTTP server can serve the project root because `index.html` is the entry point.

## Project structure

```text
Saathi/
├── index.html    # Page structure and user flows
├── styles.css    # Responsive visual design
├── app.js        # Form handling, matching demo, and local persistence
└── README.md     # Project documentation
```

## Current prototype limitations

The match data and confidence scores are demo data. This version does not yet include:

- A backend or production database
- User authentication or phone verification
- Real GPS and route-distance calculations
- Real WhatsApp Business API messaging
- Payment or UPI processing
- Delivery status tracking
- Delivery OTPs, disputes, refunds, or admin moderation
- Production deployment

## Roadmap

### Phase 2 — Backend vertical slice

- Add a Node.js/Express API and SQLite database.
- Persist customer requests and helper profiles.
- Return matches from stored data.
- Allow a helper to accept a request.
- Lock the request after the first acceptance.
- Show request status to the requester.

### Phase 3 — Trust and communication

- Add phone verification and helper verification.
- Integrate the WhatsApp Business API.
- Add delivery OTP, ratings, cancellations, and dispute handling.
- Replace demo confidence scores with real delivery performance data.

### Phase 4 — Pilot readiness

- Add Hindi and local-language support.
- Add family-member and operator-assisted ordering.
- Add UPI payments and helper earnings.
- Add an operations dashboard.
- Pilot in one town with a small group of requesters and helpers.

## Checks

JavaScript syntax:

```powershell
node --check app.js
```

Static server smoke check:

```powershell
python -m http.server 4173
```

The local HTML, CSS, and JavaScript files should each return HTTP `200` from the server.

## Repository

GitHub: <https://github.com/trulydeeprogrmr29/Saathi>
