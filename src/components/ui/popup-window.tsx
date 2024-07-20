import React, { FC } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { string } from "prop-types";

interface projectCardProp  {
  name: string;
}
const PopupWindow: FC<projectCardProp> = ( {name}) => (
  <Popup trigger={<button>Trigger</button>} position="right center">
    <div>{name}</div>
  </Popup>
);

export default PopupWindow;

