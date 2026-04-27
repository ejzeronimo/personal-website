import { Route, Routes } from 'react-router-dom'

import type { ThemeRootProps } from '@/themes/types'

import Shell from './shell'
import Home from './views/home'
import NotFound from './views/not-found'
import Post from './views/post'

// import './tokens.css'
// import './theme.css'

export default function DefaultRoot(props: ThemeRootProps) {
  return (
    <Shell {...props}>
      <Routes>
        <Route path="/" element={<Home content={props.content} />} />
        <Route path="/projects" element={null} />
        <Route path="/projects/:slug" element={null} />
        <Route path="/posts" element={null} />
        <Route path="/posts/:slug" element={<Post content={props.content} />} />
        <Route path="/about" element={null} />
        <Route path="*" element={<NotFound content={props.content} />} />
      </Routes>
    </Shell>
  )
}
