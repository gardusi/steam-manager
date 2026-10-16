import { useLocation } from 'react-router'
import { SteamColors } from '../../globalStyles'

export const tab = {
  dashboard: '/dashboard',
  statistics: '/statistics'
}

export const useTabSelector = () => {
  const { pathname: selectedTab } = useLocation()

  const dashColor = selectedTab === tab.dashboard ? SteamColors.secondary : SteamColors.accent
  const statsColor = selectedTab === tab.statistics ? SteamColors.secondary : SteamColors.accent

  return [dashColor, statsColor]
}
