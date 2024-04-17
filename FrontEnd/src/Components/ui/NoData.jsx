import {WomanComputer} from './WomenComputer'
function NoData({
  label,
  description,
}) {

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex flex-col items-center justify-center gap-1">
      <WomanComputer />
        <div className="text-sm">
        <p>{label} </p>
        </div>
      </div>
      <div className="w-[280px] text-center text-xs text-neutral-60">
        {description}
      </div>
    </div>
  )
}

export { NoData }
