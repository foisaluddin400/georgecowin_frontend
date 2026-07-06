import { UserRole } from "./index";

export interface Deal {
  id: string;
  managerId: string;
  talentName: string;
  status: "Pipeline" | "Confirmed";
  campaignName: string;
  monthValues: number[];
  extraCostValues?: number[];
  costRate: number;
  crmDealId?: string;
}

export interface CRMDeal {
  id: string;
  managerId: string;
  talentName: string;
  campaignName: string;
  company: string;
  emailContact: string;
  billingAddress?: string;
  invoiceReference?: string;
  noPoNumber?: boolean;
  xeroAccountCode?: string;
  xeroTaxRate?: string;
  direction: "Inbound" | "Outbound";
  stage: string;
  amount: number;
  currency: "GBP" | "USD";
  liveMonthIndex: number;
  signedMonthIndex: number | null;
  paymentTerm: string;
  customPaymentDays?: number;
  contractName?: string;
  contractData?: string;
  pAndLDealId?: string;
  xeroInvoiceId?: string;
  xeroStatus?: string;
  xeroCreatedAt?: string;
  xeroDueDate?: string;
  xeroInvoiceStatus?: string;
  xeroPaymentStatus?: string;
  xeroReconciledAt?: string;
  xeroDraftPayload?: any;
  talentInvoicePaidAt?: string;
  financeInvoicedAt?: string;
  financeAlertDismissedAt?: string;
  financeStatus?: string;
  financeSubmittedAt?: string;
  financeAcceptedAt?: string;
  financeRejectedAt?: string;
  financeRejectionReason?: string;
  submittedBy: string;
  updatedAt: string;
}

export interface Manager {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  inviteStatus?: string;
  invitedAt?: string;
}

export interface OverheadRow {
  id: string;
  label: string;
  values: number[];
}

export interface Expense {
  id: string;
  managerId: string;
  category: "Marketing" | "Client entertaining";
  monthIndex: number;
  amount: number;
  note: string;
  receiptName?: string;
  receiptData?: string;
}

export interface TalentExpense {
  id: string;
  managerId: string;
  talentName: string;
  crmDealId: string;
  amount: number;
  note: string;
  receiptName?: string;
  receiptData?: string;
  submittedBy: string;
  submittedAt: string;
  financeStatus: string;
  financeActionedAt?: string;
  financeActionedBy?: string;
}

export interface ProductionRequest {
  id: string;
  managerId: string;
  talentName: string;
  shootDate: string;
  videoBrief: string;
  items: string[];
  itemRates: Record<string, number>;
  itemDays: Record<string, number>;
  amount: number;
  status: "Pending" | "Accepted" | "Rejected" | "Cancelled";
  message?: string;
  submittedBy: string;
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  managerSeenAt?: string;
  cancelledBy?: string;
  cancelledAt?: string;
  productionSeenAt?: string;
  financeStatus?: string;
  chargebackRequestedAt?: string;
  chargebackPaymentRunDate?: string;
}

export interface EmailLead {
  id: string;
  managerId: string;
  from: string;
  subject: string;
  receivedAt: string;
  category: "Deal" | "PR" | "Event";
  status: "New" | "Converted" | "Dismissed";
  talentName: string;
  company: string;
  campaignName: string;
  amount: number;
  monthIndex: number;
  paymentTerm: string;
  contactEmail: string;
  eventDate?: string;
  actionPoint: string;
  body: string;
  convertedTo?: string;
  convertedId?: string;
  convertedAt?: string;
  archivedAt?: string;
}

export interface PrRequest {
  id: string;
  managerId: string;
  talentName: string;
  brand: string;
  campaignName: string;
  contactEmail: string;
  actionPoint: string;
  status: "Open" | "Actioned" | "Dismissed";
  sourceEmailId?: string;
  delegatedFromManagerId?: string;
  delegatedToManagerId?: string;
  delegatedAt?: string;
  archivedAt?: string;
  createdAt: string;
  notes?: string;
}

export interface EventRequest {
  id: string;
  managerId: string;
  talentName: string;
  brand: string;
  eventName: string;
  eventDate: string;
  contactEmail: string;
  actionPoint: string;
  status: "Open" | "Actioned" | "Dismissed";
  sourceEmailId?: string;
  delegatedFromManagerId?: string;
  delegatedToManagerId?: string;
  delegatedAt?: string;
  archivedAt?: string;
  createdAt: string;
  notes?: string;
}

export interface BrandRecord {
  name: string;
  emailContact: string;
  billingAddress: string;
  paymentTerm: string;
  customPaymentDays: number;
  updatedAt: string;
}

export interface AdminState {
  targets: number[];
  overheads: OverheadRow[];
  managerSalaries: Record<string, number>;
  commissionRates: Record<string, number>;
  commissionOverrides: any[];
  lineReports: Record<string, string[]>;
  requestDelegationPermissions: Record<string, string[]>;
  approvalRoutes: Record<string, string>;
  removedManagerIds: string[];
  pendingDeals: any[];
  pendingExpenses: any[];
  rejectionMessages: any[];
  expenses: Expense[];
  talentExpenses: TalentExpense[];
  talents: Record<string, string[]>;
  talentEmails: Record<string, string>;
  talentInvoiceDetails: Record<string, any>;
  talentProfiles: Record<string, any>;
  talentInvoicePayments: Record<string, any>;
  talentInvoiceBills: Record<string, any>;
  earlyTalentLinePayments: Record<string, any>;
  talentReportSends: any[];
  talentRemittanceSends: any[];
  productionRates: Record<string, number>;
  productionRequests: ProductionRequest[];
  emailLeads: EmailLead[];
  prRequests: PrRequest[];
  eventRequests: EventRequest[];
  brandDatabase: Record<string, BrandRecord>;
  navOrders: Record<string, string[]>;
  deals: Deal[];
  crmDeals: CRMDeal[];
}
