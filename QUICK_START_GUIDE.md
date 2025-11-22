# Quick Start Guide - But-For Damages Analyzer v1.1

## Getting Started

### First Time Setup
```bash
cd butfor-damages-analyzer
./setup.sh
```

### Running the Application
```bash
./run.sh
```

Then open: **http://localhost:5001**

---

## New Features Guide (v1.1)

### 1. Using the Tabbed View

**The Problem Before:** Both tables were shown at once, requiring lots of scrolling.

**The Solution:** Clean tabbed interface!

#### How to Use Tabs:

1. **Click "Compute"** to run your calculation

2. **Click on tabs to switch views:**
   - 📊 **Pre-Injury Table** - Shows incident date to report date
   - 📈 **Post-Injury Table** - Shows report date to retirement
   - 📉 **All Years** - Shows complete schedule

3. **What You See:**
   - Only ONE table visible at a time
   - Active tab highlighted in blue
   - Cleaner, focused view of data
   - Less scrolling needed

**Pro Tip:** Use Pre-Injury tab for past damages review, Post-Injury for future damages analysis.

---

### 2. Exporting to Excel/CSV

**The Problem Before:** CSV had raw numbers without decimal formatting.

**The Solution:** Professional CSV formatting ready for spreadsheets!

#### How to Export CSV:

1. **Run your calculation** (click "Compute")

2. **Click "Export CSV"** button

3. **Open in Excel or Google Sheets**

#### What You Get:

**CSV Format:**
```
Year,Age,Yr Portion,BF Gross,BF Adjusted x AEF,BF Fringe,...
2023,33.00,0.500,32500.00,26195.00,6500.00,...
2024,34.00,1.000,66950.00,53975.90,13390.00,...
```

**Key Features:**
- ✅ All currency formatted to 2 decimal places
- ✅ No $ symbols (clean numbers for formulas)
- ✅ No commas (Excel-ready)
- ✅ Proper headers
- ✅ Year, age, and portion properly formatted

**In Excel:**
- Numbers automatically recognized
- Use SUM(), AVERAGE(), etc. immediately
- Create charts and graphs
- Apply custom formatting

---

## Complete Workflow Example

### Scenario: Analyzing Carmen Ramirez Case

**Step 1: Create Profile**
```
1. Enter "Ramirez, Carmen" in Profile Name
2. Click "Save/Update"
```

**Step 2: Enter Case Data**
```
Case Name: Ramirez v. XYZ Corp
Case Type: Personal Injury
DOB: 1990-01-15
Incident Date: 2023-06-20
Report Date: 2025-01-15
```

**Step 3: Life Expectancy Data**
```
Work-Life Expectancy: 24.50 years
Years to Final Separation: 29.50 years
Life Expectancy: 41.20 years
```

**Step 4: But-For Earnings**
```
Base Annual Earnings: $65,000
Fringe %: 20%
Annual Growth %: 3%
```

**Step 5: Configure AEF**
```
Apply AEF: On (Tinari-style)
Unemployment Rate: 3.5%
Unemployment Reimbursement: 30%
Federal Tax: 22%
State Tax: 5%
```

**Step 6: Mitigation**
```
Actual Earnings Start: 2024-01-01
Mitigation Annual: $22,000
Mitigation Growth: 2%
Mitigation Fringe: 10%
```

**Step 7: Discounting**
```
Method: Net Discount Rate
NDR: 1.5%
```

**Step 8: Run Calculation**
```
Click "Compute" button
```

**Step 9: Review Results**

**View Summary Cards:**
- Total Damages (PV)
- Past Damages
- Future Damages (PV)
- Ages at key dates

**Review Tables:**
- Click **"Pre-Injury Table"** tab
  - Review past damages year-by-year
  - Check age at incident
  - Verify earnings calculations

- Click **"Post-Injury Table"** tab
  - Review future damages
  - Check mitigation offset
  - Verify PV calculations

- Click **"All Years"** tab
  - See complete schedule
  - Verify continuity
  - Check totals

**Step 10: Export Results**

**For Spreadsheet Analysis:**
```
Click "Export CSV"
Open in Excel
Create charts, run formulas
```

**For Documentation:**
```
Click "Save JSON"
Stores all assumptions
Reproducible results
Attach to report
```

**For Printing:**
```
Click on desired tab (Pre/Post/All)
Click "Print" button
Print current view
```

---

## Tips & Tricks

### Tab Usage

**For Court Reports:**
1. Print Pre-Injury tab for past damages exhibit
2. Print Post-Injury tab for future damages exhibit
3. Attach CSV for detailed breakdown

**For Client Presentations:**
1. Show "All Years" for big picture
2. Switch to Pre-Injury for historical review
3. Switch to Post-Injury for future projections

**For Peer Review:**
1. Export JSON for exact assumptions
2. Export CSV for independent verification
3. Share both files with expert

### CSV Power Users

**In Excel:**
```
1. Import CSV
2. Select currency columns
3. Format as Currency (Ctrl+Shift+$)
4. Create PivotTable for summaries
5. Create charts for visualization
```

**Formulas You Can Use:**
- `=SUM(D2:D30)` - Total BF Gross
- `=AVERAGE(E2:E30)` - Average BF Adjusted
- `=I2+J2` - Total loss with interest
- Create your own custom calculations!

---

## Keyboard Shortcuts

- **Ctrl/Cmd + P** - Print current view
- **Tab** - Navigate between fields
- **Enter** - Submit form (in case name field)

---

## Common Questions

**Q: Can I switch tabs before computing?**
A: Tabs only work after clicking "Compute" to generate results.

**Q: Which tab should I use for reports?**
A: Use Pre-Injury for past damages, Post-Injury for future damages, or All Years for complete view.

**Q: Why doesn't my CSV have $ symbols?**
A: Clean numbers work better in spreadsheets. Apply currency formatting in Excel.

**Q: Can I export just one tab?**
A: CSV currently exports all years. Use Excel to filter to desired period.

**Q: Do tabs affect calculations?**
A: No, tabs are just different views of the same data. All calculations are identical.

---

## Troubleshooting

**Tabs not working?**
- Make sure you clicked "Compute" first
- Check that results loaded (look at summary cards)
- Refresh page if needed

**CSV not opening in Excel?**
- Make sure file saved as .csv
- Try "Open with Excel" if double-click doesn't work
- Check Excel is default for .csv files

**Numbers look wrong in CSV?**
- Numbers are correct, just need formatting
- In Excel: Select columns → Format → Currency
- Decimal places are already correct (2 places)

---

## What's Next?

After mastering the basics:

1. **Try Different Scenarios**
   - Duplicate profiles for sensitivity analysis
   - Change discount rates
   - Adjust AEF parameters

2. **Build a Library**
   - Save multiple cases per evaluee
   - Export all profiles for backup
   - Import on other computers

3. **Advanced Analysis**
   - Export CSV to Excel
   - Create custom charts
   - Build dashboards
   - Compare multiple scenarios

4. **Professional Reports**
   - Print each tab separately
   - Include CSV as exhibit
   - Attach JSON for reproducibility
   - Document all assumptions

---

## Support

**Documentation:**
- README.md - Complete feature guide
- BACKEND_README.md - API documentation
- CHANGELOG.md - Version history
- PROJECT_SUMMARY.md - Technical overview

**Quick Help:**
- Check server is running: http://localhost:5001/api/stats
- View all evaluees: http://localhost:5001/api/evaluees
- Restart server: `./run.sh`

---

**Happy Calculating! 📊**

Version 1.1 | November 2025
