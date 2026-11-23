type LibraryRecord = "member" | "coach" | "athlete"

export function libraryRecordAnchor(kind: LibraryRecord, id: string) {
  return `${kind}-${id}`
}

export function libraryRecordPath(kind: LibraryRecord, id: string) {
  const anchor = libraryRecordAnchor(kind, id)
  const page =
    kind === "member" ? "/thu-vien-cong-dong.html" : "/doi-tuyen-van-dong-vien.html"
  return `${page}?${kind}=${encodeURIComponent(id)}#${encodeURIComponent(anchor)}`
}
