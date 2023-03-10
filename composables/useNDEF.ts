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

        const nfcReader = new window.NDEFReader()

        nfcReader
          .scan({ signal: controller.signal })
          .then(() => {
            togglePending(true)

            nfcReader.onreading = (event) => {
              togglePending(false)

              resolve(event)
            }

            nfcReader.onreadingerror = (error) => {
              togglePending(false)

              reject(error)
            }
          })
          .catch(reject)
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
