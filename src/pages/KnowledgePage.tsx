import { SiteLayout } from "../components/SiteLayout"
import { FeaturedKnowledge } from "../components/knowledge/FeaturedKnowledge"
import { KnowledgeCTA } from "../components/knowledge/KnowledgeCTA"
import { KnowledgeCategories } from "../components/knowledge/KnowledgeCategories"
import { KnowledgeHero } from "../components/knowledge/KnowledgeHero"
import { ResourcesLibrary } from "../components/knowledge/ResourcesLibrary"
import { TrainingPrograms } from "../components/knowledge/TrainingPrograms"

export function KnowledgePage() {
  return (
    <SiteLayout>
      <KnowledgeHero />
      <KnowledgeCategories />
      <FeaturedKnowledge />
      <TrainingPrograms />
      <ResourcesLibrary />
      <KnowledgeCTA />
    </SiteLayout>
  )
}
