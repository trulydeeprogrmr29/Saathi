# Saathi

Saathi is a route-based rural marketplace MVP. It connects people who need essentials from the market with neighbours already travelling home on a nearby route.

## Run locally

This first slice has no dependencies or build step. From this folder, start any local static server, for example:

```powershell
python -m http.server 4173
```

Then open <http://localhost:4173>.

## MVP flow

- Submit a market request for vegetables or other essentials.
- See five ranked, route-matched helpers on the matchboard.
- Prepare a WhatsApp message for a helper without requiring an app install.
- Register a helper's usual market and return route.

The matching data is intentionally local demo data. A production version would connect the forms to a backend, verify phone numbers, use the WhatsApp Business API, and calculate matching from real routes and delivery history.
