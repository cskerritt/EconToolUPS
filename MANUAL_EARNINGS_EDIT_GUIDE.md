# Manual Earnings Override Guide - Version 1.3

## Overview

The But-For Damages Analyzer now allows you to **manually edit offset earnings for each year directly in the table**. This is perfect when earnings vary significantly year-to-year and don't follow a simple growth pattern.

---

## What's New - Version 1.3

### Manual Year-by-Year Earnings Editing

Instead of just entering one annual amount that grows automatically, you can now:
- ✅ Click any ACT Earn cell to edit it
- ✅ Enter specific amounts for individual years
- ✅ Override automatic calculations when needed
- ✅ See visual indicators for manually edited cells
- ✅ Save manual edits with your profile

---

## How to Use

### Step 1: Enable Edit Mode

**In the toolbar (top of tables), click:** `✏️ Enable Edit Mode`

**What happens:**
- Button turns green: `✅ Disable Edit Mode`
- Message appears: "Edit Mode: Click ACT Earn cells to edit"
- ACT Earn and ACT Fringe columns become clickable

### Step 2: Run Your Calculation First

1. Enter all case data (dates, but-for earnings, etc.)
2. Click **"Compute"** to generate the schedule
3. **Then** enable edit mode to modify specific years

### Step 3: Edit Individual Years

1. **Navigate to the table** (Pre-Injury, Post-Injury, or All Years tab)
2. **Hover over an ACT Earn cell** - it highlights with blue outline
3. **Click the cell** - it becomes an input field
4. **Type the new amount** (e.g., 25000.50)
5. **Press Enter** or click outside to save
6. **Press Escape** to cancel without saving

### Step 4: See Your Changes

**Edited cells turn YELLOW:**
- 🟡 Yellow background = Manually edited
- Bold text for visibility
- Hover shows "Manually edited - click to change"

**Calculations update automatically:**
- Loss column recalculates
- Past/Future damages update
- Total damages reflect new amounts

### Step 5: Clear Overrides (Optional)

**To remove all manual edits:**
1. Click `🗑️ Clear All Overrides` button (appears when you have edits)
2. Confirm the action
3. Tables revert to automatic calculations

---

## Visual Indicators

### Normal Cells (No Edit)
```
Cell appears normal
Hover: no special effect
```

### Editable Cells (Edit Mode ON)
```
Cell has dashed outline on hover
Cursor changes to pointer
Title: "Click to edit"
```

### Manually Edited Cells
```
🟡 Yellow background
Bold text
Title: "Manually edited - click to change"
Visible even when Edit Mode is OFF
```

### Input Mode (While Editing)
```
Blue border (2px solid)
Number input field
Press Enter to save
Press Escape to cancel
```

---

## Use Cases

### Use Case 1: Varying Part-Time Earnings

**Scenario:**
- Plaintiff worked part-time post-injury
- Hours varied significantly each year
- 2023: $15,000 (partial year)
- 2024: $28,500 (more hours)
- 2025: $12,000 (reduced hours)

**How to Enter:**
1. Set up case with incident date 2023-06-20
2. Set actual earnings start to 2023-06-20
3. Enter base annual: $20,000 (just as starting point)
4. Click Compute
5. Enable Edit Mode
6. Click 2023 ACT Earn cell → Enter 15000
7. Click 2024 ACT Earn cell → Enter 28500
8. Click 2025 ACT Earn cell → Enter 12000
9. Tables recalculate automatically

### Use Case 2: Multiple Jobs with Gaps

**Scenario:**
- Job 1: 2023 July-Dec: $18,000
- Unemployment: 2024 Jan-Jun: $8,000
- Job 2: 2024 Jul-2025: $32,000

**How to Enter:**
1. Enter case dates
2. Set actual earnings start to 2023-07-01
3. Enter base amount (e.g., $25,000)
4. Click Compute
5. Enable Edit Mode
6. Edit 2023: 18000
7. Edit 2024 (first half): Calculate manually for partial year
8. Edit 2024-2025: Adjust for Job 2 earnings
9. Done!

### Use Case 3: Seasonal Work

