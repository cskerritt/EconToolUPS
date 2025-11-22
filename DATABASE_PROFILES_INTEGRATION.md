# Database Profiles Integration

## Overview

The profile dropdown now shows profiles from **both** browser localStorage **and** the database API, giving you access to all saved profiles regardless of where they were stored.

**Implementation Date**: November 7, 2025
**Status**: ✅ Complete

---

## What Changed

### Before
- ❌ Only localStorage profiles visible in dropdown
- ❌ Database profiles inaccessible from UI
- ❌ No way to see or load profiles saved via API

### After
- ✅ Both localStorage and database profiles visible
- ✅ Profiles organized into two groups
- ✅ Can load from either source
- ✅ Clear visual distinction between sources

---

## Profile Dropdown Structure

The profile dropdown now shows:

```
┌─────────────────────────────────┐
│ Select profile                  │ ← Default option
├─────────────────────────────────┤
│ Local Profiles (Browser)        │ ← Group header
│   Profile 1                     │
│   Profile 2                     │
│   Smith, John                   │
├─────────────────────────────────┤
│ Database Profiles               │ ← Group header
│   Test, Demo                    │
│   Jones, Sarah                  │
│   Brown, Michael                │
└─────────────────────────────────┘
```

**Visual Features**:
- Two separate groups (optgroups)
- Clear labels showing source
- Alphabetically sorted within each group

---

## How It Works

### Loading Profiles

**On Page Load / Refresh**:
1. Fetches localStorage profiles from `bfda_profiles_v1` key
2. Fetches database profiles from `/api/evaluees` endpoint
3. Combines and displays both in dropdown
4. Organizes into two groups

**Profile Value Format**:
- **Local**: `local:ProfileName`
- **Database**: `db:ProfileName`

### Loading a Profile

**When you click "Load"**:

**Local Profile**:
1. Strips `local:` prefix
2. Loads from localStorage
3. Restores UI and runs calculation

**Database Profile**:
1. Strips `db:` prefix
2. Fetches evaluee data from API
3. Fetches associated case data
4. Fetches latest calculation (if exists)
5. Restores UI from calculation assumptions
6. If no calculations exist, creates basic assumptions from case data
7. Runs calculation

---

## User Workflows

### Load a Local Profile

1. Click profile dropdown
2. Select profile under "Local Profiles (Browser)"
3. Click "Load" button
4. Profile loads from browser storage

### Load a Database Profile

1. Click profile dropdown
2. Select profile under "Database Profiles"
3. Click "Load" button
4. Profile loads from database API
5. Includes all saved calculations and data

### Save a New Profile

1. Enter data and run calculations
2. Enter profile name
3. Click "Save/Update" button
4. Profile saved to **localStorage** (browser)
5. Profile appears under "Local Profiles (Browser)" group

### Duplicate a Profile

**From Local**:
- Creates copy in localStorage with timestamp

**From Database**:
- Downloads profile from database
- Creates copy in localStorage with timestamp
- New profile appears in "Local Profiles" group

### Delete a Profile

**Local Profile**:
- Can be deleted normally
- Removes from localStorage
- Asks for confirmation

**Database Profile**:
- Shows message: "Cannot delete database profiles from this interface"
- Must use database management tools
- Prevents accidental deletion

---

## Technical Details

### API Endpoints Used

**GET /api/evaluees**:
```json
{
  "success": true,
  "evaluees": [
    {
      "id": 1,
      "profile_name": "Test, Demo",
      "case_count": 1,
      "created_at": "2025-11-06T03:08:14.331528",
      "updated_at": "2025-11-06T03:08:14.331531"
    }
  ]
}
```

**GET /api/evaluees/{id}/cases**:
```json
{
  "success": true,
  "cases": [
    {
      "id": 1,
      "case_name": "Test Case v. XYZ",
      "case_type": "pi",
      "date_of_birth": "1985-03-15",
      "incident_date": "2023-06-20",
      "valuation_date": "2025-01-15",
      "wle_years": 24.5,
      "le_years": 41.2
    }
  ]
}
```

**GET /api/cases/{id}/calculations**:
```json
{
  "success": true,
  "calculations": [
    {
      "id": 1,
      "assumptions_json": "{...}",
      "results_json": "{...}",
      "created_at": "2025-11-06T03:08:30.123456"
    }
  ]
}
```

### Data Flow

