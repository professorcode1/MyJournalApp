import * as FileSystem from 'expo-file-system';
async function delete_file(file_uri:string) {
    await FileSystem.deleteAsync(file_uri)
}

export {delete_file}