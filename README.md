# Sanketa roadmap

Website: https://sanketa-development.github.io/_roadmap/

Sanketa is the only project shown. The site has Overview, Tasks, Skills, Items, Worlds & scope,
and Updates, with a responsive red, bronze and gold design using the supplied
`bg0.jpg` and `site-background.jpg` Tantra artwork.

Overall and phase percentages show checked top-level tasks divided by total
top-level tasks, rounded to whole percentages. Counts remain visible; acceptance
gates and nested tasks stay separate. This is checklist progress, not a weighted
overall game-completion score.

The roadmap and its source documents are AES-256-GCM encrypted before publication.
PBKDF2-SHA-256 derives the key from the visitor's password with a random salt and
600000 iterations. The public repository contains no plaintext password or
separate password verifier. Decryption happens in the browser over HTTPS.

**Remember password** is optional and off by default. When enabled, it saves the
successful password in that browser's local storage and prefills the masked field
on return. It never unlocks automatically. Turning it off removes the saved value.
Use it only on a device you trust.

GitHub Pages is static hosting, so this is encrypted shared-password access rather
than server authentication. Password strength still matters. Older roadmap
snapshots were public and remain in Git history; this change does not revoke them.

## Update and publish

Editable content and source snapshots belong to private `_docs/roadmap` in the
main workspace. Refresh there, then run from this repository:

```powershell
node tools/seal-roadmap.mjs
```

Enter the agreed password at the hidden prompt. A custom private source JSON path
can be supplied as the first argument. Do not put passwords in files or arguments.
Only `assets/roadmap.enc.json` is written. Do not add plaintext source snapshots to
this public repository.

Run `node tools/check-roadmap.cjs` and `node tools/check-rendered-content.cjs` with
the password supplied at their hidden prompts. Push `main` to deploy through the
existing GitHub Actions Pages workflow. Only `index.html` and `assets/` deploy.
No npm packages, server, external scripts, or Jekyll build are required.

## Skills

Skills lists the current player catalog by Asura-Rakshasa, Naga-Kimnara,
Yaksha-Gandharva and Deva-Garuda. Each read-only checkbox sits beside its ID,
English name, description, tribe restrictions, rank/level, costs, timing and
prerequisites. Checks record confirmed implemented mechanics; partial and
unconfirmed entries remain open, with scope notes. They are not full rank/FX
parity or an overall completion percentage. Catalog content and status notes
remain encrypted; author them only in private `_docs/roadmap`.

Original skill icons sit to the left of each entry, preferring K2, then K3,
then Global when unavailable in earlier versions. Images are embedded in the
encrypted skill catalog and appear only after unlocking.

Completed skill names and checkboxes are green. The Skills status controls show
All, Done, or Not done; Not done includes partial and unconfirmed records.

## Items

Items appears directly below Skills. Main tabs include Weapons, Defense,
Accessories, Consumables, Premium and Pets. Each tab shows its complete list in
ascending item-ID order. Toggle one or more subtypes/equipment slots, handedness
and tribes above the list, or search by name/exact ID. Choices within each filter
match any selected value; filters combine to narrow the results. Unrestricted
items match every tribe. Reset filters restores the complete active tab.
Each entry shows its ID, Philippine name and available requirements/stack/base-price
information. Unknown categories stay under Other. The catalog remains encrypted.
