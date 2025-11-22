# Prejudgment Interest Toggle - User Guide

## Overview

The But-For Damages Analyzer allows you to **optionally apply prejudgment interest** to past damages. This feature has been enhanced in v1.3 with better visual feedback and clarity.

---

## What is Prejudgment Interest?

**Prejudgment interest** compensates the plaintiff for the time value of money from when the loss occurred until the valuation/report date.

### Example:
- Incident: January 1, 2023
- Report Date: January 1, 2025
- Past damages: $50,000
- Discount rate: 5%

**Without prejudgment interest:**
- Past damages = $50,000

**With prejudgment interest:**
- Interest accrues from loss midpoint to report date
- Past damages = $50,000 × (1 + 0.05 × years)
- Result: $52,500 (approximate)

---

## How to Use

### Step 1: Find the Checkbox

In the left sidebar, scroll to the **"Discounting"** section.

You'll see a highlighted checkbox:
```
☐ Apply prejudgment interest to past damages
```

### Step 2: Check or Uncheck

**To apply interest:** ✅ Check the box
- A green status bar appears: "✓ Prejudgment interest will be applied to past damages"
- Past damages will accrue interest from loss date to report date

**To skip interest:** ☐ Leave unchecked (default)
- No status bar appears
- Past damages calculated as-is (most conservative)

### Step 3: Run Calculation

Click **"Compute"** to generate the damage schedule.

### Step 4: Review Results

In the tables, check the **"Past+Int"** column:
- **If checked**: Shows past damages WITH interest
- **If unchecked**: Shows same value as "Past" column (no interest)

---

## Visual Indicators

### Checkbox Appearance

**Enhanced in v1.3:**
- Gray background box with border
- **Bold text** label
- Stands out from other options

### Status Message

When **checked**, a green confirmation bar appears:
```
✓ Prejudgment interest will be applied to past damages
```

When **unchecked**, no message (default state).

---

## Interest Rate Used

The interest rate automatically matches your **discount method**:

### Method 1: Net Discount Rate (NDR)
- **Rate used**: NDR + Growth Rate
- Example: NDR = 1.5%, Growth = 3% → Interest = 4.5%

### Method 2: Real Rates
- **Rate used**: Discount Rate (r)
- Example: Discount rate = 3% → Interest = 3%

### Method 3: Nominal
- **Rate used**: Discount Rate (r)
- Example: Discount rate = 5% → Interest = 5%

**Why this matters:**
- NDR method uses the "gross" rate (r = NDR + g)
- This ensures consistency with your economic assumptions

---

## When to Use Prejudgment Interest

### ✅ Use Interest When:

1. **Jurisdiction requires it**
   - Some states mandate prejudgment interest
   - Check local court rules

2. **Long delay between incident and report**
   - Significant time value of money impact
   - Compensates plaintiff for waiting

3. **Plaintiff attorney requests it**
   - Part of damages claim
   - Maximizes recovery

4. **Economic analysis includes it**
   - More complete picture
   - Shows full economic impact

### ❌ Skip Interest When:

1. **Conservative estimate desired**
   - Default approach
   - Lower damages figure

2. **Jurisdiction doesn't allow it**
   - Some courts prohibit or limit it
   - Check local rules

3. **Defendant-side analysis**
   - Want to show minimum damages
   - More defensible position

4. **Simple analysis**
   - Faster calculation
   - Cleaner presentation

---

## Examples

### Example 1: Personal Injury with Interest

**Case:**
- Incident: June 1, 2022
- Report: January 15, 2025
- Discount method: NDR at 2%
- Growth rate: 3%
- Past damages (before interest): $100,000

**Steps:**
1. ✅ Check "Apply prejudgment interest"
2. See green status: "✓ Prejudgment interest will be applied"
3. Click Compute
4. Past+Int column shows: ~$113,000 (2.67 years × 5% rate)

### Example 2: Wrongful Death without Interest

**Case:**
- Date of death: March 1, 2024
- Report: December 1, 2024
- Past losses: $50,000

**Steps:**
1. ☐ Leave "Apply prejudgment interest" unchecked
2. No status message appears
3. Click Compute
4. Past column shows: $50,000
5. Past+Int column shows: $50,000 (same, no interest)

### Example 3: Scenario Comparison

**Want to show both with and without?**

1. **First scenario:**
   - ☐ Uncheck interest
   - Save profile as "Smith - No Interest"
   - Past damages: $80,000

2. **Second scenario:**
   - ✅ Check interest
   - Save profile as "Smith - With Interest"
   - Past damages: $85,600

3. **Compare:**
   - Difference: $5,600 in prejudgment interest
   - Show both to attorney/client

---

## Calculation Details

### Formula

For each year with past damages:

```
Past_with_interest = Past × (1 + rate × years_from_midpoint)
```

Where:
- **Past** = Base past damages for that year
- **rate** = Interest rate (from discount method)
- **years_from_midpoint** = Time from year midpoint to report date

### Mid-Year Convention

Interest accrues from the **midpoint** of each loss year:
- Assumes losses occurred evenly throughout the year
- More accurate than beginning or end of year
- Standard in forensic economics

---

