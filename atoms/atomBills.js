import { atom, useAtom } from "jotai";

const bills = atom([])
const useBills = () => useAtom(bills)

// a atom for search in the biils.
const searchTerm = atom("")
export const useSearchTerm = () => useAtom(searchTerm)

const selecteBills = atom([])
const useSelectedBills = () => useAtom(selecteBills)

export { useBills, useSelectedBills};