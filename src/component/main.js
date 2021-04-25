import React, { useEffect, useState } from 'react';
import styles from './main.module.scss';

 const Main = () => {
    const [data, setData] = useState([])
    const [newData, setNewData] = useState([])
    const [isLoading, setIsloading] = useState(true)
    console.log(data);
    async function fetchData() {
        try{
            let response = await fetch('https://unique-yew-307513-default-rtdb.europe-west1.firebasedatabase.app/delivery.json');
            response = await response.json()
            setData(response);
            setNewData(response)
            setIsloading(false)
        }catch(e){console.log(e)}        
      }

    useEffect(() => {
        fetchData();
    }, []);

    function sortDistanceUp() {
        console.log('up')
        setNewData(newData.sort((prev, next) => prev.distance - next.distance))
    }

    function sortDistanceDown() {
        console.log('down')
        setNewData(newData.sort((prev, next) => next.distance - prev.distance))
    }

    function removeCountry(e) {      
        let value = e.target.value;
        let newValue= value.toLowerCase();
        setNewData(data.filter(item => item.name.toLowerCase().includes(newValue)));
       };

    return (
        <div className={styles.mainFeald}>
            <ul className={styles.tableHeader}>
                <li onClick={()=>fetchData()}>Date</li>
                <li>Name
                    <input onChange={removeCountry} type='text' placeholder='Введите город'/>
                </li>
                <li>Quantity
                    <ul>
                        <li onClick={()=>sortDistanceUp()}>по возрастанию</li>
                        <li onClick={()=>sortDistanceDown()}>по убыванию</li>
                    </ul>
                </li>
                <li>Distance
                    <ul>
                        <li onClick={()=>sortDistanceUp()}>по возрастанию</li>
                        <li onClick={()=>sortDistanceDown()}>по убыванию</li>
                    </ul>
                </li>
            </ul>
            {isLoading
             ?<div className={styles.itemsStyle}><p>LOADING...</p></div>
             :<div className={styles.itemsFeald}>
                {newData.map((item, index)=>{
                    return <div key={index} className={styles.itemsStyle}>
                        <p>{item.data}</p>
                        <p>{item.name}</p>
                        <p>{item.people}</p>
                        <p>{item.distance}</p>
                    </div>
                }) 
            }
             </div>
            }

        </div>
    )
}

export default Main;