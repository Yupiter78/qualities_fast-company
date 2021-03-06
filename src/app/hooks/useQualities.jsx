import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";

const QualitiesContext = React.createContext(undefined, undefined);
export const useQualities = () => {
    return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const getQualities = async () => {
            try {
                const { content } = await qualityService.fetchAll();
                setQualities(content);
                setLoading(false);
            } catch (error) {
                errorCatcher(error);
            }
        };
        getQualities();
    }, []);
    const getQuality = (id) => {
        return qualities.find((quality) => quality._id === id);
    };
    const updateQuality = async ({ _id: id, ...data }) => {
        try {
            const { content } = await qualityService.update(id, data);
            setQualities((prevState) =>
                prevState.map((item) => {
                    if (item._id === content._id) return content;
                    return item;
                })
            );
            return content;
        } catch (error) {
            errorCatcher(error);
        }
    };

    const addQuality = async (data) => {
        try {
            const { content } = await qualityService.create(data);
            setQualities((prevState) => [...prevState, content]);
            return content;
        } catch (error) {
            errorCatcher(error);
        }
    };

    const deleteQuality = async (id) => {
        try {
            const { content } = await qualityService.delete(id);
            setQualities((prevState) => {
                return prevState.filter((item) => item._id !== content._id);
            });
        } catch (error) {
            errorCatcher(error);
        }
    };

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    return (
        <QualitiesContext.Provider
            value={{
                qualities,
                getQuality,
                updateQuality,
                addQuality,
                deleteQuality
            }}
        >
            {!isLoading ? children : <h1>Qualities loading...</h1>}
        </QualitiesContext.Provider>
    );
};
QualitiesProvider.propTypes = {
    children: PropTypes.object
};
