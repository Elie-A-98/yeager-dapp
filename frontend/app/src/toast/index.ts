import {toastInjectionKey, type Toast, type UseToastReturn} from './definitions'
import {inject} from 'vue'
import { useRouter } from 'vue-router'

export const useToast = (): UseToastReturn=>{
    const router = useRouter()
    const route = router.currentRoute.value.path;
    const toasts = inject(toastInjectionKey)
    if(toasts === undefined){
        throw new Error(`Cannot inject toast outside of ToastProvider`)
    }
    return {
        add: (toast: Toast)=> toasts.add(toast, route),
        remove: (toast: Toast)=> toasts.remove(toast, route),
    }
}