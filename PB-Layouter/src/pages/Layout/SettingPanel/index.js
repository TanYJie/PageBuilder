import React, {  useState, useEffect } from "react";
import { Tabs } from "antd";
import { InfoCircleFilled } from '@ant-design/icons';
import StyleSetting from "./components/StyleSetting";
import PropsSetting from "./components/PropsSetting";
import EventEmitter from '@/utils/eventEmitter';
import styles from './index.less';

const { TabPane } = Tabs;

const SettingPanel = () => {

  const [editItem, setEditItem] = useState({})

  useEffect(() => {
    EventEmitter.on('layout.clickPageItem', handleClickPageItem)

    return () => {
      EventEmitter.off('layout.clickPageItem')
    }
  },[])

  const handleClickPageItem = (pageItem) => {
    setEditItem(pageItem)
  }

  return (
    <div className={styles.settingPanel}>
      {
        editItem && editItem.name ? (
          <Tabs
            defaultActiveKey="2"
            tabBarStyle={{
              width: '280px',
              margin: '0px 10px'
            }}
          >
            <TabPane tab="Style 样式" key="1" className={styles.settingTab}>
              <StyleSetting pageItem={editItem}/>
            </TabPane>
            <TabPane tab="Props 属性" key="2" className={styles.settingTab}>
              <PropsSetting pageItem={editItem}/>
            </TabPane>
          </Tabs>
        ) : (
          <div className={styles.settingEmpty}>
            <InfoCircleFilled style={{fontSize: 30, marginBottom: 10}}/>
            <div>Please select a component on the page</div>
            <div>请选择页面中的一个组件</div>
          </div>
        )
      }
    </div>
  );
}

export default SettingPanel
