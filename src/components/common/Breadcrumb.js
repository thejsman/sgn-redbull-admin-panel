import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ breadcrumb }) => (
    <div className="cm_breadcrumb">
        <ul>
            <li><Link to="/"><i className="fa fa-home" /><i className="fa fa-angle-double-right" /></Link></li>
            {breadcrumb.map((item, i) => (
                <li key={i}>{item.link ? <Link to={item.link}>{item.linkText} <i className="fa fa-angle-double-right" /></Link> : <span>{item.linkText}</span>}</li>
            ))}
        </ul>
    </div>
)

export default Breadcrumb;