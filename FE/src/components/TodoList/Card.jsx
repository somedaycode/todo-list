import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import CardButtonWrap from '../molecules/CardButtonWrap';
import { InputTitle, InputContent } from '../atoms/StyledInputs';
import Icon from '../atoms/Icons';
import resize from './custom.js';

const Card = ({ cards, checkInputValue }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasInput, setHasInput] = useState(false);
  const [inputs, setInputs] = useState({
    title: '',
    content: '',
  });
  const { title, content, author } = cards;
  const cardTitle = useRef();
  const cardContent = useRef();

  const onChange = ({ target }) => {
    setInputs({
      ...inputs,
      [target.name]: target.value,
    });
  };

  const handleClickCard = () => {
    setIsEditMode(true);
  };

  const handleClickEdit = (e) => {
    // fetch: patch
    setIsEditMode(false);
  };

  const handleCancelBtn = () => {
    cardTitle.current.value = title;
    cardContent.current.value = content;
    setIsEditMode(false);
  };

  useEffect(() => {
    checkInputValue(inputs, setHasInput);
  }, [checkInputValue, inputs]);

  return (
    <CardContainer className="clicked">
      <div className="card__icon">
        <Icon type={'cancel'} />
      </div>
      {isEditMode ? (
        <li onDoubleClick={handleClickCard}>
          <div>
            <CardTitleInput
              name="title"
              onChange={onChange}
              ref={cardTitle}
              autoComplete="off"
            />
            <CardContentTextArea
              name="content"
              onChange={onChange}
              ref={cardContent}
              autoComplete="off"
              onKeyUp={() => resize(cardContent)}
            />
          </div>
          <CardButtonWrap
            handleClickEdit={handleClickEdit}
            handleCancelBtn={handleCancelBtn}
            hasInput={hasInput}
          />
        </li>
      ) : (
        <li onDoubleClick={handleClickCard}>
          <div>
            <CardTitleInput defaultValue={title} disabled={true} />
            <CardContentTextArea defaultValue={content} disabled={true} />
          </div>
          <span>{author}</span>
        </li>
      )}
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding: 16px;
  width: 308px;
  height: auto;
  background: #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 1px 30px rgba(224, 224, 224, 0.3);
  border-radius: 6px;
  border: 0;
  position: relative;

  .card__icon {
    position: absolute;
    right: 15px;
  }

  .clicked {
    border: 1px solid #0075de;
  }
`;
const CardTitleInput = styled(InputTitle)``;
const CardContentTextArea = styled(InputContent)``;
