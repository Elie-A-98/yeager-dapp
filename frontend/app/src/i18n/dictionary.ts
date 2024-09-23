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
  'connect-wallet.no-metamask': "Couldn't connect to metamask. Please download MetaMask provider",
  'connect-wallet.metamask-pending':
    'Seems like metamask is pending. Please open the MetaMask app and connect',
  'gallery.title': 'View your gallery of assets',
  'mint-request.title': 'Request to mint a new token',
  'mint-request.form.name': 'Name',
  'mint-request.form.description': 'Description',
  'mint-request.form.asset': 'Asset',
  'mint-request.success': 'Token Minted!',
  'metamask.install': 'Please install Metamask',
  'transfer-asset.title': 'Transfer your asset',
}

export const dictionary = {
  english: BASE_LANG,
  french: {
    'common.problem-occured': 'A problem occured',
    'common.min-length-3': 'Should have a min length of 3',
    'common.max-length-30': 'Should have a max length of 30',
    'common.required': 'This is required',
    'common.invalid-account-address': 'Invalid addreess',
    'common.connect-to-provider': 'Veuillez vous connecter à un fournisseur',
    'common.who-can-mint': 'Can I mint ?',
    'who-can-mint.title': 'Qui peut frapper ?',
    'who-can-mint.description':
      "Pour l'instant, il y a un compteur qui décide si vous êtes autorisé à frapper. Donc, si vous demandez à frapper et que cela ne vous est pas autorisé, cela devrait vous autoriser la prochaine fois et répéter",
    'header.gallery': 'Gallery',
    'header.mint': 'Mint',
    'connect-wallet.no-metamask': "Couldn't connect to metamask. Please download MetaMask provider",
    'connect-wallet.metamask-pending':
      'Seems like metamask is pending. Please open the MetaMask app and connect',
    'gallery.title': 'View your gallery of assets',
    'mint-request.title': 'Request to mint a new token',
    'mint-request.form.name': 'Name',
    'mint-request.form.description': 'Description',
    'mint-request.form.asset': 'Asset',
    'mint-request.success': 'Token Minted!',
    'metamask.install': 'Please install Metamask',
  'transfer-asset.title': 'Transfer your asset',

  }
  // will ensure we have all the sentences implemented in all the languages that we support
} as const satisfies Record<string, Record<keyof typeof BASE_LANG, string>>
