/**
 * دوال مساعدة لنظام إدارة المراجعة الداخلية
 * Helper functions for Internal Audit Management System
 */

import type {
  Risk,
  RiskLevel,
  RiskImpact,
  RiskLikelihood,
  FinancialRatios,
  IncomeStatement,
  BalanceSheet,
  CashFlowStatement,
  Finding,
  AuditPlan
} from './types';
import { RISK_MATRIX_CONFIG } from './constants';

// ==================== حسابات المخاطر ====================

/**
 * حساب درجة المخاطرة بناءً على التأثير والاحتمالية
 */
export function calculateRiskScore(
  impact: RiskImpact,
  likelihood: RiskLikelihood
): number {
  const impactScore = RISK_MATRIX_CONFIG.impact[impact] || 1;
  const likelihoodScore = RISK_MATRIX_CONFIG.likelihood[likelihood] || 1;
  return impactScore * likelihoodScore;
}

/**
 * تحديد مستوى المخاطرة بناءً على الدرجة
 */
export function determineRiskLevel(score: number): RiskLevel {
  if (score >= RISK_MATRIX_CONFIG.levels.حرج.min) return 'حرج';
  if (score >= RISK_MATRIX_CONFIG.levels.عالي.min) return 'عالي';
  if (score >= RISK_MATRIX_CONFIG.levels.متوسط.min) return 'متوسط';
  return 'منخفض';
}

/**
 * الحصول على لون المخاطرة
 */
export function getRiskColor(level: RiskLevel): string {
  const colors = {
    حرج: '#7f1d1d',
    عالي: '#ef4444',
    متوسط: '#f59e0b',
    منخفض: '#10b981'
  };
  return colors[level];
}

/**
 * حساب المخاطرة المتبقية بعد تطبيق الضوابط
 */
export function calculateResidualRisk(
  inherentRisk: number,
  controlEffectiveness: number
): number {
  // controlEffectiveness بين 0-100
  const reduction = (controlEffectiveness / 100) * inherentRisk;
  return Math.max(1, Math.round(inherentRisk - reduction));
}

/**
 * تصنيف المخاطر حسب المستوى
 */
export function categorizeRisksByLevel(risks: Risk[]): Record<RiskLevel, Risk[]> {
  return {
    حرج: risks.filter(r => r.riskLevel === 'حرج'),
    عالي: risks.filter(r => r.riskLevel === 'عالي'),
    متوسط: risks.filter(r => r.riskLevel === 'متوسط'),
    منخفض: risks.filter(r => r.riskLevel === 'منخفض')
  };
}

// ==================== التحليل المالي ====================

/**
 * حساب النسب المالية من القوائم المالية
 */
