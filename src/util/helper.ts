const optimizedQueries: { [key: string]: string } = {}

export function optimiseQuery(query: string): string {
  if (!optimizedQueries[query]) {
    optimizedQueries[query] = query
      .split('\n')
      .map((line) => {
        line = line.trim()
        if (line.endsWith('{')) {
          line = line.substr(0, line.length - 1).trim() + '{'
        }
        return line
      })
      .join('\n')
      .trim()
  }
  return optimizedQueries[query]
}

export function gql(parts: TemplateStringsArray) {
  return optimiseQuery(String.raw(parts))
}
