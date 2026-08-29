# QTSC Responsive Strategy

## Content breakpoints

| Range | Composition decision |
|---|---|
| Base / under 700px | One-column reading order; task launcher list; proof rows; hidden nonessential hero proof; mobile accordion navigation |
| 700px+ | Two-column editorial introductions; five-column proof; three decision panels; two-column final handoff |
| 1024px+ | Hero copy + proof; capability split; immersive campus; three-column current-signals layout |
| 1080px and under | Global navigation moves to the mobile menu before long Vietnamese labels collide |
| 1320px+ | Content reaches maximum width; density increases without stretching text lines |

## Interaction rules

- Primary touch targets are at least 44px high.
- Mobile navigation uses six accordions and preserves visible close/connect actions.
- Hover is enhancement only; links and controls remain operable without it.
- Search/contact overlays trap focus, close with Escape and return focus to the opener.
- Reduced-motion mode removes reveal dependency and smooth scrolling.
- The viewport includes `viewport-fit=cover`; the header accounts for safe-area inset on narrow screens.

## Image rules

- Hero image has explicit dimensions, eager priority and a stable crop.
- Supporting imagery is lazy-loaded with dimensions and asynchronous decoding.
- Mobile crops prioritise recognisable campus context rather than tiny spatial details.

## Verification matrix

| Check | Status |
|---|---|
| CSS structure and balanced braces | Pass |
| One H1 and seven Home sections | Pass |
| Internal Home link targets exist | Pass |
| JavaScript syntax | Pass |
| 320/375/414/768/1024/1440 rendered screenshots | Not run in this environment |
| Keyboard and screen-reader manual test | Not run |
| 200% zoom/high-contrast test | Not run |