export function calculateFinancialRatios(
  incomeStatement?: IncomeStatement,
  balanceSheet?: BalanceSheet,
  cashFlow?: CashFlowStatement
): Partial<FinancialRatios> {
  const ratios: Partial<FinancialRatios> = {};

  // نسب السيولة
  if (balanceSheet) {
    ratios.liquidity = {
      currentRatio: balanceSheet.currentAssets / balanceSheet.currentLiabilities,
      quickRatio: (balanceSheet.currentAssets - (balanceSheet.currentAssets * 0.3)) / 
                   balanceSheet.currentLiabilities, // تقريبي
      cashRatio: (balanceSheet.currentAssets * 0.2) / balanceSheet.currentLiabilities // تقريبي
    };
  }

  // نسب الربحية
  if (incomeStatement && balanceSheet) {
    const { revenue, grossProfit, operatingIncome, netIncome } = incomeStatement;
    const { totalAssets, equity } = balanceSheet;

    ratios.profitability = {
      grossProfitMargin: (grossProfit / revenue) * 100,
      operatingProfitMargin: (operatingIncome / revenue) * 100,
      netProfitMargin: (netIncome / revenue) * 100,
      roa: (netIncome / totalAssets) * 100,
      roe: (netIncome / equity) * 100
    };
  }

  // نسب النشاط
  if (incomeStatement && balanceSheet) {
    const { revenue, costOfRevenue } = incomeStatement;
    const { totalAssets, currentAssets } = balanceSheet;

    ratios.activity = {
      inventoryTurnover: costOfRevenue / (currentAssets * 0.3), // تقريبي للمخزون
      receivablesTurnover: revenue / (currentAssets * 0.4), // تقريبي للمدينين
      payablesTurnover: costOfRevenue / (balanceSheet.currentLiabilities * 0.5), // تقريبي
      assetTurnover: revenue / totalAssets
    };
  }

  // نسب المديونية
  if (balanceSheet) {
    const { totalLiabilities, equity, totalAssets } = balanceSheet;
    const interestExpense = incomeStatement?.operatingExpenses ? 
                            incomeStatement.operatingExpenses * 0.1 : 0;

    ratios.leverage = {
      debtToEquity: totalLiabilities / equity,
      debtRatio: totalLiabilities / totalAssets,
      interestCoverage: incomeStatement?.operatingIncome ? 
                        incomeStatement.operatingIncome / Math.max(interestExpense, 1) : 0
    };
  }

  // نسب التدفقات النقدية
  if (cashFlow && balanceSheet) {
    ratios.cashFlow = {
      operatingCashFlowRatio: cashFlow.operatingCashFlow / balanceSheet.currentLiabilities,
      freeCashFlow: cashFlow.freeCashFlow || 
                    (cashFlow.operatingCashFlow + cashFlow.investingCashFlow),
      cashConversionCycle: 365 / (ratios.activity?.inventoryTurnover || 1)
    };
  }

  return ratios;
}

/**
 * تحديد العلامات الحمراء في التحليل المالي
 */
export function identifyFinancialRedFlags(
  ratios: Partial<FinancialRatios>,
  incomeStatement?: IncomeStatement
): string[] {
  const redFlags: string[] = [];

  // نسب السيولة
  if (ratios.liquidity) {
    if (ratios.liquidity.currentRatio < 1) {
      redFlags.push('نسبة التداول أقل من 1 - مشكلة سيولة حادة');
    }
    if (ratios.liquidity.quickRatio < 0.5) {
      redFlags.push('نسبة السيولة السريعة منخفضة جداً - صعوبة في الوفاء بالالتزامات القصيرة الأجل');
    }
  }

  // نسب الربحية
  if (ratios.profitability) {
    if (ratios.profitability.netProfitMargin < 0) {
      redFlags.push('هامش ربح صافي سالب - الشركة تحقق خسائر');
    }
    if (ratios.profitability.roa < 0) {
      redFlags.push('عائد سالب على الأصول - استخدام غير كفء للموارد');
    }
    if (ratios.profitability.roe < 0) {
      redFlags.push('عائد سالب على حقوق الملكية - تآكل رأس المال');
    }
    if (ratios.profitability.grossProfitMargin < 20) {
      redFlags.push('هامش ربح إجمالي منخفض - ضغوط تنافسية أو مشاكل تكلفة');
    }
  }

  // نسب المديونية
  if (ratios.leverage) {
    if (ratios.leverage.debtToEquity > 2) {
      redFlags.push('نسبة مديونية عالية - خطر مالي مرتفع');
    }
    if (ratios.leverage.interestCoverage < 2) {
      redFlags.push('قدرة ضعيفة على تغطية الفوائد - خطر إعسار');
    }
    if (ratios.leverage.debtRatio > 0.7) {
      redFlags.push('نسبة الدين للأصول عالية - اعتماد كبير على التمويل الخارجي');
    }
  }

  // التدفقات النقدية
  if (ratios.cashFlow) {
    if (ratios.cashFlow.operatingCashFlowRatio < 0.5) {
      redFlags.push('تدفقات نقدية تشغيلية ضعيفة مقارنة بالالتزامات');
    }
    if (ratios.cashFlow.freeCashFlow < 0) {
      redFlags.push('تدفق نقدي حر سالب - الشركة تحرق النقد');
    }
  }

  // فحص الإيرادات
  if (incomeStatement) {
    if (incomeStatement.revenue <= 0) {
      redFlags.push('عدم وجود إيرادات أو إيرادات سالبة');
    }
    if (incomeStatement.operatingExpenses / incomeStatement.revenue > 0.9) {
      redFlags.push('مصروفات تشغيلية مرتفعة جداً - أكثر من 90% من الإيرادات');
    }
  }

  return redFlags;
}

