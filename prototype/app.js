const months = [
  "Jan 26", "Feb 26", "Mar 26", "Apr 26", "May 26", "Jun 26",
  "Jul 26", "Aug 26", "Sep 26", "Oct 26", "Nov 26", "Dec 26"
];

const crmStages = ["Conversation", "Negotiation", "Contract Signed", "To Be Invoiced", "Invoiced", "On Next Payment Run", "Paid"];
const manualCrmStages = crmStages.filter((stage) => stage !== "Paid");
const reportStages = ["Conversation", "Negotiation", "Contract Signed", "Invoiced", "On Next Payment Run", "Paid"];
const managerReportStages = ["Conversation", "Negotiation", "Contract Signed", "Invoiced", "On Next Payment Run", "Paid"];
const crmDirections = ["Inbound", "Outbound"];
const staffRoles = ["manager", "finance", "operations", "production"];
const productionItems = ["Producer", "DOP", "Editor"];
const defaultProductionRates = { Producer: 650, DOP: 850, Editor: 450 };
const usdToGbpRate = 0.78;
const paymentTerms = [
  { label: "Upfront", value: "upfront", days: 0 },
  { label: "30 days", value: "30", days: 30 },
  { label: "45 days", value: "45", days: 45 },
  { label: "60 days", value: "60", days: 60 },
  { label: "90 days", value: "90", days: 90 },
  { label: "Custom", value: "custom", days: 0 }
];

const defaultTargets = [75000, 79000, 91000, 109650, 135347.5, 143399.625, 174159.5688, 188033.5041, 207185.1793, 216794.4382, 216884.1601, 237478.3681];

const defaultOverheads = [
  { id: "staff", label: "Staff inc PAYE and NI", values: [12057.36, 12057.36, 15471, 15471, 18834.4, 18834.4, 18834.4, 18834.4, 18834.4, 18834.4, 18834.4, 18834.4] },
  { id: "bonus", label: "Bonuses and commission", values: [971.88, 635.12, 1112.94, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: "fixed", label: "Fixed and variable overheads", values: [1575, 1575, 1575, 1600, 1600, 1620, 1620, 1620, 1800, 1800, 1800, 1800] },
  { id: "entertaining", label: "Client entertaining", values: [440.94, 458.93, 0, 258, 192.06, 0, 0, 0, 0, 0, 0, 0] },
  { id: "marketing", label: "Marketing", values: [647.89, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
];

const users = [
  { id: "admin", name: "Admin", role: "admin", email: "admin@cowshed.test" },
  { id: "finance", name: "Finance", role: "finance", email: "finance@cowshed.test" },
  { id: "production", name: "Production", role: "production", email: "production@cowshed.test" },
  { id: "amelia", name: "Amelia", role: "manager", email: "amelia@cowshed.test" },
  { id: "sam", name: "Sam", role: "manager", email: "sam@cowshed.test" },
  { id: "holly", name: "Holly", role: "manager", email: "holly@cowshed.test" },
  { id: "kareem", name: "Kareem", role: "manager", email: "kareem@cowshed.test" },
  { id: "alex", name: "Alex", role: "manager", email: "alex@cowshed.test" }
];

const defaultManagerSalaries = {
  amelia: 5000,
  sam: 5000,
  holly: 5000,
  kareem: 5000,
  alex: 5000
};

const defaultCommissionRates = {
  amelia: 1,
  sam: 1,
  holly: 1,
  kareem: 1,
  alex: 1
};

const defaultCommissionOverrides = [];
const defaultLineReports = {};
const defaultApprovalRoutes = {};
const defaultRemovedManagerIds = [];
const defaultEmailLeads = [
  {
    id: "email-lead-nyx-layo",
    managerId: "amelia",
    from: "partnerships@nyxcosmetics.com",
    subject: "Layo campaign enquiry - August launch",
    receivedAt: "2026-07-02T09:18:00.000Z",
    category: "Deal",
    talentName: "Layo",
    company: "NYX Cosmetics",
    campaignName: "August lip launch",
    amount: 18000,
    monthIndex: 7,
    paymentTerm: "30",
    contactEmail: "partnerships@nyxcosmetics.com",
    actionPoint: "Confirm deliverables and proposed usage with Layo.",
    body: "We would love to discuss Layo for our August lip launch. Budget is around GBP 18,000 for social content and usage."
  },
  {
    id: "email-lead-pr-flynn",
    managerId: "sam",
    from: "press@daily-drip.co",
    subject: "PR gifting for Flynn",
    receivedAt: "2026-07-02T11:42:00.000Z",
    category: "PR",
    talentName: "Flynn",
    company: "Daily Drip",
    campaignName: "Cold brew PR drop",
    amount: 0,
    monthIndex: 6,
    paymentTerm: "30",
    contactEmail: "press@daily-drip.co",
    actionPoint: "Send Flynn's preferred postal details if they want the PR drop.",
    body: "We would love to send Flynn our new cold brew launch package. No commercial deliverables, just gifting."
  },
  {
    id: "email-lead-event-chloe",
    managerId: "holly",
    from: "events@prime-studios.com",
    subject: "Chloe event invite - creator dinner",
    receivedAt: "2026-07-02T15:05:00.000Z",
    category: "Event",
    talentName: "Chloe",
    company: "Prime Studios",
    campaignName: "Creator dinner",
    amount: 0,
    monthIndex: 6,
    paymentTerm: "30",
    contactEmail: "events@prime-studios.com",
    eventDate: "2026-07-24",
    actionPoint: "Check Chloe's availability and dietary requirements.",
    body: "We would like to invite Chloe to an intimate creator dinner on 24 July. Please let us know availability."
  }
];

const defaultTalents = {
  amelia: ["Layo", "Issy", "Mia Rae", "Nell"],
  sam: ["Zayzz", "Flynn", "Talia", "Kai"],
  holly: ["GVO", "Chloe", "Marnie", "Jules"],
  kareem: ["Kareem Talent", "Niko", "Asha"],
  alex: ["Alex Talent", "Rumi", "Bea"]
};

const seedDeals = [
  { id: "seed-amelia-layo", managerId: "amelia", talentName: "Layo", status: "Confirmed", campaignName: "Roster", monthValues: [72305, 43380, 64550, 91965, 132922, 51048.47, 0, 0, 0, 0, 0, 0], costRate: 80 },
  { id: "seed-sam-zayzz", managerId: "sam", talentName: "Zayzz", status: "Confirmed", campaignName: "Roster", monthValues: [15110, 18500, 27111.26, 71867.94, 25675.19, 28810.94, 0, 0, 0, 0, 0, 0], costRate: 80 },
  { id: "seed-holly-gvo", managerId: "holly", talentName: "GVO", status: "Confirmed", campaignName: "Roster", monthValues: [25383, 20131.74, 19633, 32738, 52262, 37242.66, 0, 0, 0, 0, 0, 0], costRate: 80 },
  { id: "seed-kareem-talent", managerId: "kareem", talentName: "Kareem Talent", status: "Confirmed", campaignName: "Roster", monthValues: [0, 0, 0, 0, 0, 5000, 0, 0, 0, 0, 0, 0], costRate: 80 },
  { id: "seed-alex-talent", managerId: "alex", talentName: "Alex Talent", status: "Confirmed", campaignName: "Roster", monthValues: [0, 0, 0, 0, 0, 500, 0, 0, 0, 0, 0, 0], costRate: 80 },
  { id: "seed-sam-pipeline", managerId: "sam", talentName: "Flynn", status: "Pipeline", campaignName: "Brand launch", monthValues: [0, 0, 0, 0, 0, 0, 28000, 0, 0, 0, 0, 0], costRate: 80 }
];

const sampleDeals = [
  { id: "sample-amelia-issy-skincare", managerId: "amelia", talentName: "Issy", status: "Confirmed", campaignName: "Glow skincare", monthValues: [0, 18500, 0, 0, 24500, 0, 0, 0, 0, 0, 0, 0], costRate: 80 },
  { id: "sample-amelia-mia-fitness", managerId: "amelia", talentName: "Mia Rae", status: "Confirmed", campaignName: "Fitness app launch", monthValues: [0, 0, 13200, 0, 0, 18800, 0, 0, 0, 0, 0, 0], costRate: 78 },
  { id: "sample-amelia-nell-fashion", managerId: "amelia", talentName: "Nell", status: "Pipeline", campaignName: "Autumn fashion edit", monthValues: [0, 0, 0, 0, 0, 0, 0, 31500, 0, 0, 0, 0], costRate: 82 },
  { id: "sample-sam-flynn-travel", managerId: "sam", talentName: "Flynn", status: "Confirmed", campaignName: "City break content", monthValues: [0, 0, 0, 16900, 0, 0, 20500, 0, 0, 0, 0, 0], costRate: 80 },
  { id: "sample-sam-talia-beauty", managerId: "sam", talentName: "Talia", status: "Confirmed", campaignName: "Beauty drops", monthValues: [0, 9200, 0, 0, 0, 15100, 0, 0, 0, 0, 0, 0], costRate: 76 },
  { id: "sample-sam-kai-audio", managerId: "sam", talentName: "Kai", status: "Pipeline", campaignName: "Audio brand test", monthValues: [0, 0, 0, 0, 0, 0, 0, 0, 17800, 0, 0, 0], costRate: 80 },
  { id: "sample-holly-chloe-food", managerId: "holly", talentName: "Chloe", status: "Confirmed", campaignName: "Food delivery burst", monthValues: [0, 0, 11200, 0, 0, 0, 16400, 0, 0, 0, 0, 0], costRate: 80 },
  { id: "sample-holly-marnie-home", managerId: "holly", talentName: "Marnie", status: "Confirmed", campaignName: "Homeware refresh", monthValues: [0, 0, 0, 0, 22100, 0, 0, 0, 0, 0, 0, 0], costRate: 79 },
  { id: "sample-holly-jules-tech", managerId: "holly", talentName: "Jules", status: "Pipeline", campaignName: "Tech bundle", monthValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 26500, 0, 0], costRate: 81 },
  { id: "sample-kareem-niko-gaming", managerId: "kareem", talentName: "Niko", status: "Confirmed", campaignName: "Gaming headset", monthValues: [0, 0, 0, 9400, 0, 0, 0, 13800, 0, 0, 0, 0], costRate: 80 },
  { id: "sample-kareem-asha-wellness", managerId: "kareem", talentName: "Asha", status: "Pipeline", campaignName: "Wellness retreat", monthValues: [0, 0, 0, 0, 0, 0, 0, 0, 24200, 0, 0, 0], costRate: 78 },
  { id: "sample-alex-rumi-finance", managerId: "alex", talentName: "Rumi", status: "Confirmed", campaignName: "Money app", monthValues: [0, 0, 7600, 0, 0, 0, 0, 11900, 0, 0, 0, 0], costRate: 80 },
  { id: "sample-alex-bea-pets", managerId: "alex", talentName: "Bea", status: "Confirmed", campaignName: "Pet food trial", monthValues: [0, 0, 0, 0, 8600, 0, 0, 0, 0, 12750, 0, 0], costRate: 77 },
  { id: "sample-alex-talent-film", managerId: "alex", talentName: "Alex Talent", status: "Pipeline", campaignName: "Streaming premiere", monthValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19500, 0], costRate: 80 }
];

const state = {
  user: null,
  activeView: "pl-live",
  activeDealList: "all",
  selectedDealManagerId: "all",
  selectedDealTalentKey: "all",
  selectedCrmManagerId: "all",
  selectedCrmTalentKey: "all",
  crmScope: "full",
  selectedBrandName: "",
  brandSortMode: "alphabetical",
  selectedCashflowManagerId: "all",
  selectedCashflowMonthIndex: null,
  activeCrmStage: "all",
  crmPaidOpen: false,
  crmAddOpen: false,
  selectedCrmDealId: null,
  savedCrmDealId: null,
  selectedReportTalentKey: null,
  activeReportsTab: "status",
  selectedRemittanceTalentKey: null,
  remittanceMode: "month",
  remittanceMonthIndex: currentMonthIndex(),
  remittanceStartDate: "2026-01-01",
  remittanceEndDate: "2026-12-31",
  selectedManagerId: null,
  selectedTalentKey: null,
  selectedMediaPackTalentKeys: [],
  savedTalentInvoiceKey: null,
  savedTalentProfileKey: null,
  plMode: "live",
  earningsMode: "pipeline",
  leaderboardScope: "full",
  expenseCategoryFilter: "all",
  expenseManagerFilter: "all",
  expenseMonthFilter: "all",
  selectedTalentExpenseTalentKey: null,
  selectedTalentExpenseDealId: null,
  selectedTalentInvoiceTalentKey: "all",
  selectedTalentInvoiceId: null,
  talentInvoiceMode: "month",
  talentInvoiceMonthIndex: currentMonthIndex(),
  talentInvoiceStartDate: "2026-01-01",
  talentInvoiceEndDate: "2026-12-31",
  selectedProductionManagerId: "all",
  activeProductionTab: "requests",
  openRequestArchives: {},
  undoStack: [],
  extraManagers: normalizeExtraManagers(loadJSON("creator-pl-extra-managers", [])),
  targets: loadJSON("creator-pl-targets", defaultTargets),
  overheads: loadJSON("creator-pl-overheads", defaultOverheads),
  managerSalaries: normalizeManagerSalaries(loadJSON("creator-pl-manager-salaries", defaultManagerSalaries)),
  commissionRates: normalizeCommissionRates(loadJSON("creator-pl-commission-rates", defaultCommissionRates)),
  commissionOverrides: normalizeCommissionOverrides(loadJSON("creator-pl-commission-overrides", defaultCommissionOverrides)),
  lineReports: normalizeLineReports(loadJSON("creator-pl-line-reports", defaultLineReports)),
  requestDelegationPermissions: normalizeLineReports(loadJSON("creator-pl-request-delegation-permissions", {})),
  approvalRoutes: normalizeApprovalRoutes(loadJSON("creator-pl-approval-routes", defaultApprovalRoutes)),
  removedManagerIds: normalizeRemovedManagerIds(loadJSON("creator-pl-removed-managers", defaultRemovedManagerIds)),
  pendingDeals: normalizePendingDeals(loadJSON("creator-pl-pending-deals", [])),
  pendingExpenses: normalizePendingExpenses(loadJSON("creator-pl-pending-expenses", [])),
  rejectionMessages: loadJSON("creator-pl-rejection-messages", []),
  expenses: normalizeExpenses(loadJSON("creator-pl-expenses", [])),
  talentExpenses: normalizeTalentExpenses(loadJSON("creator-pl-talent-expenses", [])),
  talents: normalizeTalents(loadJSON("creator-pl-talents", defaultTalents)),
  talentEmails: normalizeTalentEmails(loadJSON("creator-pl-talent-emails", {})),
  talentInvoiceDetails: normalizeTalentInvoiceDetails(loadJSON("creator-pl-talent-invoice-details", {})),
  talentProfiles: normalizeTalentProfiles(loadJSON("creator-pl-talent-profiles", {})),
  talentInvoicePayments: loadJSON("creator-pl-talent-invoice-payments", {}),
  talentInvoiceBills: loadJSON("creator-pl-talent-invoice-bills", {}),
  earlyTalentLinePayments: loadJSON("creator-pl-early-talent-line-payments", {}),
  talentReportSends: normalizeTalentReportSends(loadJSON("creator-pl-talent-report-sends", [])),
  talentRemittanceSends: normalizeTalentRemittanceSends(loadJSON("creator-pl-talent-remittance-sends", [])),
  productionRates: normalizeProductionRates(loadJSON("creator-pl-production-rates", defaultProductionRates)),
  productionRequests: normalizeProductionRequests(loadJSON("creator-pl-production-requests", [])),
  emailLeads: normalizeEmailLeads(loadJSON("creator-pl-email-leads", defaultEmailLeads)),
  prRequests: normalizePrRequests(loadJSON("creator-pl-pr-requests", [])),
  eventRequests: normalizeEventRequests(loadJSON("creator-pl-event-requests", [])),
  brandDatabase: normalizeBrandDatabase(loadJSON("creator-pl-brand-database", {})),
  navOrders: loadJSON("creator-pl-nav-orders", {}),
  deals: [],
  crmDeals: []
};

state.deals = ensureSampleDeals(normalizeDeals(loadJSON("creator-pl-deals", seedDeals)));
state.crmDeals = ensureSampleCrmDeals(normalizeCrmDeals(loadJSON("creator-pl-crm-deals", [])));
if (!Object.keys(state.brandDatabase).length) {
  state.crmDeals.forEach((deal) => upsertBrandFromCrmDeal(deal));
}

function loadJSON(key, fallback) {
  const stored = readStorage(key);
  if (!stored) return cloneData(fallback);
  try {
    return JSON.parse(stored);
  } catch {
    return cloneData(fallback);
  }
}

function readStorage(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function saveJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Local file previews can block storage; the app should still remain usable.
  }
}

function cloneData(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function normalizeTalents(value) {
  const talents = cloneData(defaultTalents);
  Object.entries(value || {}).forEach(([managerId, names]) => {
    talents[managerId] = uniqueNames([...(talents[managerId] || []), ...(Array.isArray(names) ? names : [])]);
  });
  return talents;
}

function normalizeTalentEmails(value) {
  const emails = {};
  Object.entries(value || {}).forEach(([key, email]) => {
    const cleanEmail = String(email || "").trim().toLowerCase();
    if (key && cleanEmail) emails[key] = cleanEmail;
  });
  return emails;
}

function normalizeTalentInvoiceDetails(value) {
  const details = {};
  Object.entries(value || {}).forEach(([key, item]) => {
    if (!key || !item) return;
    details[key] = {
      invoiceName: String(item.invoiceName || "").trim(),
      invoiceEmail: String(item.invoiceEmail || "").trim().toLowerCase(),
      invoiceAddress: String(item.invoiceAddress || "").trim(),
      bankName: String(item.bankName || "").trim(),
      accountName: String(item.accountName || "").trim(),
      sortCode: String(item.sortCode || "").trim(),
      accountNumber: String(item.accountNumber || "").trim(),
      vatNumber: String(item.vatNumber || "").trim()
    };
  });
  return details;
}

function normalizeTalentReportSends(value) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => ({
    id: item.id || `report-send-${Date.now()}-${Math.random()}`,
    managerId: item.managerId || "",
    talentName: item.talentName || "",
    email: item.email || "",
    sentAt: item.sentAt || new Date().toISOString(),
    dealCount: Number(item.dealCount || 0)
  })).filter((item) => item.managerId && item.talentName);
}

function normalizeTalentRemittanceSends(value) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => ({
    id: item.id || `remittance-send-${Date.now()}-${Math.random()}`,
    managerId: item.managerId || "",
    talentName: item.talentName || "",
    email: item.email || "",
    periodLabel: item.periodLabel || "",
    sentAt: item.sentAt || new Date().toISOString(),
    dealCount: Number(item.dealCount || 0),
    invoiceCount: Number(item.invoiceCount || 0),
    expenseTotal: Number(item.expenseTotal || 0)
  })).filter((item) => item.managerId && item.talentName);
}

function normalizeProductionRates(value) {
  const rates = { ...defaultProductionRates };
  Object.entries(value || {}).forEach(([item, amount]) => {
    if (productionItems.includes(item)) rates[item] = Math.max(0, Number(amount || rates[item] || 0));
  });
  return rates;
}

function normalizeProductionRequests(value) {
  if (!Array.isArray(value)) return [];
  return value.map((request) => {
    const items = Array.isArray(request.items) ? request.items.filter((item) => productionItems.includes(item)) : [];
    const itemRates = normalizeProductionRates(request.itemRates || {});
    const itemDays = {};
    items.forEach((item) => {
      itemDays[item] = Math.max(1, Number((request.itemDays || {})[item] || 1));
    });
    const amount = Number(request.amount || productionRequestTotal({ items, itemRates, itemDays }));
    return {
      id: request.id || `production-${Date.now()}-${Math.random()}`,
      managerId: request.managerId || "amelia",
      talentName: String(request.talentName || "").trim(),
      shootDate: String(request.shootDate || "").trim(),
      videoBrief: String(request.videoBrief || "").trim(),
      items,
      itemRates,
      itemDays,
      amount,
      status: ["Pending", "Accepted", "Rejected", "Cancelled"].includes(request.status) ? request.status : "Pending",
      message: String(request.message || ""),
      submittedBy: request.submittedBy || request.managerId || "amelia",
      submittedAt: request.submittedAt || new Date().toISOString(),
      reviewedBy: request.reviewedBy || "",
      reviewedAt: request.reviewedAt || "",
      managerSeenAt: request.managerSeenAt || "",
      cancelledBy: request.cancelledBy || "",
      cancelledAt: request.cancelledAt || "",
      productionSeenAt: request.productionSeenAt || "",
      financeStatus: request.financeStatus === "Chargeback requested" ? "Chargeback requested" : "",
      chargebackRequestedAt: request.chargebackRequestedAt || "",
      chargebackPaymentRunDate: request.chargebackPaymentRunDate || productionPaymentRunDate(request.shootDate)
    };
  }).filter((request) => request.managerId && request.talentName && request.shootDate && request.items.length);
}

function normalizeEmailLeads(value) {
  if (!Array.isArray(value)) return [];
  return value.map((lead) => ({
    id: lead.id || `email-lead-${Date.now()}-${Math.random()}`,
    managerId: lead.managerId || "amelia",
    from: String(lead.from || "").trim(),
    subject: String(lead.subject || "").trim(),
    receivedAt: lead.receivedAt || new Date().toISOString(),
    category: ["Deal", "PR", "Event"].includes(lead.category) ? lead.category : "Deal",
    status: ["New", "Converted", "Dismissed"].includes(lead.status) ? lead.status : "New",
    talentName: String(lead.talentName || "").trim(),
    company: String(lead.company || "").trim(),
    campaignName: String(lead.campaignName || "").trim(),
    amount: Number(lead.amount || 0),
    monthIndex: Math.min(11, Math.max(0, Number(lead.monthIndex ?? currentMonthIndex()))),
    paymentTerm: paymentTerms.some((term) => term.value === lead.paymentTerm) ? lead.paymentTerm : "30",
    contactEmail: normalizeEmailContacts(lead.contactEmail || lead.from || ""),
    eventDate: String(lead.eventDate || "").trim(),
    actionPoint: String(lead.actionPoint || "").trim(),
    body: String(lead.body || "").trim(),
    convertedTo: String(lead.convertedTo || ""),
    convertedId: String(lead.convertedId || ""),
    convertedAt: String(lead.convertedAt || ""),
    archivedAt: String(lead.archivedAt || lead.convertedAt || (lead.status && lead.status !== "New" ? lead.receivedAt : ""))
  })).filter((lead) => lead.managerId && lead.subject);
}

function normalizePrRequests(value) {
  if (!Array.isArray(value)) return [];
  return value.map((request) => {
    const delegatedFromManagerId = String(request.delegatedFromManagerId || "");
    const delegatedToManagerId = String(request.delegatedToManagerId || (delegatedFromManagerId && request.managerId !== delegatedFromManagerId ? request.managerId : ""));
    return {
      id: request.id || `pr-${Date.now()}-${Math.random()}`,
      managerId: delegatedFromManagerId || request.managerId || "amelia",
      talentName: String(request.talentName || "").trim(),
      brand: String(request.brand || request.company || "").trim(),
      campaignName: String(request.campaignName || "").trim(),
      contactEmail: normalizeEmailContacts(request.contactEmail || ""),
      actionPoint: String(request.actionPoint || "Send details to talent").trim(),
      status: ["Open", "Actioned", "Dismissed"].includes(request.status) ? request.status : "Open",
      sourceEmailId: String(request.sourceEmailId || ""),
      delegatedFromManagerId,
      delegatedToManagerId,
      delegatedAt: String(request.delegatedAt || ""),
      archivedAt: String(request.archivedAt || (request.status && request.status !== "Open" ? request.createdAt : "")),
      createdAt: request.createdAt || new Date().toISOString(),
      notes: String(request.notes || "")
    };
  }).filter((request) => request.managerId && request.talentName && request.brand);
}

function normalizeEventRequests(value) {
  if (!Array.isArray(value)) return [];
  return value.map((request) => {
    const delegatedFromManagerId = String(request.delegatedFromManagerId || "");
    const delegatedToManagerId = String(request.delegatedToManagerId || (delegatedFromManagerId && request.managerId !== delegatedFromManagerId ? request.managerId : ""));
    return {
      id: request.id || `event-${Date.now()}-${Math.random()}`,
      managerId: delegatedFromManagerId || request.managerId || "amelia",
      talentName: String(request.talentName || "").trim(),
      brand: String(request.brand || request.company || "").trim(),
      eventName: String(request.eventName || request.campaignName || "").trim(),
      eventDate: String(request.eventDate || "").trim(),
      contactEmail: normalizeEmailContacts(request.contactEmail || ""),
      actionPoint: String(request.actionPoint || "Check availability with talent").trim(),
      status: ["Open", "Actioned", "Dismissed"].includes(request.status) ? request.status : "Open",
      sourceEmailId: String(request.sourceEmailId || ""),
      delegatedFromManagerId,
      delegatedToManagerId,
      delegatedAt: String(request.delegatedAt || ""),
      archivedAt: String(request.archivedAt || (request.status && request.status !== "Open" ? request.createdAt : "")),
      createdAt: request.createdAt || new Date().toISOString(),
      notes: String(request.notes || "")
    };
  }).filter((request) => request.managerId && request.talentName && request.brand);
}

function normalizeManagerSalaries(value) {
  const salaries = { ...defaultManagerSalaries };
  Object.entries(value || {}).forEach(([managerId, salary]) => {
    salaries[managerId] = Number(salary || salaries[managerId] || 5000);
  });
  return salaries;
}

function normalizeCommissionRates(value) {
  const rates = { ...defaultCommissionRates };
  Object.entries(value || {}).forEach(([managerId, rate]) => {
    rates[managerId] = Number(rate || rates[managerId] || 1);
  });
  return rates;
}

function normalizeCommissionOverrides(value) {
  if (!Array.isArray(value)) return [];
  return value.map((override) => ({
    id: override.id || `override-${Date.now()}-${Math.random()}`,
    recipientManagerId: override.recipientManagerId || "sam",
    rosterManagerId: override.rosterManagerId || "amelia",
    rate: Number(override.rate || 0),
    startMonthIndex: Math.min(11, Math.max(0, Number(override.startMonthIndex || 0)))
  })).filter((override) => override.recipientManagerId && override.rosterManagerId);
}

function normalizeLineReports(value) {
  const reports = {};
  Object.entries(value || {}).forEach(([lineManagerId, reportIds]) => {
    reports[lineManagerId] = Array.isArray(reportIds) ? [...new Set(reportIds.filter(Boolean))] : [];
  });
  return reports;
}

function normalizeApprovalRoutes(value) {
  const routes = {};
  Object.entries(value || {}).forEach(([managerId, approverId]) => {
    if (managerId && approverId) routes[managerId] = approverId;
  });
  return routes;
}

function normalizeRemovedManagerIds(value) {
  return Array.isArray(value) ? [...new Set(value.filter(Boolean))] : [];
}

function normalizeExtraManagers(value) {
  if (!Array.isArray(value)) return [];
  return value.map((manager) => ({
    id: slugify(manager.id || manager.name || `manager-${Date.now()}`),
    name: String(manager.name || "New team member").trim(),
    role: staffRoles.includes(manager.role) ? manager.role : "manager",
    email: manager.email || `${slugify(manager.name || "manager")}@cowshed.test`,
    inviteStatus: manager.inviteStatus || "Not invited",
    invitedAt: manager.invitedAt || ""
  })).filter((manager) => manager.id && manager.name);
}

function normalizeExpenses(value) {
  if (!Array.isArray(value)) return [];
  return value.map((expense) => ({
    id: expense.id || `expense-${Date.now()}-${Math.random()}`,
    managerId: expense.managerId || "amelia",
    category: expense.category === "Marketing" ? "Marketing" : "Client entertaining",
    monthIndex: Math.min(11, Math.max(0, Number(expense.monthIndex || 0))),
    amount: Number(expense.amount || 0),
    note: String(expense.note || "").trim(),
    receiptName: String(expense.receiptName || "").trim(),
    receiptData: String(expense.receiptData || "")
  }));
}

function normalizeTalentExpenses(value) {
  if (!Array.isArray(value)) return [];
  return value.map((expense) => ({
    id: expense.id || `talent-expense-${Date.now()}-${Math.random()}`,
    managerId: expense.managerId || "amelia",
    talentName: String(expense.talentName || "").trim(),
    crmDealId: String(expense.crmDealId || "").trim(),
    amount: Number(expense.amount || 0),
    note: String(expense.note || "").trim(),
    receiptName: String(expense.receiptName || "").trim(),
    receiptData: String(expense.receiptData || ""),
    submittedBy: expense.submittedBy || expense.managerId || "amelia",
    submittedAt: expense.submittedAt || new Date().toISOString(),
    financeStatus: expense.financeStatus || "Pending finance",
    financeActionedAt: expense.financeActionedAt || "",
    financeActionedBy: expense.financeActionedBy || ""
  })).filter((expense) => expense.managerId && expense.talentName && expense.crmDealId);
}

function normalizePendingExpenses(value) {
  if (!Array.isArray(value)) return [];
  return normalizeExpenses(value).map((expense, index) => {
    const raw = value[index] || {};
    return {
      ...expense,
      submittedBy: raw.submittedBy || expense.managerId,
      approverId: raw.approverId || "admin",
      submittedAt: raw.submittedAt || new Date().toISOString()
    };
  });
}

function normalizeDeals(deals) {
  return deals.map((deal) => {
    const managerId = deal.managerId || "amelia";
    return {
      id: deal.id || `deal-${Date.now()}-${Math.random()}`,
      managerId,
      talentName: cleanTalentName(deal.talentName || deal.creator, managerId),
      status: deal.status === "Pipeline" ? "Pipeline" : "Confirmed",
      campaignName: deal.campaignName || deal.notes || deal.type || "Roster",
      monthValues: months.map((_, index) => Number((deal.monthValues || [])[index] || 0)),
      extraCostValues: months.map((_, index) => Number((deal.extraCostValues || [])[index] || 0)),
      costRate: Number(deal.costRate ?? 80),
      crmDealId: deal.crmDealId || ""
    };
  });
}

function normalizePendingDeals(deals) {
  if (!Array.isArray(deals)) return [];
  return deals.map((rawDeal) => {
    const deal = normalizeDeals([rawDeal])[0];
    return {
      ...deal,
      submittedBy: rawDeal.submittedBy || deal.managerId,
      approverId: rawDeal.approverId || "admin",
      submittedAt: rawDeal.submittedAt || new Date().toISOString()
    };
  });
}

function normalizeCrmDeals(deals) {
  if (!Array.isArray(deals)) return [];
  return deals.map((deal) => {
    const managerId = deal.managerId || "amelia";
    const termValue = paymentTerms.some((term) => term.value === deal.paymentTerm) ? deal.paymentTerm : "30";
    return {
      id: deal.id || `crm-${Date.now()}-${Math.random()}`,
      managerId,
      talentName: cleanTalentName(deal.talentName, managerId),
      campaignName: String(deal.campaignName || "").trim(),
      company: String(deal.company || "").trim(),
      emailContact: normalizeEmailContacts(deal.emailContact),
      billingAddress: String(deal.billingAddress || "").trim(),
      invoiceReference: String(deal.invoiceReference || "").trim(),
      noPoNumber: Boolean(deal.noPoNumber),
      xeroAccountCode: String(deal.xeroAccountCode || "200").trim(),
      xeroTaxRate: String(deal.xeroTaxRate || "No VAT").trim(),
      direction: crmDirections.includes(deal.direction) ? deal.direction : "Inbound",
      stage: crmStages.includes(deal.stage) ? deal.stage : "Conversation",
      amount: Number(deal.amount || 0),
      currency: deal.currency === "USD" ? "USD" : "GBP",
      liveMonthIndex: Math.min(11, Math.max(0, Number(deal.liveMonthIndex || 0))),
      signedMonthIndex: deal.signedMonthIndex === undefined ? null : Math.min(11, Math.max(0, Number(deal.signedMonthIndex || 0))),
      paymentTerm: termValue,
      customPaymentDays: Math.max(0, Number(deal.customPaymentDays || 0)),
      contractName: String(deal.contractName || "").trim(),
      contractData: String(deal.contractData || ""),
      pAndLDealId: String(deal.pAndLDealId || ""),
      xeroInvoiceId: String(deal.xeroInvoiceId || ""),
      xeroStatus: String(deal.xeroStatus || ""),
      xeroCreatedAt: String(deal.xeroCreatedAt || ""),
      xeroDueDate: String(deal.xeroDueDate || ""),
      xeroInvoiceStatus: String(deal.xeroInvoiceStatus || ""),
      xeroPaymentStatus: String(deal.xeroPaymentStatus || ""),
      xeroReconciledAt: String(deal.xeroReconciledAt || ""),
      xeroDraftPayload: deal.xeroDraftPayload || null,
      talentInvoicePaidAt: String(deal.talentInvoicePaidAt || ""),
      financeInvoicedAt: String(deal.financeInvoicedAt || ""),
      financeAlertDismissedAt: String(deal.financeAlertDismissedAt || ""),
      financeStatus: deal.financeStatus || (deal.stage === "To Be Invoiced" ? "Pending finance" : ""),
      financeSubmittedAt: deal.financeSubmittedAt || "",
      financeAcceptedAt: deal.financeAcceptedAt || "",
      financeRejectedAt: deal.financeRejectedAt || "",
      financeRejectionReason: String(deal.financeRejectionReason || ""),
      submittedBy: deal.submittedBy || managerId,
      updatedAt: deal.updatedAt || new Date().toISOString()
    };
  }).filter((deal) => deal.talentName && deal.company);
}

function normalizeTalentProfiles(value) {
  const profiles = {};
  Object.entries(value || {}).forEach(([key, profile]) => {
    profiles[key] = {
      bio: String(profile.bio || ""),
      imageUrl: String(profile.imageUrl || ""),
      imageSource: String(profile.imageSource || ""),
      platforms: {
        youtube: Boolean(profile.platforms?.youtube),
        instagram: Boolean(profile.platforms?.instagram),
        tiktok: Boolean(profile.platforms?.tiktok)
      },
      handles: {
        youtube: String(profile.handles?.youtube || ""),
        instagram: String(profile.handles?.instagram || ""),
        tiktok: String(profile.handles?.tiktok || "")
      },
      stats: {
        youtube: normalizeSocialStats(profile.stats?.youtube),
        instagram: normalizeSocialStats(profile.stats?.instagram),
        tiktok: normalizeSocialStats(profile.stats?.tiktok)
      },
      updatedAt: String(profile.updatedAt || "")
    };
  });
  return profiles;
}

function normalizeSocialStats(stats = {}) {
  return {
    audience: Number(stats.audience || 0),
    views: Number(stats.views || 0),
    engagement: Number(stats.engagement || 0),
    label: String(stats.label || "")
  };
}

function normalizeBrandDatabase(value) {
  const records = {};
  Object.values(value || {}).forEach((item) => {
    const name = String(item.name || item.company || "").trim();
    if (!name) return;
    const paymentTerm = paymentTerms.some((term) => term.value === item.paymentTerm) ? item.paymentTerm : "30";
    records[brandKey(name)] = {
      name,
      emailContact: normalizeEmailContacts(item.emailContact || item.emailAddresses || item.email || ""),
      billingAddress: String(item.billingAddress || item.companyAddress || "").trim(),
      paymentTerm,
      customPaymentDays: Math.max(0, Number(item.customPaymentDays || 0)),
      updatedAt: String(item.updatedAt || "")
    };
  });
  return records;
}

function cleanTalentName(name, managerId) {
  const manager = managerName(managerId);
  if (!name || name === "New Creator" || name === "Split Commission") return (state.talents[managerId] || [])[0] || "";
  if (String(name).trim().toLowerCase() === `${manager.toLowerCase()} roster`) return (state.talents[managerId] || [])[0] || "";
  return String(name).replace(/\s+Roster$/i, "").trim();
}

function emailContactList(value) {
  return String(value || "")
    .split(/[,\n;]/)
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

function normalizeEmailContacts(value) {
  return [...new Set(emailContactList(value))].join(", ");
}

function invalidEmailContacts(value) {
  return emailContactList(value).filter((email) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
}

function ensureSampleDeals(deals) {
  const existingIds = new Set(deals.map((deal) => deal.id));
  const additions = [...seedDeals, ...sampleDeals].filter((deal) => !existingIds.has(deal.id));
  return [...deals, ...additions.map((deal) => normalizeDeals([deal])[0])];
}

function ensureSampleCrmDeals(crmDeals) {
  if (crmDeals.length) return crmDeals;
  const stages = ["Conversation", "Negotiation", "Contract Signed", "To Be Invoiced", "Invoiced"];
  return state.deals.slice(0, 10).map((deal, index) => {
    const amount = sum(deal.monthValues);
    const liveMonthIndex = Math.max(0, deal.monthValues.findIndex((value) => Number(value || 0) > 0));
    return {
      id: `crm-sample-${deal.id}`,
      managerId: deal.managerId,
      talentName: deal.talentName,
      campaignName: deal.campaignName,
      company: ["Nike", "Gymshark", "ASOS", "Spotify", "Charlotte Tilbury"][index % 5],
      emailContact: `brand${index + 1}@example.com`,
      direction: index % 2 ? "Outbound" : "Inbound",
      stage: stages[index % stages.length],
      amount,
      liveMonthIndex,
      paymentTerm: ["upfront", "30", "45", "60", "90"][index % 5],
      customPaymentDays: 0,
      contractName: "",
      contractData: "",
      submittedBy: deal.managerId,
      updatedAt: new Date().toISOString()
    };
  });
}

function uniqueNames(names) {
  return [...new Set(names.map((name) => String(name || "").trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function uniqueDeals(deals) {
  return [...new Map(deals.map((deal) => [deal.id, deal])).values()];
}

function uniqueById(items) {
  return [...new Map(items.map((item) => [item.id, item])).values()];
}

function saveState() {
  saveJSON("creator-pl-extra-managers", state.extraManagers);
  saveJSON("creator-pl-targets", state.targets);
  saveJSON("creator-pl-overheads", state.overheads);
  saveJSON("creator-pl-manager-salaries", state.managerSalaries);
  saveJSON("creator-pl-commission-rates", state.commissionRates);
  saveJSON("creator-pl-commission-overrides", state.commissionOverrides);
  saveJSON("creator-pl-line-reports", state.lineReports);
  saveJSON("creator-pl-request-delegation-permissions", state.requestDelegationPermissions);
  saveJSON("creator-pl-approval-routes", state.approvalRoutes);
  saveJSON("creator-pl-removed-managers", state.removedManagerIds);
  saveJSON("creator-pl-pending-deals", state.pendingDeals);
  saveJSON("creator-pl-pending-expenses", state.pendingExpenses);
  saveJSON("creator-pl-rejection-messages", state.rejectionMessages);
  saveJSON("creator-pl-expenses", state.expenses);
  saveJSON("creator-pl-talent-expenses", state.talentExpenses);
  saveJSON("creator-pl-talents", state.talents);
  saveJSON("creator-pl-talent-emails", state.talentEmails);
  saveJSON("creator-pl-talent-invoice-details", state.talentInvoiceDetails);
  saveJSON("creator-pl-talent-profiles", state.talentProfiles);
  saveJSON("creator-pl-talent-invoice-payments", state.talentInvoicePayments);
  saveJSON("creator-pl-talent-invoice-bills", state.talentInvoiceBills);
  saveJSON("creator-pl-early-talent-line-payments", state.earlyTalentLinePayments);
  saveJSON("creator-pl-talent-report-sends", state.talentReportSends);
  saveJSON("creator-pl-talent-remittance-sends", state.talentRemittanceSends);
  saveJSON("creator-pl-production-rates", state.productionRates);
  saveJSON("creator-pl-production-requests", state.productionRequests);
  saveJSON("creator-pl-email-leads", state.emailLeads);
  saveJSON("creator-pl-pr-requests", state.prRequests);
  saveJSON("creator-pl-event-requests", state.eventRequests);
  saveJSON("creator-pl-brand-database", state.brandDatabase);
  saveJSON("creator-pl-nav-orders", state.navOrders);
  saveJSON("creator-pl-deals", state.deals);
  saveJSON("creator-pl-crm-deals", state.crmDeals);
}

function money(value) {
  const amount = Number(value || 0);
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: Math.abs(amount) >= 10000 ? 0 : 2
  }).format(amount);
}

function currencyMoney(value, currency = "GBP") {
  const amount = Number(value || 0);
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: Math.abs(amount) >= 10000 ? 0 : 2
  }).format(amount);
}

function dealGbpAmount(deal) {
  const amount = Number(deal.amount || 0);
  return deal.currency === "USD" ? amount * usdToGbpRate : amount;
}

function dealMoney(deal) {
  if (deal.currency === "USD") return `${currencyMoney(deal.amount, "USD")} / ${money(dealGbpAmount(deal))}`;
  return money(deal.amount);
}

function dealAmountInput(deal) {
  return currencyMoney(deal.amount, deal.currency === "USD" ? "USD" : "GBP");
}

function currencyInput(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 2
  }).format(Number(value || 0));
}

function parseCurrency(value) {
  return Number(String(value || "").replace(/[^0-9.-]/g, "")) || 0;
}

function sum(values) {
  return values.reduce((total, value) => total + Number(value || 0), 0);
}

function columnTotals(rows) {
  return months.map((_, index) => rows.reduce((total, row) => total + Number(row.values[index] || 0), 0));
}

function slugify(value) {
  const slug = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return slug || `manager-${Date.now()}`;
}

function scopedDeals(mode = "live", managerId = null) {
  return state.deals.filter((deal) => {
    if (managerId && deal.managerId !== managerId) return false;
    if (mode === "pipeline") return deal.status === "Confirmed" || deal.status === "Pipeline";
    return deal.status === "Confirmed";
  });
}

function dealRevenue(mode = "live", managerId = null) {
  return months.map((_, index) => {
    const submittedRevenue = scopedDeals(mode, managerId).reduce((total, deal) => total + Number(deal.monthValues[index] || 0), 0);
    if (mode !== "pipeline") return submittedRevenue;
    return submittedRevenue + crmEarlyPipelineRevenue(managerId)[index];
  });
}

function dealCost(mode = "live", managerId = null) {
  return months.map((_, index) => {
    const submittedCost = scopedDeals(mode, managerId).reduce((total, deal) => {
    const revenueCost = Number(deal.monthValues[index] || 0) * (Number(deal.costRate || 0) / 100);
    const extraCost = Number((deal.extraCostValues || [])[index] || 0);
    return total + revenueCost + extraCost;
    }, 0);
    if (mode !== "pipeline") return submittedCost;
    return submittedCost + (crmEarlyPipelineRevenue(managerId)[index] * 0.8);
  });
}

function crmEarlyPipelineRevenue(managerId = null) {
  return months.map((_, index) => state.crmDeals
    .filter((deal) => ["Conversation", "Negotiation"].includes(deal.stage))
    .filter((deal) => !managerId || deal.managerId === managerId)
    .filter((deal) => signedMonthIndex(deal) === index)
    .reduce((total, deal) => total + dealGbpAmount(deal), 0));
}

function plModel(mode = "live") {
  const target = state.targets;
  const actual = dealRevenue(mode);
  const variation = months.map((_, index) => actual[index] - target[index]);
  const cos = dealCost(mode);
  const overheads = columnTotals(computedOverheads());
  const netProfit = months.map((_, index) => actual[index] - cos[index] - overheads[index]);
  return { target, actual, variation, cos, overheads, netProfit };
}

function sidebarMonthlyTarget() {
  const monthIndex = currentMonthIndex();
  const target = Number(state.targets[monthIndex] || 0);
  const confirmed = Number(dealRevenue("live")[monthIndex] || 0);
  const targetMet = confirmed >= target;
  return `
    <div class="sidebar-target ${targetMet ? "target-hit" : "target-miss"}">
      <div>
        <span>${months[monthIndex]} target revenue</span>
        <strong>${money(target)}</strong>
      </div>
      <div>
        <span>Confirmed deals</span>
        <strong>${money(confirmed)}</strong>
      </div>
    </div>
  `;
}

function managerUsers() {
  return allManagerRecords().filter((manager) => !((state && state.removedManagerIds) || []).includes(manager.id));
}

function financeUsers() {
  return allStaffRecords().filter((user) => user.role === "finance" && !((state && state.removedManagerIds) || []).includes(user.id));
}

function operationsUsers() {
  return allStaffRecords().filter((user) => user.role === "operations" && !((state && state.removedManagerIds) || []).includes(user.id));
}

function productionUsers() {
  return allStaffRecords().filter((user) => user.role === "production" && !((state && state.removedManagerIds) || []).includes(user.id));
}

function allStaffRecords() {
  return [...users.filter((user) => user.role !== "admin"), ...((state && state.extraManagers) || [])];
}

function allManagerRecords() {
  return allStaffRecords().filter((user) => user.role === "manager");
}

function loginUsers() {
  return [users.find((user) => user.role === "admin"), ...financeUsers(), ...operationsUsers(), ...productionUsers(), ...managerUsers()].filter(Boolean);
}

function roleLabel(user = state.user) {
  if (user?.role === "admin") return "Admin";
  if (user?.role === "finance") return "Finance";
  if (user?.role === "operations") return "Operations";
  if (user?.role === "production") return "Production";
  return "Talent manager";
}

function hasAllRosterAccess() {
  return !state.user || ["admin", "finance", "operations"].includes(state.user.role);
}

function canManageTeamPermissions() {
  return ["admin", "operations"].includes(state.user?.role);
}

function accessibleManagerIds() {
  if (hasAllRosterAccess()) return managerUsers().map((manager) => manager.id);
  return [state.user.id, ...(state.lineReports[state.user.id] || [])].filter((id, index, ids) => ids.indexOf(id) === index);
}

function visibleManagerUsers() {
  const ids = accessibleManagerIds();
  return managerUsers().filter((manager) => ids.includes(manager.id));
}

function canAccessManager(managerId) {
  return hasAllRosterAccess() || accessibleManagerIds().includes(managerId);
}

function canDelegateRequestTo(targetManagerId) {
  if (state.user?.role !== "manager" || !targetManagerId || targetManagerId === state.user.id) return false;
  return (state.lineReports[state.user.id] || []).includes(targetManagerId)
    || (state.requestDelegationPermissions[targetManagerId] || []).includes(state.user.id);
}

function requestDelegationTargets() {
  if (state.user?.role !== "manager") return [];
  return managerUsers().filter((manager) => canDelegateRequestTo(manager.id));
}

function requestListForType(type) {
  return type === "pr" ? state.prRequests : state.eventRequests;
}

function visibleCrmDeals() {
  const visibleIds = crmVisibleManagerIds();
  return state.crmDeals.filter((deal) => visibleIds.includes(deal.managerId));
}

function crmVisibleManagerIds() {
  if (hasAllRosterAccess()) return managerUsers().map((manager) => manager.id);
  if (state.crmScope === "full") return managerUsers().map((manager) => manager.id);
  if (state.crmScope === "team") return accessibleManagerIds();
  return [state.user.id];
}

function crmVisibleManagerUsers() {
  const ids = crmVisibleManagerIds();
  return managerUsers().filter((manager) => ids.includes(manager.id));
}

function canEditCrmDeal(deal) {
  return state.user?.role === "admin" || state.user?.role === "finance" || state.user?.role === "operations" || deal.managerId === state.user?.id;
}

function isPostInvoiceStage(stage) {
  return ["Invoiced", "On Next Payment Run", "Paid"].includes(stage);
}

function canManuallyMovePostInvoiceStage(stage) {
  if (!isPostInvoiceStage(stage)) return true;
  return ["admin", "finance"].includes(state.user?.role);
}

function canDeleteCrmDeal(deal) {
  return state.user?.role === "admin" || (state.user?.role === "manager" && canAccessManager(deal.managerId));
}

function dealTalentExpenses(dealId) {
  return state.talentExpenses
    .filter((expense) => expense.crmDealId === dealId)
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
}

function dealTalentExpenseTotal(dealId) {
  return dealTalentExpenses(dealId).reduce((total, expense) => total + Number(expense.amount || 0), 0);
}

function dealInvoiceTotal(deal) {
  return dealGbpAmount(deal) + dealTalentExpenseTotal(deal.id);
}

function talentPayableAmount(deal) {
  return (dealGbpAmount(deal) * 0.8) + dealTalentExpenseTotal(deal.id);
}

function visibleTalentExpenseDeals() {
  const managerIds = hasAllRosterAccess() ? managerUsers().map((manager) => manager.id) : accessibleManagerIds();
  return state.crmDeals
    .filter((deal) => managerIds.includes(deal.managerId))
    .sort((a, b) => a.talentName.localeCompare(b.talentName) || new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
}

function crmPaymentDays(deal) {
  if (deal.paymentTerm === "custom") return Number(deal.customPaymentDays || 0);
  return (paymentTerms.find((term) => term.value === deal.paymentTerm) || paymentTerms[1]).days;
}

function crmPaymentLabel(deal) {
  if (deal.paymentTerm === "custom") return `${crmPaymentDays(deal)} days`;
  return (paymentTerms.find((term) => term.value === deal.paymentTerm) || paymentTerms[1]).label;
}

function crmDueMonthIndex(deal) {
  return signedMonthIndex(deal) + Math.ceil(crmPaymentDays(deal) / 30);
}

function crmDueMonthLabel(deal) {
  const dueIndex = crmDueMonthIndex(deal);
  return months[dueIndex] || "After Dec 26";
}

function currentMonthIndex() {
  const now = new Date();
  if (now.getFullYear() !== 2026) return Math.min(11, Math.max(0, now.getMonth()));
  return Math.min(11, Math.max(0, now.getMonth()));
}

function signedMonthIndex(deal) {
  if (deal.signedMonthIndex !== null && deal.signedMonthIndex !== undefined) return Number(deal.signedMonthIndex || 0);
  return Number(deal.liveMonthIndex || 0);
}

function crmDueDate(deal) {
  if (deal.xeroDueDate) return deal.xeroDueDate;
  const base = new Date(2026, signedMonthIndex(deal), 1);
  base.setDate(base.getDate() + crmPaymentDays(deal));
  return base.toISOString().slice(0, 10);
}

function crmPaidDate(deal) {
  if (deal.xeroPaidAt) return String(deal.xeroPaidAt).slice(0, 10);
  if (deal.xeroReconciledAt) return String(deal.xeroReconciledAt).slice(0, 10);
  if (["Paid", "On Next Payment Run"].includes(deal.stage) && deal.updatedAt) return String(deal.updatedAt).slice(0, 10);
  return "";
}

function isDateInRange(value, startDate, endDate) {
  if (!value || !startDate || !endDate) return false;
  const date = new Date(`${value}T00:00:00`);
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  if ([date, start, end].some((item) => Number.isNaN(item.getTime()))) return false;
  return date >= start && date <= end;
}

function monthDateRange(monthIndex) {
  const index = Math.min(11, Math.max(0, Number(monthIndex || 0)));
  const start = new Date(2026, index, 1);
  const end = new Date(2026, index + 1, 0);
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
    label: months[index]
  };
}

function displayDate(value) {
  if (!value) return "-";
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function isDateOverdue(value) {
  if (!value) return false;
  const dueDate = new Date(`${value}T00:00:00`);
  if (Number.isNaN(dueDate.getTime())) return false;
  const today = new Date();
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return dueDate < todayDate;
}

function productionPaymentRunDate(shootDate) {
  if (!shootDate) return "";
  const date = new Date(`${shootDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  const runDay = date.getDate() <= 14 ? 14 : 28;
  return paymentRunDate(date.getFullYear(), date.getMonth(), runDay);
}

function paymentRunDate(year, monthIndex, runDay) {
  const runDate = new Date(year, monthIndex, runDay);
  if (runDate.getDay() === 6) runDate.setDate(runDate.getDate() - 1);
  if (runDate.getDay() === 0) runDate.setDate(runDate.getDate() - 2);
  return runDate.toISOString().slice(0, 10);
}

function nextPaymentRunDate(reference = new Date()) {
  const today = new Date(reference.getFullYear(), reference.getMonth(), reference.getDate());
  const thisMonthRuns = [14, 28].map((day) => paymentRunDate(today.getFullYear(), today.getMonth(), day));
  const nextRun = thisMonthRuns.find((runDate) => new Date(`${runDate}T00:00:00`) >= today);
  if (nextRun) return nextRun;
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  return paymentRunDate(nextMonth.getFullYear(), nextMonth.getMonth(), 14);
}

function talentPaymentRunDateForDeal(deal) {
  const paidDate = crmPaidDate(deal);
  if (!paidDate) return "";
  const date = new Date(`${paidDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return nextPaymentRunDate(date);
}

function talentInvoiceDetails(managerId, talentName) {
  const key = talentKey(managerId, talentName);
  return state.talentInvoiceDetails[key] || {
    invoiceName: talentName || "",
    invoiceEmail: talentEmail(managerId, talentName),
    invoiceAddress: "",
    bankName: "",
    accountName: talentName || "",
    sortCode: "",
    accountNumber: "",
    vatNumber: ""
  };
}

function talentInvoiceDealLine(deal) {
  const dealShare = dealGbpAmount(deal) * 0.8;
  const expenses = dealTalentExpenseTotal(deal.id);
  const grossTotal = dealShare + expenses;
  const paidEarly = Boolean(state.earlyTalentLinePayments[deal.id]);
  return {
    deal,
    description: `${deal.company || "Company"} - ${deal.campaignName || "Campaign"}`,
    dealShare,
    expenses,
    grossTotal,
    paidEarly,
    paidEarlyAt: state.earlyTalentLinePayments[deal.id]?.paidAt || "",
    paidEarlyAmount: paidEarly ? grossTotal : 0,
    total: paidEarly ? 0 : grossTotal
  };
}

function ensureTalentInvoiceDraftBill(invoice) {
  if (!state.talentInvoiceBills[invoice.id]) {
    state.talentInvoiceBills[invoice.id] = {
      billId: `XERO-BILL-${Math.abs(hashString(invoice.id)).toString().slice(0, 6)}`,
      status: "Draft Bill",
      createdAt: new Date().toISOString(),
      reference: invoice.id.replace("talent-invoice-", "").toUpperCase()
    };
  }
  return state.talentInvoiceBills[invoice.id];
}

function hashString(value) {
  return String(value || "").split("").reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 0);
}

function buildTalentInvoices() {
  const groups = new Map();
  state.crmDeals
    .filter((deal) => ["Paid", "On Next Payment Run"].includes(deal.stage) && crmPaidDate(deal))
    .forEach((deal) => {
      const runDate = talentPaymentRunDateForDeal(deal);
      if (!runDate) return;
      const key = `${talentKey(deal.managerId, deal.talentName)}::${runDate}`;
      if (!groups.has(key)) {
        groups.set(key, {
          id: `talent-invoice-${slugify(deal.managerId)}-${slugify(deal.talentName)}-${runDate}`,
          managerId: deal.managerId,
          talentName: deal.talentName,
          talentKey: talentKey(deal.managerId, deal.talentName),
          paymentRunDate: runDate,
          details: talentInvoiceDetails(deal.managerId, deal.talentName),
          lines: []
        });
      }
      groups.get(key).lines.push(talentInvoiceDealLine(deal));
    });
  return [...groups.values()]
    .map((invoice) => {
      const enrichedInvoice = {
        ...invoice,
        paidAt: (state.talentInvoicePayments[invoice.id] || {}).paidAt || "",
        totalDealShare: invoice.lines.reduce((total, line) => total + line.dealShare, 0),
        totalExpenses: invoice.lines.reduce((total, line) => total + line.expenses, 0),
        totalAlreadyPaid: invoice.lines.reduce((total, line) => total + line.paidEarlyAmount, 0),
        grossTotal: invoice.lines.reduce((total, line) => total + line.grossTotal, 0),
        total: invoice.lines.reduce((total, line) => total + line.total, 0)
      };
      return {
        ...enrichedInvoice,
        xeroBill: ensureTalentInvoiceDraftBill(enrichedInvoice)
      };
    })
    .sort((a, b) => new Date(a.paymentRunDate) - new Date(b.paymentRunDate) || a.talentName.localeCompare(b.talentName));
}

function calendarMonthKey(value) {
  if (!value) return "";
  return value.slice(0, 7);
}

function calendarMonthLabel(value) {
  if (!value) return "";
  const date = new Date(`${value}-01T00:00:00`);
  return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

function calendarDayNumber(value) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString("en-GB", { day: "2-digit" });
}

function productionCalendarEvents(requests, includeChargebacks = false) {
  return requests.flatMap((request) => {
    const events = [{
      id: `${request.id}-shoot`,
      date: request.shootDate,
      type: "Shoot",
      title: request.talentName,
      meta: `${managerName(request.managerId)} · ${productionItemsLabel(request)}`,
      amount: request.amount
    }];
    if (includeChargebacks) {
      const chargebackDate = request.chargebackPaymentRunDate || productionPaymentRunDate(request.shootDate);
      if (chargebackDate) {
        events.push({
          id: `${request.id}-chargeback`,
          date: chargebackDate,
          type: "Chargeback",
          title: request.talentName,
          meta: `${managerName(request.managerId)} · ${money(request.amount)}`,
          amount: request.amount
        });
      }
    }
    return events;
  }).filter((event) => event.date).sort((a, b) => new Date(a.date) - new Date(b.date) || a.type.localeCompare(b.type));
}

function productionCalendar(requests, includeChargebacks = false) {
  const events = productionCalendarEvents(requests, includeChargebacks);
  return renderProductionCalendarEvents(events, "No shoot days to show on the calendar yet.");
}

function productionChargebackCalendar(requests) {
  const events = productionCalendarEvents(requests, true).filter((event) => event.type === "Chargeback");
  return renderProductionCalendarEvents(events, "No chargeback dates to show on the calendar yet.");
}

function renderProductionCalendarEvents(events, emptyMessage) {
  if (!events.length) return `<div class="section-body"><div class="notice">${emptyMessage}</div></div>`;
  const grouped = events.reduce((groups, event) => {
    const key = calendarMonthKey(event.date);
    groups[key] = groups[key] || [];
    groups[key].push(event);
    return groups;
  }, {});
  return `
    <div class="section-body production-calendar">
      ${Object.entries(grouped).map(([monthKey, monthEvents]) => `
        <div class="calendar-month">
          <h3>${calendarMonthLabel(monthKey)}</h3>
          <div class="calendar-event-grid">
            ${monthEvents.map((event) => `
              <article class="calendar-event ${event.type === "Chargeback" ? "chargeback-event" : "shoot-event"}">
                <div class="calendar-date">
                  <span>${calendarDayNumber(event.date)}</span>
                  <small>${event.type}</small>
                </div>
                <div>
                  <strong>${event.title}</strong>
                  <span>${event.meta}</span>
                </div>
              </article>
            `).join("")}
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function lineManagerFor(managerId) {
  const match = Object.entries(state.lineReports).find(([, reportIds]) => reportIds.includes(managerId));
  return match ? match[0] : null;
}

function approvalApproverFor(managerId) {
  return state.approvalRoutes[managerId] || lineManagerFor(managerId) || "admin";
}

function canApprovePendingDeal(deal) {
  return state.user?.role === "admin" || deal.approverId === state.user?.id;
}

function rejectionMessagesForCurrentUser() {
  if (!state.user || state.user.role === "admin") return [];
  return state.rejectionMessages.filter((message) => message.toManagerId === state.user.id);
}

function unreadRejectionMessagesForCurrentUser() {
  return rejectionMessagesForCurrentUser().filter((message) => !message.readAt);
}

function approvalActionCount() {
  if (!state.user) return 0;
  if (state.user.role === "admin") return state.pendingDeals.length + state.pendingExpenses.length;
  return state.pendingDeals.filter((deal) => deal.approverId === state.user.id).length
    + state.pendingExpenses.filter((expense) => expense.approverId === state.user.id).length
    + unreadRejectionMessagesForCurrentUser().length;
}

function financeActionCount() {
  return financeActionDeals().length + financeTalentExpenseActions().length;
}

function financeChargebackCount() {
  return financeProductionChargebacks().length;
}

function canUseFinanceTools() {
  return ["admin", "finance"].includes(state.user?.role);
}

function talentInvoiceActionCount() {
  if (!canUseFinanceTools()) return 0;
  return buildTalentInvoices().filter((invoice) => !invoice.paidAt).length;
}

function productionActionCount() {
  if (state.user?.role === "manager") return state.productionRequests.filter((request) => request.managerId === state.user.id && request.reviewedAt && !request.managerSeenAt).length;
  if (state.user?.role !== "production") return 0;
  return state.productionRequests.filter((request) => request.status === "Pending" || (request.status === "Cancelled" && !request.productionSeenAt)).length;
}

function emailLeadActionCount() {
  if (!state.user || state.user.role === "production" || state.user.role === "finance") return 0;
  return visibleEmailLeads().filter((lead) => lead.status === "New").length;
}

function prRequestActionCount() {
  if (!state.user || state.user.role === "production" || state.user.role === "finance") return 0;
  return visiblePrRequests().filter((request) => requestIsActionableForCurrentUser(request)).length;
}

function eventRequestActionCount() {
  if (!state.user || state.user.role === "production" || state.user.role === "finance") return 0;
  return visibleEventRequests().filter((request) => requestIsActionableForCurrentUser(request)).length;
}

function actionCountForView(viewId) {
  return viewId === "approvals"
    ? approvalActionCount()
    : viewId === "email-leads"
      ? emailLeadActionCount()
    : viewId === "pr-requests"
      ? prRequestActionCount()
    : viewId === "events"
      ? eventRequestActionCount()
    : viewId === "finance-actions"
    ? financeActionCount()
      : viewId === "production-chargebacks"
        ? financeChargebackCount()
      : viewId === "talent-invoices"
        ? talentInvoiceActionCount()
      : viewId === "production" || viewId === "production-requests"
        ? productionActionCount()
      : 0;
}

function totalActionCount(views) {
  return views.reduce((total, view) => total + actionCountForView(view.id), 0);
}

function globalActionBadge(views) {
  const count = totalActionCount(views);
  return `
    <div class="global-actions ${count ? "has-actions" : ""}">
      <span>${count ? "Actions to do" : "No actions"}</span>
      <strong>${count}</strong>
    </div>
  `;
}

function navLabel(view) {
  const count = actionCountForView(view.id);
  return `${view.label}${count ? `<span class="nav-badge">${count}</span>` : ""}`;
}

function leaderboardManagerIds() {
  if (state.leaderboardScope === "full") return managerUsers().map((manager) => manager.id);
  if (state.user?.role === "admin") {
    const selected = managerUsers().some((manager) => manager.id === state.selectedManagerId) ? state.selectedManagerId : managerUsers()[0]?.id;
    return selected ? [selected] : [];
  }
  return [state.user.id];
}

function allTalentRows(mode = "pipeline", managerIds = null) {
  const rows = new Map();
  const allowedIds = managerIds || managerUsers().map((manager) => manager.id);
  managerUsers().filter((manager) => allowedIds.includes(manager.id)).forEach((manager) => {
    talentOptions(manager.id).forEach((talentName) => {
      rows.set(`${manager.id}::${talentName}`, {
        key: `${manager.id}::${talentName}`,
        managerId: manager.id,
        talentName,
        total: 0,
        deals: []
      });
    });
  });
  scopedDeals(mode).forEach((deal) => {
    if (!allowedIds.includes(deal.managerId)) return;
    const key = `${deal.managerId}::${deal.talentName}`;
    if (!rows.has(key)) {
      rows.set(key, {
        key,
        managerId: deal.managerId,
        talentName: deal.talentName,
        total: 0,
        deals: []
      });
    }
    const row = rows.get(key);
    row.total += sum(deal.monthValues);
    row.deals.push(deal);
  });
  return [...rows.values()].sort((a, b) => b.total - a.total || a.talentName.localeCompare(b.talentName));
}

function monthlyManagerRevenue(managerId) {
  return dealRevenue("live", managerId);
}

function monthlyManagerCommission(managerId) {
  const salary = managerSalary(managerId);
  const threshold = salary * 5;
  const rate = managerCommissionRate(managerId) / 100;
  const ownCommission = monthlyManagerRevenue(managerId).map((revenue) => revenue > threshold ? revenue * rate : 0);
  const sharedCommission = monthlyManagerSharedCommission(managerId);
  return months.map((_, index) => ownCommission[index] + sharedCommission[index]);
}

function monthlyManagerOwnCommission(managerId) {
  const salary = managerSalary(managerId);
  const threshold = salary * 5;
  const rate = managerCommissionRate(managerId) / 100;
  return monthlyManagerRevenue(managerId).map((revenue) => revenue > threshold ? revenue * rate : 0);
}

function monthlyManagerSharedCommission(managerId) {
  const overrides = state.commissionOverrides.filter((override) => override.recipientManagerId === managerId);
  return months.map((_, index) => overrides.reduce((total, override) => {
    if (index < Number(override.startMonthIndex || 0)) return total;
    const rosterRevenue = monthlyManagerRevenue(override.rosterManagerId)[index];
    return total + rosterRevenue * (Number(override.rate || 0) / 100);
  }, 0));
}

function hasSharedCommission(managerId) {
  return state.commissionOverrides.some((override) => override.recipientManagerId === managerId);
}

function monthlyManagerCommissionGap(managerId) {
  const salary = managerSalary(managerId);
  const threshold = salary * 5;
  return monthlyManagerRevenue(managerId).map((revenue) => Math.max(threshold - revenue, 0));
}

function managerSalary(managerId) {
  return Number(state.managerSalaries[managerId] || 5000);
}

function managerCommissionRate(managerId) {
  return Number(state.commissionRates[managerId] || 1);
}

function totalCommissionByMonth() {
  return months.map((_, index) => managerUsers().reduce((total, manager) => total + monthlyManagerCommission(manager.id)[index], 0));
}

function expenseTotals(category) {
  return months.map((_, index) => state.expenses
    .filter((expense) => expense.category === category && expense.monthIndex === index)
    .reduce((total, expense) => total + Number(expense.amount || 0), 0));
}

function computedOverheads() {
  const commission = totalCommissionByMonth();
  const entertaining = expenseTotals("Client entertaining");
  const marketing = expenseTotals("Marketing");
  return state.overheads.map((row) => {
    const derivedValues = row.values.map((_, index) => {
      if (row.id === "bonus") return commission[index];
      if (row.id === "entertaining") return entertaining[index];
      if (row.id === "marketing") return marketing[index];
      return 0;
    });
    const values = row.values.map((value, index) => {
      return Number(value || 0) + derivedValues[index];
    });
    return { ...row, values, derivedValues };
  });
}

function quarterTotals(values) {
  return [
    sum(values.slice(0, 3)),
    sum(values.slice(3, 6)),
    sum(values.slice(6, 9)),
    sum(values.slice(9, 12))
  ];
}

function rosterRowsForManager(managerId) {
  return talentOptions(managerId).map((talentName) => {
    const submittedDeals = state.deals.filter((deal) => deal.managerId === managerId && deal.talentName === talentName);
    return {
      key: `${managerId}::${talentName}`,
      managerId,
      talentName,
      total: submittedDeals.reduce((total, deal) => total + sum(deal.monthValues), 0),
      submittedDeals
    };
  }).sort((a, b) => b.total - a.total || a.talentName.localeCompare(b.talentName));
}

function app() {
  const root = document.querySelector("#app");
  if (!state.user) {
    root.innerHTML = loginView();
    bindLogin();
    return;
  }

  syncXeroInvoiceStatuses();
  const views = applySavedNavOrder(allowedViews());
  if (!views.some((view) => view.id === state.activeView)) state.activeView = views[0].id;
  if (!state.selectedManagerId) state.selectedManagerId = state.user.role === "admin" ? "amelia" : state.user.id;

  root.innerHTML = `
    <div class="shell">
      <aside class="sidebar">
        <div class="brand">
          <img class="brand-logo" src="cowshed-creators-logo.png" alt="Cowshed Creators" />
          <span>Creator Portal</span>
          ${globalActionBadge(views)}
          ${sidebarMonthlyTarget()}
        </div>
        <nav class="nav">
          ${views.map((view) => `<button class="${state.activeView === view.id ? "active" : ""}" data-view="${view.id}" draggable="true" aria-label="Open ${htmlSafe(view.label)}"><span class="nav-handle" aria-hidden="true">::</span><span class="nav-text">${navLabel(view)}</span></button>`).join("")}
        </nav>
        <div class="user-card">
          <strong>${state.user.name}</strong>
          <span>${roleLabel()} access</span>
          <button class="ghost" data-logout>Sign out</button>
        </div>
      </aside>
      <main class="main">${viewTemplate()}</main>
    </div>
  `;
  bindShell();
}

function navOrderKey() {
  return state.user ? `${state.user.role}:${state.user.id}` : "guest";
}

function applySavedNavOrder(views) {
  const savedOrder = Array.isArray(state.navOrders[navOrderKey()]) ? state.navOrders[navOrderKey()] : [];
  if (!savedOrder.length) return views;
  const viewById = new Map(views.map((view) => [view.id, view]));
  const ordered = savedOrder.filter((id) => viewById.has(id)).map((id) => viewById.get(id));
  const remaining = views.filter((view) => !savedOrder.includes(view.id));
  return [...ordered, ...remaining];
}

function saveNavOrderFromDom() {
  if (!state.user) return;
  const ids = [...document.querySelectorAll("[data-view]")].map((button) => button.dataset.view).filter(Boolean);
  state.navOrders[navOrderKey()] = ids;
  saveState();
}

function loginView() {
  return `
    <main class="login-page">
      <section class="login-panel">
        <div class="login-intro">
          <div>
            <p class="eyebrow">MVP prototype</p>
            <img class="login-logo" src="cowshed-creators-logo.png" alt="Cowshed Creators" />
            <h1>Creator Portal</h1>
            <p>Role-based workspace for live P&L, pipeline, overheads, manager rosters, and deal submissions.</p>
          </div>
          <div class="notice">Prototype login: choose admin, operations, finance, or a manager profile to test each workspace view.</div>
        </div>
        <form class="login-form" data-login-form>
          <div>
            <p class="eyebrow">Sign in</p>
            <h2>Choose workspace access</h2>
          </div>
          <div class="field">
            <label for="profile">Profile</label>
            <select id="profile" name="profile">
              ${loginUsers().map((user) => `<option value="${user.id}">${user.name} - ${roleLabel(user)}</option>`).join("")}
            </select>
          </div>
          <button class="primary" type="submit">Continue</button>
        </form>
      </section>
    </main>
  `;
}

function allowedViews() {
  if (state.user.role === "admin") {
    return [
      { id: "pl-live", label: "P&L 2026" },
      { id: "leaderboard", label: "Leaderboard" },
      { id: "commission", label: "Commission" },
      { id: "crm", label: "CRM" },
      { id: "brands", label: "Brands" },
      { id: "reports", label: "Reports" },
      { id: "production", label: "Production" },
      { id: "cashflow", label: "Cashflow" },
      { id: "managers", label: "Team" },
      { id: "permissions", label: "Permissions" },
      { id: "approvals", label: "Approvals" },
      { id: "talent", label: "Talent" },
      { id: "media-packs", label: "Media Packs" },
      { id: "talent-invoices", label: "Talent Invoices" },
      { id: "finance-actions", label: "Finance Actions" },
      { id: "production-chargebacks", label: "Production chargebacks" },
      { id: "overheads", label: "Overheads" },
      { id: "talent-expenses", label: "Talent Expenses" },
      { id: "expenses", label: "Expenses" }
    ];
  }
  if (state.user.role === "finance") {
    return [
      { id: "pl-live", label: "P&L 2026" },
      { id: "crm", label: "CRM" },
      { id: "brands", label: "Brands" },
      { id: "reports", label: "Reports" },
      { id: "cashflow", label: "Cashflow" },
      { id: "expenses", label: "Expenses" },
      { id: "talent", label: "Talent" },
      { id: "media-packs", label: "Media Packs" },
      { id: "talent-invoices", label: "Talent Invoices" },
      { id: "finance-actions", label: "Actions" },
      { id: "production-chargebacks", label: "Production chargebacks" }
    ];
  }
  if (state.user.role === "operations") {
    return [
      { id: "pl-live", label: "P&L 2026" },
      { id: "leaderboard", label: "Leaderboard" },
      { id: "commission", label: "Commission" },
      { id: "crm", label: "CRM" },
      { id: "brands", label: "Brands" },
      { id: "reports", label: "Reports" },
      { id: "production", label: "Production" },
      { id: "managers", label: "Team" },
      { id: "permissions", label: "Permissions" },
      { id: "approvals", label: "Approvals" },
      { id: "talent", label: "Talent" },
      { id: "media-packs", label: "Media Packs" },
      { id: "overheads", label: "Overheads" },
      { id: "talent-expenses", label: "Talent Expenses" },
      { id: "expenses", label: "Expenses" }
    ];
  }
  if (state.user.role === "production") {
    return [
      { id: "production-requests", label: "Production Requests" },
      { id: "production-rates", label: "Rates" }
    ];
  }
  return [
    { id: "commission", label: "Commission" },
    { id: "crm", label: "CRM" },
    { id: "email-leads", label: "Email Leads" },
    { id: "pr-requests", label: "PR Requests" },
    { id: "events", label: "Events" },
    { id: "brands", label: "Brands" },
    { id: "reports", label: "Reports" },
    { id: "production", label: "Production" },
    { id: "talent", label: "Talent" },
    { id: "media-packs", label: "Media Packs" },
    { id: "talent-expenses", label: "Talent Expenses" },
    { id: "expenses", label: "Expenses" },
    { id: "approvals", label: "Approvals" }
  ];
}

function viewTemplate() {
  if (state.activeView === "leaderboard") return leaderboardView();
  if (state.activeView === "commission") return commissionTabView();
  if (state.activeView === "crm") return crmView();
  if (state.activeView === "email-leads") return emailLeadsView();
  if (state.activeView === "pr-requests") return requestListView("pr");
  if (state.activeView === "events") return requestListView("event");
  if (state.activeView === "brands") return brandsView();
  if (state.activeView === "reports") return reportsView();
  if (state.activeView === "production") return productionView();
  if (state.activeView === "production-requests") return productionView("requests");
  if (state.activeView === "production-rates") return productionRatesOnlyView();
  if (state.activeView === "cashflow") return cashflowView();
  if (state.activeView === "finance-actions") return financeActionsView();
  if (state.activeView === "production-chargebacks") return productionChargebacksFinanceView();
  if (state.activeView === "managers") return managersAdminView();
  if (state.activeView === "permissions") return permissionsView();
  if (state.activeView === "approvals") return approvalsView();
  if (state.activeView === "talent") return hasAllRosterAccess() ? talentAdminView() : talentManagerView();
  if (state.activeView === "media-packs") return mediaPacksView();
  if (state.activeView === "talent-invoices") return talentInvoicesView();
  if (state.activeView === "overheads") return overheadsView();
  if (state.activeView === "talent-expenses") return talentExpensesView();
  if (state.activeView === "expenses") return expensesView();
  if (state.activeView === "manager") return managerView();
  if (state.activeView === "deals") return allDealsView();
  return plView(state.plMode);
}

function plView(mode) {
  const model = plModel(mode);
  const rows = [
    { label: "Target", values: model.target, editable: state.user.role === "admin" && mode === "live", editType: "target" },
    { label: mode === "pipeline" ? "Confirmed + Pipeline + CRM Conversation/Negotiation" : "Confirmed Deals", values: model.actual },
    { label: "Total Variation", values: model.variation, total: true, polarity: true },
    { type: "section", label: "Cost of Sale" },
    { label: "COS", values: model.cos },
    { label: "Overheads", values: model.overheads },
    { label: "Net Profit", values: model.netProfit, total: true, polarity: true }
  ];

  return `
    ${header("P&L 2026", mode === "pipeline" ? "Confirmed, pipeline, conversation and negotiation deals included" : "Confirmed deals only")}
    ${kpis(model, mode)}
    <section class="section">
      <div class="section-head">
        <h2>${mode === "pipeline" ? "Pipeline P&L" : "Live P&L"}</h2>
        <div class="section-actions">
          ${state.user.role === "admin" ? `<button class="secondary" data-undo ${state.undoStack.length ? "" : "disabled"}>Undo manual edit</button>` : ""}
          <div class="segmented">
            <button class="${state.plMode === "live" ? "active" : ""}" data-pl-mode="live">Live</button>
            <button class="${state.plMode === "pipeline" ? "active" : ""}" data-pl-mode="pipeline">Pipeline</button>
          </div>
        </div>
      </div>
      <div class="table-wrap">${matrixTable(rows)}</div>
    </section>
    <section class="section soft-section">
      <div class="section-head">
        <h2>Manager earnings at a glance</h2>
        <div class="segmented">
          <button class="${state.earningsMode === "live" ? "active" : ""}" data-earnings-mode="live">Confirmed</button>
          <button class="${state.earningsMode === "pipeline" ? "active" : ""}" data-earnings-mode="pipeline">Confirmed + pipeline</button>
        </div>
      </div>
      <div class="section-body">${managerEarnings(state.earningsMode)}</div>
    </section>
  `;
}

function overheadsView() {
  const computedRows = computedOverheads();
  const rows = [
    ...computedRows.map((row) => ({ ...row, editable: state.user.role === "admin" && !["bonus", "entertaining", "marketing"].includes(row.id), editType: "overhead" })),
    { label: "Total Overheads", values: columnTotals(computedRows), total: true }
  ];
  return `
    ${header("Overheads", "Overheads with commission and expenses pulled in")}
    <section class="section">
      <div class="section-head">
        <h2>Overheads model</h2>
        <div class="section-actions">
          ${state.user.role === "admin" ? `<button class="secondary" data-undo ${state.undoStack.length ? "" : "disabled"}>Undo manual edit</button>` : ""}
          <span class="pill admin">${state.user.role === "admin" ? "Admin editable" : "View only"}</span>
        </div>
      </div>
      <div class="table-wrap">${matrixTable(rows)}</div>
      <div class="section-body"><div class="notice">Bonuses and commission, Client entertaining, and Marketing are locked here. Commission comes from approved commission rules; expenses come through the Expenses tab.</div></div>
    </section>
  `;
}

function leaderboardView() {
  const rows = allTalentRows("live", leaderboardManagerIds());
  if (!state.selectedTalentKey || !rows.some((row) => row.key === state.selectedTalentKey)) {
    state.selectedTalentKey = rows[0]?.key || null;
  }
  const selected = rows.find((row) => row.key === state.selectedTalentKey);
  return `
    ${header("Talent leaderboard", "Whole-roster ranking by confirmed deal value only")}
    <div class="layout">
      <section class="section">
        <div class="section-head">
          <h2>Top earning talent</h2>
          <div class="section-actions">
            ${state.user.role === "admin" && state.leaderboardScope === "personal" ? `
              <select class="compact-select" data-leaderboard-manager>
                ${managerUsers().map((manager) => `<option value="${manager.id}" ${manager.id === state.selectedManagerId ? "selected" : ""}>${manager.name}</option>`).join("")}
              </select>
            ` : ""}
            <div class="segmented">
              <button class="${state.leaderboardScope === "personal" ? "active" : ""}" data-leaderboard-scope="personal">Your roster only</button>
              <button class="${state.leaderboardScope === "full" ? "active" : ""}" data-leaderboard-scope="full">Full roster</button>
            </div>
            <span class="pill confirmed">Confirmed only</span>
          </div>
        </div>
        <div class="section-body">
          <div class="leaderboard-list">
            ${rows.map((row, index) => `
              <button class="leaderboard-row ${state.selectedTalentKey === row.key ? "active" : ""}" data-talent-detail="${row.key}">
                <span class="rank">${index + 1}</span>
                <span>
                  <strong>${row.talentName}</strong>
                  <small>${managerName(row.managerId)}</small>
                </span>
                <strong>${money(row.total)}</strong>
              </button>
            `).join("")}
          </div>
        </div>
      </section>
      <section class="section">
        <div class="section-head"><h2>${selected ? selected.talentName : "Talent"} deals</h2></div>
        <div class="section-body manager-list">${selected ? dealCards(selected.deals, false) : `<div class="notice">No talent to show yet.</div>`}</div>
      </section>
    </div>
  `;
}

function talentAdminView() {
  const canAdminister = state.user.role === "admin";
  const managerIds = managerUsers().map((manager) => manager.id);
  let selectedManagerId = state.selectedManagerId || "all";
  if (selectedManagerId !== "all" && !managerIds.includes(selectedManagerId)) selectedManagerId = "all";
  state.selectedManagerId = selectedManagerId;
  const allSelected = selectedManagerId === "all";
  let rows = allSelected
    ? managerUsers().flatMap((manager) => rosterRowsForManager(manager.id))
    : rosterRowsForManager(selectedManagerId);
  if (!rows.length && allSelected) {
    rows = allTalentRows("pipeline").map((row) => ({
      key: row.key,
      managerId: row.managerId,
      talentName: row.talentName,
      total: row.total,
      submittedDeals: row.deals
    }));
  }
  if (state.selectedTalentKey && !rows.some((row) => row.key === state.selectedTalentKey)) {
    state.selectedTalentKey = null;
  }
  const selectedTalent = rows.find((row) => row.key === state.selectedTalentKey);
  const selectedTalentDeals = selectedTalent
    ? state.deals.filter((deal) => deal.managerId === selectedTalent.managerId && deal.talentName === selectedTalent.talentName)
    : [];
  return `
    ${header("Talent", canAdminister ? "Roster management" : "Roster overview and invoicing details")}
    <div class="layout">
      <div class="section-stack">
        <section class="section">
          <div class="section-head"><h2>Roster</h2><span class="pill admin">${canAdminister ? "Admin editable" : "View only"}</span></div>
          <div class="section-body">
            <div class="field roster-filter">
              <label for="adminTalentManager">Select manager</label>
              <select id="adminTalentManager" class="compact-select" data-admin-roster-manager>
                <option value="all" ${allSelected ? "selected" : ""}>All managers</option>
                ${managerUsers().map((manager) => `<option value="${manager.id}" ${manager.id === selectedManagerId ? "selected" : ""}>${manager.name}</option>`).join("")}
              </select>
            </div>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Talent</th>
                  <th>Email</th>
                  <th>Manager</th>
                  <th>Submitted revenue</th>
                  <th>Transfer roster to</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                ${rows.length ? rows.map((row) => `
                  <tr class="${state.selectedTalentKey === row.key ? "selected-row" : ""}">
                    <td><button class="table-link" data-talent-detail="${row.key}">${row.talentName}</button></td>
                    <td>${canAdminister ? `<input class="mini-input" data-talent-email="${row.key}" type="email" value="${talentEmail(row.managerId, row.talentName)}" placeholder="talent@email.com" aria-label="${row.talentName} email" />` : talentEmail(row.managerId, row.talentName) || "-"}</td>
                    <td>${managerName(row.managerId)}</td>
                    <td>${money(row.total)}</td>
                    <td>
                      ${canAdminister ? `<select class="compact-select" data-transfer-talent="${row.key}">
                        ${managerUsers().map((manager) => `<option value="${manager.id}" ${manager.id === row.managerId ? "selected" : ""}>${manager.name}</option>`).join("")}
                      </select>` : "-"}
                    </td>
                    <td>${canAdminister ? `<button class="secondary danger-button" data-remove-talent="${row.key}">Remove talent</button>` : "View only"}</td>
                  </tr>
                `).join("") : `<tr><td colspan="6">No talent added ${allSelected ? "yet" : `for ${managerName(selectedManagerId)} yet`}.</td></tr>`}
              </tbody>
            </table>
          </div>
        </section>
        ${canAdminister ? `<section class="section">
          <div class="section-head"><h2>Add talent</h2></div>
          <div class="section-body">
            <form class="talent-form" data-talent-form>
              <div class="field">
                <label for="adminAddTalentManager">Talent manager</label>
                <select id="adminAddTalentManager" name="managerId">
                  ${managerUsers().map((manager) => `<option value="${manager.id}" ${manager.id === (allSelected ? "amelia" : selectedManagerId) ? "selected" : ""}>${manager.name}</option>`).join("")}
                </select>
              </div>
              <div class="field">
                <label for="newTalentNameAdmin">Talent name</label>
                <input id="newTalentNameAdmin" name="talentName" required placeholder="Talent name" />
              </div>
              <div class="field">
                <label for="newTalentEmailAdmin">Talent email</label>
                <input id="newTalentEmailAdmin" name="talentEmail" type="email" placeholder="talent@email.com" />
              </div>
              <button class="primary" type="submit">Add talent</button>
            </form>
            <div class="notice soft-note">Transferring talent moves them between manager rosters for future dropdowns. Existing submitted deal revenue remains with the original submitting manager for commission.</div>
          </div>
        </section>` : ""}
        <section class="section">
          <div class="section-head">
            <h2>${selectedTalent ? `${selectedTalent.talentName} deals` : "Talent deals"}</h2>
            ${selectedTalent ? `<span class="pill">${managerName(selectedTalent.managerId)}</span>` : ""}
          </div>
          <div class="section-body manager-list">
            ${selectedTalent ? dealCards(selectedTalentDeals, false) : `<div class="notice">Click a talent name in the roster to see all of their deals.</div>`}
          </div>
          ${selectedTalent ? `<div class="section-body">${talentMonthlyDealsTable(selectedTalentDeals)}</div>` : ""}
        </section>
      </div>
      <div class="section-stack">
        ${selectedTalent ? `${talentProfileSection(selectedTalent.managerId, selectedTalent.talentName)}<section class="section">${talentInvoiceDetailsForm(selectedTalent.managerId, selectedTalent.talentName)}</section>` : `<section class="section"><div class="section-body"><div class="notice">Click a talent name to edit their profile and invoicing details.</div></div></section>`}
      </div>
    </div>
  `;
}

function talentManagerView() {
  const managerId = state.user.id;
  const rows = talentOptions(managerId).map((talentName) => ({
    key: talentKey(managerId, talentName),
    managerId,
    talentName,
    email: talentEmail(managerId, talentName),
    total: visibleCrmDeals()
      .filter((deal) => deal.managerId === managerId && deal.talentName === talentName)
      .reduce((total, deal) => total + dealGbpAmount(deal), 0)
  }));
  if (state.selectedTalentKey && !rows.some((row) => row.key === state.selectedTalentKey)) {
    state.selectedTalentKey = null;
  }
  const selectedTalent = rows.find((row) => row.key === state.selectedTalentKey);
  const selectedTalentDeals = selectedTalent
    ? visibleCrmDeals().filter((deal) => deal.managerId === selectedTalent.managerId && deal.talentName === selectedTalent.talentName)
    : [];
  return `
    ${header("Talent", "Add and manage roster email, invoicing, and bank details")}
    <div class="layout">
      <div class="section-stack">
        <section class="section">
          <div class="section-head"><h2>Your talent</h2><span class="pill">${rows.length} talent</span></div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Talent</th>
                  <th>Email</th>
                  <th>CRM value</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                ${rows.length ? rows.map((row) => `
                  <tr class="${state.selectedTalentKey === row.key ? "selected-row" : ""}">
                    <td><button class="table-link" data-talent-detail="${row.key}">${row.talentName}</button></td>
                    <td><input class="mini-input" data-talent-email="${row.key}" type="email" value="${row.email}" placeholder="talent@email.com" aria-label="${row.talentName} email" /></td>
                    <td>${money(row.total)}</td>
                    <td><button class="secondary danger-button" data-remove-talent="${row.key}">Remove talent</button></td>
                  </tr>
                `).join("") : `<tr><td colspan="4">No talent added yet.</td></tr>`}
              </tbody>
            </table>
          </div>
        </section>
        <section class="section">
          <div class="section-head"><h2>Add talent</h2></div>
          <div class="section-body">
            <form class="form-grid" data-talent-form>
              <input type="hidden" name="managerId" value="${managerId}" />
              <div class="field">
                <label for="newTalentNameManager">Talent name</label>
                <input id="newTalentNameManager" name="talentName" required placeholder="Talent name" />
              </div>
              <div class="field">
                <label for="newTalentEmailManager">Talent email</label>
                <input id="newTalentEmailManager" name="talentEmail" type="email" required placeholder="talent@email.com" />
              </div>
              <button class="primary wide" type="submit">Add talent</button>
            </form>
          </div>
        </section>
        <section class="section">
          <div class="section-head">
            <h2>${selectedTalent ? `${selectedTalent.talentName} CRM deals` : "Talent deals"}</h2>
            ${selectedTalent ? `<span class="pill">${selectedTalentDeals.length} deals</span>` : ""}
          </div>
          <div class="table-wrap">
            ${selectedTalent ? crmDealsTable(selectedTalentDeals) : `<div class="notice">Click a talent name to see their CRM deals.</div>`}
          </div>
        </section>
      </div>
      <div class="section-stack">
        ${selectedTalent ? `${talentProfileSection(selectedTalent.managerId, selectedTalent.talentName)}<section class="section">${talentInvoiceDetailsForm(selectedTalent.managerId, selectedTalent.talentName)}</section>` : `<section class="section"><div class="section-body"><div class="notice">Click a talent name to edit their profile and invoicing details.</div></div></section>`}
      </div>
    </div>
  `;
}

function talentInvoiceDetailsForm(managerId, talentName) {
  const key = talentKey(managerId, talentName);
  const details = talentInvoiceDetails(managerId, talentName);
  return `
    <div class="section-body">
      <div class="section-head inline-head"><h2>Talent invoicing details</h2><span class="pill">Used for payment run invoices</span></div>
      <div class="form-grid compact-action-grid">
        <div class="field">
          <label>Invoice name</label>
          <input data-talent-invoice-detail="${key}" data-field="invoiceName" value="${details.invoiceName}" placeholder="${talentName}" />
        </div>
        <div class="field">
          <label>Invoice email</label>
          <input data-talent-invoice-detail="${key}" data-field="invoiceEmail" type="email" value="${details.invoiceEmail}" placeholder="talent@email.com" />
        </div>
        <div class="field wide">
          <label>Invoice address</label>
          <input data-talent-invoice-detail="${key}" data-field="invoiceAddress" value="${details.invoiceAddress}" placeholder="Talent billing address" />
        </div>
        <div class="field">
          <label>Bank name</label>
          <input data-talent-invoice-detail="${key}" data-field="bankName" value="${details.bankName}" placeholder="Bank name" />
        </div>
        <div class="field">
          <label>Name on account</label>
          <input data-talent-invoice-detail="${key}" data-field="accountName" value="${details.accountName}" placeholder="${talentName}" />
        </div>
        <div class="field">
          <label>Sort code</label>
          <input data-talent-invoice-detail="${key}" data-field="sortCode" value="${details.sortCode}" placeholder="00-00-00" />
        </div>
        <div class="field">
          <label>Account number</label>
          <input data-talent-invoice-detail="${key}" data-field="accountNumber" value="${details.accountNumber}" placeholder="12345678" />
        </div>
        <div class="field">
          <label>VAT number</label>
          <input data-talent-invoice-detail="${key}" data-field="vatNumber" value="${details.vatNumber}" placeholder="Optional" />
        </div>
        <div class="field wide">
          <button class="primary save-detail-button" type="button" data-save-talent-invoice="${key}">${state.savedTalentInvoiceKey === key ? "Saved" : "Save"}</button>
        </div>
      </div>
    </div>
  `;
}

function talentProfileSection(managerId, talentName) {
  const key = talentKey(managerId, talentName);
  const profile = talentProfile(managerId, talentName);
  const editable = canEditTalentProfile(managerId);
  const platforms = ["instagram", "tiktok", "youtube"];
  return `
    <section class="section">
      <div class="section-head">
        <h2>Talent profile</h2>
        <span class="pill">${editable ? "Editable" : "View only"}</span>
      </div>
      <div class="section-body">
        <div class="talent-profile-preview">
          <img src="${htmlSafe(profileImageUrl(managerId, talentName))}" alt="${htmlSafe(talentName)} preview" />
          <div>
            <strong>${htmlSafe(talentName)}</strong>
            <span>${htmlSafe(managerName(managerId))}</span>
            <small>${profile.updatedAt ? `Stats updated ${displayDate(profile.updatedAt.slice(0, 10))}` : "No stats pulled yet"}</small>
          </div>
        </div>
        <div class="form-grid compact-action-grid">
          <div class="field wide">
            <label>About talent</label>
            ${editable ? `<textarea data-talent-profile="${key}" data-field="bio" rows="5" placeholder="Short media pack bio">${htmlSafe(profile.bio)}</textarea>` : `<div class="read-field">${htmlSafe(profile.bio || "No bio added yet.")}</div>`}
          </div>
          <div class="field wide">
            <label>Preview image URL</label>
            ${editable ? `<input data-talent-profile="${key}" data-field="imageUrl" value="${htmlSafe(profile.imageUrl)}" placeholder="Paste profile image URL, or leave blank for generated preview" />` : `<div class="read-field">${profile.imageUrl ? htmlSafe(profile.imageUrl) : "Generated preview image"}</div>`}
          </div>
          ${platforms.map((platform) => `
            <div class="field social-field">
              <label>${socialPlatformLabel(platform)}</label>
              ${editable ? `
                <label class="toggle-line"><input type="checkbox" data-talent-profile="${key}" data-field="platform:${platform}" ${profile.platforms[platform] ? "checked" : ""} /> Pull ${socialPlatformLabel(platform)}</label>
                <input data-talent-profile="${key}" data-field="handle:${platform}" value="${htmlSafe(profile.handles[platform])}" placeholder="@handle" />
              ` : `
                <div class="read-field">${profile.handles[platform] || "-"}</div>
              `}
              ${profile.stats[platform]?.audience ? `<small>${compactNumber(profile.stats[platform].audience)} ${profile.stats[platform].label || "Followers"} · ${profile.stats[platform].engagement.toFixed(1)}% engagement</small>` : `<small>No stats pulled</small>`}
            </div>
          `).join("")}
          ${editable ? `
            <div class="field wide media-action-row">
              <button class="secondary" type="button" data-pull-social="${key}">Pull selected social stats</button>
              <button class="primary save-detail-button" type="button" data-save-talent-profile="${key}">${state.savedTalentProfileKey === key ? "Saved" : "Save profile"}</button>
            </div>
          ` : ""}
        </div>
      </div>
    </section>
  `;
}

function mediaPacksView() {
  return `
    ${header("Media Packs", "Build polished talent media packs from the roster database")}
    ${mediaPackBuilderView()}
  `;
}

function mediaPackBuilderView() {
  const rows = allRosterTalentRows();
  state.selectedMediaPackTalentKeys = (state.selectedMediaPackTalentKeys || []).filter((key) => rows.some((row) => row.key === key));
  return `
    <section class="section">
      <div class="section-head">
        <h2>Media pack builder</h2>
        <span class="pill">${state.selectedMediaPackTalentKeys.length} selected</span>
      </div>
      <div class="section-body">
        <div class="notice">Managers can build a media pack for any talent on the roster. Only the owning manager can edit that talent's profile details.</div>
      </div>
      <div class="section-body media-pack-grid">
        ${rows.map((row) => {
          const profile = talentProfile(row.managerId, row.talentName);
          return `
            <label class="media-pack-option">
              <input type="checkbox" data-media-pack-talent="${row.key}" ${state.selectedMediaPackTalentKeys.includes(row.key) ? "checked" : ""} />
              <img src="${htmlSafe(profileImageUrl(row.managerId, row.talentName))}" alt="" />
              <span>
                <strong>${htmlSafe(row.talentName)}</strong>
                <small>${htmlSafe(managerName(row.managerId))} · ${enabledSocialProfiles(row.managerId, row.talentName).length || 0} platforms · ${profile.bio ? "Bio ready" : "Bio needed"}</small>
              </span>
            </label>
          `;
        }).join("")}
      </div>
      <div class="section-body media-action-row">
        <button class="secondary" type="button" data-media-pack-select="all">Select all</button>
        <button class="secondary" type="button" data-media-pack-select="clear">Clear</button>
        <button class="primary" type="button" data-download-media-pack>Download media pack PDF</button>
      </div>
    </section>
  `;
}

function talentInvoicesView() {
  if (!["admin", "finance"].includes(state.user.role)) return plView(state.plMode);
  const allInvoices = buildTalentInvoices();
  saveState();
  const talentRows = reportTalentOptions(state.crmDeals);
  if (state.selectedTalentInvoiceTalentKey !== "all" && !talentRows.some((row) => row.key === state.selectedTalentInvoiceTalentKey)) {
    state.selectedTalentInvoiceTalentKey = "all";
  }
  const range = state.talentInvoiceMode === "custom"
    ? { startDate: state.talentInvoiceStartDate, endDate: state.talentInvoiceEndDate, label: `${displayDate(state.talentInvoiceStartDate)} - ${displayDate(state.talentInvoiceEndDate)}` }
    : monthDateRange(state.talentInvoiceMonthIndex);
  const invoices = allInvoices
    .filter((invoice) => state.selectedTalentInvoiceTalentKey === "all" || invoice.talentKey === state.selectedTalentInvoiceTalentKey)
    .filter((invoice) => isDateInRange(invoice.paymentRunDate, range.startDate, range.endDate));
  if (state.selectedTalentInvoiceId && !invoices.some((invoice) => invoice.id === state.selectedTalentInvoiceId)) {
    state.selectedTalentInvoiceId = null;
  }
  const selectedInvoice = invoices.find((invoice) => invoice.id === state.selectedTalentInvoiceId) || invoices[0] || null;
  if (!state.selectedTalentInvoiceId && selectedInvoice) state.selectedTalentInvoiceId = selectedInvoice.id;
  const total = invoices.reduce((sumTotal, invoice) => sumTotal + invoice.total, 0);
  return `
    ${header("Talent Invoices", `${range.label} payment run invoices`)}
    <div class="layout">
      <section class="section">
        <div class="section-head"><h2>Find invoices</h2><span class="pill admin">${invoices.length} invoices</span></div>
        <div class="section-body form-grid compact-action-grid">
          <div class="field">
            <label>Talent</label>
            <select data-talent-invoice-filter="talent">
              <option value="all" ${state.selectedTalentInvoiceTalentKey === "all" ? "selected" : ""}>All talent</option>
              ${talentRows.map((row) => `<option value="${row.key}" ${state.selectedTalentInvoiceTalentKey === row.key ? "selected" : ""}>${row.talentName} - ${managerName(row.managerId)}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label>Date view</label>
            <select data-talent-invoice-filter="mode">
              <option value="month" ${state.talentInvoiceMode === "month" ? "selected" : ""}>By month</option>
              <option value="custom" ${state.talentInvoiceMode === "custom" ? "selected" : ""}>Custom dates</option>
            </select>
          </div>
          ${state.talentInvoiceMode === "custom" ? `
            <div class="field">
              <label>Start date</label>
              <input type="date" data-talent-invoice-date="start" value="${state.talentInvoiceStartDate}" />
            </div>
            <div class="field">
              <label>End date</label>
              <input type="date" data-talent-invoice-date="end" value="${state.talentInvoiceEndDate}" />
            </div>
          ` : `
            <div class="field">
              <label>Month</label>
              <select data-talent-invoice-filter="month">
                ${months.map((month, index) => `<option value="${index}" ${Number(state.talentInvoiceMonthIndex) === index ? "selected" : ""}>${month}</option>`).join("")}
              </select>
            </div>
          `}
        </div>
        <div class="section-body invoice-summary-grid">
          <div class="earning"><span>Invoices</span><strong>${invoices.length}</strong></div>
          <div class="earning"><span>Total talent payable</span><strong>${money(total)}</strong></div>
        </div>
        <div class="table-wrap">${talentInvoiceSummaryTable(invoices)}</div>
      </section>
      <section class="section">
        <div class="section-head"><h2>${selectedInvoice ? `${selectedInvoice.talentName} invoice` : "Invoice"}</h2>${selectedInvoice ? `<span class="pill">${displayDate(selectedInvoice.paymentRunDate)}</span>` : ""}</div>
        ${selectedInvoice ? talentInvoiceDetail(selectedInvoice) : `<div class="section-body"><div class="notice">No talent invoices in this period yet. Invoices are created once deals are in On Next Payment Run or Paid and have a Xero paid/reconciled date.</div></div>`}
      </section>
    </div>
  `;
}

function talentInvoiceSummaryTable(invoices) {
  const groups = talentInvoicePaymentRunGroups(invoices);
  return `
    <table>
      <thead>
        <tr>
          <th>Talent</th>
          <th>Manager</th>
          <th>Payment run</th>
          <th>Status</th>
          <th>Deals</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        ${groups.length ? groups.map((group) => `
          <tr class="payment-run-row">
            <td colspan="6">
              <strong>${displayDate(group.paymentRunDate)} payment run</strong>
              <span>${group.invoices.length} invoices · ${money(group.total)} payable now · ${money(group.alreadyPaid)} already paid</span>
            </td>
          </tr>
          ${group.invoices.map((invoice) => `
            <tr class="${state.selectedTalentInvoiceId === invoice.id ? "selected-row" : ""}">
              <td><button class="table-link" data-talent-invoice="${invoice.id}">${invoice.talentName}</button></td>
              <td>${managerName(invoice.managerId)}</td>
              <td>${displayDate(invoice.paymentRunDate)}</td>
              <td><span class="pill ${talentInvoiceStatusClass(invoice)}">${talentInvoiceStatusLabel(invoice)}</span></td>
              <td>${invoice.lines.length}</td>
              <td>${money(invoice.total)}</td>
            </tr>
          `).join("")}
        `).join("") : `<tr><td colspan="6">No talent invoices in this period.</td></tr>`}
      </tbody>
    </table>
  `;
}

function talentInvoicePaymentRunGroups(invoices) {
  return [...invoices.reduce((groups, invoice) => {
    if (!groups.has(invoice.paymentRunDate)) groups.set(invoice.paymentRunDate, []);
    groups.get(invoice.paymentRunDate).push(invoice);
    return groups;
  }, new Map()).entries()].map(([paymentRunDate, groupInvoices]) => ({
    paymentRunDate,
    invoices: groupInvoices,
    total: groupInvoices.reduce((total, invoice) => total + invoice.total, 0),
    alreadyPaid: groupInvoices.reduce((total, invoice) => total + invoice.totalAlreadyPaid, 0)
  })).sort((a, b) => new Date(a.paymentRunDate) - new Date(b.paymentRunDate));
}

function talentInvoiceStatusLabel(invoice) {
  if (invoice.paidAt) return "Paid to talent";
  if (invoice.totalAlreadyPaid > 0) return "Partly paid to talent";
  return "Next payment run";
}

function talentInvoiceStatusClass(invoice) {
  if (invoice.paidAt) return "confirmed";
  if (invoice.totalAlreadyPaid > 0) return "admin";
  return "pipeline";
}

function talentInvoiceDetail(invoice) {
  const details = invoice.details;
  return `
    <div class="section-body invoice-detail">
      <div class="invoice-heading">
        <div>
          <span>Talent invoice</span>
          <strong>${invoice.id.replace("talent-invoice-", "").toUpperCase()}</strong>
        </div>
        <div>
          <span>Payment run</span>
          <strong>${displayDate(invoice.paymentRunDate)}</strong>
        </div>
        <div>
          <span>Status</span>
          <strong>${invoice.paidAt ? `Paid ${displayDate(invoice.paidAt)}` : talentInvoiceStatusLabel(invoice)}</strong>
        </div>
      </div>
      <div class="report-card-grid">
        <div><span>Invoice name</span><strong>${details.invoiceName || invoice.talentName}</strong></div>
        <div><span>Email</span><strong>${details.invoiceEmail || talentEmail(invoice.managerId, invoice.talentName) || "-"}</strong></div>
        <div><span>Address</span><strong>${details.invoiceAddress || "-"}</strong></div>
        <div><span>Bank</span><strong>${[details.bankName, details.accountName, details.sortCode, details.accountNumber].filter(Boolean).join(" · ") || "-"}</strong></div>
        <div><span>Xero bill</span><strong>${invoice.xeroBill?.billId || "-"}</strong></div>
        <div><span>Bill status</span><strong>${invoice.paidAt ? "Paid in Xero" : invoice.xeroBill?.status || "Draft Bill"}</strong></div>
      </div>
    </div>
    <div class="section-body">
      <div class="invoice-action-row">
        <div class="notice soft-note">Xero draft bill created for this payment run invoice.</div>
        ${canUseFinanceTools() ? `<button class="secondary" type="button" data-see-talent-xero-bill="${invoice.id}">See bill in Xero</button>` : ""}
      </div>
      ${invoice.paidAt ? `<div class="notice success-notice">This talent invoice has been paid. The linked CRM deals are now in Paid.</div>` : canUseFinanceTools() ? `<button class="primary" data-mark-talent-invoice-paid="${invoice.id}">Mark talent invoice paid</button>` : `<div class="notice">Only finance or admin can mark talent invoices as paid.</div>`}
    </div>
    <div class="section-body invoice-line-list">
      ${invoice.lines.map((line) => `
        <article class="invoice-line-card">
          <div class="invoice-line-title">
            <strong>${line.description}${line.paidEarly ? ` <em class="line-status-paid">Paid early</em>` : ""}</strong>
            <span>${line.paidEarly ? "Already paid" : money(line.total)}</span>
          </div>
          <div class="invoice-line-grid">
            <div><span>Gross deal</span><strong>${money(dealGbpAmount(line.deal))}</strong></div>
            <div><span>Talent 80%</span><strong>${money(line.dealShare)}</strong></div>
            <div><span>Expenses 100%</span><strong>${money(line.expenses)}</strong></div>
            ${line.paidEarly ? `<div><span>Already paid</span><strong>${money(line.paidEarlyAmount)}</strong></div>` : ""}
          </div>
          ${!invoice.paidAt && !line.paidEarly && canUseFinanceTools() ? `
            <div class="invoice-line-actions">
              <button class="secondary" type="button" data-mark-invoice-line-paid-early="${invoice.id}::${line.deal.id}">Mark this deal paid early</button>
            </div>
          ` : line.paidEarly ? `<div class="invoice-line-note">Paid early${line.paidEarlyAt ? ` on ${displayDate(line.paidEarlyAt)}` : ""}. Finance should not pay this line again.</div>` : ""}
        </article>
      `).join("")}
      <div class="invoice-total-card">
        <div><span>Gross deal</span><strong>${money(invoice.lines.reduce((total, line) => total + dealGbpAmount(line.deal), 0))}</strong></div>
        <div><span>Talent 80%</span><strong>${money(invoice.totalDealShare)}</strong></div>
        <div><span>Expenses</span><strong>${money(invoice.totalExpenses)}</strong></div>
        ${invoice.totalAlreadyPaid ? `<div><span>Already paid</span><strong>${money(invoice.totalAlreadyPaid)}</strong></div>` : ""}
        <div class="invoice-grand-total"><span>Total payable now</span><strong>${money(invoice.total)}</strong></div>
      </div>
    </div>
  `;
}

function managersAdminView() {
  const canAdminister = canManageTeamPermissions();
  const activeStaff = allStaffRecords().filter((member) => !state.removedManagerIds.includes(member.id));
  const removedStaff = allStaffRecords().filter((member) => state.removedManagerIds.includes(member.id));
  return `
    ${header("Team", canAdminister ? "Add staff, invite Google logins, and manage access" : "Team members and portal access")}
    <div class="layout">
      <section class="section">
        <div class="section-head"><h2>Team overview</h2>${canAdminister ? `<span class="pill admin">Admin + Operations</span>` : ""}</div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Team member</th>
                <th>Role</th>
                <th>Email login</th>
                <th>Invite</th>
                <th>Salary</th>
                <th>Commission %</th>
                <th>Confirmed revenue</th>
                <th>Commission</th>
                <th>Deals</th>
                <th>Access</th>
              </tr>
            </thead>
            <tbody>
              ${activeStaff.map((member) => {
                const isManager = member.role === "manager";
                const canInvite = canAdminister && state.extraManagers.some((item) => item.id === member.id);
                return `
                <tr>
                  <td>${member.name}</td>
                  <td>${roleLabel(member)}</td>
                  <td>${member.email || "-"}</td>
                  <td>
                    ${canInvite ? `<button class="secondary" data-invite-manager="${member.id}">${member.inviteStatus === "Invited" ? "Resend invite" : "Send invite"}</button>` : ""}
                    <small>${member.inviteStatus || (member.role === "manager" || member.role === "finance" ? "Active prototype login" : "Active")}</small>
                  </td>
                  <td>${isManager ? money(managerSalary(member.id)) : "-"}</td>
                  <td>${isManager ? `${managerCommissionRate(member.id)}%` : "-"}</td>
                  <td>${isManager ? money(sum(monthlyManagerRevenue(member.id))) : "-"}</td>
                  <td>${isManager ? money(sum(monthlyManagerCommission(member.id))) : "-"}</td>
                  <td>${isManager ? state.deals.filter((deal) => deal.managerId === member.id).length : "-"}</td>
                  <td>${canAdminister ? `<button class="secondary danger-button" data-remove-manager="${member.id}">Remove access</button>` : "View only"}</td>
                </tr>
              `;}).join("")}
              ${removedStaff.length ? removedStaff.map((member) => `
                <tr class="selected-row">
                  <td>${member.name}</td>
                  <td>${roleLabel(member)}</td>
                  <td colspan="7">Removed from portal login. Historical records are kept.</td>
                  <td>${canAdminister ? `<button class="secondary" data-restore-manager="${member.id}">Restore access</button>` : "Removed"}</td>
                </tr>
              `).join("") : ""}
            </tbody>
          </table>
        </div>
      </section>
      ${canAdminister ? `
      <section class="section">
        <div class="section-head"><h2>Add staff member</h2></div>
        <div class="section-body">
          <form class="form-grid" data-manager-form>
            <div class="field">
              <label for="newManagerName">Name</label>
              <input id="newManagerName" name="managerName" required placeholder="Team member name" />
            </div>
            <div class="field">
              <label for="newStaffRole">Role</label>
              <select id="newStaffRole" name="role">
                <option value="manager">Talent manager</option>
                <option value="finance">Finance</option>
                <option value="operations">Operations</option>
                <option value="production">Production</option>
              </select>
            </div>
            <div class="field">
              <label for="newManagerEmail">Google account email</label>
              <input id="newManagerEmail" name="email" required type="email" placeholder="name@company.com" />
            </div>
            <div class="field">
              <label for="newManagerSalary">Monthly salary</label>
              <input id="newManagerSalary" name="salary" inputmode="decimal" value="£5,000.00" />
            </div>
            <div class="field">
              <label for="newManagerRate">Commission %</label>
              <input id="newManagerRate" name="commissionRate" type="number" min="0" step="0.1" value="1" />
            </div>
            <button class="primary wide" type="submit">Add staff member and create login</button>
          </form>
          <div class="notice soft-note">Salary and commission are used for talent managers. Finance and Operations get portal access without owning a roster.</div>
        </div>
      </section>
      ` : ""}
    </div>
  `;
}

function permissionsView() {
  return `
    ${header("Permissions", "Team access and approval routing controls")}
    ${teamAccessAdminView()}
    ${requestDelegationAdminView()}
    ${approvalRoutesAdminView()}
  `;
}

function teamAccessAdminView() {
  const managers = managerUsers();
  const teamMembers = [...managerUsers(), ...operationsUsers()];
  const canAdminister = canManageTeamPermissions();
  return `
    <section class="section soft-section">
      <div class="section-head"><h2>Team CRM and report access</h2>${canAdminister ? `<span class="pill admin">Admin + Operations</span>` : ""}</div>
      <div class="section-body">
        <div class="notice">Use this for talent assistants or line managers who need to see another manager's CRM and Reports without becoming admin.</div>
        ${canAdminister ? `
        <form class="form-grid" data-line-report-form>
          <div class="field">
            <label for="lineManagerId">Team member</label>
            <select id="lineManagerId" name="lineManagerId">
              ${teamMembers.map((member) => `<option value="${member.id}">${member.name} - ${roleLabel(member)}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="reportManagerId">Can access manager</label>
            <select id="reportManagerId" name="reportManagerId">
              ${managers.map((manager) => `<option value="${manager.id}">${manager.name}</option>`).join("")}
            </select>
          </div>
          <button class="primary wide" type="submit">Grant CRM and Reports access</button>
        </form>
        ` : ""}
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Team member</th>
              <th>CRM and Reports access</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            ${lineReportRows().length ? lineReportRows().map((row) => `
                <tr>
                  <td>${managerName(row.lineManagerId)}</td>
                  <td>${managerName(row.reportManagerId)}</td>
                  <td>${canAdminister ? `<button class="secondary danger-button" data-remove-line-report="${row.lineManagerId}::${row.reportManagerId}">Remove</button>` : "View only"}</td>
                </tr>
            `).join("") : `<tr><td colspan="3">No line report access added yet.</td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function lineReportRows() {
  return Object.entries(state.lineReports).flatMap(([lineManagerId, reportIds]) => {
    return reportIds.map((reportManagerId) => ({ lineManagerId, reportManagerId }));
  });
}

function explicitRequestDelegationRows() {
  return Object.entries(state.requestDelegationPermissions).flatMap(([targetManagerId, delegatorIds]) => {
    return delegatorIds
      .filter((delegatorManagerId) => !(state.lineReports[delegatorManagerId] || []).includes(targetManagerId))
      .map((delegatorManagerId) => ({ delegatorManagerId, targetManagerId }));
  });
}

function requestDelegationAdminView() {
  const managers = managerUsers();
  const canAdminister = canManageTeamPermissions();
  const automaticRows = lineReportRows();
  const explicitRows = explicitRequestDelegationRows();
  return `
    <section class="section soft-section">
      <div class="section-head"><h2>Request delegation access</h2>${canAdminister ? `<span class="pill admin">Admin + Operations</span>` : ""}</div>
      <div class="section-body">
        <div class="notice">Line managers can automatically delegate PR and event requests to the managers they manage. Use this section only for extra delegation access across the team.</div>
        ${canAdminister ? `
          <form class="form-grid" data-request-delegation-form>
            <div class="field">
              <label for="requestDelegatorId">Team member can delegate</label>
              <select id="requestDelegatorId" name="delegatorManagerId">
                ${managers.map((manager) => `<option value="${manager.id}">${manager.name}</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <label for="requestTargetId">To manager</label>
              <select id="requestTargetId" name="targetManagerId">
                ${managers.map((manager) => `<option value="${manager.id}">${manager.name}</option>`).join("")}
              </select>
            </div>
            <button class="primary wide" type="submit">Grant request delegation access</button>
          </form>
        ` : ""}
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Can delegate</th>
              <th>To manager</th>
              <th>Access type</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            ${automaticRows.map((row) => `
              <tr>
                <td>${managerName(row.lineManagerId)}</td>
                <td>${managerName(row.reportManagerId)}</td>
                <td>Automatic line manager access</td>
                <td>Managed in Team CRM and report access</td>
              </tr>
            `).join("")}
            ${explicitRows.map((row) => `
              <tr>
                <td>${managerName(row.delegatorManagerId)}</td>
                <td>${managerName(row.targetManagerId)}</td>
                <td>Admin granted</td>
                <td>${canAdminister ? `<button class="secondary danger-button" data-remove-request-delegation="${row.delegatorManagerId}::${row.targetManagerId}">Remove</button>` : "View only"}</td>
              </tr>
            `).join("")}
            ${automaticRows.length || explicitRows.length ? "" : `<tr><td colspan="4">No request delegation access set up yet.</td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function approvalRoutesAdminView() {
  const managers = managerUsers();
  const approvers = [...managerUsers(), ...operationsUsers()];
  const canAdminister = canManageTeamPermissions();
  return `
    <section class="section soft-section">
      <div class="section-head"><h2>Deal approval routing</h2>${canAdminister ? `<span class="pill admin">Admin + Operations</span>` : ""}</div>
      <div class="section-body">
        <div class="notice">If no approval route is set, a deal goes to the manager's line manager. If they do not have a line manager, it goes to Admin.</div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Submitting manager</th>
              <th>Approver</th>
              <th>Default route</th>
            </tr>
          </thead>
          <tbody>
            ${managers.map((manager) => `
              <tr>
                <td>${manager.name}</td>
                <td>
                  <select class="compact-select" data-approval-route="${manager.id}" ${canAdminister ? "" : "disabled"}>
                    <option value="">Use default</option>
                    <option value="admin" ${state.approvalRoutes[manager.id] === "admin" ? "selected" : ""}>Admin</option>
                    ${approvers.filter((approver) => approver.id !== manager.id).map((approver) => `<option value="${approver.id}" ${state.approvalRoutes[manager.id] === approver.id ? "selected" : ""}>${approver.name} - ${roleLabel(approver)}</option>`).join("")}
                  </select>
                </td>
                <td>${managerName(lineManagerFor(manager.id) || "admin")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function approvalsView() {
  const pendingDeals = state.user.role === "admin"
    ? state.pendingDeals
    : state.pendingDeals.filter((deal) => deal.approverId === state.user.id);
  const pendingExpenses = state.user.role === "admin"
    ? state.pendingExpenses
    : state.pendingExpenses.filter((expense) => expense.approverId === state.user.id);
  const submittedDeals = state.user.role === "admin"
    ? []
    : state.pendingDeals.filter((deal) => deal.submittedBy === state.user.id);
  const submittedExpenses = state.user.role === "admin"
    ? []
    : state.pendingExpenses.filter((expense) => expense.submittedBy === state.user.id);
  const rejectionMessages = rejectionMessagesForCurrentUser();
  const unreadRejectionCount = unreadRejectionMessagesForCurrentUser().length;
  return `
    ${header("Approvals", state.user.role === "admin" ? "Review pending deals and expenses" : "Review items waiting for your approval")}
    <section class="section">
      <div class="section-head">
        <h2>Pending deals</h2>
        <span class="pill pipeline">${pendingDeals.length} pending</span>
      </div>
      <div class="section-body manager-list">
        ${pendingDeals.length ? pendingDeals.map((deal) => pendingDealCard(deal)) : `<div class="notice">No deals waiting for approval.</div>`}
      </div>
    </section>
    <section class="section">
      <div class="section-head">
        <h2>Pending expenses</h2>
        <span class="pill pipeline">${pendingExpenses.length} pending</span>
      </div>
      <div class="section-body manager-list">
        ${pendingExpenses.length ? pendingExpenses.map((expense) => pendingExpenseCard(expense)) : `<div class="notice">No expenses waiting for approval.</div>`}
      </div>
    </section>
    ${state.user.role !== "admin" ? `
      <section class="section soft-section">
        <div class="section-head">
          <h2>Submitted by me</h2>
          <span class="pill pipeline">${submittedDeals.length + submittedExpenses.length} waiting</span>
        </div>
        <div class="section-body manager-list">
          ${submittedDeals.length ? submittedDeals.map((deal) => pendingDealCard(deal, false)) : `<div class="notice">No submitted deals are waiting for approval.</div>`}
          ${submittedExpenses.length ? submittedExpenses.map((expense) => pendingExpenseCard(expense, false)) : ""}
        </div>
      </section>
      <section class="section soft-section">
        <div class="section-head">
          <h2>Rejection messages</h2>
          <span class="pill pipeline">${unreadRejectionCount} new</span>
        </div>
        <div class="section-body manager-list">
          ${rejectionMessages.length ? rejectionMessages.map((message) => `
            <article class="deal rejection-message ${message.readAt ? "" : "unread"}">
              <div class="deal-line">
                <strong>${message.subject}</strong>
                <span>${message.readAt ? "Seen" : "New"}</span>
              </div>
              <div class="deal-line muted"><span>Message</span><span>${message.body}</span></div>
              <div class="deal-actions">
                ${message.crmDealId ? `<button class="primary" data-see-rejected-deal="${message.id}">See deal</button>` : ""}
                <button class="secondary" data-dismiss-rejection="${message.id}">Dismiss</button>
              </div>
            </article>
          `).join("") : `<div class="notice">No rejection messages yet.</div>`}
        </div>
      </section>
    ` : ""}
  `;
}

function productionView(forcedTab = null) {
  markProductionResponsesSeen();
  markProductionCancellationsSeen();
  const canRequest = ["admin", "manager"].includes(state.user.role);
  const canManageRates = ["admin", "operations", "production"].includes(state.user.role);
  const activeTab = forcedTab || state.activeProductionTab;
  if (!forcedTab && state.activeProductionTab === "rates" && !canManageRates) state.activeProductionTab = "requests";
  const requestManagers = state.user.role === "manager" ? [state.user] : managerUsers();
  const activeManagerId = requestManagers.some((manager) => manager.id === state.selectedProductionManagerId)
    ? state.selectedProductionManagerId
    : requestManagers[0]?.id;
  const visibleRequests = visibleProductionRequests();
  const calendarRequests = visibleRequests.filter((request) => request.status === "Accepted");
  const pendingRequests = visibleRequests.filter((request) => request.status === "Pending");
  return `
    ${header("Production", state.user.role === "production" ? "Review and action production requests" : "Request production support and track chargebacks")}
    ${forcedTab ? "" : `
    <section class="section soft-section">
      <div class="section-head">
        <h2>Production workspace</h2>
        <div class="segmented">
          <button class="${activeTab === "requests" ? "active" : ""}" data-production-tab="requests">Production Requests</button>
          ${canManageRates ? `<button class="${activeTab === "rates" ? "active" : ""}" data-production-tab="rates">Rates</button>` : ""}
        </div>
      </div>
    </section>
    `}
    ${activeTab === "rates" && canManageRates ? `
      <div class="layout">
        ${productionRatesPanel()}
      </div>
    ` : `
    <div class="layout">
      ${canRequest ? `
      <section class="section">
        <div class="section-head"><h2>Request production</h2><span class="pill confirmed">${state.user.role === "admin" ? "Admin entry" : "Your roster"}</span></div>
        <div class="section-body">
          <form class="form-grid" data-production-form>
            <div class="field">
              <label for="productionManagerId">Talent manager</label>
              <select id="productionManagerId" name="managerId" data-production-manager ${state.user.role === "manager" ? "disabled" : ""}>
                ${requestManagers.map((manager) => `<option value="${manager.id}" ${manager.id === activeManagerId ? "selected" : ""}>${manager.name}</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <label for="productionTalent">Talent</label>
              <input id="productionTalent" name="talentName" list="production-talent-options" required placeholder="Add or choose talent" />
              <datalist id="production-talent-options">${talentOptions(activeManagerId).map((talentName) => `<option value="${talentName}"></option>`).join("")}</datalist>
            </div>
            <div class="field">
              <label for="productionDate">Date of production</label>
              <input id="productionDate" name="shootDate" type="date" required />
            </div>
            <div class="field wide">
              <label for="productionVideoBrief">What is the video?</label>
              <textarea id="productionVideoBrief" name="videoBrief" required placeholder="Briefly describe the video, deliverable, or shoot"></textarea>
            </div>
            <div class="field wide">
              <label>What is needed</label>
              <div class="check-list">
                ${productionItems.map((item) => `
                  <div class="production-item-row">
                    <label class="toggle-line"><input type="checkbox" name="items" value="${item}" data-production-item /> ${item} (${money(state.productionRates[item])} per day)</label>
                    <label class="days-control"><span>Days</span><input type="number" min="1" step="1" name="days-${item}" value="1" data-production-days="${item}" /></label>
                  </div>
                `).join("")}
              </div>
            </div>
            <div class="field wide">
              <label>Total amount</label>
              <div class="read-field production-total" data-production-total>${money(0)}</div>
            </div>
            <button class="primary wide" type="submit">Request production</button>
          </form>
        </div>
      </section>
      ` : ""}
      <section class="section">
        <div class="section-head">
          <h2>Shoot calendar</h2>
          <span class="pill confirmed">${calendarRequests.filter((request) => request.shootDate).length} shoot days</span>
        </div>
        ${productionCalendar(calendarRequests)}
      </section>
      <section class="section">
        <div class="section-head">
          <h2>${state.user.role === "production" ? "Talent requests" : "Production requests"}</h2>
          <span class="pill pipeline">${pendingRequests.length} pending</span>
        </div>
        <div class="section-body manager-list">
          ${visibleRequests.length ? visibleRequests.map((request) => productionRequestCard(request)).join("") : `<div class="notice">No production requests yet.</div>`}
        </div>
      </section>
    </div>
    `}
  `;
}

function productionRatesOnlyView() {
  return `
    ${header("Rates", "Production day rates")}
    <div class="layout">
      ${productionRatesPanel()}
    </div>
  `;
}

function markProductionResponsesSeen() {
  if (state.user?.role !== "manager") return;
  let changed = false;
  state.productionRequests.forEach((request) => {
    if (request.managerId === state.user.id && request.reviewedAt && !request.managerSeenAt) {
      request.managerSeenAt = new Date().toISOString();
      changed = true;
    }
  });
  if (changed) saveState();
}

function markProductionCancellationsSeen() {
  if (state.user?.role !== "production") return;
  let changed = false;
  state.productionRequests.forEach((request) => {
    if (request.status === "Cancelled" && !request.productionSeenAt) {
      request.productionSeenAt = new Date().toISOString();
      changed = true;
    }
  });
  if (changed) saveState();
}

function productionRatesPanel() {
  return `
    <section class="section soft-section">
      <div class="section-head"><h2>Production rates</h2><span class="pill admin">Admin + Operations + Production</span></div>
      <div class="section-body">
        <div class="form-grid">
          ${productionItems.map((item) => `
            <div class="field">
              <label>${item}</label>
              <input data-production-rate="${item}" value="${currencyInput(state.productionRates[item])}" inputmode="decimal" />
            </div>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function visibleProductionRequests() {
  if (["admin", "operations", "production", "finance"].includes(state.user.role)) {
    return [...state.productionRequests].sort(productionRequestSort);
  }
  const ids = accessibleManagerIds();
  return state.productionRequests.filter((request) => ids.includes(request.managerId)).sort(productionRequestSort);
}

function productionRequestSort(a, b) {
  const statusOrder = { Pending: 0, Cancelled: 1, Accepted: 2, Rejected: 3 };
  return (statusOrder[a.status] ?? 9) - (statusOrder[b.status] ?? 9) || new Date(b.submittedAt) - new Date(a.submittedAt);
}

function productionRequestCard(request) {
  const canReview = state.user.role === "production" && request.status === "Pending";
  const canRemove = state.user.role === "production";
  const canCancel = state.user.role === "manager" && canAccessManager(request.managerId) && request.status !== "Cancelled" && request.financeStatus !== "Chargeback requested";
  const statusClass = request.status === "Accepted" ? "confirmed" : request.status === "Pending" ? "pipeline" : "rejected";
  return `
    <article class="deal">
      <div class="deal-line">
        <strong>${request.talentName}</strong>
        <span class="pill ${statusClass}">${request.status}</span>
      </div>
      <div class="deal-line muted"><span>Manager</span><span>${managerName(request.managerId)}</span></div>
      <div class="deal-line muted"><span>Date of shoot</span><span>${displayDate(request.shootDate)}</span></div>
      <div class="deal-line muted"><span>Chargeback payment run</span><span>${displayDate(request.chargebackPaymentRunDate || productionPaymentRunDate(request.shootDate))}</span></div>
      <div class="deal-line muted"><span>Video</span><span>${request.videoBrief || "-"}</span></div>
      <div class="deal-line muted"><span>Items</span><span>${productionItemsLabel(request)}</span></div>
      <div class="deal-line muted"><span>Amount</span><span>${money(request.amount)}</span></div>
      ${request.message ? `<div class="deal-line muted"><span>Message</span><span>${request.message}</span></div>` : ""}
      ${request.financeStatus ? `<div class="deal-line muted"><span>Finance</span><span>${request.financeStatus}</span></div>` : ""}
      ${canReview || canRemove || canCancel ? `<div class="deal-actions">
        ${canReview ? `<button class="primary" data-production-accept="${request.id}">Accept</button>
        <button class="secondary danger-button" data-production-reject="${request.id}">Reject</button>` : ""}
        ${canCancel ? `<button class="secondary danger-button" data-production-cancel="${request.id}">Remove request</button>` : ""}
        ${canRemove ? `<button class="secondary danger-button" data-production-remove="${request.id}">Remove</button>` : ""}
      </div>` : ""}
    </article>
  `;
}

function financeActionsView() {
  const actionDeals = financeActionDeals();
  const talentExpenseActions = financeTalentExpenseActions();
  const totalValue = actionDeals.reduce((total, deal) => total + dealGbpAmount(deal), 0);
  const talentExpenseTotal = talentExpenseActions.reduce((total, expense) => total + Number(expense.amount || 0), 0);
  return `
    ${header("Finance Actions", "Xero draft and invoice alerts")}
    <section class="section">
      <div class="section-head">
        <h2>Talent expenses to add to invoices</h2>
        <div class="section-actions">
          <span class="pill pipeline">${talentExpenseActions.length} actions</span>
          <span class="pill confirmed">${money(talentExpenseTotal)}</span>
        </div>
      </div>
      <div class="section-body manager-list">
        ${talentExpenseActions.length ? talentExpenseActions.map((expense) => financeTalentExpenseActionCard(expense)).join("") : `<div class="notice">No talent expense invoice updates waiting right now.</div>`}
      </div>
    </section>
    <section class="section">
      <div class="section-head">
        <h2>Xero invoice alerts</h2>
        <div class="section-actions">
          <span class="pill pipeline">${actionDeals.length} actions</span>
          <span class="pill confirmed">${money(totalValue)}</span>
        </div>
      </div>
      <div class="section-body manager-list">
        ${actionDeals.length ? actionDeals.map((deal) => financeActionCard(deal)).join("") : `<div class="notice">No Xero draft or invoice alerts waiting right now.</div>`}
      </div>
    </section>
  `;
}

function financeTalentExpenseActions() {
  return state.talentExpenses
    .filter((expense) => expense.financeStatus !== "Added to invoice")
    .sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
}

function financeTalentExpenseActionCard(expense) {
  const deal = state.crmDeals.find((item) => item.id === expense.crmDealId);
  return `
    <article class="deal finance-action">
      <div class="deal-line">
        <strong>${expense.talentName}${deal?.company ? ` x ${deal.company}` : ""}</strong>
        <span>${money(expense.amount)}</span>
      </div>
      <div class="notice">Manager has added a talent expense. Finance needs to add this amount onto the job invoice.</div>
      <div class="deal-line muted"><span>Campaign</span><span>${deal?.campaignName || "No campaign name"}</span></div>
      <div class="deal-line muted"><span>Manager</span><span>${managerName(expense.managerId)}</span></div>
      <div class="deal-line muted"><span>Added by</span><span>${managerName(expense.submittedBy)}</span></div>
      <div class="deal-line muted"><span>Note</span><span>${expense.note || "-"}</span></div>
      <div class="deal-line muted"><span>Receipt</span><span>${expense.receiptData ? `<a href="${expense.receiptData}" target="_blank" rel="noopener">${expense.receiptName || "Open receipt"}</a>` : "No receipt attached"}</span></div>
      <div class="deal-line muted"><span>Current invoice total</span><span>${deal ? money(dealInvoiceTotal(deal)) : money(expense.amount)}</span></div>
      <div class="deal-actions">
        ${deal ? `<button class="secondary" data-finance-create-xero="${deal.id}">${deal.xeroInvoiceId ? "Update draft invoice in Xero" : "Create draft invoice in Xero"}</button>` : ""}
        <button class="primary" data-talent-expense-actioned="${expense.id}">Mark added to invoice</button>
      </div>
    </article>
  `;
}

function financeActionDeals() {
  return state.crmDeals
    .filter((deal) => !deal.financeAlertDismissedAt)
    .filter((deal) => (deal.stage === "To Be Invoiced" && deal.xeroInvoiceId) || deal.financeStatus === "Invoiced in Xero")
    .sort((a, b) => new Date(a.financeSubmittedAt || a.updatedAt) - new Date(b.financeSubmittedAt || b.updatedAt));
}

function financeActionCard(deal) {
  const isInvoiced = deal.financeStatus === "Invoiced in Xero" || deal.stage === "Invoiced";
  return `
    <article class="deal finance-action" data-finance-card="${deal.id}">
      <div class="deal-line">
        <strong>${deal.talentName} x ${deal.company}</strong>
        <span class="pill ${isInvoiced ? "confirmed" : "pipeline"}">${isInvoiced ? "Invoiced" : "Draft in Xero"}</span>
      </div>
      <div class="deal-line muted"><span>Manager</span><span>${managerName(deal.managerId)}</span></div>
      <div class="deal-line muted"><span>Campaign</span><span>${deal.campaignName || "-"}</span></div>
      <div class="deal-line muted"><span>Talent expenses on invoice</span><span>${money(dealTalentExpenseTotal(deal.id))}</span></div>
      <div class="deal-line muted"><span>Invoice total</span><span>${money(dealInvoiceTotal(deal))}</span></div>
      <div class="deal-line muted"><span>Payment terms</span><span>${crmPaymentLabel(deal)} · due ${displayDate(crmDueDate(deal))}</span></div>
      <div class="deal-line muted"><span>Xero invoice</span><span>${deal.xeroInvoiceId || "-"}</span></div>
      <div class="deal-line muted"><span>Xero status</span><span>${deal.xeroStatus || deal.xeroInvoiceStatus || "-"}</span></div>
      <div class="notice ${isInvoiced ? "success-notice" : ""}">${isInvoiced ? "Xero has confirmed this invoice. The CRM deal has moved to Invoiced." : "A draft invoice has been created in Xero. Finance can view it there; no portal approval is needed."}</div>
      <div class="deal-actions">
        <button class="primary" data-finance-see-xero="${deal.id}">See invoice in Xero</button>
        ${isInvoiced ? `<button class="secondary" data-dismiss-finance-alert="${deal.id}">Dismiss</button>` : ""}
      </div>
    </article>
  `;
}

function financeProductionChargebacks() {
  return state.productionRequests
    .filter((request) => request.status === "Accepted" && request.financeStatus !== "Chargeback requested")
    .sort((a, b) => new Date(a.shootDate) - new Date(b.shootDate));
}

function historicalProductionChargebacks() {
  return state.productionRequests
    .filter((request) => request.status === "Accepted" && request.financeStatus === "Chargeback requested")
    .sort((a, b) => new Date(b.chargebackRequestedAt || b.reviewedAt || b.shootDate) - new Date(a.chargebackRequestedAt || a.reviewedAt || a.shootDate));
}

function productionChargebacksFinanceView() {
  const pending = financeProductionChargebacks();
  const historical = historicalProductionChargebacks();
  const visibleRequests = visibleProductionRequests().filter((request) => request.status === "Accepted");
  const pendingTotal = pending.reduce((total, request) => total + Number(request.amount || 0), 0);
  const historicalTotal = historical.reduce((total, request) => total + Number(request.amount || 0), 0);
  return `
    ${header("Production chargebacks", "Pending and historical production chargebacks")}
    <section class="section">
      <div class="section-head">
        <h2>Shoot calendar</h2>
        <span class="pill confirmed">${visibleRequests.length} accepted shoots</span>
      </div>
      ${productionCalendar(visibleRequests)}
    </section>
    <section class="section">
      <div class="section-head">
        <h2>Chargeback calendar</h2>
        <span class="pill confirmed">${visibleRequests.length} chargeback dates</span>
      </div>
      ${productionChargebackCalendar(visibleRequests)}
    </section>
    <section class="section">
      <div class="section-head">
        <h2>Pending requests</h2>
        <div class="section-actions">
          <span class="pill pipeline">${pending.length} pending</span>
          <span class="pill confirmed">${money(pendingTotal)}</span>
        </div>
      </div>
      <div class="section-body manager-list">
        ${pending.length ? pending.map((request) => financeProductionChargebackCard(request)).join("") : `<div class="notice">No production chargebacks waiting right now.</div>`}
      </div>
    </section>
    <section class="section">
      <div class="section-head">
        <h2>Historical chargebacks</h2>
        <div class="section-actions">
          <span class="pill confirmed">${historical.length} requested</span>
          <span class="pill confirmed">${money(historicalTotal)}</span>
        </div>
      </div>
      <div class="section-body manager-list">
        ${historical.length ? historical.map((request) => financeProductionChargebackCard(request, false)).join("") : `<div class="notice">No historical production chargebacks yet.</div>`}
      </div>
    </section>
  `;
}

function financeProductionChargebackCard(request, showAction = true) {
  return `
    <article class="deal">
      <div class="deal-line">
        <strong>${request.talentName}</strong>
        <span>${money(request.amount)}</span>
      </div>
      <div class="deal-line muted"><span>Manager</span><span>${managerName(request.managerId)}</span></div>
      <div class="deal-line muted"><span>Date of shoot</span><span>${displayDate(request.shootDate)}</span></div>
      <div class="deal-line muted"><span>Video</span><span>${request.videoBrief || "-"}</span></div>
      <div class="deal-line muted"><span>Items</span><span>${productionItemsLabel(request)}</span></div>
      ${request.chargebackRequestedAt ? `<div class="deal-line muted"><span>Requested</span><span>${displayDate(request.chargebackRequestedAt.slice(0, 10))}</span></div>` : ""}
      ${showAction ? `<div class="deal-actions">
        <button class="primary" data-production-chargeback="${request.id}">Request charge back</button>
      </div>` : ""}
    </article>
  `;
}

function expensesView() {
  const visibleManagers = hasAllRosterAccess() ? managerUsers() : visibleManagerUsers();
  const visibleManagerIds = visibleManagers.map((manager) => manager.id);
  const allVisibleExpenses = hasAllRosterAccess()
    ? state.expenses
    : state.expenses.filter((expense) => visibleManagerIds.includes(expense.managerId));
  const visibleExpenses = allVisibleExpenses.filter((expense) => {
    if (state.expenseCategoryFilter !== "all" && expense.category !== state.expenseCategoryFilter) return false;
    if (state.expenseManagerFilter !== "all" && expense.managerId !== state.expenseManagerFilter) return false;
    if (state.expenseMonthFilter !== "all" && expense.monthIndex !== Number(state.expenseMonthFilter)) return false;
    return true;
  });
  return `
    ${header("Expenses", hasAllRosterAccess() ? "All submitted receipts and reimbursable costs" : "Submit and review your expenses")}
    <div class="expenses-layout">
      <section class="section">
        <div class="section-head"><h2>${hasAllRosterAccess() ? "Add admin or manager expense" : "Add expense"}</h2></div>
        <div class="section-body">
          <form class="form-grid" data-expense-form>
            <div class="field">
              <label for="expenseManager">Talent manager</label>
              <select id="expenseManager" name="managerId" ${!hasAllRosterAccess() && visibleManagers.length === 1 ? "disabled" : ""}>
                ${hasAllRosterAccess() ? `<option value="admin">Admin</option>` : ""}
                ${visibleManagers.map((manager) => `<option value="${manager.id}">${manager.name}</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <label for="expenseCategory">Category</label>
              <select id="expenseCategory" name="category">
                <option>Client entertaining</option>
                <option>Marketing</option>
              </select>
            </div>
            <div class="field">
              <label for="expenseMonth">Month</label>
              <select id="expenseMonth" name="monthIndex">
                ${months.map((month, index) => `<option value="${index}">${month}</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <label for="expenseAmount">Amount</label>
              <input id="expenseAmount" name="amount" required inputmode="decimal" placeholder="£0.00" />
            </div>
            <div class="field">
              <label for="expenseReceipt">Receipt</label>
              <input id="expenseReceipt" name="receipt" type="file" accept="image/*,.pdf" />
            </div>
            <div class="field wide">
              <label for="expenseNote">Note</label>
              <input id="expenseNote" name="note" required placeholder="What was it for?" />
            </div>
            <button class="primary wide" type="submit">Add expense</button>
          </form>
        </div>
      </section>
      <section class="section">
        <div class="section-head">
          <h2>${hasAllRosterAccess() ? "All expenses" : "Team expenses"}</h2>
          <span class="pill confirmed">Total ${money(sum(visibleExpenses.map((expense) => expense.amount)))}</span>
        </div>
        <div class="section-body">
          <div class="filter-grid">
            <div class="field">
              <label for="expenseCategoryFilter">Category</label>
              <select id="expenseCategoryFilter" data-expense-filter="category">
                <option value="all" ${state.expenseCategoryFilter === "all" ? "selected" : ""}>All categories</option>
                <option value="Client entertaining" ${state.expenseCategoryFilter === "Client entertaining" ? "selected" : ""}>Client entertaining</option>
                <option value="Marketing" ${state.expenseCategoryFilter === "Marketing" ? "selected" : ""}>Marketing</option>
              </select>
            </div>
            <div class="field">
              <label for="expenseManagerFilter">Manager</label>
              <select id="expenseManagerFilter" data-expense-filter="manager">
                <option value="all" ${state.expenseManagerFilter === "all" ? "selected" : ""}>All managers</option>
                ${hasAllRosterAccess() ? `<option value="admin" ${state.expenseManagerFilter === "admin" ? "selected" : ""}>Admin</option>` : ""}
                ${visibleManagers.map((manager) => `<option value="${manager.id}" ${state.expenseManagerFilter === manager.id ? "selected" : ""}>${manager.name}</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <label for="expenseMonthFilter">Month</label>
              <select id="expenseMonthFilter" data-expense-filter="month">
                <option value="all" ${state.expenseMonthFilter === "all" ? "selected" : ""}>All months</option>
                ${months.map((month, index) => `<option value="${index}" ${state.expenseMonthFilter === String(index) ? "selected" : ""}>${month}</option>`).join("")}
              </select>
            </div>
          </div>
        </div>
        <div class="section-body manager-list">
          ${visibleExpenses.length ? visibleExpenses.map((expense) => `
            <article class="deal">
              <div class="deal-line">
                <strong>${expense.category}</strong>
                <span>${money(expense.amount)}</span>
              </div>
              <div class="deal-line muted"><span>Manager</span><span>${managerName(expense.managerId)}</span></div>
              <div class="deal-line muted"><span>Month</span><span>${months[expense.monthIndex]}</span></div>
              <div class="deal-line muted"><span>Note</span><span>${expense.note}</span></div>
              <div class="deal-line muted"><span>Receipt</span><span>${expense.receiptData ? `<a href="${expense.receiptData}" target="_blank" rel="noopener">${expense.receiptName || "Open receipt"}</a>` : "No file attached"}</span></div>
            </article>
          `).join("") : `<div class="notice">No expenses submitted yet.</div>`}
        </div>
      </section>
    </div>
  `;
}

function talentExpensesView() {
  const deals = visibleTalentExpenseDeals();
  const talentRows = [...new Map(deals.map((deal) => [talentKey(deal.managerId, deal.talentName), {
    key: talentKey(deal.managerId, deal.talentName),
    managerId: deal.managerId,
    talentName: deal.talentName
  }])).values()].sort((a, b) => a.talentName.localeCompare(b.talentName) || managerName(a.managerId).localeCompare(managerName(b.managerId)));
  if (!state.selectedTalentExpenseTalentKey || !talentRows.some((row) => row.key === state.selectedTalentExpenseTalentKey)) {
    state.selectedTalentExpenseTalentKey = talentRows[0]?.key || null;
  }
  const selectedTalent = talentRows.find((row) => row.key === state.selectedTalentExpenseTalentKey);
  const selectedDeals = selectedTalent
    ? deals.filter((deal) => deal.managerId === selectedTalent.managerId && deal.talentName === selectedTalent.talentName)
    : [];
  if (!state.selectedTalentExpenseDealId || !selectedDeals.some((deal) => deal.id === state.selectedTalentExpenseDealId)) {
    state.selectedTalentExpenseDealId = selectedDeals[0]?.id || null;
  }
  const selectedDeal = selectedDeals.find((deal) => deal.id === state.selectedTalentExpenseDealId);
  const dealExpenses = selectedDeal ? dealTalentExpenses(selectedDeal.id) : [];
  const expenseTotal = selectedDeal ? dealTalentExpenseTotal(selectedDeal.id) : 0;

  return `
    ${header("Talent Expenses", "Attach talent costs to a specific job invoice")}
    <section class="section">
      <div class="section-head">
        <h2>Choose talent</h2>
        <span class="pill confirmed">${talentRows.length} talent with CRM deals</span>
      </div>
      <div class="section-body">
        <div class="notice">Talent expenses are added onto the selected job invoice only. They do not feed into the P&L, overheads, or manager commission.</div>
      </div>
      <div class="section-body earnings-grid">
        ${talentRows.length ? talentRows.map((row) => `
          <button class="earning ${state.selectedTalentExpenseTalentKey === row.key ? "active" : ""}" data-talent-expense-talent="${row.key}">
            <span>${row.talentName}</span>
            <strong>${selectedTalentExpenseDealCount(deals, row)} deals</strong>
            <small>${managerName(row.managerId)}</small>
          </button>
        `).join("") : `<div class="notice">No CRM deals available yet. Add deals in CRM first.</div>`}
      </div>
    </section>
    ${selectedTalent ? `
      <section class="section soft-section">
        <div class="section-head">
          <h2>${selectedTalent.talentName} deals</h2>
          <span class="pill pipeline">Select the job invoice</span>
        </div>
        <div class="section-body talent-expense-deal-grid">
          ${selectedDeals.length ? selectedDeals.map((deal) => `
            <button class="talent-expense-deal ${state.selectedTalentExpenseDealId === deal.id ? "active" : ""}" data-talent-expense-deal="${deal.id}">
              <strong>${deal.company || "Company needed"}</strong>
              <span>${deal.campaignName || "No campaign name"}</span>
              <small>${dealMoney(deal)} deal · ${money(dealTalentExpenseTotal(deal.id))} talent expenses</small>
            </button>
          `).join("") : `<div class="notice">No CRM deals for this talent yet.</div>`}
        </div>
      </section>
    ` : ""}
    ${selectedDeal ? `
      <section class="section soft-section">
        <div class="section-head">
          <h2>Add expense to invoice</h2>
          <span class="pill confirmed">${selectedDeal.company || "Selected job"}</span>
        </div>
        <div class="section-body">
          <form class="form-grid" data-talent-expense-form>
            <input type="hidden" name="crmDealId" value="${selectedDeal.id}" />
            <div class="field">
              <label>Expense amount</label>
              <input name="amount" required inputmode="decimal" placeholder="£0.00" />
            </div>
            <div class="field">
              <label>Receipt</label>
              <input name="receipt" type="file" accept="image/*,.pdf" />
            </div>
            <div class="field wide">
              <label>Note</label>
              <input name="note" placeholder="What is this talent expense for?" />
            </div>
            <button class="primary wide" type="submit">Add to job invoice</button>
          </form>
        </div>
        <div class="section-body invoice-summary-grid">
          <div class="earning"><span>Deal amount</span><strong>${dealMoney(selectedDeal)}</strong></div>
          <div class="earning"><span>Talent expenses</span><strong>${money(expenseTotal)}</strong></div>
          <div class="earning"><span>Invoice total</span><strong>${money(dealInvoiceTotal(selectedDeal))}</strong></div>
        </div>
        <div class="section-body manager-list">
          ${dealExpenses.length ? dealExpenses.map((expense) => `
            <article class="deal">
              <div class="deal-line">
                <strong>${expense.note || "Talent expense"}</strong>
                <span>${money(expense.amount)}</span>
              </div>
              <div class="deal-line muted"><span>Added by</span><span>${managerName(expense.submittedBy)}</span></div>
              <div class="deal-line muted"><span>Added</span><span>${displayDate(expense.submittedAt.slice(0, 10))}</span></div>
              <div class="deal-line muted"><span>Finance action</span><span>${expense.financeStatus === "Added to invoice" ? `Added ${displayDate((expense.financeActionedAt || "").slice(0, 10))}` : "Waiting for finance"}</span></div>
              <div class="deal-line muted"><span>Receipt</span><span>${expense.receiptData ? `<a href="${expense.receiptData}" target="_blank" rel="noopener">${expense.receiptName || "Open receipt"}</a>` : "No receipt attached"}</span></div>
            </article>
          `).join("") : `<div class="notice">No talent expenses added to this job yet.</div>`}
        </div>
      </section>
    ` : ""}
  `;
}

function selectedTalentExpenseDealCount(deals, row) {
  return deals.filter((deal) => deal.managerId === row.managerId && deal.talentName === row.talentName).length;
}

function managerView() {
  const accessibleManagers = state.user.role === "admin" ? managerUsers() : visibleManagerUsers();
  const formManagers = state.user.role === "admin" ? accessibleManagers : [state.user];
  const defaultFormManagerId = state.user.role === "admin" ? formManagers[0]?.id : state.user.id;
  const activeFormManagerId = formManagers.some((manager) => manager.id === state.selectedManagerId) ? state.selectedManagerId : defaultFormManagerId;
  const visibleManagerIds = accessibleManagers.map((manager) => manager.id);
  const visibleDeals = state.user.role === "admin" ? state.deals : state.deals.filter((deal) => visibleManagerIds.includes(deal.managerId));
  const filteredDeals = state.activeDealList === "pipeline"
    ? visibleDeals.filter((deal) => deal.status === "Pipeline")
    : visibleDeals;
  const earningsTitle = state.user.role === "admin" ? "Manager earnings at a glance" : "Roster earnings at a glance";

  return `
    ${header("Deal input", state.user.role === "admin" ? "Admin can submit and review all manager deals" : "Your private roster and deal workspace")}
    <div class="layout">
      <section class="section">
        <div class="section-head">
          <h2>Submit deal</h2>
          <span class="pill ${state.user.role === "admin" ? "admin" : "confirmed"}">${state.user.role === "admin" ? "Admin mode" : "Private to you"}</span>
        </div>
        <div class="section-body">
          <form class="form-grid" data-deal-form>
            <div class="field">
              <label for="managerId">Talent manager</label>
              <select id="managerId" name="managerId" data-manager-select ${state.user.role !== "admin" && formManagers.length === 1 ? "disabled" : ""}>
                ${formManagers.map((user) => `<option value="${user.id}" ${user.id === activeFormManagerId ? "selected" : ""}>${user.name}</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <label for="talentName">Talent name</label>
              <input id="talentName" name="talentName" list="talent-options" required placeholder="Add or choose talent" />
              <datalist id="talent-options">${talentOptions(activeFormManagerId).map((name) => `<option value="${name}"></option>`).join("")}</datalist>
            </div>
            <div class="field">
              <label for="status">Status</label>
              <select id="status" name="status">
                <option>Confirmed</option>
                <option>Pipeline</option>
              </select>
            </div>
            <div class="field">
              <label for="month">Month</label>
              <select id="month" name="month">
                ${months.map((month, index) => `<option value="${index}">${month}</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <label for="amount">Deal amount</label>
              <input id="amount" name="amount" required type="number" min="0" step="0.01" placeholder="0.00" />
            </div>
            <div class="field">
              <label for="costRate">COS rate</label>
              <input id="costRate" name="costRate" type="number" min="0" max="100" step="0.1" value="80" />
            </div>
            <div class="field wide">
              <label for="campaignName">Campaign Name</label>
              <input id="campaignName" name="campaignName" required placeholder="Campaign or roster name" />
            </div>
            <button class="primary wide" type="submit">${state.user.role === "admin" ? "Add deal to P&L" : "Submit deal for approval"}</button>
          </form>
        </div>
      </section>
      <section class="section">
        <div class="section-head"><h2>Add managed talent</h2></div>
        <div class="section-body">
          <form class="talent-form" data-talent-form>
            <div class="field">
              <label for="talentManagerForNew">Talent manager</label>
              <select id="talentManagerForNew" name="managerId" ${state.user.role !== "admin" && formManagers.length === 1 ? "disabled" : ""}>
                ${formManagers.map((user) => `<option value="${user.id}" ${user.id === activeFormManagerId ? "selected" : ""}>${user.name}</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <label for="newTalentName">Talent name</label>
              <input id="newTalentName" name="talentName" required placeholder="Talent name" />
            </div>
            <button class="primary" type="submit">Add talent</button>
          </form>
          <div class="roster-list">${rosterChips(activeFormManagerId)}</div>
        </div>
      </section>
    </div>
    <section class="section soft-section">
      <div class="section-head">
        <h2>${earningsTitle}</h2>
        <div class="segmented">
          <button class="${state.earningsMode === "live" ? "active" : ""}" data-earnings-mode="live">Confirmed</button>
          <button class="${state.earningsMode === "pipeline" ? "active" : ""}" data-earnings-mode="pipeline">Confirmed + pipeline</button>
        </div>
      </div>
      <div class="section-body">${managerEarnings(state.earningsMode, state.user.role === "admin" ? null : visibleManagerIds)}</div>
    </section>
    ${state.user.role === "admin" ? `<section class="section soft-section">
      <div class="section-head">
        <h2>All manager deals</h2>
        <div class="segmented">
          <button class="${state.activeDealList === "all" ? "active" : ""}" data-deal-list="all">All deals</button>
          <button class="${state.activeDealList === "pipeline" ? "active" : ""}" data-deal-list="pipeline">Pipeline</button>
        </div>
      </div>
      <div class="section-body manager-list">${dealCards(filteredDeals, true)}</div>
      <div class="section-body">${talentMonthlyDealsTable(filteredDeals)}</div>
    </section>` : ""}
  `;
}

function allDealsView() {
  const accessibleManagers = visibleManagerUsers();
  if (state.selectedDealManagerId !== "all" && !accessibleManagers.some((manager) => manager.id === state.selectedDealManagerId)) {
    state.selectedDealManagerId = "all";
    state.selectedDealTalentKey = "all";
  }
  const visibleManagerIds = state.selectedDealManagerId === "all"
    ? accessibleManagers.map((manager) => manager.id)
    : [state.selectedDealManagerId];
  const visibleDeals = state.deals.filter((deal) => visibleManagerIds.includes(deal.managerId));
  const managerRows = accessibleManagers.filter((manager) => visibleManagerIds.includes(manager.id));
  const talentRows = managerRows.flatMap((manager) => talentOptions(manager.id).map((talentName) => ({
    key: `${manager.id}::${talentName}`,
    managerId: manager.id,
    talentName
  })));
  if (state.selectedDealTalentKey !== "all" && !talentRows.some((row) => row.key === state.selectedDealTalentKey)) {
    state.selectedDealTalentKey = "all";
  }
  const statusDeals = state.activeDealList === "pipeline"
    ? visibleDeals.filter((deal) => deal.status === "Pipeline")
    : visibleDeals;
  const filteredDeals = state.selectedDealTalentKey === "all"
    ? statusDeals
    : statusDeals.filter((deal) => `${deal.managerId}::${deal.talentName}` === state.selectedDealTalentKey);

  return `
    ${header("All deals", "Review your roster deals by talent")}
    <section class="section">
      <div class="section-head">
        <h2>Deals</h2>
        <div class="section-actions">
          <select class="compact-select" data-deal-manager-filter>
            <option value="all" ${state.selectedDealManagerId === "all" ? "selected" : ""}>All managed rosters</option>
            ${accessibleManagers.map((manager) => `<option value="${manager.id}" ${state.selectedDealManagerId === manager.id ? "selected" : ""}>${manager.id === state.user.id ? "My roster" : manager.name}</option>`).join("")}
          </select>
          <select class="compact-select" data-deal-talent-filter>
            <option value="all" ${state.selectedDealTalentKey === "all" ? "selected" : ""}>All talent</option>
            ${talentRows.map((row) => `<option value="${row.key}" ${state.selectedDealTalentKey === row.key ? "selected" : ""}>${row.talentName}${accessibleManagers.length > 1 ? ` - ${managerName(row.managerId)}` : ""}</option>`).join("")}
          </select>
          <div class="segmented">
            <button class="${state.activeDealList === "all" ? "active" : ""}" data-deal-list="all">All deals</button>
            <button class="${state.activeDealList === "pipeline" ? "active" : ""}" data-deal-list="pipeline">Pipeline</button>
          </div>
        </div>
      </div>
      <div class="section-body manager-list">${dealCards(filteredDeals, true)}</div>
      <div class="section-body">${talentMonthlyDealsTable(filteredDeals)}</div>
    </section>
  `;
}

function crmView() {
  const accessibleManagers = hasAllRosterAccess() ? visibleManagerUsers() : crmVisibleManagerUsers();
  const formManagers = hasAllRosterAccess() ? managerUsers() : [state.user];
  const defaultFormManagerId = hasAllRosterAccess() ? (state.selectedManagerId || formManagers[0]?.id) : state.user.id;
  const activeFormManagerId = formManagers.some((manager) => manager.id === defaultFormManagerId) ? defaultFormManagerId : formManagers[0]?.id;
  const canCreateCrmDeal = !["finance", "operations"].includes(state.user.role);
  if (state.selectedCrmManagerId !== "all" && !accessibleManagers.some((manager) => manager.id === state.selectedCrmManagerId)) {
    state.selectedCrmManagerId = "all";
  }
  const managerFilteredDeals = visibleCrmDeals()
    .filter((deal) => state.selectedCrmManagerId === "all" || deal.managerId === state.selectedCrmManagerId);
  const crmTalentRows = crmTalentFilterRows(managerFilteredDeals, accessibleManagers);
  if (state.selectedCrmTalentKey !== "all" && !crmTalentRows.some((row) => row.key === state.selectedCrmTalentKey)) {
    state.selectedCrmTalentKey = "all";
  }
  const filteredDeals = managerFilteredDeals
    .filter((deal) => state.selectedCrmTalentKey === "all" || talentKey(deal.managerId, deal.talentName) === state.selectedCrmTalentKey)
    .filter((deal) => state.activeCrmStage === "all" || deal.stage === state.activeCrmStage)
    .sort((a, b) => crmStages.indexOf(a.stage) - crmStages.indexOf(b.stage) || crmDueMonthIndex(a) - crmDueMonthIndex(b));
  const totalVisible = filteredDeals.reduce((total, deal) => total + dealGbpAmount(deal), 0);
  if (state.selectedCrmDealId && !filteredDeals.some((deal) => deal.id === state.selectedCrmDealId)) {
    state.selectedCrmDealId = null;
  }
  const selectedDeal = filteredDeals.find((deal) => deal.id === state.selectedCrmDealId);

  return `
    ${header("CRM", hasAllRosterAccess() ? "All deal opportunities by stage, owner, and amount" : "Your CRM deals and line-managed visibility")}
    <section class="section">
      <div class="section-head">
        <h2>CRM summary</h2>
        <span class="pill">${money(totalVisible)}</span>
      </div>
      <div class="section-body earnings-grid">
        ${crmStages.map((stage) => {
          const stageDeals = filteredDeals.filter((deal) => deal.stage === stage);
          return `<div class="earning"><span>${stage}</span><strong>${money(stageDeals.reduce((total, deal) => total + dealGbpAmount(deal), 0))}</strong><small>${stageDeals.length} deals</small></div>`;
        }).join("")}
      </div>
    </section>
    <section class="section crm-board-section">
      <div class="section-head">
        <h2>Deals by stage</h2>
        <div class="section-actions">
          ${canCreateCrmDeal ? `<button class="primary add-crm-toggle" type="button" data-crm-add-toggle>${state.crmAddOpen ? "Close add CRM deal" : "Add CRM deal"}</button>` : ""}
          ${!hasAllRosterAccess() ? `
            <div class="segmented segmented-three">
              <button class="${state.crmScope === "own" ? "active" : ""}" data-crm-scope="own">My deals</button>
              <button class="${state.crmScope === "team" ? "active" : ""}" data-crm-scope="team">People I manage</button>
              <button class="${state.crmScope === "full" ? "active" : ""}" data-crm-scope="full">Full roster</button>
            </div>
          ` : ""}
          <select class="compact-select" data-crm-filter="manager">
            <option value="all" ${state.selectedCrmManagerId === "all" ? "selected" : ""}>All managers</option>
            ${accessibleManagers.map((manager) => `<option value="${manager.id}" ${state.selectedCrmManagerId === manager.id ? "selected" : ""}>${manager.name}</option>`).join("")}
          </select>
          <select class="compact-select" data-crm-filter="talent">
            <option value="all" ${state.selectedCrmTalentKey === "all" ? "selected" : ""}>All talent</option>
            ${crmTalentRows.map((row) => `<option value="${row.key}" ${state.selectedCrmTalentKey === row.key ? "selected" : ""}>${row.talentName}${accessibleManagers.length > 1 ? ` - ${managerName(row.managerId)}` : ""}</option>`).join("")}
          </select>
          <select class="compact-select" data-crm-filter="stage">
            <option value="all" ${state.activeCrmStage === "all" ? "selected" : ""}>All stages</option>
            ${crmStages.map((stage) => `<option value="${stage}" ${state.activeCrmStage === stage ? "selected" : ""}>${stage}</option>`).join("")}
          </select>
        </div>
      </div>
      ${crmStageBoard(filteredDeals)}
    </section>
    ${canCreateCrmDeal && state.crmAddOpen ? `
      <div class="crm-add-overlay" data-crm-add-overlay>
        <section class="section crm-add-panel open" role="dialog" aria-modal="true" aria-label="Add CRM deal">
          <button class="crm-detail-close" type="button" data-crm-add-close aria-label="Close add CRM deal">×</button>
          <div class="section-head"><h2>Add CRM deal</h2><span class="pill confirmed">${hasAllRosterAccess() ? `${roleLabel()} entry` : "Your deals"}</span></div>
          <div class="section-body">
          <form class="form-grid" data-crm-form>
            <div class="field">
              <label for="crmManagerId">Talent manager</label>
              <select id="crmManagerId" name="managerId" data-crm-form-manager ${hasAllRosterAccess() ? "" : "disabled"}>
                ${formManagers.map((manager) => `<option value="${manager.id}" ${manager.id === activeFormManagerId ? "selected" : ""}>${manager.name}</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <label for="crmTalentName">Talent name</label>
              <input id="crmTalentName" name="talentName" list="crm-talent-options" required placeholder="Add or choose talent" />
              <datalist id="crm-talent-options">${talentOptions(activeFormManagerId).map((name) => `<option value="${name}"></option>`).join("")}</datalist>
            </div>
            <div class="field">
              <label for="crmDirection">Inbound or outbound</label>
              <select id="crmDirection" name="direction">${crmDirections.map((direction) => `<option>${direction}</option>`).join("")}</select>
            </div>
            <div class="field">
              <label for="crmStage">Stage</label>
              <select id="crmStage" name="stage">${manualCrmStages.map((stage) => `<option>${stage}</option>`).join("")}</select>
            </div>
            <div class="field">
              <label for="crmAmount">Deal amount</label>
              <input id="crmAmount" name="amount" required type="number" min="0" step="0.01" placeholder="0.00" />
            </div>
            <div class="field checkbox-field">
              <label for="crmCurrencyUsd">Switch to dollars</label>
              <label class="toggle-line"><input id="crmCurrencyUsd" name="currencyUsd" type="checkbox" value="USD" /> Use USD for this deal</label>
            </div>
            <div class="field">
              <label for="crmPaymentTerm">Payment terms</label>
              <select id="crmPaymentTerm" name="paymentTerm">${paymentTerms.map((term) => `<option value="${term.value}">${term.label}</option>`).join("")}</select>
            </div>
            <div class="field">
              <label for="crmCustomDays">Own time in days</label>
              <input id="crmCustomDays" name="customPaymentDays" type="number" min="0" step="1" placeholder="Only if custom" />
            </div>
            <div class="field">
              <label for="crmCompany">Company name</label>
              <input id="crmCompany" name="company" list="crm-brand-options" required placeholder="Brand or agency" data-crm-brand-input />
              <datalist id="crm-brand-options">${brandRecords().map((brand) => `<option value="${htmlSafe(brand.name)}"></option>`).join("")}</datalist>
            </div>
            <div class="field">
              <label for="crmCampaign">Campaign name</label>
              <input id="crmCampaign" name="campaignName" placeholder="Campaign name" />
            </div>
            <div class="field">
              <label for="crmEmail">Email addresses</label>
              <input id="crmEmail" name="emailContact" type="text" placeholder="name@company.com, finance@company.com" />
            </div>
            <div class="field">
              <label for="crmBillingAddress">Company address</label>
              <input id="crmBillingAddress" name="billingAddress" placeholder="Company address for invoice" />
            </div>
            <div class="notice soft-note wide" data-brand-autofill-note hidden>* Brand details have been filled from the brand database. Please check email, address, and payment terms before saving.</div>
            <div class="field">
              <label for="crmInvoiceReference">PO number</label>
              <input id="crmInvoiceReference" name="invoiceReference" placeholder="PO number" />
            </div>
            <div class="field checkbox-field">
              <label for="crmNoPoNumber">No PO number</label>
              <label class="toggle-line"><input id="crmNoPoNumber" name="noPoNumber" type="checkbox" /> No PO for this deal</label>
            </div>
            <div class="field">
              <label for="crmAccountCode">Xero account code</label>
              <input id="crmAccountCode" name="xeroAccountCode" value="200" />
            </div>
            <div class="field">
              <label for="crmTaxRate">Xero tax rate</label>
              <select id="crmTaxRate" name="xeroTaxRate">
                <option>No VAT</option>
                <option>20% VAT on Income</option>
                <option>Zero Rated Income</option>
              </select>
            </div>
            <div class="field">
              <label for="crmContract">Contract</label>
              <input id="crmContract" name="contract" type="file" />
            </div>
            <button class="primary wide" type="submit">Add CRM deal</button>
          </form>
          </div>
        </section>
      </div>
    ` : ""}
    ${selectedDeal ? crmDealDetailOverlay(selectedDeal) : ""}
  `;
}

function crmTalentFilterRows(deals, managers) {
  const rows = new Map();
  managers.forEach((manager) => {
    talentOptions(manager.id).forEach((talentName) => {
      rows.set(talentKey(manager.id, talentName), {
        key: talentKey(manager.id, talentName),
        managerId: manager.id,
        talentName
      });
    });
  });
  deals.forEach((deal) => rows.set(talentKey(deal.managerId, deal.talentName), {
    key: talentKey(deal.managerId, deal.talentName),
    managerId: deal.managerId,
    talentName: deal.talentName
  }));
  return [...rows.values()].sort((a, b) => a.talentName.localeCompare(b.talentName) || managerName(a.managerId).localeCompare(managerName(b.managerId)));
}

function brandKey(name) {
  return slugify(String(name || "").trim().toLowerCase());
}

function brandRecords() {
  return Object.values(state.brandDatabase || {}).sort((a, b) => {
    if (state.brandSortMode === "total") {
      return brandTotalAmount(b.name) - brandTotalAmount(a.name) || a.name.localeCompare(b.name);
    }
    return a.name.localeCompare(b.name);
  });
}

function brandRecordByName(name) {
  return state.brandDatabase[brandKey(name)];
}

function brandPaymentLabel(brand) {
  if (!brand) return "-";
  if (brand.paymentTerm === "custom") return `${Number(brand.customPaymentDays || 0)} days`;
  return (paymentTerms.find((term) => term.value === brand.paymentTerm) || paymentTerms[1]).label;
}

function htmlSafe(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function brandDeals(name) {
  const key = brandKey(name);
  return state.crmDeals
    .filter((deal) => brandKey(deal.company) === key)
    .sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
}

function brandTotalAmount(name) {
  return brandDeals(name).reduce((total, deal) => total + dealGbpAmount(deal), 0);
}

function upsertBrandRecordFromValues(values) {
  const name = String(values.name || values.company || "").trim();
  if (!name) return null;
  const key = brandKey(name);
  const current = state.brandDatabase[key] || {};
  const paymentTerm = paymentTerms.some((term) => term.value === values.paymentTerm)
    ? values.paymentTerm
    : current.paymentTerm || "30";
  state.brandDatabase[key] = {
    name,
    emailContact: normalizeEmailContacts(values.emailContact || current.emailContact || ""),
    billingAddress: String(values.billingAddress || current.billingAddress || "").trim(),
    paymentTerm,
    customPaymentDays: Math.max(0, Number(values.customPaymentDays ?? current.customPaymentDays ?? 0)),
    updatedAt: new Date().toISOString()
  };
  return state.brandDatabase[key];
}

function upsertBrandFromCrmDeal(deal) {
  if (!deal?.company) return;
  upsertBrandRecordFromValues({
    name: deal.company,
    emailContact: deal.emailContact,
    billingAddress: deal.billingAddress,
    paymentTerm: deal.paymentTerm,
    customPaymentDays: deal.customPaymentDays
  });
}

function brandsView() {
  const records = brandRecords();
  const selected = brandRecordByName(state.selectedBrandName) || records[0] || null;
  if (!state.selectedBrandName && selected) state.selectedBrandName = selected.name;
  const deals = selected ? brandDeals(selected.name) : [];

  return `
    ${header("Brands", "Saved brand details for CRM autofill and booked-deal history")}
    <div class="layout">
      <div class="section-stack">
        <section class="section">
          <div class="section-head">
            <h2>${selected ? "Brand details" : "Add brand"}</h2>
            <span class="pill">* check before use</span>
          </div>
          <div class="section-body">
            <form class="form-grid" data-brand-form>
              <div class="field">
                <label for="brandName">Brand name</label>
                <input id="brandName" name="name" required value="${selected ? htmlSafe(selected.name) : ""}" placeholder="Brand or company name" />
              </div>
              <div class="field">
                <label for="brandEmail">Email addresses *</label>
                <input id="brandEmail" name="emailContact" type="text" value="${selected ? htmlSafe(selected.emailContact) : ""}" placeholder="finance@brand.com, contact@brand.com" />
              </div>
              <div class="field">
                <label for="brandAddress">Company address *</label>
                <input id="brandAddress" name="billingAddress" value="${selected ? htmlSafe(selected.billingAddress) : ""}" placeholder="Address for invoice" />
              </div>
              <div class="field">
                <label for="brandPaymentTerm">Payment terms *</label>
                <select id="brandPaymentTerm" name="paymentTerm">
                  ${paymentTerms.map((term) => `<option value="${term.value}" ${selected?.paymentTerm === term.value ? "selected" : ""}>${term.label}</option>`).join("")}
                </select>
              </div>
              <div class="field">
                <label for="brandCustomDays">Own time in days</label>
                <input id="brandCustomDays" name="customPaymentDays" type="number" min="0" step="1" value="${selected?.customPaymentDays || ""}" placeholder="Only if custom" />
              </div>
              <button class="primary wide" type="submit">Save brand details</button>
            </form>
            <div class="notice soft-note">* Details may have changed. Managers should check email, company address, and payment terms before sending a deal to invoice.</div>
          </div>
        </section>
        <section class="section">
          <div class="section-head">
            <h2>Brand database</h2>
            <div class="section-actions">
              <select class="compact-select" data-brand-sort>
                <option value="alphabetical" ${state.brandSortMode === "alphabetical" ? "selected" : ""}>Sort A-Z</option>
                <option value="total" ${state.brandSortMode === "total" ? "selected" : ""}>Sort by deal total</option>
              </select>
              <span class="pill">${records.length} brands</span>
            </div>
          </div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Brand</th><th>Total deal value</th><th>Past deals</th></tr></thead>
              <tbody>
                ${records.length ? records.map((brand) => {
                  const deals = brandDeals(brand.name);
                  const count = deals.length;
                  const total = deals.reduce((amount, deal) => amount + dealGbpAmount(deal), 0);
                  return `
                    <tr class="${selected?.name === brand.name ? "active-row" : ""}">
                      <td><button class="table-link" type="button" data-brand-detail="${htmlSafe(brand.name)}">${htmlSafe(brand.name)}</button></td>
                      <td>${money(total)}</td>
                      <td>${count}</td>
                    </tr>
                  `;
                }).join("") : `<tr><td colspan="3">No brands saved yet.</td></tr>`}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <section class="section">
        <div class="section-head">
          <h2>${selected ? `${htmlSafe(selected.name)} deals` : "Brand deals"}</h2>
          <span class="pill">${deals.length} booked</span>
        </div>
        <div class="section-body manager-list">
          ${selected ? `
            <div class="metric-card">
              <span>Saved details *</span>
              <strong>${htmlSafe(selected.emailContact || "No email saved")}</strong>
              <small>${htmlSafe(selected.billingAddress || "No company address saved")} · ${brandPaymentLabel(selected)}</small>
            </div>
            ${deals.length ? deals.map((deal) => `
              <button class="deal-card" type="button" data-crm-detail="${deal.id}">
                <div>
                  <strong>${htmlSafe(deal.talentName)}</strong>
                  <small>${htmlSafe(deal.campaignName || "No campaign name")}</small>
                </div>
                <div>
                  <strong>${dealMoney(deal)}</strong>
                </div>
              </button>
            `).join("") : `<div class="notice">No booked CRM deals for this brand yet.</div>`}
          ` : `<div class="notice">Add a brand to start building the database.</div>`}
        </div>
      </section>
    </div>
    ${state.selectedCrmDealId && state.crmDeals.some((deal) => deal.id === state.selectedCrmDealId) ? crmDealDetailOverlay(state.crmDeals.find((deal) => deal.id === state.selectedCrmDealId)) : ""}
  `;
}

function visibleEmailLeads() {
  const visibleIds = state.user?.role === "manager" ? [state.user.id] : [];
  return state.emailLeads
    .filter((lead) => visibleIds.includes(lead.managerId))
    .sort((a, b) => new Date(b.receivedAt) - new Date(a.receivedAt));
}

function visiblePrRequests() {
  const userId = state.user?.role === "manager" ? state.user.id : "";
  return state.prRequests
    .filter((request) => request.managerId === userId || request.delegatedToManagerId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function visibleEventRequests() {
  const userId = state.user?.role === "manager" ? state.user.id : "";
  return state.eventRequests
    .filter((request) => request.managerId === userId || request.delegatedToManagerId === userId)
    .sort((a, b) => new Date(a.eventDate || a.createdAt) - new Date(b.eventDate || b.createdAt));
}

function delegatedRequestsForCurrentManager(type) {
  if (state.user?.role !== "manager") return [];
  const list = requestListForType(type);
  return list
    .filter((request) => request.managerId === state.user.id && request.delegatedToManagerId && request.delegatedToManagerId !== state.user.id)
    .sort((a, b) => new Date(b.delegatedAt || b.createdAt) - new Date(a.delegatedAt || a.createdAt));
}

function requestIsActionableForCurrentUser(request) {
  if (state.user?.role !== "manager" || request.status !== "Open") return false;
  return request.delegatedToManagerId
    ? request.delegatedToManagerId === state.user.id
    : request.managerId === state.user.id;
}

function archiveOpen(key) {
  return Boolean(state.openRequestArchives[key]);
}

function archiveToggleLabel(isOpen) {
  return isOpen ? "Hide archive" : "Show archive";
}

function emailLeadsView() {
  const leads = visibleEmailLeads();
  const activeLeads = leads.filter((lead) => lead.status === "New");
  const archivedLeads = leads.filter((lead) => lead.status !== "New");
  const isArchiveOpen = archiveOpen("email");
  return `
    ${header("Email Leads", "Scanned manager emails ready to review, edit, and route")}
    <section class="section">
      <div class="section-head">
        <h2>Email intake</h2>
        <div class="section-actions">
          <button class="secondary" type="button" data-scan-inbox-demo>Scan inbox demo</button>
          <span class="pill pipeline">${activeLeads.length} new</span>
        </div>
      </div>
      <div class="section-body">
        <div class="notice">Prototype email scan: these cards simulate what Gmail/Google Workspace can feed into the portal. Managers can check the extracted details before choosing CRM, PR, or Events.</div>
      </div>
      <div class="section-body manager-list">
        ${activeLeads.length ? activeLeads.map((lead) => emailLeadCard(lead)).join("") : `<div class="notice">No active email leads found.</div>`}
      </div>
      <div class="section-body archive-panel ${isArchiveOpen ? "open" : "collapsed"}">
        <button class="archive-head archive-toggle" type="button" data-archive-toggle="email" aria-expanded="${isArchiveOpen}">
          <h3>Archive</h3>
          <span><span class="pill">${archivedLeads.length} stored</span><strong>${archiveToggleLabel(isArchiveOpen)}</strong></span>
        </button>
        ${isArchiveOpen ? `<div class="manager-list">
          ${archivedLeads.length ? archivedLeads.map((lead) => emailLeadCard(lead)).join("") : `<div class="notice">No archived email leads yet.</div>`}
        </div>` : ""}
      </div>
    </section>
  `;
}

function emailLeadCard(lead) {
  const canEdit = canAccessManager(lead.managerId) && lead.status === "New";
  const suggestedTarget = lead.category === "PR" ? "pr" : lead.category === "Event" ? "event" : "crm";
  const actionButtonClass = (target) => target === suggestedTarget ? "primary" : "secondary";
  const managerOptions = (hasAllRosterAccess() ? managerUsers() : visibleManagerUsers())
    .map((manager) => `<option value="${manager.id}" ${manager.id === lead.managerId ? "selected" : ""}>${manager.name}</option>`)
    .join("");
  return `
    <article class="email-lead-card ${lead.status !== "New" ? "muted-card" : ""}">
      <div class="email-lead-head">
        <div>
          <span class="pill ${lead.category === "Deal" ? "confirmed" : lead.category === "PR" ? "pipeline" : "admin"}">${lead.category}</span>
          <h3>${htmlSafe(lead.subject)}</h3>
          <small>${htmlSafe(lead.from)} · ${displayDate(String(lead.receivedAt).slice(0, 10))} · ${managerName(lead.managerId)}</small>
        </div>
        <strong>${lead.status}</strong>
      </div>
      <form class="form-grid compact-action-grid" data-email-lead-form="${lead.id}">
        <div class="field">
          <label>Manager</label>
          <select name="managerId" ${hasAllRosterAccess() && canEdit ? "" : "disabled"}>${managerOptions}</select>
        </div>
        <div class="field">
          <label>Type</label>
          <select name="category" ${canEdit ? "" : "disabled"}>
            ${["Deal", "PR", "Event"].map((category) => `<option ${lead.category === category ? "selected" : ""}>${category}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label>Talent</label>
          <input name="talentName" value="${htmlSafe(lead.talentName)}" ${canEdit ? "" : "disabled"} />
        </div>
        <div class="field">
          <label>Brand / company</label>
          <input name="company" value="${htmlSafe(lead.company)}" ${canEdit ? "" : "disabled"} />
        </div>
        <div class="field">
          <label>Campaign / request</label>
          <input name="campaignName" value="${htmlSafe(lead.campaignName)}" ${canEdit ? "" : "disabled"} />
        </div>
        <div class="field">
          <label>Amount</label>
          <input name="amount" type="number" min="0" step="0.01" value="${Number(lead.amount || 0)}" ${canEdit ? "" : "disabled"} />
        </div>
        <div class="field">
          <label>Month</label>
          <select name="monthIndex" ${canEdit ? "" : "disabled"}>
            ${months.map((month, index) => `<option value="${index}" ${Number(lead.monthIndex) === index ? "selected" : ""}>${month}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label>Contact email</label>
          <input name="contactEmail" value="${htmlSafe(lead.contactEmail)}" ${canEdit ? "" : "disabled"} />
        </div>
        <div class="field">
          <label>Event date</label>
          <input name="eventDate" type="date" value="${htmlSafe(lead.eventDate)}" ${canEdit ? "" : "disabled"} />
        </div>
        <div class="field wide">
          <label>Manager action point</label>
          <input name="actionPoint" value="${htmlSafe(lead.actionPoint)}" ${canEdit ? "" : "disabled"} />
        </div>
        <div class="field wide">
          <label>Email body</label>
          <div class="read-field">${htmlSafe(lead.body || "No email body available.")}</div>
        </div>
      </form>
      <div class="email-action-row">
        ${canEdit ? `
          <button class="${actionButtonClass("crm")}" type="button" data-email-convert="${lead.id}" data-target="crm">Add to CRM</button>
          <button class="${actionButtonClass("pr")}" type="button" data-email-convert="${lead.id}" data-target="pr">Add to PR requests</button>
          <button class="${actionButtonClass("event")}" type="button" data-email-convert="${lead.id}" data-target="event">Add to Events</button>
          <button class="secondary danger-button" type="button" data-email-dismiss="${lead.id}">Dismiss</button>
        ` : lead.status !== "New" && lead.managerId === state.user?.id ? `
          ${lead.convertedTo ? `<span class="pill confirmed">Added to ${lead.convertedTo}</span>` : ""}
          <button class="secondary" type="button" data-email-restore="${lead.id}">Move back to active</button>
        ` : lead.convertedTo ? `<span class="pill confirmed">Added to ${lead.convertedTo}</span>` : ""}
      </div>
    </article>
  `;
}

function requestListView(type) {
  const isPr = type === "pr";
  const requests = isPr ? visiblePrRequests() : visibleEventRequests();
  const delegatedRequests = delegatedRequestsForCurrentManager(type);
  const activeRequests = requests.filter((request) => requestIsActionableForCurrentUser(request));
  const activeDelegatedRequests = delegatedRequests.filter((request) => request.status === "Open");
  const archivedRequests = uniqueById([
    ...requests.filter((request) => request.status !== "Open"),
    ...delegatedRequests.filter((request) => request.status !== "Open")
  ]);
  const archiveKey = type === "pr" ? "pr" : "event";
  const isArchiveOpen = archiveOpen(archiveKey);
  const title = isPr ? "PR Requests" : "Events";
  const subtitle = isPr ? "Gifting, press samples and non-commercial talent requests" : "Invites, dinners, launches and attendance requests";
  return `
    ${header(title, subtitle)}
    <section class="section">
      <div class="section-head">
        <h2>${title}</h2>
        <span class="pill pipeline">${activeRequests.length} open</span>
      </div>
      <div class="section-body manager-list">
        ${activeRequests.length ? activeRequests.map((request) => requestCard(request, type)).join("") : `<div class="notice">No active ${isPr ? "PR" : "event"} requests. Add them from Email Leads.</div>`}
      </div>
      ${activeDelegatedRequests.length ? `
        <div class="section-body delegated-panel">
          <div class="archive-head">
            <h3>Delegated</h3>
            <span class="pill pipeline">${activeDelegatedRequests.length} live</span>
          </div>
          <div class="manager-list">
            ${activeDelegatedRequests.map((request) => requestCard(request, type)).join("")}
          </div>
        </div>
      ` : ""}
      <div class="section-body archive-panel ${isArchiveOpen ? "open" : "collapsed"}">
        <button class="archive-head archive-toggle" type="button" data-archive-toggle="${archiveKey}" aria-expanded="${isArchiveOpen}">
          <h3>Archive</h3>
          <span><span class="pill">${archivedRequests.length} stored</span><strong>${archiveToggleLabel(isArchiveOpen)}</strong></span>
        </button>
        ${isArchiveOpen ? `<div class="manager-list">
          ${archivedRequests.length ? archivedRequests.map((request) => requestCard(request, type)).join("") : `<div class="notice">No archived ${isPr ? "PR" : "event"} requests yet.</div>`}
        </div>` : ""}
      </div>
    </section>
  `;
}

function requestCard(request, type) {
  const isPr = type === "pr";
  const title = isPr ? request.campaignName : request.eventName;
  const delegationTargets = requestDelegationTargets();
  const canDelegate = state.user?.role === "manager" && request.managerId === state.user.id && !request.delegatedToManagerId && request.status === "Open";
  const canAction = requestIsActionableForCurrentUser(request);
  const delegatedByCurrentManager = request.managerId === state.user?.id && request.delegatedToManagerId && request.delegatedToManagerId !== state.user.id;
  const delegationNotice = delegatedByCurrentManager
    ? `Delegated to ${managerName(request.delegatedToManagerId)}${request.delegatedAt ? ` on ${displayDate(String(request.delegatedAt).slice(0, 10))}` : ""}`
    : `Delegated from ${managerName(request.delegatedFromManagerId)}${request.delegatedAt ? ` on ${displayDate(String(request.delegatedAt).slice(0, 10))}` : ""}`;
  const isArchived = request.status !== "Open";
  return `
    <article class="deal request-card ${isArchived ? "muted-card" : ""}">
      <div class="deal-line">
        <strong>${htmlSafe(request.talentName)} · ${htmlSafe(request.brand)}</strong>
        <span class="pill ${request.status === "Open" ? "pipeline" : "confirmed"}">${request.status}</span>
      </div>
      <div class="deal-line muted"><span>${isPr ? "Request" : "Event"}</span><span>${htmlSafe(title || "-")}</span></div>
      <div class="deal-line muted"><span>Manager</span><span>${htmlSafe(managerName(request.managerId))}</span></div>
      ${request.delegatedToManagerId ? `<div class="deal-line muted"><span>Action owner</span><span>${htmlSafe(managerName(request.delegatedToManagerId))}</span></div>` : ""}
      ${isPr ? "" : `<div class="deal-line muted"><span>Date</span><span>${request.eventDate ? displayDate(request.eventDate) : "-"}</span></div>`}
      <div class="deal-line muted"><span>Contact</span><span>${htmlSafe(request.contactEmail || "-")}</span></div>
      ${request.delegatedFromManagerId ? `<div class="notice delegation-notice">${htmlSafe(delegationNotice)}</div>` : ""}
      ${isArchived && request.archivedAt ? `<div class="deal-line muted"><span>Archived</span><span>${displayDate(String(request.archivedAt).slice(0, 10))}</span></div>` : ""}
      <div class="notice action-notice">${htmlSafe(request.actionPoint)}</div>
      ${canDelegate ? `
        <div class="delegate-box">
          <span>Delegate this action</span>
          ${delegationTargets.length ? `
            <div class="delegate-row">
              <select class="compact-select" data-delegate-select="${type}::${request.id}">
                <option value="">Choose manager...</option>
                ${delegationTargets.map((manager) => `<option value="${manager.id}">${htmlSafe(manager.name)}</option>`).join("")}
              </select>
              <button class="primary delegate-button" type="button" data-delegate-request="${type}::${request.id}">Delegate</button>
            </div>
          ` : `<div class="notice small-notice">No request delegation access has been set up for you yet.</div>`}
        </div>
      ` : ""}
      ${canAction ? `<div class="deal-actions">
        <button class="secondary" data-request-status="${type}::${request.id}" data-status="Actioned">Mark actioned</button>
        <button class="secondary danger-button" data-request-status="${type}::${request.id}" data-status="Dismissed">Dismiss</button>
      </div>` : isArchived && (request.managerId === state.user?.id || request.delegatedToManagerId === state.user?.id) ? `<div class="deal-actions">
        <button class="secondary" type="button" data-request-restore="${type}::${request.id}">Move back to active</button>
      </div>` : ""}
    </article>
  `;
}

function saveBrandRecord(formData) {
  const brand = upsertBrandRecordFromValues({
    name: formData.get("name"),
    emailContact: formData.get("emailContact"),
    billingAddress: formData.get("billingAddress"),
    paymentTerm: formData.get("paymentTerm"),
    customPaymentDays: formData.get("customPaymentDays")
  });
  if (brand) state.selectedBrandName = brand.name;
  saveState();
  app();
}

function applyBrandAutofill(input) {
  const brand = brandRecordByName(input.value);
  const form = input.closest("form");
  if (!brand || !form) return;
  const email = form.querySelector('[name="emailContact"]');
  const address = form.querySelector('[name="billingAddress"]');
  const paymentTerm = form.querySelector('[name="paymentTerm"]');
  const customPaymentDays = form.querySelector('[name="customPaymentDays"]');
  if (email && !String(email.value || "").trim()) email.value = brand.emailContact;
  if (address && !String(address.value || "").trim()) address.value = brand.billingAddress;
  if (paymentTerm) paymentTerm.value = brand.paymentTerm;
  if (customPaymentDays) customPaymentDays.value = brand.customPaymentDays || "";
  const note = form.querySelector("[data-brand-autofill-note]");
  if (note) note.hidden = false;
}

function cashflowView() {
  const accessibleManagers = visibleManagerUsers();
  if (state.selectedCashflowManagerId !== "all" && !accessibleManagers.some((manager) => manager.id === state.selectedCashflowManagerId)) {
    state.selectedCashflowManagerId = "all";
  }
  const deals = visibleCrmDeals()
    .filter((deal) => state.selectedCashflowManagerId === "all" || deal.managerId === state.selectedCashflowManagerId)
    .sort((a, b) => crmDueMonthIndex(a) - crmDueMonthIndex(b) || managerName(a.managerId).localeCompare(managerName(b.managerId)));
  const monthlyTotals = months.map((_, index) => deals
    .filter((deal) => crmDueMonthIndex(deal) === index)
    .reduce((total, deal) => total + dealGbpAmount(deal), 0));
  const afterYearTotal = deals
    .filter((deal) => crmDueMonthIndex(deal) > 11)
    .reduce((total, deal) => total + dealGbpAmount(deal), 0);
  if (state.selectedCashflowMonthIndex !== null && (Number(state.selectedCashflowMonthIndex) < 0 || Number(state.selectedCashflowMonthIndex) > 11)) {
    state.selectedCashflowMonthIndex = null;
  }
  const selectedMonthDeals = state.selectedCashflowMonthIndex === null
    ? []
    : deals.filter((deal) => crmDueMonthIndex(deal) === Number(state.selectedCashflowMonthIndex));
  const selectedMonthTotal = selectedMonthDeals.reduce((total, deal) => total + dealGbpAmount(deal), 0);

  return `
    ${header("Cashflow", "Expected CRM payments due into Cowshed")}
    <section class="section">
      <div class="section-head">
        <h2>Expected receipts</h2>
        <div class="section-actions">
          <select class="compact-select" data-cashflow-manager>
            <option value="all" ${state.selectedCashflowManagerId === "all" ? "selected" : ""}>All managers</option>
            ${accessibleManagers.map((manager) => `<option value="${manager.id}" ${state.selectedCashflowManagerId === manager.id ? "selected" : ""}>${manager.name}</option>`).join("")}
          </select>
          <span class="pill">${money(sum(monthlyTotals) + afterYearTotal)}</span>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr>${months.map((month) => `<th>${month}</th>`).join("")}<th>After Dec 26</th><th>Total</th></tr></thead>
          <tbody>
            <tr>
              ${monthlyTotals.map((total, index) => `<td>${total ? `<button class="table-link cashflow-total ${state.selectedCashflowMonthIndex !== null && Number(state.selectedCashflowMonthIndex) === index ? "active" : ""}" type="button" data-cashflow-month="${index}" onclick="selectCashflowMonth(${index})">${money(total)}</button>` : "-"}</td>`).join("")}
              <td>${afterYearTotal ? money(afterYearTotal) : "-"}</td>
              <td>${money(sum(monthlyTotals) + afterYearTotal)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    ${state.selectedCashflowMonthIndex !== null ? `
      <section class="section">
        <div class="section-head">
          <h2>${months[Number(state.selectedCashflowMonthIndex)]} cashflow breakdown</h2>
          <div class="section-actions">
            <span class="pill">${money(selectedMonthTotal)}</span>
            <button class="secondary" type="button" data-cashflow-clear onclick="clearCashflowMonth()">Clear month</button>
          </div>
        </div>
        <div class="table-wrap">${cashflowDealsTable(selectedMonthDeals)}</div>
      </section>
    ` : ""}
    <section class="section">
      <div class="section-head"><h2>Payment due report</h2><span class="pill">${deals.length} deals</span></div>
      <div class="table-wrap">${cashflowDealsTable(deals)}</div>
    </section>
  `;
}

function selectCashflowMonth(monthIndex) {
  state.selectedCashflowMonthIndex = Number(monthIndex);
  app();
}

function clearCashflowMonth() {
  state.selectedCashflowMonthIndex = null;
  app();
}

function reportsView() {
  if (state.activeReportsTab === "remittance") return talentRemittanceView();
  const deals = visibleCrmDeals();
  const talents = reportTalentOptions(deals);
  if (!state.selectedReportTalentKey || !talents.some((talent) => talent.key === state.selectedReportTalentKey)) {
    state.selectedReportTalentKey = talents[0]?.key || null;
  }
  const selected = talents.find((talent) => talent.key === state.selectedReportTalentKey);
  const talentDeals = selected ? deals.filter((deal) => deal.managerId === selected.managerId && deal.talentName === selected.talentName) : [];
  const unpaidInvoices = talentDeals
    .filter((deal) => deal.xeroInvoiceId && deal.stage === "Invoiced")
    .sort((a, b) => crmDueMonthIndex(a) - crmDueMonthIndex(b));
  const nextDueIndex = unpaidInvoices.length ? crmDueMonthIndex(unpaidInvoices[0]) : null;
  const nextPaymentDeals = talentDeals.filter((deal) => deal.stage === "On Next Payment Run");
  const paidDeals = talentDeals.filter((deal) => deal.stage === "Paid");
  const reportStageList = hasAllRosterAccess() ? reportStages : managerReportStages;
  const onNextPaymentRunDeals = uniqueDeals(nextPaymentDeals);
  const selectedEmail = selected ? talentEmail(selected.managerId, selected.talentName) : "";
  const productionChargebacks = selected ? productionChargebacksForTalent(selected.managerId, selected.talentName) : [];
  const nextRunDate = nextPaymentRunDate();
  const bucketDeals = {
    Conversation: talentDeals.filter((deal) => deal.stage === "Conversation"),
    Negotiation: talentDeals.filter((deal) => deal.stage === "Negotiation"),
    "Contract Signed": talentDeals.filter((deal) => deal.stage === "Contract Signed" || deal.stage === "To Be Invoiced"),
    Invoiced: talentDeals.filter((deal) => deal.stage === "Invoiced"),
    Paid: talentDeals.filter((deal) => deal.stage === "Paid"),
    "On Next Payment Run": onNextPaymentRunDeals
  };

  return `
    ${header("Reports", selected ? `${selected.talentName} - ${managerName(selected.managerId)}` : "Talent deal stage and payment run reporting")}
    ${reportsTabSwitcher()}
    <section class="section">
      <div class="section-head">
        <h2>Choose talent</h2>
        <div class="section-actions">
          <button class="secondary" data-report-nav="previous">Previous</button>
          <select class="compact-select" data-report-talent>
            ${talents.map((talent) => `<option value="${talent.key}" ${state.selectedReportTalentKey === talent.key ? "selected" : ""}>${talent.talentName} - ${managerName(talent.managerId)}</option>`).join("")}
          </select>
          <button class="secondary" data-report-nav="next">Next</button>
          <button class="primary" data-send-report-to-talent="${state.selectedReportTalentKey || ""}">Send to talent</button>
        </div>
      </div>
      ${selected ? `<div class="section-body"><div class="notice">${selectedEmail ? `Report will send to ${selectedEmail}.` : "Add this talent's email in the Talent tab before sending their weekly report."}</div></div>` : ""}
      ${selected ? `
        ${paymentRunReportBanner(nextRunDate)}
        <div class="section-body"><div class="notice success-notice">Amounts shown on this report are talent payable amounts: 80% of the deal amount plus 100% of any approved talent expenses on that deal.</div></div>
        <div class="report-stage-grid">
          ${reportStageList.map((stage) => reportStageColumn(stage, bucketDeals[stage] || [], nextDueIndex, nextRunDate)).join("")}
        </div>
        ${productionChargebacks.length ? productionChargebacksReport(productionChargebacks) : ""}
      ` : `<div class="section-body"><div class="notice">No talent deals are visible in this report yet.</div></div>`}
    </section>
  `;
}

function reportsTabSwitcher() {
  return `
    <section class="section soft-section">
      <div class="section-head">
        <h2>Reports</h2>
        <div class="segmented">
          <button class="${state.activeReportsTab !== "remittance" ? "active" : ""}" data-report-tab="status">Talent reports</button>
          <button class="${state.activeReportsTab === "remittance" ? "active" : ""}" data-report-tab="remittance">Talent remittance</button>
        </div>
      </div>
    </section>
  `;
}

function talentRemittanceView() {
  const deals = visibleCrmDeals();
  const talents = reportTalentOptions(deals);
  if (!state.selectedRemittanceTalentKey || !talents.some((talent) => talent.key === state.selectedRemittanceTalentKey)) {
    state.selectedRemittanceTalentKey = talents[0]?.key || null;
  }
  const selected = talents.find((talent) => talent.key === state.selectedRemittanceTalentKey);
  const monthRange = monthDateRange(state.remittanceMonthIndex);
  const startDate = state.remittanceMode === "month" ? monthRange.startDate : state.remittanceStartDate;
  const endDate = state.remittanceMode === "month" ? monthRange.endDate : state.remittanceEndDate;
  const periodLabel = state.remittanceMode === "month" ? monthRange.label : `${displayDate(startDate)} to ${displayDate(endDate)}`;
  const selectedEmail = selected ? talentEmail(selected.managerId, selected.talentName) : "";
  const paidDeals = selected ? deals
    .filter((deal) => deal.managerId === selected.managerId && deal.talentName === selected.talentName && ["Paid", "On Next Payment Run"].includes(deal.stage))
    .filter((deal) => isDateInRange(crmPaidDate(deal), startDate, endDate))
    .sort((a, b) => new Date(crmPaidDate(a)) - new Date(crmPaidDate(b))) : [];
  const dealTotal = paidDeals.reduce((total, deal) => total + talentPayableAmount(deal), 0);
  const expenseTotal = paidDeals.reduce((total, deal) => total + dealTalentExpenseTotal(deal.id), 0);
  return `
    ${header("Talent Remittance", selected ? `${selected.talentName} - ${periodLabel}` : "Paid deals by date period")}
    ${reportsTabSwitcher()}
    <section class="section">
      <div class="section-head">
        <h2>Build remittance</h2>
        <div class="section-actions">
          <select class="compact-select" data-remittance-talent>
            ${talents.map((talent) => `<option value="${talent.key}" ${state.selectedRemittanceTalentKey === talent.key ? "selected" : ""}>${talent.talentName} - ${managerName(talent.managerId)}</option>`).join("")}
          </select>
          <button class="primary" data-send-remittance="${state.selectedRemittanceTalentKey || ""}">Send remittance</button>
        </div>
      </div>
      <div class="section-body">
        <div class="filter-grid">
          <div class="field">
            <label>Period type</label>
            <select data-remittance-mode>
              <option value="month" ${state.remittanceMode === "month" ? "selected" : ""}>Choose by month</option>
              <option value="custom" ${state.remittanceMode === "custom" ? "selected" : ""}>Choose date range</option>
            </select>
          </div>
          ${state.remittanceMode === "month" ? `
            <div class="field">
              <label>Month</label>
              <select data-remittance-month>
                ${months.map((month, index) => `<option value="${index}" ${Number(state.remittanceMonthIndex) === index ? "selected" : ""}>${month}</option>`).join("")}
              </select>
            </div>
          ` : `
            <div class="field">
              <label>Start date</label>
              <input type="date" value="${state.remittanceStartDate}" data-remittance-date="start" />
            </div>
            <div class="field">
              <label>End date</label>
              <input type="date" value="${state.remittanceEndDate}" data-remittance-date="end" />
            </div>
          `}
        </div>
      </div>
      <div class="section-body">
        <div class="payment-run-banner remittance-summary">
          <div>
            <span>Remittance period</span>
            <strong>${periodLabel}</strong>
          </div>
          <p>${selectedEmail ? `Ready to send to ${selectedEmail}.` : "Add this talent's email in the Talent tab before sending."} Amounts are talent payable: 80% of each deal plus 100% of approved job expenses, with invoice references and attachments included.</p>
        </div>
      </div>
      <div class="section-body invoice-summary-grid">
        <div class="earning"><span>Paid deals</span><strong>${paidDeals.length}</strong></div>
        <div class="earning"><span>Talent payable</span><strong>${money(dealTotal)}</strong></div>
        <div class="earning"><span>Expenses included</span><strong>${money(expenseTotal)}</strong></div>
      </div>
      <div class="table-wrap">${talentRemittanceTable(paidDeals)}</div>
    </section>
    ${state.talentRemittanceSends.length ? `
      <section class="section soft-section">
        <div class="section-head"><h2>Recent remittance sends</h2><span class="pill confirmed">${state.talentRemittanceSends.length}</span></div>
        <div class="section-body manager-list">
          ${state.talentRemittanceSends.slice(0, 6).map((send) => `
            <article class="deal">
              <div class="deal-line"><strong>${send.talentName}</strong><span>${send.periodLabel}</span></div>
              <div class="deal-line muted"><span>Email</span><span>${send.email || "No email"}</span></div>
              <div class="deal-line muted"><span>Included</span><span>${send.dealCount} deals · ${send.invoiceCount} invoices · ${money(send.expenseTotal)} expenses</span></div>
              <div class="deal-line muted"><span>Sent</span><span>${displayDate(send.sentAt.slice(0, 10))}</span></div>
            </article>
          `).join("")}
        </div>
      </section>
    ` : ""}
  `;
}

function talentRemittanceTable(deals) {
  if (!deals.length) return `<div class="section-body"><div class="notice">No paid deals in this period.</div></div>`;
  return `
    <table>
      <thead>
        <tr>
          <th>Paid date</th>
          <th>Company</th>
          <th>Campaign</th>
          <th>Gross deal</th>
          <th>Talent payable</th>
          <th>Invoice</th>
          <th>Expenses attached</th>
        </tr>
      </thead>
      <tbody>
        ${deals.map((deal) => {
          const expenses = dealTalentExpenses(deal.id);
          return `
            <tr>
              <td>${displayDate(crmPaidDate(deal))}</td>
              <td>${deal.company || "-"}</td>
              <td>${deal.campaignName || "-"}</td>
              <td>${dealMoney(deal)}</td>
              <td>${money(talentPayableAmount(deal))}</td>
              <td>${deal.xeroInvoiceId ? `<a href="${xeroInvoiceUrl(deal)}" target="_blank" rel="noopener">${deal.xeroInvoiceId}</a>` : "No invoice attached"}</td>
              <td>${expenses.length ? expenses.map((expense) => `${money(expense.amount)}${expense.receiptData ? ` - <a href="${expense.receiptData}" target="_blank" rel="noopener">${expense.receiptName || "receipt"}</a>` : ""}`).join("<br>") : "No expenses"}</td>
            </tr>
          `;
        }).join("")}
      </tbody>
    </table>
  `;
}

function paymentRunReportBanner(nextRunDate) {
  return `
    <div class="section-body payment-run-banner-wrap">
      <div class="payment-run-banner">
        <div>
          <span>Next payment run</span>
          <strong>${displayDate(nextRunDate)}</strong>
        </div>
        <p>Payment runs are made on the 14th and 28th. If either date falls on a weekend, payment is made the Friday before.</p>
      </div>
    </div>
  `;
}

function productionChargebacksForTalent(managerId, talentName) {
  return state.productionRequests
    .filter((request) => request.managerId === managerId && request.talentName === talentName && request.financeStatus === "Chargeback requested")
    .sort((a, b) => new Date(a.shootDate) - new Date(b.shootDate));
}

function productionChargebacksReport(requests) {
  const total = requests.reduce((sumTotal, request) => sumTotal + Number(request.amount || 0), 0);
  return `
    <section class="section soft-section nested-report-section">
      <div class="section-head">
        <h2>Production chargebacks</h2>
        <span class="pill pipeline">${money(total)} on next payment run</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date of shoot</th>
              <th>Chargeback payment run</th>
              <th>Items of shoot</th>
              <th>Amount to deduct</th>
            </tr>
          </thead>
          <tbody>
            ${requests.map((request) => `
              <tr>
                <td>${displayDate(request.shootDate)}</td>
                <td>${displayDate(request.chargebackPaymentRunDate || productionPaymentRunDate(request.shootDate))}</td>
                <td>${productionItemsLabel(request)}</td>
                <td>${money(request.amount)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
      <div class="section-body"><div class="notice">Production chargebacks are deducted on the shoot week's payment run: the 14th or 28th of the month. If that date falls on a weekend, the run is moved to the Friday before.</div></div>
    </section>
  `;
}

function reportTalentOptions(deals) {
  const rows = new Map();
  visibleManagerUsers().forEach((manager) => {
    talentOptions(manager.id).forEach((talentName) => {
      rows.set(talentKey(manager.id, talentName), {
        key: talentKey(manager.id, talentName),
        managerId: manager.id,
        talentName
      });
    });
  });
  deals.forEach((deal) => rows.set(talentKey(deal.managerId, deal.talentName), {
    key: talentKey(deal.managerId, deal.talentName),
    managerId: deal.managerId,
    talentName: deal.talentName
  }));
  return [...rows.values()].sort((a, b) => a.talentName.localeCompare(b.talentName) || managerName(a.managerId).localeCompare(managerName(b.managerId)));
}

function reportStageColumn(stage, deals, nextDueIndex, nextRunDate) {
  const total = deals.reduce((sumTotal, deal) => sumTotal + talentPayableAmount(deal), 0);
  const subtitle = stage === "Paid" ? "Paid to talent" : stage === "On Next Payment Run" ? `Next run: ${displayDate(nextRunDate)}` : `${deals.length} deals`;
  return `
    <div class="report-stage ${stageClass(stage)}">
      <div class="report-stage-head">
        <span>${stage}</span>
        <strong>${money(total)}</strong>
        <small>${subtitle}</small>
      </div>
      <div class="report-stage-list">
        ${deals.length ? deals.map((deal) => reportDealCard(deal, stage)).join("") : `<div class="crm-empty">No deals</div>`}
      </div>
    </div>
  `;
}

function reportDealCard(deal, stage) {
  const dueDate = crmDueDate(deal);
  const dateLabel = stage === "Paid" ? "Paid date" : "Due date";
  const displayValue = stage === "Paid" ? crmPaidDate(deal) : dueDate;
  const showDate = stage !== "On Next Payment Run";
  const overdue = stage === "Invoiced" && isDateOverdue(dueDate);
  const talentShare = dealGbpAmount(deal) * 0.8;
  const talentExpenses = dealTalentExpenseTotal(deal.id);
  return `
    <article class="report-card compact-report-card ${overdue ? "overdue-report-card" : ""}">
      <div class="report-card-head">
        <div>
          <strong>${deal.company || "Company needed"}</strong>
          <span>${deal.campaignName || "No campaign name"}</span>
        </div>
        <strong>${money(talentPayableAmount(deal))}</strong>
      </div>
      <div class="talent-payable-note">Talent payable: 80% deal share ${money(talentShare)}${talentExpenses ? ` + expenses ${money(talentExpenses)}` : ""}</div>
      ${showDate ? `<div class="report-card-grid">
        <div><span>${dateLabel}</span><strong class="${overdue ? "overdue-text" : ""}">${displayDate(displayValue)}</strong></div>
      </div>` : ""}
      ${overdue ? `<div class="overdue-message">This payment is being chased by accounts</div>` : ""}
    </article>
  `;
}

function header(title, subtitle) {
  return `
    <div class="topbar">
      <div>
        <p class="eyebrow">Cowshed Creators Portal</p>
        <h1>${title}</h1>
      </div>
      <div class="asof">${subtitle}</div>
    </div>
  `;
}

function kpis(model, mode) {
  const revenue = sum(model.actual);
  const target = sum(model.target);
  const cos = sum(model.cos);
  const overheads = sum(model.overheads);
  const net = sum(model.netProfit);
  return `
    <div class="kpi-grid">
      <div class="kpi"><span>${mode === "pipeline" ? "Pipeline revenue" : "Live revenue"}</span><strong>${money(revenue)}</strong><small>${money(revenue - target)} vs target</small></div>
      <div class="kpi"><span>Cost of sale</span><strong>${money(cos)}</strong><small>COS defaults to 80%, adjustable per deal</small></div>
      <div class="kpi"><span>Overheads</span><strong>${money(overheads)}</strong><small>Admin maintained</small></div>
      <div class="kpi"><span>Net profit</span><strong class="${net < 0 ? "negative" : "positive"}">${money(net)}</strong><small>${mode === "pipeline" ? "Including pipeline" : "Confirmed only"}</small></div>
    </div>
  `;
}

function matrixTable(rows) {
  return `
    <table>
      <thead>
        <tr>
          <th>Line item</th>
          ${months.map((month) => `<th>${month}</th>`).join("")}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map((row) => {
          if (row.type === "section") return `<tr class="section-row"><td colspan="14">${row.label}</td></tr>`;
          return `
            <tr class="${row.total ? "total-row" : ""}">
              <td>${row.label}</td>
              ${months.map((_, index) => tableValue(row, index)).join("")}
              <td class="${row.polarity ? polarityClass(sum(row.values)) : ""}">${money(sum(row.values))}</td>
            </tr>
          `;
        }).join("")}
      </tbody>
    </table>
  `;
}

function tableValue(row, index) {
  if (row.editable) return `<td>${editableCell(row, index)}</td>`;
  const value = row.values[index];
  return `<td class="${row.polarity ? polarityClass(value) : ""}">${money(value)}</td>`;
}

function polarityClass(value) {
  if (Number(value) > 0) return "positive";
  if (Number(value) < 0) return "negative";
  return "";
}

function editableCell(row, monthIndex) {
  const key = row.editType === "target" ? "target" : "overhead";
  const rowId = row.id || "target";
  const derived = Number((row.derivedValues || [])[monthIndex] || 0);
  return `<input class="table-input" data-edit="${key}" data-row-id="${rowId}" data-month="${monthIndex}" data-derived="${derived}" inputmode="decimal" value="${currencyInput(row.values[monthIndex])}" aria-label="${row.label} ${months[monthIndex]}" />`;
}

function talentOptions(managerId) {
  return state.talents[managerId] || [];
}

function talentKey(managerId, talentName) {
  return `${managerId}::${talentName}`;
}

function talentEmail(managerId, talentName) {
  return state.talentEmails[talentKey(managerId, talentName)] || "";
}

function talentProfile(managerId, talentName) {
  const key = talentKey(managerId, talentName);
  return state.talentProfiles[key] || {
    bio: "",
    imageUrl: "",
    imageSource: "",
    platforms: { youtube: false, instagram: false, tiktok: false },
    handles: { youtube: "", instagram: "", tiktok: "" },
    stats: { youtube: normalizeSocialStats(), instagram: normalizeSocialStats(), tiktok: normalizeSocialStats() },
    updatedAt: ""
  };
}

function canEditTalentProfile(managerId) {
  return state.user?.role === "admin" || (state.user?.role === "manager" && state.user.id === managerId);
}

function allRosterTalentRows() {
  return managerUsers().flatMap((manager) => talentOptions(manager.id).map((talentName) => ({
    key: talentKey(manager.id, talentName),
    managerId: manager.id,
    talentName
  }))).sort((a, b) => a.talentName.localeCompare(b.talentName) || managerName(a.managerId).localeCompare(managerName(b.managerId)));
}

function profileImageUrl(managerId, talentName) {
  const profile = talentProfile(managerId, talentName);
  return profile.imageUrl || generatedTalentImage(managerId, talentName);
}

function generatedTalentImage(managerId, talentName) {
  const colors = ["#f6ee45", "#37b8a9", "#ef6aa4", "#111111", "#f1f4ef"];
  const hash = Math.abs(hashString(`${managerId}-${talentName}`));
  const bg = colors[hash % colors.length];
  const fg = bg === "#111111" ? "#f6ee45" : "#111111";
  const initials = String(talentName || "?").split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1100" viewBox="0 0 900 1100"><rect width="900" height="1100" fill="${bg}"/><circle cx="735" cy="185" r="120" fill="${fg}" opacity=".12"/><circle cx="135" cy="920" r="180" fill="${fg}" opacity=".1"/><text x="450" y="560" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="170" font-weight="900" fill="${fg}">${initials}</text><text x="450" y="680" text-anchor="middle" font-family="Arial, sans-serif" font-size="38" font-weight="800" letter-spacing="8" fill="${fg}">COWSHED</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function socialPlatformLabel(platform) {
  if (platform === "youtube") return "YouTube";
  if (platform === "instagram") return "Instagram";
  if (platform === "tiktok") return "TikTok";
  return platform;
}

function compactNumber(value) {
  const amount = Number(value || 0);
  if (amount >= 1000000) return `${(amount / 1000000).toFixed(amount >= 10000000 ? 0 : 1)}M`;
  if (amount >= 1000) return `${(amount / 1000).toFixed(amount >= 100000 ? 0 : 1)}K`;
  return String(Math.round(amount));
}

function simulatedSocialStats(managerId, talentName, platform, handle) {
  const base = Math.abs(hashString(`${managerId}-${talentName}-${platform}-${handle || "handle"}`));
  const multiplier = platform === "youtube" ? 320 : platform === "instagram" ? 420 : 520;
  const audience = 12000 + ((base % 8200) * multiplier);
  const views = audience * (platform === "youtube" ? 6 : platform === "tiktok" ? 9 : 3);
  const engagement = 2.4 + ((base % 46) / 10);
  return {
    audience,
    views,
    engagement,
    label: platform === "youtube" ? "Subscribers" : "Followers"
  };
}

function enabledSocialProfiles(managerId, talentName) {
  const profile = talentProfile(managerId, talentName);
  return ["instagram", "tiktok", "youtube"].filter((platform) => profile.platforms[platform] && profile.handles[platform]);
}

function rosterChips(managerId) {
  const talents = talentOptions(managerId);
  if (!talents.length) return `<div class="notice">No talent added yet.</div>`;
  return talents.map((name) => `
    <span class="chip">
      ${name}
      <button type="button" data-remove-talent="${managerId}::${name}" aria-label="Remove ${name}">x</button>
    </span>
  `).join("");
}

function managerEarnings(mode = "pipeline", managerId = null) {
  const allowedIds = Array.isArray(managerId) ? managerId : null;
  const managers = managerUsers().filter((user) => {
    if (allowedIds) return allowedIds.includes(user.id);
    return !managerId || user.id === managerId;
  });
  const rows = managers.map((manager) => ({
    manager,
    total: sum(dealRevenue(mode, manager.id))
  })).sort((a, b) => b.total - a.total);

  return `
    <div class="earnings-grid">
      ${rows.map(({ manager, total }) => `
        <button class="earning manager-earning ${state.selectedManagerId === manager.id ? "active" : ""}" data-manager-detail="${manager.id}">
          <span>${manager.name}</span>
          <strong>${money(total)}</strong>
        </button>
      `).join("")}
    </div>
    ${managerRosterDetail(state.selectedManagerId || rows[0]?.manager.id, mode)}
  `;
}

function managerRosterDetail(managerId, mode = "pipeline") {
  if (!managerId) return "";
  const deals = scopedDeals(mode, managerId);
  const totals = new Map();
  talentOptions(managerId).forEach((talent) => totals.set(talent, 0));
  deals.forEach((deal) => totals.set(deal.talentName, (totals.get(deal.talentName) || 0) + sum(deal.monthValues)));
  const rows = [...totals.entries()].sort((a, b) => b[1] - a[1]);
  return `
    <div class="roster-panel">
      <div class="roster-title">
        <h3>${managerName(managerId)} roster</h3>
        <span>${mode === "pipeline" ? "Confirmed + pipeline" : "Confirmed only"}</span>
      </div>
      <div class="roster-table">
        ${rows.length ? rows.map(([talent, total]) => `
          <div><span>${talent}</span><strong>${money(total)}</strong></div>
        `).join("") : `<div class="notice">No talent added yet.</div>`}
      </div>
    </div>
  `;
}

function commissionTabView() {
  const managerId = hasAllRosterAccess() ? null : accessibleManagerIds();
  return `
    ${header("Commission", hasAllRosterAccess() ? "Monthly commission split by manager" : "Your monthly commission tracker")}
    <section class="section">
      <div class="section-head"><h2>Commission rules</h2><span class="pill confirmed">Editable rate above threshold</span></div>
      <div class="section-body">
        <div class="notice">Commission unlocks once monthly confirmed revenue is above 5x that manager's monthly salary, then pays the manager's commission rate on that month's revenue. Admin can adjust salary and commission percentage below.</div>
      </div>
    </section>
    ${commissionView(managerId)}
    ${state.user.role === "admin" ? commissionOverridesAdminView() : ""}
  `;
}

function commissionOverridesAdminView() {
  const managers = managerUsers();
  return `
    <section class="section soft-section">
      <div class="section-head"><h2>Shared roster commission</h2><span class="pill admin">Admin only</span></div>
      <div class="section-body">
        <form class="form-grid" data-commission-override-form>
          <div class="field">
            <label for="overrideRecipient">Manager receiving commission</label>
            <select id="overrideRecipient" name="recipientManagerId">
              ${managers.map((manager) => `<option value="${manager.id}">${manager.name}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="overrideRoster">Roster commission is based on</label>
            <select id="overrideRoster" name="rosterManagerId">
              ${managers.map((manager) => `<option value="${manager.id}">${manager.name}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <label for="overrideRate">Commission %</label>
            <input id="overrideRate" name="rate" type="number" min="0" step="0.1" value="0.2" />
          </div>
          <div class="field">
            <label for="overrideStartMonth">Starts from</label>
            <select id="overrideStartMonth" name="startMonthIndex">
              ${months.map((month, index) => `<option value="${index}">${month}</option>`).join("")}
            </select>
          </div>
          <button class="primary wide" type="submit">Add shared commission</button>
        </form>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Receiving manager</th>
              <th>Roster</th>
              <th>Commission %</th>
              <th>Starts from</th>
              <th>Year value</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            ${state.commissionOverrides.length ? state.commissionOverrides.map((override) => `
              <tr>
                <td>${managerName(override.recipientManagerId)}</td>
                <td>${managerName(override.rosterManagerId)}</td>
                <td>
                  <input class="mini-input" data-override-rate="${override.id}" value="${override.rate}" inputmode="decimal" />
                </td>
                <td>
                  <select class="compact-select" data-override-start="${override.id}">
                    ${months.map((month, index) => `<option value="${index}" ${Number(override.startMonthIndex || 0) === index ? "selected" : ""}>${month}</option>`).join("")}
                  </select>
                </td>
                <td>${money(sum(monthlyOverrideCommission(override)))}</td>
                <td><button class="secondary danger-button" data-remove-override="${override.id}">Remove</button></td>
              </tr>
            `).join("") : `<tr><td colspan="6">No shared roster commission added yet.</td></tr>`}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function monthlyOverrideCommission(override) {
  return monthlyManagerRevenue(override.rosterManagerId).map((revenue, index) => {
    if (index < Number(override.startMonthIndex || 0)) return 0;
    return revenue * (Number(override.rate || 0) / 100);
  });
}

function commissionView(managerId = null) {
  const allowedIds = Array.isArray(managerId) ? managerId : null;
  const managers = managerUsers().filter((manager) => {
    if (allowedIds) return allowedIds.includes(manager.id);
    return !managerId || manager.id === managerId;
  });
  return `
    <div class="commission-sections">
      ${managers.map((manager) => {
        const rows = [
          { label: "Confirmed revenue", values: monthlyManagerRevenue(manager.id) },
          { label: "More revenue needed", values: monthlyManagerCommissionGap(manager.id) },
          { label: state.user.role === "admin" || hasSharedCommission(manager.id) ? "Own commission" : "Commission", values: monthlyManagerOwnCommission(manager.id) },
          ...(state.user.role === "admin" || hasSharedCommission(manager.id) ? [{ label: "Shared roster commission", values: monthlyManagerSharedCommission(manager.id) }] : []),
          ...(state.user.role === "admin" || hasSharedCommission(manager.id) ? [{ label: "Commission", values: monthlyManagerCommission(manager.id), total: true }] : [])
        ];
        const quarterlyCommission = quarterTotals(monthlyManagerCommission(manager.id));
        return `
          <section class="section soft-section commission-manager">
            <div class="section-head">
              <div>
                <h2>${manager.name}</h2>
                <div class="muted">Threshold: ${money(managerSalary(manager.id) * 5)} per month</div>
              </div>
              <div class="section-actions">
                ${state.user.role === "admin" ? `
                  <label class="salary-control">
                    Salary
                    <input data-salary-manager="${manager.id}" value="${currencyInput(managerSalary(manager.id))}" inputmode="decimal" />
                  </label>
                  <label class="salary-control">
                    Commission %
                    <input data-rate-manager="${manager.id}" value="${managerCommissionRate(manager.id)}" inputmode="decimal" />
                  </label>
                ` : ""}
                <span class="pill confirmed">${managerCommissionRate(manager.id)}% rate</span>
                <span class="pill confirmed">${money(sum(monthlyManagerCommission(manager.id)))} commission</span>
              </div>
            </div>
            <div class="table-wrap">${matrixTable(rows)}</div>
            <div class="quarter-grid">
              ${["Q1", "Q2", "Q3", "Q4"].map((quarter, index) => `
                <div class="quarter-tile">
                  <span>${quarter} commission</span>
                  <strong>${money(quarterlyCommission[index])}</strong>
                </div>
              `).join("")}
            </div>
          </section>
        `;
      }).join("")}
    </div>
  `;
}

function dealCards(deals, allowDelete = false) {
  if (!deals.length) return `<div class="notice">No deals in this view yet.</div>`;
  return deals.map((deal) => {
    const totalRevenue = sum(deal.monthValues);
    const monthLabel = months.find((_, index) => Number(deal.monthValues[index] || 0) > 0) || "Multi-month";
    return `
      <article class="deal">
        <div class="deal-line">
          <strong>${deal.talentName}</strong>
          <span class="pill ${deal.status.toLowerCase()}">${deal.status}</span>
        </div>
        <div class="deal-line muted"><span>Campaign</span><span>${deal.campaignName}</span></div>
        <div class="deal-line muted"><span>Amount</span><span>${money(totalRevenue)}</span></div>
        <div class="deal-line muted"><span>Month</span><span>${monthLabel}</span></div>
        ${allowDelete ? `<button class="ghost remove-button" data-delete="${deal.id}">Remove deal</button>` : ""}
      </article>
    `;
  }).join("");
}

function crmStageBoard(deals) {
  return `
    <div class="crm-board">
      ${crmStages.map((stage) => {
        const stageDeals = deals.filter((deal) => deal.stage === stage);
        const stageTotal = stageDeals.reduce((total, deal) => total + dealGbpAmount(deal), 0);
        const isPaidStage = stage === "Paid";
        const isPaidOpen = !isPaidStage || state.crmPaidOpen;
        return `
          <div class="crm-column ${stageClass(stage)} ${isPaidStage && !isPaidOpen ? "crm-column-collapsed" : ""}" data-crm-stage-drop="${stage}">
            <div class="crm-column-head">
              <span>${stage}</span>
              <strong>${money(stageTotal)}</strong>
            </div>
            ${isPaidStage ? `
              <button class="crm-paid-toggle" type="button" data-crm-paid-toggle aria-expanded="${state.crmPaidOpen ? "true" : "false"}">
                <span>${state.crmPaidOpen ? "Hide paid deals" : "Show paid deals"}</span>
                <strong>${stageDeals.length} deals</strong>
              </button>
            ` : ""}
            ${isPaidOpen ? `
              <div class="crm-card-list" data-crm-stage-drop="${stage}">
                ${stageDeals.length ? stageDeals.map((deal) => crmDealCard(deal)).join("") : `<div class="crm-empty">No deals</div>`}
              </div>
            ` : ""}
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function crmDealCard(deal) {
  const selected = state.selectedCrmDealId === deal.id;
  const draggable = canEditCrmDeal(deal);
  return `
    <button class="crm-card ${selected ? "active" : ""}" data-crm-detail="${deal.id}" data-crm-drag="${deal.id}" draggable="${draggable ? "true" : "false"}">
      <strong>${deal.talentName}${deal.company ? ` x ${deal.company}` : ""}</strong>
      <span>${dealMoney(deal)}</span>
      <small>${deal.emailContact || "No email contact"}</small>
      <div class="crm-tags">
        <em>${deal.talentName}</em>
        <em>${managerName(deal.managerId)}</em>
        <em class="${deal.direction.toLowerCase()}">${deal.direction}</em>
        ${deal.pAndLDealId ? `<em>P&L sent</em>` : ""}
        ${deal.xeroInvoiceId ? `<em>Xero invoice</em>` : ""}
      </div>
      <small>${crmPaymentLabel(deal)} · due ${crmDueMonthLabel(deal)}</small>
    </button>
  `;
}

function crmDealDetailOverlay(deal) {
  return `
    <div class="crm-detail-overlay" data-crm-detail-overlay>
      <section class="crm-detail-modal" role="dialog" aria-modal="true" aria-label="${deal.talentName} deal details">
        <button class="crm-detail-close" type="button" data-crm-close-detail aria-label="Close deal details">×</button>
        <div class="section-head">
          <h2>Deal details</h2>
          <span class="pill ${deal.direction.toLowerCase()}">${deal.direction}</span>
        </div>
        <div class="section-body">
          ${crmDealDetailPanel(deal)}
        </div>
      </section>
    </div>
  `;
}

function crmDealDetailPanel(deal) {
  const editable = canEditCrmDeal(deal);
  const deletable = canDeleteCrmDeal(deal);
  return `
    <div class="crm-detail-grid">
      <div class="crm-detail-title">
        <strong>${deal.talentName}${deal.company ? ` x ${deal.company}` : ""}</strong>
        <span>${dealMoney(deal)} · ${deal.stage}</span>
      </div>
      ${deal.xeroStatus && !deal.xeroInvoiceId ? `<div class="notice wide">Xero invoice not created yet: ${deal.xeroStatus}</div>` : ""}
      <div class="field">
        <label>Talent</label>
        ${editable ? `<input data-crm-update="${deal.id}" data-field="talentName" value="${deal.talentName}" />` : `<div class="read-field">${deal.talentName}</div>`}
      </div>
      <div class="field">
        <label>Company name</label>
        ${editable ? `<input data-crm-update="${deal.id}" data-field="company" value="${deal.company}" />` : `<div class="read-field">${deal.company || "-"}</div>`}
      </div>
      <div class="field">
        <label>Campaign</label>
        ${editable ? `<input data-crm-update="${deal.id}" data-field="campaignName" value="${deal.campaignName}" />` : `<div class="read-field">${deal.campaignName || "-"}</div>`}
      </div>
      <div class="field">
        <label>Email addresses</label>
        ${editable ? `<input data-crm-update="${deal.id}" data-field="emailContact" value="${deal.emailContact}" />` : `<div class="read-field">${deal.emailContact || "-"}</div>`}
      </div>
      <div class="field">
        <label>Company address</label>
        ${editable ? `<input data-crm-update="${deal.id}" data-field="billingAddress" value="${deal.billingAddress}" />` : `<div class="read-field">${deal.billingAddress || "-"}</div>`}
      </div>
      <div class="field">
        <label>PO number</label>
        ${editable ? `<input data-crm-update="${deal.id}" data-field="invoiceReference" value="${deal.invoiceReference}" />` : `<div class="read-field">${deal.invoiceReference || "-"}</div>`}
      </div>
      <div class="field checkbox-field">
        <label>No PO number</label>
        ${editable ? `<label class="toggle-line"><input type="checkbox" data-crm-update="${deal.id}" data-field="noPoNumber" ${deal.noPoNumber ? "checked" : ""} /> No PO for this deal</label>` : `<div class="read-field">${deal.noPoNumber ? "No PO" : "-"}</div>`}
      </div>
      <div class="field">
        <label>Xero account code</label>
        ${editable ? `<input data-crm-update="${deal.id}" data-field="xeroAccountCode" value="${deal.xeroAccountCode}" />` : `<div class="read-field">${deal.xeroAccountCode || "-"}</div>`}
      </div>
      <div class="field">
        <label>Xero tax rate</label>
        ${editable ? `
          <select class="compact-select mini-select" data-crm-update="${deal.id}" data-field="xeroTaxRate">
            ${["No VAT", "20% VAT on Income", "Zero Rated Income"].map((rate) => `<option value="${rate}" ${deal.xeroTaxRate === rate ? "selected" : ""}>${rate}</option>`).join("")}
          </select>
        ` : `<div class="read-field">${deal.xeroTaxRate || "-"}</div>`}
      </div>
      <div class="field">
        <label>Inbound or outbound</label>
        ${editable ? crmSelect(deal, "direction", crmDirections) : `<div class="read-field">${deal.direction}</div>`}
      </div>
      <div class="field">
        <label>Stage</label>
        ${editable ? crmSelect(deal, "stage", manualCrmStages) : `<div class="read-field">${deal.stage}</div>`}
      </div>
      <div class="field">
        <label>Deal amount</label>
        ${editable ? `<input data-crm-update="${deal.id}" data-field="amount" value="${dealAmountInput(deal)}" />` : `<div class="read-field">${dealMoney(deal)}</div>`}
      </div>
      <div class="field">
        <label>Currency</label>
        ${editable ? `
          <select class="compact-select mini-select" data-crm-update="${deal.id}" data-field="currency">
            <option value="GBP" ${deal.currency !== "USD" ? "selected" : ""}>GBP</option>
            <option value="USD" ${deal.currency === "USD" ? "selected" : ""}>USD</option>
          </select>
        ` : `<div class="read-field">${deal.currency || "GBP"}</div>`}
      </div>
      <div class="field">
        <label>Payment terms</label>
        ${editable ? crmPaymentSelect(deal) : `<div class="read-field">${crmPaymentLabel(deal)}</div>`}
      </div>
      <div class="field">
        <label>Own time in days</label>
        ${editable ? `<input data-crm-update="${deal.id}" data-field="customPaymentDays" value="${deal.customPaymentDays || ""}" placeholder="Only if custom" />` : `<div class="read-field">${deal.customPaymentDays || "-"}</div>`}
      </div>
      <div class="field">
        <label>Expected payment</label>
        <div class="read-field">${displayDate(crmDueDate(deal))}</div>
      </div>
      <div class="field">
        <label>Manager</label>
        <div class="read-field">${managerName(deal.managerId)}</div>
      </div>
      <div class="field">
        <label>Xero invoice</label>
        <div class="read-field">${deal.xeroInvoiceId ? `${deal.xeroInvoiceId} · ${deal.xeroStatus || "Created"}` : "Not created yet"}</div>
      </div>
      <div class="field">
        <label>Talent expenses on invoice</label>
        <div class="read-field">${money(dealTalentExpenseTotal(deal.id))}</div>
      </div>
      <div class="field">
        <label>Invoice total</label>
        <div class="read-field">${money(dealInvoiceTotal(deal))}</div>
      </div>
      ${dealTalentExpenses(deal.id).length ? `
        <div class="field wide">
          <label>Talent expense receipts</label>
          <div class="manager-list">
            ${dealTalentExpenses(deal.id).map((expense) => `
              <article class="deal">
                <div class="deal-line"><strong>${expense.note || "Talent expense"}</strong><span>${money(expense.amount)}</span></div>
                <div class="deal-line muted"><span>Receipt</span><span>${expense.receiptData ? `<a href="${expense.receiptData}" target="_blank" rel="noopener">${expense.receiptName || "Open receipt"}</a>` : "No receipt attached"}</span></div>
              </article>
            `).join("")}
          </div>
        </div>
      ` : ""}
      <div class="field wide">
        <label>Contract</label>
        <div class="contract-row">
          ${deal.contractData ? `<a href="${deal.contractData}" target="_blank" rel="noopener">${deal.contractName || "Open contract"}</a>` : `<span>No contract uploaded</span>`}
          ${editable ? `<input data-crm-contract="${deal.id}" type="file" />` : ""}
        </div>
      </div>
      ${editable ? `
        <div class="field wide">
          <button class="primary save-detail-button" type="button" data-crm-save="${deal.id}">${state.savedCrmDealId === deal.id ? "Saved" : "Save"}</button>
        </div>
      ` : ""}
      ${deletable ? `
        <div class="field wide">
          <button class="secondary danger-button" type="button" data-delete-crm-deal="${deal.id}">Remove deal from CRM</button>
        </div>
      ` : ""}
    </div>
  `;
}

function stageClass(stage) {
  return `stage-${slugify(stage)}`;
}

function crmDealsTable(deals) {
  return `
    <table>
      <thead>
        <tr>
          <th>Talent</th>
          <th>Manager</th>
          <th>Company</th>
          <th>Contact</th>
          <th>In/out</th>
          <th>Stage</th>
          <th>Amount</th>
          <th>Signed month</th>
          <th>Payment terms</th>
          <th>Due in</th>
          <th>Contract</th>
        </tr>
      </thead>
      <tbody>
        ${deals.length ? deals.map((deal) => {
          const editable = canEditCrmDeal(deal);
          return `
            <tr>
              <td><button class="table-link crm-table-detail" type="button" data-crm-detail="${deal.id}"><strong>${deal.talentName}</strong><br><small>${deal.campaignName || "No campaign"}</small></button></td>
              <td>${managerName(deal.managerId)}</td>
              <td>${editable ? `<input class="mini-input" data-crm-update="${deal.id}" data-field="company" value="${deal.company}" />` : deal.company}</td>
              <td>${editable ? `<input class="mini-input" data-crm-update="${deal.id}" data-field="emailContact" value="${deal.emailContact}" />` : deal.emailContact || "-"}</td>
              <td>${editable ? crmSelect(deal, "direction", crmDirections) : deal.direction}</td>
              <td>${editable ? crmSelect(deal, "stage", manualCrmStages) : deal.stage}</td>
              <td>${editable ? `<input class="mini-input money-mini" data-crm-update="${deal.id}" data-field="amount" value="${dealAmountInput(deal)}" />` : dealMoney(deal)}</td>
              <td>${months[signedMonthIndex(deal)]}</td>
              <td>
                ${editable ? crmPaymentSelect(deal) : crmPaymentLabel(deal)}
                ${editable ? `<input class="mini-input days-mini" data-crm-update="${deal.id}" data-field="customPaymentDays" value="${deal.customPaymentDays || ""}" placeholder="days" />` : ""}
              </td>
              <td>${crmDueMonthLabel(deal)}</td>
              <td>
                ${deal.contractData ? `<a href="${deal.contractData}" target="_blank" rel="noopener">${deal.contractName || "Open"}</a>` : "No contract"}
                ${editable ? `<input class="mini-file" data-crm-contract="${deal.id}" type="file" />` : ""}
              </td>
            </tr>
          `;
        }).join("") : `<tr><td colspan="11">No CRM deals in this view yet.</td></tr>`}
      </tbody>
    </table>
  `;
}

function cashflowDealsTable(deals) {
  return `
    <table>
      <thead>
        <tr>
          <th>Due in</th>
          <th>Talent</th>
          <th>Manager</th>
          <th>Company</th>
          <th>Campaign</th>
          <th>Stage</th>
          <th>Signed month</th>
          <th>Payment terms</th>
          <th>Invoice due date</th>
          <th>Amount due</th>
        </tr>
      </thead>
      <tbody>
        ${deals.length ? deals.map((deal) => `
          <tr>
            <td><strong>${crmDueMonthLabel(deal)}</strong></td>
            <td>${deal.talentName}</td>
            <td>${managerName(deal.managerId)}</td>
            <td>${deal.company}</td>
            <td>${deal.campaignName || "-"}</td>
            <td>${deal.stage}</td>
            <td>${months[signedMonthIndex(deal)]}</td>
            <td>${crmPaymentLabel(deal)}</td>
            <td>${displayDate(crmDueDate(deal))}</td>
            <td>${dealMoney(deal)}</td>
          </tr>
        `).join("") : `<tr><td colspan="10">No CRM payments due yet.</td></tr>`}
      </tbody>
    </table>
  `;
}

function crmSelect(deal, field, options) {
  return `
    <select class="compact-select mini-select" data-crm-update="${deal.id}" data-field="${field}">
      ${options.map((option) => `<option value="${option}" ${deal[field] === option ? "selected" : ""}>${option}</option>`).join("")}
    </select>
  `;
}

function crmPaymentSelect(deal) {
  return `
    <select class="compact-select mini-select" data-crm-update="${deal.id}" data-field="paymentTerm">
      ${paymentTerms.map((term) => `<option value="${term.value}" ${deal.paymentTerm === term.value ? "selected" : ""}>${term.label}</option>`).join("")}
    </select>
  `;
}

function pendingDealCard(deal, allowAction = true) {
  const totalRevenue = sum(deal.monthValues);
  const monthLabel = months.find((_, index) => Number(deal.monthValues[index] || 0) > 0) || "Multi-month";
  const contractHtml = approvalContractHtml(deal);
  return `
    <article class="deal">
      <div class="deal-line">
        <strong>${deal.talentName}</strong>
        <span class="pill pipeline">Pending approval</span>
      </div>
      <div class="deal-line muted"><span>Campaign</span><span>${deal.campaignName}</span></div>
      <div class="deal-line muted"><span>Submitting manager</span><span>${managerName(deal.managerId)}</span></div>
      <div class="deal-line muted"><span>Approver</span><span>${managerName(deal.approverId)}</span></div>
      <div class="deal-line muted"><span>Amount</span><span>${money(totalRevenue)}</span></div>
      <div class="deal-line muted"><span>Month</span><span>${monthLabel}</span></div>
      <div class="deal-line muted"><span>Contract</span><span>${contractHtml}</span></div>
      <div class="deal-actions">
        ${deal.crmDealId ? `<button class="secondary" data-open-crm-deal="${deal.crmDealId}">See deal</button>` : ""}
        ${allowAction ? `
        <button class="primary" data-approve-deal="${deal.id}">Approve</button>
        <button class="secondary danger-button" data-reject-deal="${deal.id}">Reject</button>
        ` : ""}
      </div>
    </article>
  `;
}

function approvalContractHtml(deal) {
  const crmDeal = deal.crmDealId ? state.crmDeals.find((item) => item.id === deal.crmDealId) : null;
  if (crmDeal?.contractData) {
    return `<a href="${crmDeal.contractData}" target="_blank" rel="noopener">${crmDeal.contractName || "Open contract"}</a>`;
  }
  return `<span class="missing-contract">No contract attached</span>`;
}

function pendingExpenseCard(expense, allowAction = true) {
  return `
    <article class="deal">
      <div class="deal-line">
        <strong>${expense.category}</strong>
        <span class="pill pipeline">Pending approval</span>
      </div>
      <div class="deal-line muted"><span>Submitting manager</span><span>${managerName(expense.managerId)}</span></div>
      <div class="deal-line muted"><span>Approver</span><span>${managerName(expense.approverId)}</span></div>
      <div class="deal-line muted"><span>Amount</span><span>${money(expense.amount)}</span></div>
      <div class="deal-line muted"><span>Month</span><span>${months[expense.monthIndex]}</span></div>
      <div class="deal-line muted"><span>Note</span><span>${expense.note}</span></div>
      <div class="deal-line muted"><span>Receipt</span><span>${expense.receiptData ? `<a href="${expense.receiptData}" target="_blank" rel="noopener">${expense.receiptName || "Open receipt"}</a>` : "No file attached"}</span></div>
      ${allowAction ? `<div class="deal-actions">
        <button class="primary" data-approve-expense="${expense.id}">Approve</button>
        <button class="secondary danger-button" data-reject-expense="${expense.id}">Reject</button>
      </div>` : ""}
    </article>
  `;
}

function talentMonthlyDealsTable(deals) {
  const rows = new Map();
  deals.forEach((deal) => {
    const key = `${deal.managerId}::${deal.talentName}`;
    if (!rows.has(key)) {
      rows.set(key, {
        talentName: deal.talentName,
        managerId: deal.managerId,
        values: months.map(() => 0)
      });
    }
    const row = rows.get(key);
    deal.monthValues.forEach((value, index) => {
      row.values[index] += Number(value || 0);
    });
  });
  const orderedRows = [...rows.values()].sort((a, b) => sum(b.values) - sum(a.values) || a.talentName.localeCompare(b.talentName));
  return `
    <div class="roster-panel">
      <div class="roster-title">
        <h3>Deals by talent and month</h3>
        <span>${state.activeDealList === "pipeline" ? "Pipeline only" : "All visible deals"}</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Talent</th>
              <th>Manager</th>
              ${months.map((month) => `<th>${month}</th>`).join("")}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${orderedRows.length ? orderedRows.map((row) => `
              <tr>
                <td>${row.talentName}</td>
                <td>${managerName(row.managerId)}</td>
                ${row.values.map((value) => `<td>${value ? money(value) : "-"}</td>`).join("")}
                <td>${money(sum(row.values))}</td>
              </tr>
            `).join("") : `<tr><td colspan="15">No deal values in this view yet.</td></tr>`}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function removeTalent(key) {
  const [managerId, ...nameParts] = key.split("::");
  const talentName = nameParts.join("::");
  if (!canAccessManager(managerId)) return;
  state.talents[managerId] = (state.talents[managerId] || []).filter((name) => name !== talentName);
  delete state.talentEmails[talentKey(managerId, talentName)];
  delete state.talentInvoiceDetails[talentKey(managerId, talentName)];
  delete state.talentProfiles[talentKey(managerId, talentName)];
  if (state.selectedTalentKey === key) state.selectedTalentKey = null;
  saveState();
  app();
}

function transferTalent(key, nextManagerId) {
  if (state.user.role !== "admin") return;
  const [managerId, ...nameParts] = key.split("::");
  const talentName = nameParts.join("::");
  if (managerId === nextManagerId) return;
  const email = talentEmail(managerId, talentName);
  const invoiceDetails = state.talentInvoiceDetails[talentKey(managerId, talentName)];
  state.talents[managerId] = (state.talents[managerId] || []).filter((name) => name !== talentName);
  state.talents[nextManagerId] = uniqueNames([...(state.talents[nextManagerId] || []), talentName]);
  delete state.talentEmails[talentKey(managerId, talentName)];
  if (email) state.talentEmails[talentKey(nextManagerId, talentName)] = email;
  delete state.talentInvoiceDetails[talentKey(managerId, talentName)];
  if (invoiceDetails) state.talentInvoiceDetails[talentKey(nextManagerId, talentName)] = invoiceDetails;
  const profile = state.talentProfiles[talentKey(managerId, talentName)];
  delete state.talentProfiles[talentKey(managerId, talentName)];
  if (profile) state.talentProfiles[talentKey(nextManagerId, talentName)] = profile;
  state.selectedManagerId = nextManagerId;
  state.selectedTalentKey = `${nextManagerId}::${talentName}`;
  saveState();
  app();
}

function managerName(id) {
  if (id === "admin") return "Admin";
  return (allStaffRecords().find((user) => user.id === id) || {}).name || "Unassigned";
}

function bindLogin() {
  document.querySelector("[data-login-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    state.user = loginUsers().find((user) => user.id === form.get("profile"));
    state.selectedManagerId = state.user.role === "admin" ? "amelia" : state.user.id;
    state.activeView = state.user.role === "admin" ? "pl-live" : "crm";
    app();
  });
}

function pushUndo(action) {
  state.undoStack.push(action);
}

function applyUndo() {
  const action = state.undoStack.pop();
  if (!action) return;
  if (action.kind === "target") {
    state.targets[action.monthIndex] = action.previousValue;
  } else {
    const row = state.overheads.find((item) => item.id === action.rowId);
    if (row) row.values[action.monthIndex] = action.previousValue;
  }
  saveState();
  app();
}

function bindShell() {
  let draggedNavButton = null;
  let navDragMoved = false;
  let suppressNavClick = false;

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", (event) => {
      if (suppressNavClick) {
        event.preventDefault();
        return;
      }
      state.activeView = button.dataset.view;
      if (state.activeView === "crm") {
        state.crmScope = "full";
        state.selectedCrmManagerId = "all";
        state.selectedCrmTalentKey = "all";
        state.activeCrmStage = "all";
        state.selectedCrmDealId = null;
      }
      app();
    });

    button.addEventListener("dragstart", (event) => {
      draggedNavButton = button;
      navDragMoved = false;
      button.classList.add("dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", button.dataset.view);
    });

    button.addEventListener("dragend", () => {
      button.classList.remove("dragging");
      document.querySelectorAll("[data-view]").forEach((item) => item.classList.remove("drag-over"));
      draggedNavButton = null;
      if (navDragMoved) {
        suppressNavClick = true;
        setTimeout(() => {
          suppressNavClick = false;
        }, 0);
      }
      saveNavOrderFromDom();
    });

    button.addEventListener("dragover", (event) => {
      event.preventDefault();
      if (!draggedNavButton || draggedNavButton === button) return;
      button.classList.add("drag-over");
      const nav = button.closest(".nav");
      const rect = button.getBoundingClientRect();
      const shouldInsertAfter = event.clientY > rect.top + rect.height / 2;
      nav.insertBefore(draggedNavButton, shouldInsertAfter ? button.nextSibling : button);
      navDragMoved = true;
    });

    button.addEventListener("dragleave", () => {
      button.classList.remove("drag-over");
    });

    button.addEventListener("drop", (event) => {
      event.preventDefault();
      button.classList.remove("drag-over");
      saveNavOrderFromDom();
    });
  });

  document.querySelector("[data-logout]").addEventListener("click", () => {
    state.user = null;
    app();
  });

  document.querySelectorAll("[data-undo]").forEach((button) => {
    button.addEventListener("click", applyUndo);
  });

  document.querySelectorAll("[data-manager-detail]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedManagerId = button.dataset.managerDetail;
      app();
    });
  });

  document.querySelectorAll("[data-talent-detail]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedTalentKey = button.dataset.talentDetail;
      app();
    });
  });

  document.querySelectorAll("[data-remove-talent]").forEach((button) => {
    button.addEventListener("click", () => {
      removeTalent(button.dataset.removeTalent);
    });
  });

  document.querySelectorAll("[data-transfer-talent]").forEach((select) => {
    select.addEventListener("change", () => {
      transferTalent(select.dataset.transferTalent, select.value);
    });
  });

  document.querySelectorAll("[data-talent-email]").forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        updateTalentEmail(input);
      }
    });
    input.addEventListener("blur", () => updateTalentEmail(input));
  });

  document.querySelectorAll("[data-talent-invoice-detail]").forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        updateTalentInvoiceDetail(input);
      }
    });
    input.addEventListener("blur", () => updateTalentInvoiceDetail(input));
  });

  document.querySelectorAll("[data-save-talent-invoice]").forEach((button) => {
    button.addEventListener("click", () => saveTalentInvoiceDetails(button.dataset.saveTalentInvoice));
  });

  document.querySelectorAll("[data-talent-profile]").forEach((input) => {
    const eventName = input.type === "checkbox" ? "change" : "blur";
    input.addEventListener(eventName, () => updateTalentProfileField(input));
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && input.tagName !== "TEXTAREA") {
        event.preventDefault();
        updateTalentProfileField(input);
      }
    });
  });

  document.querySelectorAll("[data-save-talent-profile]").forEach((button) => {
    button.addEventListener("click", () => saveTalentProfile(button.dataset.saveTalentProfile));
  });

  document.querySelectorAll("[data-pull-social]").forEach((button) => {
    button.addEventListener("click", () => pullTalentSocialStats(button.dataset.pullSocial));
  });

  document.querySelectorAll("[data-media-pack-talent]").forEach((input) => {
    input.addEventListener("change", () => {
      const key = input.dataset.mediaPackTalent;
      const selected = new Set(state.selectedMediaPackTalentKeys || []);
      if (input.checked) selected.add(key);
      else selected.delete(key);
      state.selectedMediaPackTalentKeys = [...selected];
      app();
    });
  });

  document.querySelectorAll("[data-media-pack-select]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedMediaPackTalentKeys = button.dataset.mediaPackSelect === "all" ? allRosterTalentRows().map((row) => row.key) : [];
      app();
    });
  });

  document.querySelectorAll("[data-download-media-pack]").forEach((button) => {
    button.addEventListener("click", downloadMediaPack);
  });

  document.querySelectorAll("[data-talent-invoice-filter]").forEach((field) => {
    field.addEventListener("change", () => {
      if (field.dataset.talentInvoiceFilter === "talent") state.selectedTalentInvoiceTalentKey = field.value;
      if (field.dataset.talentInvoiceFilter === "mode") state.talentInvoiceMode = field.value === "custom" ? "custom" : "month";
      if (field.dataset.talentInvoiceFilter === "month") state.talentInvoiceMonthIndex = Number(field.value || 0);
      state.selectedTalentInvoiceId = null;
      app();
    });
  });

  document.querySelectorAll("[data-talent-invoice-date]").forEach((input) => {
    input.addEventListener("change", () => {
      if (input.dataset.talentInvoiceDate === "start") state.talentInvoiceStartDate = input.value;
      if (input.dataset.talentInvoiceDate === "end") state.talentInvoiceEndDate = input.value;
      state.selectedTalentInvoiceId = null;
      app();
    });
  });

  document.querySelectorAll("[data-talent-invoice]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedTalentInvoiceId = button.dataset.talentInvoice;
      app();
    });
  });

  document.querySelectorAll("[data-mark-talent-invoice-paid]").forEach((button) => {
    button.addEventListener("click", () => markTalentInvoicePaid(button.dataset.markTalentInvoicePaid));
  });

  document.querySelectorAll("[data-see-talent-xero-bill]").forEach((button) => {
    button.addEventListener("click", () => openTalentXeroBill(button.dataset.seeTalentXeroBill));
  });

  document.querySelectorAll("[data-mark-invoice-line-paid-early]").forEach((button) => {
    button.addEventListener("click", () => {
      const [invoiceId, dealId] = button.dataset.markInvoiceLinePaidEarly.split("::");
      markTalentInvoiceLinePaidEarly(invoiceId, dealId);
    });
  });

  document.querySelectorAll("[data-salary-manager]").forEach((input) => {
    input.addEventListener("focus", () => {
      input.value = String(parseCurrency(input.value));
      input.select();
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        updateManagerSalary(input);
      }
    });
    input.addEventListener("blur", () => updateManagerSalary(input));
  });

  document.querySelectorAll("[data-rate-manager]").forEach((input) => {
    input.addEventListener("focus", () => {
      input.select();
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        updateManagerRate(input);
      }
    });
    input.addEventListener("blur", () => updateManagerRate(input));
  });

  const adminRosterManager = document.querySelector("[data-admin-roster-manager]");
  if (adminRosterManager) {
    adminRosterManager.addEventListener("change", () => {
      state.selectedManagerId = adminRosterManager.value;
      app();
    });
  }

  const managerSelect = document.querySelector("[data-manager-select]");
  if (managerSelect) {
    managerSelect.addEventListener("change", () => {
      state.selectedManagerId = managerSelect.value;
      app();
    });
  }

  document.querySelectorAll("[data-edit]").forEach((input) => {
    input.addEventListener("focus", () => {
      input.dataset.originalValue = String(currentManualValue(input));
      input.value = String(parseCurrency(input.value));
      input.select();
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        commitManualEdit(input);
      }
    });
    input.addEventListener("blur", () => {
      commitManualEdit(input);
    });
  });

  document.querySelectorAll("[data-deal-list]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeDealList = button.dataset.dealList;
      app();
    });
  });

  const dealTalentFilter = document.querySelector("[data-deal-talent-filter]");
  if (dealTalentFilter) {
    dealTalentFilter.addEventListener("change", () => {
      state.selectedDealTalentKey = dealTalentFilter.value;
      app();
    });
  }

  const dealManagerFilter = document.querySelector("[data-deal-manager-filter]");
  if (dealManagerFilter) {
    dealManagerFilter.addEventListener("change", () => {
      state.selectedDealManagerId = dealManagerFilter.value;
      state.selectedDealTalentKey = "all";
      app();
    });
  }

  const crmFormManager = document.querySelector("[data-crm-form-manager]");
  if (crmFormManager) {
    crmFormManager.addEventListener("change", () => {
      state.selectedManagerId = crmFormManager.value;
      app();
    });
  }

  const brandForm = document.querySelector("[data-brand-form]");
  if (brandForm) {
    brandForm.addEventListener("submit", (event) => {
      event.preventDefault();
      saveBrandRecord(new FormData(event.currentTarget));
    });
  }

  document.querySelectorAll("[data-brand-detail]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedBrandName = button.dataset.brandDetail;
      state.selectedCrmDealId = null;
      app();
    });
  });

  document.querySelectorAll("[data-brand-sort]").forEach((select) => {
    select.addEventListener("change", () => {
      state.brandSortMode = select.value === "total" ? "total" : "alphabetical";
      app();
    });
  });

  document.querySelectorAll("[data-crm-brand-input]").forEach((input) => {
    input.addEventListener("change", () => applyBrandAutofill(input));
    input.addEventListener("blur", () => applyBrandAutofill(input));
  });

  document.querySelectorAll("[data-crm-filter]").forEach((select) => {
    select.addEventListener("change", () => {
      if (select.dataset.crmFilter === "manager") {
        state.selectedCrmManagerId = select.value;
        state.selectedCrmTalentKey = "all";
      }
      if (select.dataset.crmFilter === "talent") state.selectedCrmTalentKey = select.value;
      if (select.dataset.crmFilter === "stage") state.activeCrmStage = select.value;
      state.selectedCrmDealId = null;
      app();
    });
  });

  document.querySelectorAll("[data-crm-scope]").forEach((button) => {
    button.addEventListener("click", () => {
      state.crmScope = button.dataset.crmScope;
      state.selectedCrmManagerId = "all";
      state.selectedCrmTalentKey = "all";
      state.selectedCrmDealId = null;
      app();
    });
  });

  document.querySelectorAll("[data-crm-paid-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      state.crmPaidOpen = !state.crmPaidOpen;
      app();
    });
  });

  document.querySelectorAll("[data-crm-add-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      state.crmAddOpen = !state.crmAddOpen;
      app();
    });
  });

  document.querySelectorAll("[data-crm-add-close]").forEach((button) => {
    button.addEventListener("click", () => {
      state.crmAddOpen = false;
      app();
    });
  });

  document.querySelectorAll("[data-crm-add-overlay]").forEach((overlay) => {
    overlay.addEventListener("click", (event) => {
      if (event.target !== overlay) return;
      state.crmAddOpen = false;
      app();
    });
  });

  document.querySelectorAll("[data-crm-detail]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedCrmDealId = button.dataset.crmDetail;
      app();
    });
  });

  document.querySelectorAll("[data-crm-close-detail]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedCrmDealId = null;
      app();
    });
  });

  document.querySelectorAll("[data-crm-detail-overlay]").forEach((overlay) => {
    overlay.addEventListener("click", (event) => {
      if (event.target !== overlay) return;
      state.selectedCrmDealId = null;
      app();
    });
  });

  document.querySelectorAll("[data-crm-drag]").forEach((card) => {
    card.addEventListener("dragstart", (event) => {
      const deal = state.crmDeals.find((item) => item.id === card.dataset.crmDrag);
      if (!deal || !canEditCrmDeal(deal)) {
        event.preventDefault();
        return;
      }
      event.dataTransfer.setData("text/plain", deal.id);
      event.dataTransfer.effectAllowed = "move";
      card.classList.add("dragging");
    });
    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
      document.querySelectorAll(".crm-drop-active").forEach((column) => column.classList.remove("crm-drop-active"));
    });
  });

  document.querySelectorAll("[data-crm-stage-drop]").forEach((column) => {
    column.addEventListener("dragover", (event) => {
      event.preventDefault();
      column.classList.add("crm-drop-active");
      event.dataTransfer.dropEffect = "move";
    });
    column.addEventListener("dragleave", () => {
      column.classList.remove("crm-drop-active");
    });
    column.addEventListener("drop", (event) => {
      event.preventDefault();
      column.classList.remove("crm-drop-active");
      const dealId = event.dataTransfer.getData("text/plain");
      moveCrmDealToStage(dealId, column.dataset.crmStageDrop);
    });
  });

  const cashflowManager = document.querySelector("[data-cashflow-manager]");
  if (cashflowManager) {
    cashflowManager.addEventListener("change", () => {
      state.selectedCashflowManagerId = cashflowManager.value;
      state.selectedCashflowMonthIndex = null;
      app();
    });
  }

  document.querySelectorAll("[data-cashflow-month]").forEach((button) => {
    const selectMonth = () => selectCashflowMonth(button.dataset.cashflowMonth);
    button.addEventListener("click", selectMonth);
    button.addEventListener("pointerdown", selectMonth);
  });

  const cashflowClear = document.querySelector("[data-cashflow-clear]");
  if (cashflowClear) {
    cashflowClear.addEventListener("click", clearCashflowMonth);
    cashflowClear.addEventListener("pointerdown", clearCashflowMonth);
  }

  const reportTalent = document.querySelector("[data-report-talent]");
  if (reportTalent) {
    reportTalent.addEventListener("change", () => {
      state.selectedReportTalentKey = reportTalent.value;
      app();
    });
  }

  document.querySelectorAll("[data-report-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeReportsTab = button.dataset.reportTab === "remittance" ? "remittance" : "status";
      app();
    });
  });

  const remittanceTalent = document.querySelector("[data-remittance-talent]");
  if (remittanceTalent) {
    remittanceTalent.addEventListener("change", () => {
      state.selectedRemittanceTalentKey = remittanceTalent.value;
      app();
    });
  }

  const remittanceMode = document.querySelector("[data-remittance-mode]");
  if (remittanceMode) {
    remittanceMode.addEventListener("change", () => {
      state.remittanceMode = remittanceMode.value === "custom" ? "custom" : "month";
      app();
    });
  }

  const remittanceMonth = document.querySelector("[data-remittance-month]");
  if (remittanceMonth) {
    remittanceMonth.addEventListener("change", () => {
      state.remittanceMonthIndex = Number(remittanceMonth.value || 0);
      app();
    });
  }

  document.querySelectorAll("[data-remittance-date]").forEach((input) => {
    input.addEventListener("change", () => {
      if (input.dataset.remittanceDate === "start") state.remittanceStartDate = input.value;
      if (input.dataset.remittanceDate === "end") state.remittanceEndDate = input.value;
      app();
    });
  });

  document.querySelectorAll("[data-report-nav]").forEach((button) => {
    button.addEventListener("click", () => moveReportTalent(button.dataset.reportNav));
  });

  document.querySelectorAll("[data-send-report-to-talent]").forEach((button) => {
    button.addEventListener("click", () => sendReportToTalent(button.dataset.sendReportToTalent));
  });

  document.querySelectorAll("[data-send-remittance]").forEach((button) => {
    button.addEventListener("click", () => sendTalentRemittance(button.dataset.sendRemittance));
  });

  document.querySelectorAll("[data-mark-paid]").forEach((button) => {
    button.addEventListener("click", () => markCrmDealPaid(button.dataset.markPaid));
  });

  document.querySelectorAll("[data-earnings-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.earningsMode = button.dataset.earningsMode;
      app();
    });
  });

  document.querySelectorAll("[data-pl-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.plMode = button.dataset.plMode;
      app();
    });
  });

  document.querySelectorAll("[data-leaderboard-scope]").forEach((button) => {
    button.addEventListener("click", () => {
      state.leaderboardScope = button.dataset.leaderboardScope;
      state.selectedTalentKey = null;
      app();
    });
  });

  const leaderboardManager = document.querySelector("[data-leaderboard-manager]");
  if (leaderboardManager) {
    leaderboardManager.addEventListener("change", () => {
      state.selectedManagerId = leaderboardManager.value;
      state.selectedTalentKey = null;
      app();
    });
  }

  document.querySelectorAll("[data-expense-filter]").forEach((select) => {
    select.addEventListener("change", () => {
      if (select.dataset.expenseFilter === "category") state.expenseCategoryFilter = select.value;
      if (select.dataset.expenseFilter === "manager") state.expenseManagerFilter = select.value;
      if (select.dataset.expenseFilter === "month") state.expenseMonthFilter = select.value;
      app();
    });
  });

  document.querySelectorAll("[data-email-convert]").forEach((button) => {
    button.addEventListener("click", () => convertEmailLead(button.dataset.emailConvert, button.dataset.target));
  });

  document.querySelectorAll("[data-email-dismiss]").forEach((button) => {
    button.addEventListener("click", () => dismissEmailLead(button.dataset.emailDismiss));
  });

  document.querySelectorAll("[data-email-restore]").forEach((button) => {
    button.addEventListener("click", () => restoreEmailLead(button.dataset.emailRestore));
  });

  document.querySelectorAll("[data-scan-inbox-demo]").forEach((button) => {
    button.addEventListener("click", scanInboxDemo);
  });

  document.querySelectorAll("[data-archive-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.archiveToggle;
      state.openRequestArchives[key] = !state.openRequestArchives[key];
      app();
    });
  });

  document.querySelectorAll("[data-request-status]").forEach((button) => {
    button.addEventListener("click", () => {
      const [type, requestId] = button.dataset.requestStatus.split("::");
      updateRequestStatus(type, requestId, button.dataset.status);
    });
  });

  document.querySelectorAll("[data-request-restore]").forEach((button) => {
    button.addEventListener("click", () => {
      const [type, requestId] = button.dataset.requestRestore.split("::");
      restoreRequest(type, requestId);
    });
  });

  document.querySelectorAll("[data-delegate-request]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.delegateRequest;
      const [type, requestId] = key.split("::");
      const select = [...document.querySelectorAll("[data-delegate-select]")].find((item) => item.dataset.delegateSelect === key);
      delegateRequest(type, requestId, select?.value);
    });
  });

  document.querySelectorAll("[data-approval-route]").forEach((select) => {
    select.addEventListener("change", () => {
      updateApprovalRoute(select);
    });
  });

  const talentForm = document.querySelector("[data-talent-form]");
  if (talentForm) {
    talentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const requestedManagerId = formData.get("managerId") || state.user.id;
      const managerId = canAccessManager(requestedManagerId) ? requestedManagerId : state.user.id;
      const talentName = String(formData.get("talentName") || "").trim();
      const email = String(formData.get("talentEmail") || "").trim().toLowerCase();
      state.talents[managerId] = uniqueNames([...(state.talents[managerId] || []), talentName]);
      if (email) state.talentEmails[talentKey(managerId, talentName)] = email;
      state.talentInvoiceDetails[talentKey(managerId, talentName)] = {
        ...talentInvoiceDetails(managerId, talentName),
        invoiceName: talentInvoiceDetails(managerId, talentName).invoiceName || talentName,
        invoiceEmail: email || talentInvoiceDetails(managerId, talentName).invoiceEmail
      };
      state.selectedManagerId = managerId;
      saveState();
      app();
    });
  }

  const form = document.querySelector("[data-deal-form]");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const monthIndex = Number(formData.get("month"));
      const monthValues = months.map(() => 0);
      monthValues[monthIndex] = Number(formData.get("amount") || 0);
      const requestedManagerId = formData.get("managerId") || state.user.id;
      const managerId = canAccessManager(requestedManagerId) ? requestedManagerId : state.user.id;
      const talentName = String(formData.get("talentName") || "").trim();
      state.talents[managerId] = uniqueNames([...(state.talents[managerId] || []), talentName]);
      const deal = {
        id: `deal-${Date.now()}`,
        managerId,
        talentName,
        status: formData.get("status"),
        campaignName: String(formData.get("campaignName") || "").trim(),
        monthValues,
        extraCostValues: months.map(() => 0),
        costRate: Number(formData.get("costRate") || 80)
      };
      if (state.user.role === "admin") {
        state.deals.push(deal);
      } else {
        state.pendingDeals.push({
          ...deal,
          submittedBy: state.user.id,
          approverId: approvalApproverFor(managerId),
          submittedAt: new Date().toISOString()
        });
      }
      state.selectedManagerId = managerId;
      saveState();
      event.currentTarget.reset();
      app();
    });
  }

  const managerForm = document.querySelector("[data-manager-form]");
  if (managerForm) {
    managerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      addManager(formData);
    });
  }

  document.querySelectorAll("[data-invite-manager]").forEach((button) => {
    button.addEventListener("click", () => inviteManager(button.dataset.inviteManager));
  });

  document.querySelectorAll("[data-remove-manager]").forEach((button) => {
    button.addEventListener("click", () => removeManagerAccess(button.dataset.removeManager));
  });

  document.querySelectorAll("[data-restore-manager]").forEach((button) => {
    button.addEventListener("click", () => restoreManagerAccess(button.dataset.restoreManager));
  });

  const lineReportForm = document.querySelector("[data-line-report-form]");
  if (lineReportForm) {
    lineReportForm.addEventListener("submit", (event) => {
      event.preventDefault();
      addLineReport(new FormData(event.currentTarget));
    });
  }

  const requestDelegationForm = document.querySelector("[data-request-delegation-form]");
  if (requestDelegationForm) {
    requestDelegationForm.addEventListener("submit", (event) => {
      event.preventDefault();
      addRequestDelegationAccess(new FormData(event.currentTarget));
    });
  }

  const commissionOverrideForm = document.querySelector("[data-commission-override-form]");
  if (commissionOverrideForm) {
    commissionOverrideForm.addEventListener("submit", (event) => {
      event.preventDefault();
      addCommissionOverride(new FormData(event.currentTarget));
    });
  }

  document.querySelectorAll("[data-override-rate]").forEach((input) => {
    input.addEventListener("focus", () => input.select());
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        updateOverrideRate(input);
      }
    });
    input.addEventListener("blur", () => updateOverrideRate(input));
  });

  document.querySelectorAll("[data-override-start]").forEach((select) => {
    select.addEventListener("change", () => {
      updateOverrideStart(select);
    });
  });

  document.querySelectorAll("[data-remove-override]").forEach((button) => {
    button.addEventListener("click", () => {
      state.commissionOverrides = state.commissionOverrides.filter((override) => override.id !== button.dataset.removeOverride);
      saveState();
      app();
    });
  });

  document.querySelectorAll("[data-remove-line-report]").forEach((button) => {
    button.addEventListener("click", () => {
      removeLineReport(button.dataset.removeLineReport);
    });
  });

  document.querySelectorAll("[data-remove-request-delegation]").forEach((button) => {
    button.addEventListener("click", () => {
      removeRequestDelegationAccess(button.dataset.removeRequestDelegation);
    });
  });

  const expenseForm = document.querySelector("[data-expense-form]");
  if (expenseForm) {
    expenseForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      addExpense(formData).then(() => app());
    });
  }

  document.querySelectorAll("[data-talent-expense-talent]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedTalentExpenseTalentKey = button.dataset.talentExpenseTalent;
      state.selectedTalentExpenseDealId = null;
      app();
    });
  });

  document.querySelectorAll("[data-talent-expense-deal]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedTalentExpenseDealId = button.dataset.talentExpenseDeal;
      app();
    });
  });

  const talentExpenseForm = document.querySelector("[data-talent-expense-form]");
  if (talentExpenseForm) {
    talentExpenseForm.addEventListener("submit", (event) => {
      event.preventDefault();
      addTalentExpense(new FormData(event.currentTarget)).then(() => app());
    });
  }

  const productionManager = document.querySelector("[data-production-manager]");
  if (productionManager) {
    productionManager.addEventListener("change", () => {
      state.selectedProductionManagerId = productionManager.value;
      app();
    });
  }

  document.querySelectorAll("[data-production-item]").forEach((input) => {
    input.addEventListener("change", updateProductionFormTotal);
  });

  document.querySelectorAll("[data-production-days]").forEach((input) => {
    input.addEventListener("input", updateProductionFormTotal);
    input.addEventListener("change", updateProductionFormTotal);
  });

  document.querySelectorAll("[data-production-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeProductionTab = button.dataset.productionTab;
      app();
    });
  });

  updateProductionFormTotal();

  document.querySelectorAll("[data-production-rate]").forEach((input) => {
    input.addEventListener("focus", () => {
      input.value = String(parseCurrency(input.value));
      input.select();
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        updateProductionRate(input);
      }
    });
    input.addEventListener("blur", () => updateProductionRate(input));
  });

  const productionForm = document.querySelector("[data-production-form]");
  if (productionForm) {
    productionForm.addEventListener("submit", (event) => {
      event.preventDefault();
      addProductionRequest(new FormData(event.currentTarget));
    });
  }

  document.querySelectorAll("[data-production-accept]").forEach((button) => {
    button.addEventListener("click", () => acceptProductionRequest(button.dataset.productionAccept));
  });

  document.querySelectorAll("[data-production-reject]").forEach((button) => {
    button.addEventListener("click", () => rejectProductionRequest(button.dataset.productionReject));
  });

  document.querySelectorAll("[data-production-cancel]").forEach((button) => {
    button.addEventListener("click", () => cancelProductionRequest(button.dataset.productionCancel));
  });

  document.querySelectorAll("[data-production-remove]").forEach((button) => {
    button.addEventListener("click", () => removeProductionRequest(button.dataset.productionRemove));
  });

  document.querySelectorAll("[data-production-chargeback]").forEach((button) => {
    button.addEventListener("click", () => requestProductionChargeback(button.dataset.productionChargeback));
  });

  const crmForm = document.querySelector("[data-crm-form]");
  if (crmForm) {
    crmForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      addCrmDeal(formData).then(() => app());
    });
  }

  document.querySelectorAll("[data-crm-update]").forEach((field) => {
    if (field.dataset.field === "amount") {
      field.addEventListener("focus", () => {
        field.value = String(parseCurrency(field.value));
        field.select();
      });
    }
    const eventName = field.tagName === "SELECT" || field.type === "checkbox" ? "change" : "blur";
    field.addEventListener(eventName, () => updateCrmDealField(field, field.tagName === "SELECT"));
    field.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        updateCrmDealField(field);
      }
    });
  });

  document.querySelectorAll("[data-crm-save]").forEach((button) => {
    button.addEventListener("click", () => saveCrmDetail(button.dataset.crmSave));
  });

  document.querySelectorAll("[data-delete-crm-deal]").forEach((button) => {
    button.addEventListener("click", () => removeCrmDeal(button.dataset.deleteCrmDeal));
  });

  document.querySelectorAll("[data-finance-create-xero]").forEach((button) => {
    button.addEventListener("click", () => createFinanceXeroDraft(button.dataset.financeCreateXero));
  });

  document.querySelectorAll("[data-finance-see-xero]").forEach((button) => {
    button.addEventListener("click", () => openFinanceXeroInvoice(button.dataset.financeSeeXero));
  });

  document.querySelectorAll("[data-dismiss-finance-alert]").forEach((button) => {
    button.addEventListener("click", () => dismissFinanceAlert(button.dataset.dismissFinanceAlert));
  });

  document.querySelectorAll("[data-talent-expense-actioned]").forEach((button) => {
    button.addEventListener("click", () => markTalentExpenseAddedToInvoice(button.dataset.talentExpenseActioned));
  });

  document.querySelectorAll("[data-crm-contract]").forEach((input) => {
    input.addEventListener("change", () => updateCrmContract(input));
  });

  document.querySelectorAll("[data-delete]").forEach((button) => {
    button.addEventListener("click", () => {
      const deletedDeal = state.deals.find((deal) => deal.id === button.dataset.delete);
      if (deletedDeal?.crmDealId) {
        const crmDeal = state.crmDeals.find((deal) => deal.id === deletedDeal.crmDealId);
        if (crmDeal) crmDeal.pAndLDealId = "";
      }
      state.deals = state.deals.filter((deal) => deal.id !== button.dataset.delete);
      saveState();
      app();
    });
  });

  document.querySelectorAll("[data-approve-deal]").forEach((button) => {
    button.addEventListener("click", () => {
      approvePendingDeal(button.dataset.approveDeal);
    });
  });

  document.querySelectorAll("[data-reject-deal]").forEach((button) => {
    button.addEventListener("click", () => {
      rejectPendingDeal(button.dataset.rejectDeal);
    });
  });

  document.querySelectorAll("[data-approve-expense]").forEach((button) => {
    button.addEventListener("click", () => approvePendingExpense(button.dataset.approveExpense));
  });

  document.querySelectorAll("[data-reject-expense]").forEach((button) => {
    button.addEventListener("click", () => rejectPendingExpense(button.dataset.rejectExpense));
  });

  document.querySelectorAll("[data-see-rejected-deal]").forEach((button) => {
    button.addEventListener("click", () => openRejectedDeal(button.dataset.seeRejectedDeal));
  });

  document.querySelectorAll("[data-open-crm-deal]").forEach((button) => {
    button.addEventListener("click", () => openCrmDeal(button.dataset.openCrmDeal));
  });

  document.querySelectorAll("[data-dismiss-rejection]").forEach((button) => {
    button.addEventListener("click", () => dismissRejectionMessage(button.dataset.dismissRejection));
  });
}

function updateManagerSalary(input) {
  const managerId = input.dataset.salaryManager;
  const value = parseCurrency(input.value);
  state.managerSalaries[managerId] = value;
  saveState();
  app();
}

function updateManagerRate(input) {
  const managerId = input.dataset.rateManager;
  const value = Math.max(0, Number(parseCurrency(input.value)));
  state.commissionRates[managerId] = value;
  saveState();
  app();
}

function updateTalentEmail(input) {
  const [managerId, ...nameParts] = input.dataset.talentEmail.split("::");
  const talentName = nameParts.join("::");
  if (!managerId || !talentName || !canAccessManager(managerId)) return;
  const email = String(input.value || "").trim().toLowerCase();
  const key = talentKey(managerId, talentName);
  if (email) {
    state.talentEmails[key] = email;
  } else {
    delete state.talentEmails[key];
  }
  saveState();
  app();
}

function updateTalentInvoiceDetail(input) {
  const [managerId, ...nameParts] = input.dataset.talentInvoiceDetail.split("::");
  const talentName = nameParts.join("::");
  const field = input.dataset.field;
  if (!managerId || !talentName || !field || !canAccessManager(managerId)) return;
  const key = talentKey(managerId, talentName);
  state.talentInvoiceDetails[key] = {
    ...talentInvoiceDetails(managerId, talentName),
    [field]: field === "invoiceEmail" ? String(input.value || "").trim().toLowerCase() : String(input.value || "").trim()
  };
  saveState();
}

function saveTalentInvoiceDetails(key) {
  document.querySelectorAll(`[data-talent-invoice-detail="${CSS.escape(key)}"]`).forEach((input) => {
    updateTalentInvoiceDetail(input);
  });
  state.savedTalentInvoiceKey = key;
  saveState();
  app();
  window.setTimeout(() => {
    if (state.savedTalentInvoiceKey === key) {
      state.savedTalentInvoiceKey = null;
      app();
    }
  }, 1400);
}

function updateTalentProfileField(input) {
  const [managerId, ...nameParts] = input.dataset.talentProfile.split("::");
  const talentName = nameParts.join("::");
  const field = input.dataset.field;
  if (!managerId || !talentName || !field || !canEditTalentProfile(managerId)) return;
  const key = talentKey(managerId, talentName);
  const profile = talentProfile(managerId, talentName);
  const nextProfile = cloneData(profile);
  if (field === "bio" || field === "imageUrl") {
    nextProfile[field] = String(input.value || "").trim();
  } else if (field.startsWith("handle:")) {
    const platform = field.split(":")[1];
    nextProfile.handles[platform] = String(input.value || "").trim();
  } else if (field.startsWith("platform:")) {
    const platform = field.split(":")[1];
    nextProfile.platforms[platform] = Boolean(input.checked);
  }
  nextProfile.updatedAt = profile.updatedAt;
  state.talentProfiles[key] = nextProfile;
  saveState();
}

function saveTalentProfile(key) {
  document.querySelectorAll(`[data-talent-profile="${CSS.escape(key)}"]`).forEach((input) => {
    updateTalentProfileField(input);
  });
  state.savedTalentProfileKey = key;
  saveState();
  app();
  window.setTimeout(() => {
    if (state.savedTalentProfileKey === key) {
      state.savedTalentProfileKey = null;
      app();
    }
  }, 1400);
}

function pullTalentSocialStats(key) {
  const [managerId, ...nameParts] = key.split("::");
  const talentName = nameParts.join("::");
  if (!managerId || !talentName || !canEditTalentProfile(managerId)) return;
  document.querySelectorAll(`[data-talent-profile="${CSS.escape(key)}"]`).forEach((input) => {
    updateTalentProfileField(input);
  });
  const profile = cloneData(talentProfile(managerId, talentName));
  ["youtube", "instagram", "tiktok"].forEach((platform) => {
    if (!profile.platforms[platform] || !profile.handles[platform]) return;
    profile.stats[platform] = simulatedSocialStats(managerId, talentName, platform, profile.handles[platform]);
    profile.imageSource = profile.imageSource || platform;
  });
  profile.updatedAt = new Date().toISOString();
  state.talentProfiles[key] = profile;
  saveState();
  app();
}

function mediaPackRowsForSelected() {
  const selectedKeys = state.selectedMediaPackTalentKeys || [];
  return allRosterTalentRows().filter((row) => selectedKeys.includes(row.key));
}

function downloadMediaPack() {
  const rows = mediaPackRowsForSelected();
  if (!rows.length) {
    window.alert("Select at least one talent for the media pack.");
    return;
  }
  const packWindow = window.open("", "_blank");
  if (!packWindow) {
    window.alert("Your browser blocked the media pack window. Please allow popups for this prototype.");
    return;
  }
  packWindow.document.write(mediaPackHtml(rows));
  packWindow.document.close();
  packWindow.focus();
  window.setTimeout(() => packWindow.print(), 500);
}

function mediaPackHtml(rows) {
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Cowshed Creators Media Pack</title>
  <style>
    @page { size: A4 landscape; margin: 0; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Inter, Arial, sans-serif; color: #171b1e; background: #111; }
    .page { width: 297mm; min-height: 210mm; page-break-after: always; padding: 18mm; position: relative; overflow: hidden; background: #f5f7f3; }
    .cover { display: grid; align-content: center; background: radial-gradient(circle at 72% 20%, rgba(246,238,69,.28), transparent 28%), linear-gradient(135deg, #090b0c, #202623); color: #fff; }
    .cover h1 { margin: 0; font-size: 44pt; line-height: .9; letter-spacing: 0; color: #f6ee45; text-transform: uppercase; }
    .cover p { max-width: 120mm; font-size: 15pt; line-height: 1.45; color: #dfe7df; }
    .cover .meta { position: absolute; left: 18mm; bottom: 16mm; display: flex; gap: 8mm; color: #f6ee45; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; }
    .brand-mark { position: absolute; right: 18mm; top: 16mm; text-align: right; color: #f6ee45; font-weight: 1000; font-size: 24pt; line-height: .85; }
    .talent-card { display: grid; grid-template-columns: 92mm 1fr; gap: 13mm; align-items: stretch; }
    .photo { min-height: 160mm; border-radius: 10mm; overflow: hidden; background: #111; box-shadow: 0 16px 36px rgba(0,0,0,.18); }
    .photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .panel { display: grid; align-content: start; gap: 8mm; }
    .eyebrow { color: #687178; font-size: 10pt; font-weight: 900; letter-spacing: 3px; text-transform: uppercase; }
    h2 { margin: 0; font-size: 38pt; line-height: .95; }
    .manager { color: #1f6b52; font-size: 14pt; font-weight: 900; }
    .bio { font-size: 15pt; line-height: 1.45; color: #30363a; max-width: 165mm; }
    .stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 5mm; }
    .stat { border: 1px solid #dce4df; border-radius: 5mm; background: #fff; padding: 6mm; }
    .stat span { color: #687178; display: block; font-size: 9pt; font-weight: 900; text-transform: uppercase; letter-spacing: 1.4px; }
    .stat strong { display: block; margin-top: 2mm; font-size: 22pt; }
    .handle { margin-top: 2mm; color: #1f6b52; font-weight: 900; overflow-wrap: anywhere; }
    .footer { position: absolute; left: 18mm; right: 18mm; bottom: 10mm; display: flex; justify-content: space-between; align-items: center; color: #687178; font-size: 9pt; font-weight: 800; }
    .accent { position: absolute; right: -18mm; bottom: -22mm; width: 70mm; height: 70mm; border-radius: 50%; background: #f6ee45; opacity: .75; }
    @media print { .page { page-break-after: always; } }
  </style>
</head>
<body>
  <section class="page cover">
    <div class="brand-mark">COWSHED<br>CREATORS</div>
    <h1>Talent<br>Media Pack</h1>
    <p>A curated snapshot of Cowshed Creators talent, audience reach, social presence and brand-ready profile notes.</p>
    <div class="meta"><span>${today}</span><span>${rows.length} talent</span><span>Confidential</span></div>
  </section>
  ${rows.map((row, index) => mediaPackTalentPage(row, index + 1, rows.length)).join("")}
</body>
</html>`;
}

function mediaPackTalentPage(row, pageNumber, totalPages) {
  const profile = talentProfile(row.managerId, row.talentName);
  const platforms = ["instagram", "tiktok", "youtube"].filter((platform) => profile.platforms[platform]);
  const bio = profile.bio || `${row.talentName} is part of the Cowshed Creators roster. Add a short bio in the Talent database to make this page pitch-ready.`;
  return `
    <section class="page">
      <div class="accent"></div>
      <div class="talent-card">
        <div class="photo"><img src="${htmlSafe(profileImageUrl(row.managerId, row.talentName))}" alt=""></div>
        <div class="panel">
          <div class="eyebrow">Cowshed Creators Talent</div>
          <h2>${htmlSafe(row.talentName)}</h2>
          <div class="manager">Managed by ${htmlSafe(managerName(row.managerId))}</div>
          <p class="bio">${htmlSafe(bio)}</p>
          <div class="stats">
            ${platforms.length ? platforms.map((platform) => {
              const stats = profile.stats[platform] || normalizeSocialStats();
              return `<div class="stat"><span>${socialPlatformLabel(platform)}</span><strong>${stats.audience ? compactNumber(stats.audience) : "-"}</strong><div>${stats.label || "Audience"}</div><div class="handle">${htmlSafe(profile.handles[platform] || "")}</div><div>${stats.engagement ? `${stats.engagement.toFixed(1)}% engagement` : "Stats pending"}</div></div>`;
            }).join("") : `<div class="stat"><span>Social stats</span><strong>-</strong><div>Add handles and pull stats in the Talent database.</div></div>`}
          </div>
        </div>
      </div>
      <div class="footer"><span>Cowshed Creators</span><span>${pageNumber} / ${totalPages}</span></div>
    </section>
  `;
}

function markTalentInvoicePaid(invoiceId) {
  if (!canUseFinanceTools()) {
    window.alert("Only finance or admin can mark talent invoices as paid.");
    return;
  }
  const invoice = buildTalentInvoices().find((item) => item.id === invoiceId);
  if (!invoice || invoice.paidAt) return;
  if (!window.confirm(`Mark ${invoice.talentName}'s ${displayDate(invoice.paymentRunDate)} payment run invoice as paid?`)) return;
  const paidAt = new Date().toISOString();
  state.talentInvoicePayments[invoice.id] = {
    paidAt,
    paidBy: state.user.id,
    total: invoice.total
  };
  state.talentInvoiceBills[invoice.id] = {
    ...(invoice.xeroBill || ensureTalentInvoiceDraftBill(invoice)),
    status: "Paid in Xero",
    paidAt
  };
  invoice.lines.forEach((line) => {
    if (line.paidEarly) return;
    const deal = state.crmDeals.find((item) => item.id === line.deal.id);
    if (!deal) return;
    deal.stage = "Paid";
    deal.talentInvoicePaidAt = paidAt;
    deal.xeroStatus = "Paid to talent";
    deal.updatedAt = paidAt;
  });
  saveState();
  app();
}

function openTalentXeroBill(invoiceId) {
  if (!canUseFinanceTools()) return;
  const invoice = buildTalentInvoices().find((item) => item.id === invoiceId);
  if (!invoice?.xeroBill?.billId) return;
  window.open(xeroBillUrl(invoice), "_blank", "noopener");
}

function markTalentInvoiceLinePaidEarly(invoiceId, dealId) {
  if (!canUseFinanceTools()) {
    window.alert("Only finance or admin can mark a deal line paid early.");
    return;
  }
  const invoice = buildTalentInvoices().find((item) => item.id === invoiceId);
  const line = invoice?.lines.find((item) => item.deal.id === dealId);
  const deal = state.crmDeals.find((item) => item.id === dealId);
  if (!invoice || !line || !deal || invoice.paidAt || line.paidEarly) return;
  if (!window.confirm(`Mark ${deal.talentName}'s deal "${deal.company || line.description}" as paid early and remove it from the amount still payable on this invoice?`)) return;
  const paidAt = new Date().toISOString();
  state.earlyTalentLinePayments[deal.id] = {
    invoiceId,
    paidAt,
    paidBy: state.user.id,
    amount: line.grossTotal
  };
  deal.stage = "Paid";
  deal.talentInvoicePaidAt = paidAt;
  deal.xeroStatus = "Paid early to talent";
  deal.updatedAt = paidAt;
  saveState();
  app();
}

function updateOverrideRate(input) {
  const override = state.commissionOverrides.find((item) => item.id === input.dataset.overrideRate);
  if (!override) return;
  override.rate = Math.max(0, Number(parseCurrency(input.value)));
  saveState();
  app();
}

function updateOverrideStart(select) {
  const override = state.commissionOverrides.find((item) => item.id === select.dataset.overrideStart);
  if (!override) return;
  override.startMonthIndex = Number(select.value || 0);
  saveState();
  app();
}

function updateApprovalRoute(select) {
  if (!canManageTeamPermissions()) return;
  const managerId = select.dataset.approvalRoute;
  if (select.value) {
    state.approvalRoutes[managerId] = select.value;
  } else {
    delete state.approvalRoutes[managerId];
  }
  state.pendingDeals = state.pendingDeals.map((deal) => {
    if (deal.managerId !== managerId) return deal;
    return { ...deal, approverId: approvalApproverFor(managerId) };
  });
  saveState();
  app();
}

function moveReportTalent(direction) {
  const talents = reportTalentOptions(visibleCrmDeals());
  if (!talents.length) return;
  const currentIndex = Math.max(0, talents.findIndex((talent) => talent.key === state.selectedReportTalentKey));
  const step = direction === "previous" ? -1 : 1;
  const nextIndex = (currentIndex + step + talents.length) % talents.length;
  state.selectedReportTalentKey = talents[nextIndex].key;
  app();
}

function sendReportToTalent(key) {
  const talents = reportTalentOptions(visibleCrmDeals());
  const selected = talents.find((talent) => talent.key === key);
  if (!selected) return;
  const email = talentEmail(selected.managerId, selected.talentName);
  if (!email) {
    window.alert("Add this talent's email in the Talent tab before sending their report.");
    return;
  }
  const dealCount = visibleCrmDeals().filter((deal) => deal.managerId === selected.managerId && deal.talentName === selected.talentName).length;
  state.talentReportSends.unshift({
    id: `report-send-${Date.now()}`,
    managerId: selected.managerId,
    talentName: selected.talentName,
    email,
    sentAt: new Date().toISOString(),
    dealCount
  });
  saveState();
  window.alert(`Weekly report ready to send to ${email}.`);
  app();
}

function sendTalentRemittance(key) {
  const deals = visibleCrmDeals();
  const talents = reportTalentOptions(deals);
  const selected = talents.find((talent) => talent.key === key);
  if (!selected) return;
  const email = talentEmail(selected.managerId, selected.talentName);
  if (!email) {
    window.alert("Add this talent's email in the Talent tab before sending their remittance.");
    return;
  }
  const monthRange = monthDateRange(state.remittanceMonthIndex);
  const startDate = state.remittanceMode === "month" ? monthRange.startDate : state.remittanceStartDate;
  const endDate = state.remittanceMode === "month" ? monthRange.endDate : state.remittanceEndDate;
  const periodLabel = state.remittanceMode === "month" ? monthRange.label : `${displayDate(startDate)} to ${displayDate(endDate)}`;
  const paidDeals = deals
    .filter((deal) => deal.managerId === selected.managerId && deal.talentName === selected.talentName && ["Paid", "On Next Payment Run"].includes(deal.stage))
    .filter((deal) => isDateInRange(crmPaidDate(deal), startDate, endDate));
  if (!paidDeals.length) {
    window.alert("There are no paid deals in this remittance period.");
    return;
  }
  const expenseTotal = paidDeals.reduce((total, deal) => total + dealTalentExpenseTotal(deal.id), 0);
  state.talentRemittanceSends.unshift({
    id: `remittance-send-${Date.now()}`,
    managerId: selected.managerId,
    talentName: selected.talentName,
    email,
    periodLabel,
    sentAt: new Date().toISOString(),
    dealCount: paidDeals.length,
    invoiceCount: paidDeals.filter((deal) => deal.xeroInvoiceId).length,
    expenseTotal
  });
  saveState();
  window.alert(`Talent remittance ready to send to ${email}. It includes ${paidDeals.length} paid deals, invoice links, and ${money(expenseTotal)} of attached expenses.`);
  app();
}

function moveCrmDealToStage(dealId, stage) {
  const deal = state.crmDeals.find((item) => item.id === dealId);
  if (!deal || !crmStages.includes(stage) || !canEditCrmDeal(deal)) return;
  if (!setCrmDealStage(deal, stage)) {
    saveState();
    app();
    return;
  }
  state.selectedCrmDealId = deal.id;
  saveState();
  app();
}

function setCrmDealStage(deal, stage) {
  const previousStage = deal.stage;
  if (stage !== previousStage && stage === "Paid") {
    window.alert("Deals move to Paid only when the talent invoice is marked paid in Talent Invoices.");
    return false;
  }
  if (stage !== previousStage && isPostInvoiceStage(stage)) {
    if (!canManuallyMovePostInvoiceStage(stage)) {
      window.alert("Managers cannot move deals into Invoiced, On Next Payment Run, or Paid. This happens through Xero/payment runs.");
      return false;
    }
    const confirmed = window.confirm(`This stage is normally updated by Xero or the talent payment run. Do you want to manually move this deal to ${stage}?`);
    if (!confirmed) return false;
  }
  if (stage === "To Be Invoiced" && previousStage !== "To Be Invoiced") {
    const missing = invoiceMustHaveMissingFields(deal);
    if (missing.length) {
      deal.xeroStatus = `Missing before To Be Invoiced: ${missing.join(", ")}`;
      window.alert(`Add these before moving to To Be Invoiced: ${missing.join(", ")}`);
      return false;
    }
  }
  deal.stage = stage;
  deal.updatedAt = new Date().toISOString();
  if (stage === "Contract Signed" && previousStage !== "Contract Signed") {
    deal.signedMonthIndex = currentMonthIndex();
    submitCrmDealToPandL(deal);
  }
  if (stage === "To Be Invoiced" && previousStage !== "To Be Invoiced") {
    queueDealForFinance(deal);
  }
  if (stage === "On Next Payment Run") {
    const reconciledAt = deal.xeroReconciledAt || deal.xeroPaidAt || new Date().toISOString();
    deal.xeroPaymentStatus = "RECONCILED";
    deal.xeroPaidAt = String(reconciledAt).slice(0, 10);
    deal.xeroReconciledAt = String(reconciledAt).slice(0, 10);
    deal.financeStatus = "Payment reconciled";
    deal.xeroStatus = "Payment reconciled in Xero";
  }
  return true;
}

function queueDealForFinance(deal) {
  deal.financeSubmittedAt = new Date().toISOString();
  deal.financeAcceptedAt = "";
  deal.financeRejectedAt = "";
  deal.financeRejectionReason = "";
  deal.financeAlertDismissedAt = "";
  const missing = createXeroDraftForDeal(deal);
  deal.financeStatus = missing.length ? "Missing invoice details" : "Draft created in Xero";
  if (missing.length) deal.xeroStatus = `Missing: ${missing.join(", ")}`;
}

function createXeroDraftForDeal(deal) {
  const missing = missingXeroFields(deal);
  if (missing.length) return missing;
  const talentExpenseTotal = dealTalentExpenseTotal(deal.id);
  if (!deal.xeroInvoiceId) {
    deal.xeroInvoiceId = `XERO-DRAFT-${Date.now().toString().slice(-6)}`;
    deal.xeroCreatedAt = new Date().toISOString();
  }
  deal.xeroDueDate = crmDueDate(deal);
  deal.xeroInvoiceStatus = "DRAFT";
  deal.xeroStatus = talentExpenseTotal ? `Draft created with ${money(talentExpenseTotal)} talent expenses` : "Draft created";
  deal.xeroDraftPayload = xeroDraftInvoicePayload(deal);
  deal.updatedAt = new Date().toISOString();
  return [];
}

function syncXeroInvoiceStatuses() {
  let changed = false;
  state.crmDeals.forEach((deal) => {
    if (deal.stage === "Paid" && deal.talentInvoicePaidAt) return;
    const paymentReconciled = ["RECONCILED", "PAID"].includes(String(deal.xeroPaymentStatus || "").toUpperCase())
      || ["RECONCILED", "PAID"].includes(String(deal.xeroInvoiceStatus || "").toUpperCase());
    if (paymentReconciled) {
      const paidDate = String(deal.xeroReconciledAt || deal.xeroPaidAt || new Date().toISOString()).slice(0, 10);
      const needsPaymentRunUpdate = deal.stage !== "On Next Payment Run" || deal.xeroStatus !== "Payment reconciled in Xero";
      if (needsPaymentRunUpdate) {
        deal.stage = "On Next Payment Run";
        deal.xeroPaymentStatus = "RECONCILED";
        deal.xeroPaidAt = paidDate;
        deal.xeroReconciledAt = deal.xeroReconciledAt || paidDate;
        deal.financeStatus = "Payment reconciled";
        deal.xeroStatus = "Payment reconciled in Xero";
        deal.updatedAt = new Date().toISOString();
        changed = true;
      }
      return;
    }
    if (deal.xeroInvoiceStatus !== "INVOICED") return;
    const needsUpdate = deal.stage !== "Invoiced" || deal.financeStatus !== "Invoiced in Xero" || deal.xeroStatus !== "Invoiced in Xero";
    if (!needsUpdate) return;
    deal.stage = "Invoiced";
    deal.financeStatus = "Invoiced in Xero";
    deal.financeInvoicedAt = deal.financeInvoicedAt || new Date().toISOString();
    deal.xeroStatus = "Invoiced in Xero";
    deal.updatedAt = new Date().toISOString();
    changed = true;
  });
  if (changed) saveState();
}

function missingXeroFields(deal) {
  const missing = invoiceMustHaveMissingFields(deal);
  if (!deal.xeroAccountCode) missing.push("account code");
  if (!deal.xeroTaxRate) missing.push("tax rate");
  return missing;
}

function invoiceMustHaveMissingFields(deal) {
  const missing = [];
  if (!String(deal.campaignName || "").trim()) missing.push("campaign name");
  if (!emailContactList(deal.emailContact).length) missing.push("email address");
  const badEmails = invalidEmailContacts(deal.emailContact);
  if (badEmails.length) missing.push(`valid email address (${badEmails.join(", ")})`);
  if (!String(deal.company || "").trim()) missing.push("company name");
  if (!String(deal.billingAddress || "").trim()) missing.push("company address");
  if (!String(deal.invoiceReference || "").trim() && !deal.noPoNumber) missing.push("PO number or no PO selected");
  if (!Number(deal.amount || 0)) missing.push("deal amount");
  if (!deal.paymentTerm) missing.push("payment terms");
  if (deal.paymentTerm === "custom" && !Number(deal.customPaymentDays || 0)) missing.push("custom payment days");
  return missing;
}

function submitCrmDealToPandL(crmDeal) {
  if (crmDeal.pAndLDealId) return;
  const existingDeal = state.deals.find((deal) => deal.crmDealId === crmDeal.id);
  const existingPending = state.pendingDeals.find((deal) => deal.crmDealId === crmDeal.id);
  if (existingDeal || existingPending) {
    crmDeal.pAndLDealId = (existingDeal || existingPending).id;
    return;
  }
  const monthValues = months.map(() => 0);
  monthValues[signedMonthIndex(crmDeal)] = dealGbpAmount(crmDeal);
  const deal = {
    id: `deal-${Date.now()}`,
    managerId: crmDeal.managerId,
    talentName: crmDeal.talentName,
    status: "Confirmed",
    campaignName: crmDeal.campaignName || crmDeal.company || "CRM deal",
    monthValues,
    extraCostValues: months.map(() => 0),
    costRate: 80,
    crmDealId: crmDeal.id
  };
  crmDeal.pAndLDealId = deal.id;
  if (state.user.role === "admin") {
    state.deals.push(deal);
  } else {
    state.pendingDeals.push({
      ...deal,
      submittedBy: state.user.id,
      approverId: approvalApproverFor(crmDeal.managerId),
      submittedAt: new Date().toISOString()
    });
  }
}

function addManager(formData) {
  const name = String(formData.get("managerName") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const role = staffRoles.includes(formData.get("role")) ? formData.get("role") : "manager";
  if (!name || !canManageTeamPermissions()) return;
  const baseId = slugify(email.split("@")[0] || name);
  let id = baseId;
  let suffix = 2;
  while ([users.find((user) => user.role === "admin"), ...allStaffRecords()].some((user) => user?.id === id)) {
    id = `${baseId}-${suffix}`;
    suffix += 1;
  }
  const member = { id, name, role, email, inviteStatus: "Invited", invitedAt: new Date().toISOString() };
  state.extraManagers.push(member);
  state.removedManagerIds = state.removedManagerIds.filter((memberId) => memberId !== id);
  if (role === "manager") {
    state.talents[id] = [];
    state.managerSalaries[id] = parseCurrency(formData.get("salary")) || 5000;
    state.commissionRates[id] = Math.max(0, Number(formData.get("commissionRate") || 1));
    state.selectedManagerId = id;
  }
  saveState();
  app();
}

function inviteManager(managerId) {
  if (!canManageTeamPermissions()) return;
  const manager = state.extraManagers.find((item) => item.id === managerId);
  if (!manager) return;
  manager.inviteStatus = "Invited";
  manager.invitedAt = new Date().toISOString();
  saveState();
  app();
}

function removeManagerAccess(managerId) {
  if (!canManageTeamPermissions()) return;
  state.removedManagerIds = [...new Set([...state.removedManagerIds, managerId])];
  saveState();
  app();
}

function restoreManagerAccess(managerId) {
  if (!canManageTeamPermissions()) return;
  state.removedManagerIds = state.removedManagerIds.filter((id) => id !== managerId);
  saveState();
  app();
}

function addCommissionOverride(formData) {
  if (state.user.role !== "admin") return;
  const recipientManagerId = formData.get("recipientManagerId");
  const rosterManagerId = formData.get("rosterManagerId");
  const rate = Math.max(0, Number(formData.get("rate") || 0));
  if (!recipientManagerId || !rosterManagerId || !rate) return;
  state.commissionOverrides.push({
    id: `override-${Date.now()}`,
    recipientManagerId,
    rosterManagerId,
    rate,
    startMonthIndex: Number(formData.get("startMonthIndex") || 0)
  });
  saveState();
  app();
}

function addLineReport(formData) {
  if (!canManageTeamPermissions()) return;
  const lineManagerId = formData.get("lineManagerId");
  const reportManagerId = formData.get("reportManagerId");
  if (!lineManagerId || !reportManagerId || lineManagerId === reportManagerId) return;
  state.lineReports[lineManagerId] = [...new Set([...(state.lineReports[lineManagerId] || []), reportManagerId])];
  refreshPendingApprovers();
  saveState();
  app();
}

function removeLineReport(key) {
  if (!canManageTeamPermissions()) return;
  const [lineManagerId, reportManagerId] = key.split("::");
  state.lineReports[lineManagerId] = (state.lineReports[lineManagerId] || []).filter((id) => id !== reportManagerId);
  if (!state.lineReports[lineManagerId].length) delete state.lineReports[lineManagerId];
  refreshPendingApprovers();
  saveState();
  app();
}

function addRequestDelegationAccess(formData) {
  if (!canManageTeamPermissions()) return;
  const delegatorManagerId = formData.get("delegatorManagerId");
  const targetManagerId = formData.get("targetManagerId");
  if (!delegatorManagerId || !targetManagerId || delegatorManagerId === targetManagerId) return;
  if ((state.lineReports[delegatorManagerId] || []).includes(targetManagerId)) return;
  state.requestDelegationPermissions[targetManagerId] = [...new Set([...(state.requestDelegationPermissions[targetManagerId] || []), delegatorManagerId])];
  saveState();
  app();
}

function removeRequestDelegationAccess(key) {
  if (!canManageTeamPermissions()) return;
  const [delegatorManagerId, targetManagerId] = key.split("::");
  state.requestDelegationPermissions[targetManagerId] = (state.requestDelegationPermissions[targetManagerId] || []).filter((id) => id !== delegatorManagerId);
  if (!state.requestDelegationPermissions[targetManagerId].length) delete state.requestDelegationPermissions[targetManagerId];
  saveState();
  app();
}

function refreshPendingApprovers() {
  state.pendingDeals = state.pendingDeals.map((deal) => ({
    ...deal,
    approverId: approvalApproverFor(deal.managerId)
  }));
}

function approvePendingDeal(id) {
  const deal = state.pendingDeals.find((item) => item.id === id);
  if (!deal || !canApprovePendingDeal(deal)) return;
  const { submittedBy, approverId, submittedAt, ...approvedDeal } = deal;
  state.deals.push(approvedDeal);
  state.pendingDeals = state.pendingDeals.filter((item) => item.id !== id);
  saveState();
  app();
}

function rejectPendingDeal(id) {
  const deal = state.pendingDeals.find((item) => item.id === id);
  if (!deal || !canApprovePendingDeal(deal)) return;
  const reason = window.prompt("Reason for rejecting this deal?") || "No reason provided";
  if (deal.crmDealId) {
    const crmDeal = state.crmDeals.find((item) => item.id === deal.crmDealId);
    if (crmDeal) {
      crmDeal.pAndLDealId = "";
      crmDeal.stage = "Negotiation";
      crmDeal.rejectionReason = reason;
      crmDeal.updatedAt = new Date().toISOString();
    }
  }
  state.rejectionMessages.push({
    id: `message-${Date.now()}`,
    toManagerId: deal.submittedBy || deal.managerId,
    toEmail: managerEmail(deal.submittedBy || deal.managerId),
    crmDealId: deal.crmDealId || "",
    subject: `Deal rejected: ${deal.campaignName}`,
    body: `Your deal for ${deal.talentName} was rejected. Reason: ${reason}`,
    createdAt: new Date().toISOString()
  });
  state.pendingDeals = state.pendingDeals.filter((item) => item.id !== id);
  saveState();
  app();
}

function openRejectedDeal(messageId) {
  const message = state.rejectionMessages.find((item) => item.id === messageId);
  if (!message || message.toManagerId !== state.user?.id) return;
  const deal = state.crmDeals.find((item) => item.id === message.crmDealId);
  message.readAt = new Date().toISOString();
  if (deal) {
    if (state.user.role !== "admin") {
      if (deal.managerId === state.user.id) {
        state.crmScope = "own";
      } else if ((state.lineReports[state.user.id] || []).includes(deal.managerId)) {
        state.crmScope = "team";
      } else {
        state.crmScope = "full";
      }
    }
    state.selectedCrmManagerId = "all";
    state.activeCrmStage = "all";
    state.selectedCrmDealId = deal.id;
  }
  state.activeView = "crm";
  saveState();
  app();
}

function openCrmDeal(dealId) {
  const deal = state.crmDeals.find((item) => item.id === dealId);
  if (!deal || !canAccessManager(deal.managerId)) return;
  if (!hasAllRosterAccess()) {
    if (deal.managerId === state.user.id) {
      state.crmScope = "own";
    } else if ((state.lineReports[state.user.id] || []).includes(deal.managerId)) {
      state.crmScope = "team";
    } else {
      state.crmScope = "full";
    }
  }
  state.selectedCrmManagerId = "all";
  state.selectedCrmTalentKey = "all";
  state.activeCrmStage = "all";
  state.selectedCrmDealId = deal.id;
  state.activeView = "crm";
  app();
}

function dismissRejectionMessage(messageId) {
  if (state.user?.role === "admin") return;
  state.rejectionMessages = state.rejectionMessages.filter((message) => !(message.id === messageId && message.toManagerId === state.user.id));
  saveState();
  app();
}

function approvePendingExpense(id) {
  const expense = state.pendingExpenses.find((item) => item.id === id);
  if (!expense || !canApprovePendingExpense(expense)) return;
  const { submittedBy, approverId, submittedAt, ...approvedExpense } = expense;
  state.expenses.push(approvedExpense);
  state.pendingExpenses = state.pendingExpenses.filter((item) => item.id !== id);
  saveState();
  app();
}

function rejectPendingExpense(id) {
  const expense = state.pendingExpenses.find((item) => item.id === id);
  if (!expense || !canApprovePendingExpense(expense)) return;
  state.pendingExpenses = state.pendingExpenses.filter((item) => item.id !== id);
  saveState();
  app();
}

function canApprovePendingExpense(expense) {
  return state.user?.role === "admin" || expense.approverId === state.user?.id;
}

function managerEmail(id) {
  return (allManagerRecords().find((manager) => manager.id === id) || {}).email || "";
}

function markCrmDealPaid(id) {
  const deal = state.crmDeals.find((item) => item.id === id);
  if (!deal || !canEditCrmDeal(deal)) return;
  window.alert("Use Talent Invoices to mark the talent invoice paid. The CRM deal will then move to Paid automatically.");
}

function productionRequestTotal(request) {
  const rates = request.itemRates || state.productionRates || defaultProductionRates;
  const days = request.itemDays || {};
  return (request.items || []).reduce((total, item) => total + (Number(rates[item] || 0) * Math.max(1, Number(days[item] || 1))), 0);
}

function productionItemsLabel(request) {
  const days = request.itemDays || {};
  return (request.items || []).map((item) => {
    const count = Math.max(1, Number(days[item] || 1));
    return `${item} x ${count} ${count === 1 ? "day" : "days"}`;
  }).join(", ");
}

function updateProductionFormTotal() {
  const totalEl = document.querySelector("[data-production-total]");
  if (!totalEl) return;
  const items = [...document.querySelectorAll("[data-production-item]:checked")].map((input) => input.value);
  const itemDays = {};
  items.forEach((item) => {
    const input = document.querySelector(`[data-production-days="${CSS.escape(item)}"]`);
    itemDays[item] = Math.max(1, Number(input?.value || 1));
  });
  totalEl.textContent = money(productionRequestTotal({ items, itemRates: state.productionRates, itemDays }));
}

function updateProductionRate(input) {
  if (!["admin", "operations", "production"].includes(state.user.role)) return;
  const item = input.dataset.productionRate;
  if (!productionItems.includes(item)) return;
  state.productionRates[item] = Math.max(0, parseCurrency(input.value));
  saveState();
  app();
}

function addProductionRequest(formData) {
  if (!["admin", "manager"].includes(state.user.role)) return;
  const requestedManagerId = formData.get("managerId") || state.user.id;
  const managerId = state.user.role === "admin" ? requestedManagerId : state.user.id;
  const talentName = String(formData.get("talentName") || "").trim();
  const shootDate = String(formData.get("shootDate") || "").trim();
  const videoBrief = String(formData.get("videoBrief") || "").trim();
  const items = formData.getAll("items").filter((item) => productionItems.includes(item));
  if (!managerId || !talentName || !shootDate || !videoBrief || !items.length) {
    window.alert("Add talent, date of production, what the video is, and at least one production item.");
    return;
  }
  const itemRates = {};
  const itemDays = {};
  items.forEach((item) => {
    itemRates[item] = Number(state.productionRates[item] || 0);
    itemDays[item] = Math.max(1, Number(formData.get(`days-${item}`) || 1));
  });
  state.talents[managerId] = uniqueNames([...(state.talents[managerId] || []), talentName]);
  state.productionRequests.unshift({
    id: `production-${Date.now()}`,
    managerId,
    talentName,
    shootDate,
    videoBrief,
    items,
    itemRates,
    itemDays,
    amount: productionRequestTotal({ items, itemRates, itemDays }),
    status: "Pending",
    message: "",
    submittedBy: state.user.id,
    submittedAt: new Date().toISOString(),
    reviewedBy: "",
    reviewedAt: "",
    managerSeenAt: "",
    cancelledBy: "",
    cancelledAt: "",
    productionSeenAt: "",
    financeStatus: "",
    chargebackRequestedAt: "",
    chargebackPaymentRunDate: ""
  });
  state.selectedProductionManagerId = managerId;
  saveState();
  app();
}

function acceptProductionRequest(id) {
  if (state.user.role !== "production") return;
  const request = state.productionRequests.find((item) => item.id === id);
  if (!request || request.status !== "Pending") return;
  request.status = "Accepted";
  request.message = "";
  request.reviewedBy = state.user.id;
  request.reviewedAt = new Date().toISOString();
  saveState();
  app();
}

function rejectProductionRequest(id) {
  if (state.user.role !== "production") return;
  const request = state.productionRequests.find((item) => item.id === id);
  if (!request || request.status !== "Pending") return;
  const reason = window.prompt("Reason for rejecting this production request?") || "No reason provided";
  request.status = "Rejected";
  request.message = reason;
  request.reviewedBy = state.user.id;
  request.reviewedAt = new Date().toISOString();
  saveState();
  app();
}

function cancelProductionRequest(id) {
  if (state.user.role !== "manager") return;
  const request = state.productionRequests.find((item) => item.id === id);
  if (!request || !canAccessManager(request.managerId) || request.financeStatus === "Chargeback requested") return;
  if (!window.confirm("Remove this production request and notify Production that it has been cancelled?")) return;
  request.status = "Cancelled";
  request.message = "Request cancelled";
  request.cancelledBy = state.user.id;
  request.cancelledAt = new Date().toISOString();
  request.productionSeenAt = "";
  saveState();
  app();
}

function removeProductionRequest(id) {
  if (state.user.role !== "production") return;
  if (!window.confirm("Remove this production request from the portal?")) return;
  state.productionRequests = state.productionRequests.filter((request) => request.id !== id);
  saveState();
  app();
}

function requestProductionChargeback(id) {
  if (state.user.role !== "finance" && state.user.role !== "admin") return;
  const request = state.productionRequests.find((item) => item.id === id);
  if (!request || request.status !== "Accepted") return;
  request.financeStatus = "Chargeback requested";
  request.chargebackRequestedAt = new Date().toISOString();
  request.chargebackPaymentRunDate = productionPaymentRunDate(request.shootDate);
  saveState();
  app();
}

async function addExpense(formData) {
  const requestedManagerId = formData.get("managerId") || state.user.id;
  const managerId = state.user.role === "admin" || canAccessManager(requestedManagerId) ? requestedManagerId : state.user.id;
  const receipt = formData.get("receipt");
  const hasReceipt = receipt && receipt.name && receipt.size;
  const expense = {
    id: `expense-${Date.now()}`,
    managerId,
    category: formData.get("category") === "Marketing" ? "Marketing" : "Client entertaining",
    monthIndex: Number(formData.get("monthIndex") || 0),
    amount: parseCurrency(formData.get("amount")),
    note: String(formData.get("note") || "").trim(),
    receiptName: hasReceipt ? receipt.name : "",
    receiptData: hasReceipt ? await fileToDataURL(receipt) : ""
  };
  if (hasAllRosterAccess()) {
    state.expenses.push(expense);
  } else {
    state.pendingExpenses.push({
      ...expense,
      submittedBy: state.user.id,
      approverId: approvalApproverFor(managerId),
      submittedAt: new Date().toISOString()
    });
  }
  saveState();
}

async function addTalentExpense(formData) {
  if (state.user.role === "finance" || state.user.role === "production") return;
  const dealId = String(formData.get("crmDealId") || "");
  const deal = state.crmDeals.find((item) => item.id === dealId);
  if (!deal || !canAccessManager(deal.managerId)) return;
  const amount = parseCurrency(formData.get("amount"));
  if (amount <= 0) {
    window.alert("Add an expense amount before saving.");
    return;
  }
  const receipt = formData.get("receipt");
  const hasReceipt = receipt && receipt.name && receipt.size;
  state.talentExpenses.unshift({
    id: `talent-expense-${Date.now()}`,
    managerId: deal.managerId,
    talentName: deal.talentName,
    crmDealId: deal.id,
    amount,
    note: String(formData.get("note") || "").trim(),
    receiptName: hasReceipt ? receipt.name : "",
    receiptData: hasReceipt ? await fileToDataURL(receipt) : "",
    submittedBy: state.user.id,
    submittedAt: new Date().toISOString(),
    financeStatus: "Pending finance",
    financeActionedAt: "",
    financeActionedBy: ""
  });
  deal.xeroStatus = deal.xeroInvoiceId ? "Updated with talent expenses" : "Talent expenses attached to invoice";
  deal.updatedAt = new Date().toISOString();
  saveState();
}

function markTalentExpenseAddedToInvoice(expenseId) {
  if (state.user.role !== "finance" && state.user.role !== "admin") return;
  const expense = state.talentExpenses.find((item) => item.id === expenseId);
  if (!expense) return;
  expense.financeStatus = "Added to invoice";
  expense.financeActionedAt = new Date().toISOString();
  expense.financeActionedBy = state.user.id;
  const deal = state.crmDeals.find((item) => item.id === expense.crmDealId);
  if (deal) {
    deal.xeroStatus = `Updated with ${money(dealTalentExpenseTotal(deal.id))} talent expenses`;
    deal.updatedAt = new Date().toISOString();
  }
  saveState();
  app();
}

function leadFormData(leadId) {
  const form = document.querySelector(`[data-email-lead-form="${CSS.escape(leadId)}"]`);
  return form ? new FormData(form) : new FormData();
}

function emailLeadPayload(leadId) {
  const lead = state.emailLeads.find((item) => item.id === leadId);
  if (!lead) return null;
  const formData = leadFormData(leadId);
  const managerId = formData.get("managerId") || lead.managerId;
  return {
    lead,
    managerId: canAccessManager(managerId) ? managerId : lead.managerId,
    category: String(formData.get("category") || lead.category || "Deal"),
    talentName: String(formData.get("talentName") || lead.talentName || "").trim(),
    company: String(formData.get("company") || lead.company || "").trim(),
    campaignName: String(formData.get("campaignName") || lead.campaignName || "").trim(),
    amount: parseCurrency(formData.get("amount") || lead.amount),
    monthIndex: Math.min(11, Math.max(0, Number(formData.get("monthIndex") ?? lead.monthIndex ?? currentMonthIndex()))),
    contactEmail: normalizeEmailContacts(formData.get("contactEmail") || lead.contactEmail || lead.from),
    eventDate: String(formData.get("eventDate") || lead.eventDate || "").trim(),
    actionPoint: String(formData.get("actionPoint") || lead.actionPoint || "").trim()
  };
}

function convertEmailLead(leadId, target) {
  const payload = emailLeadPayload(leadId);
  if (!payload || payload.lead.status !== "New") return;
  if (!payload.managerId || !payload.talentName || !payload.company) {
    window.alert("Add manager, talent and brand before routing this email.");
    return;
  }
  if (target === "crm") {
    const crmDeal = {
      id: `crm-email-${Date.now()}`,
      managerId: payload.managerId,
      talentName: payload.talentName,
      campaignName: payload.campaignName,
      company: payload.company,
      emailContact: payload.contactEmail,
      billingAddress: "",
      invoiceReference: "",
      noPoNumber: false,
      xeroAccountCode: "200",
      xeroTaxRate: "No VAT",
      direction: "Inbound",
      stage: "Conversation",
      amount: payload.amount,
      currency: "GBP",
      liveMonthIndex: payload.monthIndex,
      signedMonthIndex: null,
      paymentTerm: "30",
      customPaymentDays: 0,
      contractName: "",
      contractData: "",
      pAndLDealId: "",
      xeroInvoiceId: "",
      xeroStatus: "Created from email lead",
      xeroCreatedAt: "",
      xeroDueDate: "",
      xeroInvoiceStatus: "",
      xeroPaymentStatus: "",
      xeroReconciledAt: "",
      xeroDraftPayload: null,
      financeInvoicedAt: "",
      financeStatus: "",
      financeSubmittedAt: "",
      financeAcceptedAt: "",
      financeRejectedAt: "",
      financeRejectionReason: "",
      submittedBy: state.user.id,
      updatedAt: new Date().toISOString()
    };
    state.talents[payload.managerId] = uniqueNames([...(state.talents[payload.managerId] || []), payload.talentName]);
    state.crmDeals.push(crmDeal);
    upsertBrandFromCrmDeal(crmDeal);
    markEmailLeadConverted(payload.lead, "CRM", crmDeal.id);
  } else if (target === "pr") {
    const request = {
      id: `pr-email-${Date.now()}`,
      managerId: payload.managerId,
      talentName: payload.talentName,
      brand: payload.company,
      campaignName: payload.campaignName || payload.lead.subject,
      contactEmail: payload.contactEmail,
      actionPoint: payload.actionPoint || `Send details to ${payload.talentName}`,
      status: "Open",
      sourceEmailId: payload.lead.id,
      delegatedFromManagerId: "",
      delegatedToManagerId: "",
      delegatedAt: "",
      createdAt: new Date().toISOString(),
      notes: payload.lead.body
    };
    state.prRequests.push(request);
    markEmailLeadConverted(payload.lead, "PR Requests", request.id);
  } else if (target === "event") {
    const request = {
      id: `event-email-${Date.now()}`,
      managerId: payload.managerId,
      talentName: payload.talentName,
      brand: payload.company,
      eventName: payload.campaignName || payload.lead.subject,
      eventDate: payload.eventDate,
      contactEmail: payload.contactEmail,
      actionPoint: payload.actionPoint || `Check availability with ${payload.talentName}`,
      status: "Open",
      sourceEmailId: payload.lead.id,
      delegatedFromManagerId: "",
      delegatedToManagerId: "",
      delegatedAt: "",
      createdAt: new Date().toISOString(),
      notes: payload.lead.body
    };
    state.eventRequests.push(request);
    markEmailLeadConverted(payload.lead, "Events", request.id);
  }
  saveState();
  app();
}

function markEmailLeadConverted(lead, convertedTo, convertedId) {
  lead.status = "Converted";
  lead.convertedTo = convertedTo;
  lead.convertedId = convertedId;
  lead.convertedAt = new Date().toISOString();
  lead.archivedAt = lead.convertedAt;
}

function dismissEmailLead(leadId) {
  const lead = state.emailLeads.find((item) => item.id === leadId);
  if (!lead || state.user?.role !== "manager" || lead.managerId !== state.user.id) return;
  lead.status = "Dismissed";
  lead.archivedAt = new Date().toISOString();
  saveState();
  app();
}

function restoreEmailLead(leadId) {
  const lead = state.emailLeads.find((item) => item.id === leadId);
  if (!lead || state.user?.role !== "manager" || lead.managerId !== state.user.id) return;
  lead.status = "New";
  lead.archivedAt = "";
  lead.convertedTo = "";
  lead.convertedId = "";
  lead.convertedAt = "";
  saveState();
  app();
}

function updateRequestStatus(type, requestId, status) {
  const list = requestListForType(type);
  const request = list.find((item) => item.id === requestId);
  if (!request || !requestIsActionableForCurrentUser(request)) return;
  request.status = status === "Dismissed" ? "Dismissed" : "Actioned";
  request.archivedAt = new Date().toISOString();
  saveState();
  app();
}

function restoreRequest(type, requestId) {
  const list = requestListForType(type);
  const request = list.find((item) => item.id === requestId);
  const canRestore = state.user?.role === "manager" && (request?.managerId === state.user.id || request?.delegatedToManagerId === state.user.id);
  if (!request || !canRestore) return;
  request.status = "Open";
  request.archivedAt = "";
  saveState();
  app();
}

function delegateRequest(type, requestId, targetManagerId) {
  const list = requestListForType(type);
  const request = list.find((item) => item.id === requestId);
  if (!request || state.user?.role !== "manager" || request.managerId !== state.user.id) return;
  if (!targetManagerId) {
    window.alert("Choose a manager before delegating this action.");
    return;
  }
  if (!canDelegateRequestTo(targetManagerId)) {
    window.alert("You do not have request delegation access for that manager.");
    return;
  }
  request.delegatedFromManagerId = request.delegatedFromManagerId || state.user.id;
  request.delegatedToManagerId = targetManagerId;
  request.delegatedAt = new Date().toISOString();
  request.status = "Open";
  saveState();
  app();
}

function scanInboxDemo() {
  if (state.user?.role !== "manager") return;
  const manager = state.user;
  const talents = talentOptions(manager.id);
  const randomItem = (items) => items[Math.floor(Math.random() * items.length)];
  const talentName = talents.length ? randomItem(talents) : "New Talent";
  const monthName = randomItem(months);
  const samples = [
    {
      category: "Deal",
      company: "Sephora",
      campaignName: "Summer beauty partnership",
      amount: 22000,
      actionPoint: `Check deliverables with ${talentName}.`,
      fromName: "partnerships",
      body: `Hi ${manager.name},\n\nHope you're well. We're pulling together a paid creator campaign for Sephora's summer beauty partnership and would love to discuss ${talentName}.\n\nInitial scope would be 1 x TikTok, 1 x Instagram Reel and usage across Sephora paid social for 30 days. Our budget is around £22,000 and we are looking to go live in ${monthName}.\n\nCould you let us know if ${talentName} is interested and whether the budget/deliverables feel workable?\n\nBest,\nPartnerships Team`
    },
    {
      category: "Deal",
      company: "Gymshark",
      campaignName: "Training app launch",
      amount: 18500,
      actionPoint: `Confirm ${talentName}'s availability and whether the fitness deliverables work.`,
      fromName: "influencer",
      body: `Hi ${manager.name},\n\nWe're launching a new Gymshark training app feature and think ${talentName} would be a strong fit for the campaign.\n\nWe are looking for 2 x short-form videos, 3 x story frames and a 14-day organic usage window. The fee we have in mind is £18,500, with content needed before the end of ${monthName}.\n\nCould you send over availability, rate confirmation and any category conflicts?\n\nThanks,\nGymshark Influencer Team`
    },
    {
      category: "Deal",
      company: "Spotify",
      campaignName: "Podcast launch partnership",
      amount: 12000,
      actionPoint: `Ask ${talentName} if they are happy to promote the podcast launch.`,
      fromName: "talentpartnerships",
      body: `Hello ${manager.name},\n\nSpotify is supporting a new podcast launch and we'd love to explore a paid partnership with ${talentName}.\n\nThe idea is 1 x Reel/TikTok style video and 2 x story frames linking to the show. We have £12,000 allocated and would need content live during ${monthName}.\n\nPlease can you let us know if this is something ${talentName} would consider?\n\nBest,\nSpotify Partnerships`
    },
    {
      category: "PR",
      company: "Glow Lab",
      campaignName: "Skincare PR send-out",
      amount: 0,
      actionPoint: `Ask ${talentName} if they would like the PR package.`,
      fromName: "press",
      body: `Hi ${manager.name},\n\nWe would love to send ${talentName} our new Glow Lab skincare PR package ahead of launch next month.\n\nThere are no paid deliverables attached. We'd just need confirmation that ${talentName} is happy to receive the product, plus the best postal address and any skin sensitivities we should be aware of.\n\nIf they do decide to post organically, that would be lovely, but there is absolutely no obligation.\n\nThanks,\nGlow Lab Press Team`
    },
    {
      category: "PR",
      company: "Daily Drip",
      campaignName: "Cold brew PR drop",
      amount: 0,
      actionPoint: `Check whether ${talentName} wants the cold brew PR delivery.`,
      fromName: "press",
      body: `Hi ${manager.name},\n\nWe're sending out a limited Daily Drip cold brew package next week and would love to include ${talentName}.\n\nThis is gifting only, with no contracted deliverables. The package includes the full launch range and a small branded cooler.\n\nCould you confirm if ${talentName} would like to receive it and where we should send it?\n\nThanks,\nDaily Drip PR`
    },
    {
      category: "PR",
      company: "Charlotte Tilbury",
      campaignName: "Holiday beauty mailer",
      amount: 0,
      actionPoint: `Send ${talentName}'s shade preferences if they want the mailer.`,
      fromName: "vip",
      body: `Hi ${manager.name},\n\nWe are preparing a Charlotte Tilbury holiday beauty mailer and would love to gift one to ${talentName}.\n\nNo deliverables are required, but if ${talentName} enjoys the products we would of course be thrilled if they shared organically.\n\nCould you send preferred foundation shade, postal address and phone number for courier tracking?\n\nBest,\nCharlotte Tilbury VIP Team`
    },
    {
      category: "Event",
      company: "Soho House",
      campaignName: "Creator breakfast",
      amount: 0,
      eventDate: "2026-08-06",
      actionPoint: `Check ${talentName}'s availability and dietary requirements.`,
      fromName: "events",
      body: `Hi ${manager.name},\n\nWe're hosting an intimate creator breakfast at Soho House on Thursday 6 August and would love to invite ${talentName}.\n\nThe event will run from 9:30am to 11:00am and includes a short brand preview followed by breakfast. There are no posting requirements, but we would be happy for guests to share if they would like to.\n\nCould you confirm whether ${talentName} is available, and send over any dietary requirements?\n\nBest,\nEvents Team`
    },
    {
      category: "Event",
      company: "Nike",
      campaignName: "Run club launch",
      amount: 0,
      eventDate: "2026-09-12",
      actionPoint: `Check if ${talentName} can attend the Nike run club launch.`,
      fromName: "events",
      body: `Hi ${manager.name},\n\nNike is launching a new run club series and we would love ${talentName} to join the first session on Saturday 12 September.\n\nThe morning includes a short run, breakfast and a product preview. There are no mandatory posts, but guests are welcome to capture content if they want to.\n\nCan you let us know if ${talentName} is free and whether they have any kit size preferences?\n\nBest,\nNike Events`
    },
    {
      category: "Event",
      company: "ASOS",
      campaignName: "Autumn preview dinner",
      amount: 0,
      eventDate: "2026-10-03",
      actionPoint: `Ask ${talentName} if they can attend the ASOS preview dinner.`,
      fromName: "rsvp",
      body: `Hi ${manager.name},\n\nWe'd love to invite ${talentName} to the ASOS autumn preview dinner on Friday 3 October.\n\nIt will be a relaxed dinner with a first look at the new collection, hosted in central London from 7pm. No posting is required, but we will have a content corner available for guests.\n\nPlease can you confirm availability plus any dietary requirements?\n\nThanks,\nASOS RSVP Team`
    }
  ];
  const sample = randomItem(samples);
  const sender = sample.fromName || "partnerships";
  const domain = slugify(sample.company);
  state.emailLeads.unshift({
    id: `email-lead-demo-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    managerId: manager.id,
    from: `${sender}@${domain}.com`,
    subject: `${talentName} - ${sample.campaignName}`,
    receivedAt: new Date().toISOString(),
    status: "New",
    talentName,
    company: sample.company,
    campaignName: sample.campaignName,
    amount: sample.amount,
    monthIndex: currentMonthIndex(),
    paymentTerm: "30",
    contactEmail: `${sender}@${domain}.com`,
    eventDate: sample.eventDate || "",
    category: sample.category,
    actionPoint: sample.actionPoint,
    body: sample.body
  });
  saveState();
  app();
}

async function addCrmDeal(formData) {
  if (["finance", "operations"].includes(state.user.role)) return;
  const requestedManagerId = formData.get("managerId") || state.user.id;
  const managerId = hasAllRosterAccess() ? requestedManagerId : state.user.id;
  const talentName = String(formData.get("talentName") || "").trim();
  const contract = formData.get("contract");
  const hasContract = contract && contract.name && contract.size;
  if (!managerId || !talentName) return;
  const requestedStage = crmStages.includes(formData.get("stage")) ? formData.get("stage") : "Conversation";
  if (requestedStage === "Paid") {
    window.alert("Deals can only become Paid after the talent invoice is marked paid in Talent Invoices.");
    return;
  }
  if (isPostInvoiceStage(requestedStage)) {
    if (!canManuallyMovePostInvoiceStage(requestedStage)) {
      window.alert("Managers cannot add deals directly into Invoiced, On Next Payment Run, or Paid.");
      return;
    }
    if (!window.confirm(`This stage is normally updated by Xero or the talent payment run. Do you want to manually create this deal in ${requestedStage}?`)) return;
  }
  state.talents[managerId] = uniqueNames([...(state.talents[managerId] || []), talentName]);
  const crmDeal = {
    id: `crm-${Date.now()}`,
    managerId,
    talentName,
    campaignName: String(formData.get("campaignName") || "").trim(),
    company: String(formData.get("company") || "").trim(),
    emailContact: normalizeEmailContacts(formData.get("emailContact")),
    billingAddress: String(formData.get("billingAddress") || "").trim(),
    invoiceReference: String(formData.get("invoiceReference") || "").trim(),
    noPoNumber: Boolean(formData.get("noPoNumber")),
    xeroAccountCode: String(formData.get("xeroAccountCode") || "200").trim(),
    xeroTaxRate: String(formData.get("xeroTaxRate") || "No VAT").trim(),
    direction: crmDirections.includes(formData.get("direction")) ? formData.get("direction") : "Inbound",
    stage: requestedStage,
    amount: parseCurrency(formData.get("amount")),
    currency: formData.get("currencyUsd") === "USD" ? "USD" : "GBP",
    liveMonthIndex: currentMonthIndex(),
    signedMonthIndex: null,
    paymentTerm: paymentTerms.some((term) => term.value === formData.get("paymentTerm")) ? formData.get("paymentTerm") : "30",
    customPaymentDays: Math.max(0, Number(formData.get("customPaymentDays") || 0)),
    contractName: hasContract ? contract.name : "",
    contractData: hasContract ? await fileToDataURL(contract) : "",
    pAndLDealId: "",
    xeroInvoiceId: "",
    xeroStatus: "",
    xeroCreatedAt: "",
    xeroDueDate: "",
    xeroInvoiceStatus: "",
    xeroPaymentStatus: "",
    xeroReconciledAt: "",
    xeroDraftPayload: null,
    financeInvoicedAt: "",
    financeStatus: crmStages.includes(formData.get("stage")) && formData.get("stage") === "To Be Invoiced" ? "Pending finance" : "",
    financeSubmittedAt: crmStages.includes(formData.get("stage")) && formData.get("stage") === "To Be Invoiced" ? new Date().toISOString() : "",
    financeAcceptedAt: "",
    financeRejectedAt: "",
    financeRejectionReason: "",
    submittedBy: state.user.id,
    updatedAt: new Date().toISOString()
  };
  if (crmDeal.stage === "To Be Invoiced") {
    const missing = invoiceMustHaveMissingFields(crmDeal);
    if (missing.length) {
      window.alert(`Add these before moving to To Be Invoiced: ${missing.join(", ")}`);
      return;
    }
  }
  if (crmDeal.stage === "Contract Signed") submitCrmDealToPandL(crmDeal);
  if (crmDeal.stage === "To Be Invoiced") queueDealForFinance(crmDeal);
  state.crmDeals.push(crmDeal);
  upsertBrandFromCrmDeal(crmDeal);
  state.selectedManagerId = managerId;
  state.selectedCrmDealId = crmDeal.id;
  state.crmAddOpen = false;
  saveState();
}

function updateCrmDealField(field, render = true) {
  const deal = state.crmDeals.find((item) => item.id === field.dataset.crmUpdate);
  if (!deal || !canEditCrmDeal(deal)) return;
  const key = field.dataset.field;
  if (key === "amount") {
    deal.amount = parseCurrency(field.value);
  } else if (key === "currency" && ["GBP", "USD"].includes(field.value)) {
    deal.currency = field.value;
  } else if (key === "customPaymentDays") {
    deal.customPaymentDays = Math.max(0, Number(field.value || 0));
  } else if (key === "stage" && crmStages.includes(field.value)) {
    if (!setCrmDealStage(deal, field.value)) {
      saveState();
      if (render) app();
      return;
    }
  } else if (key === "direction" && crmDirections.includes(field.value)) {
    deal.direction = field.value;
  } else if (key === "paymentTerm" && paymentTerms.some((term) => term.value === field.value)) {
    deal.paymentTerm = field.value;
  } else if (key === "talentName") {
    deal.talentName = String(field.value || "").trim();
    if (deal.talentName) state.talents[deal.managerId] = uniqueNames([...(state.talents[deal.managerId] || []), deal.talentName]);
  } else if (key === "noPoNumber") {
    deal.noPoNumber = Boolean(field.checked);
  } else if (key === "emailContact") {
    deal.emailContact = normalizeEmailContacts(field.value);
  } else if (["company", "campaignName", "billingAddress", "invoiceReference", "xeroAccountCode", "xeroTaxRate"].includes(key)) {
    deal[key] = String(field.value || "").trim();
  }
  if (key !== "stage") deal.updatedAt = new Date().toISOString();
  if (["company", "emailContact", "billingAddress", "paymentTerm", "customPaymentDays"].includes(key)) {
    upsertBrandFromCrmDeal(deal);
  }
  syncLinkedPandLDeal(deal);
  saveState();
  if (render) app();
}

function syncLinkedPandLDeal(crmDeal) {
  if (!crmDeal.pAndLDealId) return;
  const deal = state.deals.find((item) => item.id === crmDeal.pAndLDealId)
    || state.pendingDeals.find((item) => item.id === crmDeal.pAndLDealId);
  if (!deal) return;
  deal.talentName = crmDeal.talentName;
  deal.campaignName = crmDeal.campaignName || crmDeal.company || "CRM deal";
  deal.monthValues = months.map((_, index) => index === signedMonthIndex(crmDeal) ? dealGbpAmount(crmDeal) : 0);
}

function saveCrmDetail(dealId) {
  const deal = state.crmDeals.find((item) => item.id === dealId);
  if (!deal || !canEditCrmDeal(deal)) return;
  saveCrmFieldsForDeal(dealId);
  state.savedCrmDealId = dealId;
  saveState();
  app();
  window.setTimeout(() => {
    if (state.savedCrmDealId === dealId) {
      state.savedCrmDealId = null;
      app();
    }
  }, 1400);
}

function removeCrmDeal(dealId) {
  const deal = state.crmDeals.find((item) => item.id === dealId);
  if (!deal || !canDeleteCrmDeal(deal)) return;
  if (!window.confirm(`Remove ${deal.talentName}${deal.company ? ` x ${deal.company}` : ""} from the CRM?`)) return;
  state.crmDeals = state.crmDeals.filter((item) => item.id !== dealId);
  state.deals = state.deals.filter((item) => item.crmDealId !== dealId && item.id !== deal.pAndLDealId);
  state.pendingDeals = state.pendingDeals.filter((item) => item.crmDealId !== dealId && item.id !== deal.pAndLDealId);
  state.talentExpenses = state.talentExpenses.filter((expense) => expense.crmDealId !== dealId);
  state.rejectionMessages = state.rejectionMessages.filter((message) => message.crmDealId !== dealId);
  if (state.selectedCrmDealId === dealId) state.selectedCrmDealId = null;
  if (state.selectedTalentExpenseDealId === dealId) state.selectedTalentExpenseDealId = null;
  saveState();
  app();
}

function saveCrmFieldsForDeal(dealId, root = document) {
  root.querySelectorAll(`[data-crm-update="${CSS.escape(dealId)}"]`).forEach((field) => {
    updateCrmDealField(field, false);
  });
}

function createFinanceXeroDraft(dealId) {
  if (state.user?.role !== "finance" && state.user?.role !== "admin") return;
  const deal = state.crmDeals.find((item) => item.id === dealId);
  if (!deal) return;
  const card = document.querySelector(`[data-finance-card="${CSS.escape(dealId)}"]`);
  saveCrmFieldsForDeal(dealId, card || document);
  const missing = createXeroDraftForDeal(deal);
  if (missing.length) {
    deal.xeroStatus = `Missing: ${missing.join(", ")}`;
    saveState();
    window.alert(`Add these details before updating the Xero draft invoice: ${missing.join(", ")}`);
    app();
    return;
  }
  deal.financeStatus = "Draft created in Xero";
  saveState();
  window.alert(`Draft invoice ${deal.xeroInvoiceId} has been updated in Xero.`);
  app();
}

function xeroDraftInvoicePayload(deal) {
  return {
    type: "ACCREC",
    status: "DRAFT",
    contact: {
      name: deal.company,
      emailAddresses: emailContactList(deal.emailContact),
      address: deal.billingAddress
    },
    reference: deal.noPoNumber ? "No PO" : deal.invoiceReference,
    dueDate: crmDueDate(deal),
    currency: deal.currency || "GBP",
    lineItems: [
      {
        description: deal.campaignName || `${deal.talentName} campaign`,
        quantity: 1,
        unitAmount: Number(deal.amount || 0),
        accountCode: deal.xeroAccountCode,
        taxType: deal.xeroTaxRate
      },
      ...dealTalentExpenses(deal.id).map((expense) => ({
        description: expense.note || "Talent expense",
        quantity: 1,
        unitAmount: Number(expense.amount || 0),
        accountCode: deal.xeroAccountCode,
        taxType: deal.xeroTaxRate
      }))
    ]
  };
}

function openFinanceXeroInvoice(dealId) {
  if (state.user?.role !== "finance" && state.user?.role !== "admin") return;
  const deal = state.crmDeals.find((item) => item.id === dealId);
  if (!deal || !deal.xeroInvoiceId) return;
  window.open(xeroInvoiceUrl(deal), "_blank", "noopener");
}

function dismissFinanceAlert(dealId) {
  if (state.user?.role !== "finance" && state.user?.role !== "admin") return;
  const deal = state.crmDeals.find((item) => item.id === dealId);
  if (!deal || deal.financeStatus !== "Invoiced in Xero") return;
  deal.financeAlertDismissedAt = new Date().toISOString();
  saveState();
  app();
}

function acceptFinanceDeal(dealId) {
  if (state.user?.role !== "finance" && state.user?.role !== "admin") return;
  const deal = state.crmDeals.find((item) => item.id === dealId);
  if (!deal) return;
  const card = document.querySelector(`[data-finance-card="${CSS.escape(dealId)}"]`);
  saveCrmFieldsForDeal(dealId, card || document);
  const missing = missingXeroFields(deal);
  if (missing.length) {
    deal.xeroStatus = `Missing: ${missing.join(", ")}`;
    saveState();
    window.alert(`Add these details before accepting: ${missing.join(", ")}`);
    app();
    return;
  }
  if (!deal.xeroInvoiceId) {
    window.alert("Create the draft invoice in Xero before accepting this finance action.");
    return;
  }
  deal.stage = "Invoiced";
  deal.xeroStatus = dealTalentExpenseTotal(deal.id) ? `Draft accepted with ${money(dealTalentExpenseTotal(deal.id))} talent expenses` : "Draft accepted";
  deal.xeroDueDate = deal.xeroDueDate || crmDueDate(deal);
  deal.financeStatus = "Accepted";
  deal.financeAcceptedAt = new Date().toISOString();
  deal.financeRejectedAt = "";
  deal.financeRejectionReason = "";
  saveState();
  app();
}

function rejectFinanceDeal(dealId) {
  if (state.user?.role !== "finance" && state.user?.role !== "admin") return;
  const deal = state.crmDeals.find((item) => item.id === dealId);
  if (!deal) return;
  const reason = window.prompt("Reason for rejecting this invoice request?") || "No reason provided";
  deal.financeStatus = "Rejected";
  deal.financeRejectedAt = new Date().toISOString();
  deal.financeRejectionReason = reason;
  deal.stage = "Negotiation";
  deal.xeroStatus = "Finance rejected";
  deal.updatedAt = new Date().toISOString();
  const recipientManagerId = deal.submittedBy && managerEmail(deal.submittedBy) ? deal.submittedBy : deal.managerId;
  state.rejectionMessages.push({
    id: `message-${Date.now()}`,
    toManagerId: recipientManagerId,
    toEmail: managerEmail(recipientManagerId),
    crmDealId: deal.id,
    subject: `Finance rejected: ${deal.campaignName || deal.company}`,
    body: `Finance rejected the invoice request for ${deal.talentName} x ${deal.company}. Reason: ${reason}`,
    createdAt: new Date().toISOString()
  });
  saveState();
  app();
}

function xeroInvoiceUrl(deal) {
  const invoiceId = encodeURIComponent(deal.xeroInvoiceId || deal.id);
  return `https://go.xero.com/AccountsReceivable/View.aspx?invoiceID=${invoiceId}`;
}

function xeroBillUrl(invoice) {
  const billId = encodeURIComponent(invoice.xeroBill?.billId || invoice.id);
  return `https://go.xero.com/AccountsPayable/View.aspx?invoiceID=${billId}`;
}

async function updateCrmContract(input) {
  const deal = state.crmDeals.find((item) => item.id === input.dataset.crmContract);
  if (!deal || !canEditCrmDeal(deal)) return;
  const contract = input.files && input.files[0];
  if (!contract) return;
  deal.contractName = contract.name;
  deal.contractData = await fileToDataURL(contract);
  deal.updatedAt = new Date().toISOString();
  saveState();
  app();
}

function fileToDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result || "")));
    reader.addEventListener("error", () => resolve(""));
    reader.readAsDataURL(file);
  });
}

function currentManualValue(input) {
  const monthIndex = Number(input.dataset.month);
  if (input.dataset.edit === "target") return state.targets[monthIndex];
  const row = state.overheads.find((item) => item.id === input.dataset.rowId);
  return row ? row.values[monthIndex] : 0;
}

function commitManualEdit(input) {
  const monthIndex = Number(input.dataset.month);
  const value = parseCurrency(input.value);
  const previousValue = Number(input.dataset.originalValue ?? currentManualValue(input));

  if (input.dataset.edit === "target") {
    if (previousValue !== value) pushUndo({ kind: "target", monthIndex, previousValue });
    state.targets[monthIndex] = value;
  } else {
    const row = state.overheads.find((item) => item.id === input.dataset.rowId);
    if (row) {
      const derived = Number(input.dataset.derived || 0);
      const baseValue = value - derived;
      if (previousValue !== baseValue) pushUndo({ kind: "overhead", rowId: row.id, monthIndex, previousValue });
      row.values[monthIndex] = baseValue;
    }
  }
  saveState();
  app();
}

window.selectCashflowMonth = selectCashflowMonth;
window.clearCashflowMonth = clearCashflowMonth;
globalThis.selectCashflowMonth = selectCashflowMonth;
globalThis.clearCashflowMonth = clearCashflowMonth;

try {
  app();
} catch (error) {
  if (typeof showStartupError === "function") {
    showStartupError(error && error.message ? error.message : error);
  } else {
    throw error;
  }
}
