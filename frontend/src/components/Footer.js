import styled from 'styled-components';

const FooterStyles = styled.div`
    display: flex;
    position: fixed;
    height: 50px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin-bottom: 0px;
    justify-content: center;
    background-color: ${props => props.theme.darkBlue};
    color: ${props => props.theme.offWhite};
    font-size: 1.5rem;
    .center {
        display: flex; 
        align-items: center; 
        justify-content: center; 
    }
`;

function Footer() {
    return (
        <FooterStyles>
            <div className='center'>
                <p>Farmer's Special &#169; 2021</p>
            </div>
        </FooterStyles>
    )
};

export default Footer;