# But-For Damages Analyzer - Changelog

## Version 1.5 - November 6, 2025

### New Features

#### 10. Word Document Export 📄

**The Need:** Export damage schedules to professional Word documents for inclusion in expert reports, court filings, and client presentations.

**The Solution:** One-click export to landscape-formatted Word documents (.docx) with properly sized tables!

##### What's New:

1. **Export Word Button**
   - New "Export Word" button in Actions section
   - Located next to "Export CSV" button
   - One click to generate professional Word document

2. **Landscape Format**
   - Documents automatically formatted in landscape orientation (11" × 8.5")
   - Optimized for wide tables with many columns
   - 0.5" margins on all sides
   - Professional appearance for reports

3. **Smart Table Layout**
   - Column widths automatically calculated to fit page
   - Available width (10 inches) divided evenly across columns
   - Font sizes optimized for readability:
     - Title: 16pt bold
     - Headers: 9pt bold
     - Data: 8pt
   - Ensures all columns fit without overflow

4. **Two-Table Structure**
   - **Pre-Injury Period**: Incident to Report date
   - **Post-Injury Period**: Report date to Retirement
   - Each table clearly labeled with period description
   - Matches the tabbed views in the application

5. **Automatic Summary Section**
   - Case name at top
   - Report generation date
   - Summary totals:
     - Total Present Value
     - Past Damages
     - Future PV

6. **Conditional Columns**
   - Past+Int column only included when prejudgment interest is enabled
   - Matches the current application settings
   - Cleaner output when interest not applicable

7. **Professional Formatting**
   - Currency values with $ and comma separators
   - 3 decimal places for year portions
   - 2 decimal places for all monetary values
   - Table styling: "Light Grid Accent 1"

##### How to Use:

1. Enter your case data and click "Compute"
2. Click "Export Word" button
3. Word document automatically downloads
4. Filename format: `damages_report_[CaseName]_[Date].docx`
5. Open in Microsoft Word or compatible editor

##### Use Cases:

- **Expert Reports**: Drop tables directly into your report
- **Court Filings**: Professional formatting for legal submissions
- **Client Presentations**: Share clean, readable damage schedules
- **Mediation**: Print copies for negotiation sessions
- **Documentation**: Archive calculations in standard format

##### Technical Details:

- Backend endpoint: `/api/export/word` (POST)
- Uses python-docx library
- Returns .docx file for download
- Compatible with Microsoft Word 2007+
- Works with Google Docs, LibreOffice, etc.

---

#### 9. Discount Method Default Changed to Nominal 🔄

**The Change:** Default discount method changed from NDR to Nominal.

**Why:**
- Nominal discounting (discount at rate r, grow at rate g) is the most common method in forensic economics
- Provides more transparency with separate discount and growth rates
- Easier for courts to understand and review

**What's New:**
- Default discount method is now "Nominal: discount r, grow g"
- NDR and Real methods still available in dropdown
- All existing calculations and profiles unchanged

---

#### 8. Optional Discounting - State-Based Toggle ⚖️

**The Need:** Some states prohibit or don't require discounting of future damages. Forensic economists need the ability to turn off discounting entirely.

**The Solution:** Add a toggle checkbox to enable/disable discounting completely!

##### What's New:

1. **Discounting On/Off Checkbox**
   - New checkbox at top of Discounting section
   - "Apply discounting to future damages" - checked by default
   - Uncheck to disable all discounting

2. **Visual Feedback**
   - Checked: Discount controls enabled (normal opacity)
   - Unchecked: Warning message appears in yellow
   - Unchecked: Discount controls grayed out (disabled)
   - Clear indication of current state

3. **Smart Calculation**
   - When ON: Future damages discounted to present value (standard)
   - When OFF: Future damages shown at nominal (undiscounted) values
   - PV(Future) = Future when discounting is off
   - Total PV reflects undiscounted future damages

4. **Profile Integration**
   - Saves with your profiles
   - Restores when loading profiles
   - Exports in JSON with assumptions
   - Default: ON (discounting applied)

##### How It Works:

**Discounting ENABLED (default):**
```
☑ Apply discounting to future damages

Discount Method: Nominal
Discount Rate r: 5%
Growth for Discount Model g: 3%

Future damages = discounted to present value
PV(Future) < Future (standard present value)
```

**Discounting DISABLED:**
```
☐ Apply discounting to future damages

⚠️ Discounting is OFF - future damages will not be discounted to present value

(Discount controls grayed out)

Future damages = nominal (undiscounted) values
PV(Future) = Future (no discounting applied)
```

##### Use Cases:

