import React, { useContext } from "react";
import PropTypes from "prop-types";

const QualitiesContext = React.createContext(undefined, undefined);
export const useQualities = () => {
    return useContext(QualitiesContext);
};
const qualities = [{ _id: 123132, name: "nameProps" }];
export const QualitiesProvider = ({ children }) => {
    return (
        <QualitiesContext.Provider value={qualities}>
            {children}
        </QualitiesContext.Provider>
    );
};
QualitiesProvider.propTypes = {
    children: PropTypes.object
};
