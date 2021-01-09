import React from 'react';

import {BrowserRouter, Route, Link} from 'react-router-dom';

const PageOne =()=>{
    return <div>Page One <div><Link to="/pagetwo"> get me page two</Link></div></div>
}


const PageTwo =()=>{
    return <div>Page Two <div><div>
            <Link to="/">Take me to page one!</Link>
        </div><button onClick={()=>alert('Fuck Off!')}>CLick Me</button></div></div>
}
const App =()=>{

    return (<div>

        <BrowserRouter>
        <div>

            <Route path="/" exact component={PageOne} />
            <Route path="/pagetwo"  component={PageTwo} />
                </div>
        </BrowserRouter>
    </div>)
}

export default App;