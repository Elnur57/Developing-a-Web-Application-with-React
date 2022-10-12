// import React, { Component } from 'react';
// import { getUsers } from '../api/apiCalls';
// import { withTranslation } from 'react-i18next';
// import UserListItem from './UserListItem';
//burani class komponentle yazildi.
// class UserList extends Component {
//   state = {
//     page: {
//       content: [],
//       number: 0,
//       size: 3,
//     }
//   };

//   componentDidMount() {
//     this.loadUsers(); 
//   }
  
//   onClickNext = () => {
//     const nextPage = this.state.page.number + 1;
//     this.loadUsers( nextPage );
//   };

//   onClickPrev = () => {
//     const prevPage = this.state.page.number - 1;
//     this.loadUsers( prevPage );
//   }

//   loadUsers = page => {
//     getUsers( page ).then(response => {
//       this.setState({
//         page: response.data
//       });
//     }); 
//   }

//   render() {
//     const { t } = this.props;
//     const { content: users, last, first } = this.state.page;
//     return (
//       <div className="card">
//         <h3 className="card-header text-center">{t('Users')}</h3>
//         <div className="list-group-flush">
//           {users.map(user => (
//             <UserListItem key={user.username} user={user}/>
//           ))}
//         </div>
//         <div>
//           {first === false && (
//             <button className="btn btn-sm btn-light" onClick={this.onClickPrev}>
//               {t('Previous')}
//             </button>
//           )}
//         </div>
//         <div>
//           {last === false && (
//             <button className="btn btn-sm btn-light float-end" onClick={this.onClickNext}>
//               {t('Next')}
//             </button>
//           )}
//         </div>
//       </div>
//     )
//   }
// }
// export default withTranslation()(UserList);


//bura hook la yazildi,funksiya komponentile
import React, { useState, useEffect } from 'react';
import { getUsers } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import UserListItem from './UserListItem';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';

const UserList = () => {

  const [ page, setPage ] = useState({
    content: [],
    size: 3,
    number: 0
  });

  const  [ loadFailure, setLoadFailure ] = useState(false);

  //hooklarda siralama vacib oldugundan  pendingApiCall useEffectden yuxarda yazmaq lazimdir. 
  const pendingApiCall =useApiProgress('/api/1.0/users?page');

  useEffect(() => {
    loadUsers();
  }, []);
  
  const onClickNext = () => {
    const nextPage = page.number + 1;
    loadUsers( nextPage );
  };

  const onClickPrev = () => {
    const prevPage = page.number - 1;
    loadUsers( prevPage );
  }

  const loadUsers = async page => {
    setLoadFailure(false);
    try {
      const response = await getUsers(page);
      setPage(response.data);
    } catch(error) {
      setLoadFailure(true);
    }
  }
  const { t } = useTranslation();
  const { content: users, last, first } = page;

  let actionDiv = (
    <div>
        {first === false && (
          <button className="btn btn-md btn-light float-start" onClick={onClickPrev}>
            {t('< Previous')}
          </button>
        )}  
        {last === false && (
          <button className="btn btn-md btn-light float-end" onClick={onClickNext}>
            {t('Next >')}
          </button>
        )}
    </div>
  );
  if(pendingApiCall) {
    actionDiv = (
      <Spinner/>
    );
  }
  return (
    <div className="card">
      <h3 className="card-header text-center">{t('Users')}</h3>
      <div className="list-group-flush">
        {users.map(user => (
          <UserListItem key={user.username} user={user}/>
        ))}
      </div>
      {actionDiv}
      { loadFailure && <div className="text-center text-danger">{t('Load Failure')}</div>}
    </div>
  )
}
export default UserList;