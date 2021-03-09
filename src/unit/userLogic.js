import { getCurrentUserOffLine } from './../http/authServices';

export default function getUser(backend) {
    const localUser = {
        email: "1@1.com",
        iat: 1614172994,
        isAdmin: false,
        registrationrDate: "2021-02-24T13:19:31.868Z",
        userName: "aaa",
        _id: "603652639135b53e18448d63",
    };
    //获取本地用户
    return backend ? getCurrentUserOffLine() : localUser;

}

