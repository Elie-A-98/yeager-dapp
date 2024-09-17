import { dictionary } from "./dictionary"

type Languages = keyof typeof dictionary
type Keys = keyof typeof dictionary[Languages]

export const translate = (key: Keys)=>{
    // get preferred language later
    const preferredLanguage = 'english'
    return dictionary[preferredLanguage][key]
}