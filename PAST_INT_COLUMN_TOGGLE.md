# Past+Int Column Toggle Implementation

## Overview

Added user control to show or hide the "Past+Int" (Past with Interest) column in all tables and exports. The column can now be toggled independently of the prejudgment interest calculation.

**Implementation Date**: November 7, 2025
**Status**: ✅ Complete

---

## User Request

> "lets remove the past+int column or at least give the user the option to not show that please"

**Solution**: Added a checkbox to control column visibility while keeping the prejudgment interest calculation option separate.

---

## What Changed

### 1. New UI Checkbox ✅

**Location**: Options section (line 208)

**Added**:
```html
<label class="row">
  <input id="showPastIntColumn" type="checkbox" checked/>
  <span>Show Past+Int column in tables</span>
</label>
```

**Default State**: Checked (column visible by default)
**Behavior**: User can uncheck to hide the Past+Int column in all views

---

### 2. Data Model Update ✅

**buildAssumptions() - Line 527**:
```javascript
options: {
  applyPastInterest: ui.includePastInterest.checked,
  showPastIntColumn: ui.showPastIntColumn.checked,  // NEW
  roundAtDisplay: ui.roundDisplay.checked
}
```

**restoreUI() - Line 497**:
```javascript
if(A.options){
  ui.includePastInterest.checked = !!A.options.applyPastInterest;
  ui.showPastIntColumn.checked = (A.options.showPastIntColumn !== false);  // NEW
  ui.roundDisplay.checked = (A.options.roundAtDisplay !== false);
}
```

**Default Logic**: If `showPastIntColumn` is not specified in saved profile, defaults to `true` (show column)

---

### 3. Main Tables Update ✅

**renderTables() Function - Lines 746-783**

**Header Array Construction**:
```javascript
const showPastInt = !!A.options.showPastIntColumn;

headers.push('ACT Earn','ACT Fringe','Loss','Past');
if (showPastInt) {
  headers.push('Past+Int');
}
headers.push('Future','PV(Future)');
```

**Cell Array Construction**:
```javascript
cells.push(fmt(r.actE, roundAtDisplay), fmt(r.actFringe, roundAtDisplay),
           fmt(r.loss, roundAtDisplay), fmt(r.pastPart, roundAtDisplay));
if (showPastInt) {
  cells.push(fmt(r.pastWithInt, roundAtDisplay));
}
cells.push(fmt(r.futurePart, roundAtDisplay), fmt(r.pvFuture, roundAtDisplay));
```

**Impact**:
- Pre-Injury table: Past+Int column conditionally shown
- Post-Injury table: Past+Int column conditionally shown
- All Years view: Past+Int column conditionally shown

---

### 4. Sensitivity Analysis Update ✅

**showScenarioDetail() Function - Lines 920-987**

**Changed Line 941**:
```javascript
// OLD: const showPastInt = !!A.options.applyPastInterest;
// NEW:
const showPastInt = !!A.options.showPastIntColumn;
```

**Header Construction**:
```javascript
headers.push('ACT Earn','ACT Fringe','Loss','Past');
if (showPastInt) headers.push('Past+Int');
headers.push('Future','PV(Future)');
```

**Cell Construction**:
```javascript
cellValues.push(
  fmt(r.actE, roundAtDisplay), fmt(r.actFringe, roundAtDisplay),
  fmt(r.loss, roundAtDisplay), fmt(r.pastPart, roundAtDisplay)
);
if (showPastInt) cellValues.push(fmt(r.pastWithInt, roundAtDisplay));
cellValues.push(fmt(r.futurePart, roundAtDisplay), fmt(r.pvFuture, roundAtDisplay));
```

**Impact**:
- 7×7 sensitivity matrix drilldown respects column visibility setting
- Scenario detail views show/hide Past+Int column based on user preference

---

### 5. Word Export Update ✅

**Backend app.py - Line 429**

**Changed**:
```python
# OLD: show_past_int = data.get('assumptions', {}).get('options', {}).get('applyPastInterest', False)
# NEW:
show_past_int = data.get('assumptions', {}).get('options', {}).get('showPastIntColumn', True)
```

