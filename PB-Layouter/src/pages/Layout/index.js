import React from "react";
import ComponentPanel from "./ComponentPanel";
import LayoutPanel from "./LayoutPanel";
import SettingPanel from "./SettingPanel";
import styles from './index.less';

const Layout = () => {


  return (
    <div className={styles.layout}>
      <ComponentPanel />
      <LayoutPanel />
      <SettingPanel />
    </div>
  );
}

export default Layout
