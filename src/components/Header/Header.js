import React, { useState } from "react"
//import { Redirect } from "react-router-dom";

import styles from "./Header.module.css"

const Header = () => {
  //const [menuHome, setMenuHome] = useState(false);

  const header = () => {
    //setMenuHome(true);
  };

  return (
    <header className={styles.header}>
      <h2 onClick={header} className={styles.pointer} style={{color: 'white'}}>
        SenFiança
      </h2>

      <div className={styles.headerUser}>
        <span>Daniel Franchi</span>
        <p>DF</p>
      </div>

      {/* {menuHome !== false && <Redirect to="/" />} */}
    </header>
  );
};

export default Header;