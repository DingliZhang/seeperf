# SeePerf — Benchmark Comparison

A static, English-only frontend. Open `index.html` in your browser; no build step or backend is required. Uploaded files are parsed locally in the current browser tab and are never sent to a server. The built-in demo compares 24 matching JMH measurements each from `a.txt` and `b.txt` (StringCompareToDifferentLength).

All files needed for the site are in this folder: `index.html`, `app.js`, and `styles.css`. Keep them together and put `index.html` at the root when publishing this project. The included demo loads automatically; your own data files are not stored between visits.

## Compare two runs from the clipboard

1. Under **Datasets**, click the **Baseline** card (`a` in the demo). Select all the text in the editor, paste the JMH results from before your change, and click **Apply data**.
2. Click the **Variant** card (`b` in the demo). Replace its text with the results from after your change and click **Apply data**. The charts and the **Measurements** table update automatically.

## Using the tool

1. Click **Add data files** or drag in one to three `.txt`, `.csv`, or `.json` files. Or click an empty dataset slot to paste a new dataset. The first file upload or newly pasted dataset replaces the demo.
2. Click a dataset card to paste replacement JMH TXT, CSV, or JSON results. Apply updates only that dataset in the current page and recalculates the comparison; it does not modify local files or save data between page reloads. Invalid data leaves the dataset unchanged. Pasted datasets without filenames are named **base** for the first baseline and **variant 1** / **variant 2** for later datasets. With one dataset, inspect raw scores. With two or three datasets, results match by Benchmark, Mode, and all parameters. The first dataset is the default baseline; click **Set as baseline** on another dataset to change it.
3. Compare the change `(variant − baseline) / |baseline| × 100%` in grouped charts. The table includes the original Score and JMH Error. Filter the view, export the displayed rows to CSV, or print the report as a PDF from your browser.

## Supported formats

- **JMH TXT:** Standard tabular JMH output such as `Benchmark (size) Mode Cnt Score Error Units`, including multiple parameters and optional `±` error values.
- **JMH CSV:** Standard columns such as `Benchmark,Mode,...,Score,Score Error (99.9%),Unit,Param: size`. A simplified `method,size,score,error,unit` file also works.
- **JMH JSON:** An array of JMH results with `benchmark`, `params`, `mode`, and `primaryMetric` fields. Simplified arrays and `{ "results": [...] }` are also supported.

You can upload at most three files, each up to 8 MB. If a file contains repeated Benchmark + Mode + parameter keys, the last record is kept. Scores with mismatched units are displayed but not compared; neither are zero baseline scores. Lower is faster for `avgt` / `sample` / `ss`, while higher is faster for `thrpt`. In comparisons, green bars mean improvement and coral bars mean regression (independent of method); labels sit beside bar ends. Unchanged values and unrecognized performance directions are not assigned a comparison color. With one dataset, neutral bars show raw scores. Charts show point estimates only—**they do not establish statistical significance**.
