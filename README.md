# Simple Corona Map

A key issue in stopping Corona spread is avoiding areas where known virus carriers visited during the incubation period. To this end, health organizations are releasing place / date itineraries.

The code here is a very simple web map implementation that displays the data. The data source is a Google Sheet, so that it can edited and maintained by multiple users within a well known system (technically the source could be any CSV file with the spreadsheet format).

The resulting map is OpenStreetMap based and desktop / mobile friendly.

## Running the code
1. Use GitHub's fork option to create your own repository
2. Make sure to activate GitHub Pages in the new repository (Settings > GitHub Pages > Set Master branch as source)
3. In `config.js`, change `SHEETS_URL` to your Sheet (see below)

## Entering data
1. Go to the [sample sheet](https://docs.google.com/spreadsheets/d/16plDImzkt28tl3o92sV5EigG4GPgcR_3i8ybW9fKwTY/edit?usp=sharing)
2. File > Make a copy
3. File > Publish to the web
4. Select "Comma Separated Values (.csv)"
5. Click "Publish"
6. Copy the URL into `config.js` as the `SHEETS_URL` value
7. Fill in data. The required values are `lat`, `lon` and `last_visit_date`. `patient_id` and `text` are optional.
