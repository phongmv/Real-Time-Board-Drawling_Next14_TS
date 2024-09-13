import { Liveblocks } from '@liveblocks/node'
import { ConvexHttpClient } from 'convex/browser'
import { auth, currentUser } from '@clerk/nextjs/server'
import { api } from '@/convex/_generated/api'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

const liveblokcs = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
})

export async function POST(request: Request) {
  const authorization = await auth()
  const user = await currentUser()

  if (!authorization || !user) {
    return new Response('Unauthorized', { status: 403 })
  }

  const { room } = await request.json()
  const board = await convex.query(api.board_query.get_detail, { id: room })

  if (board?.orgId !== authorization.orgId) {
    return new Response('Unauthorized')
  }

  const userInfo = {
    name: user.fullName || 'Teammate',
    user: user.imageUrl,
  }

  const session = liveblokcs.prepareSession(user.id, { userInfo })

  if (room) {
    session.allow(room, session.FULL_ACCESS)
  }

  const { status, body } = await session.authorize()

  return new Response(body, { status })
}
