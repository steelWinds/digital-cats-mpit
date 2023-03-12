export const useNFC = () => {
  const isSupported = useSupported(() => globalThis && 'NDEFReader' in globalThis)
  const [pending, togglePending] = useToggle(false)
  const scanController = new AbortController()
  const scanSignal = scanController.signal
  const nfcReader = ref<NDEFReader>()

  const setReader = (reader: NDEFReader) => {
    nfcReader.value = reader
  }

  const write = async (message: NDEFRecordDataSource, options?: NDEFWriteOptions): Promise<boolean> => {
    if (!isSupported.value || !pending.value || !nfcReader.value) {
      throw (new Error('NFC reader not scanning'))
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
    if (!isSupported.value) {
      throw (new Error('NFC reader not available'))
    } else if (pending.value) {
      throw (new Error('NFC reader is busy'))
    }

    return new Promise((resolve, reject) => {
      setReader(new NDEFReader())

      if (!nfcReader.value) reject(new Error('Unhadled error during set NDEF reader'))

      const reader = nfcReader.value!

      reader
        .scan({ signal: scanSignal })
        .then(() => {
          togglePending(true)

          reader.onreading = (event) => {
            togglePending(false)

            resolve(event)
          }

          reader.onreadingerror = (error) => {
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
