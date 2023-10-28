import CryptoES from 'crypto-es';
const RANDOM_STRING_LENGTH = 200

function encrpyt_message(message:string, key:string):string{
    const encrypted_message = CryptoES.AES.encrypt(JSON.stringify({message}), key).toString()
    return encrypted_message;
}
function decrypt_message(message:string, key:string){
    return JSON.parse(
        CryptoES.AES.decrypt(
            message, 
            key
        ).toString(
            CryptoES.enc.Utf8
        )
    ).message;
}
function check_key_matches_message(message:string, key:string):boolean{
    let decrypted_message;
    try {       
        decrypted_message = decrypt_message(message, key)
    } catch (error) {
        return false;
    }

    if (decrypt_message.length != RANDOM_STRING_LENGTH){
        return false
    }
    const HEX_ARRAY = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
    for(const char of decrypted_message){
        if(!HEX_ARRAY.includes(char)){
            return false;
        }
    }
    return true;
}

export {encrpyt_message, check_key_matches_message, RANDOM_STRING_LENGTH, decrypt_message}