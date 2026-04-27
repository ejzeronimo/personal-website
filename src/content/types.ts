export type Skill = {
  icon?: any // TODO: find lucide icon type
  name: string
}

export type CredentialEntry = {
  name: string
  description: string
}

export type EducationEntry = {
  institution: string
  period: string
  credential: string
}

export type TestimonyEntry = {}

export type PortfolioEntry = {}

export type Post = {
  slug: string
  title: string
  date: string
  tags: string[]
  summary: string
  load: () => Promise<{ default: React.ComponentType }>
}

export type Social = {
  kind: 'github' | 'twitter'
  href: string
  label?: string
}

export type SiteContent = {
  identity: {
    name: string
    title: string
  }
  about: {
    body: string
    tagline?: string
  }
  skills: Skill[]
  credentials: CredentialEntry[]
  education: EducationEntry[]
  testimonies: TestimonyEntry[]
  portfolio: PortfolioEntry[]
  posts: Post[]
  socials: Social[]
}
