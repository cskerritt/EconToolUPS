# Past Earnings Offset Guide

## Overview

The But-For Damages Analyzer now clearly supports **entering offset earnings for past periods** between the incident date and report date. This allows you to properly account for mitigation that occurred in the past.

---

## What is Past Earnings Offset?

**Past Earnings Offset** = Actual earnings earned by the plaintiff between the incident date and report date that should be subtracted from but-for earnings to calculate net loss.

### Common Scenarios:

1. **Return to Work During Claims Period**
   - Plaintiff was injured on 2023-01-15
   - Report date is 2025-01-15
   - Plaintiff returned to work on 2024-06-01
   - Need to offset earnings from 2024-06-01 to 2025-01-15

2. **Part-Time Work While Injured**
   - Plaintiff continued working part-time
   - Earned less than but-for earnings
   - Need to offset actual part-time earnings

3. **Different Employment Post-Injury**
   - Plaintiff found new job at lower pay
   - Started during the past damages period
   - Need to offset the new lower earnings

---

## How to Enter Past Earnings Offset

### Step 1: Enter Case Dates

```
Case Setup Section:
├── Incident Date: 2023-06-20  (when injury occurred)
└── Report Date: 2025-01-15    (valuation date)
```

### Step 2: Navigate to Mitigation Section

Look for the section titled: **"Mitigation / Offset Earnings"**

### Step 3: Enter Offset Information

```
Actual Earnings Start Date: 2024-01-01
Annual Earnings (base year): $22,000
Annual Growth %: 2%
Fringe % of Pay: 10%
```

**Important:** Set the "Actual Earnings Start Date" to a date **between** the incident date and report date.

### Step 4: Watch for Visual Feedback

You'll see a colored info box showing:

**⚠️ PAST OFFSET** from January 1, 2024 to January 15, 2025 (reduces past damages)

**Color Indicators:**
- 🟡 **Yellow (Warning)** = Past offset detected (good!)
- 🟢 **Green (OK)** = Future offset (after report date)
- 🔴 **Red (Error)** = Start date before incident (invalid!)

---

## Visual Indicators Explained

### Yellow Box - Past Offset
```
⚠️ PAST OFFSET from June 1, 2024 to January 15, 2025 (reduces past damages)
```
✅ **This is what you want!**
- Start date is between incident and report
- Will properly offset past earnings
- Reduces past damages calculation

### Green Box - Future Offset
```
✓ FUTURE OFFSET from February 1, 2025 to retirement (reduces future damages)
```
- Start date is on or after report date
- Will offset future earnings only
- Reduces future damages calculation

### Red Box - Error
```
❌ ERROR Start date is before incident date
```
- Invalid configuration
- Check your dates
- Start date must be on or after incident date

---

## Example: Complete Workflow

### Scenario: Carmen Ramirez Case

**Facts:**
- DOB: January 15, 1990
- Incident Date: June 20, 2023 (car accident)
- Report Date: January 15, 2025
- But-for earnings: $65,000/year
- Returned to work part-time: January 1, 2024
- Part-time earnings: $22,000/year

### Step-by-Step:

1. **Enter Case Setup**
   ```
   Case Name: Ramirez v. XYZ Corp
   Case Type: Personal Injury
   DOB: 1990-01-15
   Incident Date: 2023-06-20
   Report Date: 2025-01-15
   ```

2. **Enter But-For Earnings**
   ```
   Base Earnings: $65,000
   Fringe %: 20%
   Annual Growth %: 3%
   ```

3. **Enter Past Offset Earnings**
   ```
   Actual Earnings Start Date: 2024-01-01
   Annual Earnings: $22,000
   Annual Growth %: 2%
   Fringe %: 10%
   ```

4. **Verify Visual Feedback**
   ```
   ⚠️ PAST OFFSET from January 1, 2024 to January 15, 2025
   (reduces past damages)
   ```
   ✅ Correct! This is a past offset.

5. **Run Calculation**
   - Click "Compute"
   - Review Pre-Injury Table tab
   - See offset applied to 2024 and partial 2025

### Expected Results:

**Year 2023:**
- But-for earnings: $32,695 (half year from 6/20)
- Actual earnings: $0 (not working yet)
- **Loss: $32,695**

**Year 2024:**
- But-for earnings: $67,366 (full year, with growth)
- Actual earnings: $22,000 (started 1/1/24)
- **Loss: $45,366**

**Year 2025 (partial):**
- But-for earnings: $3,524 (partial year to 1/15)
- Actual earnings: $917 (partial year to 1/15)
- **Loss: $2,607**

**Total Past Damages: ~$80,668** (before PV/interest adjustments)

---

## Common Questions

### Q: Can I set the start date before the incident?
**A:** No. The system will show a red error message. Offset earnings can only begin on or after the incident date.

### Q: What if the plaintiff worked sporadically?
**A:** Use the average annual earnings. The tool applies earnings proportionally to partial years.

### Q: What if there were multiple jobs?
**A:** Add up all earnings to get total annual offset amount.

