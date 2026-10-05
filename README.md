# 传统节日

A reusable reference library for traditional Chinese festivals.

## Structure
- `data/festivals.json` — lightweight catalog/index
- one detailed JSON file per festival under `data/`
- `src/jieri-engine.js` — reusable catalog/detail loader
- `index.html` — responsive reference reader

## Scope
This site is a cultural reference library only. It does not calculate each year's actual festival dates. Lunar-date conversion belongs in `nongli`; solar-term timing belongs in `jieqi`.

The content distinguishes broad traditions from regional practices and avoids treating one legend or one local custom as the only origin of a festival.