```
refreshProfileSelect() (async)
    ↓
Load localStorage profiles
Load database profiles (API fetch)
    ↓
Combine into two groups
    ↓
Populate dropdown with optgroups
    ↓
User selects profile
    ↓
profileLoad event handler
    ↓
Check prefix: local: or db:
    ↓
If local: → Load from localStorage
If db: → Fetch from API (evaluee → case → calculations)
    ↓
restoreUI(assumptions)
runCompute()
```

### Code Locations

**Frontend: `/Users/chrisskerritt/UPS Damages/static/index.html`**

| Function | Lines | Purpose |
|----------|-------|---------|
| `refreshProfileSelect()` | 349-403 | Fetches and displays both profile types |
| Profile Load handler | 1216-1279 | Handles loading from both sources |
| Profile Save handler | 1215 | Saves to localStorage with correct prefix |
| Profile Delete handler | 1280-1299 | Prevents database profile deletion |
| Profile Duplicate handler | 1300-1316 | Handles duplication from both sources |

### Database Profile Loading Logic

```javascript
if (selected.startsWith('db:')) {
  const profileName = selected.substring(3);

  // 1. Fetch evaluee by name
  const evaluees = await fetch('/api/evaluees');
  const evaluee = evaluees.find(e => e.profile_name === profileName);

  // 2. Fetch first case for evaluee
  const cases = await fetch(`/api/evaluees/${evaluee.id}/cases`);
  const firstCase = cases[0];

  // 3. Fetch calculations for case
  const calculations = await fetch(`/api/cases/${firstCase.id}/calculations`);
  const latestCalc = calculations[calculations.length - 1];

  // 4. Parse assumptions JSON
  const assumptions = JSON.parse(latestCalc.assumptions_json);

  // 5. Restore UI
  restoreUI(assumptions);
  runCompute();
}
```

### Fallback Behavior

**If no calculations exist for a database profile**:
- Creates basic assumptions object from case data
- Uses default values for:
  - But-for earnings: $0
  - Fringe method: Simple
  - Growth rate: 3%
  - Discount method: NDR at 1.5%
  - Options: Default settings

**Example fallback assumptions**:
```javascript
assumptions = {
  meta: { profileName, caseName, caseType },
  dates: { dob, valuation, incident },
  horizon: { wleYears, yfsYears, leYears },
  butFor: { baseAnnual: 0, fringePct: 0, fringeMethod: 'simple', ... },
  upsFringe: { employmentType: 'fulltime', ... },
  aef: { mode: 'off', ... },
  actual: { start: '', annual: 0, ... },
  discount: { method: 'ndr', ndr: 0.015, ... },
  options: { applyPastInterest: false, showPastIntColumn: true, ... }
};
```

---

## Benefits

### For Users

1. **Access All Profiles**: See profiles from both browser and database
2. **No Lost Work**: Database-saved profiles now visible
3. **Clear Organization**: Two groups show where each profile is stored
4. **Flexible Workflow**: Load from either source seamlessly

### For Data Management

1. **Centralized View**: All profiles in one dropdown
2. **Source Transparency**: Clear indication of storage location
3. **Safe Operations**: Cannot accidentally delete database profiles
4. **Migration Path**: Can duplicate database profiles to local storage

### For Team Collaboration

1. **Shared Database**: Multiple users can access same database profiles
2. **Personal Local**: Each user has their own local profiles
3. **Backup Strategy**: Profiles exist in both places for redundancy

---

## Comparison Table

| Feature | Local Profiles | Database Profiles |
|---------|----------------|-------------------|
| **Storage** | Browser localStorage | PostgreSQL database |
| **Persistence** | Per-browser, per-device | Cross-browser, cross-device |
| **Sharing** | Not shareable | Shareable across users |
| **Deletion** | Can delete from UI | Protected (API/SQL only) |
| **Backup** | Manual export to JSON | Automatic database backups |
| **Access** | Single user | Multi-user |
| **Speed** | Instant (local) | Network fetch (fast) |
| **Capacity** | Limited (~5-10MB) | Unlimited (database) |

---

## Use Cases

### Use Case 1: Accessing Old Database Profiles

**Scenario**: User has profiles saved in database but can't see them

**Before**:
- Profiles exist in database
- Not visible in dropdown
- No way to access from UI

**After**:
- All database profiles appear in dropdown
- Under "Database Profiles" group
- Click and load normally

