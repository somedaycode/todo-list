import { useState, useRef, useEffect } from 'react';
import StyledForm from '../atoms/StyledForm';
import { InputTitle, InputContent } from '../atoms/StyledInputs';
import FormButtonsWrap from '../molecules/FormButtonsWrap';
import resize from './custom.js';
import { postForm } from './useFetch.js';

const Form = ({ addCard, column, offDisplay }) => {
  const [hasInput, setHasInput] = useState(false);
  const [inputs, setInputs] = useState({
    title: '',
    content: '',
  });
  const titleInput = useRef();
  const contentInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', titleInput.current.value);
    formData.append('content', contentInput.current.value);
    console.log(formData);
    await postForm(`${column.id}/cards`, formData, column, addCard);
    offDisplay();
  };

  const onChange = ({ target }) => {
    setInputs({
      ...inputs,
      [target.name]: target.value,
    });
  };

  const checkInputValue = ({ title, content }) => {
    if (title.length > 0 || content.length > 0) setHasInput(true);
    else setHasInput(false);
  };

  useEffect(() => {
    checkInputValue(inputs);
  }, [inputs]);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <InputTitle
        name="title"
        type="text"
        placeholder="제목을 적어주세요"
        ref={titleInput}
        autoComplete="off"
        onChange={onChange}
      />
      <InputContent
        name="content"
        type="text"
        placeholder="내용을 적어주세요"
        ref={contentInput}
        autoComplete="off"
        onKeyUp={() => resize(contentInput)}
        onChange={onChange}
      />
      <FormButtonsWrap offDisplay={offDisplay} hasInput={hasInput} />
    </StyledForm>
  );
};

export default Form;
