import { ReactNode, useState } from 'react';
import classnames from 'classnames';
import styles from './Accordion.module.scss';

interface AccordionProps {
  title: string;
  content: ReactNode;
  icon?: ReactNode;
}

const Accordion = ({ title, icon, content }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const symbolClassNames = classnames(styles.symbol, {
    [styles.open]: isOpen,
  });

  const titleClassNames = classnames(styles.title, {
    [styles.active]: isOpen,
  });

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.item}>
          <div className={titleClassNames} onClick={toggleOpen}>
            <div>{title}</div>
            <div className={symbolClassNames}></div>
          </div>
        </div>
      </div>
      {isOpen && <div className={styles.content}>{content}</div>}
    </div>
  );
};

export default Accordion;
