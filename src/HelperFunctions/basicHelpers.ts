export const isValid = (errors : any) => {
    return Object.values(errors).every((value) => value === '');
} 

export function getCookie(name : string) {
    // Create a regex pattern to match the cookie by name
    const cookieArr = document.cookie.split(";");

    // Loop through all cookies to find the one with the given name
    for (let i = 0; i < cookieArr.length; i++) {
        let cookie = cookieArr[i].trim();  // Remove extra spaces

        // Check if the current cookie starts with the desired name
        if (cookie.indexOf(name + "=") === 0) {
            // Return the cookie value (after the '=')
            return cookie.substring(name.length + 1);
        }
    }

    // Return null if the cookie is not found
    return null;
}


export const s3ImgUrl = "https://assets.lisparklez.com/"