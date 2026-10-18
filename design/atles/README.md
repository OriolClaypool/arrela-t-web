# Atles del camp català — data

Per-comarca figures of the primary sector, for the `/atles` page (batch 5) and for content (Instagram slides and 3D reels are made in the Atles tool on claude.ai, not on the site).

`comarques.json` holds the 43 comarques with the 2025 boundaries (the Lluçanès and the Moianès included) and a `catalunya` row with the totals. It is the same data the Atles tool uses.

## Fields

| Field | What it is | Unit | Year |
|---|---|---|---|
| `nom` | Comarca name, exactly as in `public/data/catalunya-comarques.min.json` | | |
| `expl99`, `expl09`, `expl20` | Agricultural holdings (explotacions agràries) | count | 1999, 2009, 2020 |
| `var0920`, `var9920` | Change in the number of holdings | % | 2009–2020, 1999–2020 |
| `dens` | Holdings per 100 km² | count | 2020 |
| `sau20` | Utilised agricultural area (SAU) | ha | 2020 |
| `sau_pct` | SAU as a share of the comarca's area | % | 2020 |
| `ur20` | Livestock units (unitats ramaderes) | UR | 2020 |
| `ur_ha` | Livestock units per hectare of SAU | UR/ha | 2020 |
| `c65_09`, `c65_20` | Holding managers (caps d'explotació) aged 65 or more | % | 2009, 2020 |
| `m35_20` | Holding managers under 35 | % | 2020 |
| `ecol`, `ecol_pct` | Holdings with organic farming, count and share | count, % | 2020 |
| `pob` | Population (padró continu, 1 January) | people | 2025 |
| `sup` | Area | km² | 2025 |

## Sources

Idescat, from the INE agricultural census, comarca tables:
[holdings and SAU 2020](https://www.idescat.cat/pub/?id=censag&n=16057&by=com) ·
[2009](https://www.idescat.cat/pub/?id=censag&n=5172&by=com) ·
[1999](https://www.idescat.cat/pub/?id=censag&n=102&by=com) ·
[age 2020](https://www.idescat.cat/pub/?id=censag&n=16120&by=com) ·
[age 2009](https://www.idescat.cat/pub/?id=censag&n=5214&by=com) ·
[organic farming](https://www.idescat.cat/pub/?id=censag&n=16080&by=com) ·
[livestock units](https://www.idescat.cat/pub/?id=censag&n=16103&by=com).
Population and area: Idescat (padró continu, 1 January 2025).

## Read with care

- **The 2020 census counts fewer small holdings by design.** It raised the minimum for a holding to count (5 ha of SAU or 1.7 livestock units, among other minimums), so part of the 2009–2020 drop is a change of method, not of reality. Every comparison between census years must say so.
- **Age is the manager's, not the owner's.** The 2020 comarca tables give the age of the "cap d'explotació" (the person who runs the holding day to day). Idescat does not publish the owner's (titular's) age by comarca for 2020.
- **2025 boundaries in every year.** The Lluçanès (2023) and the Moianès (2015) did not exist in some census years: their figures are rebuilt by adding their municipalities from Idescat's municipal tables, and the comarques they came from are corrected accordingly. Biosca and Torà moved from the Segarra to the Solsonès in 2023, so they count in the Solsonès in every year. Because of this, the Osona, Bages, Vallès Oriental, Segarra and Solsonès figures differ from Idescat's comarca tables, which use each census's boundaries (for example, the Solsonès has 805 holdings in 2020 here and 607 in Idescat's table). Sant Feliu Sasserra joined the Lluçanès in May 2023 and went back to the Bages in July 2023, so it stays in the Bages.
- The Lluçanès has 291 holdings in both 1999 and 2009. It is not a copy: the sum of its eight municipalities happens to be the same (1999: 6 + 39 + 50 + 96 + 35 + 28 + 24 + 13; 2009: 6 + 37 + 56 + 93 + 28 + 32 + 29 + 10).
- Small comarques (Barcelonès, Val d'Aran, Alta Ribagorça) have very few holdings, so their percentages swing a lot with a handful of farms.
