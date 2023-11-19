import { atom, useAtom } from "jotai";



const userDetails = atom({})
const useUserDetails = () => useAtom(userDetails)

export default useUserDetails