import { useState } from "react"
import { TemplateShell, Field, TextArea, PrintPaper, today, formatDate, val } from "./_shared"

export default function EquipmentRentalPage() {
  const [owner, setOwner] = useState("")
  const [renter, setRenter] = useState("")
  const [gearList, setGearList] = useState("")
  const [replacementValue, setReplacementValue] = useState("")
  const [rentalFee, setRentalFee] = useState("")
  const [pickupDate, setPickupDate] = useState(today())
  const [returnDate, setReturnDate] = useState("")
  const [insurance, setInsurance] = useState("Renter provides certificate of insurance naming Owner as additionally insured, with coverage equal to the replacement value.")

  return (
    <TemplateShell slug="equipment-rental" title="Equipment Rental Agreement" subtitle="For renting gear TO a crew (owner) or FROM a house (renter).">
      <div className="space-y-4">
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <Field label="Owner (equipment provider)" value={owner} onChange={setOwner} />
          <Field label="Renter" value={renter} onChange={setRenter} />
        </section>
        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
          <TextArea label="Equipment list" value={gearList} onChange={setGearList} placeholder="1x Sony FX3 body (SN: 1234)&#10;2x Sigma 24-70mm f/2.8 (SN: 5678, 5679)&#10;1x Aputure 300D kit..." rows={5} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Total replacement value (USD)" value={replacementValue} onChange={setReplacementValue} />
            <Field label="Rental fee (USD)" value={rentalFee} onChange={setRentalFee} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Pickup date" value={pickupDate} onChange={setPickupDate} type="date" />
            <Field label="Return date" value={returnDate} onChange={setReturnDate} type="date" />
          </div>
          <TextArea label="Insurance requirement" value={insurance} onChange={setInsurance} />
        </section>
      </div>

      <PrintPaper>
        <h1 style={{ textAlign: "center", fontSize: 18, marginBottom: 24 }}>EQUIPMENT RENTAL AGREEMENT</h1>
        <p>This Rental Agreement, dated <strong>{formatDate(today())}</strong>, is between <strong>{val(owner, "[Owner]")}</strong> ("Owner") and <strong>{val(renter, "[Renter]")}</strong> ("Renter").</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>1. Equipment</h2>
        <p style={{ whiteSpace: "pre-line" }}>{val(gearList, "[Equipment list]")}</p>
        <p style={{ marginTop: 8 }}>Total replacement value: <strong>${val(replacementValue, "0")}</strong>.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>2. Term</h2>
        <p>Pickup: <strong>{formatDate(pickupDate)}</strong>. Return: <strong>{val(formatDate(returnDate))}</strong>. Equipment must be returned by 5:00 PM local time on the return date in the same condition as received, normal wear excluded.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>3. Rental Fee</h2>
        <p>Total rental fee: <strong>${val(rentalFee, "0")}</strong>, due on pickup.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>4. Care & Responsibility</h2>
        <p>Renter assumes full responsibility for the Equipment from pickup through return. Renter agrees to use the Equipment only for its intended purpose, by qualified operators, and not to modify or repair it without Owner's written permission. Loss, theft, or damage is Renter's financial responsibility up to the replacement value.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>5. Insurance</h2>
        <p>{val(insurance)}</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>6. Late Return</h2>
        <p>Equipment returned after the return date incurs a late fee of 50% of the daily rental rate per day late, plus any lost rental income if Owner has another booking.</p>

        <h2 style={{ fontSize: 14, marginTop: 20, marginBottom: 8 }}>7. Inspection</h2>
        <p>Renter will inspect the Equipment at pickup and report any existing damage in writing before leaving with it. Absent such notice, the Equipment is presumed to be in working condition at pickup.</p>

        <div style={{ marginTop: 40, display: "flex", gap: 48 }}>
          <div style={{ flex: 1 }}>
            <div style={{ borderBottom: "1px solid #000", height: 32 }} />
            <p style={{ fontSize: 12, marginTop: 4 }}>Owner · {val(owner)}</p>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ borderBottom: "1px solid #000", height: 32 }} />
            <p style={{ fontSize: 12, marginTop: 4 }}>Renter · {val(renter)}</p>
          </div>
        </div>
        <p style={{ marginTop: 48, fontSize: 10, color: "#888", textAlign: "center" }}>Generated free by Slate · getslate.net</p>
      </PrintPaper>
    </TemplateShell>
  )
}
