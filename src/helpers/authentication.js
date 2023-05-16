export default function checkUserInputHandler(email, password, name) {
    let message = '';
    if (!email) {
        return message = 'Please enter your Email!';
    }

    if (!password) {
        return message = 'Please enter your Password!';
    }

    if (name && !name) {
        return message = 'Please enter your Name!';
    }

    if (password?.length < 6) {
        return message = 'Password must be at least 6 characters long!';
    }

    if (name && name?.length < 6) {
        return message = 'Name must be at least 6 characters long!';
    }

    const regex = /\w{1,}[A-Za-z\d@$!%*#?&-_]{8,}/g
    if (!regex.test(email)) {
        return message = 'Please enter a valid email!';
    }

    return message;
}