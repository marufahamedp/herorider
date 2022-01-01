import * as React from 'react';
import Navbar from '../../Shared/Header/Navbar/Navbar';
import CoursesDetails from '../CoursesDetails/CoursesDetails/CoursesDetails';
function Home() {
    return (
        <div>
            <Navbar></Navbar>
            <CoursesDetails></CoursesDetails>
        </div>
    )
}

export default Home;