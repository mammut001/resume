import {create} from 'zustand'

export type TriggerPopupStore = {
  projectName: string,
  toggleStatus: boolean,
  toggleTrigger: () =>void,

}


