# UPS Fringe Benefits Calculator Guide

## Overview

The But-For Damages Analyzer now includes comprehensive UPS-specific fringe benefits calculations based on the UPS National Master Agreements (2013-2028). This feature provides accurate calculations for Health & Welfare (H&W) and Pension contributions according to Teamsters contract terms.

## Features

### 1. UPS-Specific Fringe Benefit Calculation

The calculator now supports two fringe benefit methods:

- **Simple % of Pay**: Traditional percentage-based calculation
- **UPS-Specific (H&W + Pension)**: Detailed calculation based on UPS contract terms

### 2. Contract Period Coverage

The system automatically applies the correct rates based on the year:

#### 2023-2028 Contract (Current)
- **Wage Increases**: $2.75 (2023), $0.75 (2024-2025), $1.00 (2026), $2.25 (2027) per hour
- **H&W Allocation**: $0.50/hour annually (both full-time and part-time)
- **Weekly Increase**: $40.00 total (H&W + Pension)
- **Pension Accrual**: $65.00 per credited service year
- **Max Service Years**: 35 years

#### 2018-2023 Contract
- **Wage Increases**: Varied by year (estimated $0.70-$2.75/hr)
- **H&W Allocation**:
  - Full-time: $0.50/hour
  - Part-time: $0.30/hour (2018-2020), up to $0.50 (2021-2022)
- **Weekly Increase**: $40.00 total
- **Pension Accrual**: $60.00 per credited service year
- **Max Service Years**: 35 years

#### 2013-2018 Contract
- **Wage Increases**: Estimated average of $0.70/hour
- **H&W Allocation**: $0.50/hour
- **Weekly Increase**: $40.00 total
- **Pension Accrual**: $55.00 per credited service year
- **Max Service Years**: 35 years

### 3. Employment Type Support

- **Full-Time**: Standard 2,080 hours per year
- **Part-Time**: Adjusted rates for H&W contributions (2018-2023 contract)

### 4. Job Classifications

- **Driver (Article 41)**: Full-time drivers
- **Warehouse (Article 22)**: Part-time and warehouse workers

## How to Use

### Step 1: Enable UPS Fringe Benefits

1. Navigate to the **But-For Stream** section in the left sidebar
2. Change **Fringe Benefit Method** from "Simple % of Pay" to "UPS-Specific (H&W + Pension)"
3. The **UPS Fringe Benefits** section will appear below

### Step 2: Configure UPS Settings

In the **UPS Fringe Benefits** section, configure:

- **Employment Type**: Full-Time or Part-Time
- **Job Classification**: Driver (Article 41) or Warehouse (Article 22)
- **Weekly H&W + Pension Increase**: Default $40 (per UPS NMA)
- **H&W Hourly Allocation**: Default $0.50/hour (per UPS NMA)
- **Current Pension Accrual**: Default $65/year (2023-2028 contract)
- **Max Credited Service Years**: Default 35 years

### Step 3: Optional - Use UPS Wage Growth

For accurate wage growth projections:

1. In the **But-For Stream** section, change **Growth Method** to "UPS Contract Rates (2023-2028)"
2. This automatically applies the actual wage increases from the UPS contract:
   - 2023: $2.75/hour
   - 2024: $0.75/hour
   - 2025: $0.75/hour
   - 2026: $1.00/hour
   - 2027: $2.25/hour

### Step 4: Run Calculation

1. Click the **Compute** button at the bottom of the left sidebar
2. Review the detailed breakdown in the tables showing:
   - H&W contributions
   - Pension contributions
   - Total fringe benefits

## Calculation Methodology

### Health & Welfare (H&W) Calculation

```
H&W Annual = H&W Rate per Hour × Hours per Year × Year Portion
```

**Example** (Full-time employee, 2023-2028 contract):
```
H&W Annual = $0.50/hr × 2,080 hours × 1.0 = $1,040
```

### Pension Calculation

The pension contribution is derived from the total weekly increase minus the H&W allocation:

```
Weekly Pension = Total Weekly Increase - (H&W Rate × 40 hours)
Pension Annual = (Weekly Pension × 52 weeks) × Year Portion
```

**Example** (2023-2028 contract):
```
Weekly Pension = $40.00 - ($0.50 × 40) = $20.00
Pension Annual = ($20.00 × 52) × 1.0 = $1,040
```

### Total Fringe Benefits

```
Total Fringe = H&W Annual + Pension Annual
```

**Example** (Full-time, 2023-2028):
```
Total Fringe = $1,040 + $1,040 = $2,080 per year
```

This represents approximately **10%** of a typical $20,000 annual base wage for a full-time UPS employee working 2,080 hours.

## Pension Benefit Calculation

### Lifetime Pension Benefits (2023-2028)

For a full-career UPS employee:

