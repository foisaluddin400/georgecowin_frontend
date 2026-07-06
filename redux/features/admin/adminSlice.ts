import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminState, Deal, CRMDeal, Expense, TalentExpense, ProductionRequest, EmailLead, PrRequest, EventRequest, BrandRecord } from "@/types/admin";

const defaultTargets = [75000, 79000, 91000, 109650, 135347.5, 143399.625, 174159.5688, 188033.5041, 207185.1793, 216794.4382, 216884.1601, 237478.3681];

const defaultOverheads = [
  { id: "staff", label: "Staff inc PAYE and NI", values: [12057.36, 12057.36, 15471, 15471, 18834.4, 18834.4, 18834.4, 18834.4, 18834.4, 18834.4, 18834.4, 18834.4] },
  { id: "bonus", label: "Bonuses and commission", values: [971.88, 635.12, 1112.94, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: "fixed", label: "Fixed and variable overheads", values: [1575, 1575, 1575, 1600, 1600, 1620, 1620, 1620, 1800, 1800, 1800, 1800] },
  { id: "entertaining", label: "Client entertaining", values: [440.94, 458.93, 0, 258, 192.06, 0, 0, 0, 0, 0, 0, 0] },
  { id: "marketing", label: "Marketing", values: [647.89, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
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

const defaultTalents: Record<string, string[]> = {
  amelia: ["Layo", "Issy", "Mia Rae", "Nell"],
  sam: ["Zayzz", "Flynn", "Talia", "Kai"],
  holly: ["GVO", "Chloe", "Marnie", "Jules"],
  kareem: ["Kareem Talent", "Niko", "Asha"],
  alex: ["Alex Talent", "Rumi", "Bea"]
};

const seedDeals: Deal[] = [
  { id: "seed-amelia-layo", managerId: "amelia", talentName: "Layo", status: "Confirmed", campaignName: "Roster", monthValues: [72305, 43380, 64550, 91965, 132922, 51048.47, 0, 0, 0, 0, 0, 0], costRate: 80 },
  { id: "seed-sam-zayzz", managerId: "sam", talentName: "Zayzz", status: "Confirmed", campaignName: "Roster", monthValues: [15110, 18500, 27111.26, 71867.94, 25675.19, 28810.94, 0, 0, 0, 0, 0, 0], costRate: 80 },
  { id: "seed-holly-gvo", managerId: "holly", talentName: "GVO", status: "Confirmed", campaignName: "Roster", monthValues: [25383, 20131.74, 19633, 32738, 52262, 37242.66, 0, 0, 0, 0, 0, 0], costRate: 80 },
  { id: "seed-kareem-talent", managerId: "kareem", talentName: "Kareem Talent", status: "Confirmed", campaignName: "Roster", monthValues: [0, 0, 0, 0, 0, 5000, 0, 0, 0, 0, 0, 0], costRate: 80 },
  { id: "seed-alex-talent", managerId: "alex", talentName: "Alex Talent", status: "Confirmed", campaignName: "Roster", monthValues: [0, 0, 0, 0, 0, 500, 0, 0, 0, 0, 0, 0], costRate: 80 },
  { id: "seed-sam-pipeline", managerId: "sam", talentName: "Flynn", status: "Pipeline", campaignName: "Brand launch", monthValues: [0, 0, 0, 0, 0, 0, 28000, 0, 0, 0, 0, 0], costRate: 80 }
];

const sampleDeals: Deal[] = [
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

const initialState: AdminState = {
  targets: defaultTargets,
  overheads: defaultOverheads,
  managerSalaries: defaultManagerSalaries,
  commissionRates: defaultCommissionRates,
  commissionOverrides: [],
  lineReports: {},
  requestDelegationPermissions: {},
  approvalRoutes: {},
  removedManagerIds: [],
  pendingDeals: [],
  pendingExpenses: [],
  rejectionMessages: [],
  expenses: [],
  talentExpenses: [],
  talents: defaultTalents,
  talentEmails: {},
  talentInvoiceDetails: {},
  talentProfiles: {},
  talentInvoicePayments: {},
  talentInvoiceBills: {},
  earlyTalentLinePayments: {},
  talentReportSends: [],
  talentRemittanceSends: [],
  productionRates: { Producer: 650, DOP: 850, Editor: 450 },
  productionRequests: [],
  emailLeads: [],
  prRequests: [],
  eventRequests: [],
  brandDatabase: {},
  navOrders: {},
  deals: [...seedDeals, ...sampleDeals],
  crmDeals: []
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminState: (state, action: PayloadAction<Partial<AdminState>>) => {
      return { ...state, ...action.payload };
    },
    updateCRMDeal: (state, action: PayloadAction<CRMDeal>) => {
      const index = state.crmDeals.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state.crmDeals[index] = action.payload;
      } else {
        state.crmDeals.push(action.payload);
      }
    },
    deleteCRMDeal: (state, action: PayloadAction<string>) => {
      state.crmDeals = state.crmDeals.filter((d) => d.id !== action.payload);
    },
    updateDeal: (state, action: PayloadAction<Deal>) => {
      const index = state.deals.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state.deals[index] = action.payload;
      } else {
        state.deals.push(action.payload);
      }
    },
    addProductionRequest: (state, action: PayloadAction<ProductionRequest>) => {
      state.productionRequests.push(action.payload);
    },
    updateProductionRequestStatus: (state, action: PayloadAction<{ id: string; status: ProductionRequest["status"]; reviewedBy?: string }>) => {
      const request = state.productionRequests.find((r) => r.id === action.payload.id);
      if (request) {
        request.status = action.payload.status;
        request.reviewedBy = action.payload.reviewedBy;
        request.reviewedAt = new Date().toISOString();
      }
    },
    updateManagerSalary: (state, action: PayloadAction<{ managerId: string; salary: number }>) => {
      state.managerSalaries[action.payload.managerId] = action.payload.salary;
    },
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
    },
    removeExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter((e) => e.id !== action.payload);
    },
    updateBrand: (state, action: PayloadAction<BrandRecord>) => {
      state.brandDatabase[action.payload.name.toLowerCase()] = action.payload;
    }
  }
});

export const { 
  setAdminState, 
  updateCRMDeal, 
  deleteCRMDeal, 
  updateDeal, 
  addProductionRequest, 
  updateProductionRequestStatus, 
  updateManagerSalary,
  addExpense,
  removeExpense,
  updateBrand
} = adminSlice.actions;

export default adminSlice.reducer;
