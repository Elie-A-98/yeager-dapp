import { inject } from "vue"
import { assertIsAccountConnected, assertIsEthereumInjected, ethereumInjectionKey } from "."

export const useEthereum = ()=>{
    const ethereum = inject(ethereumInjectionKey)
    assertIsEthereumInjected(ethereum)
    return ethereum
}

export const useEthereumAccount = ()=>{
    const ethereum = useEthereum()
    assertIsAccountConnected(ethereum.account)
    return ethereum.account
}