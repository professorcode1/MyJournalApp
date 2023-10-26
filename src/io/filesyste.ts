import * as FileSystem from 'expo-file-system';
async function delete_file(file_uri:string) {
    await FileSystem.deleteAsync(file_uri)
}
async function create_file(filename:string, contents:string){
   const path = FileSystem.documentDirectory + filename ;
   await FileSystem.writeAsStringAsync(path, contents)

}

async function print_all_file_names() {
    const file_list =  await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
    console.log(file_list)
}
export {delete_file, create_file, print_all_file_names}