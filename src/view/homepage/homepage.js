import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../../App.css';
import axiosFetch, { SERVER } from '../../base_url';

export default function HomePage() {

    return (
        <div className="main">
            <div className="content">
                homepage
            </div>
        </div >
    );
}
