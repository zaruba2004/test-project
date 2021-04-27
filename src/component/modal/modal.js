import React from 'react';
import styles from './modal.module.scss';

const Modal = (props) => {
    return (
        <div className={styles.modal}>
            <div className={styles.createRouteFeald}>
                <h2>Create route</h2>
                <button onClick={()=>{props.closeModal()}}>Close</button>
            </div>
        </div>
        
    )
}

export default Modal;