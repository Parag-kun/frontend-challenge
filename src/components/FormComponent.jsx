import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Map from './Map'

function FormComponent() {
    const [postBody, setPostBody] = useState({})
    const [users, setUsers] = useState([])
    const [warning, setWarning] = useState('Please select a user')
    const [error, setError] = useState('')

    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then(users => setUsers(users.data))
            .catch(err => setError(err.message))
    }, [])

    const validate = async () => {
        if (!postBody.title) setError('Please enter the title')
        else if (!postBody.body) setError('Please enter the body')
        else {
            await axios
                .post('https://jsonplaceholder.typicode.com/posts', JSON.stringify(postBody), { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
                .then(() => {
                    setError('')
                    setPostBody({})
                })
                .catch(err => setError(err.message))
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        validate()
    }

    return (
        <div className='container'>
            {warning && <div className='warning'>{warning}</div>}
            {users.map(({ id, name, address }) => (
                <div className='card'>
                    <div className='card-body' onClick={() => { setPostBody({ ...postBody, userId: id }); setWarning('') }}>
                        <div className='name' key={id}>{name}</div>
                        <Map lat={address.geo.lat} lng={address.geo.lng}/>
                    </div>
                    {id === postBody.userId &&
                        <form className='form' onSubmit={handleSubmit}>
                            <input placeholder='Title' type="text" onChange={e => setPostBody({ ...postBody, title: e.target.value })} />
                            <input placeholder='Body' type="text" onChange={e => setPostBody({ ...postBody, body: e.target.value })} />
                            <button type='submit'>Submit</button>
                            {error && <div className='error'>{error}</div>}
                        </form>
                    }
                </div>
            ))}
        </div>
    )
}

export default FormComponent
