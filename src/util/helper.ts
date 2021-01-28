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

export function newPrickLanguage(lang: string) {
  return function pickLanguage<T>(multiLang: { [L in string]?: T }): T {
    if (!multiLang) {
      return null
    }
    if (multiLang[lang]) {
      return multiLang[lang]
    }
    if (multiLang.en) {
      return multiLang.en
    }
    const languages = Object.getOwnPropertyNames(multiLang)
    if (!languages.length) {
      return null
    }
    for (const l of languages) {
      if (multiLang[l]) {
        return multiLang[l]
      }
    }
  }
}

export const getObjValues = (data: any) => {
  return Object.keys(data).map((key) => data[key])
}