/**
 * حساب النقاط المالية الشاملة
 */
export function calculateFinancialScore(ratios: Partial<FinancialRatios>): number {
  let score = 0;
  let criteriaCount = 0;

  // نقاط السيولة (25 نقطة)
  if (ratios.liquidity) {
    if (ratios.liquidity.currentRatio >= 2) score += 10;
    else if (ratios.liquidity.currentRatio >= 1.5) score += 7;
    else if (ratios.liquidity.currentRatio >= 1) score += 4;

    if (ratios.liquidity.quickRatio >= 1) score += 8;
    else if (ratios.liquidity.quickRatio >= 0.7) score += 5;
    else if (ratios.liquidity.quickRatio >= 0.5) score += 2;

    if (ratios.liquidity.cashRatio >= 0.5) score += 7;
    else if (ratios.liquidity.cashRatio >= 0.3) score += 4;
    criteriaCount += 25;
  }

  // نقاط الربحية (35 نقطة)
  if (ratios.profitability) {
    if (ratios.profitability.grossProfitMargin >= 40) score += 8;
    else if (ratios.profitability.grossProfitMargin >= 30) score += 6;
    else if (ratios.profitability.grossProfitMargin >= 20) score += 3;

    if (ratios.profitability.netProfitMargin >= 15) score += 9;
    else if (ratios.profitability.netProfitMargin >= 10) score += 6;
    else if (ratios.profitability.netProfitMargin >= 5) score += 3;

    if (ratios.profitability.roa >= 10) score += 9;
    else if (ratios.profitability.roa >= 5) score += 6;
    else if (ratios.profitability.roa >= 2) score += 3;

    if (ratios.profitability.roe >= 15) score += 9;
    else if (ratios.profitability.roe >= 10) score += 6;
    else if (ratios.profitability.roe >= 5) score += 3;

    criteriaCount += 35;
  }

  // نقاط المديونية (20 نقطة)
  if (ratios.leverage) {
    if (ratios.leverage.debtToEquity <= 0.5) score += 7;
    else if (ratios.leverage.debtToEquity <= 1) score += 5;
    else if (ratios.leverage.debtToEquity <= 1.5) score += 2;

    if (ratios.leverage.interestCoverage >= 5) score += 7;
    else if (ratios.leverage.interestCoverage >= 3) score += 5;
    else if (ratios.leverage.interestCoverage >= 2) score += 2;

    if (ratios.leverage.debtRatio <= 0.4) score += 6;
    else if (ratios.leverage.debtRatio <= 0.6) score += 4;

    criteriaCount += 20;
  }

  // نقاط التدفقات النقدية (20 نقطة)
  if (ratios.cashFlow) {
    if (ratios.cashFlow.operatingCashFlowRatio >= 1) score += 10;
    else if (ratios.cashFlow.operatingCashFlowRatio >= 0.7) score += 7;
    else if (ratios.cashFlow.operatingCashFlowRatio >= 0.5) score += 4;

    if (ratios.cashFlow.freeCashFlow > 0) score += 10;
    else if (ratios.cashFlow.freeCashFlow > -100000) score += 5;

    criteriaCount += 20;
  }

  // تطبيع النقاط إلى 100
  return criteriaCount > 0 ? Math.round((score / criteriaCount) * 100) : 0;
}

// ==================== إحصائيات المراجعة ====================

/**
 * حساب معدل إنجاز خطة المراجعة
 */
export function calculateAuditCompletionRate(plans: AuditPlan[]): number {
  if (plans.length === 0) return 0;
  const completed = plans.filter(p => p.status === 'مكتملة').length;
  return Math.round((completed / plans.length) * 100);
}

/**
 * حساب متوسط وقت إغلاق النتائج
 */
