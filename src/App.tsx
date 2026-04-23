import "./index.css"
import { Route, Switch } from "wouter"
import HomePage from "./pages/HomePage"
import InvoiceGeneratorPage from "./pages/InvoiceGeneratorPage"
import ProfitCalculatorPage from "./pages/ProfitCalculatorPage"
import ExpenseTrackerPage from "./pages/ExpenseTrackerPage"
import VsPage from "./pages/VsPage"

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
      <Route path="/invoice-generator" component={InvoiceGeneratorPage} />
      <Route path="/calculator" component={ProfitCalculatorPage} />
      <Route path="/expenses" component={ExpenseTrackerPage} />
      <Route path="/vs/:competitor" component={VsPage} />
      <Route component={NotFound} />
    </Switch>
  )
}
