import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {

    function handleCardClick() {
        props.handleCardClick();
    }
    function handleCardLike() {
        props.handleCardLike();
    }
    function handleCardDelete() {
        props.handleCardDelete();
    }

    // Подписываемся на контекст CurrentUserContext
    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.owner._id === currentUser._id;
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `cards__trash ${isOwn ? '' : 'hidden'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.likes.some(i => i._id === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `cards__heart ${isLiked ? 'cards__heart_active' : ''}`;

    return (
        <li className="cards__item">
            <div className="cards__pic">
                <img className="cards__img"
                    data-popup="open-img__popup"
                    src={props.link}
                    alt={props.name} 
                    onClick={handleCardClick}
                />
                <button
                    // className="cards__trash hidden" 
                    className={cardDeleteButtonClassName}
                    onClick={handleCardDelete}
                ></button>
            </div>
            <div className="cards__text">
                <h2 className="cards__title text-overflow">{props.name}</h2>
                <div>
                    <button
                        // className="cards__heart cards__heart_active" 
                        className={cardLikeButtonClassName}
                        onClick={handleCardLike}
                    ></button>
                    <div className="cards__heart-counter">{props.likes.length}</div>
                </div>
            </div>
        </li>
    );
}

export default Card;