# Table Column Definitions Guide

## Overview

This guide explains each column in the damages calculation tables (Pre-Injury, Post-Injury, and All Years).

---

## Column Definitions

### 1. Year

**What it is:** The calendar year being analyzed

**Example:** 2024

**Purpose:**
- Organizes damages chronologically
- Shows when losses occurred or will occur
- Critical for present value calculations

**Notes:**
- Pre-Injury table: Years from incident to report date
- Post-Injury table: Years from report date to retirement
- Partial years are included (prorated)

---

### 2. Age

**What it is:** The plaintiff's age during that year

**Example:** 34.50 (34 years, 6 months)

**How calculated:** Uses the year midpoint (July 1st) to determine age

**Purpose:**
- Shows plaintiff's age at time of loss
- Important for work-life expectancy analysis
- Helps verify retirement age calculations
- Relevant for expert testimony

**Format:** Decimal years (e.g., 34.50 = 34½ years old)

---

### 3. Yr Portion

**What it is:** The fraction of the year included in calculations

**Example:**
- 1.000 = Full year
- 0.500 = Half year
- 0.342 = Partial year (e.g., incident mid-year)

**When it's less than 1.000:**
- **Incident year** - Only counts from incident date to end of year
- **Report year** - May be partial if report date isn't December 31
- **Retirement year** - Only counts up to retirement date

**Purpose:**
- Accurate earnings calculations for partial years
- Prevents over-counting in first/last years
- Uses Actual/Actual day count convention

**Example Scenario:**
```
Incident: June 20, 2023
Year 2023 Portion: 0.531 (June 20 - Dec 31)
Year 2024 Portion: 1.000 (full year)
```

---

### 4. BF Gross

**Full Name:** But-For Gross Earnings

**What it is:** What the plaintiff **would have earned** if the injury had never occurred (before adjustments)

**Example:** $67,366.00

**How calculated:**
```
Base Annual Earnings × Year Portion × (1 + Growth Rate)^years
```

**Purpose:**
- Establishes the earnings baseline
- Shows plaintiff's earning capacity without injury
- Foundation for all other but-for calculations

**Key Points:**
- Does NOT include fringe benefits yet
- Does NOT have AEF applied yet
- Grows each year based on your growth rate
- Prorated for partial years

**Example:**
```
Base Earnings: $65,000
Growth Rate: 3% per year
Year 1: $65,000
Year 2: $66,950
Year 3: $68,959
```

---

### 5. BF Adjusted x AEF

**Full Name:** But-For Adjusted by Adjustment to Earnings Formula

**What it is:** But-For Gross Earnings **after** applying the AEF reduction factors

**Example:** $54,275.80

**How calculated:**
```
BF Gross × AEF

Where AEF = (WLE/YFS) × (1 - UR×(1-URF)) × (1 - TL_eff) × (1 - PC) × (1 - PM)
```

**Purpose:**
- Accounts for realistic probability of unemployment
- Adjusts for taxes that wouldn't be paid
- Accounts for personal consumption (wrongful death only)
- Results in more accurate "net loss" calculation

**AEF Components:**
- **WLE/YFS** - Work-life ratio (probability of working)
- **UR** - Unemployment rate
- **URF** - Unemployment reimbursement factor
- **TL_eff** - Effective tax rate (federal + state)
- **PC** - Personal consumption (wrongful death)
- **PM** - Personal maintenance (wrongful death)

**If AEF is OFF:**
- This column equals BF Gross
- No adjustment factors applied

**If AEF is ON:**
- This column is less than BF Gross
- Reflects "probable" earnings after adjustments

**Example:**
```
BF Gross: $67,366
AEF: 0.8056 (80.56%)
BF Adjusted: $54,275.80
```

---

### 6. BF Fringe

**Full Name:** But-For Fringe Benefits

**What it is:** The value of employee benefits the plaintiff would have received

**Example:** $13,473.20 (20% of $67,366)

**How calculated:**
```
BF Gross × Fringe Percentage
```

**Common Fringe Benefits Included:**
- Health insurance
- Retirement contributions (401k, pension)
- Life insurance
- Disability insurance
- Paid time off (vacation, sick days)
- Social Security taxes (employer portion)
- Medicare taxes (employer portion)
- Unemployment insurance
- Workers compensation insurance

**Typical Fringe Rates:**
- **Low:** 10-15% (minimal benefits)
- **Average:** 20-30% (typical employer)
- **High:** 30-40% (government, union, comprehensive benefits)

