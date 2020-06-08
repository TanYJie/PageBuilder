import React, {useEffect, useRef, useState} from "react";
import Draggable from "react-draggable";
import SupportLine from "./components/SupportLine";
import ItemComponent from "./components/ItemComponent";
import EventEmitter from '@/utils/eventEmitter';
import { Button, Card } from "antd";
import { CloseOutlined } from '@ant-design/icons';
import styles from './index.less';

let id = 0
const getId = () => id++

const RPX_MAX = 750

let settingItem = {}

const LayoutPanel = () => {
  const [pageItems, setPageItems] = useState([])
  const [draggingItem, setDraggingItem] = useState({})
  const [draggingPosition, setDraggingPosition] = useState(null)
  const pageRef = useRef(null)

  useEffect(() => {
    EventEmitter.on('layout.addPageItem', handleAddPageItem)
    EventEmitter.on('setting.setItemStyle', handleSetItemStyle)

    return () => {
      EventEmitter.off('layout.addPageItem')
      EventEmitter.off('setting.setItemStyle')
    }
  },[])

  const isDragging = draggingPosition && draggingItem.name
  const isSettingItem = pageItem => pageItem.id === settingItem.id
  const isDraggingItem = pageItem => pageItem.id === draggingItem.id

  const formatRpx = pageItem => {
    let { width, height, widthUnit, heightUnit } = pageItem

    // rpx 单位转换
    if(widthUnit === 'rpx') {
      width = (width / RPX_MAX) * pageRef.current.clientWidth
    }
    if(heightUnit === 'rpx') {
      height = (height / RPX_MAX) * pageRef.current.clientWidth
    }
    return {
      ...pageItem,
      showWidth: width,
      showHeight: height,
    }
  }

  const handleAddPageItem = (component) => {
    setPageItems(pageItems => {
      const offsetY = pageItems.reduce((res, pageItem) => (
        res + pageItem.height
      ),0)

      const patchedPageItem = {
        ...component,
        id: getId(),
        startX: 0,
        startY: 0,
        zIndex: 0,
        offsetY: offsetY,
      }
      return [...pageItems, formatRpx(patchedPageItem)]
    })
  }

  const handleSetItemStyle = (newItem) => {
    setPageItems(pageItems => pageItems.map(pageItem => (
      isSettingItem(pageItem) ? formatRpx({...pageItem, ...newItem}) : pageItem
    )))
  }

  const handleDrag = (e, ui, draggingItem) => {
    setDraggingPosition(ui)
  }

  const handleStartDrag = (pageItem) => {
    EventEmitter.emit('layout.clickPageItem', pageItem)
    settingItem = pageItem
    setDraggingItem(pageItem)
    setDraggingPosition(null)
  }

  const handleStopDrag = (e, ui, draggingItem) => {
    EventEmitter.emit('layout.clickPageItem', {...draggingItem, startX: ui.x, startY: ui.y})
    setPageItems(pageItems => pageItems.map(pageItem => (
      isDraggingItem(pageItem) ? {...pageItem, startX: ui.x, startY: ui.y} : pageItem
    )))
    setDraggingItem({})
  }

  return (
    <div className={styles.layoutPanel}>
      <div className={styles.page} ref={pageRef}>
        {
          pageItems.map(pageItem => (
            <Draggable
              key={pageItem.id}
              bounds="parent"
              onStart={() => handleStartDrag(pageItem)}
              onStop={(e, ui) => handleStopDrag(e, ui, pageItem)}
              onDrag={(e, ui) => handleDrag(e, ui, pageItem)}
              defaultPosition={{ x: pageItem.startX, y: pageItem.startY - pageItem.offsetY }}
            >
              <div
                style={{
                  position: 'relative',
                  width: pageItem.showWidth,
                  height: pageItem.showHeight,
                  zIndex: pageItem.zIndex
                }}
              >
                <ItemComponent pageItem={pageItem} />
                <div
                  className={styles.pageItemMask}
                  style={{
                    border: isSettingItem(pageItem) ? '1px solid #1890ff' : (isDragging ? '1px solid #f0f0f0' : '')
                  }}
                >
                </div>
              </div>
            </Draggable>
          ))
        }
        {
          isDragging && (
            <SupportLine
              startX={draggingPosition.x}
              endX={draggingPosition.x + draggingItem.showWidth}
              startY={draggingPosition.y + draggingItem.offsetY}
              endY={draggingPosition.y + draggingItem.offsetY + draggingItem.showHeight}
            />
          )
        }
      </div>
    </div>
  )
}

export default LayoutPanel
