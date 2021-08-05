export const toFeet = (cm: number) => {
  var realFeet = (cm * 0.3937) / 12
  var feet = Math.floor(realFeet)
  var inches = Math.round((realFeet - feet) * 12)
  return `${feet}' ${inches}''`
}

export const toLbs = (kgs: number) => kgs * 2.205
