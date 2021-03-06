import React from "react";
import { Link } from "react-router-dom";
import { Appbar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import "./specificStyles.css";

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    background: 'linear-gradient(45deg, #464E55 30%, #BEBFC0 90%)',
    width: "100vw",
    borderRadius: 5,
    boxShadow: '0 3px 5px 2px #C2C5C7'
  },
});

const NavBar = ({ setToken, userData, setUserData }) => {

  const logOut = () => {
    localStorage.clear();
    setUserData({});
    setToken("");
  };

  const classes = useStyles();
  return (
    <div>
      <Toolbar className={classes.toolbar}>
        <div>
          <Link className="siteName" to="/">
            Buy, Sell, Bye
          </Link>
        </div>

        <div>
          {userData._id ? (
            <span>
              <Link className="createPost" to="/posts/createpost">
                Create a post
              </Link>
            </span>
          ) : (
            <> </>
          )}
        </div>

        <div>
          {userData._id ? (
            <span>
              <Link className="dashboard" to="/dashboard">
                Dashboard
              </Link>
            </span>
          ) : (
            <> </>
          )}
        </div>

        <div>
          {userData._id ? (
            <Link className="logOut" to="/" onClick={() => logOut()}>
              Logout
            </Link>
          ) : (
            <Link className="loginRegister" to={"/login"}>
              Login / Register
            </Link>
          )}
        </div>

      </Toolbar>
    </div>
  );
};
export default NavBar;