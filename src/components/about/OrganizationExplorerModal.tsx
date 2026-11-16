import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  ClipboardList,
  Globe2,
  GraduationCap,
  Megaphone,
  Scale,
  Shield,
  Trophy,
  Users,
  Wallet,
  Whistle,
  X,
  type LucideIcon,
} from "lucide-react"
import {
  getOrgCommittee,
  getOrgCommitteeMemberCount,
  getOrgCommitteeMembers,
  getOrgUnitCommittees,
  organizationExplorer,
  type OrgExplorerCommittee,
  type OrgExplorerIcon,
  type OrgExplorerMember,
} from "../../data/organizationExplorer.mock"
import { cx } from "../../lib/cx"
import { sitePath } from "../../lib/site"
import { useRegisterModalPresence } from "../../lib/modalPresence"
import { useReducedMotion } from "../../lib/useReducedMotion"

type ActiveView = "overview" | "detail"

type OrganizationExplorerModalProps = {
  open: boolean
  onClose: () => void
}

const iconMap: Record<OrgExplorerIcon, LucideIcon> = {
  users: Users,
  building: Building2,
  clipboard: ClipboardList,
  trophy: Trophy,
  megaphone: Megaphone,
  globe: Globe2,
  wallet: Wallet,
  shield: Shield,
  graduation: GraduationCap,
  whistle: Whistle,
  scale: Scale,
}

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean)
  const first = parts[0]?.[0] ?? ""
  const last = parts.length > 1 ? parts[parts.length - 1]![0]! : ""
  return `${first}${last}`.toUpperCase()
}

function MemberAvatar({ member }: { member: OrgExplorerMember }) {
  if (member.avatar) {
    return (
      <img
        src={sitePath(member.avatar)}
        alt={member.avatarAlt ?? ""}
        width={160}
        height={200}
        style={member.objectPosition ? { objectPosition: member.objectPosition } : undefined}
      />
    )
  }
  return <span className="fed-org-avatar-fallback">{initials(member.name)}</span>
}

export function CommitteeCard({
  committee,
  memberCount,
  onSelect,
}: {
  committee: OrgExplorerCommittee
  memberCount: number
  onSelect: (committeeId: string) => void
}) {
  const Icon = iconMap[committee.icon] ?? Users
  return (
    <button
      type="button"
      className="fed-org-node"
      onClick={() => onSelect(committee.id)}
      aria-label={`${committee.name}. ${memberCount} thành viên. Xem thành viên`}
    >
      <span className="fed-org-node-icon" aria-hidden>
        <Icon className="size-4" strokeWidth={2} />
      </span>
      <span className="fed-org-node-body">
        <span className="fed-org-node-name">{committee.name}</span>
        <span className="fed-org-node-meta">
          {memberCount} thành viên
          <span className="fed-org-node-cta">Xem thành viên</span>
        </span>
      </span>
    </button>
  )
}

