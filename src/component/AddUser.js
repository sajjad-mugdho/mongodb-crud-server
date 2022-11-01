import React from 'react';
import { useState } from 'react';

const AddUser = () => {

    const [user, setUser] = useState({});

    const handleInput = (e) => {
        const value = e.target.value;
        const field = e.target.name

        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser);
        console.log(newUser);
    }

    const handleAddUser = e => {

        e.preventDefault();
        // const form = e.target;
        // const name = form.name.value;
        // const email = form.email.value;
        console.log(user);

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)

        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledge) {
                    alert('User added successfully')
                    e.target.reset();
                }
            })
    }


    return (
        <div>
            <h1>add users</h1>
            <form onSubmit={handleAddUser}>
                <input onBlur={handleInput} type="text" name="name" id="" placeholder='Name' required /><br />
                <input onBlur={handleInput} type="text" name="address" id="" placeholder='Address' /><br />
                <input onBlur={handleInput} type="email" name="email" id="" placeholder='Email' required /><br />

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default AddUser;