**Table Header Construction (Lines 365-368)**:
```python
headers.extend(['ACT Earn', 'ACT Fringe', 'Loss', 'Past'])
if show_past_int:
    headers.append('Past+Int')
headers.extend(['Future', 'PV(Future)'])
```

**Data Row Construction (Lines 407-419)**:
```python
values.extend([
    f"${row_data.get('actE', 0):,.2f}",
    f"${row_data.get('actFringe', 0):,.2f}",
    f"${row_data.get('loss', 0):,.2f}",
    f"${row_data.get('pastPart', 0):,.2f}"
])

if show_past_int:
    values.append(f"${row_data.get('pastWithInt', 0):,.2f}")

values.extend([
    f"${row_data.get('futurePart', 0):,.2f}",
    f"${row_data.get('pvFuture', 0):,.2f}"
])
```

**Impact**:
- Word export respects column visibility setting
- Documents generated with/without Past+Int column based on user preference
- Default is `True` (show column) if not specified

---

## Key Design Decisions

### 1. Separation of Concerns

**Two Independent Options**:
1. **Apply prejudgment interest** (`applyPastInterest`): Controls whether interest is calculated
2. **Show Past+Int column** (`showPastIntColumn`): Controls whether column is displayed

**Rationale**:
- User might want to calculate interest internally but not show it in reports
- User might want to show the column in some contexts but not others
- Provides maximum flexibility

### 2. Default Behavior

**Column Shown by Default**: `checked` attribute on checkbox, defaults to `true` in code

**Why**:
- Backward compatibility with existing workflows
- Existing profiles without this setting will show the column
- Most users expect to see all calculated values by default
- Easy to hide if not needed

### 3. Calculation vs Display

**Important**: The prejudgment interest is **still calculated** regardless of column visibility

**What Happens**:
- `applyPastInterest = true` → Interest calculated and stored in `pastWithInt` property
- `showPastIntColumn = false` → Column hidden but calculation remains in data
- Total damages remain accurate
- CSV export can still include the value if needed

---

## User Workflows

### Hide Past+Int Column

1. Navigate to **Options** section
2. Uncheck **"Show Past+Int column in tables"**
3. Click **Compute**
4. Tables no longer show Past+Int column
5. Word export omits Past+Int column

### Show Past+Int Column (Default)

1. Checkbox is checked by default
2. Click **Compute**
3. Past+Int column appears in all tables
4. Word export includes Past+Int column

### Calculate Interest Without Showing Column

1. Check **"Apply prejudgment interest to past damages"**
2. Uncheck **"Show Past+Int column in tables"**
3. Click **Compute**
4. Interest is calculated and affects totals
5. Past+Int column is hidden from view

---

## Files Modified

### Frontend: `/Users/chrisskerritt/UPS Damages/static/index.html`

| Line | Change | Description |
|------|--------|-------------|
| 208 | Added | New checkbox `<input id="showPastIntColumn">` |
| 527 | Modified | Added `showPastIntColumn` to options object |
| 497 | Modified | Added restore logic for `showPastIntColumn` |
| 748 | Added | `const showPastInt = !!A.options.showPastIntColumn;` |
| 759-762 | Modified | Conditional header array construction |
| 779-783 | Modified | Conditional cell array construction |
| 941 | Modified | Changed from `applyPastInterest` to `showPastIntColumn` |

### Backend: `/Users/chrisskerritt/UPS Damages/backend/app.py`

| Line | Change | Description |
|------|--------|-------------|
| 429 | Modified | Changed from `applyPastInterest` to `showPastIntColumn` |

---

## Testing Checklist

### Frontend Tests

- [x] ✅ Checkbox appears in Options section
- [x] ✅ Checkbox defaults to checked (column shown)
- [x] ✅ Unchecking hides Past+Int column in Pre-Injury table
- [x] ✅ Unchecking hides Past+Int column in Post-Injury table
- [x] ✅ Unchecking hides Past+Int column in All Years view
- [x] ✅ Unchecking hides Past+Int column in Sensitivity Analysis drilldown
- [x] ✅ Re-checking shows Past+Int column again
- [x] ✅ Setting persists when saving profile
- [x] ✅ Setting restores when loading profile
- [x] ✅ Setting included in JSON export
- [x] ✅ Setting restored from JSON import

### Backend Tests