export function MemberList({ members, emptyLabel }: { members: OrgExplorerMember[]; emptyLabel: string }) {
  if (members.length === 0) {
    return <p className="fed-org-empty">{emptyLabel}</p>
  }

  return (
    <ul className="fed-org-members">
      {members.map((member) => (
        <li key={member.id}>
          <article className="fed-org-member">
            <div className="fed-org-member-photo">
              <MemberAvatar member={member} />
            </div>
            <div className="fed-org-member-copy">
              <h4>{member.name}</h4>
              <p className="fed-org-member-role">{member.position}</p>
              {member.responsibility ? <p className="fed-org-member-duty">{member.responsibility}</p> : null}
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}

export function OrganizationExplorerModal({ open, onClose }: OrganizationExplorerModalProps) {
  const data = organizationExplorer
  const titleId = useId()
  const descId = useId()
  const reduce = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const [activeView, setActiveView] = useState<ActiveView>("overview")
  const [selectedCommitteeId, setSelectedCommitteeId] = useState<string | null>(null)
  useRegisterModalPresence(open)

  const unitCommittees = useMemo(() => getOrgUnitCommittees(data), [data])
  const board = getOrgCommittee(data.boardCommitteeId, data)
  const boardMemberCount = getOrgCommitteeMemberCount(data.boardCommitteeId, data)
  const selectedCommittee = selectedCommitteeId ? getOrgCommittee(selectedCommitteeId, data) : null
  const selectedMembers = selectedCommitteeId ? getOrgCommitteeMembers(selectedCommitteeId, data) : []

  useEffect(() => {
    if (!open) return
    setActiveView("overview")
    setSelectedCommitteeId(null)
  }, [open])

  useLayoutEffect(() => {
    if (!open) return
    bodyRef.current?.scrollTo({ top: 0, behavior: "auto" })
  }, [open, activeView, selectedCommitteeId])

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const panel = panelRef.current
    const getFocusable = () =>
      panel
        ? Array.from(
            panel.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])',
            ),
          ).filter((node) => !node.closest("[inert]"))
        : []

    const preferred = panel?.querySelector<HTMLElement>("[data-autofocus]")
    ;(preferred ?? getFocusable()[0])?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== "Tab" || !panel) return
      const items = getFocusable()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const target =
      activeView === "detail"
        ? panelRef.current?.querySelector<HTMLElement>(".fed-org-back")
        : panelRef.current?.querySelector<HTMLElement>(".fed-org-close")
    target?.focus()
  }, [activeView, open])

  if (!open) return null

  const openCommittee = (committeeId: string) => {
    setSelectedCommitteeId(committeeId)
    setActiveView("detail")
  }

  const backToOverview = () => {
    setActiveView("overview")
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button type="button" aria-label="Đóng hộp thoại" className="absolute inset-0 bg-signal/55" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="fed-org-dialog relative z-10 flex w-full flex-col overflow-hidden bg-white sm:rounded-2xl"
      >
        <div className="fed-org-dialog-head">
          <div>
            <h2 id={titleId}>{data.title}</h2>
            <p id={descId}>{data.description}</p>
          </div>
          <button type="button" onClick={onClose} className="fed-org-close" aria-label="Đóng" data-autofocus>
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <div ref={bodyRef} className="fed-org-dialog-body">
          <div
            className={cx("fed-org-stage", activeView === "detail" && "is-detail", reduce && "is-reduced")}
          >
            <div className="fed-org-pane" aria-hidden={activeView !== "overview"} inert={activeView !== "overview" || undefined}>
              <p className="fed-note">{data.note}</p>

              <section className="fed-org-board" aria-labelledby="fed-org-board-title">
                <div className="fed-org-board-rail" aria-hidden />
                <button
                  type="button"
                  className="fed-org-board-card"
                  onClick={() => openCommittee(data.boardCommitteeId)}
                  aria-label={`${board?.name ?? "Ban Chấp hành Liên đoàn"}. ${boardMemberCount} thành viên. Xem chi tiết`}
                >
                  <p className="fed-org-board-label">Cơ quan lãnh đạo</p>
                  <h3 id="fed-org-board-title">{board?.name}</h3>
                  <p className="fed-org-board-desc">Cơ quan lãnh đạo và điều hành của Liên đoàn.</p>
                  <span className="fed-org-board-meta">
                    <span>{boardMemberCount} thành viên</span>
                    <span className="fed-org-board-cta">
                      Xem chi tiết
                      <ArrowRight className="size-3.5" aria-hidden />
                    </span>
                  </span>
                </button>
              </section>

              <div className="fed-org-link" aria-hidden />

              <section aria-labelledby="fed-org-units-title">
                <div className="fed-org-units-head">
                  <h3 id="fed-org-units-title">Các ban chuyên môn</h3>
                  <p>Chọn một ban để xem danh sách thành viên.</p>
                </div>
                <div className="fed-org-grid">
                  {unitCommittees.map((committee) => (
                    <CommitteeCard
                      key={committee.id}
                      committee={committee}
                      memberCount={getOrgCommitteeMemberCount(committee.id, data)}
                      onSelect={openCommittee}
                    />
                  ))}
                </div>
              </section>
            </div>

            <div className="fed-org-pane" aria-hidden={activeView !== "detail"} inert={activeView !== "detail" || undefined}>
              <button type="button" className="fed-org-back" onClick={backToOverview}>
                <ArrowLeft className="size-4" aria-hidden />
                Quay lại sơ đồ tổ chức
              </button>

              {selectedCommittee ? (
                <div className="fed-org-detail">
                  <header className="fed-org-detail-head">
                    <h3>{selectedCommittee.name}</h3>
                    {selectedCommittee.description ? <p>{selectedCommittee.description}</p> : null}
                    <p className="fed-note">{data.note}</p>
                  </header>
                  <MemberList
                    members={selectedMembers}
                    emptyLabel="Chưa có thành viên được công bố cho đơn vị này."
                  />
                </div>
              ) : (
                <p className="fed-org-empty">Chưa chọn đơn vị tổ chức.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
