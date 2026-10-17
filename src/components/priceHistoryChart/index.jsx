import { useEffect, useMemo, useRef, useState } from 'react'
import FilterChips from '../filterChips'
import {
  Wrapper, Insights, Insight, InsightValue, ChartArea, Tooltip, TooltipValue, TooltipMeta,
  TableToggle, Table, LiveRegion
} from './style'
import { discountInsights, nearestIndex, pointsInRange, priceScale, timeTicks, year } from './model'
import { SteamColors } from '../../globalStyles'
import { formatPrice, formatRelativeDate } from '../../utils/format'

const height = 240
const margin = { top: 20, right: 16, bottom: 28, left: 64 }

const dateFormat = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
const monthFormat = new Intl.DateTimeFormat('pt-BR', { month: 'short', year: '2-digit' })
const formatDate = (timestamp) => dateFormat.format(timestamp)

const ranges = [
  { key: '1a', label: '1 ano', span: year },
  { key: '3a', label: '3 anos', span: 3 * year },
  { key: 'tudo', label: 'Tudo', span: null }
]

const useElementWidth = () => {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, width]
}

const describe = (point) => {
  const deal = point.cut > 0 ? `-${point.cut}%, de ${formatPrice(point.regular)}` : 'sem desconto'
  return `${formatPrice(point.price)} em ${formatDate(point.date)} (${deal})`
}

