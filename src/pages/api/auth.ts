import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRouter } from 'next/router'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body
  const isAuthenticated = username === 'principal' && password === 'Qwe321'

  if (isAuthenticated) {
    res.status(200).json({ success: true })
  } else {
    res.status(401).json({ success: false, message: `Wrong ${username !== 'principal' ? 'username' : 'password'}` })
  }
}

export const logout = (router: NextRouter) => {
  localStorage.removeItem('isAuthenticated')
  router.replace('/login')
}

export default handler
