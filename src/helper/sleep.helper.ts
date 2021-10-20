export const sleep = async (dur: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, dur)
  })
}
