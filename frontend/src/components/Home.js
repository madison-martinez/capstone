import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router'
import { useUser } from './User';
import { useEffect } from 'react';


const GalleryStyles = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    .text-center {
        text-align: center;
    }
    .buttons-section {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 2rem;
        font-size: 2rem;
        a {
            &:hover {
                background-color: ${props => props.theme.blue};
                color: ${props => props.theme.offWhite};
            }
        }
    }
    @media (max-width: 700px) {
        display: grid;
        grid-template-columns: 1fr;
    }
`;


function Home() {
    const currentUser = useUser();
    console.log(currentUser);

    useEffect(() => {
    
    }, [])

    return (
        <GalleryStyles>
            <Image
                src="/assets/photo-1515150144380-bca9f1650ed9.jpeg"
                alt="farmer watering plant"
                layout="responsive"
                width={600}
                height={900}
            />
            <div className="text-center">
                <h2>What We Do</h2>
                <p>
                    We are trying to be a link in a somewhat broken supply chain.
                    We are looking to help the small providers get their products into the locals hands and bellies.
                    </p>
                <h2>Why We Do It</h2>
                <p>
                    While the food supply chain has been stressed for awhile, the COVID pandemic has really brought
                    to light the connection between farmers and consumers, especially small businesses.
                    Instead of having farmers dump milk or plow fields full of food, we hope to maybe find places for that food to go, while keeping the farmers fed too.
                    </p>
                <h2>Where You Fit In</h2>
                <p>
                    The goal of this website is to allow local producers to list items they have for sale to local restaurants who may be looking to get a larger margin
                    on dishes during this difficult time. So, if you would like to see what is available to you, please sign up or login and we look forward to seeing
                    what you create.
                    </p>
                <div className="buttons-section">
                    {currentUser && (
                        <Link href="/login">
                            <a>Logout</a>
                        </Link>
                    )}
                    {!currentUser && (
                        <>
                            <Link href="/signup">
                                <a>Signup</a>
                            </Link>
                            <Link href="/login">
                                <a>Login</a>
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <Image
                src="/assets/photo-1503453776591-b4548af666a2.jpeg"
                alt="kitchen worker salting food"
                layout="responsive"
                width={600}
                height={900}
            />
        </GalleryStyles>
    )
};

export default Home;
