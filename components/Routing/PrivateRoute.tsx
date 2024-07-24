// components/Routing/PrivateRoute.tsx
import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from "../../app/contexts/authContext";

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Replace with a proper loading indicator
    }

    return (
        <Route
            {...rest}
            render={(props) =>
                user ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
