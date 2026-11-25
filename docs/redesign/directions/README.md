# Direction gate — home page

Status: `CHƯA DUYỆT`. Mock-ups are static home pages in new markup with the Northbank content and CC0 photos.
Shots: `shots/` (1440 and 390).

| | A — Ember (DNA evolution) | B — Canopy (new direction) |
|---|---|---|
| File | `a-ember.html` | `b-canopy.html` |
| Colour | Warm paper, near-black ink, **one** red-orange accent `#C23A17` | Light sage page, deep-green accent `#1D5E47` |
| Type | Manrope (current font), heavy display headings, tight tracking | Instrument Sans, medium weight, calmer headings |
| Shape | 4 px corners, hairline rows, editorial | 10 px corners, pill buttons, card-based |
| Hero | Big headline + full-width photo + "What do you need?" router (5 numbered intents) | Photo with a white panel: headline + "find space" form (type, team size) + 3 facts |
| Body | Metrics row, numbered rows (Space, Infrastructure, Companies, Investment), dark campus band with the 7 buildings, available units, news | 4 intent cards, buildings bento, member companies, events on a dark band |
| Strength | Reads as an established institution; closest to the current product, so behaviour and page structure carry over directly | Task-first: the most common job (find space) starts on the home page |
| Risk | Heavy type can feel loud on long inner pages | Less like the current product; every inner page needs the card style rebuilt |

## DNA

| Current trait | A | B |
|---|---|---|
| Red-orange brand colour | Kept as the single accent | Replaced by deep green |
| Gradient overlays | Dropped | Dropped |
| Large editorial headings | Kept | Softened |
| Numbered intent rows | Kept | Replaced by intent cards |
| Aerial photo + dark campus band | Kept, CC0 photo | Dark band kept for events |
| "What do you need?" routing | Kept, under the hero | Kept as the hero form + intent cards |

Recommendation: **A**, because it keeps what the product already does well (routing by intent, editorial
voice) and removes what is broken (gradients, layered CSS, real-organisation content). Borrow B's "find
space" form for `office.html`.
