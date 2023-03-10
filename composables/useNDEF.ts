interface ScanParams {
  readingError: (error: any) => void
  signalError: (error: any) => void
}

export const useNDEF = () => {
  const isSupported = useSupported(() => globalThis && 'NDEFReader' in globalThis)
  const [pending, togglePending] = useToggle(false)
  const controller = new AbortController()

  const scan = async () => {
    return new Promise((resolve, reject) => {
      try {
        if (!isSupported.value) return reject(new Error('NDEF чтение недоступно, или вы отказали в доступе'))

        const ndefReader = new window.NDEFReader()

        togglePending(true)

        ndefReader
          .scan({ signal: controller.signal })
          .then(() => {
            ndefReader.onreading = (event) => {
              togglePending(false)

              resolve(event)
            }

            ndefReader.onreadingerror = (error) => {
              togglePending(false)

              reject(error)
            }
          })
      } catch (error: any) {
        togglePending(false)

        reject(error)
      }
    })
  }

  return {
    isSupported,
    scan,
    pending,
    abort: controller.abort
  }
}
