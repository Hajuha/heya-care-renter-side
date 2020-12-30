import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => {
    const user = useSelector((state) => state.user);
    return (
        <Route
            {...rest}
            render={(props) =>
                !user.access_token ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/' />
                )
            }
        />
    );
};

UserRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token,
    };
}

export default connect(mapStateToProps)(UserRoute);
