import {create} from 'zustand'

import {persist,devtools,createJSONStorage} from 'zustand/middleware'

import AsyncStorage from '@react-native-async-storage/async-storage'


import { userSlice } from './useSlice'
import { appSlice } from './appSlice'

const store =   (set) => ({
    ...userSlice(set),
    ...appSlice(set)
})

const storage = createJSONStorage(AsyncStorage)
// const useStore = create(persist(store,{name:'user-storage',getStorage:()=>storage}))

const useStore = create(store)
export default useStore;