// app/psychometrics/page.tsx
import { Metadata } from "next"
import { PsychometricsHeader } from "./components/PsychometricsHeader"
import { StatisticalTable } from "./components/StatisticalTable"
import { ValiditySection } from "./components/ValiditySection"
import { StructureSection } from "./components/StructureSection"
import { ApplicationsSection } from "./components/ApplicationsSection"
import { ReferencesList } from "./components/ReferencesList"
import { GradientBackground } from "./components/GradientBackground"

export const metadata: Metadata = {
  title: "Four-Pillar Relationship Test Psychometrics",
  description: "Technical details and psychometric properties of our relationship assessment methodology",
}

const academicReferences = [
  {
    id: "ref1",
    authors: "Bowen, M.",
    year: 1978,
    title: "Family Therapy in Clinical Practice",
    publisher: "Jason Aronson",
    type: "book"
  },
  {
    id: "ref2",
    authors: "Brunstein, J. C., Dangelmayer, G., & Schultheiss, O. C.",
    year: 1996,
    title: "Personal goals and social support in close relationships",
    journal: "Journal of Personality and Social Psychology",
    volume: "71(5)",
    pages: "1006-1019"
  },
  {
    id: "ref3",
    authors: "Busby, D. M., Holman, T. B., & Taniguchi, N.",
    year: 2001,
    title: "The RELATE questionnaire: A multidimensional assessment of relational health",
    journal: "Family Relations",
    volume: "50(3)",
    pages: "197-206"
  },
  {
    id: "ref4",
    authors: "Byers, E. S., & Demmons, S.",
    year: 1999,
    title: "Sexual satisfaction and sexual self-disclosure in dating relationships",
    journal: "Journal of Sex Research",
    volume: "36(2)",
    pages: "180-189"
  },
  {
    id: "ref5",
    authors: "Canary, D. J., & Stafford, L.",
    year: 1992,
    title: "Relational maintenance strategies: Critiques, development, and theoretical progress",
    journal: "Communication Monographs",
    volume: "59(3)",
    pages: "243-267"
  },
  {
    id: "ref6",
    authors: "Clements, M. L., Stanley, S. M., & Markman, H. J.",
    year: 2020,
    title: "Communication-based interventions for couples",
    bookTitle: "Couples in Crisis",
    editor: "Anderson, L. V.",
    publisher: "Wiley",
    pages: "115-130",
    type: "bookChapter"
  },
  {
    id: "ref7",
    authors: "Cunningham, M., & Thornton, A.",
    year: 2006,
    title: "The influence of parents' marital quality on adult children's attitudes toward marriage and its alternatives",
    journal: "Journal of Marriage and Family",
    volume: "68(2)",
    pages: "436-450"
  },
  {
    id: "ref8",
    authors: "Fowers, B. J., & Olson, D. H.",
    year: 1992,
    title: "Four types of premarital couples: An empirical typology based on PREPARE",
    journal: "Journal of Family Psychology",
    volume: "5(1)",
    pages: "10-21"
  },
  {
    id: "ref9",
    authors: "Gottman, J. M., & Levenson, R. W.",
    year: 1992,
    title: "Marital processes predictive of later dissolution: Behavior, physiology, and health",
    journal: "Journal of Personality and Social Psychology",
    volume: "63(2)",
    pages: "221-233"
  },
  {
    id: "ref10",
    authors: "Gottman, J., & Silver, N.",
    year: 1999,
    title: "The Seven Principles for Making Marriage Work",
    publisher: "Three Rivers Press",
    type: "book"
  },
  {
    id: "ref11",
    authors: "Hawkins, A. J., & Fowers, B. J.",
    year: 2013,
    title: "Value congruence and marital quality",
    journal: "Marriage & Family Review",
    volume: "49(4)",
    pages: "314-329"
  },
  {
    id: "ref12",
    authors: "Johnson, S. M.",
    year: 2004,
    title: "The Practice of Emotionally Focused Couple Therapy",
    publisher: "Brunner-Routledge",
    type: "book"
  },
  {
    id: "ref13",
    authors: "Karney, B. R., & Bradbury, T. N.",
    year: 1995,
    title: "The longitudinal course of marital quality and stability: A review of theory, methods, and research",
    journal: "Psychological Bulletin",
    volume: "118(1)",
    pages: "3-34"
  },
  {
    id: "ref14",
    authors: "Larson, J. H., & Holman, T. B.",
    year: 1994,
    title: "Premarital predictors of marital quality and stability",
    journal: "Family Relations",
    volume: "43(2)",
    pages: "228-237"
  },
  {
    id: "ref15",
    authors: "Larzelere, R. E., & Huston, T. L.",
    year: 1980,
    title: "The dyadic trust scale: Toward understanding interpersonal trust in close relationships",
    journal: "Journal of Marriage and the Family",
    volume: "42(3)",
    pages: "595-604"
  },
  {
    id: "ref16",
    authors: "Lawrence, K., & Byers, E. S.",
    year: 1995,
    title: "Sexual satisfaction in long-term heterosexual relationships",
    journal: "Personal Relationships",
    volume: "2(2)",
    pages: "267-285"
  },
  {
    id: "ref17",
    authors: "MacNeil, S., & Byers, E. S.",
    year: 2005,
    title: "Dyadic assessment of sexual self-disclosure and sexual satisfaction in heterosexual dating couples",
    journal: "Journal of Social and Personal Relationships",
    volume: "22(2)",
    pages: "169-181"
  },
  {
    id: "ref18",
    authors: "Markman, H. J., Stanley, S. M., & Blumberg, S. L.",
    year: 2010,
    title: "Fighting for Your Marriage",
    publisher: "Jossey-Bass",
    type: "book"
  },
  {
    id: "ref19",
    authors: "Mikulincer, M., & Shaver, P. R.",
    year: 2012,
    title: "An attachment perspective on loneliness and togetherness",
    bookTitle: "The Cambridge Handbook of Personal Relationships",
    editor: "Vangelisti, A. L. & Perlman, D.",
    edition: "2nd",
    publisher: "Cambridge University Press",
    pages: "175-191",
    type: "bookChapter"
  },
  {
    id: "ref20",
    authors: "Noller, P., & Feeney, J. A.",
    year: 2004,
    title: "Studying family communication: Multiple methods and multiple levels",
    bookTitle: "Handbook of Family Communication",
    editor: "Vangelisti, A. L.",
    publisher: "Lawrence Erlbaum",
    pages: "31-50",
    type: "bookChapter"
  },
  {
    id: "ref21",
    authors: "Olson, D. H.",
    year: 2000,
    title: "Circumplex model of marital and family systems",
    journal: "Journal of Family Therapy",
    volume: "22(2)",
    pages: "144-167"
  },
  {
    id: "ref22",
    authors: "Rempel, J. K., Holmes, J. G., & Zanna, M. P.",
    year: 1985,
    title: "Trust in close relationships",
    journal: "Journal of Personality and Social Psychology",
    volume: "49(1)",
    pages: "95-112"
  },
  {
    id: "ref23",
    authors: "Simpson, J. A.",
    year: 2007,
    title: "Foundations of interpersonal trust",
    bookTitle: "Social Psychology: Handbook of Basic Principles",
    editor: "Kruglanski, A. W. & Higgins, E. T.",
    edition: "2nd",
    publisher: "Guilford Press",
    pages: "587-607",
    type: "bookChapter"
  },
  {
    id: "ref24",
    authors: "Spanier, G. B.",
    year: 1976,
    title: "Measuring dyadic adjustment: New scales for assessing the quality of marriage",
    journal: "Journal of Marriage and the Family",
    volume: "38(1)",
    pages: "15-28"
  },
  {
    id: "ref25",
    authors: "Sprecher, S.",
    year: 2002,
    title: "Sexual satisfaction in premarital relationships",
    journal: "Journal of Sex Research",
    volume: "39(3)",
    pages: "190-196"
  },
  {
    id: "ref26",
    authors: "Stanley, S. M., Markman, H. J., & Whitton, S. W.",
    year: 2002,
    title: "Communication, conflict, and commitment: Insights on the foundations of relationship success from a national survey",
    journal: "Family Process",
    volume: "41(4)",
    pages: "659-675"
  }
];

export default function PsychometricsPage() {
  return (
    <GradientBackground className="min-h-screen pb-16">
      {/* Header Section */}
      <PsychometricsHeader />

      <div className="container mx-auto px-4 space-y-12">
        {/* Main Statistical Overview */}
        <StatisticalTable />

        {/* Structure and Development */}
        <div className="grid gap-8 md:grid-cols-2">
          <StructureSection />
          <ValiditySection />
        </div>

        {/* Applications Section */}
        <ApplicationsSection />

        {/* Academic References */}
        <ReferencesList references={academicReferences} />
      </div>
    </GradientBackground>
  )
}