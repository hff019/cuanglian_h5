import lstore from "@/plugins/lstore/lstore";

export default {
    /**
     * 保存当前登录状态
     *
     * @param state
     * @param status
     * @constructor
     */
    SWITCH_LOGIN_STATUS(state = {}, status = false){
        state.loginStatus = status;
    },
    /**
     * 应用启动信息
     *
     * @param state
     * @param config
     * @constructor
     */
    BOOTSTRAPPERS(state, config) {
        state.CONFIG = config;
        lstore.setData("BOOTSTRAPPERS", config);
    },

    /**
     * 保存当前定位信息
     *
     * @param state
     * @param position
     * @constructor
     */
    SAVE_H5_POSITION(state, position) {
        state.POSITION = position;
        lstore.setData("H5_CURRENT_POSITION", position);
    },

    /**
     * 保存用户信息
     *
     * @param state
     * @param user
     * @constructor
     */
    SAVE_USER(state, user) {
        if (!user.id) return;
        const key = `user_${user.id}`;
        const oldUser = state.USERS[key];

        oldUser
            ? (state.USERS[key] = Object.assign(oldUser, user))
            : (state.USERS[key] = user);

        lstore.setData("H5_USERS", state.USERS);
    },

    // 保存当前登录用户信息
    SAVE_CURRENTUSER(state, info) {
        console.log(info+'--info')
        state.CURRENTUSER = info;
        lstore.setData("CURRENTUSER", state.CURRENTUSER);
        lstore.setData("H5_CUR_USER", state.CURRENTUSER);
    },

    // 保存用户标签数据
    SAVE_USER_TAGS(state, list) {
        state.USERTAGS = list;
        lstore.setData("USERTAGS", state.USERTAGS);
    },

    // 保存用户认证数据
    SAVE_USER_VERIFY(state, verified) {
        state.USER_VERIFY = verified;
    },

    // 保存创建圈子时选择的位置 临时数据
    SAVE_GROUP_LOCATION(state, location) {
        state.CUR_GROUP_LOCATION = location;
    },

    // 注销登录
    SIGN_OUT(state) {
        try {
            state.CURRENTUSER = {};
            lstore.clearData();
            state.loginStatus = false;
        } catch (e) {
            // no condition here
        }
    },

    //
    SAVE_USER_CHOOSE_DATA(state,{role,data}){
        state.USER_CHOOSED_DATA.selected_role = role;
        state.USER_CHOOSED_DATA.selected_save_data = data;
    }

}