import React, {useEffect} from "react";
import {Form, Input, Select} from 'antd';
import EventEmitter from "@/utils/eventEmitter";
import styles from './index.less';

const FormItem = Form.Item
const Option = Select.Option

const numberTransform = value => parseInt(value)

const StyleSetting = ({form, pageItem}) => {

  useEffect(() => {
    form.resetFields()
  },[pageItem])

  const unitSelect = (
    <Select className={styles.settingUnit}>
      <Option value="px">px</Option>
      <Option value="rpx">rpx</Option>
    </Select>
  )

  return (
    <div>
      <FormItem label="label 名称">
        {
          form.getFieldDecorator('label',{
            initialValue: pageItem.label,
          })(
            <Input />
          )
        }
      </FormItem>

      <FormItem label="width 宽度">
        {
          form.getFieldDecorator('width',{
            initialValue: pageItem.width,
            rules: [{ transform: numberTransform, type: 'number' }]
          })(
            <Input addonAfter={
              form.getFieldDecorator('widthUnit',{
                initialValue: pageItem.widthUnit
              })( unitSelect )
            }/>
          )
        }
      </FormItem>

      <FormItem label="height 高度">
        {
          form.getFieldDecorator('height',{
            initialValue: pageItem.height,
            rules: [{ transform: numberTransform, type: 'number' }]
          })(
            <Input addonAfter={
              form.getFieldDecorator('heightUnit',{
                initialValue: pageItem.heightUnit
              })( unitSelect )
            }/>
          )
        }
      </FormItem>

      <FormItem label="X Point 横坐标">
        {
          form.getFieldDecorator('startX',{
            initialValue: pageItem.startX
          })(
            <Input disabled={true}/>
          )
        }
      </FormItem>

      <FormItem label="Y Point 纵坐标">
        {
          form.getFieldDecorator('startY',{
            initialValue: pageItem.startY + pageItem.offsetY
          })(
            <Input disabled={true}/>
          )
        }
      </FormItem>

      <FormItem label="Z Weight 层叠优先级">
        {
          form.getFieldDecorator('zIndex',{
            initialValue: pageItem.zIndex
          })(
            <Input />
          )
        }
      </FormItem>

    </div>
  );
}

export default Form.create({
  onValuesChange: (props, changedValues, allValues) => {
    const { pageItem } = props
    let { width, height, zIndex } = allValues
    width = numberTransform(width)
    height = numberTransform(height)
    zIndex = numberTransform(zIndex)
    if(isNaN(width) || isNaN(height) || isNaN(zIndex)) {
      return
    }
    EventEmitter.emit('setting.setItemStyle', {...pageItem, ...allValues})
  }
})(StyleSetting)