// Step chart of a game's Steam price over time, with the historical low as reference
const PriceHistoryChart = ({ history, steamLowest }) => {
  const [chartRef, width] = useElementWidth()
  // One year answers "is it worth waiting?" best; the full history gets noisy
  const [rangeKey, setRangeKey] = useState('1a')
  const [activeIndex, setActiveIndex] = useState(null)
  const [now] = useState(Date.now)

  const dataSpan = now - history[0].date
  // Offer a preset only when there's more data than it shows
  const availableRanges = ranges.filter(range => !range.span || range.span < dataSpan)
  const range = availableRanges.find(r => r.key === rangeKey) ?? availableRanges.at(-1)

  const points = useMemo(() => pointsInRange(history, range.span, now), [history, range, now])
  const changes = points.filter(point => !point.carried)
  const insights = useMemo(() => discountInsights(history, now), [history, now])

  const innerWidth = Math.max(0, width - margin.left - margin.right)
  const innerHeight = height - margin.top - margin.bottom
  const maxPrice = Math.max(...points.map(p => Math.max(p.price, p.regular ?? 0)), steamLowest ?? 0)
  const { max: yMax, ticks: yTicks } = priceScale(maxPrice)
  const x = (date) => margin.left + ((date - points[0].date) / (now - points[0].date || 1)) * innerWidth
  const y = (price) => margin.top + innerHeight - (price / yMax) * innerHeight

  const xTicks = useMemo(() => {
    const { ticks, yearly } = timeTicks(points[0].date, now)
    return { ticks, label: yearly ? (t) => new Date(t).getFullYear() : (t) => monthFormat.format(t) }
  }, [points, now])

  const linePath = points.map((point, i) => i === 0
    ? `M${x(point.date)},${y(point.price)}`
    : `H${x(point.date)}V${y(point.price)}`
  ).join('')
  const areaPath = `${linePath}V${y(0)}H${x(points[0].date)}Z`

  const active = activeIndex != null ? changes[activeIndex] : null
  const nearestChange = (clientX) => {
    const bounds = chartRef.current.getBoundingClientRect()
    const date = points[0].date + ((clientX - bounds.left - margin.left) / innerWidth) * (now - points[0].date)
    return nearestIndex(changes, date)
  }
  const onKeyDown = (event) => {
    if (!changes.length) return
    const last = changes.length - 1
    const moves = { ArrowLeft: -1, ArrowRight: 1, Home: -Infinity, End: Infinity }
    if (!(event.key in moves)) return
    event.preventDefault()
    const current = activeIndex ?? last
    setActiveIndex(Math.min(last, Math.max(0, current + moves[event.key])))
  }

  const tooltipLeft = active ? Math.min(Math.max(x(active.date), 80), width - 80) : 0

  return (
    <Wrapper>
      <Insights>
        <Insight>
          <InsightValue>{insights.salesLastYear}</InsightValue>
          {insights.salesLastYear === 1 ? ' promoção' : ' promoções'} no último ano
          {insights.biggestCutLastYear > 0 && `, até -${insights.biggestCutLastYear}%`}
        </Insight>
        {insights.lastSale && (
          <Insight>Última promoção começou <InsightValue>{formatRelativeDate(insights.lastSale, now)}</InsightValue></Insight>
        )}
      </Insights>

      {availableRanges.length > 1 && (
        <FilterChips
          label='Período do histórico'
          options={availableRanges.map(r => ({ key: r.key, label: r.label }))}
          active={range.key}
          onChange={setRangeKey}
        />
      )}

      <ChartArea
        ref={chartRef}
        tabIndex={0}
        role='group'
        aria-label={`Histórico de preço na Steam. ${changes.length} mudanças de preço no período. Use as setas para percorrer.`}
        onPointerMove={(event) => changes.length && setActiveIndex(nearestChange(event.clientX))}
        onPointerLeave={() => setActiveIndex(null)}
        onFocus={() => setActiveIndex(current => current ?? changes.length - 1)}
        onBlur={() => setActiveIndex(null)}
        onKeyDown={onKeyDown}
      >
        {width > 0 && (
          <svg width={width} height={height} aria-hidden='true'>
            {yTicks.map(tick => (
              <g key={tick}>
                <line x1={margin.left} x2={width - margin.right} y1={y(tick)} y2={y(tick)} stroke='rgba(255,255,255,0.08)' />
                <text x={margin.left - 8} y={y(tick)} dy='0.32em' textAnchor='end' fontSize='11' fill={SteamColors.textMuted}>
                  {formatPrice(tick)}
                </text>
              </g>
            ))}
            {xTicks.ticks.map(tick => (
              <text key={tick} x={x(tick)} y={height - 8} textAnchor='middle' fontSize='11' fill={SteamColors.textMuted}>
                {xTicks.label(tick)}
              </text>
            ))}
            <path d={areaPath} fill={SteamColors.chart} opacity='0.1' />
            <path d={linePath} fill='none' stroke={SteamColors.chart} strokeWidth='2' strokeLinejoin='round' />
            {steamLowest > 0 && (
              <g>
                <line
                  x1={margin.left} x2={width - margin.right} y1={y(steamLowest)} y2={y(steamLowest)}
                  stroke={SteamColors.discount} strokeWidth='1' strokeDasharray='4 3'
                />
                {/* Halo in the panel color keeps the label readable where the price line crosses it */}
                <text
                  x={width - margin.right} y={y(steamLowest) - 6} textAnchor='end' fontSize='11' fill={SteamColors.accent}
                  stroke={SteamColors.primary} strokeWidth='4' strokeLinejoin='round' paintOrder='stroke'
                >
                  Mínimo histórico {formatPrice(steamLowest)}
                </text>
              </g>
            )}
            {active && (
              <g>
                <line x1={x(active.date)} x2={x(active.date)} y1={margin.top} y2={margin.top + innerHeight} stroke='rgba(255,255,255,0.35)' />
                <circle cx={x(active.date)} cy={y(active.price)} r='5' fill={SteamColors.chart} stroke={SteamColors.primary} strokeWidth='2' />
              </g>
            )}
          </svg>
        )}
        {active && (
          <Tooltip style={{ left: tooltipLeft }} aria-hidden='true'>
            <TooltipValue>{formatPrice(active.price)}</TooltipValue>
            <TooltipMeta>
              {formatDate(active.date)} · {active.cut > 0 ? `-${active.cut}% de ${formatPrice(active.regular)}` : 'sem desconto'}
            </TooltipMeta>
          </Tooltip>
        )}
      </ChartArea>
      <LiveRegion aria-live='polite'>{active ? describe(active) : ''}</LiveRegion>

      <TableToggle>
        <summary>Ver todas as mudanças de preço ({history.length})</summary>
        <Table>
          <thead>
            <tr><th scope='col'>Data</th><th scope='col'>Preço</th><th scope='col'>Desconto</th></tr>
          </thead>
          <tbody>
            {history.toReversed().map(point => (
              <tr key={point.date}>
                <td>{formatDate(point.date)}</td>
                <td>{formatPrice(point.price)}</td>
                <td>{point.cut > 0 ? `-${point.cut}%` : '—'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableToggle>
    </Wrapper>
  )
}
export default PriceHistoryChart
