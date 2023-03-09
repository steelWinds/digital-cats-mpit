interface ScanParams {
  readingError: (error: any) => void
  signalError: (error: any) => void
}

export const useNDEF = () => {
  const isSupported = useSupported(() => globalThis && 'NDEFReader' in globalThis)
  const readerEvent = ref<NDEFReadingEvent | null>(null)

  const scan = async (params: ScanParams) => {
    const { readingError, signalError } = params

    try {
      if (isSupported.value) throw new Error('NDEF is not supported')

      const ndefReader = new window.NDEFReader()

      await ndefReader.scan()

      ndefReader.onreading = (event) => {
        readerEvent.value = event
      }

      ndefReader.onreadingerror = (error) => {
        readingError.call(this, error)
      }
    } catch (e: any) {
      signalError.call(this, e)
    }
  }

  return {
    isSupported,
    scan
  }
}