**Important Notes:**
- Based on BF Gross, NOT BF Adjusted
- Represents employer cost, not take-home pay
- Should match the plaintiff's actual benefit structure
- Document with employer records or industry standards

**Example:**
```
BF Gross: $67,366
Fringe %: 20%
BF Fringe: $13,473.20

Total But-For Compensation: $67,642 (Adjusted) + $13,473 = $81,115
```

---

### 7. ACT Earn

**Full Name:** Actual Earnings (Mitigation)

**What it is:** What the plaintiff **actually earned** (or could earn) after the injury

**Example:** $22,000.00

**Purpose:**
- Represents mitigation of damages
- Reduces the net loss
- Shows plaintiff's post-injury earning capacity

**When it applies:**
- Plaintiff returned to work (reduced capacity)
- Plaintiff found different job (lower pay)
- Plaintiff worked part-time
- Plaintiff received unemployment benefits
- Plaintiff had any post-injury income

**When it's $0.00:**
- Before plaintiff returned to work
- During periods of unemployment
- If plaintiff is totally disabled

**Can be:**
- **Automatic** - Calculated from start date + growth rate
- **Manual** - Edited year-by-year (yellow cells in Edit Mode)

**Examples:**

**Scenario 1: Part-Time Return**
```
But-For: $65,000/year (full-time)
Actual: $22,000/year (part-time)
Loss: $43,000/year
```

**Scenario 2: Different Job**
```
But-For: $75,000 (original career)
Actual: $35,000 (new job, different field)
Loss: $40,000
```

**Scenario 3: Unemployment Period**
```
2023: Actual = $0 (not working)
2024: Actual = $8,000 (unemployment benefits)
2025: Actual = $30,000 (new job)
```

---

### 8. ACT Fringe

**Full Name:** Actual Fringe Benefits

**What it is:** The value of benefits from actual post-injury employment

**Example:** $2,200.00 (10% of $22,000)

**How calculated:**
```
ACT Earn × Actual Fringe Percentage
```

**Purpose:**
- Accounts for benefits plaintiff actually receives
- Reduces net loss appropriately
- May be different percentage than but-for fringe

**Why it might be different from BF Fringe %:**
- Part-time work = fewer/no benefits
- Different employer = different benefit package
- Gig economy = no benefits
- Self-employment = different structure

**Examples:**

**Full Benefits:**
```
ACT Earn: $40,000
ACT Fringe %: 20%
ACT Fringe: $8,000
```

**No Benefits (gig work):**
```
ACT Earn: $25,000
ACT Fringe %: 0%
ACT Fringe: $0
```

**Reduced Benefits (part-time):**
```
ACT Earn: $20,000
ACT Fringe %: 5% (minimal)
ACT Fringe: $1,000
```

---

### 9. Loss

**What it is:** The total economic loss for that year

**Example:** $59,415.80

**How calculated:**
```
Loss = (BF Adjusted + BF Fringe) - (ACT Earn + ACT Fringe)
```

**Full Formula:**
```
Loss = Total But-For - Total Actual
     = (BF Adjusted + BF Fringe) - (ACT Earn + ACT Fringe)
```

**Purpose:**
- Shows the net economic harm
- The core damage amount for each year
- Before time-value adjustments (PV/interest)

**Example Calculation:**
```
BF Adjusted: $54,275.80
BF Fringe:   $13,473.20
Subtotal:    $67,749.00

ACT Earn:    $22,000.00
ACT Fringe:  $2,200.00
Subtotal:    $24,200.00

Loss = $67,749.00 - $24,200.00 = $43,549.00
```

**Can be negative?**
- Theoretically yes, but formula uses `Math.max(0, loss)`
- If actual earnings exceed but-for, loss = $0
- This would be unusual but possible (e.g., career change to higher-paying field)

---

### 10. Past

**What it is:** The portion of loss that occurred in the **past** (before report date)

**Example:** $43,549.00 (if entire loss is past)

**Purpose:**
- Separates past damages from future damages
- Past damages already occurred
- Future damages are projected
- Different legal treatment in many jurisdictions

**How determined:**

**Year BEFORE report year:**
```
Past = Full Loss
Future = $0
```

**Year OF report date:**
```
Past = Loss × (portion of year before report date)
Future = Loss × (portion of year after report date)
```

**Year AFTER report year:**
```
Past = $0
Future = Full Loss
```

