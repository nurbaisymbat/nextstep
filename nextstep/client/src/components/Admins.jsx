import React from 'react';
import { Link } from 'react-router';

const Admins = ({
    admins,
    mySize,
    showSize,
    mySlice,
    changeSize,
    tempSlice,
    changeUser,
    findUser,
    newadmin,
    changeAdmin,
    checkAddAdmin,
    addAdmin,
    errors,
    message,
    deleteAdmin,
    getAdminId,
    messageDelete,
    editadmin,
    editAdmin,
    changeEditAdmin,
    checkEditAdmin,
    checkType,
    changeType,
    cleanEdit
}) => (
<div className="container">
<h3><em>Администрация</em></h3>
  <div className="row " hidden={checkType}>
    <div className="col-md-11 well"  style={{background: 'white', width: '89.5%'}}>
    <h4>Добавить админа</h4>
    {message && <p style={{ fontSize: '14px', color: 'green' }}>{message}</p>}
    {errors.summary && <p style={{ fontSize: '14px', color: 'red' }}>{errors.summary}</p>}
    <form onSubmit={addAdmin}>
      <div className="form-group row">
        <div className="col-md-12">
          <input type="text" className="form-control" name="name"
                 value={newadmin.name} onChange={changeAdmin}
                 placeholder="Введите имя пользователя"/>
        </div>
      </div>
      <div className="form-group row">
        <div className="col-md-6">
          <input type="email" className="form-control" name="email"
                 value={newadmin.email} onChange={changeAdmin}
                 placeholder="Введите адрес электронной почты"/>
        </div>
        <div className="col-md-6">
          <select className="form-control" value={newadmin.department} onChange={changeAdmin} name="department">
            <option value="">Выберите отдел</option>
            <option value="Дизайн">Дизайн</option>
            <option value="Программирование">Программирование</option>
          </select>
        </div>
      </div>
      <div className="form-group text-right">
        <button type="submit" className="btn btn-success"
                style={{paddingRight: '5%', paddingLeft: '5%'}}
                disabled={!checkAddAdmin} >Добавить</button>
      </div>
    </form>
    </div>
  </div>
  <div className="row " hidden={!checkType}>
    <div className="col-md-11 well"  style={{background: 'white', width: '89.5%'}}>
    <h4>Редактировать админа</h4>
    <form onSubmit={editAdmin}>
      <div className="form-group row">
        <div className="col-md-12">
          <input type="text" className="form-control" name="name"
                 value={editadmin.name} onChange={changeEditAdmin}
                 placeholder="Введите имя пользователя"/>
        </div>
      </div>
      <div className="form-group row">
        <div className="col-md-6">
          <input type="email" className="form-control" name="email"
                 value={editadmin.email} onChange={changeEditAdmin}
                 placeholder="Введите адрес электронной почты"/>
        </div>
        <div className="col-md-6">
          <select className="form-control" value={editadmin.department} onChange={changeEditAdmin} name="department">
            <option value="">Выберите отдел</option>
            <option value="Дизайн">Дизайн</option>
            <option value="Программирование">Программирование</option>
          </select>
        </div>
      </div>
      <div className="form-group text-right">
        <button type="submit" className="btn btn-success"
                style={{paddingRight: '5%', paddingLeft: '5%', marginRight: '3%'}}
                disabled={!checkEditAdmin} >Изменить</button>
        <button type="button" className="btn btn-default"
                style={{paddingRight: '5%', paddingLeft: '5%'}}
                onClick={cleanEdit} >Отменить</button>
      </div>
    </form>
    </div>
  </div>
  <div className="row myUsers well">
      <div className="form-group form-inline text-right">
        <span style={{marginRight: '10px'}}>Поиск:</span>
        <input className="form-control" onChange={changeUser} value={findUser} placeholder="Введите запрос"/>
      </div>
      {messageDelete && <p style={{ fontSize: '14px', color: 'green' }}>{messageDelete}</p>}
      <div className="row" style={{marginTop: '20px'}}>
        <div className="col-md-4"><h5><strong>Имя</strong></h5></div>
        <div className="col-md-3"><h5><strong>E-mail</strong></h5></div>
        <div className="col-md-3"><h5><strong>Отдел</strong></h5></div>
        <div className="col-md-2"><h5><strong>Опции</strong></h5></div>
      </div>
      <hr style={{marginTop: '10px', marginBottom: '0px'}}/>
      {admins.slice(tempSlice,mySize).map((admin, u) =>
        <div key={u}>
              <div className="row eachUser">
                <div className="col-md-4">
                  {admin.name}
                </div>
                <div className="col-md-3">
                  {admin.email}
                </div>
                <div className="col-md-3">
                  {admin.department}
                </div>
                <div className="col-md-2">
                  <span className="btn btn-default btn-circle"
                        style={{marginRight: '10px'}}
                        id={admin._id} onClick={changeType}>
                        <i className="glyphicon glyphicon-pencil" id={admin._id}></i>
                  </span>
                  <span className="btn btn-danger btn-circle"
                        id={admin._id} onClick={getAdminId} data-toggle="modal" data-target="#myModal">
                        <i className="glyphicon glyphicon-remove" id={admin._id}></i>
                  </span>

                </div>
              </div>
            <hr style={{marginTop: '0px', marginBottom: '0px'}}/>
        </div>
      )}
      <div className="row" style={{marginTop: '20px'}}>
      <div className="col-md-4">
        {mySize > admins.length ?(
          <h5>Показано с {tempSlice+1} по {admins.length} запись из {admins.length} записи</h5>
        ):(
          <h5>Показано с {tempSlice+1} по {mySize} запись из {admins.length} записи</h5>
        )}
      </div>
      <div className="col-md-8">
      <div className="btn-toolbar pull-right" role="toolbar">
        <div className="btn-group mr-2" role="group">
        <button type="button" className="btn btn-default" onClick={changeSize} name="back">Назад</button>
          {showSize.map((currSize, c) =>
            <div key={c} className="btn-group mr-2" role="group">
              {currSize == mySlice ?(
                <button type="button" className="btn btn-primary" onClick={changeSize} name={currSize}>{currSize}</button>
              ):(
                <button type="button" className="btn btn-default" onClick={changeSize} name={currSize}>{currSize}</button>
              )}

            </div>
          )}
          <button type="button" className="btn btn-default" onClick={changeSize} name="forward">Вперед</button>
        </div>
      </div>
      </div>
      </div>
  </div>
  <div className="modal fade" id="myModal" role="dialog">
  <div className="modal-dialog">

    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title">Удаление администратора</h4>
      </div>
      <div className="modal-body">
        <p>Вы действительно хотите удалить этого администратора?</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" style={{paddingRight: '5%', paddingLeft: '5%'}} onClick={deleteAdmin} data-dismiss="modal">Удалить</button>
        <button type="button" className="btn btn-default" data-dismiss="modal" style={{paddingRight: '5%', paddingLeft: '5%'}}>Отменить</button>
      </div>
    </div>

  </div>
</div>
</div>
);

export default Admins;
