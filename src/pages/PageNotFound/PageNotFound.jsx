
import React from 'react';
import { Button, Icon, Image, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import style from './PageNotFound.scss';

import gif404 from '../../resources/images/404-page.gif';

const PageNotFound = () => {
  return (
    <div className={style.mainContainer}>
      <b>Page not found.</b>
      <Image src={gif404} className={style.gif} />

      <Menu.Item as={Link} name="/" to="/">
        <Button icon labelPosition="left" primary>
          <Icon name="home" />
          Back to safety
        </Button>
      </Menu.Item>
    </div>
  );
};

export default PageNotFound;
