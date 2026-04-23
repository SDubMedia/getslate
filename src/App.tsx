import "./index.css"
import { Route, Switch } from "wouter"
import HomePage from "./pages/HomePage"
import InvoiceGeneratorPage from "./pages/InvoiceGeneratorPage"
import ProfitCalculatorPage from "./pages/ProfitCalculatorPage"
import ExpenseTrackerPage from "./pages/ExpenseTrackerPage"
import VsPage from "./pages/VsPage"
import ToolsIndexPage from "./pages/ToolsIndexPage"
import DroneLogPage from "./pages/DroneLogPage"
// Templates
import ContractTemplatePage from "./pages/templates/ContractTemplatePage"
import ModelReleasePage from "./pages/templates/ModelReleasePage"
import LocationReleasePage from "./pages/templates/LocationReleasePage"
import NdaPage from "./pages/templates/NdaPage"
import RateCardPage from "./pages/templates/RateCardPage"
import LatePaymentPage from "./pages/templates/LatePaymentPage"
import W9RequestPage from "./pages/templates/W9RequestPage"
import TestimonialRequestPage from "./pages/templates/TestimonialRequestPage"
import PressReleasePage from "./pages/templates/PressReleasePage"
import DepositReceiptPage from "./pages/templates/DepositReceiptPage"
import LateFeeAddendumPage from "./pages/templates/LateFeeAddendumPage"
import PaymentPlanPage from "./pages/templates/PaymentPlanPage"
import ChangeOrderPage from "./pages/templates/ChangeOrderPage"
import CrewDealMemoPage from "./pages/templates/CrewDealMemoPage"
import TimesheetPage from "./pages/templates/TimesheetPage"
import CreativeBriefPage from "./pages/templates/CreativeBriefPage"
import ClientIntakePage from "./pages/templates/ClientIntakePage"
import WrapReportPage from "./pages/templates/WrapReportPage"
import IcAgreementPage from "./pages/templates/IcAgreementPage"
import MinorReleasePage from "./pages/templates/MinorReleasePage"
import UsageLicensePage from "./pages/templates/UsageLicensePage"
import MusicLicensePage from "./pages/templates/MusicLicensePage"
import ShotListPage from "./pages/templates/ShotListPage"
import EquipmentRentalPage from "./pages/templates/EquipmentRentalPage"
import CaseStudyPage from "./pages/templates/CaseStudyPage"
import CallSheetPage from "./pages/templates/CallSheetPage"
import ProposalPage from "./pages/templates/ProposalPage"

function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0e17] text-white flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', system-ui" }}>Page not found</h1>
        <p className="text-slate-400 mb-6">That URL doesn't exist on getslate.net.</p>
        <a href="/" className="px-5 py-2.5 bg-[#0088ff] text-white font-semibold rounded-lg hover:bg-[#0066dd] transition-colors">Back home</a>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/tools" component={ToolsIndexPage} />
      <Route path="/invoice-generator" component={InvoiceGeneratorPage} />
      <Route path="/calculator" component={ProfitCalculatorPage} />
      <Route path="/expenses" component={ExpenseTrackerPage} />
      <Route path="/drone-log" component={DroneLogPage} />
      {/* Templates */}
      <Route path="/templates/contract" component={ContractTemplatePage} />
      <Route path="/templates/model-release" component={ModelReleasePage} />
      <Route path="/templates/location-release" component={LocationReleasePage} />
      <Route path="/templates/nda" component={NdaPage} />
      <Route path="/templates/rate-card" component={RateCardPage} />
      <Route path="/templates/late-payment" component={LatePaymentPage} />
      <Route path="/templates/w9-request" component={W9RequestPage} />
      <Route path="/templates/testimonial-request" component={TestimonialRequestPage} />
      <Route path="/templates/press-release" component={PressReleasePage} />
      <Route path="/templates/deposit-receipt" component={DepositReceiptPage} />
      <Route path="/templates/late-fee-addendum" component={LateFeeAddendumPage} />
      <Route path="/templates/payment-plan" component={PaymentPlanPage} />
      <Route path="/templates/change-order" component={ChangeOrderPage} />
      <Route path="/templates/crew-deal-memo" component={CrewDealMemoPage} />
      <Route path="/templates/timesheet" component={TimesheetPage} />
      <Route path="/templates/creative-brief" component={CreativeBriefPage} />
      <Route path="/templates/client-intake" component={ClientIntakePage} />
      <Route path="/templates/wrap-report" component={WrapReportPage} />
      <Route path="/templates/ic-agreement" component={IcAgreementPage} />
      <Route path="/templates/minor-release" component={MinorReleasePage} />
      <Route path="/templates/usage-license" component={UsageLicensePage} />
      <Route path="/templates/music-license" component={MusicLicensePage} />
      <Route path="/templates/shot-list" component={ShotListPage} />
      <Route path="/templates/equipment-rental" component={EquipmentRentalPage} />
      <Route path="/templates/case-study" component={CaseStudyPage} />
      <Route path="/templates/call-sheet" component={CallSheetPage} />
      <Route path="/templates/proposal" component={ProposalPage} />
      <Route path="/vs/:competitor" component={VsPage} />
      <Route component={NotFound} />
    </Switch>
  )
}
