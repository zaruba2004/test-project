import React, { useState } from 'react';
import styles from './modal.module.scss';

const Modal = (props) => {
    const [state, setState] = useState ({
            id : props.newData.length +1,
            name: '',
            data: '',
            people: '',
            distance: ''

    })
    
    const sendData = async (url, data) => {
        const response = await fetch(url, {
            method: 'POST',
            body: data
        });
        if(!response.ok) {
            throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`)
        }
        return await response.json();
    }

    function createRouteItem() {
        const data = JSON.stringify(state)
        sendData('https://unique-yew-307513-default-rtdb.europe-west1.firebasedatabase.app/delivery.json', data)
    }

    function change(e) {
        e.preventDefault();
        const {name, value} = e.target
        setState({...state, [name]: value})
    }

    return (
        <div className={styles.modal}>
            <div className={styles.createRouteFeald}>
            <span onClick={()=>{props.closeModal()}}>&#10006;</span>
                <h2>Create route</h2>
                <form>
                    <input name ='name' value={state.name} onChange={change} type='text' placeholder='Enter City (Minsk-Mir)'/>
                    <input name ='data' value={state.data} onChange={change} type='text' placeholder='Enter Date (25-04-21)'/>
                    <input name ='people' value={state.people} onChange={change} type='text' placeholder='Enter People'/>
                    <input name ='distance' value={state.distance} onChange={change} type='text' placeholder='Enter Distance'/>  
                    <button onClick={()=> createRouteItem()}>ADD ROUTE</button>                  
                </form>
                
            </div>
        </div>
        
    )
}

export default Modal;