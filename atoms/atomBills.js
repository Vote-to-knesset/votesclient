import { atom, useAtom } from "jotai";

const statistic = atom({})
const useStatistic = () => useAtom(statistic)
const bills = atom([])
const useBills = () => useAtom(bills)


// a atom for search in the biils.
const searchTerm = atom("")
export const useSearchTerm = () => useAtom(searchTerm)

const selecteBills = atom([])
const useSelectedBills = () => useAtom(selecteBills)


const votedLaws = atom([])
const useLawsBills = ()=> useAtom(votedLaws)


export { useBills, useSelectedBills, useStatistic, useLawsBills};