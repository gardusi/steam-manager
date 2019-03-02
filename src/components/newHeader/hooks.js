import { useState } from 'react'
import { SteamColors } from '../../globalStyles'

export const tab = {
  dashboard: 'dashboard',
  statistics: 'statistics'
}

export const useTabSelector = (initialTab) => {
  const [selectedTab, setTab] = useState(initialTab)

  const dashColor = selectedTab === tab.dashboard ? SteamColors.secondary : SteamColors.accent
  const statsColor = selectedTab === tab.statistics ? SteamColors.secondary : SteamColors.accent

  return [dashColor, statsColor, setTab]
}
