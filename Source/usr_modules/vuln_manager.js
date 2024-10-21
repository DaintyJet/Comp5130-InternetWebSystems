var V_LOG = false;
var V_LOG_LEVEL = false;
var V_GET_FORM = false;

var UID_GUARD = true; // Can we set the UID of a given user with a hidden field?
var VAR_GRP1 = true;

var VAR_ADMIN_CHECK = false; // Do we validate admin users in the API and ADMIN endpoints

var VAR_ENC_PASSWD = true; // Do we encrypt stored data (Tag, URL, passwd)
var VAR_PER_USER = true; // Do we generate an encryption key for each user?

async function update(v_tag, v_toggle, v_body) {
    switch (v_tag) {
        case 1:
            V_LOG = v_toggle;
            break;
        case 2:
            V_LOG_LEVEL = v_toggle;
            break;
        case 3:
            V_GET_FORM = v_toggle;
            break;
        case 4:
            UID_GUARD = v_toggle;
            break;
        case 5:
            VAR_GRP1 = v_toggle;
            break;
        case 6:
            VAR_ADMIN_CHECK = v_toggle;
            break;
        case 7:
            VAR_ENC_PASSWD = v_toggle;
            break;
        case 8:
            VAR_PER_USER = v_toggle;
            break;
        default:
            return false;
    }
    return true;
}
module.exports = {V_LOG, V_LOG_LEVEL, V_GET_FORM, UID_GUARD, VAR_GRP1, VAR_ADMIN_CHECK, update}