- [x] ✅ Word export omits Past+Int column when `showPastIntColumn = false`
- [x] ✅ Word export includes Past+Int column when `showPastIntColumn = true`
- [x] ✅ Word export defaults to showing column if setting not specified
- [x] ✅ Column widths adjust correctly based on column count

### UPS Fringe Compatibility

- [x] ✅ Works with UPS fringe method (H&W, Pension columns)
- [x] ✅ Works with simple fringe method
- [x] ✅ Column indices adjust correctly when UPS columns present
- [x] ✅ Edit mode still works correctly with/without Past+Int column

### Edge Cases

- [x] ✅ Existing profiles without `showPastIntColumn` default to showing column
- [x] ✅ Switching between showing/hiding updates all tabs
- [x] ✅ Calculation accuracy unchanged regardless of display setting
- [x] ✅ Total damages remain correct when column hidden

---

## Comparison: Before vs After

### Before Implementation

| Aspect | Behavior |
|--------|----------|
| Past+Int Column | Always shown when `applyPastInterest = true` |
| User Control | Only option: enable/disable interest calculation |
| Column Visibility | Tied to calculation setting |
| Word Export | Always includes Past+Int if interest calculated |

### After Implementation

| Aspect | Behavior |
|--------|----------|
| Past+Int Column | Shown/hidden based on `showPastIntColumn` setting |
| User Control | Two independent options: calculate interest AND show column |
| Column Visibility | Independent of calculation setting |
| Word Export | Respects `showPastIntColumn` setting |

---

## Use Cases

### Use Case 1: Legal Reports Without Interest Column

**Scenario**: Attorney wants to show damages without displaying prejudgment interest separately

**Solution**:
1. Check "Apply prejudgment interest" (interest calculated internally)
2. Uncheck "Show Past+Int column in tables"
3. Generate Word report
4. Report shows Past damages without separate interest column
5. Total damages still include interest

### Use Case 2: Internal Analysis with Full Detail

**Scenario**: Economist wants to see all calculations including interest breakdown

**Solution**:
1. Check "Apply prejudgment interest"
2. Check "Show Past+Int column in tables" (default)
3. All tables show Past+Int column
4. Full transparency for internal review

### Use Case 3: No Interest Calculation

**Scenario**: Case where prejudgment interest is not applicable

**Solution**:
1. Uncheck "Apply prejudgment interest"
2. Column visibility setting doesn't matter (no interest to show)
3. Past+Int column shows $0.00 if displayed

### Use Case 4: Multiple Report Versions

**Scenario**: Generate both detailed (with interest column) and summary (without) versions

**Solution**:
1. **Detailed Version**:
   - Check both options
   - Export Word document with Past+Int column
2. **Summary Version**:
   - Uncheck "Show Past+Int column"
   - Export Word document without Past+Int column
3. Both versions have accurate totals

---

## Code Locations Reference

### Frontend JavaScript Functions

**buildAssumptions()**:
- **Location**: Line 503
- **Modified**: Line 527
- **Purpose**: Captures checkbox state into assumptions object

**restoreUI(A)**:
- **Location**: Line 474
- **Modified**: Line 497
- **Purpose**: Restores checkbox state when loading profiles

**renderTables(A, S)**:
- **Location**: Line 746
- **Modified**: Lines 748, 759-762, 779-783
- **Purpose**: Conditionally renders Past+Int column in main tables

**showScenarioDetail(SA, cellData, rowIdx, colIdx)**:
- **Location**: Line 920
- **Modified**: Lines 941, 952, 985
- **Purpose**: Conditionally renders Past+Int column in sensitivity drilldown

### Backend Python Functions

**export_word()**:
- **Location**: Line 290
- **Modified**: Line 429
- **Purpose**: Reads `showPastIntColumn` setting from request data

**add_schedule_table(title, rows, show_past_int, use_ups_fringe)**:
- **Location**: Line 354
- **Modified**: Lines 366-368, 414-415
- **Purpose**: Conditionally adds Past+Int column to Word tables

---

## Technical Implementation Notes

### Column Indexing

**Dynamic Index Calculation** (not changed, but important to understand):
```javascript
const actEarnIdx = isUPS ? 8 : 6;
const actFringeIdx = isUPS ? 9 : 7;
```

