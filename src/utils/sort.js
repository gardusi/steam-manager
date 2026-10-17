// Sorts by a nullable numeric field, always keeping missing values at the end.
// direction: 1 ascending, -1 descending
export const nullsLast = (field, direction) => (a, b) => {
  if (a[field] == null) return b[field] == null ? 0 : 1
  if (b[field] == null) return -1
  return direction * (a[field] - b[field])
}

export const byName = (a, b) => a.name.localeCompare(b.name, 'pt-BR')