✅ **States that Prohibit Discounting**
- Some jurisdictions don't allow future damage discounting
- Simply uncheck the box
- Future damages shown at full nominal value

✅ **Comparative Analysis**
- Show client both scenarios
- "With discounting: $450K, Without discounting: $620K"
- Demonstrate impact of discounting

✅ **Settlement Discussions**
- Defense wants to see undiscounted damages
- Plaintiff wants maximum recovery
- Show both versions easily

✅ **State Law Compliance**
- Check your state's requirements
- Toggle on/off based on jurisdiction
- Document which method was used

##### Example:

**Case:** Future damages = $100,000 per year for 10 years

**With Discounting (5% rate):**
- Total PV: $772,173 (discounted to present value)

**Without Discounting:**
- Total PV: $1,000,000 (full nominal value)

**Difference:** $227,827 (impact of discounting)

##### Technical Implementation:

- Lines 170-180: Added checkbox and status message
- Lines 409-425: Toggle function and event listener
- Lines 590-602: Updated calculation logic
- Lines 490-496: Save/restore with profiles
- Line 506: Included in assumptions export

---

## Version 1.4 - November 6, 2025

### New Features

#### 7. Sensitivity Analysis - Automatic Rate Variations with Full Year-Over-Year Tables 📊

**The Need:** Forensic economists often need to show a range of damages based on different rate assumptions to account for uncertainty, with complete year-by-year detail for each scenario.

**The Solution:** Automatic sensitivity analysis with ±3 percentage point variations for discount and growth rates, plus full year-over-year schedules for all 49 scenarios!

##### What's New:

1. **Automatic Calculation**
   - Runs automatically on every compute
   - Tests 7×7 = 49 combinations of rates
   - Range: -3%, -2%, -1%, 0%, +1%, +2%, +3% from base
   - Stores FULL year-over-year schedules for each scenario

2. **Interactive Summary Matrix**
   - Fourth tab in the main interface
   - Matrix table showing Total PV for all rate combinations
   - **Clickable cells** - click any cell to view full year-over-year table
   - Rows = Discount rate variations
   - Columns = Growth rate variations
   - Base case highlighted with blue border

3. **Detailed Scenario View**
   - Click any matrix cell to see complete year-by-year table
   - Shows all columns: Year, Age, BF Gross, ACT Earn, Loss, Past, Future, PV, etc.
   - Displays scenario's discount and growth rates at top
   - Shows Total PV, Past, and Future breakdown
   - "Back to Summary Matrix" button to return

4. **Smart Rate Detection**
   - **NDR Method**: Varies NDR and growth rate separately
   - **Real Method**: Varies discount rate only (no growth)
   - **Nominal Method**: Varies discount and growth rates

5. **Complete CSV Export**
   - All 49 full year-over-year schedules appended to CSV
   - Each scenario clearly labeled with its rates
   - Shows totals for each scenario
   - Easy to import into Excel/Google Sheets
   - Comprehensive data for all rate combinations

##### How to Use:

```
1. Enter your case data as normal
2. Click "Compute"
3. Click "Sensitivity Analysis" tab
4. Review the summary matrix (7×7 grid of Total PV damages)
5. Click ANY cell to see the full year-over-year table for that scenario
6. Review complete damage schedule with chosen rates
7. Click "← Back to Summary Matrix" to return
8. Export CSV to get main schedule + all 49 full scenario schedules
```

##### Example Output:

**Summary Matrix (7×7 grid - clickable):**
```
Discount Rate ↓ / Growth Rate →
             -1.0%   -0.5%    0.0%    0.5%    1.0%    1.5%    2.0%
-1.0%       $420K   $415K    $410K   $405K   $400K   $395K   $390K
-0.5%       $435K   $430K    $425K   $420K   $415K   $410K   $405K
 0.0%       $450K   $445K   [$440K]  $435K   $430K   $425K   $420K
 0.5%       $465K   $460K    $455K   $450K   $445K   $440K   $435K
 1.0%       $480K   $475K    $470K   $465K   $460K   $455K   $450K
```
[Base case shown in brackets - Click any cell to see full year-over-year table]

**Detailed View (after clicking a cell):**
```
Scenario: 2.0% Discount, 1.0% Growth
Total PV: $460,234 | Past: $125,678 | Future PV: $334,556

Year  Age    Portion  BF Gross  BF Adj   BF Fringe  ACT Earn  Loss    Past    Future   PV
2023  33.50  1.000    65000     52390    13000      22000     43390   43390   0        0
2024  34.50  1.000    66950     53975    13390      22440     44925   44925   0        0
2025  35.50  1.000    68959     55594    13792      22891     46495   0       46495    44285
...
(Full year-by-year schedule for this specific rate combination)
```

