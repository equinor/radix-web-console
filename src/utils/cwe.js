// Extracts the CWE number from an CWE identifier
// example:
//  extractCweNumber('CWE-416') returns '416'
//
export const extractCweNumber = (cwe) => {
  const cweRegEx = /^CWE-(\d+)$/i;
  const cweParts = cweRegEx.exec(cwe);

  if (cweParts) {
    return cweParts[1];
  }
  return cwe;
};
