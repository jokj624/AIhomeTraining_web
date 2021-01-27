import React from 'react';

const PostListPage = ( { history } ) => {
    return (
        <div className="App">
          <div className ="main_div">
            <div className="main">
              HomeTraining
            </div>
            <div className = "bnt_div">
              <button className = "button" onClick ={ () =>
                {history.push("/login")}}>SignIn</button>
              <button className = "button" onClick ={ () =>
                {history.push("/register")}}>SignUp</button>
            </div>
          </div>
      </div> 
    )
};

export default PostListPage;