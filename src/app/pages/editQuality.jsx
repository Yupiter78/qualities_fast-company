import React, { useEffect, useState } from "react";
import EditForm from "../components/ui/editForm";
import { useParams } from "react-router-dom";
import httpService from "../services/http.service";

const EditQualityPage = () => {
    const [quality, setQuality] = useState(null);
    const id = useParams().id;
    const qualityEndPoint = `quality/${id}`;

    const handleSubmit = async (data) => {
        try {
            await httpService
                .put(qualityEndPoint, data)
                .then((response) => console.log(response.data.content));
        } catch (error) {
            console.log("Expected Error");
        }
    };
    useEffect(async () => {
        const { data } = await httpService.get(qualityEndPoint);
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
