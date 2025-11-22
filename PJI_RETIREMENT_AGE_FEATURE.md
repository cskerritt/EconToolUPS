# PJI Retirement Age Feature

## Overview

Added custom PJI (Post-Injury) retirement age input that allows users to specify a custom retirement age for scenario analysis. This retirement scenario is calculated alongside the existing WLE-based and fixed age (65, 67, 70) scenarios.

**Implementation Date**: November 7, 2025
**Status**: ✅ Complete

---

## What Was Added

### 1. ✅ New Input Field

**Location**: Case Setup section, below the horizon inputs

**HTML** (lines 102-104):
```html
<div class="grid">
  <label><span>PJI Retirement Age (optional)</span>
    <input id="pjiRetireAge" type="number" step="1" placeholder="e.g., 62"/>
  </label>
</div>
```

**Features**:
- Optional field (not required)
- Integer input (whole ages)
- Placeholder text shows example
- Accepts any age value

### 2. ✅ UI Reference Added

**File**: index.html (line 466)

```javascript
const ui = {
  ...
  wleYears: $('#wleYears'),
  yfsYears: $('#yfsYears'),
  leYears: $('#leYears'),
  pjiRetireAge: $('#pjiRetireAge'),  // NEW
  ...
}
```

### 3. ✅ Data Model Integration

**buildAssumptions()** (line 587):
```javascript
horizon: {
  wleYears: Number(ui.wleYears.value||0),
  yfsYears: Number(ui.yfsYears.value||0),
  leYears: Number(ui.leYears.value||0),
  pjiRetireAge: Number(ui.pjiRetireAge.value||0)  // NEW
}
```

**restoreUI()** (line 557):
```javascript
if(A.horizon){
  ui.wleYears.value = A.horizon.wleYears||'';
  ui.yfsYears.value = A.horizon.yfsYears||'';
  ui.leYears.value = A.horizon.leYears||'';
  ui.pjiRetireAge.value = A.horizon.pjiRetireAge||'';  // NEW
}
```

### 4. ✅ Retirement Scenario Calculation

**calculateRetirementScenarios()** (lines 766-784):
```javascript
// PJI (Post-Injury) custom retirement age scenario
const pjiAge = A.horizon.pjiRetireAge;
if (pjiAge && pjiAge > 0 && pjiAge > currentAge) {
  const yearsToRetire = pjiAge - currentAge;
  const retireDate = addYears(vDate, yearsToRetire);

  const A_pji = JSON.parse(JSON.stringify(A));
  A_pji.dates.retire = retireDate.toISOString();
  A_pji.horizon.wleYears = yearsToRetire;

  const S_pji = scheduleFromAssumptions(A_pji);
  scenarios.push({
    name: `PJI Retirement (Age ${pjiAge})`,
    retireAge: pjiAge,
    retireDate: retireDate,
    schedule: S_pji,
    totals: S_pji.totals
  });
}
```

**Logic**:
- Only calculates if PJI age is entered
- Only calculates if PJI age > current age
- Calculates years to retirement from valuation date
- Generates full damage schedule
- Adds to scenarios array

---

## How It Works

### User Workflow

1. **Enter Case Data**:
   - DOB: 1980-05-15
   - Incident: 2023-06-20
   - Valuation: 2025-01-15
   - Current age at valuation: 44

2. **Enter PJI Retirement Age**:
   - Type: `62` in the "PJI Retirement Age" field

3. **Click Compute**:
   - All scenarios calculated automatically

4. **View Results**:
   - Click "Retirement Scenarios" tab
   - See PJI scenario in table

**Example Table**:
```
Scenario                    | Age | Retirement Date | Past      | Future PV  | Total PV
WLE-Based (Age 64)         | 64  | 2045-01-15      | $450,000  | $2,100,000 | $2,550,000
PJI Retirement (Age 62)    | 62  | 2043-01-15      | $450,000  | $1,850,000 | $2,300,000
Age 65 Retirement          | 65  | 2046-01-15      | $450,000  | $2,250,000 | $2,700,000
Age 67 Retirement          | 67  | 2048-01-15      | $450,000  | $2,500,000 | $2,950,000
Age 70 Retirement          | 70  | 2051-01-15      | $450,000  | $2,850,000 | $3,300,000
```

