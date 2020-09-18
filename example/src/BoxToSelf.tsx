import React from "react"
import { getBoxToBoxArrow } from "perfect-arrows"

export default function BoxToSelf() {
  const ref = React.useRef<HTMLElement>(null)
  const [box, setBox] = React.useState({ x: 100, y: 200, w: 128, h: 200 })

  const [bow, setBow] = React.useState(0)
  const [stretch, setStretch] = React.useState(0.5)
  const [padStart, setPadStart] = React.useState(0)
  const [padEnd, setPadEnd] = React.useState(20)
  const [stretchMin, setStretchMin] = React.useState(0)
  const [stretchMax, setStretchMax] = React.useState(360)
  const [flip, setFlip] = React.useState(false)
  const [straights, setStraights] = React.useState(true)
  const [showDecorations, setShowDecorations] = React.useState(true)

  const [sx, sy, cx, cy, ex, ey, ae, as, ac] = getBoxToBoxArrow(
    box.x,
    box.y,
    box.w,
    box.h,
    box.x,
    box.y,
    box.w,
    box.h,
    {
      padStart,
      padEnd,
      bow,
      straights,
      stretch,
      stretchMax,
      stretchMin,
      flip,
    }
  )

  const endAngleAsDegrees = ae * (180 / Math.PI)

  const resizeBox = (pageX: number, pageY: number) => {
    setBox(b => ({
      ...b,
      w: (pageX - b.w / 2 - (ref.current?.offsetLeft || 0)),
      h: (pageY - b.h / 2 - (ref.current?.offsetTop || 0)),
    }))
  }

  return (
    <section ref={ref}>
      <h2>Box to Self</h2>
      <svg
        viewBox="0 0 1280 720"
        style={{ width: 1280, height: 720, border: "1px solid #000" }}
        onClick={e => {
          resizeBox(e.pageX, e.pageY)
        }}
        onMouseMove={e => {
          if (e.buttons !== 1) return
          resizeBox(e.pageX, e.pageY)
        }}

        stroke="#000"
        fill="#000"
        strokeWidth={3}
      >
        {showDecorations && (
          <>
            <circle name="start-cirlce" cx={sx} cy={sy} r={4} />
            <polygon
              name="end-arrow"
              points="0,-6 12,0, 0,6"
              transform={`translate(${ex},${ey}) rotate(${endAngleAsDegrees})`}
            />
          </>
        )}
        <path
          name="line-between"
          d={`M${sx},${sy} Q${cx},${cy} ${ex},${ey}`}
          strokeWidth={3}
          fill="none"
        />
        <rect
          name="box"
          x={box.x}
          y={box.y}
          width={box.w}
          height={box.h}
          fill="none"
        />
        <circle
          name="start-point"
          cx={box.x + box.w / 2}
          cy={box.y + box.h / 2}
          r={3}
          fill={"#F00"}
          strokeWidth={0}
        />
      </svg>
      <div style={{ display: "grid" }}>
        <label>
          <input
            type="checkbox"
            checked={showDecorations}
            onChange={() => setShowDecorations(!showDecorations)}
          />
          Show Decorations
        </label>
        <label>
          <input
            type="checkbox"
            checked={flip}
            onChange={() => setFlip(!flip)}
          />
          Flip
        </label>
        <label>
          <input
            type="checkbox"
            checked={straights}
            onChange={() => setStraights(!straights)}
          />
          Straights
        </label>
        <label>
          <input
            type="range"
            min={0}
            max={2}
            step={0.1}
            value={bow}
            onChange={e => setBow(parseFloat(e.target.value))}
          />
          Bow
        </label>
        <label>
          <input
            type="range"
            min={0}
            max={2}
            step={0.1}
            value={stretch}
            onChange={e => setStretch(parseFloat(e.target.value))}
          />
          Stretch
        </label>
        <label>
          <input
            type="range"
            min={0}
            max={600}
            step={1}
            value={stretchMin}
            onChange={e => setStretchMin(parseFloat(e.target.value))}
          />
          Stretch Min
        </label>
        <label>
          <input
            type="range"
            min={0}
            max={999}
            step={1}
            value={stretchMax}
            onChange={e => setStretchMax(parseFloat(e.target.value))}
          />
          Stretch Max
        </label>
        <label>
          <input
            type="range"
            min={0}
            max={32}
            step={1}
            value={padStart}
            onChange={e => setPadStart(parseFloat(e.target.value))}
          />
          Pad Start
        </label>
        <label>
          <input
            type="range"
            min={0}
            max={32}
            step={1}
            value={padEnd}
            onChange={e => setPadEnd(parseFloat(e.target.value))}
          />
          Pad End
        </label>
      </div>
    </section>
  )
}
