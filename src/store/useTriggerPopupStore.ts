import {create} from 'zustand'
import { Language } from "@/store/useLanguageStore";

export type TriggerPopupStore = {
  projectName: string,
  toggleStatus: boolean,
  toggleTrigger: () =>void,
}

export  const useTriggerPopupStore = create<TriggerPopupStore>()((set)=>({
  projectName:'projectName',
  toggleStatus:false,
  toggleTrigger:() =>  set((state)=>({
    toggleStatus:!state.toggleStatus,
  }))
}))

