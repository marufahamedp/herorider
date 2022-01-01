import { useState, useEffect } from 'react';

function useAllUsers() {
    const [users, setUsers] = useState([]);
    const [spinner, setSpinner] = useState(true);
    useEffect(() => {
        fetch('https://aqueous-sea-83761.herokuapp.com/users')
            .then(res => res.json())
            .then(data => setUsers(data))
            .finally(() => setSpinner(false));
    }, [users])
    return {
        users,
        spinner
    }
}

export default useAllUsers;
