type LibraryRecord = "member" | "coach" | "athlete"

export function libraryRecordAnchor(kind: LibraryRecord, id: string) {
  return `${kind}-${id}`
}

export function libraryRecordPath(kind: LibraryRecord, id: string) {
  const anchor = libraryRecordAnchor(kind, id)
  return `/thu-vien-cong-dong.html?${kind}=${encodeURIComponent(id)}#${encodeURIComponent(anchor)}`
}
