# Carmen Elena Organiza

A private document scanner for iPhone — a commission app built for Carmen Elena.
**Spanish-first UI.** Everything stays on the device: no accounts, no cloud, no tracking.

## The idea
When you see a problem, solve it — and if it hurts others too, build the fix. Carmen Elena
needs an easy, private way to photograph her documents, keep them as real files, and find any
of them in seconds. This app does exactly that, and nothing more.

## The three tasks (what the app does)
1. **Fast capture** — Open → camera → snap → title → save → ready for the next. Rinse and repeat.
   The whole point is a friction-free "snap-title-save" loop.
2. **Photo → PDF** — Read each scan and save it as a real, shareable PDF.
3. **Auto-details** — For each document, capture the **date, sender, subject, category, and content**,
   so documents file and search themselves.

## Status
- **Working web preview** built for all three phases (this repo's `index.html`), used to feel and
  validate the flow. It runs the snap-title-save loop, exports a real PDF on-device, and has a
  details panel + category filters + search.
- **Not yet built:** the native iPhone app.

## Plan for the native iPhone app (Hijo's lane)
Suggested on-device, privacy-preserving stack — nothing leaves the phone:
- **Capture:** VisionKit `VNDocumentCameraViewController` (auto edge-detection + perspective fix).
- **Read text (Phase 3 automation):** Vision `VNRecognizeTextRequest` — on-device OCR, so the
  date/sender/subject fields fill themselves. This is the piece the web preview can't do; it's the
  native app's superpower.
- **PDF:** PDFKit / `UIGraphicsPDFRenderer` to assemble scans into PDFs.
- **Storage:** local only (Core Data or files in the app sandbox). No backend, no login.
- **UI:** SwiftUI, Spanish strings.

## Delivery to Carmen Elena's phone
- Requires a paid **Apple Developer account** (~$99/yr).
- Cleanest install path for one person: **TestFlight** (she taps a link and installs).

## Try the preview
Private preview link (open on an iPhone to use the camera):
https://claude.ai/code/artifact/b1ea81ff-c76d-4c53-a0b6-8ae688849ca7

> Note: the preview saves to that one phone/browser and asks the user to confirm the details.
> The native app reads them automatically and stores everything in the app itself.
