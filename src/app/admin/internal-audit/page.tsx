'use client';

import PageBackground from '@/components/ui/PageBackground';
import HeroSection from '@/components/ui/HeroSection';
import AuditDashboard from '@/components/internal-audit/AuditDashboard';

export default function InternalAuditPage() {
  return (
    <PageBackground variant="home">
      <HeroSection
        title="نظام إدارة المراجعة الداخلية"
        subtitle="إدارة شاملة للمراجعات والمخاطر وأوراق العمل"
        description="منصة متكاملة لإدارة عمليات المراجعة الداخلية بناءً على منهجية المخاطر"
        variant="reports"
        layout="centered"
        className="mb-16"
      />
      <AuditDashboard />
    </PageBackground>
  );
}
