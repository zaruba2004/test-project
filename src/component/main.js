import React, { useEffect, useState } from 'react';
import styles from './main.module.scss';

export default function Main() {
    const [data, setData] = useState([])
    console.log(data);

    useEffect(() => {
        async function fetchData() {
          let response = await fetch('https://unique-yew-307513-default-rtdb.europe-west1.firebasedatabase.app/delivery.json');
          response = await response.json()
          setData(response);
        }
        fetchData();
      }, []);

      function sortDistance() {
          setData(data.sort((prev, next) => prev.distance - next.distance))
      }

    return (
        <div className={styles.mainFeald}>
            <ul className={styles.tableHeader}>
                <li>Date</li>
                <li>Name</li>
                <li>Quantity</li>
                <li>Distance
                    <ul>
                        <li onClick={()=>sortDistance()}>по возрастанию</li>
                        <li>по убыванию</li>
                    </ul>
                </li>
            </ul>
            {data.map((item, index)=>{
                return <div key={index} className={styles.itemsStyle}>
                        <p>{item.data}</p>
                        <p>{item.name}</p>
                        <p>{item.people}</p>
                        <p>{item.distance}</p>
                    </div>
                }) 
            }
        </div>
    )
}