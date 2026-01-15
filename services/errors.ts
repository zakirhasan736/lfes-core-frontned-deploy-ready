export class TerminalError extends Error {
  code: string;

  constructor(message: string, code: string = 'SYNC_ERROR') {
    super(message);
    this.name = 'TerminalError';
    this.code = code;
  }
}