**Scenario:**
- Construction worker
- Works 9 months/year
- Earnings vary with weather and contracts

**How to Enter:**
1. Set up automatic calculation with average
2. Click Compute
3. Enable Edit Mode
4. Override specific years with actual reported earnings
5. Cells turn yellow to show manual entry
6. Clear visual audit trail

---

## Pro Tips

### Tip 1: Edit Just What You Need
- You don't have to edit every year
- Only override years that don't fit the pattern
- Automatic calculations remain for non-edited years

### Tip 2: Edit Mode Stays On
- Edit Mode persists until you toggle it off
- You can switch between tabs while editing
- Each tab shows the same overrides

### Tip 3: Save Your Work
- Manual edits save with your profile
- Click "Save/Update" in Profile Manager
- Edits reload when you load the profile

### Tip 4: Document Your Edits
- Yellow cells make it obvious which years were manually adjusted
- Export CSV to see all values
- Save JSON with assumptions AND manual edits

### Tip 5: Fringe Benefits Update Automatically
- When you edit ACT Earn, ACT Fringe recalculates
- Based on the fringe percentage you set
- Or edit ACT Fringe directly if needed

---

## Keyboard Shortcuts

- **Enter** - Save edit and close input
- **Escape** - Cancel edit without saving
- **Tab** - (while editing) Save and move to next cell
- **Shift+Tab** - (while editing) Save and move to previous cell

---

## Common Workflows

### Workflow A: Override Specific Years

1. ✅ Enter case data
2. ✅ Set up automatic offset earnings
3. ✅ Click Compute
4. ✅ Enable Edit Mode
5. ✅ Click specific year cells to override
6. ✅ Watch calculations update
7. ✅ Disable Edit Mode when done
8. ✅ Save profile

### Workflow B: Complete Manual Entry

1. ✅ Enter case data
2. ✅ Skip automatic offset setup (or set to $0)
3. ✅ Click Compute
4. ✅ Enable Edit Mode
5. ✅ Manually enter every year's earnings
6. ✅ All cells turn yellow (all manual)
7. ✅ Save profile

### Workflow C: Review and Adjust

1. ✅ Load existing profile
2. ✅ See yellow cells (previous manual edits)
3. ✅ Enable Edit Mode
4. ✅ Click yellow cells to adjust
5. ✅ Make changes
6. ✅ Save updated profile

---

## Technical Details

### What Gets Saved

When you save a profile, it includes:
- All form inputs (dates, earnings, etc.)
- All manual overrides (year-by-year)
- Each override stores:
  - Year number
  - ACT Earn amount
  - ACT Fringe amount

### How Calculations Work

```
For each year:
1. Calculate automatic offset (if applicable)
2. Check for manual override
3. If override exists → use manual value
4. If no override → use automatic value
5. Calculate loss = but-for minus actual
6. Update all dependent values
```

### Data Structure

```javascript
manualEarningsOverrides = {
  2023: { actE: 18000, actFringe: 1800 },
  2024: { actE: 28500, actFringe: 2850 },
  2025: { actE: 32000, actFringe: 3200 }
}
```

---

## Troubleshooting

### Problem: Can't click cells
**Solution:** Enable Edit Mode first (✏️ button in toolbar)

### Problem: Edits don't save
**Solution:**
- Make sure you pressed Enter or clicked outside the cell
- Check that calculations ran (watch for "Computing..." status)
- Save your profile after making edits

### Problem: Yellow cells but can't edit
**Solution:**
- Edit Mode might be disabled
- Click "✏️ Enable Edit Mode" button
- Then click the yellow cell

### Problem: Lost my manual edits
**Solution:**
- Check if you saved the profile
- Manual edits only persist if profile is saved
- Load the profile again if you saved it

### Problem: Want to start over
**Solution:**
- Click "🗑️ Clear All Overrides"
- Confirms before clearing
- All cells revert to automatic calculation

---

## Best Practices

### 1. Document Why You Manually Edited
- Keep notes of which years were edited
- Document the source (pay stubs, tax returns, etc.)
- Use profile names to indicate manual edits (e.g., "Smith - Manual 2024")