## Profile Management

### Saving

When you save a profile, it remembers:
- ✅ Whether interest is checked or unchecked
- Your discount method and rates
- All other assumptions

### Loading

When you load a profile:
- Checkbox restores to saved state
- Status message appears if interest was enabled
- Calculations use the saved setting

### Exporting

**JSON export includes:**
```json
{
  "options": {
    "applyPastInterest": true,
    "roundAtDisplay": true
  }
}
```

---

## Common Questions

### Q: Is prejudgment interest the same as future discounting?

**A:** No!
- **Prejudgment interest** = Grows past damages forward to report date
- **Future discounting** = Brings future damages back to present value
- They use the same rate but work in opposite directions

### Q: Why does the interest rate change when I change discount methods?

**A:** The calculation uses your discount rate because:
- It represents the time value of money in your case
- Keeps assumptions consistent
- NDR method adds back growth rate to get gross rate

### Q: Can I use a different rate for prejudgment interest?

**A:** Currently, no. The rate is tied to your discount method:
- This ensures consistency
- Prevents conflicting assumptions
- Standard approach in forensic economics

If you need a different rate, adjust your discount method.

### Q: What if prejudgment interest is zero?

**A:** If your discount/interest rate is 0%:
- Checkbox can still be checked
- But Past+Int = Past (no change)
- Zero rate means no time value adjustment

### Q: Does this affect future damages?

**A:** No! Prejudgment interest only applies to:
- ✅ Past damages (incident to report)
- ❌ NOT future damages (report to retirement)

Future damages are separately discounted to present value.

### Q: Can I see both columns side-by-side?

**A:** Yes! The tables always show:
- **Past** column = damages without interest
- **Past+Int** column = damages with interest (if enabled)
- Easy to compare both values

---

## Best Practices

### 1. Check Local Rules First
- Research your jurisdiction
- Some states require it, some prohibit it
- Ask the attorney handling the case

### 2. Document Your Choice
- Note why you included or excluded interest
- Reference local statute or case law
- Include in your report narrative

### 3. Run Both Scenarios
- Save one profile with interest
- Save another without interest
- Present both to client/attorney

### 4. Be Consistent
- If using interest, apply it to ALL past damages
- Don't cherry-pick which years get interest
- The toggle handles this automatically

### 5. Explain in Reports
- Note whether interest was applied
- State the rate used
- Clarify it's separate from future discounting

---

## Troubleshooting

### Problem: Checkbox is there but no status message appears

**Solution:**
- The status only shows when checkbox is ✅ CHECKED
- Uncheck = no message (default state)
- This is normal behavior

### Problem: Don't see the checkbox

**Solution:**
- Scroll down in left sidebar to "Discounting" section
- It's below the "Mitigation / Offset Earnings" section
- Look for gray box with border

### Problem: Interest seems wrong

**Check:**
1. What discount method are you using?
2. What's your discount rate?
3. NDR method uses NDR + growth rate
4. Verify in Past+Int column

### Problem: Checkbox doesn't save with profile

**Solution:**
- Make sure you click "Save/Update" in Profile Manager
- Enter a profile name first
- Load the profile to verify it saved

---

## Technical Details

### Code Implementation

**HTML (lines 183-190):**
```html
<label class="row" style="padding:8px;background:var(--panel-2);...">
  <input id="includePastInterest" type="checkbox"/>
  <span style="font-weight:600">Apply prejudgment interest to past damages</span>
</label>
<div id="interestStatus" class="help" style="display:none;...">
  ✓ Prejudgment interest will be applied to past damages
</div>
```

**JavaScript (lines 512):**
```javascript
if (A.options.applyPastInterest && pastPart>0){
  const yrs = Math.max(0, yearFrac(yMid, vDate));
  const rate = (A.discount.method==='ndr') ?
    (A.discount.ndr + A.discount.growth) : A.discount.rate;
  pastWithInt = pastPart * (1 + (rate||0) * yrs);
}
```

**Event Listener (lines 372-377):**
```javascript
function updateInterestStatus(){
  const statusEl = $('#interestStatus');
  if (!statusEl) return;
  statusEl.style.display = ui.includePastInterest.checked ? 'block' : 'none';
}
ui.includePastInterest.addEventListener('change', updateInterestStatus);
```

---

## Related Features

### Discount Methods
See main README.md for:
- Net Discount Rate (NDR)
- Real rates
- Nominal rates

### Past Earnings Offset
See PAST_EARNINGS_OFFSET_GUIDE.md for:
- Entering past offset earnings
- Period indicators
- Past damages calculation

### Manual Earnings Editing
See MANUAL_EARNINGS_EDIT_GUIDE.md for:
- Year-by-year editing
- Override past earnings
- Custom scenarios

---

## Version History

- **v1.0-1.2**: Feature existed but checkbox was small/plain
- **v1.3**: Enhanced with visual styling and status indicator

---

**Feature Status:** ✅ Fully Functional
**Version:** 1.3
**Last Updated:** November 2025

---

**Need Help?**
- See main README.md for general usage
- See COLUMN_DEFINITIONS_GUIDE.md for column explanations
- Check CHANGELOG.md for version details
