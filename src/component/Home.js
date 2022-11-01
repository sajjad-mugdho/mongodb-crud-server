import React from 'react';
import { useState } from 'react';
import { useLoaderData, } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData();
    const [displayUsers, setDisplayUsers] = useState(users);

    const handleDelete = user => {
        const agree = window.confirm(`Are you sure you want to delete ${user.name}`)

        if (agree) {
            fetch(`http://localhost:5000/users/${user._id}`, {
                method: 'DELETE'
            }).then(res => res.json()).then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    alert('User Deleted SuccessFully');
                    const remainingUsers = displayUsers.filter(usr => usr._id !== user._id)
                    setDisplayUsers(remainingUsers)
                }
            })
            console.log("Delete user with", user);
        }
    };


    return (
        <div>
            <h1>User: {displayUsers.length}</h1>

            {
                displayUsers.map(user =>
                    <p
                        key={user._id}>
                        Name: {user.name} Email: {user.email}
                        <button onClick={() => handleDelete(user)}>X
                        </button>
                    </p>)
            }
        </div>
    );
};

export default Home;