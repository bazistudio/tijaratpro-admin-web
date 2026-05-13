import { create } from 'zustand'

type SearchResult = {
  id: string
  title: string
  type: 'product' | 'customer' | 'sale' | 'page'
  url: string
  subtitle?: string
}

interface SearchStore {
  isOpen: boolean
  query: string
  results: SearchResult[]
  setOpen: (open: boolean) => void
  setQuery: (query: string) => void
  setResults: (results: SearchResult[]) => void
}

export const useOmnisearch = create<SearchStore>((set) => ({
  isOpen: false,
  query: '',
  results: [],
  setOpen: (open) => set({ isOpen: open }),
  setQuery: (query) => set({ query }),
  setResults: (results) => set({ results }),
}))

// Example Mock Data for Global Navigation
export const GLOBAL_NAV_RESULTS: SearchResult[] = [
  { id: '1', title: 'Create Product', type: 'page', url: '/products/create' },
  { id: '2', title: 'New Sale (POS)', type: 'page', url: '/sales/create' },
  { id: '3', title: 'Inventory Stock', type: 'page', url: '/stock' },
  { id: '4', title: 'Billing Ledger', type: 'page', url: '/billing' },
  { id: '5', title: 'Register Customer', type: 'page', url: '/customers/create' },
]