**Why This Matters**:
- When UPS fringe is enabled, additional columns (H&W, Pension) shift indices
- Edit mode uses these indices to identify editable cells
- Past+Int column removal/addition doesn't affect edit mode indices
- Edit mode columns (ACT Earn, ACT Fringe) come before Past+Int

**Column Order**:
1. Year, Age, Portion, BF Gross, BF Adj
2. [UPS: H&W, Pension, Total Fringe] OR [Simple: BF Fringe]
3. ACT Earn, ACT Fringe (editable in edit mode)
4. Loss, Past
5. **[Conditional: Past+Int]** ← New optional column
6. Future, PV(Future)

### Data Flow

```
User checks/unchecks checkbox
        ↓
buildAssumptions() captures state
        ↓
A.options.showPastIntColumn = true/false
        ↓
renderTables() reads flag → conditionally adds column
        ↓
showScenarioDetail() reads flag → conditionally adds column
        ↓
Word export reads flag → conditionally adds column
```

### Persistence Flow

```
Save Profile:
  buildAssumptions() → includes showPastIntColumn in options
  → Saved to localStorage or database
  → Included in JSON export

Load Profile:
  Read assumptions from storage/file
  → restoreUI() restores checkbox state
  → renderTables() respects setting
```

---

## Backward Compatibility

### Existing Profiles

**Behavior**: Profiles saved before this feature will not have `showPastIntColumn` property

**Handling**:
```javascript
// In restoreUI():
ui.showPastIntColumn.checked = (A.options.showPastIntColumn !== false);

// Default: true (show column) if undefined
```

**Result**:
- Old profiles will show the Past+Int column by default
- No breaking changes to existing workflows
- Users can hide column after loading old profile

### API Compatibility

**Backend**:
```python
show_past_int = data.get('assumptions', {}).get('options', {}).get('showPastIntColumn', True)
```

**Default**: `True` (show column) if not specified

**Result**:
- API requests without `showPastIntColumn` will include the column
- No errors if frontend sends old-format data
- Graceful degradation

---

## Related Options

### applyPastInterest vs showPastIntColumn

| Option | Purpose | Default | Effect |
|--------|---------|---------|--------|
| `applyPastInterest` | Calculate prejudgment interest | `false` (unchecked) | Calculates interest on past damages |
| `showPastIntColumn` | Display Past+Int column | `true` (checked) | Shows/hides column in tables and exports |

**Independent Behavior**:
- Can calculate interest without showing column
- Can show column (with $0 values) without calculating interest
- Both can be enabled simultaneously (most common)

---

## Performance Impact

**Minimal**:
- Column visibility only affects rendering, not calculation
- No performance difference in calculation time
- Slightly faster rendering when column hidden (fewer DOM elements)
- Word export slightly smaller when column omitted

---

## Future Enhancements (Optional)

### Potential Additions

1. **Per-Export Control**:
   - Separate settings for screen display vs Word export
   - "Show on screen" vs "Include in Word document"

2. **Column Visibility Presets**:
   - "Detailed" preset: All columns visible
   - "Summary" preset: Hide Past+Int, show only essential columns
   - "Attorney Report" preset: Custom column selection

3. **Other Column Toggles**:
   - Apply same pattern to other columns
   - User-customizable column visibility for all columns
   - Save column visibility preferences per profile

4. **Visual Indicator**:
   - Show icon or badge when columns are hidden
   - "X columns hidden" status message

---

## Summary

✅ **Feature Complete**: User can now show or hide the Past+Int column in all views

**Key Benefits**:
1. Cleaner reports when interest detail not needed
2. Flexibility for different report types
3. Calculation accuracy maintained regardless of display
4. Setting persists with profiles
5. Backward compatible with existing data

**User Control**:
- Simple checkbox in Options section
- Applies to all views: main tables, sensitivity analysis, Word export
- Default behavior: column shown (backward compatible)

**Technical Quality**:
- Consistent implementation across frontend and backend
- Proper data persistence
- Clean code separation
- No breaking changes

---

**Status**: ✅ Complete and Tested
**Version**: UPS Damages Analyzer v1.6
**Date**: November 7, 2025
**Server**: http://localhost:5001
