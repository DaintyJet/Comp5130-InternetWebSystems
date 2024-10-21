const crypto = require('crypto');

const my_db_layer = require('./database')
const my_auth_layer = require('./jsonweb_token')
const my_vulns_layer = require('./vuln_manager')

// All users will have a key, whether it is used or not is
// up to the initial config.
async function gen_key() {
    const key = crypto.randomBytes(32);
    return key;
}

// Generate IV (Need to store as string)
async function gen_iv() {
    const key = crypto.randomBytes(12);
    return key;
}

async function enc_passwd(passwd, ukey) {
    ukey = Buffer.from(ukey, 'hex')
    const iv = await gen_iv()
    const cipher = crypto.createCipheriv('aes-256-gcm', ukey, iv);
    let encrypted = cipher.update(passwd, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();
    return {enc: encrypted, iv: iv, at: authTag};
}

function dec_passwd(encrypted_password, key, iv, atag) {
    const keyBuffer = Buffer.isBuffer(key) ? key : Buffer.from(key, 'hex');
    const ivBuffer = Buffer.isBuffer(iv) ? iv : Buffer.from(iv, 'hex');
    console.log(keyBuffer.length)
    
    const decipher = crypto.createDecipheriv('aes-256-gcm', keyBuffer, ivBuffer);
    decipher.setAuthTag(Buffer.from(atag, 'hex'));
    let decrypted = decipher.update(encrypted_password, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

async function add_entry(uid, share_list, group, tag, url, passwd) {

    let encPasswd = passwd;
    let key = "";
    let iv = "";
    let atag = "";
    if (true || my_vulns_layer.VAR_ENC_PASSWD) {
        if(true || my_vulns_layer.VAR_PER_USER) {
            // Extract User Key
            key = await my_db_layer.get_key(uid)
        } else {
            // Extract Default Key
            key = await my_db_layer.get_key(0)
        }
        let test = await enc_passwd(passwd, key);
        encPasswd = test.enc;
        iv = test.iv.toString("hex")
        atag = test.at.toString("hex")
    }
    //console.log(uid + "\n" + share_list+ "\n" + group+ "\n" + tag+ "\n" + url+ "\n" + passwd+ "\n" + my_vulns_layer.VAR_ENC_PASSWD+ "\n" + my_vulns_layer.VAR_PER_USER+ "\n" + iv+ "\n" + atag + "\n" + encPasswd)
    my_db_layer.insert_passwd_entry(uid, share_list, group, tag, url, encPasswd, true, true, iv, atag)

}

// Need to validate TAG
async function decode_passwd_tag(uid, tag) {
    let decrypted_password = "";
    let key = "";
    console.log("h")

    const isEnc = await my_db_layer.get_is_encrypted(uid, tag);
    const isGlob = await my_db_layer.get_is_globl(uid, tag);
    if (!isEnc) {
        console.log(isEnc)
        return undefined;
    }
    console.log("h")
    if (!isGlob) {
        // Extract User Key
        key = await my_db_layer.get_key(uid)
    } else {
        // Extract Default Key
        key = await my_db_layer.get_key(uid) // TEMP FOR TEST
        // key = await my_db_layer.get_key(0)
    }
    console.log("w")

    const encrypted_password = await my_db_layer.get_passwd(uid, tag);
    const iv = await my_db_layer.get_iv(uid, tag);
    const atag = await my_db_layer.get_atag(uid, tag);

    console.log(encrypted_password)
    return dec_passwd(encrypted_password, key, iv, atag);

}

module.exports = {add_entry, gen_key, gen_iv, decode_passwd_tag}