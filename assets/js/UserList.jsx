import React from 'react';

const User = ({username}) => <tr><td>{username}</td></tr>;

const UserList =  ({users}) => {
  const rows = _.map(users, (u) => <User key={u.id} {...u}/>);
  return (
    <div className="row">
      <div className="col-12">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    </div>);
}

export default UserList;
