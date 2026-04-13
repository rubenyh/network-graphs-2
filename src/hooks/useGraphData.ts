'use client'

import { useCallback, useEffect, useState } from 'react'
import { initialGraphData } from '@/lib/data/graphData'
import { ensureSeedGraph, saveGraph } from '@/lib/firebase/graph'
import type { Links, Node } from '@/types/Nodes'

type GraphType = { nodes: Node[]; links: Links[] }

export function useGraphData(user: { uid: string } | null) {
  const [graphData, setGraphData] = useState<GraphType>(initialGraphData)
  const [isLoadingGraph, setLoadingGraph] = useState(false)
  const [isSaving, setSaving] = useState(false)
  const [dataError, setDataError] = useState<string | null>(null)

  //  LOAD GRAPH
  useEffect(() => {
    if (!user) {
      setGraphData(initialGraphData)
      setLoadingGraph(false)
      return
    }

    let active = true
    setLoadingGraph(true)
    setDataError(null)

    ensureSeedGraph(user.uid, initialGraphData)
      .then(graph => {
        if (active) setGraphData(graph)
      })
      .catch(() => {
        if (active) setDataError('Failed to load graph data.')
      })
      .finally(() => {
        if (active) setLoadingGraph(false)
      })

    return () => {
      active = false
    }
  }, [user])

  //  SAVE GRAPH
  const persistGraphData = useCallback(
    async (nextGraph: GraphType) => {
      if (!user) return
      setSaving(true)
      setDataError(null)

      try {
        await saveGraph(user.uid, nextGraph)
      } catch {
        setDataError('Failed to save graph changes.')
      } finally {
        setSaving(false)
      }
    },
    [user]
  )

  //  UPDATE + AUTO SAVE
  const setGraphDataAndSave = useCallback(
    (updater: React.SetStateAction<GraphType>) => {
      setGraphData(prev => {
        const next =
          typeof updater === 'function' ? updater(prev) : updater

        if (user) {
          void persistGraphData(next)
        }

        return next
      })
    },
    [persistGraphData, user]
  )

  return {
    graphData,
    setGraphData: setGraphDataAndSave,
    isLoadingGraph,
    isSaving,
    dataError,
  }
}
