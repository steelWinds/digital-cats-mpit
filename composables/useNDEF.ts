export const useNDEF = () => {
  const isSupported = useSupported(() => globalThis && 'NDEFReader' in globalThis)
  const [pending, togglePending] = useToggle(false)
  const controller = new AbortController()
  const signal = controller.signal

  const scan = async (): Promise<NDEFReadingEvent> => {
    if (!isSupported.value) throw (new Error('NDEF not available'))

    return new Promise((resolve, reject) => {
      const nfcReader = new window.NDEFReader()

      nfcReader
        .scan({ signal })
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
        .catch((error) => {
          togglePending(false)

          reject(error)
        })
    })
  }

  return {
    isSupported,
    scan,
    pending,
    controller
  }
}