**Example:**
```
Report Date: July 1, 2025

Year 2024: Past = Full Loss, Future = $0
Year 2025: Past = 50% of Loss, Future = 50% of Loss
Year 2026: Past = $0, Future = Full Loss
```

**Why separate?**
- Past damages are certain (already happened)
- Future damages are speculative (might happen)
- Different discount/interest treatment
- Different legal standards in some jurisdictions

---

### 11. Past+Int

**Full Name:** Past Damages with Prejudgment Interest

**What it is:** Past damages **plus** interest from when the loss occurred to the report date

**Example:** $45,127.35

**Purpose:**
- Compensates for time value of money
- Loss occurred in past; plaintiff couldn't invest/use that money
- Makes plaintiff "whole" for the delay

**How calculated:**
```
If prejudgment interest is ENABLED:
  Past+Int = Past × (1 + interest_rate × years_from_midyear_to_report)

If prejudgment interest is DISABLED:
  Past+Int = Past (no change)
```

**When interest applies:**
- Checkbox: "Apply prejudgment interest to past damages"
- Uses same rate as discount rate
- Calculated from year midpoint to report date

**Example:**
```
Past Loss: $43,549 (in 2024)
Year Midpoint: July 1, 2024
Report Date: January 15, 2025
Time Difference: 0.54 years
Interest Rate: 5%
Interest: $43,549 × 5% × 0.54 = $1,176

Past+Int = $43,549 + $1,176 = $44,725
```

**Legal Considerations:**
- Some jurisdictions require prejudgment interest
- Some allow it at judge's discretion
- Rate varies by jurisdiction
- May be statutory or market-based

---

### 12. Future

**What it is:** The portion of loss that will occur in the **future** (after report date)

**Example:** $43,549.00 (if entire loss is future)

