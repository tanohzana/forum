import React from "react";

import { Icon } from "semantic-ui-react";
import { Link } from 'react-router-dom';

import style from "./Shell.scss";

const Shell = (props) => {
  const { content } = props;

  return (
    <div className={style.mainContainer}>
      <div className={style.headerContainer}>
        <Link to="/"><Icon size='big' link link name='home' className={style.homeIcon} /></Link>
        <Icon size='big' link name='user' className={style.userIcon} />
      </div>

      <div className={style.titleContainer}>
        <Link to="/"><Icon size='huge' name='bug' /></Link>
        <h1>Knowledge cave</h1>
      </div>

      <div className={style.contentContainer}>
        {content}
      </div>

      <div className={style.footerContainer}>
        <p>Florian Adonis</p>
      </div>
    </div>
  );
}

export default Shell;