# PrusaLink Card

DISCLAIMER: This is all AI-generated to this point to get me something to start and learn - so not worth downloading right now :)

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
```

## Usage

```yaml
type: custom:prusalink-card
entity: sensor.completeness
title: Prusa CORE One
extra_info: Test
temperature:
  nozzle:
    decimals: 0
    icon: mdi:printer-3d-nozzle-heat-outline
    actual: sensor.nozzle_is
    target: sensor.nozzle_target
  bed:
    decimals: 0
    icon: mdi:artboard
    actual: sensor.bed_is
    target: sensor.bed_target
fan:
  hotend: sensor.fan1
  enclosure: sensor.fan2
```