export function calculateAverageClosureTime(findings: Finding[]): number {
  const closed = findings.filter(f => f.status === 'مغلق' && f.completionDate);
  if (closed.length === 0) return 0;

  const totalDays = closed.reduce((sum, f) => {
    const start = new Date(f.identifiedDate);
    const end = new Date(f.completionDate!);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return sum + days;
  }, 0);

  return Math.round(totalDays / closed.length);
}

/**
 * حساب نسبة النتائج الحرجة المغلقة
 */
export function calculateCriticalFindingsClosureRate(findings: Finding[]): number {
  const critical = findings.filter(f => f.severity === 'حرج');
  if (critical.length === 0) return 100;
  
  const closedCritical = critical.filter(f => f.status === 'مغلق').length;
  return Math.round((closedCritical / critical.length) * 100);
}

/**
 * تحديد النتائج المتأخرة
 */
export function getOverdueFindings(findings: Finding[]): Finding[] {
  const today = new Date();
  return findings.filter(f => {
    if (f.status === 'مغلق') return false;
    const dueDate = new Date(f.dueDate);
    return dueDate < today;
  });
}

// ==================== التنسيق والعرض ====================

/**
 * تنسيق التاريخ بصيغة عربية
 */
export function formatArabicDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

/**
 * تنسيق الأرقام بصيغة عربية مع فواصل
 */
export function formatNumber(num: number, decimals: number = 0): string {
  return new Intl.NumberFormat('ar-SA', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
}

/**
 * تنسيق النسب المئوية
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${formatNumber(value, decimals)}%`;
}

/**
 * تنسيق المبالغ المالية
 */
export function formatCurrency(amount: number, currency: string = 'ريال'): string {
  return `${formatNumber(amount, 2)} ${currency}`;
}

// ==================== التحقق والتصدير ====================

/**
 * توليد كود فريد للمراجعة
 */
export function generateAuditCode(department: string, year: number): string {
  const deptCodes: Record<string, string> = {
    'المشتريات': 'PROC',
    'المبيعات': 'SALES',
    'المخازن': 'INV',
    'الخزينة والبنوك': 'TREAS',
    'الأجور والمرتبات': 'PAY',
    'الأصول الثابتة': 'FA',
    'المصروفات': 'EXP',
    'نظم المعلومات': 'IT',
    'الامتثال والحوكمة': 'COMP'
  };

  const code = deptCodes[department] || 'GEN';
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${code}-${year}-${randomNum}`;
}

/**
 * التحقق من اكتمال خطة المراجعة
 */
export function validateAuditPlan(plan: Partial<AuditPlan>): string[] {
  const errors: string[] = [];

  if (!plan.title) errors.push('العنوان مطلوب');
  if (!plan.department) errors.push('الإدارة مطلوبة');
  if (!plan.type) errors.push('نوع المراجعة مطلوب');
  if (!plan.scheduledStartDate) errors.push('تاريخ البدء مطلوب');
  if (!plan.scheduledEndDate) errors.push('تاريخ الانتهاء مطلوب');
  if (!plan.leadAuditor) errors.push('المراجع الرئيسي مطلوب');
  
  if (plan.scheduledStartDate && plan.scheduledEndDate) {
    const start = new Date(plan.scheduledStartDate);
    const end = new Date(plan.scheduledEndDate);
    if (end <= start) {
      errors.push('تاريخ الانتهاء يجب أن يكون بعد تاريخ البدء');
    }
  }

  return errors;
}

/**
 * حساب الأولوية بناءً على المخاطر
 */
export function calculateAuditPriority(
  riskLevel: RiskLevel,
  lastAuditDate?: string
): 'عالية' | 'متوسطة' | 'منخفضة' {
  if (riskLevel === 'حرج') return 'عالية';
  
  if (lastAuditDate) {
    const daysSinceLastAudit = Math.ceil(
      (new Date().getTime() - new Date(lastAuditDate).getTime()) / 
      (1000 * 60 * 60 * 24)
    );
    
    if (daysSinceLastAudit > 365 && riskLevel === 'عالي') return 'عالية';
    if (daysSinceLastAudit > 180) return 'متوسطة';
  }

  if (riskLevel === 'عالي') return 'عالية';
  if (riskLevel === 'متوسط') return 'متوسطة';
  return 'منخفضة';
}