##### Use Cases:

✅ **Court Presentations**: Show range of reasonable damages
✅ **Settlement Negotiations**: Provide high/low scenarios
✅ **Expert Reports**: Document sensitivity to rate assumptions
✅ **Client Consultation**: Explain potential outcomes
✅ **Opposing Expert Rebuttal**: Compare different rate choices

##### Technical Details:

**Files Modified:**
- `static/index.html`
  - Lines 539-617: Sensitivity calculation engine
  - Lines 696-774: Sensitivity table rendering
  - Lines 243: New tab button
  - Lines 277-286: New tab view
  - Lines 817-824: Auto-run on compute
  - Lines 883-909: CSV export with sensitivity

**Performance:**
- Calculates 49 scenarios in <100ms
- No noticeable delay on compute
- Cached in `window.__SENSITIVITY__`

---

#### 6. Conditional Past+Int Column 👁️

**The Problem:** When prejudgment interest is not applied, the Past+Int column was identical to the Past column, causing confusion.

**The Solution:** Hide the Past+Int column when prejudgment interest is disabled!

##### What's New:

1. **Dynamic Column Display**
   - Past+Int column only shows when prejudgment interest is enabled
   - Automatically hides when checkbox is unchecked
   - Applies to all three table views (Pre, Post, All Years)

2. **CSV Export Updated**
   - Past+Int column excluded from CSV when not used
   - Cleaner export with only relevant columns
   - Matches what you see in the UI

3. **Instant Updates**
   - Toggle prejudgment interest checkbox
   - Columns update immediately on next compute
   - No need to reload or refresh

##### How It Works:

**Prejudgment Interest UNCHECKED:**
```
Columns: Year | Age | ... | Loss | Past | Future | PV(Future)
(No Past+Int column)
```

**Prejudgment Interest CHECKED:**
```
Columns: Year | Age | ... | Loss | Past | Past+Int | Future | PV(Future)
(Past+Int column appears)
```

##### Technical Implementation:

- Conditional column rendering in `renderTables()` function
- CSV export checks `A.options.applyPastInterest` flag
- Dynamic header and data array construction

---

## Version 1.3 - November 5, 2025

### New Features

#### 5. Enhanced Prejudgment Interest Toggle 💡

**The Feature:** Prejudgment interest has always been optional, but now it's more visible and clear!

##### What's New:

1. **Highlighted Checkbox**
   - Checkbox now has visual emphasis with border and background
   - Bold label: "Apply prejudgment interest to past damages"
   - Stands out in the Discounting section

2. **Real-Time Status Indicator**
   - Green status bar appears when checkbox is checked
   - Shows: "✓ Prejudgment interest will be applied to past damages"
   - Immediate visual confirmation of your choice

3. **How It Works**
   - **Unchecked** (default): Past damages shown as-is (no interest)
   - **Checked**: Past damages accrue interest from midpoint to report date
   - Uses the discount rate from your selected method
   - Interest rate automatically matches discount method:
     - NDR method: uses NDR + growth rate
     - Real/Nominal methods: uses discount rate

##### Use Cases:

✅ **Default (No Interest)**: Most conservative approach
✅ **With Interest**: When local jurisdiction allows/requires prejudgment interest
✅ **Scenario Analysis**: Compare with and without interest

##### Technical Notes:

- Saves with profiles (remembers your choice)
- Updates in real-time when toggled
- Visual feedback makes it clear which option is active
- Already existed in v1.0-1.2, just made more visible!

---

#### 4. Manual Year-by-Year Earnings Editing ✏️

**The Problem:** Offset earnings don't always follow a simple growth pattern. Real-world scenarios include multiple jobs, unemployment periods, varying hours, or seasonal work.

**The Solution:** Click-to-edit functionality for individual years!

##### What's New:

1. **Edit Mode Toggle**
   - Button in toolbar: `✏️ Enable Edit Mode`
   - Turns green when active: `✅ Disable Edit Mode`
   - Status message shows when editing is enabled

2. **Clickable Table Cells**
   - ACT Earn and ACT Fringe columns become editable
   - Hover shows blue outline
   - Click to convert to input field
   - Press Enter to save, Escape to cancel

3. **Visual Indicators**
   - 🟡 **Yellow cells** = Manually edited
   - Bold text for edited values
   - Tooltips show edit status
   - Visible even when Edit Mode is OFF

4. **Smart Calculations**
   - Manual overrides take precedence
   - Automatic calculations for non-edited years
   - Fringe benefits update with earnings
   - All dependent values recalculate instantly

