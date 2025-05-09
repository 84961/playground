export interface CompanyAudit {
  id: number;
  companyName: string;
  auditorName: string;
  auditDate: Date;
  status: 'compliant' | 'non-compliant' | 'pending';
  criticality: 'high' | 'medium' | 'low';
  findings: number;
  department: string;
}
