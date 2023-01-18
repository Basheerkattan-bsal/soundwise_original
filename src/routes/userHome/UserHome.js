import React, {useContext} from 'react';
import classes from './UserHome.module.css';
import UserPlayList from '../user_playList/UserPlayList';
import MainContext from '../../context/MainContext';

export default function UserHome() {
  const [STATE, DISPATCH] = useContext(MainContext);
  const { user } = STATE;

  return (
    <div className={classes.main}>
      <div>This is the user home</div>

      {user ? <UserPlayList /> : <div></div>}
    </div>
  );
}