### Scenario Order

1. **WLE-Based** (always first if WLE is entered)
2. **PJI Retirement** (second if PJI age is entered)
3. **Age 65** (if applicable)
4. **Age 67** (if applicable)
5. **Age 70** (if applicable)

---

## Features

### Flexibility

✅ **Optional**: Leave blank if not needed
✅ **Any Age**: Can enter any age (62, 63, 68, etc.)
✅ **Multiple Scenarios**: Works alongside other scenarios
✅ **Conditional**: Only shows if age > current age

### Validation

✅ **Must be greater than current age**: If PJI age ≤ current age, scenario not calculated
✅ **Must be a number**: Input type enforces numeric entry
✅ **Zero or blank ignored**: Empty field doesn't create scenario

### Data Persistence

✅ **Save Local**: Included in localStorage profiles
✅ **Save to Database**: Included in database records
✅ **JSON Export**: Included in assumptions export
✅ **JSON Import**: Restored when importing
✅ **Profile Load**: Restored when loading profile

---

## Use Cases

### Use Case 1: Early Retirement

**Scenario**: Plaintiff eligible for early retirement at age 62

**Solution**:
1. Enter PJI Retirement Age: `62`
2. Compute damages
3. See specific damages if retiring at 62
4. Compare to other retirement ages

**Benefit**: Shows damages under realistic early retirement scenario

### Use Case 2: Employer-Specific Retirement

**Scenario**: Employer has mandatory retirement at age 68

**Solution**:
1. Enter PJI Retirement Age: `68`
2. Shows damages specific to employer policy
3. More accurate than fixed 65/67/70 scenarios

### Use Case 3: Multiple Assumptions

**Scenario**: Attorney wants to show range with custom age

**Solution**:
- WLE-based: Age 64.5 (vocational)
- PJI: Age 62 (early retirement)
- Fixed: Age 65, 67, 70 (standard)
- Shows 5 different scenarios

### Use Case 4: Sensitivity Testing

**Scenario**: Test impact of different retirement assumptions

**Solution**:
1. Run once with PJI age 62
2. Run again with PJI age 63
3. Compare results
4. Show sensitivity to retirement age

---

## Word Export

### How PJI Appears in Word Document

**Retirement Age Scenarios Table**:
```
Scenario                    | Retirement Age | Retirement Date | Past Damages | Future PV    | Total PV
WLE-Based (Age 64)         | 64            | 2045-01-15      | $450,000     | $2,100,000   | $2,550,000
PJI Retirement (Age 62)    | 62            | 2043-01-15      | $450,000     | $1,850,000   | $2,300,000
Age 65 Retirement          | 65            | 2046-01-15      | $450,000     | $2,250,000   | $2,700,000
Age 67 Retirement          | 67            | 2048-01-15      | $450,000     | $2,500,000   | $2,950,000
Age 70 Retirement          | 70            | 2051-01-15      | $450,000     | $2,850,000   | $3,300,000
```

**Features in Word Export**:
- ✅ Included automatically if entered
- ✅ Proper row formatting
- ✅ All columns populated
- ✅ Ordered correctly (after WLE, before fixed ages)

---

## Technical Details

### Calculation Logic

```javascript
// 1. Get PJI age from assumptions
const pjiAge = A.horizon.pjiRetireAge;

// 2. Validate: must be entered, > 0, and > current age
if (pjiAge && pjiAge > 0 && pjiAge > currentAge) {

  // 3. Calculate years to retirement
  const yearsToRetire = pjiAge - currentAge;

  // 4. Calculate retirement date
  const retireDate = addYears(vDate, yearsToRetire);

  // 5. Create modified assumptions
  const A_pji = JSON.parse(JSON.stringify(A));
  A_pji.dates.retire = retireDate.toISOString();
  A_pji.horizon.wleYears = yearsToRetire;

  // 6. Run full damage calculation
  const S_pji = scheduleFromAssumptions(A_pji);

  // 7. Add to scenarios array
  scenarios.push({
    name: `PJI Retirement (Age ${pjiAge})`,
    retireAge: pjiAge,
    retireDate: retireDate,
    schedule: S_pji,
    totals: S_pji.totals
  });
}
```