**Purpose:**
- Represents projected future losses
- Must be discounted to present value
- Speculative (hasn't happened yet)

**Determination:**
See "Past" column definition above - mirror image.

**Key Difference from Past:**
- Past = already happened (certain)
- Future = will happen (projected, must discount to PV)

**Example:**
```
Report Date: January 15, 2025

Year 2023: Future = $0 (before report)
Year 2024: Future = $0 (before report)
Year 2025: Future = partial (after Jan 15)
Year 2026: Future = full loss
Year 2027: Future = full loss
...
```

---

### 13. PV(Future)

**Full Name:** Present Value of Future Damages

**What it is:** What future damages are worth **today** (at report date)

**Example:** $41,876.23

**Why it's less than Future:** Money today is worth more than the same amount in the future

**Purpose:**
- Converts future dollars to present-day value
- Accounts for time value of money
- Provides lump sum equivalent

**How calculated:**

**Net Discount Rate (NDR) Method:**
```
PV = Future / (1 + NDR)^years_from_report
```

**Nominal Rate Method:**
```
PV = Future / (1 + discount_rate)^years_from_report
```

**Real Rate Method:**
```
PV = Future / (1 + real_rate)^years_from_report
```

**Example:**
```
Future Loss in 2030: $50,000
Report Date: 2025
Years from report: 5 years
Discount Rate (NDR): 1.5%

PV = $50,000 / (1.015)^5
PV = $50,000 / 1.0773
PV = $46,412

Interpretation: $50,000 in 2030 = $46,412 today
```

**Key Concept - Time Value of Money:**
```
Would you rather have:
A) $50,000 today, or
B) $50,000 in 5 years?

Most people choose A because:
- Can invest it and earn returns
- Inflation erodes future value
- Uncertainty about receiving it

That's why future damages must be discounted!
```

**Discount Rates:**
- **Low (1-2%)** - Conservative, benefits plaintiff
- **Medium (2-4%)** - Typical in many cases
- **High (5%+)** - Aggressive, benefits defendant

---

## Summary Table

| Column | What It Represents | Typical Value |
|--------|-------------------|---------------|
| **Year** | Calendar year | 2024 |
| **Age** | Plaintiff's age | 34.50 |
| **Yr Portion** | Fraction of year | 1.000 |
| **BF Gross** | But-for earnings before adjustments | $67,366 |
| **BF Adjusted x AEF** | But-for after AEF factors | $54,276 |
| **BF Fringe** | But-for benefits | $13,473 |
| **ACT Earn** | Actual/mitigation earnings | $22,000 |
| **ACT Fringe** | Actual benefits | $2,200 |
| **Loss** | Net economic loss | $43,549 |
| **Past** | Loss that already occurred | $43,549 or $0 |
| **Past+Int** | Past loss with interest | $45,127 |
| **Future** | Loss that will occur | $0 or $43,549 |
| **PV(Future)** | Present value of future loss | $41,876 |

---

## Flow of Calculations

```
1. Start with BF Gross (what they would have earned)
   ↓
2. Apply AEF factors → BF Adjusted
   ↓
3. Add fringe benefits → Total But-For
   ↓
4. Calculate actual earnings and benefits → Total Actual
   ↓
5. Subtract: Total But-For - Total Actual = Loss
   ↓
6. Split loss into Past and Future (based on report date)
   ↓
7. Past → Apply prejudgment interest → Past+Int
   ↓
8. Future → Discount to present value → PV(Future)
   ↓
9. Sum: Past+Int + PV(Future) = Total Damages (PV)
```

---

## Common Questions

### Q: Why is BF Adjusted less than BF Gross?
**A:** AEF adjusts for taxes, unemployment, and other factors to show "net" earning capacity. If AEF is off, they're equal.

### Q: Why does Yr Portion matter?
**A:** Prevents double-counting in incident/retirement years. Only counts the actual period of loss.

### Q: Can ACT Earn be higher than BF Gross?
**A:** Theoretically yes (career change to better job), but rare. Loss would be $0 in that case.

### Q: What if Past+Int is blank?
**A:** That year's loss is entirely future (after report date). Or prejudgment interest is disabled.

### Q: Why is PV(Future) important?
**A:** Courts award lump sums today. PV converts future annual losses to equivalent lump sum.

### Q: What's the difference between Past and Future?
**A:** Past = already happened (certain). Future = will happen (projected, must discount).

### Q: Which columns can I manually edit?
**A:** ACT Earn and ACT Fringe (in Edit Mode). All others calculate automatically.

---

## Real-World Example

**Case: Carmen Ramirez, Age 34**
- **Incident:** June 20, 2023 (car accident)
- **Report:** January 15, 2025
- **But-for earnings:** $65,000/year, 3% growth, 20% fringe
- **AEF:** 0.8056 (80.56%)
- **Returned to work:** January 1, 2024 at $22,000/year, 10% fringe

**Year 2023 (Incident Year):**
```
Year: 2023
Age: 33.50
Yr Portion: 0.531 (Jun 20 - Dec 31)
BF Gross: $34,515 ($65,000 × 0.531)
BF Adjusted: $27,802 ($34,515 × 0.8056)
BF Fringe: $6,903 ($34,515 × 20%)
ACT Earn: $0 (not working yet)
ACT Fringe: $0
Loss: $34,705 ($27,802 + $6,903 - $0)
Past: $34,705 (all past)
Past+Int: $35,421 (with interest)
Future: $0
PV(Future): $0
```

**Year 2024 (Full Year, Returned to Work):**
```
Year: 2024
Age: 34.50
Yr Portion: 1.000
BF Gross: $66,950 ($65,000 × 1.03)
BF Adjusted: $53,935 ($66,950 × 0.8056)
BF Fringe: $13,390 ($66,950 × 20%)
ACT Earn: $22,000 (new part-time job)
ACT Fringe: $2,200 ($22,000 × 10%)
Loss: $43,125 ($53,935 + $13,390 - $22,000 - $2,200)
Past: $43,125 (all past)
Past+Int: $44,038 (with interest)
Future: $0
PV(Future): $0
```

**Year 2025 (Report Year - Partial):**
```
Year: 2025
Age: 35.50
Yr Portion: 1.000
BF Gross: $68,959
BF Adjusted: $55,551
BF Fringe: $13,792
ACT Earn: $22,000
ACT Fringe: $2,200
Loss: $45,143
Past: $1,818 (0.04 of year before Jan 15)
Past+Int: $1,818 (minimal time for interest)
Future: $43,325 (0.96 of year after Jan 15)
PV(Future): $42,681 (discounted)
```

---

## Related Documents

- **MANUAL_EARNINGS_EDIT_GUIDE.md** - How to manually edit ACT Earn values
- **PAST_EARNINGS_OFFSET_GUIDE.md** - Understanding offset periods
- **README.md** - Complete feature documentation
- **CHANGELOG.md** - Version history

---

**Version:** 1.3
**Last Updated:** November 2025
**Purpose:** Educational reference for forensic economics calculations

