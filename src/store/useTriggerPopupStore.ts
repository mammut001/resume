import {create} from 'zustand'
import { readProjectFromFile } from "@/data/readFile";
export type TriggerPopupStore = {
  projectName: string,
  toggleStatus: boolean,
  toggleTrigger: (name: string) => void,
  projectDic: { [key: string]: boolean } | null,
  setProjectDic: (dic: { [key: string]: boolean }) => void,
  loadProjectDic: () => Promise<void>,
  resetToFalse: () => void,
}

export  const useTriggerPopupStore = create<TriggerPopupStore>()((set,get)=>({
  projectName:'projectName',
  projectDic: null,
  setProjectDic: (dic) => set({ projectDic: dic }),
  loadProjectDic: async () => {
    try {
      const data = await readProjectFromFile()
      set({ projectDic: data })
    } catch (error) {
      console.error('Failed to load project dictionary:', error)
      set({ projectDic: {} })
    }
  },

  toggleStatus:false,

  toggleTrigger: (name: string) => set((state) => {
    if (state.projectDic && name in state.projectDic) {
      const newProjectDic: { [key: string]: boolean } = {};
      for (const key in state.projectDic) {
          newProjectDic[key] = key === name ? !state.projectDic[key] : false;
      }
      return { projectDic: newProjectDic }
    } else {
      console.error('Name not found in projectDic or projectDic is null');
      return {}
    }
  }),
  resetToFalse: ()=> set((state)=>{
    if(state.projectDic){
      const newProjectDic: { [key: string]: boolean } = {};
      for (const key in state.projectDic) {
        newProjectDic[key] = false
      }
      return { projectDic: newProjectDic }
    }
    else{
      console.error('projectDic is NULL')
      return {}
    }
  })

}))

