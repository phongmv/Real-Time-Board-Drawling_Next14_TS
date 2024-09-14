import { query } from './_generated/server'
import { v } from 'convex/values'
import { getAllOrThrow } from 'convex-helpers/server/relationships'

export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) throw new Error('Unauthorized!')

    console.log('!!!!args.favorites!!!!!', args.favorites)

    if (args.favorites) {
      const favoritesBoards = await ctx.db
        .query('userFavorites')
        .withIndex('by_user_org', (q) => q.eq('userId', identity.subject).eq('orgId', args.orgId))
        .order('desc')
        .collect()

      const ids = favoritesBoards.map((b) => b.boardId)
      const boards = await getAllOrThrow(ctx.db, ids)

      return boards.map((board) => ({
        ...board,
        isFavorites: true,
      }))
    }

    const title = args.search as string
    console.log('!!!title!!', title)

    let boards = []

    if (title) {
      boards = await ctx.db
        .query('boards')
        .withSearchIndex('search_title', (q) => q.search('title', title).eq('orgId', args.orgId))
        .collect()
    } else {
      boards = await ctx.db
        .query('boards')
        .withIndex('by_org', (q) => q.eq('orgId', args.orgId))
        .order('desc')
        .collect()
    }

    const boardsWithFavoritesRelation = boards.map((board) => {
      return ctx.db
        .query('userFavorites')
        .withIndex('by_user_board', (q) => q.eq('userId', identity.subject).eq('boardId', board._id))
        .unique()
        .then((favorites) => {
          return {
            ...board,
            isFavorites: !!favorites,
          }
        })
    })

    return Promise.all(boardsWithFavoritesRelation)
  },
})

export const get_detail = query({
  args: { id: v.id('boards') },
  handler: (ctx, args) => {
    return ctx.db.get(args.id)
  },
})
