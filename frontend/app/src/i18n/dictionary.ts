const BASE_LANG = {
  'common.connect-to-provider': 'Please connect to a provider',
  'common.minting': 'Minting',
  'mintin-info.who-can-mint.title': 'Who can mint ?',
  'mintin-info.who-can-mint.description':
    "For now there is a counter that decides if you are allowed to mint. So if you request to mint and it doesn't allow you, it should you allow you the next time and repeat",
  'common.gallery': 'Gallery',
  'connect-wallet.no-metamask': "Couldn't connect to metamask. Please download MetaMask provider",
  'connect-wallet.metamask-pending': "Seems like metamask is pending. Please open the MetaMask app and connect",
  'gallery.title': 'View your gallery of assets'
}

export const dictionary = {
  english: BASE_LANG,
  french: {
    'common.connect-to-provider': 'Veuillez vous connecter à un fournisseur',
    'common.minting': 'Frappage',
    'mintin-info.who-can-mint.title': 'Qui peut frapper ?',
    'mintin-info.who-can-mint.description':
      "Pour l'instant, il y a un compteur qui décide si vous êtes autorisé à frapper. Donc, si vous demandez à frapper et que cela ne vous est pas autorisé, cela devrait vous autoriser la prochaine fois et répéter",
    'common.gallery': 'Gallery',
    'connect-wallet.no-metamask': "Couldn't connect to metamask. Please download MetaMask provider",
    'connect-wallet.metamask-pending': "Seems like metamask is pending. Please open the MetaMask app and connect",
    'gallery.title': 'View your gallery of assets'
  }
  // will ensure we have all the sentences implemented in all the languages that we support
} as const satisfies Record<string, Record<keyof typeof BASE_LANG, string>>
