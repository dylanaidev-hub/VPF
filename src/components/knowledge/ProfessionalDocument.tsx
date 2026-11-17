import { useCallback, useState } from "react"
import type { ProfessionalResource } from "../../data/expertise.mock"
import { Dialog } from "../Dialog"
import { DocumentCard, publishedPdf } from "../DocumentCard"
import { DocumentReader } from "../DocumentReader"

export function ProfessionalDocument({ document }: { document: ProfessionalResource }) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const pdf = publishedPdf(document.pdfHref)

  return (
    <>
      <DocumentCard
        category={document.category}
        title={document.documentTitle}
        description={document.documentDescription}
        documentUrl={pdf}
        downloadUrl={pdf}
        availabilityStatus={document.unavailableNote}
        actionLabel={document.readLabel}
        onRead={() => setOpen(true)}
      />
      {pdf ? (
        <Dialog open={open} title={document.documentTitle} onClose={close}>
          <DocumentReader documentUrl={pdf} downloadUrl={pdf} />
        </Dialog>
      ) : null}
    </>
  )
}
