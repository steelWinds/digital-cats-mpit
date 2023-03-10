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
      try {
        if (!isSupported.value) return reject(new Error('NDEF чтение недоступно, или вы отказали в доступе'))

        togglePending(true)

        const ndefReader = new window.NDEFReader()

        ndefReader.scan({ signal })

        ndefReader.onreading = (event) => {
          togglePending(false)

          resolve(event)
        }

        ndefReader.onreadingerror = (error) => {
          togglePending(false)

          return reject(error)
        }
      } catch (error: any) {
        togglePending(false)

        return reject(error)
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
