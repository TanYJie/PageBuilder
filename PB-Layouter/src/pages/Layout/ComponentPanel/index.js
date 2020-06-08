import React from "react";
import {components} from "./components";
import {Tooltip} from "antd";
import EventEmitter from '@/utils/eventEmitter'
import styles from './index.less';

const ComponentPanel = () => {

  const handleAddPageItem = (component) => {
    EventEmitter.emit('layout.addPageItem', component)
  }

  return (
    <div className={styles.componentPanel}>
      {
        components.map(component => (
          <Tooltip key={component.name}>
            <div className={styles.componentCard} onClick={() => handleAddPageItem(component)}>
              {component.labelI18n}&nbsp;{component.label}
            </div>
          </Tooltip>
        ))
      }

    </div>
  );
}

export default ComponentPanel
