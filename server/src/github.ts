import { exec } from "child_process";

namespace Github {
    function login(){
        exec("gh auth login --with-token < gh.token");
    }

    function download(path:string, tag:string){
        exec("gh release download --repo " + path + " " + tag);
    }
}

export default Github;