// Extracts the CWE number from a CWE identifier
// example:
//  extractCweNumber('CWE-416') returns '416'
//
export function extractCweNumber(cwe: string): string {
  const cweRegEx = /^CWE-(\d+)$/i
  const cweParts = cweRegEx.exec(cwe)

  return cweParts ? cweParts[1] : cwe
}
