import React from 'react';
//interface ButtonProps {play: React.MouseEventHandler<HTMLButtonElement>}
interface RefreshButtonProps {
    onClickH: () => void
}
function RefreshContactsButton(setter: RefreshButtonProps) {
    return (
        <button onClick={setter.onClickH}>Refresh contacts</button>
  );
}

export default RefreshContactsButton;