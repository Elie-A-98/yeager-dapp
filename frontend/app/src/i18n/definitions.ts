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
  'wrong-network.prompt': `Unable to find the contract. Please make sure that you are on the correct network. The chain id should be ${CHAIN_ID}`,
  'token-details.noot-yours': `This asset is not yours so you can't transfer it`
}

export const dictionary = {
  en: BASE_LANG,
  fr: {
    'common.problem-occured': 'Un problème est survenu',
    'common.min-length-3': 'Devrait avoir une longueur minimale de 3',
    'common.max-length-30': 'Devrait avoir une longueur maximale de 30',
    'common.required': 'Ceci est requis',
    'common.invalid-account-address': 'Adresse invalide',
    'common.connect-to-provider': 'Veuillez vous connecter à un fournisseur',
    'common.who-can-mint': 'Puis-je mint ?',

    'home.title': 'Bienvenue sur la DApp',
    'home.description': 'Ceci est un projet Web3 full stack.',
    'home.source-code': 'Code Source',

    'who-can-mint.title': 'Qui peut mint ?',
    'who-can-mint.description':
      "Pour l'instant, il y a un compteur qui décide si vous pouvez mint. Le compteur est incrémenté à chaque fois que je reçois une demande de mint. Vous pouvez mint si le compteur % 2 = 0",
    'header.gallery': 'Galerie',
    'header.mint': 'Mint',
    'connect-wallet.cant-connect-to-metamask': 'Impossible de se connecter à MetaMask',
    'connect-wallet.metamask-pending':
      'Il semble que MetaMask soit en attente. Veuillez ouvrir l’application MetaMask et vous connecter',
    'gallery.title': 'Voir votre galerie d’actifs',
    'mint-request.title': 'Demande pour mint un nouveau token',
    'mint-request.form.name': 'Nom',
    'mint-request.form.description': 'Description',
    'mint-request.form.asset': 'Actif',
    'mint-request.success': 'Token Minté !',
    'transfer-asset.title': 'Transférez votre actif',
    'page-not-found.title': 'Page non trouvée',
    'wrong-network.prompt':
      'Veuillez vous connecter au bon réseau. L’identifiant de chaîne doit être ${CHAIN_ID}',
    'token-details.noot-yours': "Cet actif n'est pas à vous, donc vous ne pouvez pas le transférer"
  },
  it: {
    'common.problem-occured': 'Si è verificato un problema',
    'common.min-length-3': 'Dovrebbe avere una lunghezza minima di 3',
    'common.max-length-30': 'Dovrebbe avere una lunghezza massima di 30',
    'common.required': 'Questo è richiesto',
    'common.invalid-account-address': 'Indirizzo non valido',
    'common.connect-to-provider': 'Si prega di connettersi a un provider',
    'common.who-can-mint': 'Posso fare il mint?',

    'home.title': 'Benvenuto nella DApp',
    'home.description': 'Questo è un progetto Web3 full stack.',
    'home.source-code': 'Codice Sorgente',

    'who-can-mint.title': 'Chi può fare il mint?',
    'who-can-mint.description':
      "Per ora c'è un contatore che decide se puoi fare il mint. Il contatore viene incrementato ogni volta che ricevo una richiesta di mint. Puoi fare il mint se contatore % 2 = 0",
    'header.gallery': 'Galleria',
    'header.mint': 'Mint',
    'connect-wallet.cant-connect-to-metamask': 'Impossibile connettersi a MetaMask',
    'connect-wallet.metamask-pending':
      'Sembra che MetaMask sia in attesa. Si prega di aprire l’app MetaMask e connettersi',
    'gallery.title': 'Visualizza la tua galleria di asset',
    'mint-request.title': 'Richiesta di mint di un nuovo token',
    'mint-request.form.name': 'Nome',
    'mint-request.form.description': 'Descrizione',
    'mint-request.form.asset': 'Asset',
    'mint-request.success': 'Token Mintato!',
    'transfer-asset.title': 'Trasferisci il tuo asset',
    'page-not-found.title': 'Pagina non trovata',
    'wrong-network.prompt':
      "Si prega di connettersi alla rete corretta. L'ID della catena deve essere ${CHAIN_ID}",
    'token-details.noot-yours': 'Questo asset non è tuo, quindi non puoi trasferirlo'
  }
  // will ensure we have all the sentences implemented in all the languages that we support
} as const satisfies Record<Languages, Record<keyof typeof BASE_LANG, string>>
