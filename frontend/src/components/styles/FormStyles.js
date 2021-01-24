import styled from 'styled-components';

const Form = styled.form`
display: grid;
grid-template-columns: 1fr 1fr;
grid-gap: 1.5rem;
box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
background: rgba(0, 0, 0, 0.07);
border: 3px solid white ;
padding: 20px;
font-size: 1.5rem;
line-height: 1.5;
h2 {
  font-family: 'Amatic SC', cursive;
  font-size: 2.5rem;
  text-align: center;
}
label {
  display: block;
  margin-bottom: 1rem;
}
input,
textarea,
select {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid ${props => props.theme.darkGray};
  &:focus {
    outline: 0;
    border-color: ${props => props.theme.blue};
  }
}
button,
input[type='submit'] {
  width: auto;
  background: ${props => props.theme.darkGreen};
  color: white;
  border: 0;
  font-size: 2rem;
  font-family: 'Josefin Slab', serif;
  padding: .75rem 1rem;
  &:hover {
    background: ${props => props.theme.offWhite};
    color: ${props => props.theme.darkGreen}
    }
}
fieldset {
  border: 0;
  padding: 0;
  &[disabled] {
    opacity: 0.5;
  }
}
`;

export default Form;