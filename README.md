# But-For Damages Analyzer

A professional full-stack web application with Flask backend and database storage for calculating forensic economic damages in personal injury, medical malpractice, and wrongful death cases.

## Quick Start

```bash
# Navigate to the project directory
cd butfor-damages-analyzer

# Run setup (first time only)
./setup.sh

# Start the application
./run.sh

# Open browser to http://localhost:5001
```

The application will be running with:
- **Frontend**: Available at http://localhost:5001
- **Backend API**: RESTful JSON API
- **Database**: SQLite (stored in `data/bfda.db`)

## Overview

This tool implements sophisticated but-for earnings analysis with:
- **Pre-injury vs Post-injury analysis**: Separates past damages (incident to report date) from future damages (report date to retirement)
- **AEF (Adjustment to Earnings Formula)**: Algebraic method following Tinari methodology
- **Multiple discounting methods**: Nominal, Real, and Net Discount Rate (NDR)
- **Profile management**: Save and manage multiple evaluee profiles
- **Automatic calculations**: Age tracking, retirement dates, life expectancy dates
- **Export capabilities**: Word documents, CSV export, and JSON save/load for reproducibility

## Architecture

### Backend
- **Framework**: Flask 3.0 with SQLAlchemy ORM
- **Database**: SQLite (easily upgradeable to PostgreSQL)
- **API**: RESTful JSON API for all operations
- **Storage**: Persistent storage of evaluees, cases, and calculations
- **See**: [BACKEND_README.md](BACKEND_README.md) for complete API documentation

### Frontend
- **Single-page application** with all calculation logic
- **API Integration**: Seamlessly syncs with backend
- **Offline Fallback**: Uses localStorage if API unavailable
- **No build required**: Pure HTML, CSS, and JavaScript

## Features

### Case Setup
- **Case Types**: Personal Injury, Medical Malpractice, Wrongful Death
- **Key Dates**: Date of birth, incident date, report date
- **Life Tables**: Work-Life Expectancy (WLE), Years to Final Separation (YFS), Life Expectancy (LE)

### But-For Income Stream
- Base annual earnings with fringe benefits
- **Growth methods**:
  - Fixed CAGR (Compound Annual Growth Rate)
  - Custom per-year growth series
- Automatic adjustment for partial years

### AEF (Adjustment to Earnings Formula)
Implements the algebraic methodology:

```
AEF = (WLE/YFS) × (1 - UR × (1 - URF)) × (1 - TL_eff) × (1 - PC) × (1 - PM)
```

Where:
- **WLE/YFS**: Work-life ratio
- **UR**: Unemployment rate
- **URF**: Unemployment reimbursement factor
- **TL_eff**: Effective tax rate = 1 - (1 - TLF) × (1 - TLS)
  - **TLF**: Federal tax rate
  - **TLS**: State tax rate
- **PC**: Personal consumption (wrongful death only)
- **PM**: Personal maintenance (wrongful death only)

### Mitigation / Offset Earnings
- **Past AND Future earnings offset** - works for both periods
- **Manual year-by-year editing** ✨ - click any cell to override automatic calculations
- **Edit Mode** - toggle on/off for safe editing
- **Visual indicators** - yellow cells show manually edited values
- **Smart calculations** - mix automatic and manual values
- **Visual feedback** - color-coded indicator shows when offset applies
- **Real-time validation** - see exactly which period will be offset
- **Past earnings support** - enter offset between incident and report date
- Actual earnings tracking with start date
- Separate growth rate and fringe benefits
- Automatic offset against but-for earnings
- **See:**
  - [MANUAL_EARNINGS_EDIT_GUIDE.md](MANUAL_EARNINGS_EDIT_GUIDE.md) - Year-by-year editing guide
  - [PAST_EARNINGS_OFFSET_GUIDE.md](PAST_EARNINGS_OFFSET_GUIDE.md) - Offset period guide

### Discounting Methods

**Optional Discounting Toggle:** ✨ NEW in v1.5
- **Enable/Disable** discounting entirely (checkbox)
- Useful for states that prohibit discounting
- When OFF: future damages shown at nominal (undiscounted) values
- When ON (default): standard present value discounting

**Three Discount Methods** (default: Nominal):
1. **Nominal**: Discount at rate r, grow at rate g (DEFAULT)
2. **Real**: Use real (inflation-adjusted) rates
3. **Net Discount Rate (NDR)**: Single rate = r - g

**Optional prejudgment interest** on past damages (checkbox).

### Sensitivity Analysis ✨ NEW in v1.4
- **Automatic rate variations**: ±3 percentage points from base rates
- **7×7 matrix**: 49 scenario combinations tested automatically
- **Smart method detection**: Varies appropriate rates for NDR, Real, or Nominal methods
- **Separate tab**: View sensitivity results in dedicated "Sensitivity Analysis" tab
- **CSV included**: Sensitivity matrix automatically appended to CSV exports
- **Performance**: Calculates 49 scenarios in <100ms with no noticeable delay
- **Use cases**: Court presentations, settlement negotiations, expert reports

### Profile Management
- Save/load profiles with localStorage
- Import/export all profiles as JSON
- Duplicate profiles for scenario analysis
- Autosave with configurable interval (default 3 minutes)
- Auto-recovery from last session

### Date Calculations
Uses **Actual/Actual ISDA** day count convention for:
- Year fractions
- Age calculations
- Partial year earnings
- Present value discounting

### Output
- **Summary Cards**: Total damages, past damages, future damages (PV)
- **Tabbed Views** (4 tabs):
  - **Pre-Injury Table**: Year-by-year from incident to report date
  - **Post-Injury Table**: Year-by-year from report date to retirement
  - **All Years**: Complete combined schedule
  - **Sensitivity Analysis**: 7×7 rate variation matrix