### Use Case 2: Team Collaboration

**Scenario**: Multiple economists working on same cases

**Solution**:
- Shared profiles in database
- Each user's local work in localStorage
- Both visible in same dropdown
- Easy to distinguish source

### Use Case 3: Cross-Device Work

**Scenario**: Work on laptop, review on desktop

**Solution**:
- Save to database (via API)
- Access from any device
- Local profiles stay device-specific

### Use Case 4: Backup and Recovery

**Scenario**: Browser cache cleared, lost local profiles

**Solution**:
- Database profiles still accessible
- Can duplicate to local storage
- Continue work without data loss

---

## Error Handling

### Network Errors

**If database fetch fails**:
```javascript
try {
  const response = await fetch('/api/evaluees');
  // ... process
} catch(e) {
  console.log('Could not fetch profiles from database:', e);
  // Continue with local profiles only
}
```

**Result**:
- Dropdown shows local profiles only
- No error shown to user
- Graceful degradation

### Missing Data

**If evaluee has no cases**:
- Error: "No case data found"
- Alert shown to user
- Loading cancelled

**If case has no calculations**:
- Creates default assumptions
- Uses case metadata
- Allows user to add calculations

---

## localStorage Key

**Key Name**: `bfda_profiles_v1`

**Shared with**:
- But-For Damages Analyzer (reference app)
- Both apps can access same local profiles
- Provides continuity between versions

---

## Future Enhancements (Optional)

### Potential Additions

1. **Save to Database Button**:
   - Add "Save to Database" alongside "Save/Update"
   - Creates API record
   - Profile appears in Database group

2. **Sync Feature**:
   - "Sync All to Database" button
   - Uploads all local profiles to API
   - Creates backups automatically

3. **Profile Migration**:
   - Bulk move from local to database
   - One-click migration tool
   - Preserves all data and calculations

4. **Visual Indicators**:
   - Icons showing profile source
   - Timestamp showing last modified
   - User who created (for database profiles)

5. **Search/Filter**:
   - Search box to filter profiles
   - Filter by source (local/database)
   - Filter by date range

6. **Database Profile Editing**:
   - Allow editing database profiles
   - Update via PUT API
   - Confirmation dialogs

---

## Troubleshooting

### Problem: No database profiles showing

**Check**:
1. Is server running? (http://localhost:5001)
2. Are there evaluees in database? (`curl http://localhost:5001/api/evaluees`)
3. Check browser console for errors (F12 → Console)

**Solution**:
- Ensure Flask server is running
- Verify database connection
- Check API endpoint returns data

### Problem: Cannot load database profile

**Error**: "Profile not found" or "No case data found"

**Solution**:
- Verify evaluee has at least one case
- Check case has required fields (dates, names)
- View browser console for detailed error

### Problem: Dropdown shows duplicate names

**Cause**: Same profile name in both localStorage and database

**Behavior**: Works correctly - shows both sources
- One under "Local Profiles"
- One under "Database Profiles"

**Solution**: This is by design; rename one if confusing

### Problem: Old profile format doesn't load

**Cause**: Database profile saved before new features added

**Solution**:
- Loads with default values for missing fields
- Run calculation to update
- Save to local to preserve new format

---

## API Reference

### Fetch All Evaluees

```javascript
const response = await fetch('/api/evaluees');
const data = await response.json();
// data.evaluees = array of evaluee objects
```

### Fetch Cases for Evaluee

```javascript
const response = await fetch(`/api/evaluees/${evalueeId}/cases`);
const data = await response.json();
// data.cases = array of case objects
```

### Fetch Calculations for Case

```javascript
const response = await fetch(`/api/cases/${caseId}/calculations`);
const data = await response.json();
// data.calculations = array of calculation objects
```

---

## Summary

✅ **Feature Complete**: Profile dropdown now shows both localStorage and database profiles

**Key Benefits**:
1. Access to all saved profiles
2. Clear organization by source
3. Seamless loading from either location
4. Protected database profiles
5. Graceful error handling

**User Impact**:
- No lost profiles
- Better organization
- More flexible workflow
- Team collaboration enabled

**Technical Quality**:
- Async/await for API calls
- Error handling with fallbacks
- Prefix-based routing
- Backward compatible

---

**Status**: ✅ Complete and Tested
**Version**: UPS Damages Analyzer v1.7
**Date**: November 7, 2025
**Server**: http://localhost:5001
