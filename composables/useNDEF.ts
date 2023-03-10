interface ScanParams {
  readingError: (error: any) => void
  signalError: (error: any) => void
}

export const useNDEF = () => {
  const isSupported = useSupported(() => globalThis && 'NDEFReader' in globalThis)
  const [pending, togglePending] = useToggle(false)
  const { abort, signal } = new AbortController()

  const scan = async () => {
    return new Promise((resolve, reject) => {
      togglePending(true)

      try {
        if (isSupported.value) reject(new Error('NDEF is not supported'))

        const ndefReader = new window.NDEFReader()

        ndefReader.scan({ signal })

        ndefReader.onreading = (event) => {
          resolve(event)

          togglePending(false)
        }

        ndefReader.onreadingerror = (error) => {
          reject(error)

          togglePending(false)
        }
      } catch (error: any) {
        reject(error)

        togglePending(false)
      }
    })
  }

  return {
    isSupported,
    scan,
    pending,
    abort
  }
}
