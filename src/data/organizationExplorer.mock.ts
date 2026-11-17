import { federationCommittee, type FederationPerson } from "./aboutFederation.mock"

/**
 * WordPress-ready organization explorer model.
 * Committees and members stay data-driven so a future WP source can replace this mock.
 */
export type OrgExplorerIcon =
  | "users"
  | "building"
  | "clipboard"
  | "trophy"
  | "megaphone"
  | "globe"
  | "wallet"
  | "shield"
  | "graduation"
  | "whistle"
  | "scale"

export type OrgExplorerMember = {
  id: string
  name: string
  avatar?: string
  avatarAlt?: string
  objectPosition?: string
  position: string
  responsibility?: string
  committeeId: string
}

export type OrgExplorerCommittee = {
  id: string
  name: string
  description?: string
  icon: OrgExplorerIcon
  memberIds: string[]
}

export type OrgExplorerData = {
  title: string
  description: string
  note: string
  boardCommitteeId: string
  committees: OrgExplorerCommittee[]
  members: OrgExplorerMember[]
}

const BOARD_ID = "ban-chap-hanh"

const committeeIcons: Record<string, OrgExplorerIcon> = {
  "ban-chuyen-mon": "clipboard",
  "ban-to-chuc": "trophy",
  "ban-phong-trao": "users",
  "ban-truyen-thong": "megaphone",
  "ban-doi-ngoai": "globe",
  "ban-tai-chinh": "wallet",
  "ban-kiem-tra": "shield",
  "ban-dao-tao": "graduation",
  "ban-trong-tai": "whistle",
  "ban-phap-che": "scale",
  "ban-hoi-vien": "users",
  "van-phong": "building",
}

function personToMember(person: FederationPerson, committeeId: string): OrgExplorerMember {
  return {
    id: person.id,
    name: person.name,
    avatar: person.image,
    avatarAlt: person.imageAlt,
    objectPosition: person.objectPosition,
    position: person.title,
    responsibility: person.department || person.duties[0],
    committeeId,
  }
}

function buildExplorerData(): OrgExplorerData {
  const { chair, vices, members: heads, note } = federationCommittee
  const members: OrgExplorerMember[] = []
  const committees: OrgExplorerCommittee[] = []

  const boardLeaders = [chair, ...vices].map((person) => personToMember(person, BOARD_ID))
  members.push(...boardLeaders)

  committees.push({
    id: BOARD_ID,
    name: federationCommittee.title,
    description: chair.duties[1] ?? chair.duties[0],
    icon: "users",
    memberIds: boardLeaders.map((member) => member.id),
  })

  for (const head of heads) {
    const committeeId = head.id
    const headMember = personToMember(head, committeeId)
    members.push(headMember)

    const rosterMembers = (head.roster ?? []).map((name, index): OrgExplorerMember => ({
      id: `${committeeId}-uy-vien-${index + 1}`,
      name,
      position: "Ủy viên",
      responsibility: head.department,
      committeeId,
    }))
    members.push(...rosterMembers)

    committees.push({
      id: committeeId,
      name: head.department,
      description: head.duties[1] ?? head.duties[0],
      icon: committeeIcons[committeeId] ?? "users",
      memberIds: [headMember.id, ...rosterMembers.map((member) => member.id)],
    })
  }

  return {
    title: "Sơ đồ tổ chức Liên đoàn",
    description: "Khám phá cơ cấu tổ chức và danh sách thành viên các ban của Liên đoàn.",
    note,
    boardCommitteeId: BOARD_ID,
    committees,
    members,
  }
}

export const organizationExplorer = buildExplorerData()

export function getOrgCommittee(committeeId: string, data: OrgExplorerData = organizationExplorer) {
  return data.committees.find((committee) => committee.id === committeeId) ?? null
}

export function getOrgCommitteeMembers(
  committeeId: string,
  data: OrgExplorerData = organizationExplorer,
): OrgExplorerMember[] {
  const committee = getOrgCommittee(committeeId, data)
  if (!committee) return []
  const byId = new Map(data.members.map((member) => [member.id, member]))
  return committee.memberIds
    .map((id) => byId.get(id))
    .filter((member): member is OrgExplorerMember => Boolean(member))
}

export function getOrgCommitteeMemberCount(
  committeeId: string,
  data: OrgExplorerData = organizationExplorer,
) {
  return getOrgCommittee(committeeId, data)?.memberIds.length ?? 0
}

export function getOrgUnitCommittees(data: OrgExplorerData = organizationExplorer) {
  return data.committees.filter((committee) => committee.id !== data.boardCommitteeId)
}
