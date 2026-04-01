import { useEffect, useState } from 'react'

export function useQueryParams() {
  const [params, setParams] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search)
    return Object.fromEntries(searchParams.entries())
  })

  useEffect(() => {
    const handlePopState = () => {
      const searchParams = new URLSearchParams(window.location.search)
      setParams(Object.fromEntries(searchParams.entries()))
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const updateQueryParams = (newParams: Record<string, string | undefined>) => {
    const searchParams = new URLSearchParams(window.location.search)

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        searchParams.delete(key)
      } else {
        searchParams.set(key, value)
      }
    })

    const newUrl = `${window.location.pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`
    window.history.pushState({}, '', newUrl)
    setParams(Object.fromEntries(searchParams.entries()))
  }

  return { params, updateQueryParams }
}
