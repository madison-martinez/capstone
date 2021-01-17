import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function useUser() {
    const router = useRouter();
    const [ currentUser, setCurrentUser ] = useState(null);

    useEffect(() => {
        
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        setCurrentUser(user);
        
        if (!user) {
            router.push('/login')
        }
            
    }, [])

    return currentUser;
};

export { useUser };