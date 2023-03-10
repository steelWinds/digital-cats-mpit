interface NDEFRecord {
  data: DataView;
  encoding: 'utf-8' | 'utf-16' | 'utf-16le' | 'utf-16be';
  id: string;
  lang: string;
  mediaType: string;
  recordType: 'empty' | 'text' | 'url' | 'smart-parser' | 'absolute-url' | 'mime' | 'unknown' | string;
  toRecords: () => NDEFRecord[]
}

interface NDEFMessage {
  records: NDEFRecord[];
}

interface NDEFReadingEvent extends Event {
  serialNumber: string;
  message: NDEFMessage;
}

type NDEFWriteMessage = ArrayBuffer | DataView | Partial<NDEFRecord>[];

interface NDEFWriteMessageParams {
  overwrite: boolean;
  signal: AbortSignal;
}

interface NDEFReader {
  new(): NDEFReader
  write: (message: NDEFWriteMessage, params?: NDEFWriteMessageParams) => Promise<void>
  scan: (params?: {signal: AbortSignal}) => Promise<NDEFReadingEvent>;
  onreadingerror: (error: any) => void;
  onreading: (event: NDEFReadingEvent) => void;
}

interface Window {
  NDEFReader: NDEFReader;
}
