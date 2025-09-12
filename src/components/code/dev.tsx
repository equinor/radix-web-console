import type { Terminal } from '@xterm/xterm'
import { useEffect, useRef } from 'react'
import { Log, LogProps } from './log'

const testdata: Array<LogProps & { text: string }> = [
  {
    text: '                                                                              \n                                                                              \n                                                                              \n        88888b.d88b.  .d88b. 88888b.  .d88b. .d8888b 88888b.  8888b.  .d8888b .d88b.  \n        888 "888 "88bd88""88b888 "88bd88""88b88K     888 "88b    "88bd88P"   d8P  Y8b \n        888  888  888888  888888  888888  888"Y8888b.888  888.d888888888     88888888 \n        888  888  888Y88..88P888  888Y88..88P     X88888 d88P888  888Y88b.   Y8b.     \n        888  888  888 "Y88P" 888  888 "Y88P"  88888P\'88888P" "Y888888 "Y8888P "Y8888  \n                                                     888                              \n                                                     888                              \n                                                     888                              \n             888 \n             888 \n             888 \n         .d88888 \n        d88" 888 \n        888  888 \n        Y88b 888 \n         "Y88888 \n                 \n                 \n                 ',
  },
  {
    text: '     888 \n     888 \n     888 \n .d88888 \nd88" 888 \n888  888 \nY88b 888 \n "Y88888 ',
  },
  {
    text: '2021-09-15 13:39:32.243  INFO 1 --- [           main] o.s.boot.SpringApplication               : \n\n        .########.....###.....######..##....##.########.##....##.########.\n        .##.....##...##.##...##....##.##...##..##.......###...##.##.....##\n        .##.....##..##...##..##.......##..##...##.......####..##.##.....##\n        .########..##.....##.##.......#####....######...##.##.##.##.....##\n        .##.....##.#########.##.......##..##...##.......##..####.##.....##\n        .##.....##.##.....##.##....##.##...##..##.......##...###.##.....##\n        .########..##.....##..######..##....##.########.##....##.########.\n        \n         :: Running Spring Boot 2.5.4 ::',
  },
  {
    text: 'A long code example:\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40',
    copy: true,
    download: true,
  },
  { text: 'A short code example', copy: true, download: true },
]

export default (
  <div className="grid grid--gap-small">
    {testdata.map((x, i) => (
      <CodeContainer key={i} {...x} />
    ))}
  </div>
)

function CodeContainer({ text, ...props }: { text: string; copy?: boolean; download?: boolean }) {
  const terminalRef = useRef<Terminal | undefined>(undefined)

  useEffect(() => {
    text.split('\n').forEach((line) => {
      terminalRef.current!.writeln(line)
    })
  }, [text])

  return (
    <div
      style={{
        border: 'solid 2px gray',
        width: '100%',
        margin: '4px',
      }}
    >
      <div style={{ padding: '10px' }}>
        <Log ref={terminalRef} {...props} />
      </div>
    </div>
  )
}