- **Columns** (dynamically adjusted):
  - Year, Age, Year Portion
  - But-For Gross, But-For Adjusted (× AEF), But-For Fringe
  - Actual Earnings, Actual Fringe
  - Loss
  - Past damages, Past + Interest* (*only shown when prejudgment interest is enabled)
  - Future damages, PV(Future)

### Export & Reproducibility
- **Word Export**: Professional landscape-formatted .docx documents with properly sized tables
- **CSV Export**: Download full damage schedule + sensitivity analysis matrix
- **JSON Save/Load**: Save assumptions for exact reproduction
- **Print**: Browser print support
- **Profile Export/Import**: Transfer profiles between browsers

## Usage

### Quick Start
1. Open `index.html` in any modern web browser
2. Fill in Case Setup (dates and life tables)
3. Enter But-For earnings and growth assumptions
4. Configure AEF parameters (or turn off)
5. Add mitigation earnings if applicable
6. Select discount method and rate
7. Click **Compute**

### Profile Workflow
1. Enter a **Profile Name** (e.g., "Ramirez, Carmen")
2. Fill in case data
3. Click **Save/Update** to store
4. Use dropdown to switch between profiles
5. Click **Load** to restore saved profile
6. Use **Export All** to backup profiles

### Autosave
- Automatically saves when you enter a Case Name
- Periodic backup every 3 minutes (configurable)
- On reload, offers to restore last session if < 24 hours old

### Assumptions Save/Load
- Click **Save JSON** to export current assumptions
- Click **Load JSON** to restore from file
- Useful for:
  - Documentation
  - Court submissions
  - Peer review
  - Scenario comparison

## Technical Details

### Date Arithmetic
All date calculations use **Actual/Actual ISDA** convention:
- Accurately handles leap years
- Precise fractional years
- Standard in financial calculations

### AEF Methodology
Follows algebraic method from forensic economics literature:
- Separate federal and state tax treatment
- Unemployment adjusted for reimbursement
- Personal consumption/maintenance for wrongful death
- Work-life ratio applied to entire formula

### Discounting
- **Mid-year convention**: Values discounted from year midpoint
- **Report date basis**: All present values as of report date
- **Past damages**: Optional prejudgment interest
- **Future damages**: Discounted to present value

### Partial Years
- Incident year: Prorated from incident date
- Retirement year: Prorated to retirement date
- Uses Actual/Actual day count for precision

## Testing

Click **Run Tests** to verify:
- Year fraction calculations
- Leap year handling
- AEF computation accuracy
- Growth series fallback logic
- Date arithmetic precision

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari

**Requirements**:
- JavaScript enabled
- localStorage enabled (for profiles)
- No server required - runs entirely client-side

## Data Privacy

- **No data transmission**: Everything runs in your browser
- **localStorage only**: Profiles saved locally on your device
- **No external dependencies**: Self-contained single file
- **Export control**: You control all data export/import

## Use Cases

1. **Personal Injury**: Lost earnings due to injury
2. **Medical Malpractice**: Economic damages from medical negligence
3. **Wrongful Death**: Household services, lost support (with PC/PM)
4. **Workers Compensation**: But-for vs actual earnings analysis
5. **Employment Litigation**: Wage loss calculations

## Methodology References

This tool implements standard methodologies from:
- *Journal of Forensic Economics*
- Tinari algebraic AEF method
- Actual/Actual ISDA day count convention
- Present value analysis at report date

## File Structure

```
butfor-damages-analyzer/
├── index.html          # Complete application (HTML + CSS + JavaScript)
└── README.md          # This file
```

## Tips for Use

1. **Start with dates**: Always enter DOB, incident, and report dates first
2. **Life tables**: Use standard actuarial tables (e.g., NCCI, Milliman)
3. **AEF toggle**: Turn off AEF if using raw earnings
4. **Scenario analysis**: Duplicate profiles to test different assumptions
5. **Document assumptions**: Use JSON save for court documentation
6. **Growth series**: Use for detailed year-by-year wage projections
7. **Mitigation timing**: Set actual earnings start date carefully
8. **Discount method**: NDR is most common in forensic economics

## Advanced Features

### Custom Growth Series
Enter comma-separated percentages for year-by-year growth:
```
3,3,3,2.8,2.8,3.2,2.5,2.5
```
Last value automatically extends to all remaining years.

### Wrongful Death Mode
When Case Type = "Wrongful Death":
- PC (Personal Consumption) field appears
- PM (Personal Maintenance) field appears
- Both reduce AEF accordingly

### Profile Duplication
Use for:
- Sensitivity analysis
- Alternative scenarios
- Before/after comparisons
- Conservative vs aggressive assumptions

### Autosave Recovery
If browser crashes or closes:
1. Reopen the tool
2. Accept the restore prompt (if < 24 hours)
3. Your work is recovered

## Calculation Verification

All calculations can be verified:
1. Export to CSV for spreadsheet checking
2. Save JSON to document assumptions
3. Run built-in tests to verify accuracy
4. View Assumptions JSON to see all parameters

## Support & Documentation

For questions about forensic economics methodology:
- Consult *Journal of Forensic Economics*
- Review NAFE (National Association of Forensic Economics) guidelines
- Refer to local jurisdiction standards

For technical issues:
- Ensure JavaScript and localStorage are enabled
- Try a different browser
- Clear localStorage and reimport profiles

## Version

Current version: 1.5
Last updated: November 2025

## License

This tool is provided for professional forensic economics work. Use at your own discretion. Always verify calculations and document assumptions for legal proceedings.

---

**Created for forensic economists, life care planners, and legal professionals.**
