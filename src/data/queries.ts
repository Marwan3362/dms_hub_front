import { QueryPreset } from '../types';

export const SAMPLE_QUERIES: QueryPreset[] = [
  {
    id: 'query-oee-anomalies',
    title: 'OEE Anomaly Detection (Industrial ERP)',
    titleAr: 'كشف انحرافات الكفاءة الكلية للمعدات OEE (الصناعي)',
    product: 'industrial_erp',
    description: 'Calculates 24-hour rolling Overall Equipment Effectiveness (OEE) across 5 manufacturing lines to highlight micro-stoppages and thermal deviations.',
    descriptionAr: 'حساب كفاءة المعدات الشاملة (OEE) على مدار ٢٤ ساعة عبر ٥ خطوط إنتاج لكشف فترات التوقف الصغيرة والتغيرات الحرارية.',
    sqlQuery: `-- Read-Only Sandbox Query: OEE Telemetry & Downtime Analysis
SELECT 
    w.work_center_code AS [Line ID],
    w.machine_name AS [Machine Name],
    ROUND(AVG(t.availability_pct), 1) AS [Availability %],
    ROUND(AVG(t.performance_pct), 1) AS [Performance %],
    ROUND(AVG(t.quality_pct), 1) AS [Quality %],
    ROUND(AVG(t.oee_score), 1) AS [Overall OEE %],
    SUM(t.micro_stops_count) AS [Micro Stops],
    MAX(t.bearing_temp_celsius) AS [Max Temp (°C)]
FROM syn_erp_work_centers w
JOIN syn_erp_telemetry_24h t ON w.work_center_id = t.work_center_id
GROUP BY w.work_center_code, w.machine_name
ORDER BY [Overall OEE %] ASC;`,
    executionTimeMs: 38,
    rowsCount: 5,
    results: [
      {
        'Line ID': 'LINE-04-ROLL',
        'Machine Name': 'Rolling Mill High-Speed B',
        'Availability %': 72.4,
        'Performance %': 78.1,
        'Quality %': 96.2,
        'Overall OEE %': 54.4,
        'Micro Stops': 19,
        'Max Temp (°C)': 82.5
      },
      {
        'Line ID': 'LINE-01-STAMP',
        'Machine Name': 'Hydraulic Press 800-Ton',
        'Availability %': 88.0,
        'Performance %': 84.5,
        'Quality %': 97.8,
        'Overall OEE %': 72.7,
        'Micro Stops': 7,
        'Max Temp (°C)': 64.1
      },
      {
        'Line ID': 'LINE-03-INJECT',
        'Machine Name': 'Plastic Injection Unit A',
        'Availability %': 91.2,
        'Performance %': 89.0,
        'Quality %': 98.4,
        'Overall OEE %': 79.9,
        'Micro Stops': 4,
        'Max Temp (°C)': 58.7
      },
      {
        'Line ID': 'LINE-02-EXTRUDE',
        'Machine Name': 'Dual-Screw PVC Extruder',
        'Availability %': 94.6,
        'Performance %': 93.2,
        'Quality %': 99.1,
        'Overall OEE %': 87.4,
        'Micro Stops': 2,
        'Max Temp (°C)': 52.0
      },
      {
        'Line ID': 'LINE-05-ASSEMBLY',
        'Machine Name': 'Automated Robotic Cell C',
        'Availability %': 97.5,
        'Performance %': 96.0,
        'Quality %': 99.5,
        'Overall OEE %': 93.1,
        'Micro Stops': 1,
        'Max Temp (°C)': 44.8
      }
    ],
    chartConfig: {
      xAxisKey: 'Line ID',
      yAxisKeys: [
        { key: 'Overall OEE %', label: 'Overall OEE %', labelAr: 'الكفاءة الكلية %', color: '#1E5BB8' },
        { key: 'Availability %', label: 'Availability %', labelAr: 'الجاهزية %', color: '#2E9445' }
      ],
      type: 'bar'
    }
  },
  {
    id: 'query-icu-bed-occupancy',
    title: 'ICU Bed Occupancy Forecast (HMS)',
    titleAr: 'توقعات إشغال أسرة العناية المركزة (طبي)',
    product: 'hms',
    description: 'Synthetic hospital inpatient analysis tracking bed utilization, ventilator allocation, and 72-hour predicted discharge velocity.',
    descriptionAr: 'تحليل استشفائي لبيانات اصطناعية يوضح نسب إشغال أسرة الرعاية المركزة وتوافر أجهزة التنفس وسرعة الخروج المتوقعة.',
    sqlQuery: `-- Read-Only Sandbox Query: Synthetic ICU Occupancy Tracking
SELECT 
    b.ward_unit_name AS [ICU Unit],
    b.total_bed_count AS [Total Beds],
    b.occupied_beds AS [Occupied],
    b.ventilator_active AS [On Ventilator],
    ROUND((CAST(b.occupied_beds AS FLOAT) / b.total_bed_count) * 100, 1) AS [Occupancy Rate %],
    b.pending_discharges_24h AS [Discharges 24h],
    b.synthetic_triage_acuity_avg AS [Avg Acuity Score]
FROM syn_hms_wards b
WHERE b.is_critical_care = 1
ORDER BY [Occupancy Rate %] DESC;`,
    executionTimeMs: 29,
    rowsCount: 4,
    results: [
      {
        'ICU Unit': 'Cardiothoracic ICU',
        'Total Beds': 16,
        'Occupied': 15,
        'On Ventilator': 9,
        'Occupancy Rate %': 93.8,
        'Discharges 24h': 2,
        'Avg Acuity Score': 4.6
      },
      {
        'ICU Unit': 'General Surgical ICU',
        'Total Beds': 24,
        'Occupied': 21,
        'On Ventilator': 8,
        'Occupancy Rate %': 87.5,
        'Discharges 24h': 5,
        'Avg Acuity Score': 3.9
      },
      {
        'ICU Unit': 'Neuro-Critical ICU',
        'Total Beds': 12,
        'Occupied': 9,
        'On Ventilator': 4,
        'Occupancy Rate %': 75.0,
        'Discharges 24h': 1,
        'Avg Acuity Score': 4.1
      },
      {
        'ICU Unit': 'Pediatric ICU (PICU)',
        'Total Beds': 10,
        'Occupied': 6,
        'On Ventilator': 2,
        'Occupancy Rate %': 60.0,
        'Discharges 24h': 3,
        'Avg Acuity Score': 3.2
      }
    ],
    chartConfig: {
      xAxisKey: 'ICU Unit',
      yAxisKeys: [
        { key: 'Occupancy Rate %', label: 'Occupancy %', labelAr: 'نسبة الإشغال %', color: '#D7262E' },
        { key: 'Total Beds', label: 'Total Capacity', labelAr: 'إجمالي السعة', color: '#64748B' }
      ],
      type: 'bar'
    }
  },
  {
    id: 'query-cost-deviation',
    title: 'Cost Deviation Report (Industrial ERP)',
    titleAr: 'تقرير انحراف تكلفة التصنيع والمعايير (الصناعي)',
    product: 'industrial_erp',
    description: 'Audits BOM variance against actual material purchase prices and energy usage tariffs in Egyptian Pounds (EGP).',
    descriptionAr: 'تدقيق فروق تكاليف قائمة المواد BOM مقارنة بأسعار الشراء الفعلية واستهلاك الطاقة بالجنيه المصري.',
    sqlQuery: `-- Read-Only Sandbox Query: Manufacturing Cost Variance
SELECT 
    p.product_family AS [Product Family],
    p.standard_cost_egp AS [Standard Cost EGP],
    p.actual_cost_egp AS [Actual Cost EGP],
    p.variance_egp AS [Variance EGP],
    ROUND(((p.actual_cost_egp - p.standard_cost_egp) / p.standard_cost_egp) * 100, 2) AS [Deviation %],
    p.primary_driver AS [Variance Driver]
FROM syn_erp_standard_costing p
ORDER BY [Deviation %] DESC;`,
    executionTimeMs: 44,
    rowsCount: 4,
    results: [
      {
        'Product Family': 'Special Alloy Extrusions',
        'Standard Cost EGP': 145000,
        'Actual Cost EGP': 161200,
        'Variance EGP': 16200,
        'Deviation %': 11.17,
        'Variance Driver': 'Imported Zinc & Titanium Surcharge'
      },
      {
        'Product Family': 'Reinforced PVC Heavy',
        'Standard Cost EGP': 88000,
        'Actual Cost EGP': 93800,
        'Variance EGP': 5800,
        'Deviation %': 6.59,
        'Variance Driver': 'Polymer Resin Spot Price Hike'
      },
      {
        'Product Family': 'Precision Steel Stampings',
        'Standard Cost EGP': 210000,
        'Actual Cost EGP': 213500,
        'Variance EGP': 3500,
        'Deviation %': 1.67,
        'Variance Driver': 'Overtime Electricity Tariff Peak'
      },
      {
        'Product Family': 'Standard Aluminum Profiles',
        'Standard Cost EGP': 320000,
        'Actual Cost EGP': 312000,
        'Variance EGP': -8000,
        'Deviation %': -2.50,
        'Variance Driver': 'Bulk Ingot Volume Rebate Achieved'
      }
    ],
    chartConfig: {
      xAxisKey: 'Product Family',
      yAxisKeys: [
        { key: 'Standard Cost EGP', label: 'Standard Cost', labelAr: 'التكلفة المعيارية', color: '#2E9445' },
        { key: 'Actual Cost EGP', label: 'Actual Cost', labelAr: 'التكلفة الفعلية', color: '#F5C518' }
      ],
      type: 'bar'
    }
  },
  {
    id: 'query-antibiotic-audit',
    title: 'Pharmacy Antibiotic Dispense Audit (HMS)',
    titleAr: 'تدقيق صرف المضادات الحيوية بالصيدلية (طبي)',
    product: 'hms',
    description: 'Antimicrobial stewardship monitoring synthetic prescription records to flag restricted antibiotic dispensing against lab culture sensitivities.',
    descriptionAr: 'برنامج حوكمة المضادات الحيوية في بيانات المستشفى التجريبية للتحقق من توافق الصرف مع نتائج مزارع البكتيريا.',
    sqlQuery: `-- Read-Only Sandbox Query: Antimicrobial Stewardship Audit
SELECT 
    d.drug_generic_name AS [Antimicrobial Agent],
    d.drug_class AS [Class],
    d.total_dispensed_doses AS [Dispensed Doses],
    d.confirmed_culture_pct AS [Lab Culture Verified %],
    d.approval_status AS [Stewardship Approval],
    d.synthetic_risk_level AS [Risk Level]
FROM syn_hms_pharmacy_audit d
WHERE d.is_restricted_antimicrobial = 1
ORDER BY d.total_dispensed_doses DESC;`,
    executionTimeMs: 31,
    rowsCount: 4,
    results: [
      {
        'Antimicrobial Agent': 'Meropenem IV 1g',
        'Class': 'Carbapenem',
        'Dispensed Doses': 342,
        'Lab Culture Verified %': 94.2,
        'Stewardship Approval': 'Approved by Infectious Disease Consultant',
        'Risk Level': 'HIGH RESTRICTION'
      },
      {
        'Antimicrobial Agent': 'Vancomycin 500mg IV',
        'Class': 'Glycopeptide',
        'Dispensed Doses': 218,
        'Lab Culture Verified %': 89.0,
        'Stewardship Approval': 'Approved with TDM Monitoring',
        'Risk Level': 'HIGH RESTRICTION'
      },
      {
        'Antimicrobial Agent': 'Colistin 1M IU',
        'Class': 'Polymyxin',
        'Dispensed Doses': 64,
        'Lab Culture Verified %': 100.0,
        'Stewardship Approval': 'Multidisciplinary Panel Clearance',
        'Risk Level': 'RESERVE GROUP'
      },
      {
        'Antimicrobial Agent': 'Piperacillin / Tazobactam',
        'Class': 'Penicillin Extended',
        'Dispensed Doses': 490,
        'Lab Culture Verified %': 82.5,
        'Stewardship Approval': 'Standard Empirical Protocol',
        'Risk Level': 'WATCH GROUP'
      }
    ],
    chartConfig: {
      xAxisKey: 'Antimicrobial Agent',
      yAxisKeys: [
        { key: 'Dispensed Doses', label: 'Dispensed Doses', labelAr: 'الجرعات المصروفة', color: '#1E5BB8' },
        { key: 'Lab Culture Verified %', label: 'Lab Verified %', labelAr: 'مؤكدة بالمزرعة %', color: '#2E9445' }
      ],
      type: 'bar'
    }
  }
];
