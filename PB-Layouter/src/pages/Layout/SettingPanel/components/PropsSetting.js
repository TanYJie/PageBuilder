import React, {useState} from "react";
import { Card, Input } from 'antd';
import styles from './index.less';

const PropsSetting = ({pageItem}) => {

  const [propList, setPropList] = useState([])

  const handleAddProp = () => {
    setPropList(propList => [...propList, {key: '', value: ''}])
  }

  const handleDeleteProp = (index) => {
    const newPropsList = propList.slice()
    newPropsList.splice(index, 1)
    setPropList(newPropsList)
  }

  return (
    <div className={styles.form}>
      {
        propList.map((prop, index) => (
          <Card
            key={index}
            size="small" type="inner" title={prop.key}
            extra={
              <a style={{color: '#1890ff'}} onClick={() => handleDeleteProp(index)}>Delete 删除</a>
            }
            className={styles.formCard}
          >
            <div className={styles.formItem}>
              <div className={styles.formItemLabel}>Key 键名：</div>
              <Input size="small" className={styles.formItemInput} value={prop.key}/>
            </div>
            <div className={styles.formItem}>
              <div className={styles.formItemLabel}>Value 值：</div>
              <Input size="small" className={styles.formItemInput} value={prop.value}/>
            </div>
          </Card>
        ))
      }
      <div className={styles.formAdd}>
        <a onClick={handleAddProp}>+ Add New Prop 新增属性</a>
      </div>

    </div>
  );
}

export default PropsSetting
