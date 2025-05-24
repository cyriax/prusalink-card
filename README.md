# PrusaLink Card

A simple Lovelace card to show PrusaLink data via a Home Assistant entity.

![screenshot](https://via.placeholder.com/600x200?text=PrusaLink+Card)

## Installation via HACS

1. Go to HACS → Frontend → Custom Repositories
2. Add `https://github.com/cyriax/prusalink-card` as a **Lovelace** type
3. Install the card and reload resources

## Manual Installation

1. Download `prusalink-card.js`
2. Place it in `config/www/`
3. Add to `configuration.yaml` or via UI:

```yaml
resources:
  - url: /local/prusalink-card.js
    type: module
