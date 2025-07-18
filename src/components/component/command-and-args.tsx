import { List, Typography } from '@equinor/eds-core-react';

type CommandAndArgsProps = {
  command?: string[];
  args?: string[];
};

export const CommandAndArgs = ({ command, args }: CommandAndArgsProps) => (
  <>
    {command && command.length > 0 && (
      <Typography>
        Command
        <List className="o-indent-list">
          {command.map((cmd, index) => (
            <List.Item key={index}>
              <strong>{cmd}</strong>
            </List.Item>
          ))}
        </List>
      </Typography>
    )}
    {args && args.length > 0 && (
      <Typography>
        Args
        <List className="o-indent-list">
          {args.map((arg, index) => (
            <List.Item key={index}>
              <strong>{arg}</strong>
            </List.Item>
          ))}
        </List>
      </Typography>
    )}
  </>
);
