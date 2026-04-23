import { useEffect, useState } from "react"
import EmailCaptureSheet, { hasDismissedEmailSheet } from "../components/EmailCaptureSheet"
import { trackTool } from "./trackTool"

// Shared behavior for every tool page:
// - Fires "view" event once on mount (session-deduped inside trackTool)
// - onDownload() tracks "download" + triggers print + opens the email
//   capture sheet (unless already dismissed this session)
// - sheet is the JSX to render somewhere at the top level of the page
export function useToolCapture(slug: string) {
  const [showSheet, setShowSheet] = useState(false)

  useEffect(() => {
    trackTool(slug, "view")
  }, [slug])

  function onDownload(action: () => void = () => window.print()) {
    trackTool(slug, "download")
    action()
    if (!hasDismissedEmailSheet()) {
      setTimeout(() => setShowSheet(true), 600)
    }
  }

  const sheet = (
    <EmailCaptureSheet
      slug={slug}
      open={showSheet}
      onClose={() => setShowSheet(false)}
    />
  )

  return { onDownload, sheet }
}
