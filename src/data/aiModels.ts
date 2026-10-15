import { AiModelItem } from '../types';

export const AI_MODELS: AiModelItem[] = [
  {
    id: 'ai-pred-maint',
    name: 'Industrial Predictive Maintenance (OPC-UA)',
    nameAr: 'الصيانة التنبؤية للمعدات الصناعية (OPC-UA)',
    product: 'industrial_erp',
    version: 'v3.2-prod',
    description: 'Analyzes high-frequency vibration spectrum, operating temperatures, and motor torque to predict bearing and hydraulic failures before unexpected line outages.',
    descriptionAr: 'تحليل ترددات الاهتزاز ودرجات الحرارة وعزم المحركات للتنبؤ بأعطال التروس والأنظمة الهيدروليكية قبل حدوث توقف مفاجئ.',
    accuracy: '97.4%',
    latencyMs: 142,
    sampleInput: {
      workCenterId: 'LINE-04-ROLLING-STAND-B',
      motorRpm: 1480,
      bearingTempCelsius: 79.4,
      vibrationRmsMmSec: 6.82,
      hydraulicPressureBar: 184.0,
      continuousRunningHours: 640
    },
    sampleOutput: {
      prediction: 'BEARING_INNER_RACE_FATIGUE_LIKELY',
      predictionAr: 'احتمال إجهاد في الحلقة الداخلية لمحمل الدوران (Bearing)',
      confidenceScores: [
        { label: 'Bearing Degradation', labelAr: 'تدهور محمل الدوران', score: 91.8 },
        { label: 'Hydraulic Cavitation', labelAr: 'تكويف هيدروليكي', score: 6.2 },
        { label: 'Normal Operation', labelAr: 'تشغيل طبيعي', score: 2.0 }
      ],
      recommendations: [
        'Schedule lubrication re-greasing during upcoming 18:00 shift changeover.',
        'Cap rolling mill speed to 85% until scheduled maintenance window.',
        'Automatically generate DMS ERP Preventative Maintenance Work Order #WO-8841.'
      ],
      recommendationsAr: [
        'جدولة تشحيم المحامل خلال استراحة تبديل الوردية في تمام الساعة ١٨:٠٠.',
        'تحديد سرعة الدوران بحد أقصى ٨٥٪ حتى موعد فحص الصيانة المخطط.',
        'توليد أمر صيانة وقائية رقم WO-8841 تلقائياً في نظام DMS Industrial ERP.'
      ],
      metadata: {
        timeToPredictedFailureHours: 42,
        sensorReliabilityIndex: 0.99
      }
    }
  },
  {
    id: 'ai-clinical-notes',
    name: 'Clinical Notes ICD-10 Classification',
    nameAr: 'تصنيف الملاحظات الطبية وترميز ICD-10',
    product: 'hms',
    version: 'v2.8-clinical',
    description: 'NLP transformer model trained on bilingual English/Arabic physician progress notes to extract medical concepts and recommend billing ICD-10 diagnostic codes.',
    descriptionAr: 'نموذج معالجة لغة طبيعية للملاحظات الطبية الثنائية (عربي/إنجليزي) لاستخراج التشخيص واقتراح أكواد منظومة التأمين والتسجيل الطبي.',
    accuracy: '94.8%',
    latencyMs: 180,
    sampleInput: {
      patientSyntheticId: 'PT-EGY-SYNTH-8812',
      chiefComplaint: 'Chest tightness radiating to left shoulder for 3 hours, associated with diaphoresis and mild nausea.',
      physicalExam: 'BP 155/95 mmHg, HR 102 bpm regular, normal S1/S2, no audible murmurs, lungs clear to auscultation.',
      ecgImpression: 'ST-segment elevation in leads V2-V4 suggestive of acute anterior wall injury.'
    },
    sampleOutput: {
      prediction: 'I21.0 - ST Elevation Myocardial Infarction of Anterior Wall',
      predictionAr: 'I21.0 - احتشاء حاد بعضلة القلب في الجدار الأمامي مع ارتفاع مقطع ST',
      confidenceScores: [
        { label: 'I21.0 Acute Anterior STEMI', labelAr: 'احتشاء حاد بالجدار الأمامي I21.0', score: 94.2 },
        { label: 'I20.0 Unstable Angina', labelAr: 'ذبحة صدرية غير مستقرة I20.0', score: 4.8 },
        { label: 'R07.9 Unspecified Chest Pain', labelAr: 'ألم صدر غير محدد R07.9', score: 1.0 }
      ],
      recommendations: [
        'Flag urgent activation of Cath Lab / Percutaneous Coronary Intervention (PCI).',
        'Auto-populate Egyptian Universal Health Insurance pre-authorization ticket.',
        'Notify on-call interventional cardiologist via DMS Emergency Mobile Alert.'
      ],
      recommendationsAr: [
        'تفعيل فوري لقسطرة القلب الطارئة والتداخل التاجي (PCI).',
        'تعبئة استمارة الموافقة المسبقة للتأمين الصحي الشامل تلقائياً.',
        'إرسال إشعار عاجل لاستشاري القلب المناوب عبر تطبيق DMS للطوارئ.'
      ],
      metadata: {
        extractedEntitiesCount: 8,
        syntheticDeIdentificationCleared: true
      }
    }
  },
  {
    id: 'ai-bed-occupancy',
    name: 'ICU Bed Occupancy & Discharge Forecaster',
    nameAr: 'التنبؤ بإشغال أسرة العناية وحركات الخروج',
    product: 'hms',
    version: 'v1.9-hms',
    description: 'Predicts 24 to 72-hour ICU inpatient occupancy rates, transfers to general wards, and ventilator liberation probability using synthetic clinical telemetry.',
    descriptionAr: 'التنبؤ بنسب إشغال الرعاية المركزة خلال ٢٤-٧٢ ساعة ومعدل فك أجهزة التنفس الصناعي وتحويل الحالات للأقسام الداخلية.',
    accuracy: '91.2%',
    latencyMs: 95,
    sampleInput: {
      currentOccupiedBeds: 15,
      totalCapacity: 16,
      patientsOnMechanicalVentilation: 9,
      averageStayDurationDays: 4.8,
      inboundErEmergencyArrivalsProjected: 3
    },
    sampleOutput: {
      prediction: 'CRITICAL_CAPACITY_BOTTLENECK_IN_18H',
      predictionAr: 'توقع وصول السعة للحد الحرج خلال ١٨ ساعة القادمة',
      confidenceScores: [
        { label: 'Capacity Bottleneck (>95%)', labelAr: 'عجز في الأسرة (>95%)', score: 87.5 },
        { label: 'Stable Operation (80-95%)', labelAr: 'تشغيل مستقر (80-95%)', score: 10.3 },
        { label: 'Surplus Capacity (<80%)', labelAr: 'سعة كافية فائضة (<80%)', score: 2.2 }
      ],
      recommendations: [
        'Identify 2 stabilized post-op patients eligible for step-down intermediate unit transfer.',
        'Alert on-call anesthesiology team to hold non-urgent elective major surgical admissions.',
        'Coordinate with nearby partner hospitals in DMS Regional Referral Network.'
      ],
      recommendationsAr: [
        'تحديد حالتين مستقرتين لنقلهما إلى وحدة الرعاية المتوسطة لتفريغ سريرين.',
        'تنبيه قسم التخدير بتأجيل الحالات الجراحية غير الطارئة التي تتطلب عناية مركزة.',
        'التنسيق الاحتياطي مع المستشفيات الشريكة في شبكة الإحالة الطبية التابعة لـ DMS.'
      ],
      metadata: {
        forecastHorizonHours: 72,
        estimatedDischarges24h: 3
      }
    }
  },
  {
    id: 'ai-defect-vision',
    name: 'Automated Quality Inspection Defect Classifier',
    nameAr: 'كشف عيوب التصنيع البصرية وفحص الجودة الآلي',
    product: 'industrial_erp',
    version: 'v4.0-edge',
    description: 'Computer vision classification model interfacing with industrial high-speed line cameras to classify surface micro-scratches, porosity, and edge burrs.',
    descriptionAr: 'نموذج رؤية حاسوبية متصل بكاميرات خطوط الإنتاج السريعة لكشف الخدوش والمسام الناتجة عن الصب وعيوب الحواف آلياً.',
    accuracy: '98.9%',
    latencyMs: 72,
    sampleInput: {
      inspectionCameraId: 'CAM-STAMPING-TOP-03',
      sheetBatchCode: 'EGY-ALU-COIL-400',
      feedSpeedMetersMin: 120,
      detectedAnomalyPixelArea: 48,
      surfaceReflectanceIndex: 0.88
    },
    sampleOutput: {
      prediction: 'SURFACE_MICRO_SCRATCH_CLASS_B',
      predictionAr: 'خدش سطحي دقيق - الفئة ب (ضمن الحدود المسموح بها بعد المعالجة)',
      confidenceScores: [
        { label: 'Surface Micro-Scratch', labelAr: 'خدش سطحي دقيق', score: 96.1 },
        { label: 'Material Porosity', labelAr: 'مسامية بالخامة', score: 2.8 },
        { label: 'Clean Conforming Surface', labelAr: 'سطح مطابق تماماً', score: 1.1 }
      ],
      recommendations: [
        'Route coil to automated buffing and finishing cell before final packaging.',
        'Log minor quality deviation in DMS ERP Quality Control Module.',
        'Do not halt primary rolling mill line; scrap risk is minimal (<0.2%).'
      ],
      recommendationsAr: [
        'توجيه لفة الصاج إلى محطة الصقل الآلي قبل مرحلة التغليف النهائي.',
        'تسجيل ملاحظة الجودة في وحدة مراقبة الجودة (QC) في DMS ERP.',
        'استمرار عمل الخط الرئيسي؛ نسبة الهالك المتوقعة ضئيلة جداً (<0.2%).'
      ],
      metadata: {
        inspectionFramesPerSec: 150,
        edgeDeviceDeploymentReady: true
      }
    }
  }
];
