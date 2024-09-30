import type { InjectionKey } from 'vue'

export const SUPPORTED_LANGUAGES = ['en', 'fr'] as const

export type Languages =  typeof SUPPORTED_LANGUAGES[number]
export type Keys = keyof (typeof dictionary)[Languages]

export const i18nInjectionKey = Symbol() as InjectionKey<{
  translate: (key: Keys) => string
}>

const BASE_LANG = {
  'common.problem-occured': 'A problem occured',
  'common.min-length-3': 'Should have a min length of 3',
  'common.max-length-30': 'Should have a max length of 30',
  'common.required': 'This is required',
  'common.invalid-account-address': 'Invalid addreess',
  'common.connect-to-provider': 'Please connect to a provider',
  'common.who-can-mint': 'Can I mint ?',
  'who-can-mint.title': 'Who can mint ?',
  'who-can-mint.description':
    'For now there is a counter that decides if you are allowed to mint. The counter is incremented each I receive a mint request. You can mint if count % 2 = 0',
  'header.gallery': 'Gallery',
  'header.mint': 'Mint',
  'connect-wallet.cant-connect-to-metamask': "Unable to connect to metamask",
  'connect-wallet.metamask-pending':
    'Seems like metamask is pending. Please open the MetaMask app and connect',
  'gallery.title': 'View your gallery of assets',
  'mint-request.title': 'Request to mint a new token',
  'mint-request.form.name': 'Name',
  'mint-request.form.description': 'Description',
  'mint-request.form.asset': 'Asset',
  'mint-request.success': 'Token Minted!',
  'transfer-asset.title': 'Transfer your asset'
}

export const dictionary = {
  en: BASE_LANG,
  fr: {
    'common.problem-occured': 'Un problème est survenu',
    'common.min-length-3': 'Doit avoir une longueur minimale de 3',
    'common.max-length-30': 'Doit avoir une longueur maximale de 30',
    'common.required': 'Ceci est requis',
    'common.invalid-account-address': 'Adresse invalide',
    'common.connect-to-provider': 'Veuillez vous connecter à un fournisseur',
    'common.who-can-mint': 'Puis-je en créer ?', // "créer" means "mint" in a financial context
    'who-can-mint.title': 'Qui peut en créer ?',
    'who-can-mint.description':
      "Pour l'instant, un compteur décide si vous êtes autorisé à en créer. Le compteur est incrémenté à chaque demande de création. Vous pouvez en créer une si le compteur % 2 = 0",
    'header.gallery': 'Galerie',
    'header.mint': 'Créer', // "Créer" for consistency with "Qui peut en créer ?"
    'connect-wallet.cant-connect-to-metamask': "Incapable de etablir une connection avec metamask",
    'connect-wallet.metamask-pending':
      "Il semble que MetaMask soit en attente. Veuillez ouvrir l'application MetaMask et vous connecter",
    'gallery.title': "Voir votre galerie d'actifs",
    'mint-request.title': "Demande de création d'un nouveau jeton",
    'mint-request.form.name': 'Nom',
    'mint-request.form.description': 'Description',
    'mint-request.form.asset': 'Actif',
    'mint-request.success': 'Jeton créé !',
    'transfer-asset.title': 'Transférer votre actif'
  }
  // will ensure we have all the sentences implemented in all the languages that we support
} as const satisfies Record<Languages, Record<keyof typeof BASE_LANG, string>>
