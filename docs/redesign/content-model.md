# Content model — Northbank Technology Park

Status: `ĐÃ DUYỆT` (owner chose direction A and asked to continue on 2026-11-25; no change requested to the name or content). Language: English.

Everything here is fictional. No real organisation, company, person, address or phone number is used. The
repository and URL stay `Ngh1aa/QTSC` / `ngh1aa.github.io/QTSC` so existing portfolio links keep working; the
product inside becomes Northbank.

## Identity

| | |
|---|---|
| Name | **Northbank Technology Park** (short: Northbank) |
| What it is | A technology park run by a park operator: offices and labs for rent, shared infrastructure, a directory of member companies, investment support, events, jobs |
| Where | On the north bank of the Saigon River, Thủ Đức City, Ho Chi Minh City (fictional site) |
| Size | 38 ha, 7 buildings, 142 member companies, about 18,600 people working on site, companies from 11 countries |
| Since | 2009 |
| Voice | Plain, confident, practical. Short sentences; numbers over adjectives |
| Contact | hello@northbank.example, +84 28 0000 0000 (reserved, non-routable examples) |

## Buildings

| Building | Use |
|---|---|
| Atlas | Headquarters offices, 12 floors |
| Beacon | Flexible offices and coworking |
| Cobalt | Data center (Tier III design), cloud and colocation |
| Delta Labs | Hardware and electronics labs |
| Echo Hall | Conference center, 600 seats |
| Forge | Startup and innovation center |
| Grove | Training, canteen, clinic, gym |

## Member companies (fictional, about 20 in the seed)

Examples: Lattice Systems (software), Mangrove AI (data and AI), Tessera Health (health tech), Oriel Pay
(fintech), Kite Logistics Tech (logistics software), Sable Security (cybersecurity), Fernwood Studios
(games), Quill Learning (edtech), Halyard Telecom (telecom), Pivot Robotics (hardware). Real company names
are not used; names were chosen to sound plausible without matching a well-known brand.

## Information architecture

Primary navigation: **Space**, **Infrastructure**, **Companies**, **Invest**, **News**, **Careers**, then
About and Contact. Pages keep their file names (and URLs) so links and tests stay stable, except where the
name is QTSC-specific.

| Section | Pages (file) |
|---|---|
| Home | `index.html` |
| Space | `office.html` (find space), `office-unit.html`, `amenities.html`, `explore.html` (campus map) |
| Infrastructure | `services.html`, `technology-detail.html` (Cobalt data center), `telecom.html`, `digitech-center.html` (security operations center) |
| Companies | `companies.html`, `company-detail.html`, `marketplace.html` (solutions), `solution-detail.html` |
| Invest | `investment.html`, `incentives.html`, `innovation-centers.html` (Forge) |
| News | `insights.html`, `article.html`, `media-center.html`, `awards.html`, `community.html`, `newsletter.html` |
| Careers | `careers.html`, `job-detail.html` |
| Resources | `resources.html`, `open-data.html` |
| About and legal | `about.html`, `contact.html`, `legal.html`, `privacy.html`, `sitemap.html` |
| Renamed | `qtsc-chain.html` → `locations.html` (Northbank's other two sites) |
| Removed | `QTSC-UIUX-Research-Presentation.html` (research about the real organisation; not part of the product) |

## Behaviour kept

Every flow covered by `.github/qa/e2e-prototype.mjs` stays: directory search and filters, company detail,
solutions + demo request, office search + booking + reschedule + cancel, investment checker + enquiry,
insights, resources download, careers + apply + withdraw, newsletter, contact, open data + CSV, campus map,
failure + retry, session persistence and reset. Only names, copy and data change.

## Photos

CC0 or public-domain photos from Wikimedia Commons (many are older Unsplash uploads released under CC0),
stored in `assets/images/photos/` with `CREDITS.md`. No photo shows a real, identifiable park as if it were
Northbank's. People in photos are not named.
