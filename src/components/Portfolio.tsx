import React, {
  useEffect,
  useRef,
  useState,
  type BaseSyntheticEvent,
} from 'react'

// gets the repos raw data
import backupRepoData from '../resources/data.json'
import { Badge } from './ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

const liveRepoData = await fetch(
  'https://api.github.com/users/ejzeronimo/repos',
  {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  }
)
  .then((response) => {
    return response.json()
  })
  .then((result) => {
    return result
  })

const repoData = liveRepoData.message ? backupRepoData : liveRepoData

export default function Portfolio() {
  const [filter, setFilter] = useState('')

  function filterRawResults() {
    return repoData.filter((repo: any) => {
      return (
        repo.name.includes(filter) ||
        (repo.description
          ? repo.description.toLowerCase().includes(filter)
          : false) ||
        repo.language.toLowerCase().includes(filter) ||
        (repo.homepage
          ? repo.homepage.toLowerCase().includes(filter)
          : false) ||
        repo.topics.filter((topic: string) => {
          return topic.toLowerCase().includes(filter)
        }).length > 0
      )
    })
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 overflow-y-auto">
        {
          // for each repo I have map it to a component
          filterRawResults().map((repo: any, i: number) => {
            return (
              <PortfolioCard
                title={repo.name}
                summary={repo.description}
                language={repo.language}
                topics={repo.topics}
                homepage={repo.homepage === '' ? null : repo.homepage}
                key={i}
              />
            )
          })
        }
      </div>
    </div>
  )
}

function PortfolioCard(props: {
  title: string
  summary: string
  language?: string
  topics?: string[]
  homepage?: string
}) {
  return (
    <Card className="gap-2">
      <CardHeader className="p-4">
        <CardTitle>
          {props.homepage ? (
            <a href={props.homepage}> {props.title} </a>
          ) : (
            props.title
          )}
        </CardTitle>
        <CardDescription>{props.summary}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge>{props.language!}</Badge>
        {props.topics?.map((obj: any, i: any) => {
          return (
            <Badge variant={'secondary'} key={i}>
              {obj}
            </Badge>
          )
        })}
      </CardContent>
    </Card>
  )
}
