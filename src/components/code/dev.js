import { Code } from '.';

export default (
  <>
    <Code copy download>
      {
        'A long code example:\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20'
      }
    </Code>
    <div style={{ height: '100px' }} />
    <Code copy download>
      A short code example.
    </Code>
  </>
);
