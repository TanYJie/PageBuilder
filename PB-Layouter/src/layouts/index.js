import { BgColorsOutlined } from '@ant-design/icons';
import styles from './index.less';

function BasicLayout(props) {
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Page Builder</h1>
        <BgColorsOutlined style={{fontSize: 25, color: 'white', marginLeft: 10}}/>
      </div>
      {props.children}
    </div>
  );
}

export default BasicLayout;
