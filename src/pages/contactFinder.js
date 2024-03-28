import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import styles from "./contactFinder.css";

const ContactFinder = () => {
  return (
    <div className={styles.contactFinder}>
      <img
        className={styles.emileSeguinR9ouekotgguUnsplIcon}
        alt=""
        src="/emileseguinr9ouekotgguunsplash-1@2x.png"
      />
      <img
        className={styles.contactFinderChild}
        alt=""
        src="/rectangle-61.svg"
      />
      <div className={styles.version10GroupContainer}>
        <p className={styles.version10}>Version 1.0 Group Varghes</p>
      </div>
      <img className={styles.contactFinderItem} alt="" src="/line-9.svg" />
      <img className={styles.contactFinderInner} alt="" src="/line-9.svg" />
      <img className={styles.lineIcon} alt="" src="/line-9.svg" />
      <img className={styles.contactFinderChild1} alt="" src="/line-9.svg" />
      <div className={styles.rectangleDiv} />
      <img className={styles.contactFinderChild2} alt="" src="/line-9.svg" />
      <div className={styles.rectangleDiv} />
      <div className={styles.rectangleDiv} />
      <img className={styles.sidebarIcon} alt="" src="/sidebar.svg" />
      <Form className={styles.wrapper}>
        <Form.Control type="text" name="message" />
      </Form>
      <div className={styles.sendMessageWrapper}>
        <b className={styles.sendMessage}>Send Message</b>
      </div>
      <Form className={styles.frameFirstname}>
        <Form.Control type="text" name="FirstName" placeholder="First" />
      </Form>
      <Form className={styles.frame2ndname}>
        <Form.Control type="text" name="Lastname" placeholder="Last" />
      </Form>
      <Form className={styles.emailtextbox}>
        <Form.Control type="text" name="email" />
      </Form>
      <Form className={styles.phonecontact}>
        <Form.Control type="text" name="phone/contact" />
      </Form>
      <b className={styles.contactFinder1}>Contact Finder</b>
      <div className={styles.name}>
        <span>{`Name `}</span>
        <span className={styles.span}>*</span>
      </div>
      <div className={styles.phonecontact1}>
        <span>{`Phone/Contact `}</span>
        <span className={styles.span}>*</span>
      </div>
      <div className={styles.message}>
        <span>{`Message `}</span>
        <span className={styles.span}>*</span>
      </div>
      <div className={styles.email}>
        <span>{`Email `}</span>
        <span className={styles.span}>*</span>
      </div>
    </div>
  );
};

export default ContactFinder;