import { useTranslation } from "../../../i18n"
import type { TournamentView } from "../../../types"
import { sitePath } from "../../../lib/site"
import { Button } from "../../Button"

export function TournamentRulesTab({ tournament }: { tournament: TournamentView }) {
  const { t } = useTranslation()
  const sections = tournament.ruleSections
  const downloadable = tournament.regulations.documents.filter((doc) => doc.href)

  return (
    <div className="td-panel">
      <p className="text-[15px] leading-relaxed text-ink">{t(tournament.regulations.summary)}</p>

      {downloadable.length ? (
        <div className="flex flex-wrap gap-3">
          {downloadable.map((doc) => (
            <Button key={doc.id} href={doc.href!} variant="primary">
              {t("Tải điều lệ")}
              <span className="sr-only">: {t(doc.title)}</span>
            </Button>
          ))}
        </div>
      ) : null}

      {sections?.length ? (
        <div className="td-rules">
          {sections.map((section) => (
            <details key={section.id} className="td-rule">
              <summary>{t(section.title)}</summary>
              <div className="td-rule-body">
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{t(paragraph)}</p>
                ))}
                {section.bullets?.length ? (
                  <ul>
                    {section.bullets.map((item) => (
                      <li key={item}>{t(item)}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      ) : (
        <div className="td-prose">
          {tournament.regulations.documents.map((doc) => (
            <p key={doc.id} className="is-soft">
              {doc.href ? (
                <a href={sitePath(doc.href)} className="font-medium underline-offset-2 hover:underline">
                  {t(doc.title)}
                </a>
              ) : (
                t(doc.title)
              )}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
