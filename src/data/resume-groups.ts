export type WorkEntry = {
  company: string
  link: string
  badges: readonly string[]
  title: string
  start: string
  end: string
  highlights: readonly string[]
}

/**
 * A run of roles at the same company that sit next to each other in the
 * resume. Runs of one are still returned as a group of one — callers decide
 * how to present them.
 *
 * `company` and `link` are hoisted off the first role for convenience. Badges
 * are deliberately not hoisted: a group can hold several badges across its
 * roles, so callers union them from `roles` rather than trusting one role to
 * speak for the rest.
 */
export type WorkGroup = {
  company: string
  link: string
  roles: WorkEntry[]
}

/**
 * Collapses roles that share a company *and* sit next to each other in the
 * resume into a single group, so promotions read as one card with a
 * progression instead of a stack of near-identical cards. A company that
 * reappears later in the resume after other roles is deliberately not joined
 * — the gap in the timeline means it reads as a separate stint.
 *
 * Order is preserved, and every role lands in exactly one group. Adjacency is
 * judged by position in the array, so the order of `RESUME_DATA.work` is
 * load-bearing: reordering it can change how roles group.
 *
 * Shared by the `/cv` page and the rendercv PDF export so both surfaces
 * define "conjoined" exactly once.
 */
export function groupConsecutiveRoles(work: readonly WorkEntry[]): WorkGroup[] {
  const groups: WorkGroup[] = []

  for (const entry of work) {
    const current = groups.at(-1)
    if (current?.company === entry.company) {
      current.roles.push(entry)
      continue
    }
    groups.push({ company: entry.company, link: entry.link, roles: [entry] })
  }

  return groups
}

/** Every badge across a group's roles, in first-seen order, deduplicated. */
export function groupBadges(group: WorkGroup): string[] {
  return [...new Set(group.roles.flatMap((role) => role.badges))]
}

/**
 * The period a group covers end to end: the start of its earliest role through
 * the end of its latest. A role still in progress makes the whole group
 * open-ended. Dates are `YYYY-MM` (or `YYYY`, or `present`), which sort
 * correctly as strings.
 */
export function groupSpan(group: WorkGroup): { start: string; end: string } {
  const starts = group.roles.map((role) => role.start).sort()
  const ends = group.roles.map((role) => role.end).sort()
  const openEnded = group.roles.some((role) => role.end === 'present')

  return { start: starts[0], end: openEnded ? 'present' : ends[ends.length - 1] }
}
