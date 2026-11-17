import type { ReactNode } from "react"
import type { NavItem } from "../types"
import { Footer } from "./Footer"
import { Header } from "./Header"

export function SiteLayout({
  children,
  navigation,
}: {
  children: ReactNode
  navigation?: NavItem[]
}) {
  return (
    <>
      <Header items={navigation} />
      <main id="noi-dung">{children}</main>
      <Footer />
    </>
  )
}
