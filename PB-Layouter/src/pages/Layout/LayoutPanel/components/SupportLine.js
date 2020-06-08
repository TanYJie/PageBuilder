import React from "react";
import styles from './index.less';

const SupportLine = ({startX, startY, endX, endY}) => {

  return (
    <>
      <div
        className={styles.supportLine}
        style={{
          top: '-100%',
          left: '-100%',
          right: `calc(100% - ${startX}px)`,
          bottom: `calc(100% - ${startY}px)`,
        }}
      />
      <div
        className={styles.supportLine}
        style={{
          top: '-100%',
          left: `${endX}px`,
          right: '-100%',
          bottom: `calc(100% - ${startY}px)`,
        }}
      />
      <div
        className={styles.supportLine}
        style={{
          top: `${endY}px`,
          left: '-100%',
          right: `calc(100% - ${startX}px)`,
          bottom: '-100%',
        }}
      />
      <div
        className={styles.supportLine}
        style={{
          top: `${endY}px`,
          left: `${endX}px`,
          right: '-100%',
          bottom: '-100%',
        }}
      />
    </>
  );
}

export default SupportLine