```
Monthly Benefit = Pension Accrual × Credited Service Years (max 35)
```

**Example** (35 years of service):
```
Monthly Benefit = $65 × 35 = $2,275/month
Annual Benefit = $2,275 × 12 = $27,300/year
```

### Fixed Retirement Benefits (Part-Time Members)

The UPS Pension Plan provides fixed retirement benefits for part-time members:

- **35 years @ $65/year**: $2,450/month (any age)
- **30 years @ $70/year**: $2,100/month (any age)
- **25 years @ $70/year**: $1,750/month (at age 60)
- **25 years @ $58/year**: $1,450/month (any age)

## Output Tables

When using UPS-specific fringe benefits, the output tables include additional columns:

### Standard Columns
- Year
- Age
- Year Portion
- BF Gross (Base earnings)
- BF Adjusted × AEF (After adjustment factor)

### UPS-Specific Columns
- **H&W**: Health & Welfare contribution
- **Pension**: Pension contribution
- **Total Fringe**: Combined H&W + Pension

### Remaining Columns
- ACT Earn (Actual earnings)
- ACT Fringe (Actual fringe benefits)
- Loss (Economic loss)
- Past (Past damages)
- Past+Int (Past with interest)
- Future (Future damages)
- PV(Future) (Present value of future)

## Economic Modeling Considerations

### Growth Rates

When modeling UPS cases, use these growth rate assumptions:

| Component | 2013-2018 | 2018-2023 | 2023-2028 |
|-----------|-----------|-----------|-----------|
| Weekly H&W + Pension Increase | +$40 | +$40 | +$40 |
| H&W Allocation (per hour) | $0.50 | $0.50 | $0.50 |
| Pension Accrual ($/year) | $55 | $60 | $65 |
| Pension Growth Rate | ~9% | ~9% | ~8% |
| Wage Growth (Top Rate Driver) | ~3% avg | ~3.5% avg | ~4.6% avg |

### Discounting

Apply appropriate discount rates:

- **Real Discount Rate**: 2.5-3.5% (consistent with SSA Trustees or BLS forecasts)
- **Nominal Discount Rate**: Adjust for wage/benefit inflation

### Employer Fringe Rate

Combined H&W and Pension contributions typically range from:

- **$20-25/hour** for full-time union employees
- Based on $40/week annual growth and prevailing rates

## Sources and Citations

All data is derived from:

- **UPS National Master Agreement 2023-2028** (Articles 34 & 41)
- **UPS National Master Agreement 2018-2023** (Articles 33-34)
- **UPS National Master Agreement 2013-2018** (Articles 33-34)
- **TeamCare and Western Conference of Teamsters** plan trust allocations

## Best Practices

### 1. Case-Specific Customization

- Always verify employment type (full-time vs. part-time)
- Confirm job classification (driver vs. warehouse)
- Review actual contract dates if employee is in a supplement

### 2. Validation

- Compare calculated fringe benefits to actual pay stubs
- Verify pension accrual rates with the specific plan document
- Cross-reference with employee's benefit statements

### 3. Documentation

- Save profiles for each evaluee using the Profile Manager
- Export assumptions as JSON for reproducibility
- Include the UPS contract period in your report

### 4. Future Projections

- For years beyond 2028, the calculator defaults to 2023-2028 rates
- Consider using a conservative growth assumption for post-contract periods
- Discuss with legal counsel regarding long-term benefit projections

## Troubleshooting

### Fringe Benefits Seem Low

- Verify you selected "UPS-Specific" fringe method, not "Simple %"
- Check that the UPS Fringe Benefits section is visible
- Ensure H&W rate and weekly increase are set correctly

### Wage Growth Not Applying

- Confirm "Growth Method" is set to "UPS Contract Rates (2023-2028)"
- Verify incident/valuation dates align with contract periods
- Check that base earnings are reasonable for the position

### Table Columns Not Showing H&W and Pension

- Re-run the calculation by clicking "Compute"
- Refresh the browser if changes aren't reflected
- Verify the fringe method is saved in your profile

## Updates and Revisions

This guide is current as of the 2023-2028 UPS National Master Agreement. When new contracts are ratified:

1. Update the contract data in the `UPS_CONTRACT_DATA` section
2. Add new wage increase schedules
3. Update H&W and pension accrual rates
4. Test calculations against known scenarios

## Contact and Support

For technical issues or questions about the calculator:
- Review the main README.md file
- Check the CHANGELOG.md for recent updates
- Test calculations against known benchmark cases

For questions about UPS contracts and benefits:
- Consult the relevant UPS National Master Agreement
- Review TeamCare or applicable health plan documents
- Contact the local Teamsters union for clarification

---

**Last Updated**: November 2024
**Version**: 1.5 (UPS Fringe Benefits Update)
