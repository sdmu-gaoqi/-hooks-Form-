import React, { useState, useEffect, useCallback } from 'react'

const set = new Set()
function Demo(props) {
    const [count, setCount] = useState(1);
    const [val, setVal] = useState('');
 
    const callback = useCallback(() => {
        console.log(val)
    }, [val]);
    
    const handeleClick = () => {
        callback()
    }
    return (
        <>
        <p>{val}</p>
            <div>
                <input value={val} onChange={event => setVal(event.target.value)} />
                <button onClick={handeleClick}>按钮</button>
            </div>

        </>
    )
}

export default Demo