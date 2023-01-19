import React, { useEffect, useState } from 'react';

import UserList from '../../components/UserList/UserList';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useHttpClient } from '../../helpers/hooks/http-hook';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseUsers = await sendRequest(`${API_URL}/users`);
        setLoadedUsers(responseUsers.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <section className="users">
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div
          className="message__container-loading"
          style={{ marginTop: '-5rem' }}
        >
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UserList users={loadedUsers} />}
    </section>
  );
};

export default Users;
