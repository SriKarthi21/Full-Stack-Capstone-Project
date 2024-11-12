import styled from "styled-components"
function PageNotFound(){

    const Error=styled.span`
    color:red;
font-family: 'Times New Roman';
font-size: x-large;
    `;

    return(
        <>
        
        <Error>OOPS Something Bad Happened. Requested Page is not available</Error>
        
        </>
    )

}
export default PageNotFound