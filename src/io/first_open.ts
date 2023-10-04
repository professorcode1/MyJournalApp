import * as FileSystem from 'expo-file-system';
import { encrpyt_message , check_key_matches_message, RANDOM_STRING_LENGTH} from "./encryption"
const FIRST_OPEN_FILE_NAME = "first_open.json"
const FILE_ENCODING = 'utf-8'

async function is_this_apps_first_open():Promise<boolean>   {
    const file_list =  await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
    for(const file of file_list){
        const file_location_parts = file.split('/')
        const file_name = file_location_parts[file_location_parts.length-1]
        if(file_name == FIRST_OPEN_FILE_NAME){
            return false;
        }
    }
    return true;
}

async function check_password_is_correct(password:string):Promise<boolean>{
    const file_uri = FileSystem.documentDirectory + FIRST_OPEN_FILE_NAME
    const file_content = await FileSystem.readAsStringAsync(file_uri)
    return check_key_matches_message(file_content, password)
}

function create_random_hex_string(length:number):string{
    let result = ""
    const hexAlphabets = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
    for(let i=0; i<length ; i++){
        const index = Math.floor(Math.random() * 16);
        result += hexAlphabets[index]
    }
    return result;
}

async function create_password_file(password:string): Promise<void>  {
    const path = FileSystem.documentDirectory + FIRST_OPEN_FILE_NAME ;
    const random_hex_string = create_random_hex_string(RANDOM_STRING_LENGTH)
    const serializable_encryption = encrpyt_message(random_hex_string, password)
    await FileSystem.writeAsStringAsync(path, serializable_encryption)
}
async function delete_password_file() {
    await FileSystem.deleteAsync(FileSystem.documentDirectory + FIRST_OPEN_FILE_NAME)
}
export {is_this_apps_first_open, create_password_file, delete_password_file, check_password_is_correct}