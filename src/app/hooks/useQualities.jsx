import React, { useContext, useEffect, useRef, useState } from "react";
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
    const prevState = useRef([]);
    useEffect(() => {
        const getQualities = async () => {
            try {
                const { content } = await qualityService.fetchAll();
                setQualities(content);
                setLoading(false);
            } catch (error) {
                const { message } = error.response.data;
                setError(message);
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
            const { message } = error.response.data;
            setError(message);
        }
    };

    const addQuality = async (data) => {
        try {
            const { content } = await qualityService.create(data);
            setQualities((prevState) => [...prevState, content]);
            return content;
        } catch (error) {
            const { message } = error.response.data;
            setError(message);
        }
    };

    const deleteQuality = async (id) => {
        prevState.current = qualities;
        setQualities((prevState) => {
            return prevState.filter((item) => item._id !== id);
        });
        try {
            await qualityService.delete(id);
        } catch (error) {
            const { message } = await error.response.data;
            toast.info("Object not delete");
            console.log("message:", message);
            setError(message);
            setQualities(prevState.current);
        }
    };

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
