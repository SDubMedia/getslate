// Official Apple "Download on the App Store" badge → Slate Studio (iOS).
// Asset is Apple's RGB black SVG in /public; do not redraw it (Apple marketing guidelines).
const APP_STORE_URL = "https://apps.apple.com/us/app/slate-studio/id6768183675"

export default function AppStoreBadge({
  className = "",
  height = 40,
}: {
  className?: string
  height?: number
}) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download Slate Studio on the App Store"
      className={`inline-flex ${className}`}
    >
      <img
        src="/app-store-badge.svg"
        alt="Download on the App Store"
        style={{ height }}
        className="w-auto"
      />
    </a>
  )
}
