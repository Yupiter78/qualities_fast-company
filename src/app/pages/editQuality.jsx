import React, { useEffect, useState } from "react";
import EditForm from "../components/ui/editForm";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditQualityPage = () => {
    const [quality, setQuality] = useState(null);
    const id = useParams().id;
    const qualityEndPoint = `http://localhost:4000/api/v1/quality/${id}`;
    const handleSubmit = (data) => {
        axios
            .put(qualityEndPoint, data)
            .then((response) => console.log(response.data.content));
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
