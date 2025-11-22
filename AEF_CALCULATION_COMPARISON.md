# AEF Calculation Method Comparison

## Current Implementation (What We're Doing Now)

### Wage AEF Formula:
```
Wage AEF = (WLE/YFS) × (1 - UR×(1-URF)) × (1 - TL_eff) × (1 - PC) × (1 - PM)

Where:
- WLE/YFS = Work-Life Expectancy / Years to Final Separation
- UR = Unemployment Rate
- URF = Unemployment Reimbursement Factor
- TL_eff = Effective Tax Rate = 1 - (1 - TLF) × (1 - TLS)
  - TLF = Federal Tax Rate
  - TLS = State Tax Rate
- PC = Personal Consumption (Wrongful Death only)
- PM = Personal Maintenance (Wrongful Death only)
```

### Fringe AEF Options:
1. **None**: Fringe AEF = 1.0 (no adjustment)
2. **Partial**: Fringe AEF = (WLE/YFS) × (1 - UR×(1-URF)) [excludes tax]
3. **Full**: Fringe AEF = Same as Wage AEF

### Order of Operations:
1. Calculate gross but-for wages
2. Apply Wage AEF to wages → Adjusted Wages
3. Calculate gross fringe benefits
4. Apply Fringe AEF to fringes → Adjusted Fringes
5. Add Adjusted Wages + Adjusted Fringes + Legal Benefits = Total But-For

---

## Traditional AEF Method (Tinari/Standard Approach)

### Standard Formula:
```
AEF = (WLE/YFS) × (1 - U) × (1 - T) × (1 - PC) × (1 - PM)

Where:
- WLE/YFS = Work-Life Ratio
- U = Net Unemployment Rate after benefits
- T = Tax Rate (often additive: TLF + TLS, or multiplicative: 1-(1-TLF)×(1-TLS))
- PC = Personal Consumption (WD only)
- PM = Personal Maintenance (WD only)
```

### Key Differences:
1. **Unemployment Treatment**:
   - Current: UR × (1 - URF) = Net effective unemployment
   - Traditional: U = direct unemployment factor

2. **Tax Treatment**:
   - Current: Using multiplicative method [1 - (1-TLF)×(1-TLS)]
   - Traditional: Often uses additive method [TLF + TLS] or multiplicative

3. **Fringe Treatment**:
   - Current: Separate Fringe AEF with 3 options
   - Traditional: Often applies same AEF to total compensation OR no AEF on fringes

---

## Questions for Clarification:

### 1. Unemployment Factor
**Current**: We use `UR × (1 - URF)` to get "effective unemployment"
- Example: 3.5% UR × (1 - 30% URF) = 2.45% effective

**Should we instead**:
- Use a direct "net unemployment rate" input?
- Keep the current UR/URF breakdown?

### 2. Tax Method
**Current**: Multiplicative tax method `1 - (1-TLF)×(1-TLS)`
- Example: Fed 22% + State 5% = 25.9% effective (not 27%)

**Should we**:
- Keep multiplicative (more accurate)?
- Switch to additive TLF + TLS?
- Offer both options?

### 3. Fringe Benefit Treatment
**Current**: Separate Fringe AEF with 3 modes

**Should we**:
- Apply same AEF to both wages AND fringes (traditional)?
- Keep separate treatment but default differently?
- Apply no AEF to fringes (they accrue regardless)?

### 4. Application Order
**Current**:
```
But-For Total = (Wages × Wage_AEF) + (Fringes × Fringe_AEF) + Legals
```

**Should it be**:
```
Option A: AEF × (Wages + Fringes) + Legals  [Apply AEF to total compensation]
Option B: (Wages × AEF) + Fringes + Legals   [Apply AEF only to wages]
Option C: Current approach                    [Separate AEFs]
```

---

## Recommendation

**Please clarify which specific aspects need updating:**

1. ✓ Unemployment calculation (UR × (1-URF) vs direct factor)
2. ✓ Tax calculation method (multiplicative vs additive)
3. ✓ Fringe benefit AEF treatment
4. ✓ Order of application

**Example cases would help:**
- "For a case with $65,000 wages, 20% fringes, 3.5% UR, 30% URF, 22% Fed Tax, 5% State Tax..."
- "...the AEF should be calculated as..."
- "...and applied to wages as... and fringes as..."

This will ensure I implement exactly the methodology you want.
