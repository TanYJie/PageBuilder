import React from "react";
import {
  Button,
  Input,
  Select,
  Dropdown,
  PageHeader
} from "antd";

const ANT_COMPONENTS = {
  button: {
    component: Button,
    defaultProps: {},
    labelInChildren: true
  },
  input: {
    component: Input,
    defaultProps: {},
    labelInChildren: false
  },
  select: {
    component: Select,
    defaultProps: {},
    labelInChildren: false
  },
  dropdown: {
    component: Dropdown,
    defaultProps: {},
    labelInChildren: true
  },
  pageHeader: {
    component: PageHeader,
    defaultProps: {
      title: 'Title',
      subTitle: 'This is a subtitle'
    },
    labelInChildren: false
  }

}

const ItemComponent = ({pageItem}) => {

  const libComponent = ANT_COMPONENTS[pageItem.name]

  if(!libComponent || pageItem.source !== 'pageBuilder') {
    return pageItem.label
  }

  return (
    libComponent.labelInChildren ? (
      <libComponent.component
        style={{
          width: pageItem.showWidth,
          height: pageItem.showHeight,
        }}
        {...libComponent.defaultProps}
        {...pageItem.props}
      >
        {pageItem.label}
      </libComponent.component>
    ) : (
      <libComponent.component
        style={{
          width: pageItem.showWidth,
          height: pageItem.showHeight,
        }}
        {...libComponent.defaultProps}
        {...pageItem.props}
      />
    )
  );
}

export default ItemComponent