### Data Structure

**In Assumptions Object**:
```javascript
{
  horizon: {
    wleYears: 24.5,
    yfsYears: 29.5,
    leYears: 41.2,
    pjiRetireAge: 62  // NEW
  }
}
```

**In Scenario Object**:
```javascript
{
  name: "PJI Retirement (Age 62)",
  retireAge: 62,
  retireDate: Date("2043-01-15"),
  schedule: { rows, rowsPre, rowsPost, totals },
  totals: { pastDam, futurePV, totalPV }
}
```

---

## Benefits

### For Users

1. **Flexibility**: Enter any retirement age
2. **Accuracy**: Custom scenarios match case specifics
3. **Convenience**: No need to manually calculate
4. **Completeness**: All scenarios in one report

### For Attorneys

1. **Case-Specific**: Match employer policies
2. **Range**: Show multiple retirement scenarios
3. **Credibility**: Address specific retirement assumptions
4. **Persuasive**: Custom scenarios more relevant

### For Economists

1. **Professional**: Comprehensive scenario analysis
2. **Efficient**: Automated calculation
3. **Documented**: Included in exports
4. **Reproducible**: Saved with profiles

---

## Comparison

### Before PJI Feature

**Available Scenarios**:
1. WLE-based (user must enter WLE)
2. Age 65 (fixed)
3. Age 67 (fixed)
4. Age 70 (fixed)

**Limitations**:
- Only 3 fixed ages available
- No flexibility for custom ages
- Cannot model ages between fixed points
- Cannot model early retirement (62, 63, etc.)

### After PJI Feature

**Available Scenarios**:
1. WLE-based (user must enter WLE)
2. **PJI custom age (user can enter any age)** ← NEW
3. Age 65 (fixed)
4. Age 67 (fixed)
5. Age 70 (fixed)

**Benefits**:
- ✅ Can enter any retirement age
- ✅ Model early retirement (62+)
- ✅ Model employer-specific ages
- ✅ More accurate to case specifics
- ✅ Up to 5 scenarios total

---

## Examples

### Example 1: Early Retirement at 62

**Input**:
- PJI Retirement Age: `62`
- Current Age: 45

**Result**:
- Years to retirement: 17
- Retirement Date: Valuation + 17 years
- Damages calculated for 17-year work life

**In Table**:
```
PJI Retirement (Age 62) | 62 | 2042-01-15 | $350,000 | $1,650,000 | $2,000,000
```

### Example 2: Late Retirement at 68

**Input**:
- PJI Retirement Age: `68`
- Current Age: 45

**Result**:
- Years to retirement: 23
- Retirement Date: Valuation + 23 years
- Damages calculated for 23-year work life

**In Table**:
```
PJI Retirement (Age 68) | 68 | 2048-01-15 | $450,000 | $2,750,000 | $3,200,000
```

### Example 3: Fractional Age (Whole Number Required)

**Input**:
- PJI Retirement Age: `62` (field only accepts integers)

**Note**: Field uses `step="1"` so only whole ages accepted

---

## Testing Checklist

### Functional Tests

- [x] ✅ Input field appears in UI
- [x] ✅ Input accepts numbers
- [x] ✅ Input rejects non-numbers
- [x] ✅ Empty field doesn't create scenario
- [x] ✅ Zero doesn't create scenario
- [x] ✅ Age < current age doesn't create scenario
- [x] ✅ Age > current age creates scenario
- [x] ✅ Scenario appears in retirement table
- [x] ✅ Scenario calculates correctly
- [x] ✅ Scenario appears in correct position (after WLE)

### Data Persistence Tests

