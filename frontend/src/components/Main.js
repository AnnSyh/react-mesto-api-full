import React from 'react';
import Button from './Button';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
// console.log('Main props= ',props);
    // Подписываемся на контекст CurrentUserContext
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <>
            <section className="profile section content__section">
                <div className="profile__user">
                    <div className="profile__pic btn-avatar-edit">
                        <img className="profile__img"
                            src={`${currentUser.avatar}`}
                            alt="аватар" />
                        <Button title=""
                            btnClass="profile__btn profile__btn_user-edit profile__btn_avatar-edit  link-hover"
                            handleClick={props.handleEditAvatarClick} />
                    </div>

                    <div className="profile__info">
                        <div className="profile__edit">
                            <h1 className="profile__name text-overflow">{`${currentUser.name}`}</h1>

                            <Button title=""
                                btnClass="profile__btn profile__btn_user-edit btn-user-edit link-hover"
                                handleClick={props.handleEditProfileClick} />
                        </div>
                        <p className="profile__job text-overflow">{`${currentUser.about}`}</p>
                    </div>

                </div>

                <Button title=""
                    btnClass="profile__btn profile__btn_user-add link-hover"
                    handleClick={props.handleAddPlaceClick} />
            </section>

            <section className="cards section content__section ">
                <div className="list-template-inner">
                    <ul className="cards__list list-template-place">
                        {props.cards.map((card) => {
                            return (
                                <Card key={card._id}
                                    handleCardClick={() => props.handleCardClick(card)}
                                    handleCardLike={() => props.handleCardLike(card)}
                                    handleCardDelete={() => props.handleCardDelete(card)}
                                    {...card}
                                />
                            );
                        })}
                    </ul>
                </div>
            </section>
        </>
    );
}

export default Main;
