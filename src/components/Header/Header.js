import React from "react"

import styles from "./Header.module.css"

const Header = () => {
  return (
    <header className={styles.header}>
      <h2 className={styles.pointer} style={{color: 'white'}}>
        SenFinança
      </h2>

      <div className={styles.headerUser}>
        <span>Daniel Franchi</span>
        <p>DF</p>
      </div>
    </header>
  );
};

export default Header;