### 2. Verify Your Edits
- Export CSV after editing
- Check in spreadsheet
- Verify totals make sense

### 3. Compare Automatic vs Manual
- Run calculation with automatic first
- Save as "Profile A"
- Then edit manually
- Save as "Profile B"
- Compare results

### 4. Use for Complex Scenarios Only
- Automatic calculation is usually fine
- Manual entry for truly irregular earnings
- Don't over-complicate if simple growth works

### 5. Save Multiple Versions
- Duplicate profile before major edits
- Keep "conservative" and "actual" versions
- Easy to compare scenarios

---

## CSV Export with Manual Edits

**Exported CSV shows actual values used:**
- Manual edits appear in ACT Earn column
- No special marking in CSV (just the numbers)
- Yellow highlighting is UI only
- Values are exactly what was calculated

**To identify manual edits in export:**
- Check the JSON file (includes override data)
- Or note yellow cells before exporting
- Or add notes in your case documentation

---

## Examples

### Example 1: Simple Override

**Before:**
```
Year  | ACT Earn (Auto)
2023  | $20,000
2024  | $20,600  ← Want to change this
2025  | $21,218
```

**Steps:**
1. Enable Edit Mode
2. Click 2024 ACT Earn cell
3. Type: 25000
4. Press Enter

**After:**
```
Year  | ACT Earn (Manual)
2023  | $20,000
2024  | $25,000  ← Yellow, manually edited
2025  | $21,218
```

### Example 2: Multiple Years

**Before:**
```
Year  | ACT Earn (Auto)
2023  | $15,000
2024  | $15,450
2025  | $15,909
2026  | $16,377
```

**Edit:**
- 2024 → $22,000 (got better job)
- 2026 → $30,000 (promotion)

**After:**
```
Year  | ACT Earn (Mixed)
2023  | $15,000  ← Automatic
2024  | $22,000  ← Yellow (manual)
2025  | $15,909  ← Automatic
2026  | $30,000  ← Yellow (manual)
```

---

## FAQ

**Q: Do I have to edit every year?**
A: No! Only edit years that need it. Others use automatic calculation.

**Q: Can I edit past AND future years?**
A: Yes! Edit mode works on all tables (Pre-Injury, Post-Injury, All Years).

**Q: Will my edits sync to the database?**
A: Yes, when you save the profile, edits save to the database.

**Q: Can I undo an edit?**
A: Yes! Click the cell again and change it, or use "Clear All Overrides" to reset everything.

**Q: Do edits affect fringe benefits?**
A: When you edit ACT Earn, ACT Fringe recalculates based on your fringe %. Or edit ACT Fringe directly.

**Q: Can I edit while in view-only mode?**
A: No, you must enable Edit Mode first. This prevents accidental changes.

**Q: Are manual edits included in CSV export?**
A: Yes! CSV shows the actual values used (manual or automatic).

**Q: Can I see which years are manual in the CSV?**
A: The CSV shows values only. Check the JSON export for override metadata.

---

## Comparison: Automatic vs Manual

| Feature | Automatic Only | With Manual Override |
|---------|----------------|----------------------|
| **Setup Time** | Fast | Slower (year-by-year) |
| **Accuracy** | Good for consistent earnings | Precise for varying earnings |
| **Use Case** | Stable employment | Multiple jobs, gaps, varying hours |
| **Visual Feedback** | Normal cells | Yellow cells show edits |
| **Documentation** | Automatic growth formula | Shows which years were adjusted |
| **Flexibility** | Limited | Complete control |
| **Best For** | Most cases | Complex scenarios |

---

## Support

**Getting Help:**
- See main README.md for general features
- See CHANGELOG.md for version history
- Check browser console for errors (F12)
- Verify server is running at http://localhost:5001

**Common Issues:**
- Clear browser cache if UI doesn't update
- Refresh page to see latest changes
- Check that Edit Mode is enabled
- Ensure you clicked outside cell or pressed Enter to save

---

**Version:** 1.3
**Feature:** Manual Earnings Override
**Date:** November 2025
**Status:** ✅ Fully Functional

---

**Happy Editing!** 📝

Now you have complete control over offset earnings for every year.
