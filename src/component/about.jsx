import React, { useState, useEffect } from 'react'
import axios from 'axios';
function About() {
    const [date, setdate] = useState('');

    const [chartData, setChartData] = useState([]);
    const token = localStorage.getItem('token');
    const headers = {
        headers: { "authorization": `${token}` }
    }

    const chart = () => {
        axios
            .get('http://localhost:3001/user/graph', headers)
            .then(response => setChartData(response.data))


            .catch(err => {
                console.log('error in graph:', err)
            })
    }

    useEffect(() => {
        chart();
    }, []);
    const month = [];
    if (chartData) {
        for (let obj of chartData) {
            const date = new Date(obj.date)
            month.push(date.getMonth());
        }
    }

    const handledate = (event) => {
        event.preventDefault();
        const d = new Date(date);

        const da = d.getMonth();
        const year = d.getFullYear();
        const finddata = month.find(data => data == da)
        if (year == 2023) {
            if (!finddata) {
                console.log("proceed");
            } else {
                console.log("date already exists")
            }
        } else {
            console.log('this ledger only for 2023 year ')
        }
    }
    return (
        <div>
            <form onSubmit={handledate}>
                <input type='date' value={date} onChange={(e) => setdate(e.target.value)} />
                <button type='submit'> ok</button>
            </form>
        </div>
    )
}

export default About;