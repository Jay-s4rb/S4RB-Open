# Date Table
Currently hosted at [https://datetable.blogjono.com/](https://datetable.blogjono.com/Year)

See ```deploy.md``` for instructions on cloning to a virtual machine.

## What is it
it's a quick single page app, made with the vuetify frame work.
it makes use of the vue-router to when toggling the what to view data 'by month', 'by quarter', 'by year'.

## Where the logic
the logic for filling in the blank dates is within table.js

## Install and start
```
npm install
npm run dev
```

## Tests
```bash
npm run jest
```
I also set up a .vscode/launch.json for debugging tests as they run through vscode.

## vue-charts
pinned on chart view next to the table, will help in comparisons of "Complaints per Unit"