### Q: Does the growth rate apply to past years?
**A:** Yes, the tool applies the growth rate year-over-year, just like but-for earnings.

### Q: What if I don't have exact dates?
**A:** Use the best estimate. You can adjust dates later and re-run the calculation.

---

## Validation & Error Checking

### The Tool Will Alert You If:

❌ **Start date is before incident date**
- Fix: Change start date to incident date or later

⚠️ **No dates entered**
- Info box shows: "Enter dates above to see offset period"
- Action: Fill in all required dates

✅ **Everything correct**
- Yellow box for past offset
- Green box for future offset
- Ready to compute

---

## Tips for Accurate Past Offset

### 1. Document Your Dates
Keep records of:
- When plaintiff returned to work
- Pay stubs showing earnings
- Employment contracts
- Tax returns

### 2. Verify Growth Rates
- Past offset growth should match actual wage increases
- May be different from but-for growth rate
- Use 0% if no increases occurred

### 3. Include All Compensation
Don't forget:
- Base salary
- Bonuses
- Overtime
- Fringe benefits

### 4. Adjust for Partial Years
The tool automatically:
- Prorates partial years
- Uses actual dates to calculate portions
- Applies mid-year discounting

---

## Advanced Example: Multiple Changes

### Scenario: Progressive Return to Work

**Timeline:**
- Incident: June 20, 2023
- No work: June 2023 - Dec 2023 (6 months)
- Part-time: Jan 2024 - Dec 2024 ($22,000/year)
- Full-time different job: Jan 2025 onwards ($45,000/year)
- Report: June 15, 2025

**How to Handle:**

Since the tool uses one start date and growth rate, you have two options:

**Option 1: Conservative (Use Later Start)**
```
Actual Earnings Start: 2024-01-01
Annual Earnings: $22,000
Growth %: 104.5%  (large jump from $22k to $45k)
```
- Captures part-time period accurately
- Large growth captures the job change

**Option 2: Average Method**
```
Actual Earnings Start: 2024-01-01
Annual Earnings: $30,000  (weighted average)
Growth %: 15%  (moderate growth)
```
- Approximates the overall offset
- Simpler to explain

**Option 3: Two Separate Calculations**
- Run calculation for part-time period
- Run second calculation for full-time period
- Manually combine results

---

## Troubleshooting

### Problem: Offset not showing in tables
**Solution:**
1. Check that Actual Earnings Start is filled in
2. Check that Annual Earnings is > 0
3. Click "Compute" after entering data
4. Review Pre-Injury or Post-Injury tab (depending on offset period)

### Problem: Wrong years showing offset
**Solution:**
1. Verify Actual Earnings Start Date
2. Check incident and report dates
3. Look at the visual indicator for confirmation
4. Re-enter dates if needed

### Problem: Offset amount looks wrong
**Solution:**
1. Verify annual earnings amount
2. Check growth rate (% not decimal)
3. Verify fringe percentage
4. Review year-by-year in table

---

## Testing Your Setup

### Quick Verification Checklist:

✅ Visual indicator shows correct offset type (past/future)
✅ Dates make logical sense (start after incident)
✅ Annual earnings amount is correct
✅ Growth rate matches expectations
✅ Fringe percentage is appropriate
✅ After clicking "Compute", tables show offset in correct years

### Manual Spot Check:

Look at a specific year in the table:
1. **BF Gross** - Should be your but-for calculation
2. **ACT Earn** - Should show your offset earnings (if applicable)
3. **Loss** - Should be BF Total minus ACT Total
4. Verify numbers make sense

---

## Help Text Summary

The tool now displays helpful information:

**Header:** "Mitigation / Offset Earnings"
- Makes purpose clear

**Info Box:** Real-time feedback
- Shows exact offset period
- Color-coded for quick understanding

**Help Text:** Instructions
- **For Past Earnings:** Set start date between incident and report
- **For Future Earnings:** Set start date at or after report date
- Explains calculation method

---

## Best Practices

### 1. Enter Data in Order
1. Case dates first
2. But-for earnings second
3. Offset earnings third
4. Watch visual feedback
5. Run calculation

### 2. Use Clear Documentation
- Save assumptions as JSON
- Export CSV for review
- Keep notes of why dates were chosen
- Document growth rate sources

### 3. Review Results Carefully
- Check pre-injury tab for past offsets
- Check post-injury tab for future offsets
- Verify totals make sense
- Compare to manual calculations

### 4. Update as Information Changes
- Easy to adjust dates
- Re-run calculation instantly
- Compare different scenarios
- Save multiple profiles

---

## Support

If you have questions about:
- **Dates:** Check the visual indicator in the Mitigation section
- **Calculations:** Review the Pre-Injury and Post-Injury tables
- **Results:** Export CSV and verify in spreadsheet
- **Technical:** See BACKEND_README.md for API details

---

**Version:** 1.1
**Last Updated:** November 5, 2025
**Feature:** Past Earnings Offset Tracking

✅ **The application now fully supports entering past offset earnings with clear visual feedback!**
