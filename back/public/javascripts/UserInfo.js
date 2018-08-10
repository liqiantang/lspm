/**
 * 用户信息类
 *
 * @class UserInfo
 */
class UserInfo {
    constructor(DbHelper, Utility) {
        this.DbHelper = DbHelper;
        this.Utility = Utility;
    }

    post_login(request, response, options) {

    }

    get_user(request, response, options) {
        response.Send({ msg: '这是一个get请求', options });
    }

    post_user(request, response, options) {
        response.Send({ msg: '这是一个 post 请求', options });
    }

    delete_user(request, response, options) {
        response.Send({ msg: '这是一个 delete 请求', options });
    }

    put_user(request, response, options) {
        response.Send({ msg: '这是一个 put 请求', options });
    }
}
module.exports = UserInfo;