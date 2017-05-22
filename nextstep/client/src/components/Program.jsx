import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Program = ({
  changeNavBar,
  checkNavBar,
  setActiveOne,
  setActiveTwo,
  setActiveThree,
  scheduleArrDays,
  scheduleArrWeeks,
  onClickReset,
  checkWeek,
  changeNavWeek,

  getThisBook,
  myBook,
  changeBookTitle,
  onSubmitBook,
  myBookList,
  setNewBook,

  myMovie,
  changeMovie,
  onSubmitMovie,
  myMovieList,
  getThisMovie,
  setNewMovie,

  myLesson,
  changeLesson,
  onSubmitLesson,
  myLessonList,
  getThisLesson,
  setNewLesson,
  changeLessonTask
}) => (
  <div className="container">
  <h3><em>Программа</em></h3>
    <div className="row">
      <div className="col-md-6 program-schedule well">
        <div className="row">
          <div className="col-md-9">
            <h4>Расписание</h4>
          </div>
          <div className="col-md-3">
            <p className="changeCheckNote"><span className="glyphicon glyphicon-menu-left " id="left" onClick={changeNavWeek}></span> {checkWeek}/8 <span className="glyphicon glyphicon-menu-right" id="right" onClick={changeNavWeek}></span></p>
          </div>
        </div>
        {(checkWeek == 1) && (myBookList.length > (checkWeek-1)) ?(
          <div className="row each-day" id={myBookList[0]._id} onClick={getThisBook} tabIndex="1">
            <div className="col-md-3 day-of-week" >Неделя {checkWeek}</div>
            <div className="col-md-9 for-book text-center" id={myBookList[0]._id} onClick={getThisBook}>{myBookList[0].title}</div>
          </div>
        ):((checkWeek == 2) && (myBookList.length > (checkWeek-1)))?(
          <div className="row each-day" id={myBookList[1]._id} onClick={getThisBook} tabIndex="1">
            <div className="col-md-3 day-of-week" >Неделя {checkWeek}</div>
            <div className="col-md-9 for-book text-center" id={myBookList[1]._id} onClick={getThisBook}>{myBookList[1].title}</div>
          </div>
        ):((checkWeek == 3) && (myBookList.length > (checkWeek-1)))?(
          <div className="row each-day" id={myBookList[2]._id} onClick={getThisBook} tabIndex="1">
            <div className="col-md-3 day-of-week" >Неделя {checkWeek}</div>
            <div className="col-md-9 for-book text-center" id={myBookList[2]._id} onClick={getThisBook}>{myBookList[2].title}</div>
          </div>
        ):((checkWeek == 4) && (myBookList.length > (checkWeek-1)))?(
          <div className="row each-day" id={myBookList[3]._id} onClick={getThisBook} tabIndex="1">
            <div className="col-md-3 day-of-week" >Неделя {checkWeek}</div>
            <div className="col-md-9 for-book text-center" id={myBookList[3]._id} onClick={getThisBook}>{myBookList[3].title}</div>
          </div>
        ):((checkWeek == 5) && (myBookList.length > (checkWeek-1)))?(
          <div className="row each-day" id={myBookList[4]._id} onClick={getThisBook} tabIndex="1">
            <div className="col-md-3 day-of-week" >Неделя {checkWeek}</div>
            <div className="col-md-9 for-book text-center" id={myBookList[4]._id} onClick={getThisBook}>{myBookList[4].title}</div>
          </div>
        ):((checkWeek == 6) && (myBookList.length > (checkWeek-1)))?(
          <div className="row each-day" id={myBookList[5]._id} onClick={getThisBook} tabIndex="1">
            <div className="col-md-3 day-of-week" >Неделя {checkWeek}</div>
            <div className="col-md-9 for-book text-center" id={myBookList[5]._id} onClick={getThisBook}>{myBookList[5].title}</div>
          </div>
        ):((checkWeek == 7) && (myBookList.length > (checkWeek-1)))?(
          <div className="row each-day" id={myBookList[6]._id} onClick={getThisBook} tabIndex="1">
            <div className="col-md-3 day-of-week" >Неделя {checkWeek}</div>
            <div className="col-md-9 for-book text-center" id={myBookList[6]._id} onClick={getThisBook}>{myBookList[6].title}</div>
          </div>
        ):((checkWeek == 8) && (myBookList.length > (checkWeek-1)))?(
          <div className="row each-day" id={myBookList[7]._id} onClick={getThisBook} tabIndex="1">
            <div className="col-md-3 day-of-week" >Неделя {checkWeek}</div>
            <div className="col-md-9 for-book text-center" id={myBookList[7]._id} onClick={getThisBook}>{myBookList[7].title}</div>
          </div>
        ):(
          <div className="row each-day" onClick={setNewBook} tabIndex="1">
            <div className="col-md-3 day-of-week">Неделя {checkWeek}</div>
            <div className="col-md-9 for-book text-center"></div>
          </div>
        )}
            {scheduleArrDays.map((jitems, j) =>
              <div key={j}>
                <div className="row each-day" >
                  <div className="col-md-3 day-of-week">{jitems} день</div>
                  <div className="col-md-9">
                    {(myLessonList.length > j) && (checkWeek==1) ?(
                      <div className="row bg-success for-lesson text-center"  id={myLessonList[j]._id} tabIndex="0" onClick={getThisLesson}>
                      {myLessonList[j].title}
                      </div>
                    ):(myLessonList.length > (j+6)) && (checkWeek==2) ?(
                      <div className="row bg-success for-lesson text-center" id={myLessonList[j+6]._id} tabIndex="0" onClick={getThisLesson}>
                      {myLessonList[j+6].title}
                      </div>
                    ):(myLessonList.length > (j+12)) && (checkWeek==3) ?(
                      <div className="row bg-success for-lesson text-center" id={myLessonList[j+12]._id} tabIndex="0" onClick={getThisLesson}>
                      {myLessonList[j+12].title}
                      </div>
                    ):(myLessonList.length > (j+18)) && (checkWeek==4) ?(
                      <div className="row bg-success for-lesson text-center" id={myLessonList[j+18]._id} tabIndex="0" onClick={getThisLesson}>
                      {myLessonList[j+18].title}
                      </div>
                    ):(myLessonList.length > (j+24)) && (checkWeek==5) ?(
                      <div className="row bg-success for-lesson text-center" id={myLessonList[j+24]._id} tabIndex="0" onClick={getThisLesson}>
                      {myLessonList[j+24].title}
                      </div>
                    ):(myLessonList.length > (j+30)) && (checkWeek==6) ?(
                      <div className="row bg-success for-lesson text-center" id={myLessonList[j+30]._id} tabIndex="0" onClick={getThisLesson}>
                      {myLessonList[j+30].title}
                      </div>
                    ):(myLessonList.length > (j+36)) && (checkWeek==7) ?(
                      <div className="row bg-success for-lesson text-center" id={myLessonList[j+36]._id} tabIndex="0" onClick={getThisLesson}>
                      {myLessonList[j+36].title}
                      </div>
                    ):(myLessonList.length > (j+42)) && (checkWeek==8) ?(
                      <div className="row bg-success for-lesson text-center" id={myLessonList[j+42]._id} tabIndex="0" onClick={getThisLesson}>
                      {myLessonList[j+42].title}
                      </div>
                    ):(
                      <div className="row bg-success" onClick={setNewLesson} tabIndex="1">
                      </div>
                    )}

                    {(myMovieList.length > j) && (checkWeek==1) ?(
                      <div className="row bg-warning for-lesson text-center" id={myMovieList[j]._id} tabIndex="0" onClick={getThisMovie}>
                      {myMovieList[j].title}
                      </div>
                    ):(myMovieList.length > (j+6)) && (checkWeek==2) ?(
                      <div className="row bg-warning for-lesson text-center" id={myMovieList[j+6]._id} tabIndex="0" onClick={getThisMovie}>
                      {myMovieList[j+6].title}
                      </div>
                    ):(myMovieList.length > (j+12)) && (checkWeek==3) ?(
                      <div className="row bg-warning for-lesson text-center" id={myMovieList[j+12]._id} tabIndex="0" onClick={getThisMovie}>
                      {myMovieList[j+12].title}
                      </div>
                    ):(myMovieList.length > (j+18)) && (checkWeek==4) ?(
                      <div className="row bg-warning for-lesson text-center" id={myMovieList[j+18]._id} tabIndex="0" onClick={getThisMovie}>
                      {myMovieList[j+18].title}
                      </div>
                    ):(myMovieList.length > (j+24)) && (checkWeek==5) ?(
                      <div className="row bg-warning for-lesson text-center" id={myMovieList[j+24]._id} tabIndex="0" onClick={getThisMovie}>
                      {myMovieList[j+24].title}
                      </div>
                    ):(myMovieList.length > (j+30)) && (checkWeek==6) ?(
                      <div className="row bg-warning for-lesson text-center" id={myMovieList[j+30]._id} tabIndex="0" onClick={getThisMovie}>
                      {myMovieList[j+30].title}
                      </div>
                    ):(myMovieList.length > (j+36)) && (checkWeek==7) ?(
                      <div className="row bg-warning for-lesson text-center" id={myMovieList[j+36]._id} tabIndex="0" onClick={getThisMovie}>
                      {myMovieList[j+36].title}
                      </div>
                    ):(myMovieList.length > (j+42)) && (checkWeek==8) ?(
                      <div className="row bg-warning for-lesson text-center" id={myMovieList[j+42]._id} tabIndex="0" onClick={getThisMovie}>
                      {myMovieList[j+42].title}
                      </div>
                    ):(
                      <div className="row bg-warning" onClick={setNewMovie} tabIndex="1">
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
      </div>
      <div className="col-md-6 program-addcontent well">
        <h4>Ввод контента</h4>
          <ul className="nav nav-tabs row">
            <li className={setActiveOne} role="presentation" onClick={changeNavBar} value="1">Урок</li>
            <li className={setActiveTwo} role="presentation" onClick={changeNavBar} value="2">Фильм</li>
            <li className={setActiveThree} role="presentation" onClick={changeNavBar} value="3">Книга</li>
          </ul>
            <div className="row container program-children">
            {checkNavBar == 3 ?(
              <div >
                <form action="/" className="form-horizontal" onSubmit={onSubmitBook}>
                  <div className="form-group">
                    <p className="text-muted add-lesson-label">Название</p>
                    <input type="text"
                           className="form-control"
                           value={myBook.title}
                           name="title"
                           onChange={changeBookTitle}
                           placeholder="Введите название книги"/>
                  </div>
                  <div className="form-group">
                    <p className="text-muted add-lesson-label">Описание</p>
                    <textarea type="text"
                           className="form-control"
                           value={myBook.description}
                           name="description"
                           onChange={changeBookTitle}
                           placeholder="Введите описание книги"
                           rows="5"></textarea>
                  </div>
                  <div className="form-group">
                    <p className="text-muted add-lesson-label">Ссылка на материал</p>
                    <input type="text"
                           className="form-control"
                           value={myBook.url}
                           name="url"
                           onChange={changeBookTitle}
                           placeholder="URL"/>
                  </div>
                  <div className="form-group" style={{marginRight: '-30px'}}>
                    <div className="col-md-4 col-md-offset-4">
                      <button type="button" onClick={onClickReset} className="btn btn-default btn-block" >Отменить</button>
                    </div>
                    <div className="col-md-4">
                      <button type="submit" className="btn btn-primary btn-block">Сохранить</button>
                    </div>
                  </div>
                </form>
              </div>
            ) : checkNavBar == 2?(
              <div>
                <form action="/" className="form-horizontal" onSubmit={onSubmitMovie}>
                  <div className="form-group">
                    <p className="text-muted add-lesson-label">Название</p>
                    <input type="text"
                           className="form-control"
                           value={myMovie.title}
                           name="title"
                           onChange={changeMovie}
                           placeholder="Введите название фильма"/>
                  </div>
                  <div className="form-group">
                    <p className="text-muted add-lesson-label">Описание</p>
                    <textarea type="text"
                           className="form-control"
                           value={myMovie.description}
                           name="description"
                           onChange={changeMovie}
                           placeholder="Введите описание фильма"
                           rows="5"></textarea>
                  </div>
                  <div className="form-group">
                    <p className="text-muted add-lesson-label">Ссылка на материал</p>
                    <input type="text"
                           className="form-control"
                           value={myMovie.url}
                           name="url"
                           onChange={changeMovie}
                           placeholder="URL"/>
                  </div>
                  <div className="form-group" style={{marginRight: '-30px'}}>
                    <div className="col-md-4 col-md-offset-4">
                      <button type="button" onClick={onClickReset} className="btn btn-default btn-block" >Отменить</button>
                    </div>
                    <div className="col-md-4">
                      <button type="submit" className="btn btn-primary btn-block">Сохранить</button>
                    </div>
                  </div>
                  </form>
              </div>
            ):(
              <div >
                <form action="/" className="form-horizontal" onSubmit={onSubmitLesson}>
                  <div className="form-group">
                    <p className="text-muted add-lesson-label">Название</p>
                    <input type="text"
                           className="form-control"
                           value={myLesson.title}
                           name="title"
                           onChange={changeLesson}
                           placeholder="Введите название урока"/>
                  </div>
                  <div className="form-group">
                    <p className="text-muted add-lesson-label">Описание</p>
                    <textarea type="text"
                           className="form-control"
                           value={myLesson.description}
                           name="description"
                           onChange={changeLesson}
                           placeholder="Введите описание урока"
                           rows="5"></textarea>
                  </div>
                  <div className="form-group">
                    <p className="text-muted add-lesson-label">Ссылка на материал</p>
                    <input type="text"
                           className="form-control"
                           value={myLesson.url}
                           name="url"
                           onChange={changeLesson}
                           placeholder="URL"/>
                  </div>
                  <div className="form-group">
                    <p className="text-muted add-lesson-label">Задания</p>
                    <input type="text"
                           className="form-control"
                           value={myLesson.tasks[0]}
                           name="task1"
                           onChange={changeLessonTask}
                           style={{marginBottom: '10px'}}
                           placeholder="Введите задание"/>
                    <input type="text"
                           className="form-control"
                           value={myLesson.tasks[1]}
                           name="task2"
                           onChange={changeLessonTask}
                           style={{marginBottom: '10px'}}
                           placeholder="Введите задание"/>
                    <input type="text"
                           className="form-control"
                           value={myLesson.tasks[2]}
                           name="task3"
                           onChange={changeLessonTask}
                           placeholder="Введите задание"/>
                  </div>
                  <div className="form-group" style={{marginRight: '-30px'}}>
                    <div className="col-md-4 col-md-offset-4">
                      <button type="button" onClick={onClickReset} className="btn btn-default btn-block" >Отменить</button>
                    </div>
                    <div className="col-md-4">
                      <button type="submit" className="btn btn-primary btn-block">Сохранить</button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            </div>
      </div>
    </div>
  </div>
);

Program.propTypes = {
  changeNavBar: PropTypes.func.isRequired,
  changeNavWeek: PropTypes.func.isRequired,
  myBookList: PropTypes.array.isRequired
};

export default Program;
