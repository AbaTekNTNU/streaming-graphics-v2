import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setByValue } from "../../reducers/urlSlice";
import { RootState } from "../../store";
import styles from "./Landing.module.css";

const Landing = () => {
    const url = useSelector((state: RootState) => state.url);
    const dispatch = useDispatch();

    const [urlOverride, setUrlOverride] = useState(url.value);

    const endpoints = ["/basket"];

    useEffect(() => {
        console.log(url);
    }, [url]);

    const onSubmit = () => {
        //console.log("onSubmit called");
        dispatch(setByValue(urlOverride));
    };

    return (
        <div>
            <form className={styles.urlWrapper}>
                <label>
                    <div>Enter your override URL:</div>
                    <input
                        type="text"
                        value={urlOverride}
                        onChange={(e) => setUrlOverride(e.target.value)}
                    />
                </label>
            </form>
            <button type="button" onClick={onSubmit}>
                Submit
            </button>
            {/*<div style={{ color: 'white' }}>
                <strong>urlSlice value: </strong>{url.value}
            </div>*/}
            <div className={styles.endpointsWrapper}>
                endpoints
                <div className={styles.endpoints}></div>
                {/* TODO: Ensure endpoint keeps state of override-url */}
                {endpoints.map((endpoint) => (
                    <Link
                        className={styles.endpoint}
                        to={endpoint}
                        key={endpoint}
                    >
                        <button>{endpoint}</button>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Landing;
