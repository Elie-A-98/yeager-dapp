import { dictionary, SUPPORTED_LANGUAGES, type Keys, type Languages } from './definitions'

type I18nPath = `/${string}/${Languages}${string}`

const LANG_KEY = 'lang'

export function isSupportedLanguage(lang: unknown): lang is Languages {
  //@ts-expect-error This only checking and won't create any error.
  return typeof lang === 'string' && SUPPORTED_LANGUAGES.includes(lang)
}

export function isPathI18n(path: string): path is I18nPath {
  const allSegments = path.split('/')
  const lastSegment = allSegments[allSegments.length - 1]
  return isSupportedLanguage(lastSegment.toLowerCase())
}

export function getLanguageFromPath(path: I18nPath): Languages {
  const allSegments = path.split('/')
  const lastSegment = allSegments[allSegments.length - 1] as Languages
  return lastSegment
}

export function parseI18nUrl(fullPath: string | I18nPath, lang: Languages) {
  let cleanUrl: string
  const path = fullPath.split('?')[0]
  let writeIndex: number

  if (isPathI18n(path)) {
    writeIndex = Math.max(0, path.length - 3)
    cleanUrl = fullPath.slice(0, writeIndex).concat(fullPath.slice(writeIndex + 3))
  } else {
    writeIndex = path.length
    cleanUrl = fullPath
  }

  return cleanUrl
    .slice(0, writeIndex)
    .concat(cleanUrl.charAt(writeIndex - 1) === '/' ? lang : `/${lang}`)
    .concat(cleanUrl.slice(writeIndex))
}

export const saveLang = (lang: Languages) => localStorage.setItem(LANG_KEY, lang)
export const getSavedLang = (): Languages => {
  const savedLang = localStorage.getItem(LANG_KEY) as Languages | undefined
  if (savedLang !== undefined) return savedLang

  const userLanguage = navigator.language.substring(0, 2).toLowerCase()
  return isSupportedLanguage(userLanguage) ? userLanguage : 'en'
}
export const translate = (key: Keys) => {
  return dictionary[getSavedLang()][key]
}
