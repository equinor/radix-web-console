import { Button, Icon, Menu } from '@equinor/eds-core-react';
import { more_vertical } from '@equinor/eds-icons';
import { Fragment, useState } from 'react';

import './style.css';

export const JobContextMenu = ({
  menuItems,
}: {
  menuItems: Array<ReturnType<(typeof Menu)['Item']>>;
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>(null);

  return (
    <>
      <Button
        ref={setAnchorEl}
        variant="ghost_icon"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon data={more_vertical} />
      </Button>
      <Menu
        className="job__context-menu"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        anchorEl={anchorEl}
        placement="right-start"
      >
        {menuItems?.map((item, i) => <Fragment key={i}>{item}</Fragment>)}
      </Menu>
    </>
  );
};
