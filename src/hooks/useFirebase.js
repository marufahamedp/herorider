import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile, getIdToken, signOut } from "firebase/auth";
import initializeFirebase from '../Firebase/firebase.init';


// initialize firebase app
initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState('');

    const auth = getAuth();

    const registerUsera = (email, password, name, licenceimage, nidfrontimage, nidbackimage, profileimage, age, address, number, area, carname, carmodel, carpalate, vehicle, rider, navigate) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');
                const newUser = { email, displayName: name, licenceimage, nidfrontimage, nidbackimage, profileimage, age, address, number, area, carname, carmodel, carpalate, vehicle, rider };
                setUser(newUser);
                // save user to the database
                saveUser(email, name, licenceimage, nidfrontimage, nidbackimage, profileimage, age, address, number, area, carname, carmodel, carpalate, vehicle, rider, 'POST');
                // send name to firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                });
                navigate('/profile');
            })
            .catch((error) => {
                setAuthError(error.message);
                console.log(error);
            })
            .finally(() => setIsLoading(false));
    }


    
    const registerUserb = (email, password, name, licenceimage, nidfrontimage, nidbackimage, profileimage, age, address, number, area, carname, carmodel, carpalate, vehicle, rider, navigate) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');
                const newUser = { email, displayName: name, licenceimage, nidfrontimage, nidbackimage, profileimage, age, address, number, area, carname, carmodel, carpalate, vehicle, rider };
                setUser(newUser);
                // save user to the database
                saveUser(email, name, licenceimage, nidfrontimage, nidbackimage, profileimage, age, address, number, area, carname, carmodel, carpalate, vehicle, rider, 'POST');
                // send name to firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                });
                navigate('/');
            })
            .catch((error) => {
                setAuthError(error.message);
                console.log(error);
            })
            .finally(() => setIsLoading(false));
    }



    const loginUser = (email, password, location, handleClose, navigate) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                navigate(destination);
                setAuthError('');
                handleClose();
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }



    // observer user state
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                getIdToken(user)
                    .then(idToken => {
                        setToken(idToken);
                    })
            } else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [auth])

    useEffect(() => {
        fetch(`https://aqueous-sea-83761.herokuapp.com/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
    }, [user.email])

    const logout = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
            window.location('/')
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoading(false));
    }

    const saveUser = (email, displayName, licenceimage, nidfrontimage, nidbackimage, profileimage, age, address, number, area, carname, carmodel, carpalate, vehicle, rider, method) => {
        const formData = new FormData();
        formData.append('name', displayName);
        formData.append('email', email);
        formData.append('licenceimage', licenceimage);
        formData.append('age', age);
        formData.append('address', address);
        formData.append('number', number);
        formData.append('nidfrontimage', nidfrontimage);
        formData.append('nidbackimage', nidbackimage);
        formData.append('profileimage', profileimage);
        formData.append('area', area);
        formData.append('carname', carname);
        formData.append('carmodel', carmodel);
        formData.append('carpalate', carpalate);
        formData.append('vehicle', vehicle);
        formData.append('usertype', rider);
       
        fetch('https://aqueous-sea-83761.herokuapp.com/users', {
            method: method,
            body: formData
        })
    }

    return {
        user,
        admin,
        token,
        isLoading,
        authError,
        registerUsera,
        registerUserb,
        loginUser,
        logout,
    }
}

export default useFirebase;