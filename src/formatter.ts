export function formatMessage(message: string, art: string): string {
  const border = '-'.repeat(message.length + 2);
  return `
  ${border}
  < ${message} >
  ${border}
${art}
    `;
}
