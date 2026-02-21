# Vertex Technology Partners — Company site

Multi-page static site for an IT & AI consulting company. No build step.

## Run locally

Serve the folder so links work correctly:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

Then open `http://localhost:8080`. (Opening `index.html` directly may break relative links in some environments.)

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, trust strip, services preview, approach preview, work preview, testimonials, CTA |
| Services | `services.html` | Full service offerings: strategy, AI & digital, implementation, security, support |
| Approach | `approach.html` | How we work, principles, engagement flow |
| Work | `work.html` | Case studies with detailed write-ups |
| About | `about.html` | Mission, values, **team members** (names, roles, bios) |
| Clients | `clients.html` | Industries we serve, testimonials |
| Contact | `contact.html` | Contact form and email |

## Structure

- **styles.css** — Global styles, page hero, content sections, team grid, animations
- **script.js** — Mobile menu, scroll animations, form submit, parallax, body loaded

## Customize

- Replace "Vertex" and team names with your company and people.
- Point the contact form to your backend or Formspree/Netlify Forms.
- Add real team photos by replacing `.team-card-avatar span` with an `<img>` and styling.