5. **Persistent Storage**
   - Manual edits save with profile
   - Restore when loading profile
   - Export in JSON with assumptions
   - Survives page refresh

6. **Clear All Overrides**
   - `🗑️ Clear All Overrides` button appears when edits exist
   - One-click reset to automatic calculations
   - Confirmation before clearing

##### How to Use:

```
1. Enter case data and run Compute
2. Click "✏️ Enable Edit Mode" in toolbar
3. Click any ACT Earn cell in the table
4. Type new amount (e.g., 28500.75)
5. Press Enter or click outside to save
6. Cell turns yellow = saved!
7. Calculations update automatically
```

##### Use Cases Solved:

✅ **Multiple Jobs**
- Different employers each year
- Varying pay rates
- Job gaps and transitions

✅ **Part-Time/Variable Hours**
- Hours changed throughout period
- Seasonal work patterns
- Reduced capacity periods

✅ **Unemployment Periods**
- Unemployment benefits some years
- Zero earnings other years
- Partial year employment

✅ **Complex Earnings History**
- Bonuses one year only
- Salary changes mid-case
- Settlement payments
- Any non-linear pattern

##### Technical Implementation:

**Files Modified:**
- `static/index.html`
  - Lines 47-51: Added CSS for editable cells
  - Lines 220-222: Added toolbar buttons
  - Lines 287-308: Manual override data system
  - Lines 492-498: Override check in calculations
  - Lines 523-606: Enhanced table rendering with edit capability
  - Lines 621-628: Clear button visibility logic
  - Lines 673-695: Edit mode toggle handlers

**Features:**
- In-memory override storage
- Real-time UI updates
- Profile integration
- JSON export/import support
- Keyboard shortcuts (Enter/Escape)
- Visual feedback system

**Documentation:** See [MANUAL_EARNINGS_EDIT_GUIDE.md](MANUAL_EARNINGS_EDIT_GUIDE.md) for complete guide with examples.

---

## Version 1.2 - November 5, 2025

### New Features

#### 3. Enhanced Past Earnings Offset Support 📋

**The Problem:** Users weren't sure if they could enter offset earnings for past periods (between incident and report date).

**The Solution:** Clear UI with real-time visual feedback!

##### What's New:

1. **Renamed Section**: "Mitigation" → "Mitigation / Offset Earnings"
   - Makes purpose crystal clear
   - Shows it handles both past and future offsets

2. **Real-Time Offset Period Display**
   - Info box shows exactly when offset applies
   - Color-coded indicators:
     - 🟡 **Yellow**: Past offset (incident to report) - reduces past damages
     - 🟢 **Green**: Future offset (report to retirement) - reduces future damages
     - 🔴 **Red**: Error (start before incident) - invalid!

3. **Helpful Instructions**
   - "For Past Earnings: Set start date between incident and report date"
   - "For Future Earnings: Set start date at or after report date"
   - Clear explanation of how offset is calculated

4. **Automatic Validation**
   - Detects if start date is before incident (error)
   - Shows exact offset period with dates
   - Updates in real-time as you type

##### Example Display:

**Past Offset (Yellow):**
```
⚠️ PAST OFFSET from January 1, 2024 to January 15, 2025 (reduces past damages)
```

**Future Offset (Green):**
```
✓ FUTURE OFFSET from February 1, 2025 to retirement (reduces future damages)
```

**Error (Red):**
```
❌ ERROR Start date is before incident date
```

##### Use Cases Solved:

✅ **Return to Work During Claims**
- Plaintiff returned to work before report date
- Need to offset those past earnings

✅ **Part-Time Work While Injured**
- Plaintiff worked reduced hours
- Offset the part-time earnings

✅ **Different Job Post-Injury**
- New job at lower pay during claims period
- Offset the new earnings

##### How to Use:

1. Enter incident date and report date
2. Go to "Mitigation / Offset Earnings" section
3. Enter "Actual Earnings Start Date" (can be in the past!)
4. Watch the info box for visual confirmation
5. Enter earnings amount, growth %, fringe %
6. Run calculation
7. Check Pre-Injury tab to see offset applied

**Documentation:** See [PAST_EARNINGS_OFFSET_GUIDE.md](PAST_EARNINGS_OFFSET_GUIDE.md) for complete guide with examples.

---

## Version 1.1 - November 5, 2025

### New Features

#### 1. Tabbed Table View ✨
- **Pre-Injury Tab**: Shows only the pre-injury period (Incident to Report Date)
- **Post-Injury Tab**: Shows only the post-injury period (Report Date to Retirement)
- **All Years Tab**: Shows complete schedule with all years combined

