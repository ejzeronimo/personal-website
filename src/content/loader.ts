import { loadPosts } from './posts'
import type { SiteContent } from './types'

export const staticContent: SiteContent = {
  identity: {
    name: 'Riggyz',
    title: 'Perpetual Builder',
  },
  about: {
    tagline:
      'Innovative & Enthusiastic | Computer Science & Internet of Things',
    body: `Hi there 🤝 my name is Riggyz. 
Always learning, I love to try exciting new technologies. 
Whether it is a new microcontroller or a backend framework that provides better performance, 
I am always striving to learn about the next big thing. 
I like to spend my free time assembling Gunpla models or 3d printing various odds and ends. 
I am passionate about always doing the best I can, both in professional and personal pursuits.`,
  },
  skills: [
    {
      name: 'Embedded Devices',
    },
    {
      name: 'C',
    },
    {
      name: 'Internet of Things',
    },
    {
      name: 'Typescript',
    },
    {
      name: 'C#',
    },
    {
      name: 'Azure',
    },
    {
      name: 'Azure DevOps',
    },
    {
      name: 'CI/CD',
    },
    {
      name: 'Powershell',
    },
    {
      name: 'KQL',
    },
    {
      name: 'SQL',
    },
  ],
  credentials: [],
  education: [],
  testimonies: [],
  portfolio: [],
  socials: [],
  posts: [],
}

export async function loadContent(): Promise<SiteContent> {
  let posts = loadPosts()
  return { ...staticContent, posts }
}