- [x] ✅ Value saves with "Save Local"
- [x] ✅ Value saves with "Save to Database"
- [x] ✅ Value restores when loading profile
- [x] ✅ Value included in JSON export
- [x] ✅ Value restored from JSON import

### Export Tests

- [x] ✅ PJI scenario appears in Word export
- [x] ✅ PJI scenario formatted correctly in Word
- [x] ✅ All scenario fields populated
- [x] ✅ Scenarios ordered correctly in Word

### Edge Cases

- [x] ✅ PJI = current age (not included, correct)
- [x] ✅ PJI < current age (not included, correct)
- [x] ✅ PJI = 65 (works, duplicates age 65 scenario)
- [x] ✅ PJI very high (e.g., 95) (works if > current age)
- [x] ✅ PJI + all other scenarios (5 total scenarios)

---

## Files Modified

### Frontend: `/Users/chrisskerritt/UPS Damages/static/index.html`

| Lines | Change | Description |
|-------|--------|-------------|
| 102-104 | Added | New PJI Retirement Age input field |
| 105 | Modified | Updated help text |
| 466 | Modified | Added pjiRetireAge to ui object |
| 557 | Modified | Added pjiRetireAge to restoreUI() |
| 587 | Modified | Added pjiRetireAge to buildAssumptions() |
| 766-784 | Added | PJI scenario calculation in calculateRetirementScenarios() |

### No Backend Changes Required

The backend already handles:
- ✅ Horizon data in assumptions (includes pjiRetireAge)
- ✅ Retirement scenarios array (includes PJI scenario)
- ✅ Word export (processes PJI like other scenarios)

---

## User Guide

### How to Use PJI Retirement Age

**Step 1: Enter PJI Age**
- Find "PJI Retirement Age (optional)" field
- Enter desired retirement age (e.g., `62`)

**Step 2: Compute**
- Fill in all other required case data
- Click "Compute" button

**Step 3: View Results**
- Click "Retirement Scenarios" tab
- See PJI scenario in comparison table
- Review year-over-year breakdown

**Step 4: Export (Optional)**
- Click "Export Word"
- PJI scenario included in document
- All tables and scenarios exported

### Tips

💡 **When to Use**:
- Early retirement scenarios (62, 63, 64)
- Employer-specific retirement ages
- Ages between fixed scenarios (66, 68, 69)
- Sensitivity testing

💡 **When to Leave Blank**:
- Only need WLE and fixed ages
- No specific retirement age assumption
- Want fewer scenarios in report

💡 **Naming Convention**:
- "PJI" = Post-Injury retirement age
- Could represent: Post-Injury, Projected, or custom meaning
- Clear label in scenarios table

---

## Future Enhancements (Optional)

### Potential Additions

1. **Multiple PJI Ages**:
   - Allow entering 2-3 custom ages
   - PJI 1, PJI 2, PJI 3 fields

2. **PJI Label Customization**:
   - User can name the scenario
   - E.g., "Employer Policy", "Early Retirement", etc.

3. **Fractional Ages**:
   - Change `step="1"` to `step="0.1"`
   - Allow ages like 62.5

4. **Age Validation**:
   - Show warning if PJI ≤ current age
   - Highlight field in red

5. **Auto-Populate**:
   - Button to copy value from another field
   - "Use Age 65" button

---

## Summary

✅ **Feature Complete**: PJI Retirement Age fully implemented and integrated

**Key Points**:
1. Optional custom retirement age input
2. Automatically calculates scenario if entered
3. Appears in retirement scenarios table
4. Included in Word export
5. Saved with profiles
6. Works alongside all other scenarios

**User Benefits**:
- Flexible retirement age assumptions
- Case-specific scenarios
- Professional comprehensive reports
- Easy to use (just enter age)

**Technical Quality**:
- Clean implementation
- Proper validation
- Full data persistence
- Error-free export
- Backward compatible

---

**Status**: ✅ Complete and Tested
**Version**: UPS Damages Analyzer v2.1
**Date**: November 7, 2025
**Server**: http://localhost:5001

**All functionality maintained. No breaking changes.**
