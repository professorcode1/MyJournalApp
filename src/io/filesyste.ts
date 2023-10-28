import * as FileSystem from 'expo-file-system';
async function delete_file(file_uri:string, uri_included?:boolean) {
    uri_included = uri_included === undefined ? true : uri_included
    if(uri_included){
        await FileSystem.deleteAsync(file_uri);
        return ;
    }
    await FileSystem.deleteAsync(FileSystem.documentDirectory + file_uri);
    

}
async function create_file(filename:string, contents:string){
   const path = FileSystem.documentDirectory + filename ;
   await FileSystem.writeAsStringAsync(path, contents)

}

async function print_all_file_names() {
    console.log(await get_all_file_names())
}
async function get_all_file_names() {
    const file_list =  await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
    return file_list
}
async function read_file_from_fs(filename:string){
    const path = FileSystem.documentDirectory + filename ;
    return (await FileSystem.readAsStringAsync(path))  
}
export {delete_file, create_file, print_all_file_names, get_all_file_names, read_file_from_fs}