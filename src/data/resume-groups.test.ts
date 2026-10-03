import { describe, expect, it } from 'vitest'
import { RESUME_DATA } from './resume-data'
import { groupBadges, groupConsecutiveRoles, groupSpan, type WorkEntry } from './resume-groups'

function role(
  company: string,
  title: string,
  start: string,
  end = 'present',
  badges: readonly string[] = ['Full-time']
): WorkEntry {
  return {
    company,
    link: `https://${company.toLowerCase()}.test`,
    badges,
    title,
    start,
    end,
    highlights: []
  }
}

describe('groupConsecutiveRoles', () => {
  it('keeps every role exactly once and in order', () => {
    const work = [
      role('Acme', 'Engineer', '2020-01', '2021-01'),
      role('Globex', 'Engineer', '2021-02', '2022-01'),
      role('Acme', 'Senior Engineer', '2022-02', '2023-01'),
      role('Acme', 'Staff Engineer', '2023-02')
    ]

    const flattened = groupConsecutiveRoles(work).flatMap((group) => group.roles)

    expect(flattened).toEqual(work)
  })

  it('conjoins roles at the same company that sit next to each other', () => {
    const groups = groupConsecutiveRoles([
      role('Acme', 'Engineer', '2020-01', '2021-01'),
      role('Acme', 'Senior Engineer', '2021-02')
    ])

    expect(groups).toHaveLength(1)
    expect(groups[0].roles.map((entry) => entry.title)).toEqual(['Engineer', 'Senior Engineer'])
  })

  it('does not conjoin a company that is interrupted by another role', () => {
    const groups = groupConsecutiveRoles([
      role('Acme', 'Engineer', '2020-01', '2021-01'),
      role('Globex', 'Engineer', '2021-02', '2022-01'),
      role('Acme', 'Senior Engineer', '2022-02')
    ])

    expect(groups).toHaveLength(3)
    expect(groups[0].roles).toHaveLength(1)
    expect(groups[2].roles).toHaveLength(1)
  })

  it('conjoins a run of three, not just a pair', () => {
    const groups = groupConsecutiveRoles([
      role('Acme', 'Engineer', '2020-01', '2021-01'),
      role('Acme', 'Senior Engineer', '2021-02', '2022-01'),
      role('Acme', 'Staff Engineer', '2022-02')
    ])

    expect(groups).toHaveLength(1)
    expect(groups[0].roles).toHaveLength(3)
  })

  it('returns one group per role when nothing shares a company', () => {
    const groups = groupConsecutiveRoles([
      role('Acme', 'Engineer', '2020-01', '2021-01'),
      role('Globex', 'Engineer', '2021-02', '2022-01')
    ])

    expect(groups.map((group) => group.roles.length)).toEqual([1, 1])
  })

  it('keeps every role of the real resume exactly once, in order', () => {
    // Asserts nothing about which roles group together, so this stays green
    // when the resume itself is edited.
    expect(groupConsecutiveRoles(RESUME_DATA.work).flatMap((group) => group.roles)).toEqual(
      RESUME_DATA.work
    )
  })
})

describe('groupBadges', () => {
  it('unions badges across roles and dedupes them in first-seen order', () => {
    const groups = groupConsecutiveRoles([
      role('Acme', 'Engineer', '2020-01', '2021-01', ['Full-time']),
      role('Acme', 'Senior Engineer', '2021-02', 'present', ['Full-time', 'Promoted'])
    ])

    expect(groupBadges(groups[0])).toEqual(['Full-time', 'Promoted'])
  })

  it('returns a copy, so a caller cannot mutate the role data', () => {
    const groups = groupConsecutiveRoles([role('Acme', 'Engineer', '2020-01')])

    groupBadges(groups[0]).push('Injected')

    expect(groups[0].roles[0].badges).toEqual(['Full-time'])
  })
})

describe('groupSpan', () => {
  it('is the role itself when there is only one', () => {
    const groups = groupConsecutiveRoles([role('Acme', 'Engineer', '2020-01', '2021-06')])

    expect(groupSpan(groups[0])).toEqual({ start: '2020-01', end: '2021-06' })
  })

  it('runs from the earliest start to the latest end', () => {
    const groups = groupConsecutiveRoles([
      role('Acme', 'Engineer', '2020-01', '2021-06'),
      role('Acme', 'Senior Engineer', '2021-07', '2023-02')
    ])

    expect(groupSpan(groups[0])).toEqual({ start: '2020-01', end: '2023-02' })
  })

  it('stays open-ended while any role in the group is current', () => {
    const groups = groupConsecutiveRoles([
      role('Acme', 'Engineer', '2020-01', '2021-06'),
      role('Acme', 'Senior Engineer', '2021-07')
    ])

    expect(groupSpan(groups[0])).toEqual({ start: '2020-01', end: 'present' })
  })

  it('does not depend on the order roles happen to be listed in', () => {
    const ascending = groupConsecutiveRoles([
      role('Acme', 'Engineer', '2020-01', '2021-06'),
      role('Acme', 'Senior Engineer', '2021-07', '2023-02')
    ])
    const descending = groupConsecutiveRoles([
      role('Acme', 'Senior Engineer', '2021-07', '2023-02'),
      role('Acme', 'Engineer', '2020-01', '2021-06')
    ])

    expect(groupSpan(descending[0])).toEqual(groupSpan(ascending[0]))
  })
})
