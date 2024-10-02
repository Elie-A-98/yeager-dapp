import { CHAIN_ID } from '@/ethereum/definitions'
import type { InjectionKey } from 'vue'

export const SUPPORTED_LANGUAGES = ['en', 'fr', 'it'] as const

export type Languages = (typeof SUPPORTED_LANGUAGES)[number]
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

  'home.title': 'Welcome to the DApp',
  'home.description': 'This is a full stack Web3 project.',
  'home.source-code': 'Source Code',

  'who-can-mint.title': 'Who can mint ?',
  'who-can-mint.description':
    'For now there is a counter that decides if you are allowed to mint. The counter is incremented each I receive a mint request. You can mint if count % 2 = 0',
  'header.gallery': 'Gallery',
  'header.mint': 'Mint',
  'connect-wallet.cant-connect-to-metamask': 'Unable to connect to metamask',
  'connect-wallet.metamask-pending':
    'Seems like metamask is pending. Please open the MetaMask app and connect',
  'gallery.title': 'View your gallery of assets',
  'mint-request.title': 'Request to mint a new token',
  'mint-request.form.name': 'Name',
  'mint-request.form.description': 'Description',
  'mint-request.form.asset': 'Asset',
  'mint-request.success': 'Token Minted!',
  'transfer-asset.title': 'Transfer your asset',
  'page-not-found.title': 'Page Not Found',
  'wrong-network.prompt': `Please connect to the right network. The chain id should be ${CHAIN_ID}`,
  'token-details.noot-yours': `This asset is not yours so you can't transfer it`
}

export const dictionary = {
  en: BASE_LANG,
  fr: {
    'common.problem-occured': 'Un problème est survenu',
    'common.min-length-3': 'Doit avoir une longueur minimale de 3 caractères',
    'common.max-length-30': 'Doit avoir une longueur maximale de 30 caractères',
    'common.required': 'Requis',
    'common.invalid-account-address': 'Adresse invalide',
    'common.connect-to-provider': 'Veuillez vous connecter à un fournisseur',
    'common.who-can-mint': 'Puis-je en créer un ?',

    'home.title': 'Bienvenue sur la DApp',
    'home.description': 'Ceci est un projet Web3 full-stack.',
    'home.source-code': 'Code source',

    'who-can-mint.title': 'Qui peut en créer ?',
    'who-can-mint.description':
      "Pour l'instant, un compteur détermine si vous êtes autorisé à en créer un. Le compteur est incrémenté à chaque demande de création. Vous pouvez en créer un si le nombre % 2 = 0",
    'header.gallery': 'Galerie',
    'header.mint': 'Créer', // Using "Créer" for a more action-oriented translation
    'connect-wallet.cant-connect-to-metamask': 'Impossible de se connecter à MetaMask',
    'connect-wallet.metamask-pending':
      "MetaMask semble être en attente. Veuillez ouvrir l'application MetaMask et vous connecter",
    'gallery.title': "Voir votre galerie d'actifs",
    'mint-request.title': "Demande de création d'un nouveau jeton",
    'mint-request.form.name': 'Nom',
    'mint-request.form.description': 'Description',
    'mint-request.form.asset': 'Actif',
    'mint-request.success': 'Jeton créé !',
    'transfer-asset.title': 'Transférer votre actif',
    'page-not-found.title': 'Page introuvable',

    'wrong-network.prompt': `Veuillez vous connecter au bon réseau. L'identifiant de chaîne doit être${CHAIN_ID}`,
  'token-details.noot-yours': `This asset is not yours so you can't transfer it`

  },
  it: {
    'common.problem-occured': 'Si è verificato un problema',
    'common.min-length-3': 'Deve avere una lunghezza minima di 3 caratteri',
    'common.max-length-30': 'Deve avere una lunghezza massima di 30 caratteri',
    'common.required': 'Obbligatorio',
    'common.invalid-account-address': 'Indirizzo non valido',
    'common.connect-to-provider': 'Collegati a un provider',
    'common.who-can-mint': 'Posso crearne uno?', // Using "crearne uno" for clarity

    'home.title': 'Benvenuto su DApp',
    'home.description': 'Questo è un progetto Web3 full-stack.',
    'home.source-code': 'Codice sorgente',

    'who-can-mint.title': 'Chi può crearne uno?',
    'who-can-mint.description':
      'Per ora, un contatore determina se sei autorizzato a crearne uno. Il contatore viene incrementato a ogni richiesta di creazione. Puoi crearne uno se numero % 2 = 0',
    'header.gallery': 'Galleria',
    'header.mint': 'Crea', // Using "Crea" for a more action-oriented translation
    'connect-wallet.cant-connect-to-metamask': 'Impossibile connettersi a MetaMask',
    'connect-wallet.metamask-pending':
      "Sembra che MetaMask sia in attesa. Apri l'app MetaMask e connettiti",
    'gallery.title': 'Visualizza la tua galleria di asset',
    'mint-request.title': 'Richiesta di creazione di un nuovo token',
    'mint-request.form.name': 'Nome',
    'mint-request.form.description': 'Descrizione',
    'mint-request.form.asset': 'Asset',
    'mint-request.success': 'Token creato!',
    'transfer-asset.title': 'Trasferisci il tuo asset',
    'page-not-found.title': 'Pagina non trovata',
    'wrong-network.prompt': `Si prega di connettersi alla rete giusta. L'ID della catena deve essere ${CHAIN_ID}`,
  'token-details.noot-yours': `This asset is not yours so you can't transfer it`

  }
  // will ensure we have all the sentences implemented in all the languages that we support
} as const satisfies Record<Languages, Record<keyof typeof BASE_LANG, string>>
