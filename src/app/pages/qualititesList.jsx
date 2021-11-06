import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import QualitiesTable from "../components/ui/qualitiesTable";
import axios from "axios";

const QualitiesListPage = () => {
    const [qualities, setQualities] = useState([]);
    const history = useHistory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        // const promise = axios
        //     .get("http://localhost:4000/api/v1/quality")
        //     .then((response) => {
        //         setQualities(response.data.content);
        //     })

        const {data} = await axios
            .get("http://localhost:4000/api/v1/quality");

        setQualities(data.content);

    }, [])
    const handleEdit = (param) => {
        console.log(param);
        history.push(`/edit/${param}`);
    };
    const handleDelete = (param) => {
        console.log(param);
    };
    return (
        <>
            <h1>Qualities List Page</h1>
            <QualitiesTable
                onDelete={handleDelete}
                onEdit={handleEdit}
                data={qualities}
            />
        </>
    );
};

export default QualitiesListPage;
