export const useNFC = () => {
  const isSupported = useSupported(() => globalThis && 'NDEFReader' in globalThis)
  const [pending, togglePending] = useToggle(false)
  const scanController = new AbortController()
  const scanSignal = scanController.signal
  const nfcReader = ref<NDEFReader | null>(null)

  const setReader = (reader: NDEFReader) => {
    nfcReader.value = reader
  }

  const write = async (message: NDEFRecordDataSource, options?: NDEFWriteOptions): Promise<boolean> => {
    if (!isSupported.value || pending.value || !nfcReader.value) {
      throw (new Error('NFC reader not available or busy'))
    }

    return new Promise((resolve, reject) => {
      nfcReader.value!.addEventListener('reading', () => {
        nfcReader.value!
          .write(message, options)
          .then(() => resolve(true))
          .then(reject)
      })
    })
  }

  const scan = async (): Promise<NDEFReadingEvent> => {
    if (!isSupported.value || pending.value) {
      throw (new Error('NFC reader not available or busy'))
    }

    return new Promise((resolve, reject) => {
      setReader(new NDEFReader())

      if (!nfcReader.value) reject(new Error('Unhadled error during set NDEF reader'))

      nfcReader.value!
        .scan({ signal: scanSignal })
        .then(() => {
          togglePending(true)

          nfcReader.value!.onreading = (event) => {
            togglePending(false)

            resolve(event)
          }

          nfcReader.value!.onreadingerror = (error) => {
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
    write,
    pending,
    scanController
  }
}