**How to Use:**
- Click on the tab buttons above the tables to switch between views
- Default view is "Pre-Injury" table
- Only one table is visible at a time for cleaner presentation
- Active tab is highlighted with blue gradient

**Benefits:**
- Cleaner interface - focus on one period at a time
- Easier to review specific time periods
- Better for presentations and reports
- Faster scrolling through data

#### 2. CSV Export with Currency Formatting 💰
- CSV files now export with proper decimal formatting
- All currency values formatted to 2 decimal places
- Numbers are clean (no $ or commas) for Excel/spreadsheet compatibility
- Ready for immediate use in spreadsheet applications

**Example CSV Output:**
```csv
Year,Age,Yr Portion,BF Gross,BF Adjusted x AEF,BF Fringe,...
2023,33.00,0.500,32500.00,26195.00,6500.00,0.00,0.00,...
2024,34.00,1.000,66950.00,53975.90,13390.00,22000.00,2200.00,...
```

**Format Details:**
- Year: Integer
- Age: 2 decimals
- Portion: 3 decimals
- All currency: 2 decimals (e.g., 32500.00)
- No currency symbols in CSV
- Ready to import into Excel, Google Sheets, etc.

### Technical Changes

#### Frontend Updates (`static/index.html`)

1. **HTML Structure** (Lines 228-250)
   - Added separate `<div>` containers for each table view
   - Each view has class `table-view` for easy styling/control
   - Added third table (`tableAll`) for "All Years" view
   - Tables are now wrapped in show/hide containers

2. **Table Rendering** (Lines 425-444)
   - Updated `renderTables()` function
   - Now renders all three tables: Pre, Post, and All
   - All tables updated on each computation

3. **CSV Export** (Lines 472-505)
   - Completely rewrote CSV export logic
   - Added `fmtCsv()` helper function for clean number formatting
   - Uses `.toFixed(2)` for consistent decimal places
   - Proper column headers with descriptive labels
   - Cleaner, more maintainable code

4. **Tab Functionality** (Lines 585-603)
   - Replaced scroll-to behavior with show/hide logic
   - Uses CSS `display` property to toggle visibility
   - Proper active state management
   - Immediate switching between views

### User Experience Improvements

✅ **Cleaner Interface**: Only one table visible at a time
✅ **Better Navigation**: Clear tab labels for each period
✅ **Professional CSV Output**: Properly formatted for spreadsheets
✅ **Faster Performance**: No need to scroll through multiple tables
✅ **Print-Friendly**: Each view can be printed separately

### How to Use New Features

#### Switching Between Tables:
1. Run a calculation (click "Compute")
2. Click tab buttons to switch views:
   - **Pre-Injury Table**: Past damages period
   - **Post-Injury Table**: Future damages period
   - **All Years**: Complete schedule

#### Exporting CSV:
1. Run calculation
2. Click "Export CSV" button
3. Open in Excel/Google Sheets
4. All values are properly formatted as numbers
5. Use spreadsheet formulas on the data

### Backward Compatibility

✅ All existing features preserved
✅ Existing saved profiles still work
✅ All calculations remain the same
✅ JSON import/export unchanged
✅ API endpoints unchanged

### Files Modified

- `static/index.html` - Main application file
  - Updated HTML structure (lines 228-250)
  - Updated renderTables function (lines 425-444)
  - Updated CSV export (lines 472-505)
  - Updated tab functionality (lines 585-603)

### Testing

✅ Tabs switch properly between views
✅ All three tables render correctly
✅ CSV exports with proper formatting
✅ CSV opens correctly in Excel/Google Sheets
✅ Calculations remain accurate
✅ Profile save/load still works
✅ API integration unaffected

### Known Issues

None reported.

### Future Enhancements (Potential)

- [ ] Add option to export each table separately
- [ ] Add print styles optimized for each tab view
- [ ] Add totals row at bottom of tables
- [ ] Add column sorting functionality
- [ ] Add ability to hide/show specific columns
- [ ] Add comparison view (multiple cases side-by-side)

---

## Version 1.0 - November 5, 2025

### Initial Release

- Full-stack application with Flask backend
- SQLite database for persistent storage
- Complete forensic economics calculator
- AEF methodology (Tinari algebraic)
- Multiple discounting methods
- Profile management system
- RESTful API (17 endpoints)
- CSV and JSON export
- See PROJECT_SUMMARY.md for complete details

---

**Application Version**: 1.1
**Last Updated**: November 5, 2025
**Status**: ✅ All features working
