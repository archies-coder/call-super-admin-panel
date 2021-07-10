import { Mail, Home } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'assign',
    title: 'Assign',
    icon: <Mail size={20} />,
    navLink: '/assign'
  }
]
