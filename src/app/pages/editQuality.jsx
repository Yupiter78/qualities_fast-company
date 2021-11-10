import React, { useEffect, useState } from "react";
import EditForm from "../components/ui/editForm";
import { useParams } from "react-router-dom";
import axios from "axios";

axios.interceptors.response.use(
    (response) => response,
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedErrors) {
            console.log("Unexpected Error");
        }
        return Promise.reject(error);
    }
);

const EditQualityPage = () => {
    const [quality, setQuality] = useState(null);
    const id = useParams().id;
    const qualityEndPoint = `http://localhost:4000/api/v1/quality/${id}`;

    const handleSubmit = async (data) => {
        try {
            await axios
                .put(qualityEndPoint, data)
                .then((response) => console.log(response.data.content));
        } catch (error) {
            console.log("Expected Error");
        }
    };
    useEffect(async () => {
        const { data } = await axios.get(qualityEndPoint);
        setQuality(data.content);
    }, []);
    return (
        <>
            <h1>Edit Quality Page</h1>{" "}
            {quality ? (
                <EditForm data={quality} onSubmit={handleSubmit} />
            ) : (
                <p>loading...</p>
            )}
        </>
    );
};

export default EditQualityPage;
